export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
};

export type Cart = {
  id: number;
  productId: number;
  quantity: number;
  title: string;
  description: string;
  price: number;
};
