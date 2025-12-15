import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '@/data/restaurants';
import { VegIndicator } from './VegIndicator';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

export function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-4 p-4 border-b border-border last:border-0"
    >
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <VegIndicator isVeg={item.isVeg} size="sm" />
          {item.isPopular && (
            <span className="text-xs font-medium text-primary bg-accent px-2 py-0.5 rounded-full">
              Bestseller
            </span>
          )}
        </div>
        <h4 className="font-medium text-foreground mb-1">{item.name}</h4>
        <p className="text-sm font-semibold text-foreground mb-2">₹{item.price}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </div>

      {/* Image & Add Button */}
      <div className="relative flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-24 md:w-32 md:h-28 object-cover rounded-xl"
        />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          {quantity === 0 ? (
            <Button
              onClick={() => addItem(item, restaurantId, restaurantName)}
              className="h-9 px-6 bg-card text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground font-bold rounded-lg shadow-md"
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-lg shadow-md">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 hover:bg-primary/80 text-primary-foreground"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-bold min-w-[20px] text-center">{quantity}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 hover:bg-primary/80 text-primary-foreground"
                onClick={() => addItem(item, restaurantId, restaurantName)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
