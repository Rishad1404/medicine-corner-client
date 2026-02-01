export type Medicine ={
  name: string;
  manufacturer: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
  expiryDate?: Date | string;

}