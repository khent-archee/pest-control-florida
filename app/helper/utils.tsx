import {
  Accessibility,
  Baby,
  Calendar,
  Car,
  Clock,
  Coffee,
  CreditCard,
  Ellipsis,
  Handshake,
  PawPrint,
  Star,
  Toilet,
  Users,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";

export const getTrueFeatures = (obj: { [key: string]: boolean } | null) => {
  if (!obj) {
    return [];
  }

  const listOfExcludedTags = [
    "Identifies as Asian-owned",
    "Identifies as Black-owned",
    "Identifies as Indigenous-owned",
    "Identifies as LGBTQ+ owned",
    "Identifies as Latino-owned",
    "Identifies as disabled-owned",
    "Identifies as veteran-owned",
    "Identifies as women-owned",
    "LGBTQ+ friendly",
    "Transgender safespace",
    // "SNAP/EBT",
  ];

  const listOfCarefulTags = [
    "Assisted listening devices",
    "Wheelchair rental",
    "No-contact delivery",
    "Same-day delivery",
  ];

  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .filter((key) => !listOfExcludedTags.includes(key));
};

export const getRemainingFeatures = (
  obj: { [key: string]: { [key: string]: boolean } } | null
) => {
  if (!obj) {
    return [];
  }

  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map((item) => item);
};
export const getFeatures = (
  obj: { [key: string]: { [key: string]: boolean } } | null
) => {
  if (!obj) {
    return [];
  }

  return Object.entries(obj)
    .filter(([_, value]) => value)
    .map((item) => item);
};

// export const mainCategories = ["Dining", "Accessibility", "Others"];
// export const diningCategories = [
//   "Service options",
//   "Dining options",
//   "Offerings",
//   "Amenities",
// ];
// export const accessibilityCategories = [
//   "Accessibility",
//   "Children",
//   "Parking",
//   "Planning",
//   "Payments",
// ];
// export const otherCategories = ["From the business", "Recycling", "Pets"];

export const excluded: string[] = [
  // "Highlights",
  // "Popular for",
  // "Crowd",
  // "Atmosphere",
  // "Other",
];

// export const categoryGroup = [
//   {
//     title: "Dining",
//     categories: diningCategories,
//   },
//   {
//     title: "Accessibility",
//     categories: accessibilityCategories,
//   },
//   {
//     title: "Others",
//     categories: otherCategories,
//   },
// ];

export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Atmosphere: <Users className="h-4 w-4 text-primary" />,
    Parking: <Car className="h-4 w-4 text-primary" />,
    Offerings: <Coffee className="h-4 w-4 text-primary" />,
    Crowd: <Users className="h-4 w-4 text-primary" />,
    Children: <Baby className="h-4 w-4 text-primary" />,
    Payments: <CreditCard className="h-4 w-4 text-primary" />,
    Amenities: <Toilet className="h-4 w-4 text-primary" />,
    Highlights: <Star className="h-4 w-4 text-primary" />,
    Pets: <PawPrint className="h-4 w-4 text-primary" />,
    Planning: <Calendar className="h-4 w-4 text-primary" />,
    Accessibility: <Accessibility className="h-4 w-4 text-primary" />,
    "From the business": <Handshake className="h-4 w-4 text-primary" />,
    "Dining options": <UtensilsCrossed className="h-4 w-4 text-primary" />,
    "Service options": <Utensils className="h-4 w-4 text-primary" />,
    "Popular for": <Star className="h-4 w-4 text-primary" />,
  };
  return icons[category] || <Ellipsis className="h-4 w-4 text-primary" />;
};
