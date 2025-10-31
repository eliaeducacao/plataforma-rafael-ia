export type Category = {
  _id: string;
  order: number;
  name: string;
};

export type Agent = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  button: string;
  token: string;
  icon: string;
  category: string;
  prompt: string;
};

export type Plan = {
  id: string;
  description: string;
  features: string[];
  isPopular: boolean;
  currency: string;
  recurring: 'month' | 'year';
  amount: string;
};

export type StripeSubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete'
  | 'incomplete_expired'
  | 'paused';
