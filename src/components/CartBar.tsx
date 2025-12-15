import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

export function CartBar() {
  const { getTotalItems, getTotalPrice, restaurantName } = useCart();
  const navigate = useNavigate();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:px-8"
    >
      <div className="container mx-auto max-w-4xl">
        <Button
          onClick={() => navigate('/cart')}
          className="w-full h-14 md:h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-orange flex items-center justify-between px-6"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-foooood-gold text-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium opacity-90">{restaurantName}</p>
              <p className="text-xs opacity-75">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">₹{totalPrice}</span>
            <ChevronRight className="h-5 w-5" />
          </div>
        </Button>
      </div>
    </motion.div>
  );
}
