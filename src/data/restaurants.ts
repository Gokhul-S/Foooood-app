export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  category: string;
  isPopular?: boolean;
  customizable?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  isVeg: boolean;
  isPureVeg?: boolean;
  offer?: string;
  distance: string;
  area: string;
  menu: MenuItem[];
}

export const areas = [
  { id: "peelamedu", name: "Peelamedu", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400" },
  { id: "ramanathapuram", name: "Ramanathapuram", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400" },
  { id: "saravanampatti", name: "Saravanampatti", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400" },
  { id: "rs-puram", name: "RS Puram", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400" },
  { id: "gandhipuram", name: "Gandhipuram", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
  { id: "singanallur", name: "Singanallur", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400" },
  { id: "vadavalli", name: "Vadavalli", image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400" },
  { id: "saibaba-colony", name: "Saibaba Colony", image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400" },
  { id: "kovaipudur", name: "Kovaipudur", image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400" },
  { id: "thudiyalur", name: "Thudiyalur", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400" },
];

const foodImages = {
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
  dosa: "https://images.unsplash.com/photo-1668236543090-82eb5eaf701b?w=400",
  pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
  chicken: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400",
  idli: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400",
  thali: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
  noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
  icecream: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
  coffee: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  lassi: "https://images.unsplash.com/photo-1626200925580-b8dbf6b02ff4?w=400",
};

const restaurantImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600",
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600",
  "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600",
  "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600",
];

const generateMenu = (isVeg: boolean): MenuItem[] => {
  const vegItems: MenuItem[] = [
    { id: "v1", name: "Paneer Butter Masala", description: "Creamy cottage cheese curry with rich tomato gravy", price: 220, image: foodImages.paneer, isVeg: true, category: "Main Course", isPopular: true },
    { id: "v2", name: "Veg Biryani", description: "Fragrant basmati rice with mixed vegetables and spices", price: 180, image: foodImages.biryani, isVeg: true, category: "Biryani", isPopular: true },
    { id: "v3", name: "Masala Dosa", description: "Crispy crepe with spiced potato filling", price: 90, image: foodImages.dosa, isVeg: true, category: "South Indian" },
    { id: "v4", name: "Idli Sambar", description: "Steamed rice cakes with lentil soup", price: 60, image: foodImages.idli, isVeg: true, category: "South Indian" },
    { id: "v5", name: "Veg Thali", description: "Complete meal with roti, rice, dal, and vegetables", price: 150, image: foodImages.thali, isVeg: true, category: "Thali", isPopular: true },
    { id: "v6", name: "Veg Noodles", description: "Stir-fried noodles with vegetables", price: 120, image: foodImages.noodles, isVeg: true, category: "Chinese" },
    { id: "v7", name: "Margherita Pizza", description: "Classic pizza with tomato sauce and mozzarella", price: 250, image: foodImages.pizza, isVeg: true, category: "Pizza" },
    { id: "v8", name: "Veg Burger", description: "Crispy patty with fresh vegetables", price: 130, image: foodImages.burger, isVeg: true, category: "Burgers" },
    { id: "v9", name: "Mango Lassi", description: "Sweet mango yogurt drink", price: 80, image: foodImages.lassi, isVeg: true, category: "Beverages" },
    { id: "v10", name: "Ice Cream Sundae", description: "Vanilla ice cream with chocolate sauce", price: 120, image: foodImages.icecream, isVeg: true, category: "Desserts" },
  ];

  const nonVegItems: MenuItem[] = [
    { id: "n1", name: "Chicken Biryani", description: "Aromatic rice layered with tender chicken", price: 250, image: foodImages.biryani, isVeg: false, category: "Biryani", isPopular: true },
    { id: "n2", name: "Butter Chicken", description: "Creamy tomato curry with tender chicken", price: 280, image: foodImages.chicken, isVeg: false, category: "Main Course", isPopular: true },
    { id: "n3", name: "Chicken 65", description: "Spicy deep-fried chicken appetizer", price: 200, image: foodImages.chicken, isVeg: false, category: "Starters", isPopular: true },
    { id: "n4", name: "Mutton Rogan Josh", description: "Kashmiri style lamb curry", price: 350, image: foodImages.chicken, isVeg: false, category: "Main Course" },
    { id: "n5", name: "Fish Fry", description: "Crispy fried fish with spices", price: 220, image: foodImages.chicken, isVeg: false, category: "Starters" },
    { id: "n6", name: "Chicken Noodles", description: "Stir-fried noodles with chicken", price: 150, image: foodImages.noodles, isVeg: false, category: "Chinese" },
    { id: "n7", name: "Chicken Pizza", description: "Pizza topped with grilled chicken", price: 320, image: foodImages.pizza, isVeg: false, category: "Pizza" },
    { id: "n8", name: "Chicken Burger", description: "Juicy chicken patty with fresh veggies", price: 160, image: foodImages.burger, isVeg: false, category: "Burgers" },
    { id: "n9", name: "Egg Biryani", description: "Fragrant rice with boiled eggs", price: 160, image: foodImages.biryani, isVeg: false, category: "Biryani" },
    { id: "n10", name: "Prawn Masala", description: "Prawns in spicy coconut curry", price: 380, image: foodImages.chicken, isVeg: false, category: "Seafood" },
  ];

  if (isVeg) return vegItems;
  return [...vegItems, ...nonVegItems];
};

const restaurantNames = {
  veg: [
    "Green Leaf Kitchen", "Sattvik Pure Veg", "Annapurna Bhavan", "Fresh Garden Cafe",
    "Pure Veggie Delight", "Shudh Vegetarian", "Govinda's Kitchen", "Nature's Plate",
    "Veg Paradise", "Green Spoon Bistro"
  ],
  nonVeg: [
    "Spice Junction", "Royal Tandoor", "Biryani House", "Meat & Eat",
    "Grill Masters", "Sizzling Wok", "The Great Indian Kitchen", "Pepper House",
    "Smoky BBQ", "Flavor Town"
  ],
  mixed: [
    "Food Court Express", "Taste of India", "Urban Bites", "Cafe Delight",
    "The Hungry Soul", "Masala Magic", "Street Food Hub", "Quick Bites",
    "Family Kitchen", "Foodie's Paradise"
  ]
};

const cuisines = [
  "North Indian", "South Indian", "Chinese", "Multi-Cuisine", "Biryani",
  "Fast Food", "Street Food", "Beverages", "Desserts", "Continental"
];

export const generateRestaurants = (): Restaurant[] => {
  const restaurants: Restaurant[] = [];
  let id = 1;

  areas.forEach((area, areaIndex) => {
    // 4 pure veg restaurants
    for (let i = 0; i < 4; i++) {
      restaurants.push({
        id: `rest-${id++}`,
        name: restaurantNames.veg[i] + ` - ${area.name}`,
        image: restaurantImages[(areaIndex + i) % restaurantImages.length],
        cuisine: cuisines[i % cuisines.length],
        rating: 4.0 + Math.random() * 0.9,
        deliveryTime: `${20 + Math.floor(Math.random() * 20)}-${35 + Math.floor(Math.random() * 15)} mins`,
        priceRange: ["₹150", "₹200", "₹250", "₹300"][Math.floor(Math.random() * 4)] + " for two",
        isVeg: true,
        isPureVeg: true,
        offer: ["50% OFF up to ₹100", "FREE Delivery", "20% OFF", "Buy 1 Get 1"][Math.floor(Math.random() * 4)],
        distance: `${(1 + Math.random() * 3).toFixed(1)} km`,
        area: area.id,
        menu: generateMenu(true),
      });
    }

    // 3 non-veg restaurants
    for (let i = 0; i < 3; i++) {
      restaurants.push({
        id: `rest-${id++}`,
        name: restaurantNames.nonVeg[i] + ` - ${area.name}`,
        image: restaurantImages[(areaIndex + i + 4) % restaurantImages.length],
        cuisine: cuisines[(i + 4) % cuisines.length],
        rating: 4.0 + Math.random() * 0.9,
        deliveryTime: `${25 + Math.floor(Math.random() * 15)}-${40 + Math.floor(Math.random() * 10)} mins`,
        priceRange: ["₹250", "₹350", "₹400", "₹500"][Math.floor(Math.random() * 4)] + " for two",
        isVeg: false,
        offer: ["40% OFF up to ₹80", "FREE Delivery", "15% OFF", "₹75 OFF"][Math.floor(Math.random() * 4)],
        distance: `${(1 + Math.random() * 4).toFixed(1)} km`,
        area: area.id,
        menu: generateMenu(false),
      });
    }

    // 3 mixed restaurants
    for (let i = 0; i < 3; i++) {
      restaurants.push({
        id: `rest-${id++}`,
        name: restaurantNames.mixed[i] + ` - ${area.name}`,
        image: restaurantImages[(areaIndex + i + 7) % restaurantImages.length],
        cuisine: cuisines[(i + 7) % cuisines.length],
        rating: 4.0 + Math.random() * 0.9,
        deliveryTime: `${20 + Math.floor(Math.random() * 15)}-${35 + Math.floor(Math.random() * 15)} mins`,
        priceRange: ["₹200", "₹300", "₹350"][Math.floor(Math.random() * 3)] + " for two",
        isVeg: false,
        offer: ["30% OFF", "FREE Delivery on ₹199+", "Extra 10% OFF"][Math.floor(Math.random() * 3)],
        distance: `${(0.5 + Math.random() * 3).toFixed(1)} km`,
        area: area.id,
        menu: generateMenu(false),
      });
    }
  });

  return restaurants;
};

export const restaurants = generateRestaurants();
