import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bell,
  Moon,
  Globe,
  Lock,
  Shield,
  HelpCircle,
  FileText,
  Info,
  ChevronRight,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    settings: 'Settings',
    back: 'Back',
    notifications: 'Notifications',
    orderUpdates: 'Order Updates',
    orderUpdatesDesc: 'Get notified about your orders',
    offersPromotions: 'Offers & Promotions',
    offersPromotionsDesc: 'Receive exclusive offers',
    recommendations: 'Recommendations',
    recommendationsDesc: 'Personalized food suggestions',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Switch to dark theme',
    language: 'Language',
    languageDesc: 'Choose your preferred language',
    security: 'Security',
    changePassword: 'Change Password',
    changePasswordDesc: 'Update your password',
    twoFactor: 'Two-Factor Auth',
    twoFactorDesc: 'Add extra security',
    support: 'Support',
    helpCenter: 'Help Center',
    helpCenterDesc: 'Get help with your orders',
    termsOfService: 'Terms of Service',
    termsOfServiceDesc: 'Read our terms',
    privacyPolicy: 'Privacy Policy',
    privacyPolicyDesc: 'Learn how we protect your data',
    aboutFoooood: 'About Foooood',
    version: 'Version 1.0.0',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    updatePassword: 'Update Password',
    settingsUpdated: 'Settings Updated',
    enabled: 'enabled',
    disabled: 'disabled',
    comingSoon: 'Coming Soon',
    twoFactorSoon: '2FA will be available soon!',
    openingHelp: 'Opening help center...',
    passwordChanged: 'Password Changed',
    passwordUpdatedSuccess: 'Your password has been updated successfully',
    error: 'Error',
    fillAllFields: 'Please fill all fields',
    passwordsDontMatch: "New passwords don't match",
    passwordMinLength: 'Password must be at least 6 characters',
  },
  ta: {
    settings: 'அமைப்புகள்',
    back: 'பின்செல்',
    notifications: 'அறிவிப்புகள்',
    orderUpdates: 'ஆர்டர் புதுப்பிப்புகள்',
    orderUpdatesDesc: 'உங்கள் ஆர்டர்களைப் பற்றி அறிவிக்கவும்',
    offersPromotions: 'சலுகைகள் & விளம்பரங்கள்',
    offersPromotionsDesc: 'பிரத்யேக சலுகைகளைப் பெறுங்கள்',
    recommendations: 'பரிந்துரைகள்',
    recommendationsDesc: 'தனிப்பயனாக்கப்பட்ட உணவு பரிந்துரைகள்',
    appearance: 'தோற்றம்',
    darkMode: 'இருண்ட பயன்முறை',
    darkModeDesc: 'இருண்ட தீமுக்கு மாறவும்',
    language: 'மொழி',
    languageDesc: 'உங்கள் விருப்பமான மொழியைத் தேர்வு செய்யவும்',
    security: 'பாதுகாப்பு',
    changePassword: 'கடவுச்சொல்லை மாற்று',
    changePasswordDesc: 'உங்கள் கடவுச்சொல்லைப் புதுப்பிக்கவும்',
    twoFactor: 'இரு-காரணி அங்கீகாரம்',
    twoFactorDesc: 'கூடுதல் பாதுகாப்பைச் சேர்க்கவும்',
    support: 'ஆதரவு',
    helpCenter: 'உதவி மையம்',
    helpCenterDesc: 'உங்கள் ஆர்டர்களுக்கு உதவி பெறுங்கள்',
    termsOfService: 'சேவை விதிமுறைகள்',
    termsOfServiceDesc: 'எங்கள் விதிமுறைகளைப் படிக்கவும்',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    privacyPolicyDesc: 'உங்கள் தரவை எவ்வாறு பாதுகாக்கிறோம் என்பதை அறியவும்',
    aboutFoooood: 'Foooood பற்றி',
    version: 'பதிப்பு 1.0.0',
    currentPassword: 'தற்போதைய கடவுச்சொல்',
    newPassword: 'புதிய கடவுச்சொல்',
    confirmPassword: 'புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    updatePassword: 'கடவுச்சொல்லைப் புதுப்பிக்கவும்',
    settingsUpdated: 'அமைப்புகள் புதுப்பிக்கப்பட்டன',
    enabled: 'இயக்கப்பட்டது',
    disabled: 'முடக்கப்பட்டது',
    comingSoon: 'விரைவில் வரும்',
    twoFactorSoon: '2FA விரைவில் கிடைக்கும்!',
    openingHelp: 'உதவி மையத்தைத் திறக்கிறது...',
    passwordChanged: 'கடவுச்சொல் மாற்றப்பட்டது',
    passwordUpdatedSuccess: 'உங்கள் கடவுச்சொல் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    error: 'பிழை',
    fillAllFields: 'அனைத்து புலங்களையும் நிரப்பவும்',
    passwordsDontMatch: 'புதிய கடவுச்சொற்கள் பொருந்தவில்லை',
    passwordMinLength: 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களாக இருக்க வேண்டும்',
  },
  hi: {
    settings: 'सेटिंग्स',
    back: 'वापस',
    notifications: 'सूचनाएं',
    orderUpdates: 'ऑर्डर अपडेट',
    orderUpdatesDesc: 'अपने ऑर्डर के बारे में सूचित रहें',
    offersPromotions: 'ऑफर और प्रमोशन',
    offersPromotionsDesc: 'विशेष ऑफर प्राप्त करें',
    recommendations: 'सिफारिशें',
    recommendationsDesc: 'व्यक्तिगत भोजन सुझाव',
    appearance: 'दिखावट',
    darkMode: 'डार्क मोड',
    darkModeDesc: 'डार्क थीम पर स्विच करें',
    language: 'भाषा',
    languageDesc: 'अपनी पसंदीदा भाषा चुनें',
    security: 'सुरक्षा',
    changePassword: 'पासवर्ड बदलें',
    changePasswordDesc: 'अपना पासवर्ड अपडेट करें',
    twoFactor: 'टू-फैक्टर ऑथ',
    twoFactorDesc: 'अतिरिक्त सुरक्षा जोड़ें',
    support: 'सहायता',
    helpCenter: 'हेल्प सेंटर',
    helpCenterDesc: 'अपने ऑर्डर के लिए मदद लें',
    termsOfService: 'सेवा की शर्तें',
    termsOfServiceDesc: 'हमारी शर्तें पढ़ें',
    privacyPolicy: 'गोपनीयता नीति',
    privacyPolicyDesc: 'जानें कि हम आपके डेटा की सुरक्षा कैसे करते हैं',
    aboutFoooood: 'Foooood के बारे में',
    version: 'संस्करण 1.0.0',
    currentPassword: 'वर्तमान पासवर्ड',
    newPassword: 'नया पासवर्ड',
    confirmPassword: 'नए पासवर्ड की पुष्टि करें',
    updatePassword: 'पासवर्ड अपडेट करें',
    settingsUpdated: 'सेटिंग्स अपडेट की गईं',
    enabled: 'सक्षम',
    disabled: 'अक्षम',
    comingSoon: 'जल्द आ रहा है',
    twoFactorSoon: '2FA जल्द उपलब्ध होगा!',
    openingHelp: 'हेल्प सेंटर खोल रहा है...',
    passwordChanged: 'पासवर्ड बदला गया',
    passwordUpdatedSuccess: 'आपका पासवर्ड सफलतापूर्वक अपडेट हो गया है',
    error: 'त्रुटि',
    fillAllFields: 'कृपया सभी फ़ील्ड भरें',
    passwordsDontMatch: 'नए पासवर्ड मेल नहीं खाते',
    passwordMinLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
  },
};

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    orders: true,
    offers: true,
    recommendations: false,
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'en';
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const t = (key: string) => translations[language]?.[key] || translations['en'][key] || key;

  // Apply dark mode on mount and change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: t('settingsUpdated'),
      description: `${key} ${!notifications[key] ? t('enabled') : t('disabled')}`,
    });
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast({
      title: t('settingsUpdated'),
      description: `Language changed to ${newLanguage === 'en' ? 'English' : newLanguage === 'ta' ? 'Tamil' : 'Hindi'}`,
    });
  };

  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      toast({ title: t('error'), description: t('fillAllFields'), variant: "destructive" });
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      toast({ title: t('error'), description: t('passwordsDontMatch'), variant: "destructive" });
      return;
    }
    if (passwordForm.new.length < 6) {
      toast({ title: t('error'), description: t('passwordMinLength'), variant: "destructive" });
      return;
    }
    toast({ title: t('passwordChanged'), description: t('passwordUpdatedSuccess') });
    setChangePasswordOpen(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const settingsSections = [
    {
      title: t('notifications'),
      items: [
        { 
          icon: Bell, 
          label: t('orderUpdates'), 
          description: t('orderUpdatesDesc'),
          hasSwitch: true,
          switchValue: notifications.orders,
          onToggle: () => handleToggle('orders'),
        },
        { 
          icon: Bell, 
          label: t('offersPromotions'), 
          description: t('offersPromotionsDesc'),
          hasSwitch: true,
          switchValue: notifications.offers,
          onToggle: () => handleToggle('offers'),
        },
        { 
          icon: Bell, 
          label: t('recommendations'), 
          description: t('recommendationsDesc'),
          hasSwitch: true,
          switchValue: notifications.recommendations,
          onToggle: () => handleToggle('recommendations'),
        },
      ],
    },
    {
      title: t('appearance'),
      items: [
        { 
          icon: Moon, 
          label: t('darkMode'), 
          description: t('darkModeDesc'),
          hasSwitch: true,
          switchValue: darkMode,
          onToggle: handleDarkModeToggle,
        },
        { 
          icon: Globe, 
          label: t('language'), 
          description: t('languageDesc'),
          hasSelect: true,
          selectValue: language,
          onSelect: handleLanguageChange,
        },
      ],
    },
    {
      title: t('security'),
      items: [
        { 
          icon: Lock, 
          label: t('changePassword'), 
          description: t('changePasswordDesc'),
          onClick: () => setChangePasswordOpen(true),
        },
        { 
          icon: Shield, 
          label: t('twoFactor'), 
          description: t('twoFactorDesc'),
          onClick: () => toast({ title: t('comingSoon'), description: t('twoFactorSoon') }),
        },
      ],
    },
    {
      title: t('support'),
      items: [
        { 
          icon: HelpCircle, 
          label: t('helpCenter'), 
          description: t('helpCenterDesc'),
          onClick: () => toast({ title: t('helpCenter'), description: t('openingHelp') }),
        },
        { 
          icon: FileText, 
          label: t('termsOfService'), 
          description: t('termsOfServiceDesc'),
          onClick: () => {},
        },
        { 
          icon: Shield, 
          label: t('privacyPolicy'), 
          description: t('privacyPolicyDesc'),
          onClick: () => {},
        },
        { 
          icon: Info, 
          label: t('aboutFoooood'), 
          description: t('version'),
          onClick: () => {},
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('back')}
        </Button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-6">{t('settings')}</h1>

        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-1">
              {section.title}
            </h2>
            <Card className="overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between p-4 ${
                    itemIndex < section.items.length - 1 ? 'border-b border-border' : ''
                  } ${item.onClick ? 'cursor-pointer hover:bg-muted transition-colors' : ''}`}
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  {item.hasSwitch && (
                    <Switch 
                      checked={item.switchValue} 
                      onCheckedChange={item.onToggle}
                    />
                  )}
                  
                  {item.hasSelect && (
                    <Select value={item.selectValue} onValueChange={item.onSelect}>
                      <SelectTrigger className="w-28 h-8 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ta">தமிழ்</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  {item.onClick && !item.hasSwitch && !item.hasSelect && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('changePassword')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="current">{t('currentPassword')}</Label>
              <Input
                id="current"
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="new">{t('newPassword')}</Label>
              <Input
                id="new"
                type="password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="confirm">{t('confirmPassword')}</Label>
              <Input
                id="confirm"
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                className="mt-1 rounded-xl"
              />
            </div>
            <Button onClick={handleChangePassword} className="w-full rounded-xl">
              {t('updatePassword')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
