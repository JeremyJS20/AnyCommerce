import { Dispatch, ReactNode } from "react";
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
  countryName: string,
  state: string,
  stateName: string,
  city: string,
  cityName: string,
  postalCode: number,
  address: string,
  default: boolean
};

export type paymentMethodInfo = {
  id: string;
  type: "card";
  default: boolean;
  methodInfo: (
    methodTypeCardInfo
  );
} | {
  id: string;
  type: "service";
  default: boolean;
  methodInfo: (
   methodTypeServiceInfo
  );
}

export type transactionsInfo = {
  id: string,
  idMethod: string,
  idOrder: string,
  status: 'completed' | '',
  date: Date,
  cost: number,

}

export type paymentMethodInfo2 = {
  id: string;
  type: "card";
  cardName: string,
  cardNumber: string,
  expirationDate: string,
  securityCode: number,
  default: boolean;
};

export type methodTypeCardInfo = {
  company: "MasterCard" | "Visa" | "AmericanExpress" | "DiscoverCard";
  name?: string,
  ending: number;
  expirationDate?: Date;
  dates: {
    expiration: Date;
  };
}

export type methodTypeServiceInfo = {
  name: string,
}

export type inputs2 = "name" | "lastName" | "email" | "phone" | "password" | undefined;

export type profileInfoKeys = "personalInfo" | "mainAddress" | "security";

export type countriesType = {
  id: number;
  iso2: string;
  name: string;
};

export type statesType = {
  country_code: string;
  country_id: number;
  id: number;
  iso2: string;
  latitude: string;
  longitude: string;
  name: string;
  type: any;
};

export type citiesType = {
  id: number;
  name: string;
};

export type inputs =
 {
      key: string;
      text: string;
      value?: any;
      isRequired: boolean;
      isVisible?: boolean;
      type: "select";
      placeholder: string;
      inputOptions: {
        items: any[];
        onSelectionChange?: (options: {
          value: any;
          key: string;
          selections: any;
          setSelections: Dispatch<any>;
          values: any;
          setValues: Dispatch<any>;
        }) => void;
        renderValue?: (items: any) => JSX.Element;
        itemsRender?: (item: any) => JSX.Element;
      };
    }
  | {
      key: string;
      text: string;
      value?: any;
      isRequired: boolean;
      isVisible?: boolean;
      type: "selectWithInheritData";
      placeholder: string;
      dataInheritFrom: string;
      dataInheritKey: string;
      inputOptions: {
        items: any[];
        onSelectionChange?: (options: {
          value: any;
          key: string;
          selections: any;
          setSelections: Dispatch<any>;
          values: any;
          setValues: Dispatch<any>;
        }) => void;
        renderValue?: (items: any) => JSX.Element;
        itemsRender?: (item: any) => JSX.Element;
      };
    }
  | {
      key: string;
      text: string;
      value?: any;
      isRequired: boolean;
      type: "text" | "number" | 'textarea' | "password";
      isVisible?: boolean;
      placeholder: string;
      onValueChange?: (props: {key: string, value: any, state: any, setState: Dispatch<any>}) => void
      width?: string
      endContent?: ReactNode
    }
    | {
      key: string;
      text: string;
      value: boolean;
      isVisible?: boolean;
      type: "check";
    };
export type addressKeyType = "country" | "state" | "city" | "postalCode" | "address" | "default";
export type listKeyType = "name" | "visibility" | "description";

export type ModalProps = {
  type?: string,
  visible: boolean;
  title: string;
  actionTitle: string;
  msg?: string,
  confirmBtnColor?: '!bg-red-600/60 !text-gray-100' | ''
  itemId?: string
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined
}


export type modalHandleProps = {
  setModalProps: (props: ModalProps) => void;
  modalProps: ModalProps;
};