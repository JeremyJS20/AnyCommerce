import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Icon } from "../../Assets/Icons/IconsCollection";
import { pagerOptionsType } from "../../Utils/types.utils";
import { Link2 } from "../../Components/Common/Inputs/Link";
import { useNavigator, useQuery, useTranslator } from "./useCommon";

type IUsePagerProps = {
  items: any[];
  take: number;
};

type usePagerType = {
  pagerOptions: any;
  setPagerOptions: any;
  pagerResult: any;
  PagerComponent: () => JSX.Element;
};

const usePager = ({ ...props }: IUsePagerProps): usePagerType => {
  const query = useQuery();
  const navigator = useNavigator();
  const translator = useTranslator();

  const firstItem = 2;
  const lastItem = 4;

  const [pagerOptions, setPagerOptions] = useState<pagerOptionsType>({
    pages: [],
    pagesAmount: 0,
    currentPage: Number(query.get("page")) == 0 ? 1 : Number(query.get("page")),
    starting:
      (Number(query.get("page")) <= 1 ? 0 : Number(query.get("page")) - 1) *
      props.take,
    take: props.take,
  });

  useEffect(() => {
    const pages = [];

    for (let i = 0; i < props.items.length; i++) {
      const element = i + 1;

      if (element % props.take == 0) pages.push(pages.length + 1);

      if (i == props.items.length - 1) {
        if (props.items.length % props.take > 0) pages.push(pages.length + 1);
      }
    }

    setPagerOptions({
      ...pagerOptions,
      pages: pages as [],
      pagesAmount: pages.length,
    });
  }, [props.items]);

  //   useEffect(() => {
  //     const queryFilters = JSON.parse(String(query.get("filters")));

  //     console.log(Number(query.get('page')), pagerOptions.currentPage);

  //     if (queryFilters != null && Object.keys(queryFilters).length > 0) {
  //       console.log(query.get('page'));
  //       setPagerOptions({
  //         ...pagerOptions,
  //         currentPage: 1,
  //         starting: 0
  //       });
  //     }
  //   }, [query]);

  useEffect(() => {
    //      const queryFilters = JSON.parse(String(query.get("filters")));

    //     if(Number(query.get('page')) == 1){
    //         if (queryFilters != null && Object.keys(queryFilters).length <= 1) {
    //             console.log('klk');

    //             return navigate(
    //               `/products?page=${query.get("page")}${
    //                 query.get("filters") != null ? `&filters=${query.get("filters")}` : ""
    //               }${query.get("sort") != null ? `&sort=${query.get("sort")}` : ""}`
    //             );
    //           } else {
    //             navigate(
    //                 `/products?page=${pagerOptions.currentPage}${
    //                   query.get("filters") != null ? `&filters=${query.get("filters")}` : ""
    //                 }${query.get("sort") != null ? `&sort=${query.get("sort")}` : ""}`
    //               );
    //           }
    //     } else {
    //         navigate(
    //             `/products?page=${pagerOptions.currentPage}${
    //               query.get("filters") != null ? `&filters=${query.get("filters")}` : ""
    //             }${query.get("sort") != null ? `&sort=${query.get("sort")}` : ""}`
    //           );
    //     }
    // console.log(query.get('page'));

    navigator({
      route: `${location.pathname}?page=${pagerOptions.currentPage}${
        query.get("filters") != null ? `&filters=${query.get("filters")}` : ""
      }${query.get("sort") != null ? `&sort=${query.get("sort")}` : ""}`,
    });

    const pageTile = localStorage.getItem('pageTitle');
        
    if(pageTile != null) document.title = `${translator({text: pageTile})} - AnyCommerce`;
    else document.title = 'AnyCommerce';
  }, [pagerOptions]);

  return {
    pagerOptions: pagerOptions,
    setPagerOptions: setPagerOptions,
    pagerResult: pagerOptions,
    PagerComponent: () => (
      <div className="flex gap-3">
        {pagerOptions.pages.length > 0 &&
          pagerOptions.pages[0] != firstItem && (
            <div className="flex items-center gap-2">
              <Link2
                additionalClassName="text-sm dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-transparent rounded-xl"
                text={
                  <div className="flex items-center gap-1">
                    <Icon icon="doubleArrowLeft" size="base" />
                  </div>
                }
                disabled={
                  pagerOptions.currentPage == pagerOptions.pages[0] ||
                  pagerOptions.pages.length <= 1
                }
                action={() => {
                  setPagerOptions({
                    ...pagerOptions,
                    currentPage: pagerOptions.pages[0],
                    starting:
                      pagerOptions.pages[0] == 1
                        ? 0
                        : Number(pagerOptions.pages[0] * props.take),
                    take: props.take,
                  });
                }}
              />

              <Link2
                additionalClassName="text-sm dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-transparent rounded-xl"
                text={
                  <div className="flex items-center gap-1">
                    <Icon icon="arrowLeft" size="base" />
                  </div>
                }
                disabled={
                  pagerOptions.currentPage == pagerOptions.pages[0] ||
                  pagerOptions.pages.length <= 1
                }
                action={() => {
                  setPagerOptions({
                    ...pagerOptions,
                    currentPage: pagerOptions.currentPage - 1,
                    starting:
                      pagerOptions.currentPage == 1
                        ? 0
                        : Number(String(pagerOptions.currentPage - 2)) *
                          props.take,
                    take: props.take,
                  });
                }}
              />
            </div>
          )}
        <div className="flex gap-1">
          {!(pagerOptions.pages.length > 10) ? (
            pagerOptions.pages.map((page) => (
              <Link2
                text={page}
                additionalClassName={`text-gray-100 dark:text-gray-900 px-3 py-1 rounded-xl ${
                  page == pagerOptions.currentPage
                    ? "bg-gray-900 dark:bg-gray-100"
                    : "!text-gray-900 dark:!text-gray-100"
                }`}
                action={() => {
                  navigator({ route: `?page=${page}`, title: 'productos'});
                  setPagerOptions({
                    ...pagerOptions,
                    currentPage: page,
                    starting: page == 1 ? 0 : Number((page - 1) * props.take),
                    take: props.take,
                  });
                }}
              />
            ))
          ) : (
            <>
              <div
                className={`flex ${
                  pagerOptions.currentPage > 5 ? "flex-row-reverse" : ""
                }`}
              >
                <div className={`flex `}>
                  {(pagerOptions.currentPage <= 5
                    ? pagerOptions.pages.slice(0, 5)
                    : pagerOptions.pages.slice(
                        Number(pagerOptions.currentPage) - 1,
                        Number(pagerOptions.currentPage) - 1 + 5
                      )
                  ).map((page) => (
                    <Link2
                      text={page}
                      additionalClassName={`text-gray-100 dark:text-gray-900 px-3 py-1 rounded-xl ${
                        pagerOptions.pages.slice(-5).includes(page)
                          ? "hidden"
                          : ""
                      } ${
                        page == pagerOptions.currentPage
                          ? "bg-gray-900 dark:bg-gray-100"
                          : "!text-gray-900 dark:!text-gray-100"
                      }`}
                      action={() => {
                        navigator({ route: `?page=${page}`, title: 'productos'});
                        setPagerOptions({
                          ...pagerOptions,
                          currentPage: page,
                          starting:
                            page == 1 ? 0 : Number((page - 1) * props.take),
                          take: props.take,
                        });
                      }}
                    />
                  ))}
                </div>

                <Dropdown
                  classNames={{
                    base: " !min-w-[3em] !max-h-[10em] overflow-auto",
                  }}
                  className=" bg-gray-200 dark:bg-gray-700"
                >
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      startContent={<Icon icon="horizontalDots" size="base" />}
                      className="bg-transparent p-0"
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="dd"
                    selectionMode="single"
                    className=" !w-[3em] !max-h-[10em]"
                    itemClasses={{
                      base: "text-center",
                      selectedIcon: "hidden",
                    }}
                    onSelectionChange={(e) => {
                      const page = Number(Array.from(e)[0]);

                      setPagerOptions({
                        ...pagerOptions,
                        currentPage: page,
                        starting: page == 1 ? 0 : Number(String(page - 1)),
                        take: props.take,
                      });
                    }}
                  >
                    {(pagerOptions.currentPage <= 5
                      ? pagerOptions.pages.slice(5, -5)
                      : pagerOptions.pages.slice(
                          0,
                          pagerOptions.currentPage - 1
                        )
                    ).map((page) => (
                      <DropdownItem
                        key={page}
                        textValue={String(page)}
                        className={`text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100 `}
                      >
                        <p>{page}</p>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              {pagerOptions.pages.slice(-5).map((page) => (
                <Link2
                  text={page}
                  additionalClassName={`text-gray-100 dark:text-gray-900 px-3 py-1 rounded-xl ${
                    page == pagerOptions.currentPage
                      ? "bg-gray-900 dark:bg-gray-100"
                      : "!text-gray-900 dark:!text-gray-100"
                  }`}
                  action={() => {
                    navigator({ route: `?page=${page}`, title: 'productos'});
                    setPagerOptions({
                      ...pagerOptions,
                      currentPage: page,
                      starting: page == 1 ? 0 : Number(String(page - 1)),
                      take: props.take,
                    });
                  }}
                />
              ))}
            </>
          )}
        </div>
        {pagerOptions.pages.length > 0 &&
          pagerOptions.pages.slice(-1)[0] != lastItem && (
            <div className="flex items-center gap-2">
              <Link2
                text={
                  <div className="flex items-center gap-1">
                    <Icon icon="arrowRight" size="base" />
                  </div>
                }
                additionalClassName="text-sm dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-transparent rounded-xl"
                disabled={
                  pagerOptions.currentPage == pagerOptions.pages.slice(-1)[0] ||
                  pagerOptions.pages.length <= 1
                }
                action={() => {
                  setPagerOptions({
                    ...pagerOptions,
                    currentPage: pagerOptions.currentPage + 1,
                    starting:
                      Number(String(pagerOptions.currentPage)) * props.take,
                  });
                }}
              />
              <Link2
                text={
                  <div className="flex items-center gap-1">
                    <Icon icon="doubleArrowRight" size="base" />
                  </div>
                }
                additionalClassName="text-sm dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-transparent rounded-xl"
                disabled={
                  pagerOptions.currentPage == pagerOptions.pages.slice(-1)[0] ||
                  pagerOptions.pages.length <= 1
                }
                action={() => {
                  setPagerOptions({
                    ...pagerOptions,
                    currentPage: pagerOptions.pages.slice(-1)[0],
                    starting:
                      pagerOptions.pages.slice(-1)[0] == 1
                        ? 0
                        : Number(
                            (pagerOptions.pages.slice(-1)[0] - 1) * props.take
                          ),
                    take: props.take,
                  });
                }}
              />
            </div>
          )}
      </div>
    ),
  };
};

export default usePager;
