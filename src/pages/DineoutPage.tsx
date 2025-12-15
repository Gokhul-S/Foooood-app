import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Clock, Users, Calendar, Percent } from 'lucide-react';
import { Header } from '@/components/Header';
import { VegFilter } from '@/components/VegFilter';
import { VegIndicator, PureVegBadge } from '@/components/VegIndicator';
import { dineoutRestaurants } from '@/data/dineout';
import { areas } from '@/data/restaurants';
import { useLocation } from '@/contexts/LocationContext';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

type FilterType = 'all' | 'veg' | 'nonveg';

const DineoutPage = () => {
  const { selectedArea, selectedAreaName, setSelectedArea } = useLocation();
  const [vegFilter, setVegFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = useMemo(() => {
    let filtered = dineoutRestaurants;

    if (selectedArea) {
      filtered = filtered.filter(r => r.area === selectedArea);
    }

    if (vegFilter === 'veg') {
      filtered = filtered.filter(r => r.isVeg || r.isPureVeg);
    } else if (vegFilter === 'nonveg') {
      filtered = filtered.filter(r => !r.isVeg && !r.isPureVeg);
    }

    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedArea, vegFilter, searchQuery]);

  const handleReservation = (restaurantName: string) => {
    toast({
      title: "Reservation Request Sent!",
      description: `We'll confirm your table at ${restaurantName} shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-foooood-gold to-foooood-gold/80 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-card" />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-card">
              Dineout
            </h1>
          </div>
          <p className="text-card/90">Reserve a table at the best restaurants in Coimbatore</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
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

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
        </div>

        <VegFilter activeFilter={vegFilter} onChange={setVegFilter} className="mb-6" />

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover-lift">
                {/* Image */}
                <div className="relative aspect-[16/10]">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.offer && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-foooood-gold text-card border-0">
                        <Percent className="h-3 w-3 mr-1" />
                        {restaurant.offer}
                      </Badge>
                    </div>
                  )}
                  {restaurant.isPureVeg && (
                    <div className="absolute top-3 right-3">
                      <PureVegBadge />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-semibold text-foreground line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-foooood-green text-card rounded text-sm font-bold">
                      <Star className="h-3 w-3 fill-current" />
                      {restaurant.diningRating.toFixed(1)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{restaurant.cuisine}</span>
                    <span>•</span>
                    <span>{restaurant.priceRange}</span>
                    <VegIndicator isVeg={restaurant.isVeg} size="sm" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{restaurant.address.split(',').slice(0, 2).join(',')}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.timing}</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Reserve Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full rounded-xl">
                        <Calendar className="h-4 w-4 mr-2" />
                        Reserve Table
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reserve a Table at {restaurant.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Date</label>
                          <Input type="date" className="rounded-xl" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Time</label>
                          <Select>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {['12:00 PM', '1:00 PM', '2:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'].map(time => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Number of Guests</label>
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <Select>
                              <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} {num === 1 ? 'Guest' : 'Guests'}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button
                          className="w-full rounded-xl"
                          onClick={() => handleReservation(restaurant.name)}
                        >
                          Confirm Reservation
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🍽️</p>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No restaurants found
            </h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DineoutPage;
