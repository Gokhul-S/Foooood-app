import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Truck, Utensils, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Header } from '@/components/Header';
import { areas } from '@/data/restaurants';
import { useLocation } from '@/contexts/LocationContext';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedArea, selectedArea } = useLocation();
  const navigate = useNavigate();

  const filteredAreas = searchQuery.trim()
    ? areas.filter(area =>
        area.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    : areas;

  const handleAreaSelect = (areaId: string, areaName: string) => {
    setSelectedArea(areaId, areaName);
    navigate('/delivery');
  };

  const services = [
    { icon: Truck, name: 'Food', description: 'Food at your doorstep', path: '/delivery', color: 'bg-primary' },
    { icon: Utensils, name: 'Dineout', description: 'Reserve a table', path: '/dineout', color: 'bg-foooood-gold' },
    { icon: ShoppingBag, name: 'Instamart', description: 'Groceries in minutes', path: '/instamart', color: 'bg-foooood-green' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              Craving Something
              <span className="gradient-text"> Delicious?</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Order food, reserve tables, or get groceries delivered from the best places in Coimbatore
            </p>

            {/* Search Location */}
            <div className="relative max-w-md mx-auto">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                placeholder="Search your area in Coimbatore..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-card"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-foooood-gold/10 rounded-full blur-3xl" />
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            What would you like today?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => navigate(service.path)}
                  className="p-6 cursor-pointer hover-lift bg-card border-0 shadow-card group"
                >
                  <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-7 w-7 text-card" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            Select Your Area
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Choose your location to see restaurants near you
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  onClick={() => handleAreaSelect(area.id, area.name)}
                  className={`relative overflow-hidden cursor-pointer group hover-lift border-2 transition-all ${
                    selectedArea === area.id ? 'border-primary shadow-orange' : 'border-transparent'
                  }`}
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={area.image}
                      alt={area.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-semibold text-card text-sm md:text-base">
                          {area.name}
                        </span>
                        <ChevronRight className="h-4 w-4 text-card opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <Logo className="justify-center mb-4" />
          <p className="text-sm text-muted-foreground">
            © 2024 Foooood. Delivering happiness across Coimbatore.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
