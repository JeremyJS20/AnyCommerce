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
  dates: {
    creation: Date;
    restock?: Date;
  };
  description?: string;
  details?: {
    description?: string;
    characteristics?: commonType[];
  };
  reviews?: {
    key: string;
    profileImg?: any;
    userName: string;
    from: string;
    rating: (number | null)[];
    date: Date;
    opinion: string;
    medias?: any;
  }[];
};

export type orderInfo = {
  id: string;
  amount: number;
  totalAmout: number;
  dates: {
    order: Date;
    delivery: Date;
  };
  status:
    | "ordered"
    | "pending"
    | "shipped"
    | "delivered"
    | "received"
    | "canceled";
  shipmentInformation?: {
    deliveryMethod: string;
    carrier: string;
    "tracking#": number;
    shippingAddress: any;
  };
  tracking?: any;
};

export type purchaseInfo = {
  id: string;
  product: productInfo;
  amount: number;
  totalAmout: number;
  store: any;
  paymentMethod: any;
  dates: {
    purchase: Date;
  };
};

export type listInfo = {
  id: string;
  name: string;
  visibility: "public" | "private";
  description: string;
  products: productInfo[];
};

export type addressInfo = {
  id: string;
  country: string,
  state: string,
  city: string,
  postalCode: number,
  address: string,
  default: boolean
};

export type paymentMethodInfo = {
  id: string;
  type: "card" | "service";
  default: boolean;
  methodInfo: (
    methodTypeCardInfo
    | methodTypeServiceInfo
  );
};

export type methodTypeCardInfo = {
  company: "MasterCard" | "Visa";
  name?: string,
  ending: number;
  dates: {
    expiration: Date;
  };
}

export type methodTypeServiceInfo = {
  name: string,
}

export type inputs = "name" | "lastName" | "email" | "phone" | "password" | undefined;

export type profileInfoKeys = "personalInfo" | "mainAddress" | "security";
