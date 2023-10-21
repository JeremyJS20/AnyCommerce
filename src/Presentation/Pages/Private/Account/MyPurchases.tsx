import { FunctionComponent, useEffect, useState } from "react";
import {
  useFilterPanel,
  useFilterPanelBtns,
  useSortBtn,
} from "../../../Hooks/Common/useFilterPanel2";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
  Divider,
} from "@nextui-org/react";
import { purchaseInfo } from "../../../Utils/types.utils";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import usePager from "../../../Hooks/Common/usePager";
import {
  PurchaseFiltersCollection,
  PurchaseSortCollection,
} from "../../../Utils/DataCollection/Purchases.datacollection.filters";
import useMyPurchases from "../../../Hooks/Pages/Purchases/useMyPurchases";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import { useQuery, useTranslator } from "../../../Hooks/Common/useCommon";

type IMyPurchasesProps = {};

const MyPurchases: FunctionComponent<IMyPurchasesProps> = ({}) => {
  const translator = useTranslator();
  const query = useQuery();

  const [purchases, setPurchases] = useState<purchaseInfo[]>([]);
  const [purchases2, setPurchases2] = useState<purchaseInfo[]>([]);

  // const [selectedTableKeys, setSelectedTableKeys] = useState<Iterable<string>>(
  //   new Set([])
  // );

  const { applyFilters, applySorter, applyPaging } = useMyPurchases({});

  const { selectedFiltersFormatted, setSelectedFilters, FilterPanelComponent } =
    useFilterPanel({ filterCollection: PurchaseFiltersCollection });

  const { setSelectedFiltersValues, FilterPanelBtns } = useFilterPanelBtns({
    filterCollection: PurchaseFiltersCollection,
    selectedFilters: selectedFiltersFormatted,
  });

  const { SortBtnComponent } = useSortBtn({
    sortCollection: PurchaseSortCollection,
  });

  const columns = [
    { name: "id-compra", uid: "id" },
    { name: "producto", uid: "product" },
    { name: "cantidad", uid: "amount" },
    { name: "precio-total", uid: "totalAmout" },
    { name: "tienda", uid: "store" },
    { name: "metodo-de-pago", uid: "paymentMethod" },
    { name: "fecha-de-compra", uid: "dates.purchase" },
  ];

  const { PagerComponent, pagerOptions } = usePager({
    items: purchases2,
    take: 10,
  });

  const tableTopContent = () => (
    <>
      <div className="flex gap-4 flex-wrap tablet:flex-nowrap">
        <div className="flex items-center gap-5 w-full flex-wrap">
          {FilterPanelBtns()}
          {FilterPanelComponent()}
        </div>
        {SortBtnComponent()}
      </div>
      <Divider orientation="horizontal" />
    </>
  );

  const tableBottomContent = () => (
    <div className="flex items-center justify-between">
      <span className="w-[20%] hidden">
        {/* {Array.from(selectedTableKeys).join("") == "all"
          ? t("todos-los-items-seleccionados")
          : `${Array.from(selectedTableKeys).length} ${t("de").toLowerCase()} ${
              purchases2.length
            } ${t("seleccionados").toLowerCase()}`} */}
      </span>
      <div className="">{PagerComponent()}</div>
      <div className="w-[20%]"></div>
    </div>
  );

  useEffect(() => {
    let p: any = [].slice();

    const queryFilters = query.get("filters");
    const querySorter = query.get("sort");
    const queryPager = query.get("page");

    if (queryFilters != null) {
      const [purchasesFiltered] = applyFilters({
        purchases: p,
        filters: JSON.parse(queryFilters),
        setSelectedFilters: setSelectedFilters,
        setSelectedFiltersValue: setSelectedFiltersValues,
        route: "",
      });
      p = purchasesFiltered;
      setPurchases2(purchasesFiltered);
    }

    if (querySorter != null) {
      const [ordersSortered] = applySorter({
        purchases: p,
        sortCollection: PurchaseSortCollection,
        sortValue: querySorter,
      });

      p = ordersSortered;
    }

    if (queryPager != null) {
      const [pagedProducts] = applyPaging({
        allPurchases: [],
        purchases: p,
        pagerValues: pagerOptions,
        pagerOptions: pagerOptions,
      });

      p = pagedProducts;
    }

    setPurchases(p);
  }, [query]);

  return (
    <div className="flex gap-10 flex-col">
      <Table
        classNames={{
          wrapper: "shadow-none bg-gray-200 dark:bg-gray-800",
          th: " bg-gray-300 dark:bg-gray-700 text-default-500",
          td: "py-2",
          tr: "",
        }}
        aria-label="Example table with custom cells"
        //selectionMode="multiple"
        //selectionBehavior="toggle"
        //selectedKeys={selectedTableKeys}
        //onSelectionChange={setSelectedTableKeys as any}
        topContent={tableTopContent()}
        topContentPlacement="outside"
        bottomContent={tableBottomContent()}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {columns.map((column) => (
            <TableColumn key={column.uid} align="start">
              {translator({text: column.name})}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={translator({text: 'no-se-encontraron-compras'})}>
          {purchases.map((item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                return (
                  <TableCell
                    className={` ${
                      purchases.indexOf(item) % 2 == 1 ? " " : ""
                    } ${columnKey == "id" ? "" : ""} ${
                      columnKey == "actions" ? "" : ""
                    }`}
                  >
                    {
                      // columnKey == "id" ? (
                      //   <p className="underline underline-offset-2 cursor-pointer">
                      //     {getKeyValue(item, columnKey)}
                      //   </p>
                      // ) :
                      String(columnKey).includes("dates") ? (
                        <Moment
                          format="YYYY/MM/DD"
                          date={new Date(
                            String(
                              getKeyValue(
                                item.dates,
                                String(columnKey).split(".")[1]
                              )
                            )
                          ).toISOString()}
                        />
                      ) : columnKey == "totalAmout" ? (
                        <NumericFormat
                          value={getKeyValue(item, columnKey)}
                          prefix="$"
                          displayType="text"
                          thousandSeparator={","}
                          decimalSeparator="."
                        />
                      ) : columnKey == "status" ? (
                        <Chip
                          variant="flat"
                          // color={colorStatus[getKeyValue(item, columnKey)] as any}
                        >
                          <p className=" font-semibold">
                            {translator({text: getKeyValue(item, columnKey)})}
                          </p>
                        </Chip>
                      ) : columnKey == "actions" ? (
                        <Dropdown
                          placement="bottom-end"
                          classNames={{ base: "!min-w-[10em] " }}
                          className="bg-gray-200 dark:bg-gray-700"
                        >
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              startContent={<Icon icon="verticalDots" size="sm" />}
                              size="sm"
                              className="bg-transparent"
                            />
                          </DropdownTrigger>
                          <DropdownMenu
                            className="!max-w-[10em]"
                            aria-label="ddd"
                            variant="flat"
                          >
                            <DropdownItem
                              key="account"
                              textValue="2"
                              className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                            >
                              {translator({text: 'cancelar'})}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        getKeyValue(item, columnKey)
                      )
                    }
                  </TableCell>
                );
              }}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyPurchases;
