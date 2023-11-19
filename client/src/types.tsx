export type Product = {
  id: number;
  title: string;
  description: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export type Cart = {
  id: number;
  userId: number;
  productId: number;
};
