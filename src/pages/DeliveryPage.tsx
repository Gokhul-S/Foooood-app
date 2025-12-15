import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { RestaurantCard } from '@/components/RestaurantCard';
import { VegFilter } from '@/components/VegFilter';
import { CartBar } from '@/components/CartBar';
import { restaurants, areas } from '@/data/restaurants';
import { useLocation } from '@/contexts/LocationContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterType = 'all' | 'veg' | 'nonveg';

const DeliveryPage = () => {
  const { selectedArea, selectedAreaName, setSelectedArea } = useLocation();
  const [vegFilter, setVegFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialize search from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    // Filter by area
    if (selectedArea) {
      filtered = filtered.filter(r => r.area === selectedArea);
    }

    // Filter by veg/non-veg
    if (vegFilter === 'veg') {
      filtered = filtered.filter(r => r.isVeg || r.isPureVeg);
    } else if (vegFilter === 'nonveg') {
      filtered = filtered.filter(r => !r.isVeg && !r.isPureVeg);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        filtered = [...filtered].sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0]);
          const bTime = parseInt(b.deliveryTime.split('-')[0]);
          return aTime - bTime;
        });
        break;
      case 'distance':
        filtered = [...filtered].sort((a, b) => {
          const aDist = parseFloat(a.distance);
          const bDist = parseFloat(b.distance);
          return aDist - bDist;
        });
        break;
    }

    return filtered;
  }, [selectedArea, vegFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            {selectedAreaName ? `Restaurants in ${selectedAreaName}` : 'All Restaurants'}
          </h1>
          <p className="text-muted-foreground">
            {filteredRestaurants.length} restaurants delivering to you
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Area Selector */}
          <Select
            value={selectedArea || 'all'}
            onValueChange={(value) => {
              if (value === 'all') {
                setSelectedArea(null, null);
              } else {
                const area = areas.find(a => a.id === value);
                setSelectedArea(value, area?.name || null);
              }
            }}
          >
            <SelectTrigger className="w-full md:w-48 h-11 rounded-xl">
              <SelectValue placeholder="Select Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {areas.map(area => (
                <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-40 h-11 rounded-xl">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
              <SelectItem value="distance">Nearest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Veg Filter */}
        <VegFilter
          activeFilter={vegFilter}
          onChange={setVegFilter}
          className="mb-6 overflow-x-auto pb-2"
        />

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-6xl mb-4">🍽️</p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No restaurants found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button onClick={() => { setVegFilter('all'); setSearchQuery(''); }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      <CartBar />
    </div>
  );
};

export default DeliveryPage;
