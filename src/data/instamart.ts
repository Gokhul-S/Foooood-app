export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isVeg: boolean;
  category: string;
  subcategory: string;
  weight: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
}

export const instamartCategories: Category[] = [
  { id: "fruits-vegetables", name: "Fruits & Vegetables", image: "🥬", subcategories: ["Fresh Fruits", "Fresh Vegetables", "Exotic Fruits", "Herbs & Seasonings"] },
  { id: "dairy-bread", name: "Dairy & Bread", image: "🥛", subcategories: ["Milk", "Curd & Yogurt", "Paneer & Cheese", "Bread & Bakery", "Butter & Cream"] },
  { id: "meat-fish", name: "Meat & Fish", image: "🍖", subcategories: ["Chicken", "Mutton", "Fish & Seafood", "Eggs", "Ready to Cook"] },
  { id: "snacks", name: "Snacks & Munchies", image: "🍿", subcategories: ["Chips & Crisps", "Namkeen", "Biscuits", "Chocolates", "Sweets"] },
  { id: "beverages", name: "Beverages", image: "🥤", subcategories: ["Soft Drinks", "Juices", "Tea & Coffee", "Energy Drinks", "Water"] },
  { id: "instant-food", name: "Instant Food", image: "🍜", subcategories: ["Noodles", "Pasta", "Soup", "Ready to Eat", "Frozen Food"] },
  { id: "rice-dal", name: "Rice & Dal", image: "🍚", subcategories: ["Rice", "Dal & Pulses", "Flour & Atta", "Organic Grains"] },
  { id: "masala-oil", name: "Masala & Oil", image: "🫒", subcategories: ["Cooking Oil", "Spices", "Salt & Sugar", "Pickles & Chutneys"] },
  { id: "breakfast", name: "Breakfast", image: "🥣", subcategories: ["Cereals", "Oats", "Spreads", "Honey & Syrups"] },
  { id: "ice-cream", name: "Ice Cream & Frozen", image: "🍦", subcategories: ["Ice Cream", "Frozen Desserts", "Frozen Snacks", "Frozen Vegetables"] },
  { id: "baby-care", name: "Baby Care", image: "👶", subcategories: ["Diapers", "Baby Food", "Baby Wipes", "Baby Accessories"] },
  { id: "personal-care", name: "Personal Care", image: "🧴", subcategories: ["Skin Care", "Hair Care", "Oral Care", "Body Care"] },
  { id: "home-care", name: "Home Care", image: "🧹", subcategories: ["Cleaning Supplies", "Detergents", "Air Fresheners", "Kitchen Supplies"] },
  { id: "pet-care", name: "Pet Care", image: "🐕", subcategories: ["Pet Food", "Pet Accessories", "Pet Hygiene"] },
  { id: "health", name: "Health & Wellness", image: "💊", subcategories: ["Vitamins", "Supplements", "First Aid", "Health Devices"] },
  { id: "office", name: "Office & Stationery", image: "📝", subcategories: ["Notebooks", "Pens", "Office Supplies"] },
];

export const instamartProducts: Product[] = [
  // Fruits & Vegetables
  { id: "p1", name: "Fresh Bananas", description: "Ripe yellow bananas, rich in potassium", price: 45, image: "🍌", isVeg: true, category: "fruits-vegetables", subcategory: "Fresh Fruits", weight: "1 dozen", inStock: true },
  { id: "p2", name: "Red Apples", description: "Crisp and sweet red apples", price: 180, originalPrice: 220, image: "🍎", isVeg: true, category: "fruits-vegetables", subcategory: "Fresh Fruits", weight: "1 kg", inStock: true },
  { id: "p3", name: "Fresh Tomatoes", description: "Farm fresh red tomatoes", price: 40, image: "🍅", isVeg: true, category: "fruits-vegetables", subcategory: "Fresh Vegetables", weight: "500 g", inStock: true },
  { id: "p4", name: "Onions", description: "Fresh red onions", price: 35, image: "🧅", isVeg: true, category: "fruits-vegetables", subcategory: "Fresh Vegetables", weight: "1 kg", inStock: true },
  
  // Dairy
  { id: "p5", name: "Aavin Full Cream Milk", description: "Fresh full cream milk", price: 28, image: "🥛", isVeg: true, category: "dairy-bread", subcategory: "Milk", weight: "500 ml", inStock: true },
  { id: "p6", name: "Fresh Paneer", description: "Soft cottage cheese", price: 95, image: "🧀", isVeg: true, category: "dairy-bread", subcategory: "Paneer & Cheese", weight: "200 g", inStock: true },
  { id: "p7", name: "Curd", description: "Fresh set curd", price: 45, image: "🥛", isVeg: true, category: "dairy-bread", subcategory: "Curd & Yogurt", weight: "400 g", inStock: true },
  
  // Meat & Fish (Non-Veg)
  { id: "p8", name: "Fresh Chicken", description: "Farm fresh chicken, cleaned", price: 220, image: "🍗", isVeg: false, category: "meat-fish", subcategory: "Chicken", weight: "500 g", inStock: true },
  { id: "p9", name: "Mutton", description: "Fresh goat meat", price: 650, image: "🥩", isVeg: false, category: "meat-fish", subcategory: "Mutton", weight: "500 g", inStock: true },
  { id: "p10", name: "Eggs", description: "Farm fresh eggs", price: 75, image: "🥚", isVeg: false, category: "meat-fish", subcategory: "Eggs", weight: "12 pcs", inStock: true },
  { id: "p11", name: "Fish Fillet", description: "Boneless fish fillet", price: 350, image: "🐟", isVeg: false, category: "meat-fish", subcategory: "Fish & Seafood", weight: "500 g", inStock: true },
  
  // Snacks
  { id: "p12", name: "Lays Classic", description: "Classic salted chips", price: 20, image: "🥔", isVeg: true, category: "snacks", subcategory: "Chips & Crisps", weight: "52 g", inStock: true },
  { id: "p13", name: "Haldiram Bhujia", description: "Classic Indian namkeen", price: 45, image: "🥨", isVeg: true, category: "snacks", subcategory: "Namkeen", weight: "200 g", inStock: true },
  { id: "p14", name: "Dairy Milk", description: "Creamy milk chocolate", price: 50, image: "🍫", isVeg: true, category: "snacks", subcategory: "Chocolates", weight: "50 g", inStock: true },
  
  // Beverages
  { id: "p15", name: "Coca Cola", description: "Refreshing cola drink", price: 40, image: "🥤", isVeg: true, category: "beverages", subcategory: "Soft Drinks", weight: "750 ml", inStock: true },
  { id: "p16", name: "Real Mango Juice", description: "100% mango juice", price: 99, image: "🧃", isVeg: true, category: "beverages", subcategory: "Juices", weight: "1 L", inStock: true },
  { id: "p17", name: "Tata Tea Gold", description: "Premium tea leaves", price: 180, image: "🍵", isVeg: true, category: "beverages", subcategory: "Tea & Coffee", weight: "250 g", inStock: true },
  
  // Rice & Dal
  { id: "p18", name: "Basmati Rice", description: "Long grain basmati rice", price: 250, image: "🍚", isVeg: true, category: "rice-dal", subcategory: "Rice", weight: "1 kg", inStock: true },
  { id: "p19", name: "Toor Dal", description: "Premium toor dal", price: 140, image: "🫘", isVeg: true, category: "rice-dal", subcategory: "Dal & Pulses", weight: "1 kg", inStock: true },
  
  // Ice Cream (some may have egg)
  { id: "p20", name: "Vanilla Ice Cream", description: "Creamy vanilla flavor", price: 120, image: "🍦", isVeg: true, category: "ice-cream", subcategory: "Ice Cream", weight: "500 ml", inStock: true },
  { id: "p21", name: "Chocolate Ice Cream", description: "Rich chocolate flavor", price: 140, image: "🍨", isVeg: true, category: "ice-cream", subcategory: "Ice Cream", weight: "500 ml", inStock: true },
];
