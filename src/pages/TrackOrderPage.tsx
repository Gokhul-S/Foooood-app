import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, MessageCircle, Check, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const stages = [
  { id: 1, name: 'Order Accepted', icon: Check, completed: true },
  { id: 2, name: 'Food Being Prepared', icon: '👨‍🍳', completed: true },
  { id: 3, name: 'Picked Up', icon: '🏍️', completed: false },
  { id: 4, name: 'On the Way', icon: '🛵', completed: false },
  { id: 5, name: 'Delivered', icon: '📦', completed: false },
];

const TrackOrderPage = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(2);

  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < 5) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Button>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
          Track Your Order
        </h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <Card className="overflow-hidden h-64 lg:h-auto min-h-[300px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🗺️</span>
                </div>
                <p className="text-muted-foreground">Live Map Tracking</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your order is on its way!
                </p>
              </div>
            </div>

            {/* Route visualization placeholder */}
            <motion.div
              animate={{
                x: [0, 100, 200],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-10 left-10 text-3xl"
            >
              🛵
            </motion.div>
          </Card>

          {/* Order Status */}
          <div className="space-y-4">
            {/* ETA Card */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {currentStage < 5 ? '15-20 mins' : 'Delivered!'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Status Timeline */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Order Status</h3>
              <div className="space-y-4">
                {stages.map((stage, index) => {
                  const isCompleted = index < currentStage;
                  const isCurrent = index === currentStage - 1;

                  return (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                          isCompleted
                            ? 'bg-foooood-green text-card'
                            : isCurrent
                            ? 'bg-primary text-primary-foreground animate-pulse-orange'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {typeof stage.icon === 'string' ? stage.icon : <Check className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                          }`}
                        >
                          {stage.name}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-primary">In progress...</p>
                        )}
                      </div>
                      {isCompleted && (
                        <Check className="h-5 w-5 text-foooood-green" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Delivery Partner */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Delivery Partner</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                  👨‍🦱
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Raju K.</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>⭐ 4.8</span>
                    <span>•</span>
                    <span>500+ deliveries</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Delivery Address */}
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Delivering to</p>
                  <p className="text-sm text-muted-foreground">
                    123, Anna Nagar, Coimbatore - 641001
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
