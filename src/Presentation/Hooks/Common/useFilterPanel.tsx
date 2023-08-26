import {
  Dropdown,
  Badge,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Input,
} from "@nextui-org/react";
import {
  useState,
  useMemo,
  useEffect,
  cloneElement,
  FunctionComponent,
} from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDownIcon,
  DollarSignIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from "../../Assets/Icons/IconsCollection";
import { commonType } from "../../Pages/PublicPages/Products/Products";

interface IFilterPanelProps {
  filterCollection: {
    key: string;
    text: string;
    filterValueSelected?: any;
    icon?: JSX.Element;
    inputType: "dropdown" | "range" | "search" | "";
    inputOptions?: {
      items: commonType[] | any;
    };
  }[];
  setSelectedFilters: (s: string[]) => any;
  getFilters: () => any;
}

type IRendersProps = {
  keyFilter: string;
  filter: any;
  setSelectedFiltersValues: any;
  getSelectedFilterValues?: any
};

export const FilterPanelComponent = ({ ...props }: IFilterPanelProps) => {
  const { t } = useTranslation();

  const [selectedFilters, setSelectedFilters] = useState<Iterable<string>>(
    new Set([])
  );

  const selectedValue = useMemo(
    () => Array.from(selectedFilters).join(".").split(".").filter((d) => d != ""),
    [selectedFilters]
  );

  useEffect(() => props.setSelectedFilters(selectedValue), [selectedValue]);

  useEffect(() => {
    if(selectedValue.toString() != props.getFilters().toString()) setSelectedFilters(props.getFilters());
  }, [props.getFilters()]);

  return (
    <Dropdown
      classNames={{ base: "" }}
      className="bg-gray-200 dark:bg-gray-700"
    >
      <DropdownTrigger>
        <Button
          size="md"
          radius="sm"
          variant="light"
          className="bg-transparent "
        >
          <div className="flex items-end">
            <FilterIcon size="lg" />
            <p className="text-sm text-end h-4 ml-[-10px]">+</p>
          </div>
          <p className={`text-sm `}>{t("agregar-filtro")}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          base: "gap-3",
          title: "text-sm",
          description: "",
        }}
        aria-label="Single selection actions"
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={selectedFilters}
        onSelectionChange={setSelectedFilters as any}
      >
        <DropdownSection
          aria-aria-labelledby="ddd"
          title="Filters"
          classNames={{ heading: "text-sm" }}
        >
          {props.filterCollection.map((fc: any) => (
            <DropdownItem
              key={fc.key}
              className={`text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100 `}
              startContent={fc.icon}
            >
              {t(fc.text)}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export const FilterPanelBtns = ({
  ...props
}: {
  selectedFilters: string[];
  filterCollection: any;
  setSelectedFiltersValues: (fv: any) => any;
}) => {
  const [filterValues, setFilterValues] = useState<any>();

  useEffect(
    () => props.setSelectedFiltersValues(filterValues as any),
    [filterValues]
  );

  useEffect(() => {
    console.log(props.selectedFilters);
    
  }, [props.selectedFilters])

  if (props.selectedFilters.length <= 0) return <></>;

  return props.selectedFilters.map((filterId) => {
    const filter = props.filterCollection.find(
      (f: any) => f.key == filterId.trim()
    );

    if (filter?.inputType === "dropdown") {
      return cloneElement(
        <RenderDropDown
          keyFilter={filter.key}
          filter={filter}
          getSelectedFilterValues={() => (filterValues)}
          setSelectedFiltersValues={(currentValue: any) =>
            setFilterValues((prevValue: any) => ({
              ...prevValue,
              ...currentValue,
            }))
          }
        />
      );
    }

    if (filter?.inputType == "range") {
      return cloneElement(
        <RenderRange
          keyFilter={filter.key}
          filter={filter}
          getSelectedFilterValues={() => (filterValues)}
          setSelectedFiltersValues={(currentValue: any) =>
            setFilterValues((prevValue: any) => ({
              ...prevValue,
              ...currentValue,
            }))
          }
        />
      );
    }

    return cloneElement(
      <RenderSearcher
        keyFilter={filter.key}
        filter={filter}
        getSelectedFilterValues={() => (filterValues)}
        setSelectedFiltersValues={(currentValue: any) =>
          setFilterValues((prevValue: any) => ({
            ...prevValue,
            ...currentValue,
          }))
        }
      />
    );
  });
};

const RenderDropDown: FunctionComponent<IRendersProps> = ({
  ...props
}: IRendersProps) => {
  const { t } = useTranslation();

  const [filterValues, setFilterValues] = useState<any>();

  const [selectedKey, setSelectedKey] = useState<Iterable<string>>(new Set([]));

  const selectedValue2 = useMemo(
    () => Array.from(selectedKey)[0],
    [selectedKey]
  );

  useEffect(() => {
    props.setSelectedFiltersValues(filterValues);
  }, [filterValues]);

  useEffect(() => {
    const temp = (props.filter.inputOptions?.items as commonType[]).find(
      (f) => f.key == selectedValue2
    );

    if (temp === undefined) return;
    setFilterValues({ ...filterValues, [props.keyFilter]: temp });
  }, [selectedValue2]);

  return (
    <Dropdown
      classNames={{ base: "" }}
      className="bg-gray-200 dark:bg-gray-700"
    >
      <Badge
        content={"X"}
        color="primary"
        size="sm"
        classNames={{
          badge: ` top-1 p-2 left-[2px] bg-gray-800 text-gray-100 dark:bg-gray-100 border-none dark:text-gray-800 cursor-pointer`,
        }}
      >
        <DropdownTrigger>
          <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
            endContent={<ArrowDownIcon size="xs" />}
            startContent={props.filter.icon}
          >
            <p className={`text-md text-gray-900 dark:text-gray-100`}>
              {t(props.filter.text)}:{" "}
              <span className="font-bold">
                {
                  (props.filter.inputOptions?.items as commonType[]).find(
                    (f) => f.key == selectedValue2
                  )?.text
                }
              </span>
            </p>
          </Button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu
        itemClasses={{
          base: "gap-4",
          title: "text-sm",
          description: "",
        }}
        aria-label="dd"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selectedKey}
        onSelectionChange={setSelectedKey as any}
      >
        {props.filter.inputOptions?.items.map((f: commonType) => (
          <DropdownItem
            key={f.key}
            className={`text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100 `}
            //onClick={() => navigate(feat.route)}
            //startContent={filter.icon}
          >
            {t(f.text)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const RenderRange: FunctionComponent<IRendersProps> = ({
  ...props
}: IRendersProps) => {
  const { t } = useTranslation();

  const [filterValues, setFilterValues] = useState<any>({
    price: {
      min: 0,
      max: 0,
    },
  });

  useEffect(() => props.setSelectedFiltersValues(filterValues), [filterValues]);

  return (
    <Dropdown
      classNames={{ base: "!bg-green-500" }}
      className="bg-gray-200 dark:bg-gray-700"
    >
      <Badge
        content={"X"}
        color="primary"
        size="sm"
        classNames={{
          badge: ` top-1 p-2 left-[2px] bg-gray-800 text-gray-100 dark:bg-gray-100 border-none dark:text-gray-800 cursor-pointer`,
        }}
        onClick={() => {
            let currentFilters = props.getSelectedFilterValues();

            Object.keys(currentFilters).forEach(cf => {
                if(cf === props.keyFilter) currentFilters = {...currentFilters, [cf]: undefined};
            });

            // setFilterValues({
            //     price: {
            //       min: 0,
            //       max: 0,
            //     }
            // });
            props.setSelectedFiltersValues(currentFilters);
        }}
      >
        <DropdownTrigger>
          <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
            endContent={<ArrowDownIcon size="xs" />}
            startContent={props.filter.icon}
          >
            <p className={`text-md text-gray-900 dark:text-gray-100`}>
              {t(props.filter.text)}:{" "}
              <span className="font-bold">
                {Object.values(filterValues.price).some((p: any) => p > 0)
                  ? ` min ${filterValues.price.min}, max ${filterValues.price.max}`
                  : ""}
              </span>
            </p>
          </Button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu
        itemClasses={{
          base: "gap-4 bg-green-500",
          title: "text-sm",
          description: "",
        }}
        aria-label="dd"
        closeOnSelect={false}
      >
        <DropdownItem
          className={`text-gray-800 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:text-gray-100 cursor-default !h-[500px]`}
          //onClick={() => navigate(feat.route)}
          //startContent={filter.icon}
          isReadOnly
        >
          <div className="flex flex-col gap-2">
            <div className=""></div>
            <div className="flex gap-5">
              <Input
                classNames={{
                  base: "w-[4em]",
                  mainWrapper: "w-[4em]",
                  input: "text-sm w-[4em]",
                  inputWrapper:
                    "border border-gray-700 !bg-transparent text-gray-900 dark:text-gray-100 dark:border-gray-600 hover:!bg-gray-200 dark:hover:!bg-gray-700 ",
                }}
                size="sm"
                type="number"
                label="Min"
                maxLength={2}
                startContent={<DollarSignIcon size="xs" />}
                value={String(filterValues.price.min)}
                onValueChange={(value) => {
                  const x = {
                    ...filterValues,
                    price: { ...filterValues.price, min: Number(value) },
                  };
                  //if (x.price.min > x.price.max) x.price.max = x.price.min * 2;
                  x.price.max = x.price.min * 2;
                  setFilterValues(x);
                }}
              />
              <Input
                classNames={{
                  base: "w-[4em]",
                  mainWrapper: "w-[4em]",
                  input: "text-sm w-[4em]",
                  inputWrapper:
                    "border border-gray-700 !bg-transparent text-gray-900 dark:text-gray-100 dark:border-gray-600 hover:!bg-gray-200 dark:hover:!bg-gray-700 ",
                }}
                className="!z-50"
                size="sm"
                type="number"
                label="Max"
                maxLength={2}
                startContent={<DollarSignIcon size="xs" />}
                value={String(filterValues.price.max)}
                onValueChange={(value) => {
                  //if (Number(value) < filterValues.price.min) return;
                  setFilterValues({
                    ...filterValues,
                    price: { ...filterValues.price, max: Number(value) },
                  });
                }}
              />
            </div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const RenderSearcher: FunctionComponent<IRendersProps> = ({
  ...props
}: IRendersProps) => {
  const { t } = useTranslation();

  const [filterValues, setFilterValues] = useState<any>({
    search: "",
  });

  useEffect(() => props.setSelectedFiltersValues(filterValues), [filterValues]);

  return (
    <Input
      classNames={{
        base: "w-[15em]",
        mainWrapper: "",
        input: "text-sm ",
        inputWrapper:
          "border border-gray-700 !bg-transparent text-gray-900 dark:text-gray-100 dark:border-gray-600 hover:!bg-gray-200 dark:hover:!bg-gray-700 ",
      }}
      size="md"
      type="text"
      startContent={<SearchIcon size="sm" />}
      value={filterValues.search}
      width={50}
      placeholder={t("escribe-nombre-algun-producto")}
      onValueChange={(value) =>
        setFilterValues({ ...filterValues, search: value })
      }
      endContent={ <div className={`cursor-pointer `} onClick={() => console.log('ddd')}><XIcon size="xs"/></div>
      }
    />
  );
};
//${filterValues.search == ''? 'hidden': ''}