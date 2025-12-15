import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Utensils, MessageSquare, Info, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { VegIndicator } from '@/components/VegIndicator';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    restaurantName,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getDeliveryFee,
    getTaxes,
    getGrandTotal,
    instamartItems,
    updateInstamartQuantity,
    removeInstamartItem,
    clearInstamartCart,
    getInstamartTotalPrice,
    getInstamartDeliveryFee,
    getInstamartTaxes,
    getInstamartGrandTotal,
  } = useCart();

  const [activeTab, setActiveTab] = useState(items.length > 0 ? 'food' : 'instamart');

  const hasFood = items.length > 0;
  const hasInstamart = instamartItems.length > 0;

  if (!hasFood && !hasInstamart) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/30 mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add items from a restaurant or Instamart to get started</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate('/delivery')} className="rounded-xl">Browse Food</Button>
              <Button onClick={() => navigate('/instamart')} variant="outline" className="rounded-xl">Browse Instamart</Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="food" disabled={!hasFood} className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Food {hasFood && `(${items.length})`}
            </TabsTrigger>
            <TabsTrigger value="instamart" disabled={!hasInstamart} className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Instamart {hasInstamart && `(${instamartItems.length})`}
            </TabsTrigger>
          </TabsList>

          {/* Food Tab */}
          <TabsContent value="food">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="p-4 bg-secondary/50 border-b border-border flex items-center justify-between">
                    <h2 className="font-display font-semibold text-lg text-foreground">{restaurantName}</h2>
                    <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />Clear
                    </Button>
                  </div>
                  <div className="divide-y divide-border">
                    {items.map((item, index) => (
                      <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="p-4 flex items-center gap-4">
                        <VegIndicator isVeg={item.isVeg} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-primary/10 rounded-lg">
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4 text-primary" /></Button>
                          <span className="font-semibold text-primary min-w-[20px] text-center">{item.quantity}</span>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4 text-primary" /></Button>
                        </div>
                        <p className="font-semibold text-foreground min-w-[60px] text-right">₹{item.price * item.quantity}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-4">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Bill Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Item Total</span><span>₹{getTotalPrice()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery Fee</span><span className={getDeliveryFee() === 0 ? 'text-foooood-green' : ''}>{getDeliveryFee() === 0 ? 'FREE' : `₹${getDeliveryFee()}`}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">GST & Charges</span><span>₹{getTaxes()}</span></div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg"><span>To Pay</span><span>₹{getGrandTotal()}</span></div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Instamart Tab */}
          <TabsContent value="instamart">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="p-4 bg-foooood-green/10 border-b border-border flex items-center justify-between">
                    <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2"><Zap className="h-5 w-5 text-foooood-green" />Instamart</h2>
                    <Button variant="ghost" size="sm" onClick={clearInstamartCart} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />Clear
                    </Button>
                  </div>
                  <div className="divide-y divide-border">
                    {instamartItems.map((item, index) => (
                      <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="p-4 flex items-center gap-4">
                        <span className="text-2xl">{item.image}</span>
                        <VegIndicator isVeg={item.isVeg} size="sm" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">₹{item.price} • {item.weight}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-primary/10 rounded-lg">
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateInstamartQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4 text-primary" /></Button>
                          <span className="font-semibold text-primary min-w-[20px] text-center">{item.quantity}</span>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateInstamartQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4 text-primary" /></Button>
                        </div>
                        <p className="font-semibold text-foreground min-w-[60px] text-right">₹{item.price * item.quantity}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-4">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Bill Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Item Total</span><span>₹{getInstamartTotalPrice()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery Fee</span><span className={getInstamartDeliveryFee() === 0 ? 'text-foooood-green' : ''}>{getInstamartDeliveryFee() === 0 ? 'FREE' : `₹${getInstamartDeliveryFee()}`}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">GST & Charges</span><span>₹{getInstamartTaxes()}</span></div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg"><span>To Pay</span><span>₹{getInstamartGrandTotal()}</span></div>
                  </div>
                  {getInstamartTotalPrice() < 299 && (
                    <div className="mt-4 p-3 bg-foooood-green-bg rounded-xl">
                      <p className="text-sm text-foooood-green">Add ₹{299 - getInstamartTotalPrice()} more for FREE delivery!</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <Button onClick={() => navigate(activeTab === 'food' ? '/checkout' : '/instamart-checkout')} className="w-full h-14 rounded-2xl text-lg font-semibold shadow-orange">
            Proceed to Checkout • ₹{activeTab === 'food' ? getGrandTotal() : getInstamartGrandTotal()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
