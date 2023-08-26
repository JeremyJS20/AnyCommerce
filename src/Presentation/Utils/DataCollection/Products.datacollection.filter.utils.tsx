import { CategoryIcon, DollarSignIcon, SearchIcon, StarFilledIcon } from "../../Assets/Icons/IconsCollection";
import { commonType } from "../../Pages/PublicPages/Products/Products";

export type ProductFiltersCollectionType = {
  key: string;
  text: string;
  filterValueSelected?: any;
  icon?: JSX.Element;
  placeNumber: number;
  inputType: "dropdown" | "range" | "search" | "";
  inputOptions?: {
    items: commonType[] | any;
  };
}

export type ProductSortCollectionType = {
  key: string,
  text: string,
  text2?: string,
  value: 'asc' | 'desc',
  dbName?: string,
  dataType: 'date' | 'number' | 'string'
}

export const ProductFiltersCollection:ProductFiltersCollectionType[] = [
  {
    key: "search",
    text: "buscador",
    placeNumber: 1,
    icon: <SearchIcon size={"base"} />,
    inputType: "search",
  },
  {
    key: "price",
    text: "precio",
    placeNumber: 2,
    icon: <DollarSignIcon size={"base"} />,
    inputType: "range",
  },
  {
    key: "rating",
    text: "calificacion",
    placeNumber: 3,
    icon: <StarFilledIcon size={"base"} />,
    inputType: "dropdown",
    inputOptions: {
      items: [
        {
          key: "ratingFilter0",
          text: "una-estrella-o-mas",
          value: [1, null, null, null, null],
        },
        {
          key: "ratingFilter1",
          text: "dos-estrellas-o-mas",
          value: [1, 2, null, null, null],
        },
        {
          key: "ratingFilter2",
          text: "tres-estrellas-o-mas",
          value: [1, 2, 3, null, null],
        },
        {
          key: "ratingFilter3",
          text: "cuatro-estrellas-o-mas",
          value: [1, 2, 3, 4, null],
        },
        {
          key: "ratingFilter4",
          text: "cinco-estrellas",
          value: [1, 2, 3, 4, 5],
        },
      ],
    },
  },
  {
    key: "category",
    text: "categoria",
    placeNumber: 4,
    icon: <CategoryIcon size={"base"} />,
    inputType: "dropdown",
    inputOptions: {
      items: [
        {
          key: "category0",
          text: "Categoria 0",
          value: "Category0",
        },
        {
          key: "category1",
          text: "Categoria 1",
          value: "Category1",
        }
      ],
    },
  }
]

export const ProductSortCollection:ProductSortCollectionType[] = [
  {
    key: "priceAsc",
    text: "precio",
    text2: 'mas-bajo-a-mas-alto',
    value: 'asc',
    dbName: 'cost',
    dataType: 'number'
  },
  {
    key: "priceDesc",
    text: "precio",
    text2: 'mas-alto-a-mas-bajo',
    value: 'desc',
    dbName: 'cost',
    dataType: 'number'
  },
  {
    key: "alphabeticallyAsc",
    text: "alfabeticamente",
    //text2: 'mas-bajo-a-mas-alto',
    value: 'asc',
    dbName: 'name',
    dataType: 'string'
  },
  {
    key: "alphabeticallyDesc",
    text: "alfabeticamente",
    //text2: 'mas-alto-a-mas-bajo',
    value: 'desc',
    dbName: 'name',
    dataType: 'string'
  },
  {
    key: "dateAsc",
    text: "fecha",
    text2: 'mas-viejo-a-mas-nuevo',
    value: 'asc',
    dbName: 'dates.creation',
    dataType: 'date'
  },
  {
    key: "dateDesc",
    text: "fecha",
    text2: 'mas-nuevo-a-mas-viejo',
    value: 'desc',
    dbName: 'dates.creation',
    dataType: 'date'
  }
]