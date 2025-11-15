export type Subscription = {
  id: number;
  planId: number;
  userId: number;
  startDate: string;
  endDate: string;
  status: string;

  user: {
    id: number;
    email: string;
    name: string;
  };

  plan: {
    name: string;
    price: number;
    features: string[];
    billingCycle: string;
  };
};
