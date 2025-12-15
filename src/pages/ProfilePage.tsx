import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  CreditCard,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit2,
  Plus,
  Shield,
  Bell,
  Heart,
  Package,
  Camera,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Gokhul S',
    email: 'gokhul41514@gmail.com',
    phone: '9629112377',
    avatar: '',
  });

  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const menuSections = [
    {
      title: 'Orders & Favorites',
      items: [
        { icon: Package, label: 'Your Orders', onClick: () => navigate('/orders') },
        { icon: Heart, label: 'Favorites', onClick: () => navigate('/favorites') },
      ],
    },
    {
      title: 'Payments & Wallet',
      items: [
        { icon: Wallet, label: 'Foooood Money', value: '₹250', onClick: () => navigate('/wallet') },
        { icon: CreditCard, label: 'Payment Methods', onClick: () => navigate('/payment-methods') },
      ],
    },
    {
      title: 'Address',
      items: [
        { icon: MapPin, label: 'Saved Addresses', onClick: () => navigate('/addresses') },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: Bell, label: 'Notifications', hasToggle: true },
        { icon: Shield, label: 'Privacy & Security', onClick: () => navigate('/settings') },
        { icon: Settings, label: 'App Settings', onClick: () => navigate('/settings') },
        { icon: HelpCircle, label: 'Help & Support', onClick: () => navigate('/help') },
      ],
    },
  ];

  const handleSave = (field: string) => {
    setUser(prev => ({ ...prev, [field]: editValue }));
    setEditField(null);
    toast({
      title: "Profile Updated",
      description: `Your ${field} has been updated successfully.`,
    });
  };

  const EditDialog = ({ field, label, type = 'text', currentValue }: { field: string; label: string; type?: string; currentValue: string }) => {
    const [localValue, setLocalValue] = useState(currentValue);
    
    const handleDialogSave = () => {
      setUser(prev => ({ ...prev, [field]: localValue }));
      setEditField(null);
      toast({
        title: "Profile Updated",
        description: `Your ${field} has been updated successfully.`,
      });
    };

    return (
      <Dialog 
        open={editField === field} 
        onOpenChange={(open) => {
          if (!open) setEditField(null);
          else setLocalValue(currentValue);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Edit {label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type={type}
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              className="rounded-xl text-lg h-12 px-4"
              placeholder={`Enter your ${label.toLowerCase()}`}
              autoFocus
            />
            <Button
              className="w-full rounded-xl h-12 text-base"
              onClick={handleDialogSave}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-md">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.phone}</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Editable Fields */}
          <div className="space-y-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => { setEditField('name'); setEditValue(user.name); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{user.name}</p>
                </div>
              </div>
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => { setEditField('phone'); setEditValue(user.phone); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{user.phone}</p>
                </div>
              </div>
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => { setEditField('email'); setEditValue(user.email); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          </div>

          <EditDialog field="name" label="Name" currentValue={user.name} />
          <EditDialog field="phone" label="Phone Number" type="tel" currentValue={user.phone} />
          <EditDialog field="email" label="Email" type="email" currentValue={user.email} />
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-1">
              {section.title}
            </h3>
            <Card className="mb-4 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  {item.value ? (
                    <span className="font-semibold text-foooood-green">{item.value}</span>
                  ) : item.hasToggle ? (
                    <Switch />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </motion.button>
              ))}
            </Card>
          </motion.div>
        ))}

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
