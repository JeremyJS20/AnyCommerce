import { commonType } from "../Pages/PublicPages/Products/Products";

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
    description?: string,
    details?: {
      description?: string,
      characteristics?: commonType[]
    }
    reviews? : 
      {
        key: string,
        profileImg?: any,
        userName: string,
        from: string,
        rating:  (number | null)[],
        date: Date,
        opinion: string,
        medias?: any
      }[]
    
  }