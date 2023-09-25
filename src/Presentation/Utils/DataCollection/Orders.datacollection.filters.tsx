import { Icon } from "../../Assets/Icons/IconsCollection";
import {
  FiltersCollectionType,
  SortCollectionType,
} from "./Products.datacollection.filter.utils";

export const OrdersFiltersCollection: FiltersCollectionType[] = [
  {
    key: "search",
    text: "buscador",
    placeNumber: 1,
    icon: <Icon icon="search" size={"base"} />,
    inputType: "search",
  },
  {
    key: "status",
    text: "estado",
    placeNumber: 2,
    icon: <Icon icon="clock" size={"base"} color="text-gray-900 dark:text-gray-100" />,
    inputType: "dropdown",
    inputOptions: {
      items: [
        {
          key: "ordered",
          text: "pedido",
          value: "Ordered",
        },
        {
          key: "pending",
          text: "pendiente",
          value: "Pending",
        },
        {
          key: "shipped",
          text: "transportado",
          value: "Shipped",
        },
        {
          key: "delivered",
          text: "entregado",
          value: "Delivered",
        },
        {
          key: "received",
          text: "recibido",
          value: "Received",
        },
        {
          key: "canceled",
          text: "cancelado",
          value: "Canceled",
        },
      ],
    },
  },
];

export const OrdersSortCollection: SortCollectionType[] = [
  {
    key: "alphabeticallyAsc",
    text: "alfabeticamente",
    //text2: 'mas-bajo-a-mas-alto',
    value: "asc",
    dbName: "id",
    dataType: "string",
  },
  {
    key: "alphabeticallyDesc",
    text: "alfabeticamente",
    //text2: 'mas-alto-a-mas-bajo',
    value: "desc",
    dbName: "id",
    dataType: "string",
  },
  {
    key: "orderDateAsc",
    text: "fecha-de-pedido",
    text2: "mas-viejo-a-mas-nuevo",
    value: "asc",
    dbName: "dates.order",
    dataType: "date",
  },
  {
    key: "orderDateDesc",
    text: "fecha-de-pedido",
    text2: "mas-nuevo-a-mas-viejo",
    value: "desc",
    dbName: "dates.order",
    dataType: "date",
  },
  {
    key: "deliveryDateAsc",
    text: "fecha-de-entrega",
    text2: "mas-viejo-a-mas-nuevo",
    value: "asc",
    dbName: "dates.delivery",
    dataType: "date",
  },
  {
    key: "deliveryDateDesc",
    text: "fecha-de-entrega",
    text2: "mas-nuevo-a-mas-viejo",
    value: "desc",
    dbName: "dates.delivery",
    dataType: "date",
  },
];
