type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
};

type Products = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
