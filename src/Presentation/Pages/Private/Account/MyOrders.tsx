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
import { useTranslation } from "react-i18next";
import {
  OrdersFiltersCollection,
  OrdersSortCollection,
} from "../../../Utils/DataCollection/Orders.datacollection.filters";
import { orderInfo } from "../../../Utils/types.utils";
import { ordersCollection } from "../../../Utils/DataCollection/Orders.datacollection";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import usePager, { useQuery } from "../../../Hooks/Common/usePager";
import { VerticalDotsIcon } from "../../../Assets/Icons/IconsCollection";
import useMyOrders from "../../../Hooks/Pages/Orders/useMyOrders";

type IMyOrdersProps = {};

const MyOrders: FunctionComponent<IMyOrdersProps> = ({}) => {
  const { t } = useTranslation();
  const query = useQuery();

  const [orders, setOrders] = useState<orderInfo[]>(ordersCollection);
  const [orders2, setOrders2] = useState<orderInfo[]>(ordersCollection);

  const [selectedTableKeys, setSelectedTableKeys] = useState<Iterable<string>>(
    new Set([])
  );

  const { applyFilters, applySorter, applyPaging } = useMyOrders({});

  const { selectedFiltersFormatted, setSelectedFilters, FilterPanelComponent } =
    useFilterPanel({ filterCollection: OrdersFiltersCollection });

  const { setSelectedFiltersValues, FilterPanelBtns } = useFilterPanelBtns({
    filterCollection: OrdersFiltersCollection,
    selectedFilters: selectedFiltersFormatted,
  });

  const { SortBtnComponent } = useSortBtn({
    sortCollection: OrdersSortCollection,
  });

  const columns = [
    { name: "id-pedido", uid: "id" },
    { name: "cantidad", uid: "amount" },
    { name: "precio-total", uid: "totalAmout" },
    { name: "fecha-de-pedido", uid: "dates.order" },
    { name: "fecha-de-entrega", uid: "dates.delivery" },
    { name: "estado", uid: "status" },
    { name: "acciones", uid: "actions" },
  ];

  const colorStatus: any = {
    ordered: "default",
    canceled: "danger",
    received: "success",
    shipped: "warning",
    delivered: "primary",
    pending: "secondary",
  };

  const { PagerComponent, pagerOptions } = usePager({
    items: orders2,
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
      <span className="w-[20%]">
        {Array.from(selectedTableKeys).join("") == "all"
          ? t("todos-los-items-seleccionados")
          : `${Array.from(selectedTableKeys).length} ${t("de").toLowerCase()} ${
              orders2.length
            } ${t("seleccionados").toLowerCase()}`}
      </span>
      <div className="">{PagerComponent()}</div>
      <div className="w-[20%]"></div>
    </div>
  );

  useEffect(() => {
    let p = ordersCollection.slice();

    const queryFilters = query.get("filters");
    const querySorter = query.get("sort");
    const queryPager = query.get("page");

    if (queryFilters != null) {
      const [ordersFiltered] = applyFilters({
        orders: p,
        filters: JSON.parse(queryFilters),
        setSelectedFilters: setSelectedFilters,
        setSelectedFiltersValue: setSelectedFiltersValues,
        route: "",
      });
      p = ordersFiltered;
      setOrders2(ordersFiltered);
    }

    if (querySorter != null) {
      const [ordersSortered] = applySorter({
        orders: p,
        sortCollection: OrdersSortCollection,
        sortValue: querySorter,
      });

      p = ordersSortered;
    }

    if (queryPager != null) {
      const [pagedProducts] = applyPaging({
        allOrders: ordersCollection,
        orders: p,
        pagerValues: pagerOptions,
        pagerOptions: pagerOptions,
      });

      p = pagedProducts;
    }

    setOrders(p);
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
        selectionMode="multiple"
        selectedKeys={selectedTableKeys}
        onSelectionChange={setSelectedTableKeys as any}
        topContent={tableTopContent()}
        topContentPlacement="outside"
        bottomContent={tableBottomContent()}
        bottomContentPlacement="outside"
        selectionBehavior="toggle"
      >
        <TableHeader columns={columns}>
          {columns.map((column) => (
            <TableColumn key={column.uid} align="start">
              {t(column.name)}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={t("no-se-encontraron-ordenes")}>
          {orders.map((item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                return (
                  <TableCell
                    className={` ${orders.indexOf(item) % 2 == 1 ? " " : ""} ${
                      columnKey == "id" ? "" : ""
                    } ${columnKey == "actions" ? "" : ""}`}
                  >
                    {columnKey == "id" ? (
                      <p className="underline underline-offset-2 cursor-pointer">
                        {getKeyValue(item, columnKey)}
                      </p>
                    ) : String(columnKey).includes("dates") ? (
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
                        color={colorStatus[getKeyValue(item, columnKey)] as any}
                      >
                        <p className=" font-semibold">
                          {t(getKeyValue(item, columnKey))}
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
                            startContent={<VerticalDotsIcon size="sm" />}
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
                            {t("cancelar")}
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
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

export default MyOrders;
