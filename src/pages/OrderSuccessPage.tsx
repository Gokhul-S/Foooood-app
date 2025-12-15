import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart, restaurantName } = useCart();

  useEffect(() => {
    // Clear cart after successful order
    const timer = setTimeout(() => {
      clearCart();
    }, 500);
    return () => clearTimeout(timer);
  }, [clearCart]);

  const orderId = `FOD${Date.now().toString().slice(-8)}`;
  const estimatedTime = '30-40 mins';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-foooood-green rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-12 h-12 text-card" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-foooood-gold rounded-full flex items-center justify-center"
            >
              <span className="text-lg">🎉</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground"
          >
            Your order from {restaurantName || 'the restaurant'} has been placed
          </motion.p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <span className="font-mono font-semibold text-foreground">{orderId}</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-accent rounded-xl mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">{estimatedTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-secondary rounded-xl">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Delivering to</p>
                <p className="text-sm text-muted-foreground">
                  123, Anna Nagar, Coimbatore - 641001
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Delivery Partner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4 mb-4">
            <h3 className="font-semibold text-foreground mb-3">Delivery Partner</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                👨‍🦱
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Raju K.</p>
                <p className="text-sm text-muted-foreground">Will be assigned soon</p>
              </div>
              <Button variant="outline" size="icon" className="rounded-full">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate('/track-order')}
            className="w-full h-14 rounded-2xl text-lg font-semibold shadow-orange"
          >
            Track Order
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full h-12 rounded-xl"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
