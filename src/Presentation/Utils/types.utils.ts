export type cartProducts = {
  productInfo: productInfo;
  cartInfo: {
    amount: number;
  };
};

export type productInfo = {
    id: string;
    name: string;
    cost: number;
    stock: number;
    category: string;
    rating: (number | null)[];
    img: string;
    dates:{
      creation: Date,
      restock?: Date
    }
  }