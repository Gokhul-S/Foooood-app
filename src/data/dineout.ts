export interface DineoutRestaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  diningRating: number;
  priceRange: string;
  isVeg: boolean;
  isPureVeg?: boolean;
  offer?: string;
  area: string;
  address: string;
  timing: string;
  features: string[];
}

const dineoutImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600",
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600",
  "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600",
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600",
  "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600",
];

const dineoutNames = {
  veg: [
    "The Green Table", "Sattvik Dining", "Pure Bliss Restaurant", "Garden Cafe",
    "Veggie Feast", "Leaf & Lounge", "Annapurna Fine Dining", "Green Palette"
  ],
  nonVeg: [
    "The Grand Kitchen", "Spice Route", "Kebab Corner", "Grilled & Thrilled",
    "Ocean Pearl", "Meat Republic", "Tandoor Tales", "The Hungry Carnivore"
  ],
};

const cuisineTypes = [
  "North Indian", "South Indian", "Chinese", "Continental", "Multi-Cuisine",
  "Mughlai", "Coastal", "Pan-Asian", "Italian", "BBQ & Grills"
];

const features = [
  "Rooftop Seating", "Live Music", "Private Dining", "Family Friendly",
  "Romantic Ambience", "Outdoor Seating", "Bar Available", "Valet Parking",
  "Air Conditioned", "WiFi Available"
];

export const generateDineoutRestaurants = (): DineoutRestaurant[] => {
  const restaurants: DineoutRestaurant[] = [];
  let id = 1;
  const areas = [
    "peelamedu", "ramanathapuram", "saravanampatti", "rs-puram", "gandhipuram",
    "singanallur", "vadavalli", "saibaba-colony", "kovaipudur", "thudiyalur"
  ];

  areas.forEach((area, areaIndex) => {
    // 4 veg dineout restaurants per area
    for (let i = 0; i < 4; i++) {
      restaurants.push({
        id: `dine-${id++}`,
        name: dineoutNames.veg[i % dineoutNames.veg.length],
        image: dineoutImages[(areaIndex + i) % dineoutImages.length],
        cuisine: cuisineTypes[i % cuisineTypes.length],
        diningRating: 4.0 + Math.random() * 0.9,
        priceRange: ["₹800", "₹1200", "₹1500", "₹2000"][Math.floor(Math.random() * 4)] + " for two",
        isVeg: true,
        isPureVeg: true,
        offer: ["20% OFF on Total Bill", "Complimentary Dessert", "15% OFF on Weekdays"][Math.floor(Math.random() * 3)],
        area: area,
        address: `${Math.floor(Math.random() * 100) + 1}, Main Road, ${area.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}, Coimbatore`,
        timing: "11:00 AM - 11:00 PM",
        features: features.slice(0, 3 + Math.floor(Math.random() * 3)),
      });
    }

    // 6 non-veg dineout restaurants per area
    for (let i = 0; i < 6; i++) {
      restaurants.push({
        id: `dine-${id++}`,
        name: dineoutNames.nonVeg[i % dineoutNames.nonVeg.length],
        image: dineoutImages[(areaIndex + i + 4) % dineoutImages.length],
        cuisine: cuisineTypes[(i + 4) % cuisineTypes.length],
        diningRating: 4.0 + Math.random() * 0.9,
        priceRange: ["₹1000", "₹1500", "₹2000", "₹2500"][Math.floor(Math.random() * 4)] + " for two",
        isVeg: false,
        offer: ["25% OFF on Total Bill", "Free Welcome Drink", "10% OFF + Free Parking"][Math.floor(Math.random() * 3)],
        area: area,
        address: `${Math.floor(Math.random() * 200) + 1}, Cross Street, ${area.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}, Coimbatore`,
        timing: "12:00 PM - 11:30 PM",
        features: features.slice(2, 5 + Math.floor(Math.random() * 4)),
      });
    }
  });

  return restaurants;
};

export const dineoutRestaurants = generateDineoutRestaurants();
