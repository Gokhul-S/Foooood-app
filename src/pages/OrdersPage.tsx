import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  ChevronRight,
  RotateCcw,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Star,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { VegIndicator } from '@/components/VegIndicator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  isVeg: boolean;
}

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  total: number;
  status: 'delivered' | 'cancelled' | 'in-progress';
  date: string;
  deliveryAddress: string;
  rating?: number;
}

const OrdersPage = () => {
  const navigate = useNavigate();
  
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-12345',
      restaurantName: 'Spice Junction - Peelamedu',
      restaurantImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200',
      items: [
        { name: 'Chicken Biryani', quantity: 2, price: 250, isVeg: false },
        { name: 'Butter Naan', quantity: 4, price: 40, isVeg: true },
      ],
      total: 620,
      status: 'delivered',
      date: '2024-01-15',
      deliveryAddress: '123, Anna Nagar, Coimbatore',
      rating: 4,
    },
    {
      id: 'ORD-12344',
      restaurantName: 'Green Leaf Kitchen - RS Puram',
      restaurantImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200',
      items: [
        { name: 'Paneer Butter Masala', quantity: 1, price: 220, isVeg: true },
        { name: 'Veg Biryani', quantity: 1, price: 180, isVeg: true },
      ],
      total: 445,
      status: 'delivered',
      date: '2024-01-12',
      deliveryAddress: '456, IT Park, Peelamedu',
      rating: 5,
    },
    {
      id: 'ORD-12343',
      restaurantName: 'Biryani House - Gandhipuram',
      restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200',
      items: [
        { name: 'Mutton Biryani', quantity: 1, price: 320, isVeg: false },
      ],
      total: 375,
      status: 'cancelled',
      date: '2024-01-10',
      deliveryAddress: '123, Anna Nagar, Coimbatore',
    },
    {
      id: 'ORD-12346',
      restaurantName: 'Urban Bites - Saravanampatti',
      restaurantImage: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=200',
      items: [
        { name: 'Veg Burger', quantity: 2, price: 130, isVeg: true },
        { name: 'French Fries', quantity: 1, price: 80, isVeg: true },
      ],
      total: 385,
      status: 'in-progress',
      date: '2024-01-16',
      deliveryAddress: '123, Anna Nagar, Coimbatore',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-foooood-green text-white">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'in-progress':
        return <Badge className="bg-primary text-primary-foreground">In Progress</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-foooood-green" />;
      case 'in-progress':
        return <Truck className="h-5 w-5 text-primary" />;
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleReorder = (order: Order) => {
    toast({
      title: "Items Added to Cart",
      description: `${order.items.length} items from ${order.restaurantName} added`,
    });
    navigate('/cart');
  };

  const handleTrackOrder = (orderId: string) => {
    navigate('/track-order');
  };

  const filterOrders = (status?: string) => {
    if (!status || status === 'all') return orders;
    return orders.filter(o => o.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={order.restaurantImage}
              alt={order.restaurantName}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">{order.restaurantName}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(order.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          {getStatusBadge(order.status)}
        </div>

        {/* Items */}
        <div className="space-y-2 mb-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <VegIndicator isVeg={item.isVeg} size="sm" />
              <span className="text-foreground">{item.name}</span>
              <span className="text-muted-foreground">x{item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-semibold text-foreground">₹{order.total}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {order.status === 'delivered' && (
              <>
                {order.rating && (
                  <div className="flex items-center gap-1 text-sm text-foooood-gold">
                    <Star className="h-4 w-4 fill-current" />
                    {order.rating}
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReorder(order)}
                  className="rounded-lg"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reorder
                </Button>
              </>
            )}
            {order.status === 'in-progress' && (
              <Button
                size="sm"
                onClick={() => handleTrackOrder(order.id)}
                className="rounded-lg"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Track Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Your Orders</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">Active</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          {['all', 'in-progress', 'delivered', 'cancelled'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterOrders(tab === 'all' ? undefined : tab).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))}
              {filterOrders(tab === 'all' ? undefined : tab).length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-4">
                    {tab === 'in-progress' ? "You don't have any active orders" : "Start ordering to see your history"}
                  </p>
                  <Button onClick={() => navigate('/delivery')} className="rounded-xl">
                    Browse Restaurants
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default OrdersPage;
