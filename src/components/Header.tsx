import { useState } from 'react';
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, MapPin, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from '@/contexts/LocationContext';
import { areas } from '@/data/restaurants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { selectedAreaName, setSelectedArea } = useLocation();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const totalItems = getTotalItems();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to delivery page with search query
      navigate(`/delivery?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAreaSelect = (areaId: string | null, areaName: string | null) => {
    setSelectedArea(areaId, areaName);
    setLocationDialogOpen(false);
    
    // Navigate to delivery if not already on a restaurant page
    if (!routerLocation.pathname.includes('/delivery') && 
        !routerLocation.pathname.includes('/dineout') &&
        !routerLocation.pathname.includes('/restaurant')) {
      navigate('/delivery');
    }
  };

  const navLinks = [
    { name: 'Food', path: '/delivery' },
    { name: 'Dineout', path: '/dineout' },
    { name: 'Instamart', path: '/instamart' },
  ];

  const [areaSearchQuery, setAreaSearchQuery] = useState('');
  
  const filteredAreas = areaSearchQuery.trim() 
    ? areas.filter(area => 
        area.name.toLowerCase().startsWith(areaSearchQuery.toLowerCase())
      )
    : areas;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Logo />

          {/* Location Selector - Desktop */}
          <button
            onClick={() => setLocationDialogOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-accent transition-colors max-w-xs"
          >
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium truncate">
              {selectedAreaName || 'Select Location'}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <AnimatePresence>
              {searchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 250, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative hidden md:flex items-center"
                >
                  <Input
                    placeholder="Search restaurants..."
                    className="pr-16"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <Button
                    size="sm"
                    className="absolute right-8 h-7"
                    onClick={handleSearch}
                  >
                    Go
                  </Button>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </motion.div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </AnimatePresence>

            {/* Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Location Bar */}
        <button
          onClick={() => setLocationDialogOpen(true)}
          className="md:hidden flex items-center gap-2 w-full px-3 py-2 mb-3 rounded-lg bg-secondary"
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium truncate flex-1 text-left">
            {selectedAreaName || 'Select your location'}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Mobile Search Bar */}
        <div className="md:hidden relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-16 h-10 rounded-xl"
          />
          {searchQuery && (
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7"
              onClick={handleSearch}
            >
              Search
            </Button>
          )}
        </div>
      </div>

      {/* Location Selection Dialog */}
      <Dialog open={locationDialogOpen} onOpenChange={(open) => {
        setLocationDialogOpen(open);
        if (!open) setAreaSearchQuery('');
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">Select Your Area</DialogTitle>
          </DialogHeader>
          <div className="relative mb-4">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Search your area in Coimbatore..."
              value={areaSearchQuery}
              onChange={(e) => setAreaSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
              autoFocus
            />
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {!areaSearchQuery.trim() && (
              <button
                onClick={() => handleAreaSelect(null, null)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  !selectedAreaName ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'
                }`}
              >
                <MapPin className="h-5 w-5" />
                <span className="font-medium">All Areas</span>
              </button>
            )}
            {filteredAreas.length > 0 ? (
              filteredAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => handleAreaSelect(area.id, area.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    selectedAreaName === area.name ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{area.name}</span>
                </button>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No areas found</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
