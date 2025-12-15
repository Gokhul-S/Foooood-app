import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Trash2,
  Smartphone,
  Building,
  Check,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  name: string;
  details: string;
  icon: string;
  isDefault: boolean;
}

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', name: 'HDFC Credit Card', details: '**** **** **** 4532', icon: '💳', isDefault: true },
    { id: '2', type: 'upi', name: 'Google Pay', details: 'gokhul@okicici', icon: '📱', isDefault: false },
    { id: '3', type: 'card', name: 'ICICI Debit Card', details: '**** **** **** 7891', icon: '💳', isDefault: false },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'card' | 'upi'>('card');
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiForm, setUpiForm] = useState({
    upiId: '',
    name: '',
  });

  const handleOpenDialog = (type: 'card' | 'upi') => {
    setDialogType(type);
    setCardForm({ number: '', name: '', expiry: '', cvv: '' });
    setUpiForm({ upiId: '', name: '' });
    setIsDialogOpen(true);
  };

  const handleAddCard = () => {
    if (!cardForm.number || !cardForm.name || !cardForm.expiry) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const last4 = cardForm.number.slice(-4);
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      name: `${cardForm.name}'s Card`,
      details: `**** **** **** ${last4}`,
      icon: '💳',
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods(prev => [...prev, newMethod]);
    toast({ title: "Card Added", description: "Your card has been added successfully" });
    setIsDialogOpen(false);
  };

  const handleAddUpi = () => {
    if (!upiForm.upiId) {
      toast({ title: "Error", description: "Please enter UPI ID", variant: "destructive" });
      return;
    }

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'upi',
      name: upiForm.name || 'UPI',
      details: upiForm.upiId,
      icon: '📱',
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods(prev => [...prev, newMethod]);
    toast({ title: "UPI Added", description: "Your UPI has been linked successfully" });
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const method = paymentMethods.find(m => m.id === id);
    if (method?.isDefault && paymentMethods.length > 1) {
      toast({ title: "Cannot Delete", description: "Please set another method as default first", variant: "destructive" });
      return;
    }
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
    toast({ title: "Removed", description: "Payment method has been removed" });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    toast({ title: "Default Updated", description: "Default payment method updated" });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'card': return CreditCard;
      case 'upi': return Smartphone;
      case 'netbanking': return Building;
      default: return CreditCard;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-6">Payment Methods</h1>

        {/* Add Payment Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card
            onClick={() => handleOpenDialog('card')}
            className="p-4 cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Add Card</p>
                <p className="text-xs text-muted-foreground">Credit/Debit</p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => handleOpenDialog('upi')}
            className="p-4 cursor-pointer hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Add UPI</p>
                <p className="text-xs text-muted-foreground">GPay, PhonePe</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Saved Methods */}
        <h2 className="font-semibold text-foreground mb-4">Saved Methods</h2>
        <div className="space-y-3">
          <AnimatePresence>
            {paymentMethods.map((method, index) => {
              const Icon = getIcon(method.type);
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`p-4 ${method.isDefault ? 'border-2 border-primary' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{method.name}</h3>
                          {method.isDefault && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.details}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetDefault(method.id)}
                            className="text-primary"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(method.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {paymentMethods.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No payment methods</h3>
              <p className="text-muted-foreground">Add a card or UPI to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Card Dialog */}
      <Dialog open={isDialogOpen && dialogType === 'card'} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Credit/Debit Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardForm.number}
                onChange={(e) => setCardForm(prev => ({ ...prev, number: e.target.value.replace(/\D/g, '').slice(0, 16) }))}
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardForm.name}
                onChange={(e) => setCardForm(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardForm.expiry}
                  onChange={(e) => setCardForm(prev => ({ ...prev, expiry: e.target.value }))}
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="***"
                  value={cardForm.cvv}
                  onChange={(e) => setCardForm(prev => ({ ...prev, cvv: e.target.value.slice(0, 3) }))}
                  className="mt-1 rounded-xl"
                />
              </div>
            </div>
            <Button onClick={handleAddCard} className="w-full rounded-xl">
              Add Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add UPI Dialog */}
      <Dialog open={isDialogOpen && dialogType === 'upi'} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add UPI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@upi"
                value={upiForm.upiId}
                onChange={(e) => setUpiForm(prev => ({ ...prev, upiId: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="upiName">Name (Optional)</Label>
              <Input
                id="upiName"
                placeholder="e.g., Google Pay"
                value={upiForm.name}
                onChange={(e) => setUpiForm(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>
            <Button onClick={handleAddUpi} className="w-full rounded-xl">
              Link UPI
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethodsPage;
