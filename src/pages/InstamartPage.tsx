import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, Zap, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Header } from '@/components/Header';
import { VegIndicator } from '@/components/VegIndicator';
import { instamartCategories, instamartProducts } from '@/data/instamart';
import { useCart } from '@/contexts/CartContext';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InstamartPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    instamartItems,
    addInstamartItem,
    updateInstamartQuantity,
    getInstamartTotalItems,
    getInstamartTotalPrice,
  } = useCart();

  const filteredProducts = instamartProducts.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemQuantity = (productId: string) => {
    const item = instamartItems.find(i => i.id === productId);
    return item?.quantity || 0;
  };

  const totalItems = getInstamartTotalItems();
  const totalPrice = getInstamartTotalPrice();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-foooood-green to-foooood-green/80 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-card" />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-card">
              Instamart
            </h1>
          </div>
          <p className="text-card/90 mb-4">Groceries delivered in minutes</p>
          <div className="flex items-center gap-2 text-card">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Delivery in 10-15 mins</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {instamartCategories.slice(0, 8).map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-orange'
                    : 'bg-card hover:bg-muted shadow-card'
                }`}
              >
                <span className="text-2xl md:text-3xl mb-2">{category.image}</span>
                <span className="text-xs text-center font-medium line-clamp-2">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* More categories */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mt-3">
            {instamartCategories.slice(8).map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 8) * 0.05 }}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-orange'
                    : 'bg-card hover:bg-muted shadow-card'
                }`}
              >
                <span className="text-2xl md:text-3xl mb-2">{category.image}</span>
                <span className="text-xs text-center font-medium line-clamp-2">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-foreground">
              {selectedCategory
                ? instamartCategories.find(c => c.id === selectedCategory)?.name
                : 'All Products'}
            </h2>
            {selectedCategory && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                Clear Filter
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="overflow-hidden hover-lift">
                  <div className="p-4">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-muted rounded-xl flex items-center justify-center mb-3">
                      <span className="text-5xl">{product.image}</span>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-xl">
                          <Badge variant="secondary">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex items-start gap-1 mb-1">
                      <VegIndicator isVeg={product.isVeg} size="sm" />
                      <span className="text-xs text-muted-foreground">{product.weight}</span>
                    </div>
                    <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-2 min-h-[40px]">
                      {product.name}
                    </h3>

                    {/* Price & Add Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-foreground">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through ml-1">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {getItemQuantity(product.id) > 0 ? (
                        <div className="flex items-center gap-1 bg-primary rounded-lg">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 hover:bg-primary/80 text-primary-foreground"
                            onClick={() => updateInstamartQuantity(product.id, getItemQuantity(product.id) - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-bold text-primary-foreground min-w-[16px] text-center">
                            {getItemQuantity(product.id)}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 hover:bg-primary/80 text-primary-foreground"
                            onClick={() => addInstamartItem(product)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          onClick={() => addInstamartItem(product)}
                          disabled={!product.inStock}
                        >
                          ADD
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Bar */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-foooood-green"
        >
          <div className="container mx-auto max-w-4xl flex items-center justify-between text-card">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              <div>
                <p className="font-semibold">{totalItems} items</p>
                <p className="text-sm opacity-90">₹{totalPrice}</p>
              </div>
            </div>
            <Button variant="secondary" className="font-semibold" onClick={() => navigate('/cart')}>
              View Cart
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InstamartPage;
