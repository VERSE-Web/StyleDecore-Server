require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service");
const Decorator = require("./models/Decorator");
const Review = require("./models/Review");

const services = [
  {
    id: "srv-01",
    name: "Grand Royal Wedding Stage & Canopy",
    category: "Wedding",
    price: 1850,
    rating: 4.9,
    reviewCount: 48,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Transform your special day into a fairytale with our bespoke floral archway, ambient warm velvet drapes, fairy light ceiling canopy, and grand crystal chandeliers.",
    whatsIncluded: [
      "Full stage setup with velvet backdrop & crystal chandelier",
      "Premium imported fresh orchid & rose floral arches",
      "Ambient LED warm uplighting & path illumination"
    ],
    popular: true,
    newest: false,
    estimatedDuration: "6 Hours Setup",
    availableDecorators: ["dec-01", "dec-02"]
  },
  {
    id: "srv-02",
    name: "Ethereal Pastels Birthday Party Setup",
    category: "Birthday",
    price: 650,
    rating: 4.8,
    reviewCount: 36,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200"],
    description: "Chic, picture-perfect birthday backdrop featuring customized organic balloon garlands, neon sign rentals, cake pedestal tables, and LED marquee numbers.",
    whatsIncluded: [
      "Custom organic balloon arch (up to 15 ft) with choice of 3 colors",
      "Customized acrylic welcome sign & neon message rental"
    ],
    popular: true,
    newest: true,
    estimatedDuration: "3 Hours Setup",
    availableDecorators: ["dec-02", "dec-03"]
  },
  {
    id: "srv-03",
    name: "Executive Corporate Annual Gala Theme",
    category: "Corporate",
    price: 2400,
    rating: 4.95,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200"],
    description: "Sophisticated corporate environment styling for award nights, launches, and summits.",
    whatsIncluded: [
      "Branded photo backdrop wall & red carpet entry",
      "DMX-controlled intelligent LED mood lighting array"
    ],
    popular: false,
    newest: false,
    estimatedDuration: "5 Hours Setup",
    availableDecorators: ["dec-01", "dec-04"]
  },
  {
    id: "srv-04",
    name: "Boho Minimalist Housewarming Decor",
    category: "Housewarming",
    price: 480,
    rating: 4.7,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"],
    description: "Warm, inviting Bohemian setup with pampas grass arrangements, rattan floor cushions, and fairy lantern accents.",
    whatsIncluded: ["Pampas grass & dried floral entryway arches", "Boho seating lounge with throw rugs"],
    popular: false,
    newest: true,
    estimatedDuration: "2.5 Hours Setup",
    availableDecorators: ["dec-03", "dec-05"]
  },
  {
    id: "srv-05",
    name: "Luminous Festival & Holiday Lights Display",
    category: "Festival",
    price: 890,
    rating: 4.85,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=1200"],
    description: "Breathtaking light installation for Christmas, New Year, Diwali, or seasonal celebrations.",
    whatsIncluded: ["Up to 200 meters of warm LED curtain & fairy lighting strings"],
    popular: true,
    newest: false,
    estimatedDuration: "4 Hours Setup",
    availableDecorators: ["dec-03", "dec-04"]
  },
  {
    id: "srv-06",
    name: "Sunset Waterfront Luxury Gala Pavilion",
    category: "Luxury Gala",
    price: 3200,
    rating: 5.0,
    reviewCount: 15,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"],
    description: "An ultra-luxurious outdoor pavilion experience equipped with mirrored ambient lighting, crystal chandeliers, and floral arches.",
    whatsIncluded: ["Mirrored Ambient Lighting", "Crystal Chandeliers & Floral Arches", "VIP Lounge Seating"],
    popular: true,
    newest: true,
    estimatedDuration: "8 Hours Setup",
    availableDecorators: ["dec-01", "dec-03"]
  }
];

const decorators = [
  {
    id: "dec-01",
    name: "Elena Rostova",
    role: "Lead Designer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    rating: 4.98,
    completedProjects: 142,
    specialties: ["Luxury Weddings", "Stage Architecture", "Crystal Canopies"],
    bio: "10+ years shaping high-end gala atmospheres and celebrity weddings across North America & Europe.",
    available: true,
    earningsThisMonth: 12450
  },
  {
    id: "dec-02",
    name: "Marcus Vance",
    role: "Lighting Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    rating: 4.92,
    completedProjects: 98,
    specialties: ["DMX Architectural Lighting", "Fairy Light Canopies", "Stage FX"],
    bio: "Specialist in mood elevation through light physics, projection mapping, and warm ambient arrays.",
    available: true,
    earningsThisMonth: 8900
  },
  {
    id: "dec-03",
    name: "Aria Sterling",
    role: "Floral Specialist",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    rating: 4.89,
    completedProjects: 115,
    specialties: ["Botanical Arches", "Imported Orchids", "Boho Pampas Installations"],
    bio: "Master florist certified in botanical aesthetics and eco-friendly sustainable floral preservation.",
    available: true,
    earningsThisMonth: 7600
  },
  {
    id: "dec-04",
    name: "David K. Chen",
    role: "Stage Architect",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    rating: 4.95,
    completedProjects: 87,
    specialties: ["Corporate Brand Walls", "Rigging Safety", "Geometric Pavilions"],
    bio: "Architectural background focused on structural safety, custom wood fabrications, and media walls.",
    available: false,
    earningsThisMonth: 9300
  },
  {
    id: "dec-05",
    name: "Sophia Martinez",
    role: "Theme Consultant",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    rating: 4.87,
    completedProjects: 64,
    specialties: ["Balloon Sculptures", "Theme Styling", "Children & Birthday Galas"],
    bio: "Passionate about color theory, whimsical balloon physics, and memorable milestone celebrations.",
    available: true,
    earningsThisMonth: 5400
  }
];

const reviews = [
  {
    id: "rev-01",
    serviceId: "srv-01",
    userName: "Charlotte Harrison",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "StyleDecor exceeded all our wedding expectations! The team transformed our venue into a magical setting.",
    date: "July 18, 2026"
  },
  {
    id: "rev-02",
    serviceId: "srv-01",
    userName: "Liam Thorne",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "Punctual, super professional, and the attention to lighting detail was incredible.",
    date: "June 30, 2026"
  },
  {
    id: "rev-03",
    serviceId: "srv-02",
    userName: "Jessica Taylor",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 4.8,
    comment: "The balloon garland was huge and stayed perfect for two whole days after the party.",
    date: "July 10, 2026"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Service.deleteMany({});
    await Decorator.deleteMany({});
    await Review.deleteMany({});
    console.log("🗑️  Cleared existing Services / Decorators / Reviews");

    await Service.insertMany(services);
    await Decorator.insertMany(decorators);
    await Review.insertMany(reviews);

    console.log(`🌱 Seeded ${services.length} services, ${decorators.length} decorators, ${reviews.length} reviews`);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
