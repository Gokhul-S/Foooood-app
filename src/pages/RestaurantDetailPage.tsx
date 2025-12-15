import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, Percent, Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { MenuItemCard } from '@/components/MenuItemCard';
import { VegFilter } from '@/components/VegFilter';
import { CartBar } from '@/components/CartBar';
import { PureVegBadge, VegIndicator } from '@/components/VegIndicator';
import { restaurants } from '@/data/restaurants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FilterType = 'all' | 'veg' | 'nonveg';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vegFilter, setVegFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="font-display text-2xl font-bold mb-4">Restaurant not found</h2>
          <Button onClick={() => navigate('/delivery')}>Back to Restaurants</Button>
        </div>
      </div>
    );
  }

  const filteredMenu = useMemo(() => {
    let items = restaurant.menu;

    if (vegFilter === 'veg') {
      items = items.filter(item => item.isVeg);
    } else if (vegFilter === 'nonveg') {
      items = items.filter(item => !item.isVeg);
    }

    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  }, [restaurant.menu, vegFilter, searchQuery]);

  const categories = [...new Set(restaurant.menu.map(item => item.category))];
  const popularItems = filteredMenu.filter(item => item.isPopular);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 lg:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm hover:bg-card"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="container mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {restaurant.isPureVeg && <PureVegBadge />}
                  {!restaurant.isVeg && <VegIndicator isVeg={false} size="lg" />}
                </div>
                <h1 className="font-display text-2xl md:text-4xl font-bold text-card mb-2">
                  {restaurant.name}
                </h1>
                <p className="text-card/80">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-foooood-green text-card rounded-lg text-lg font-bold">
                <Star className="h-5 w-5 fill-current" />
                {restaurant.rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{restaurant.distance}</span>
            </div>
            <div className="text-muted-foreground">{restaurant.priceRange}</div>
            {restaurant.offer && (
              <div className="flex items-center gap-1 text-primary font-medium">
                <Percent className="h-4 w-4" />
                <span>{restaurant.offer}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-6">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <VegFilter activeFilter={vegFilter} onChange={setVegFilter} />
        </div>

        {/* Menu Tabs */}
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-border rounded-none h-auto p-0 mb-6">
            <TabsTrigger
              value="recommended"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Recommended
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="recommended">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <h3 className="font-display font-semibold text-lg p-4 border-b border-border">
                Recommended ({popularItems.length})
              </h3>
              {popularItems.length > 0 ? (
                popularItems.map(item => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    restaurantId={restaurant.id}
                    restaurantName={restaurant.name}
                  />
                ))
              ) : (
                <p className="p-4 text-muted-foreground">No items match your filter</p>
              )}
            </div>
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <h3 className="font-display font-semibold text-lg p-4 border-b border-border">
                  {category} ({filteredMenu.filter(i => i.category === category).length})
                </h3>
                {filteredMenu.filter(i => i.category === category).length > 0 ? (
                  filteredMenu
                    .filter(item => item.category === category)
                    .map(item => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        restaurantId={restaurant.id}
                        restaurantName={restaurant.name}
                      />
                    ))
                ) : (
                  <p className="p-4 text-muted-foreground">No items match your filter</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <CartBar />
    </div>
  );
};

export default RestaurantDetailPage;
