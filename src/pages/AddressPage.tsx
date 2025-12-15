import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Home,
  Briefcase,
  Users,
  Check,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  label: string;
  address: string;
  landmark?: string;
  isDefault: boolean;
}

const AddressPage = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', type: 'home', label: 'Home', address: '123, Cheran Maanagar, Coimbatore - 641035', isDefault: true },
    { id: '2', type: 'office', label: 'Office', address: '456, IT Park, Peelamedu, Coimbatore - 641004', isDefault: false },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'office' | 'other',
    label: '',
    address: '',
    landmark: '',
  });

  const addressTypes = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'office', icon: Briefcase, label: 'Office' },
    { id: 'other', icon: Users, label: 'Other' },
  ];

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        type: address.type,
        label: address.label,
        address: address.address,
        landmark: address.landmark || '',
      });
    } else {
      setEditingAddress(null);
      setFormData({ type: 'home', label: '', address: '', landmark: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSaveAddress = () => {
    if (!formData.address.trim()) {
      toast({ title: "Error", description: "Please enter an address", variant: "destructive" });
      return;
    }

    if (editingAddress) {
      setAddresses(prev => prev.map(a => 
        a.id === editingAddress.id 
          ? { ...a, ...formData, label: formData.label || addressTypes.find(t => t.id === formData.type)?.label || 'Address' }
          : a
      ));
      toast({ title: "Address Updated", description: "Your address has been updated successfully" });
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        type: formData.type,
        label: formData.label || addressTypes.find(t => t.id === formData.type)?.label || 'Address',
        address: formData.address,
        landmark: formData.landmark,
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddress]);
      toast({ title: "Address Added", description: "New address has been added successfully" });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    toast({ title: "Address Deleted", description: "Address has been removed" });
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    toast({ title: "Default Updated", description: "Default address has been updated" });
  };

  const getIcon = (type: string) => {
    const found = addressTypes.find(t => t.id === type);
    return found?.icon || MapPin;
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">Saved Addresses</h1>
          <Button onClick={() => handleOpenDialog()} className="rounded-xl">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {addresses.map((address, index) => {
              const Icon = getIcon(address.type);
              return (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`p-4 ${address.isDefault ? 'border-2 border-primary' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{address.label}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                        {address.landmark && (
                          <p className="text-xs text-muted-foreground mt-1">Landmark: {address.landmark}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(address)}
                        className="flex-1 rounded-lg"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {!address.isDefault && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(address.id)}
                            className="flex-1 rounded-lg"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Set Default
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {addresses.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No saved addresses</h3>
              <p className="text-muted-foreground mb-4">Add your first address to get started</p>
              <Button onClick={() => handleOpenDialog()} className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Address Type */}
            <div>
              <Label className="mb-3 block">Address Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {addressTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData(prev => ({ ...prev, type: type.id as any }))}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                      formData.type === type.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <type.icon className={`h-5 w-5 ${formData.type === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-xs font-medium ${formData.type === type.id ? 'text-primary' : 'text-muted-foreground'}`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Label */}
            <div>
              <Label htmlFor="label">Label (Optional)</Label>
              <Input
                id="label"
                placeholder="e.g., Mom's Place"
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>

            {/* Full Address */}
            <div>
              <Label htmlFor="address">Full Address *</Label>
              <Input
                id="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>

            {/* Landmark */}
            <div>
              <Label htmlFor="landmark">Landmark (Optional)</Label>
              <Input
                id="landmark"
                placeholder="e.g., Near Apollo Hospital"
                value={formData.landmark}
                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>

            <Button onClick={handleSaveAddress} className="w-full rounded-xl">
              {editingAddress ? 'Update Address' : 'Save Address'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressPage;
