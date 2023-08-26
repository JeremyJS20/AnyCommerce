import { Divider } from "@nextui-org/divider";
import { Button, Card, CardBody, Link } from "@nextui-org/react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { eCommerce } from "../../../Assets/Img/ImgCollection";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";
import {
  BoxIcon,
  StarEmptyIcon,
  StarFilledIcon,
  StarHalfFilledIcon,
} from "../../../Assets/Icons/IconsCollection";
import { cartProducts, productInfo } from "../../../Utils/types.utils";
import { CartContext } from "../../../Context/CartContext";
import { toast } from "sonner";
import { ProductsCollection } from "../../../Utils/DataCollection/Products.datacollection.utils";
import {
  ProductFiltersCollection,
  ProductSortCollection,
} from "../../../Utils/DataCollection/Products.datacollection.filter.utils";
import {
  useFilterPanel,
  useFilterPanelBtns,
  useSortBtn,
} from "../../../Hooks/Common/useFilterPanel2";
import usePager, { useQuery } from "../../../Hooks/Common/usePager";
import useProducts from "../../../Hooks/Pages/Products/useProducts";

interface IProductsProps {}

export type commonType = {
  key: string;
  text: string;
  value: any;
};

const Products: FunctionComponent<IProductsProps> = ({}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();

  const { setCart } = useContext(CartContext);

  const [products, setProducts] = useState<productInfo[]>(ProductsCollection);
  const [products2, setProducts2] = useState<productInfo[]>(ProductsCollection);

  const renderProductRating = (rating: (number | null)[]) => {
    return rating.map((rat) => (
      <>
        {rat != null ? (
          String(rat).includes(".") ? (
            <></>
          ) : String(rating[rating.indexOf(rat) + 1])?.includes(".") ? (
            <StarHalfFilledIcon size="sm" color={"text-gray-500"} />
          ) : (
            <StarFilledIcon size="sm" color={"text-gray-500"} />
          )
        ) : (
          <StarEmptyIcon size="sm" color={"text-gray-500"} />
        )}
      </>
    ));
  };

  const renderUnitsInStock = (stock: number) => {
    return (
      <p className={`${stock <= 10 ? "text-red-500" : "text-gray-500"}`}>
        {stock > 20
          ? `+20 ${t("unidades-en-stock").toLowerCase()}`
          : stock <= 10
          ? `${t("solo")} ${stock} ${t(
              "pocas-unidades-en-stock"
            ).toLowerCase()} - ${t("ordena-pronto").toLowerCase()}`
          : `${stock} ${t("unidades-en-stock").toLowerCase()}`}
      </p>
    );
  };

  const { selectedFiltersFormatted, setSelectedFilters, FilterPanelComponent } =
    useFilterPanel({ filterCollection: ProductFiltersCollection });

  const { selectedFiltersValues, setSelectedFiltersValues, FilterPanelBtns } =
    useFilterPanelBtns({
      filterCollection: ProductFiltersCollection,
      selectedFilters: selectedFiltersFormatted,
    });

  const { SortBtnComponent } = useSortBtn({
    sortCollection: ProductSortCollection,
  });

  const { PagerComponent, pagerOptions } =
    usePager({
      items: products2,
      take: 12,
    });

  const { applyFilters, applySorter, applyPaging } = useProducts({});

  useEffect(() => {
    const sfvArray = Object.keys({ ...selectedFiltersValues });
    const sffCopy = selectedFiltersFormatted.slice();
    const sfvCopy = { ...selectedFiltersValues };

    if (sfvArray.toString() != sffCopy.toString()) {
      sfvArray.forEach((sfv) => {
        const z = sffCopy.find((sff) => sff == sfv);

        if (!z) sfvCopy[sfv] = undefined;
      });

      setSelectedFiltersValues(sfvCopy);
    }
  }, [selectedFiltersFormatted]);

  useEffect(() => {
    if (!selectedFiltersValues) return;

    const sfv = { ...selectedFiltersValues };

    const filtersKeys = Object.keys(sfv);

    if (filtersKeys.length <= 0) return;

    filtersKeys.forEach((filterKey) => {
            if (sfv[filterKey] == undefined) {
        delete sfv[filterKey];

        setSelectedFiltersValues(sfv);
        setSelectedFilters(sfv ? Object.keys(sfv) : []);
      }
    });
  }, [selectedFiltersValues]);

  //   useEffect(() => {
  //     let route = '/products?';

  //     const [productsFiltered, routewithfilters] = applyFilters({
  //       products: ProductsCollection,
  //       filters: selectedFiltersValues,
  //       setSelectedFilters: setSelectedFilters,
  //       setSelectedFiltersValue: setSelectedFiltersValues,
  //       route: route
  //     });

  //     const [productsSortered, routewithsorter] = applySorter({
  //       products: productsFiltered,
  //       sortCollection: ProductSortCollection,
  //       sortValue: sortValue,
  //       route: routewithfilters
  //     });

  //     const [pagedProducts, routewithpage, klk] = applyPaging({
  //       allProducts: ProductsCollection,
  //       products: productsSortered,
  //       pagerValues: pagerOptions,
  //       route: routewithsorter,
  //       pagerOptions: pagerOptions
  //     });
  // console.log(klk);
  // //setPagerOptions(klk)
  //     setProducts(pagedProducts);
  //     //console.log(routewithpage);
  //     navigate(routewithpage)
  //   }, [selectedFiltersValues, sortValue, pagerResult]);

  
  useEffect(() => {
    let p = ProductsCollection.slice();

    const queryFilters = query.get('filters');
    const querySorter = query.get('sort');
    const queryPager = query.get('page');

    if(queryFilters != null){      
      const [productsFiltered] = applyFilters({
        products: p,
        filters: JSON.parse(queryFilters),
        setSelectedFilters: setSelectedFilters,
        setSelectedFiltersValue: setSelectedFiltersValues,
        route: ''
      });      
      p = productsFiltered;
      setProducts2(productsFiltered)
    }

    if(querySorter != null){      
      const [productsSortered] = applySorter({
        products: p,
        sortCollection: ProductSortCollection,
        sortValue: querySorter,
        route: ''
      });

      p = productsSortered
    }    

    if (queryPager != null) {
      const [pagedProducts] = applyPaging({
        allProducts: ProductsCollection,
        products: p,
        pagerValues: pagerOptions,
        route: '',
        pagerOptions: pagerOptions,
      });
    
      p = pagedProducts;
    }
    
    setProducts(p);
  }, [query]);

  return (
    <div className="w-[95em] px-6">
      <div className="flex flex-col pt-10 pb-5 gap-3">
        <div>
          <header className="font-bold text-3xl">{t("productos")}</header>
          <p className="text-base text-gray-500">
            {t("productos-descripcion2")}
          </p>
        </div>
        <Divider orientation="horizontal" className="" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 flex-wrap tablet:flex-nowrap">
          <div className="flex items-center gap-5 w-full flex-wrap">
            {FilterPanelBtns()}
            {FilterPanelComponent()}
          </div>
          {SortBtnComponent()}
        </div>
        <Divider orientation="horizontal" />
        {products.length <= 0 ? (
          <div className="flex text-7xl flex-col items-center justify-center gap-4 h-[70vh]">
            <BoxIcon size="" />
            <p className="text-3xl">{t("productos-no-encontrados")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap gap-[.9em]">
              {products.map((prod) => (
                <Card
                  key={prod.id}
                  isBlurred={false}
                  className="border w-full rounded-lg border-gray-300 dark:border-gray-700 bg-transparent desktop:w-[24%] laptop:w-[32.4%] tablet:w-[49%]"
                  shadow="none"
                >
                  <CardBody className="p-0 rounded-lg border-none border-gray-300 dark:border-gray-700 ">
                    <Link
                      href={`${PublicRoutes.PRODUCTS}/${prod.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`${PublicRoutes.PRODUCTS}/${prod.id}`);
                      }}
                    >
                      <div className="flex flex-col gap-2 border-none text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-lg p-3">
                        <img src={eCommerce} className="w-[100%] h-auto" />
                        <div className="flex flex-col gap-4 px-2">
                          <div className="flex flex-col gap-0">
                            <p className=" text-xl">{prod.name}</p>
                            <div className="flex items-center gap-0 text-gray-500">
                              <p className="mr-2">
                                {prod.rating.reduce((a, b) => {
                                  return Math.max(Number(a), Number(b));
                                }, 0)}
                                {prod.rating
                                  .find((rat) => String(rat).includes("."))
                                  ?.toString()
                                  .replace("0", "")}
                              </p>
                              {renderProductRating(prod.rating)}
                            </div>
                            {renderUnitsInStock(prod.stock)}
                          </div>
                          <div className="flex gap-[2px]">
                            <p>$</p>
                            <p className="text-4xl">
                              {String(prod.cost).split(".")[0]}
                            </p>
                            <p className="">
                              .
                              {String(prod.cost).split(".")[1] == undefined
                                ? "00"
                                : String(prod.cost).split(".")[1]}
                            </p>
                          </div>
                          <Button
                            size="md"
                            radius="sm"
                            variant="bordered"
                            className="border border-none text-gray-100 bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              const cartExists = JSON.parse(
                                String(localStorage.getItem("cart"))
                              ) as cartProducts[] | null;

                              if (cartExists != null) {
                                const prodInCart = cartExists.find(
                                  (ce) => ce.productInfo.id == prod.id
                                );

                                if (
                                  prodInCart != null ||
                                  prodInCart != undefined
                                ) {
                                  if (
                                    prodInCart.cartInfo.amount !== prod.stock
                                  ) {
                                    prodInCart.cartInfo.amount += 1;
                                  } else {
                                    return toast.error(
                                      t(
                                        "existencia-de-producto-en-tienda-excedida"
                                      )
                                    );
                                  }
                                } else {
                                  const cartProduct: cartProducts = {
                                    productInfo: prod,
                                    cartInfo: {
                                      amount: 1,
                                    },
                                  };
                                  cartExists.push(cartProduct);
                                }
                                setCart(cartExists);
                              } else {
                                const cartProducts: cartProducts[] = [
                                  {
                                    productInfo: prod,
                                    cartInfo: {
                                      amount: 1,
                                    },
                                  },
                                ];
                                setCart(cartProducts);
                              }

                              toast.success(
                                t("producto-agredado-a-carrito", {
                                  action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                  },
                                })
                              );
                            }}
                          >
                            {t("agregar-al-carrito")}
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-center">
              {PagerComponent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;