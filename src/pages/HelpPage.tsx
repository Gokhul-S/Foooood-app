import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order in real-time by going to "Your Orders" section and clicking on "Track Order" for any active order. You\'ll see live updates on the map.',
    },
    {
      question: 'How can I cancel my order?',
      answer: 'Orders can be cancelled within 2 minutes of placing. Go to "Your Orders", find the order, and tap "Cancel Order". After 2 minutes, you\'ll need to contact support.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, Rupay), Net Banking, and Foooood Money wallet.',
    },
    {
      question: 'How do I add money to my wallet?',
      answer: 'Go to Profile > Foooood Money > Add Money. Enter the amount and pay using your preferred method. The money will be instantly credited.',
    },
    {
      question: 'What if I receive wrong or missing items?',
      answer: 'Go to "Your Orders", select the order, and tap "Report Issue". You can specify the problem and we\'ll process a refund or replacement.',
    },
    {
      question: 'How do I change my delivery address?',
      answer: 'During checkout, you can select from saved addresses or add a new one. You can also manage addresses from Profile > Saved Addresses.',
    },
    {
      question: 'Are there any delivery charges?',
      answer: 'Delivery charges depend on distance and order value. Orders above ₹500 get FREE delivery. Otherwise, charges range from ₹25-₹40.',
    },
    {
      question: 'How do I apply a promo code?',
      answer: 'On the cart page before checkout, you\'ll see an "Apply Coupon" field. Enter your promo code and tap Apply to get the discount.',
    },
  ];

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: () => toast({ title: "Starting Chat...", description: "Connecting you to an agent" }),
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: '1800-123-4567 (Toll Free)',
      action: () => toast({ title: "Calling...", description: "Initiating call to support" }),
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@foooood.com',
      action: () => toast({ title: "Email", description: "Opening email client..." }),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground mb-6">How can we help you today?</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {contactOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={option.action}
                className="p-4 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium text-foreground text-sm">{option.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">
          Frequently Asked Questions
        </h2>

        <Card>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-4 text-left hover:no-underline">
                  <span className="font-medium text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            <Button
              variant="link"
              onClick={() => setSearchQuery('')}
              className="text-primary"
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
