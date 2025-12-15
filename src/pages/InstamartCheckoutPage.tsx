import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Plus,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  ChevronRight,
  Check,
  Shield,
  Tag,
  X,
  Zap,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { VegIndicator } from '@/components/VegIndicator';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const addresses = [
  { id: '1', type: 'Home', address: '123, Cheran Maanagar, Coimbatore - 641035', isDefault: true },
  { id: '2', type: 'Office', address: '456, IT Park, Peelamedu, Coimbatore - 641004', isDefault: false },
];

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'GPay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
  { id: 'wallet', name: 'Foooood Money', icon: Wallet, description: 'Balance: ₹250' },
  { id: 'netbanking', name: 'Netbanking', icon: Building, description: 'All major banks' },
];

const availableCoupons = [
  { code: 'NEW50', discount: 50, type: 'percentage', description: '50% off on your order', minOrder: 0 },
];

const InstamartCheckoutPage = () => {
  const navigate = useNavigate();
  const { 
    instamartItems, 
    getInstamartTotalPrice, 
    getInstamartDeliveryFee, 
    getInstamartTaxes, 
    getInstamartGrandTotal,
    clearInstamartCart 
  } = useCart();
  
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Coupon states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof availableCoupons[0] | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  
  // OTP Dialog states
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setShowCouponInput(false);
      setCouponCode('');
      toast({
        title: "Coupon Applied!",
        description: `${coupon.code} - ${coupon.description}`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "This coupon code is not valid",
        variant: "destructive",
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your order",
    });
  };

  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return Math.round(getInstamartTotalPrice() * (appliedCoupon.discount / 100));
    }
    return appliedCoupon.discount;
  };

  const getFinalTotal = () => {
    return getInstamartGrandTotal() - getCouponDiscount();
  };

  const handlePayNow = () => {
    if (!selectedAddress) {
      toast({ title: "Select Address", description: "Please select a delivery address", variant: "destructive" });
      return;
    }
    if (!selectedPayment) {
      toast({ title: "Select Payment", description: "Please select a payment method", variant: "destructive" });
      return;
    }
    setShowOtpDialog(true);
    setOtp('');
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({ title: "Invalid OTP", description: "Please enter a 6-digit OTP", variant: "destructive" });
      return;
    }

    setIsVerifyingOtp(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsVerifyingOtp(false);
    setShowOtpDialog(false);
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    clearInstamartCart();
    toast({
      title: "Order Placed!",
      description: "Your Instamart order has been confirmed",
    });
    navigate('/order-success');
  };

  if (instamartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </Button>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Zap className="h-7 w-7 text-foooood-green" />
          Instamart Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Address
                </h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New
                </Button>
              </div>

              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                {addresses.map((addr) => (
                  <motion.div
                    key={addr.id}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedAddress === addr.id
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedAddress(addr.id)}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={addr.id} id={`addr-${addr.id}`} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`addr-${addr.id}`} className="font-semibold text-foreground cursor-pointer">
                            {addr.type}
                          </Label>
                          {addr.isDefault && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{addr.address}</p>
                      </div>
                      {selectedAddress === addr.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
            </Card>

            {/* Order Summary */}
            <Card className="p-4">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-foooood-green" />
                Order Summary
              </h3>
              <div className="space-y-3">
                {instamartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-xl">{item.image}</span>
                    <VegIndicator isVeg={item.isVeg} size="sm" />
                    <span className="flex-1 text-sm text-foreground truncate">{item.name}</span>
                    <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                    <span className="text-sm font-medium text-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Coupon Section */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Apply Coupon
                </h3>
                {!appliedCoupon && !showCouponInput && (
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => setShowCouponInput(true)}>
                    Add Coupon
                  </Button>
                )}
              </div>

              {showCouponInput && !appliedCoupon && (
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 rounded-xl"
                  />
                  <Button onClick={handleApplyCoupon} className="rounded-xl">Apply</Button>
                  <Button variant="ghost" size="icon" onClick={() => setShowCouponInput(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {appliedCoupon && (
                <div className="mt-4 p-3 bg-foooood-green-bg rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foooood-green">{appliedCoupon.code}</p>
                    <p className="text-sm text-foooood-green">{appliedCoupon.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {!appliedCoupon && (
                <div className="mt-4 p-3 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    Available: <span className="font-semibold text-primary">NEW50</span> - Get 50% off!
                  </p>
                </div>
              )}
            </Card>

            {/* Payment Method */}
            <Card className="p-4">
              <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Method
              </h3>

              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedPayment === method.id
                        ? 'border-primary bg-accent'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={method.id} id={`pay-${method.id}`} />
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`pay-${method.id}`} className="font-medium text-foreground cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
            </Card>
          </div>

          {/* Bill Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-4">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">Bill Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item Total</span>
                  <span className="text-foreground">₹{getInstamartTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className={getInstamartDeliveryFee() === 0 ? 'text-foooood-green' : 'text-foreground'}>
                    {getInstamartDeliveryFee() === 0 ? 'FREE' : `₹${getInstamartDeliveryFee()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST & Charges</span>
                  <span className="text-foreground">₹{getInstamartTaxes()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-foooood-green">Coupon Discount</span>
                    <span className="text-foooood-green">-₹{getCouponDiscount()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{getFinalTotal()}</span>
                </div>
              </div>

              {appliedCoupon && (
                <div className="mt-4 p-3 bg-foooood-green-bg rounded-xl">
                  <p className="text-sm text-foooood-green font-medium">
                    You're saving ₹{getCouponDiscount()} with {appliedCoupon.code}!
                  </p>
                </div>
              )}

              <div className="mt-4 p-3 bg-secondary rounded-xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-foooood-green" />
                <p className="text-sm text-muted-foreground">100% Secure Payments</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <Button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full h-14 rounded-2xl text-lg font-semibold shadow-orange"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
                Processing...
              </span>
            ) : (
              `Pay ₹${getFinalTotal()} Securely`
            )}
          </Button>
        </div>
      </div>

      {/* OTP Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Enter OTP</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-center text-muted-foreground text-sm">
              Enter 6-digit OTP to complete payment of ₹{getFinalTotal()}
            </p>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button 
              onClick={handleVerifyOtp} 
              disabled={isVerifyingOtp || otp.length !== 6}
              className="w-full h-12 rounded-xl"
            >
              {isVerifyingOtp ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                  Verifying...
                </span>
              ) : (
                'Verify & Pay'
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">For demo, enter any 6 digits</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstamartCheckoutPage;
