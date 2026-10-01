export interface CartItem {
  id: string;
  name: string;
  collection: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
}
