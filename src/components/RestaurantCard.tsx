import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Percent } from 'lucide-react';
import { Restaurant } from '@/data/restaurants';
import { VegIndicator, PureVegBadge } from './VegIndicator';
import { Card } from '@/components/ui/card';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        className="overflow-hidden cursor-pointer hover-lift bg-card border-0 shadow-card hover:shadow-hover"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {/* Offer Badge */}
          {restaurant.offer && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3 pt-8">
              <div className="flex items-center gap-1 text-card">
                <Percent className="h-4 w-4" />
                <span className="text-sm font-bold">{restaurant.offer}</span>
              </div>
            </div>
          )}
          {/* Pure Veg Badge */}
          {restaurant.isPureVeg && (
            <div className="absolute top-3 left-3">
              <PureVegBadge />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-foreground line-clamp-1 flex-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-foooood-green text-card rounded text-sm font-bold flex-shrink-0">
              <Star className="h-3 w-3 fill-current" />
              {restaurant.rating.toFixed(1)}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{restaurant.cuisine}</span>
            <span>•</span>
            <span>{restaurant.priceRange}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
              <span>•</span>
              <span>{restaurant.distance}</span>
            </div>
            <VegIndicator isVeg={restaurant.isVeg} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
