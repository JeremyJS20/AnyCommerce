import { ProductSortCollectionType } from "../../../Utils/DataCollection/Products.datacollection.filter.utils";
import { productInfo } from "../../../Utils/types.utils";
import { Dispatch } from "react";
import { pagerOptionsType } from "../../Common/usePager";

//type IuseProductsProps = {};

type useProductsType = {
  applyFilters: (params: {
    products: productInfo[];
    filters: any;
    setSelectedFilters: Dispatch<any>;
    setSelectedFiltersValue: Dispatch<any>;
    route: string;
  }) => [productInfo[], string];
  applySorter: (params: {
    products: productInfo[];
    sortCollection: ProductSortCollectionType[];
    sortValue: string;
    route: string;
  }) => [productInfo[], string];
  applyPaging: (params: {
    allProducts: productInfo[];
    products: productInfo[];
    pagerValues: pagerOptionsType;
    route: string;
    pagerOptions?: any,
  }) => [productInfo[], string];
};

const useProducts = ({ }): useProductsType => {
  const applyFilters = (params: {
    products: productInfo[];
    filters: any;
    setSelectedFilters: Dispatch<any>;
    setSelectedFiltersValue: Dispatch<any>;
    route: string;
  }): [productInfo[], string] => {
    if (!params.filters) return [params.products, params.route];

    const sfv = { ...params.filters };

    const filtersKeys = Object.keys(sfv);

    if (filtersKeys.length <= 0) return [params.products, params.route];

    let filteredProducts: productInfo[] = params.products;

    filtersKeys.forEach((filterKey) => {
      if (sfv[filterKey] == undefined) {
        delete sfv[filterKey];

        params.setSelectedFiltersValue(sfv);
        params.setSelectedFilters(sfv ? Object.keys(sfv) : {});
      }

      filteredProducts = filteredProducts.filter((prod) => {
        if (filterKey == "search") {
          if (!params.filters[filterKey] || params.filters[filterKey] == "")
            return prod;

          const words = String(params.filters[filterKey])
            .toLowerCase()
            .split(" ");

          return words.every((word) => prod.name.toLowerCase().includes(word));
        }

        if (filterKey == "price") {
          const priceRange = params.filters[filterKey];

          if (!priceRange || Object.values(priceRange).some((pr) => pr == 0))
            return prod;

          return prod.cost >= priceRange.min && prod.cost <= priceRange.max;
        }

        if (filterKey == "rating") {
          const rating = params.filters[filterKey];

          if (
            !rating ||
            (typeof rating != "number" && Object.values(rating).length <= 0)
          )
            return prod;

          return (
            Number(
              prod.rating
                .filter((r) => r !== null && !String(r).includes("."))
                .reduce((a, b) => Math.max(Number(a), Number(b)))
            ) >= rating
          );
        }

        if (filterKey == "category") {
          const category = params.filters[filterKey];

          if (
            !category ||
            (typeof category != "number" && Object.values(category).length <= 0)
          )
            return prod;

          return prod.category.toLowerCase() == String(category).toLowerCase();
        }

        return prod;
      });
    });

    params.route = params.route.split('?')[1] == ''? `${params.route}filters=${JSON.stringify(params.filters)}`: `${params.route}&filters=${JSON.stringify(params.filters)}`;    
    return [filteredProducts, params.route];
  };

  const applySorter = (params: {
    products: productInfo[];
    sortCollection: ProductSortCollectionType[];
    sortValue: string;
    route: string
  }): [productInfo[], string] => {    
    if (!params.sortValue) return [params.products, params.route];

    const selectedSortValue = params.sortCollection.find(
      (psc) => psc.key == params.sortValue
    );    

    const sorteredProducts = params.products;

    if (selectedSortValue) {
      sorteredProducts.sort((a: any, b: any) => {
        if (selectedSortValue.value == "asc") {
          if (selectedSortValue.dataType == "number")
            return (
              a[String(selectedSortValue.dbName)] -
              b[String(selectedSortValue.dbName)]
            );
          if (selectedSortValue.dataType == "date")
            return (
              new Date(
                a[String(selectedSortValue.dbName).split(".")[0]][
                  String(selectedSortValue.dbName).split(".")[1]
                ] as string
              ).getTime() -
              new Date(
                b[String(selectedSortValue.dbName).split(".")[0]][
                  String(selectedSortValue.dbName).split(".")[1]
                ]
              ).getTime()
            );
          return (a[String(selectedSortValue.dbName)] as string).localeCompare(
            b[String(selectedSortValue.dbName)]
          );
        } else {
          if (selectedSortValue.dataType == "number")
            return (
              b[String(selectedSortValue.dbName)] -
              a[String(selectedSortValue.dbName)]
            );
          if (selectedSortValue.dataType == "date")
            return (
              new Date(
                b[String(selectedSortValue.dbName).split(".")[0]][
                  String(selectedSortValue.dbName).split(".")[1]
                ] as string
              ).getTime() -
              new Date(
                a[String(selectedSortValue.dbName).split(".")[0]][
                  String(selectedSortValue.dbName).split(".")[1]
                ]
              ).getTime()
            );
          return (b[String(selectedSortValue.dbName)] as string).localeCompare(
            a[String(selectedSortValue.dbName)]
          );
        }
      });
    }

    return [sorteredProducts, params.route];
  };

  const applyPaging = (params: {
    allProducts: productInfo[];
    products: productInfo[];
    pagerValues: pagerOptionsType;
    route: string,
    pagerOptions?: any,
    setPagerOption?: any
  }): [productInfo[], string]=> {

    // console.log(params.products.length, params.allProducts.length);
    // console.log('klk');

    let tempProducts = params.products.slice(params.pagerValues.starting);

    tempProducts = tempProducts.filter(
      (prod) => tempProducts.indexOf(prod) < params.pagerValues.take
    );

    return [tempProducts, params.route];
  };

  return {
    applyFilters: applyFilters,
    applySorter: applySorter,
    applyPaging: applyPaging,
  };
};

export default useProducts;
