import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  Trash2,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { VegIndicator } from '@/components/VegIndicator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface FavoriteRestaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  isVeg: boolean;
  area: string;
}

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([
    {
      id: 'rest-1',
      name: 'Green Leaf Kitchen - Peelamedu',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      cuisine: 'North Indian',
      rating: 4.5,
      deliveryTime: '25-35 mins',
      isVeg: true,
      area: 'Peelamedu',
    },
    {
      id: 'rest-5',
      name: 'Spice Junction - RS Puram',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
      cuisine: 'Biryani',
      rating: 4.3,
      deliveryTime: '30-40 mins',
      isVeg: false,
      area: 'RS Puram',
    },
    {
      id: 'rest-12',
      name: 'Urban Bites - Gandhipuram',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
      cuisine: 'Fast Food',
      rating: 4.2,
      deliveryTime: '20-30 mins',
      isVeg: false,
      area: 'Gandhipuram',
    },
  ]);

  const handleRemove = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Removed from Favorites",
      description: "Restaurant has been removed from your favorites",
    });
  };

  const handleViewRestaurant = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-6">
          Favorite Restaurants
        </h1>

        <div className="space-y-4">
          <AnimatePresence>
            {favorites.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-card transition-shadow">
                  <div className="flex">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover cursor-pointer"
                      onClick={() => handleViewRestaurant(restaurant.id)}
                    />
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div 
                            className="cursor-pointer flex-1"
                            onClick={() => handleViewRestaurant(restaurant.id)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <VegIndicator isVeg={restaurant.isVeg} size="sm" />
                              <h3 className="font-semibold text-foreground text-sm md:text-base">
                                {restaurant.name}
                              </h3>
                            </div>
                            <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemove(restaurant.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2 -mt-1"
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-foooood-green">
                          <Star className="h-3 w-3 fill-current" />
                          {restaurant.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {restaurant.deliveryTime}
                        </span>
                        <span className="text-muted-foreground">{restaurant.area}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {favorites.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">
                Start exploring and save your favorite restaurants
              </p>
              <Button onClick={() => navigate('/delivery')} className="rounded-xl">
                Browse Restaurants
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
