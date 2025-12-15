import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  CreditCard,
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

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  icon: 'gift' | 'order' | 'refund' | 'topup';
}

const WalletPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(250);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  const [transactions] = useState<Transaction[]>([
    { id: '1', type: 'credit', amount: 50, description: 'Cashback on Pizza order', date: '2024-01-15', icon: 'gift' },
    { id: '2', type: 'debit', amount: 120, description: 'Order #12345', date: '2024-01-14', icon: 'order' },
    { id: '3', type: 'credit', amount: 200, description: 'Added to wallet', date: '2024-01-12', icon: 'topup' },
    { id: '4', type: 'credit', amount: 30, description: 'Refund for Order #12340', date: '2024-01-10', icon: 'refund' },
    { id: '5', type: 'debit', amount: 85, description: 'Order #12339', date: '2024-01-08', icon: 'order' },
    { id: '6', type: 'credit', amount: 100, description: 'Welcome bonus', date: '2024-01-01', icon: 'gift' },
  ]);

  const quickAmounts = [100, 200, 500, 1000];

  const handleAddMoney = () => {
    const amount = parseInt(addAmount);
    if (!amount || amount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }
    setBalance(prev => prev + amount);
    toast({ title: "Money Added!", description: `₹${amount} has been added to your wallet` });
    setIsAddMoneyOpen(false);
    setAddAmount('');
  };

  const getTransactionIcon = (icon: string) => {
    switch (icon) {
      case 'gift': return Gift;
      case 'order': return CreditCard;
      case 'refund': return ArrowDownLeft;
      case 'topup': return Plus;
      default: return Wallet;
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

        {/* Wallet Card */}
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm">Foooood Money</p>
                <h2 className="text-3xl font-bold">₹{balance}</h2>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsAddMoneyOpen(true)}
            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Money
          </Button>
        </Card>

        {/* Offers */}
        <Card className="p-4 bg-foooood-green-bg border-foooood-green/20 mb-6">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-foooood-green" />
            <div>
              <p className="font-medium text-foooood-green">Add ₹500 & get ₹50 extra!</p>
              <p className="text-sm text-foooood-green/80">Limited time offer</p>
            </div>
          </div>
        </Card>

        {/* Transaction History */}
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">
          Transaction History
        </h2>

        <div className="space-y-3">
          {transactions.map((txn, index) => {
            const Icon = getTransactionIcon(txn.icon);
            return (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === 'credit' ? 'bg-foooood-green/10' : 'bg-destructive/10'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        txn.type === 'credit' ? 'text-foooood-green' : 'text-destructive'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{txn.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(txn.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 font-semibold ${
                      txn.type === 'credit' ? 'text-foooood-green' : 'text-destructive'
                    }`}>
                      {txn.type === 'credit' ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                      ₹{txn.amount}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Money Dialog */}
      <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="amount">Enter Amount</Label>
              <div className="relative mt-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="pl-8 text-2xl font-bold h-14 rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm">Quick Add</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setAddAmount(amount.toString())}
                    className={`rounded-xl ${addAmount === amount.toString() ? 'border-primary bg-primary/10' : ''}`}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleAddMoney} className="w-full h-12 rounded-xl">
              Add ₹{addAmount || '0'} to Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletPage;
