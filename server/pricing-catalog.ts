export interface PricingCatalog {
  [category: string]: {
    [planName: string]: number;
  };
}

export const pricingCatalog: PricingCatalog = {
  "8-9 STUDENTS": {
    "Discover": 5500,
    "Discover Plus+": 15000,
  },
  "10-12 STUDENTS": {
    "Achieve Online": 5999,
    "Achieve Plus+": 10599,
  },
  "COLLEGE GRADUATES": {
    "Ascend Online": 6499,
    "Ascend Plus+": 10599,
  },
  "WORKING PROFESSIONALS": {
    "Ascend Online": 6499,
    "Ascend Plus+": 10599,
  },
};

export function getPrice(category: string, planName: string): number | null {
  const categoryPricing = pricingCatalog[category];
  if (!categoryPricing) return null;
  
  const price = categoryPricing[planName];
  return price || null;
}
