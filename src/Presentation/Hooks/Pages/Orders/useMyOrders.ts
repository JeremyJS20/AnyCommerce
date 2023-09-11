import { SortCollectionType } from "../../../Utils/DataCollection/Products.datacollection.filter.utils";
import { orderInfo } from "../../../Utils/types.utils";
import { Dispatch } from "react";
import { pagerOptionsType } from "../../Common/usePager";

//type IuseProductsProps = {};

type useMyOrdersType = {
  applyFilters: (params: {
    orders: orderInfo[];
    filters: any;
    setSelectedFilters: Dispatch<any>;
    setSelectedFiltersValue: Dispatch<any>;
    route: string;
  }) => [orderInfo[]];
  applySorter: (params: {
    orders: orderInfo[];
    sortCollection: SortCollectionType[];
    sortValue: string;
  }) => [orderInfo[]];
  applyPaging: (params: {
    allOrders: orderInfo[];
    orders: orderInfo[];
    pagerValues: pagerOptionsType;
    pagerOptions?: any;
  }) => [orderInfo[]];
};

const useMyOrders = ({}): useMyOrdersType => {
  const applyFilters = (params: {
    orders: orderInfo[];
    filters: any;
    setSelectedFilters: Dispatch<any>;
    setSelectedFiltersValue: Dispatch<any>;
    route: string;
  }): [orderInfo[]] => {
    if (!params.filters) return [params.orders];

    const sfv = { ...params.filters };

    const filtersKeys = Object.keys(sfv);

    if (filtersKeys.length <= 0) return [params.orders];

    let filteredOrders: orderInfo[] = params.orders;

    filtersKeys.forEach((filterKey) => {
      if (sfv[filterKey] == undefined) {
        delete sfv[filterKey];

        params.setSelectedFiltersValue(sfv);
        params.setSelectedFilters(sfv ? Object.keys(sfv) : {});
      }

      filteredOrders = filteredOrders.filter((prod) => {
        if (filterKey == "search") {
          if (!params.filters[filterKey] || params.filters[filterKey] == "")
            return prod;

          const words = String(params.filters[filterKey])
            .toLowerCase()
            .split(" ");

          return words.every((word) => prod.id.toLowerCase().includes(word));
        }

        if (filterKey == "status") {
          const status = params.filters[filterKey];

          if (
            !status ||
            (typeof status != "number" && Object.values(status).length <= 0)
          )
            return prod;
            
          return prod.status.toLowerCase() == String(status).toLowerCase();
        }

        // if (filterKey == "price") {
        //   const priceRange = params.filters[filterKey];

        //   if (!priceRange || Object.values(priceRange).some((pr) => pr == 0))
        //     return prod;

        //   return prod.cost >= priceRange.min && prod.cost <= priceRange.max;
        // }

        // if (filterKey == "rating") {
        //   const rating = params.filters[filterKey];

        //   if (
        //     !rating ||
        //     (typeof rating != "number" && Object.values(rating).length <= 0)
        //   )
        //     return prod;

        //   return (
        //     Number(
        //       prod.rating
        //         .filter((r) => r !== null && !String(r).includes("."))
        //         .reduce((a, b) => Math.max(Number(a), Number(b)))
        //     ) >= rating
        //   );
        // }

        // if (filterKey == "category") {
        //   const category = params.filters[filterKey];

        //   if (
        //     !category ||
        //     (typeof category != "number" && Object.values(category).length <= 0)
        //   )
        //     return prod;

        //   return prod.category.toLowerCase() == String(category).toLowerCase();
        // }

        return prod;
      });
    });

    params.route =
      params.route.split("?")[1] == ""
        ? `${params.route}filters=${JSON.stringify(params.filters)}`
        : `${params.route}&filters=${JSON.stringify(params.filters)}`;
    return [filteredOrders];
  };

  const applySorter = (params: {
    orders: orderInfo[];
    sortCollection: SortCollectionType[];
    sortValue: string;
  }): [orderInfo[]] => {
    if (!params.sortValue) return [params.orders];

    const selectedSortValue = params.sortCollection.find(
      (psc) => psc.key == params.sortValue
    );

    const sorteredOrders = params.orders;

    if (selectedSortValue) {      
      sorteredOrders.sort((a: any, b: any) => {
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

    return [sorteredOrders];
  };

  const applyPaging = (params: {
    allOrders: orderInfo[];
    orders: orderInfo[];
    pagerValues: pagerOptionsType;
    pagerOptions?: any;
    setPagerOption?: any;
  }): [orderInfo[]] => {
    let tempProducts = params.orders.slice(params.pagerValues.starting);

    tempProducts = tempProducts.filter(
      (prod) => tempProducts.indexOf(prod) < params.pagerValues.take
    );

    return [tempProducts];
  };

  return {
    applyFilters: applyFilters,
    applySorter: applySorter,
    applyPaging: applyPaging,
  };
};

export default useMyOrders;
