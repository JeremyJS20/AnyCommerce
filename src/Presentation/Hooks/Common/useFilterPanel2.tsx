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
import {
  FiltersCollectionType,
  SortCollectionType,
} from "../../Utils/DataCollection/Products.datacollection.filter.utils";
import { useLocation } from "react-router-dom";
import { Icon } from "../../Assets/Icons/IconsCollection";
import { useNavigator, useQuery, useTranslator } from "./useCommon";
import { commonType } from "../../Utils/types.utils";

interface IFilterPanelProps {
  filterCollection: FiltersCollectionType[];
}

type IRendersProps = {
  keyFilter: string;
  filter: any;
  setSelectedFiltersValues: any;
  getSelectedFilterValues?: any;
};

export const useFilterPanel = ({ ...props }: IFilterPanelProps) => {
  const translator = useTranslator();
  const query = useQuery();

  const [selectedFilters, setSelectedFilters] = useState<Iterable<string>>(
    new Set([])
  );

  const selectedValue: string[] = useMemo(
    () =>
      Array.from(selectedFilters)
        .join(".")
        .split(".")
        .filter((d) => d != "")
        .map((x) => props.filterCollection.find((fc) => fc.key == x))
        .sort(
          (a, b) =>
            (a as FiltersCollectionType).placeNumber -
            (b as FiltersCollectionType).placeNumber
        )
        .map((x) => x?.key) as string[],
    [selectedFilters]
  );

  useEffect(() => {
    if(query.get('filters') != null){
      setSelectedFilters(Object.keys(JSON.parse(String(query.get('filters')))));
    }
  }, [query]);

  return {
    selectedFilters: selectedFilters,
    selectedFiltersFormatted: selectedValue,
    setSelectedFilters: setSelectedFilters,
    FilterPanelComponent: () => (
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
              <Icon icon="filter" size="lg" color="text-gray-900 dark:text-gray-100"/>
              <p className="text-sm text-end h-4 ml-[-5px] pt-[2px]">+</p>
            </div>
            <p className={`text-sm `}>{translator({text: 'agregar-filtro'})}</p>
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
            title={translator({text: 'filtros'})}
            classNames={{ heading: "text-sm" }}
          >
            {props.filterCollection.map((fc: any) => (
              <DropdownItem
                key={fc.key}
                className={`text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100 `}
                startContent={fc.icon}
              >
                {translator({text: fc.text})}
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    ),
  };
};

export const useFilterPanelBtns = ({
  ...props
}: {
  selectedFilters: string[];
  filterCollection: FiltersCollectionType[];
}) => {
  const location = useLocation();
  const navigator = useNavigator();
  const query = useQuery();

  const [filterValues, setFilterValues] = useState<any>({});

  useEffect(() => {
    if(query.get('filters') != null){
      setFilterValues(JSON.parse(String(query.get('filters'))))
    }
  }, [query]);

  useEffect(() => {
    const querys = location.search.split('&').filter(r => !(r.includes('filters')));

    const actualRoute = `${location.pathname}${querys[0]}`;

    if(Object.keys(filterValues).length > 0) navigator({route: `${actualRoute}&filters=${JSON.stringify(filterValues)}${querys[1]? `&${querys[1]}`: ''}`, title: String(localStorage.getItem('pageTitle'))})
    else navigator({route: `${actualRoute}${querys[1]? `&${querys[1]}`: ''}`, title: String(localStorage.getItem('pageTitle'))})
  } ,[filterValues]);

  return {
    selectedFiltersValues: filterValues,
    setSelectedFiltersValues: setFilterValues,
    FilterPanelBtns: () => {
      if (props.selectedFilters.length <= 0) return <></>;
      return props.selectedFilters
        .map((sfv) => props.filterCollection.find((pf) => pf.key == sfv))
        .sort(
          (a, b) =>
            (a as FiltersCollectionType).placeNumber -
            (b as FiltersCollectionType).placeNumber
        )
        .map((filter) => {
          if (filter?.inputType === "dropdown") {
            return cloneElement(
              <RenderDropDown
                key={filter.key}
                keyFilter={filter.key}
                filter={filter}
                getSelectedFilterValues={() => filterValues}
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
                key={filter.key}
                keyFilter={filter.key}
                filter={filter}
                getSelectedFilterValues={() => filterValues}
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
              key={filter?.key}
              keyFilter={String(filter?.key)}
              filter={filter}
              getSelectedFilterValues={() => filterValues}
              setSelectedFiltersValues={(currentValue: any) =>
                setFilterValues((prevValue: any) => ({
                  ...prevValue,
                  ...currentValue,
                }))
              }
            />
          );
        });
      // return props.selectedFilters.map((filterId) => {
      //   const filter = props.filterCollection.find(
      //     (f: any) => f.key == filterId.trim()
      //   );

      //   if (filter?.inputType === "dropdown") {
      //     return cloneElement(
      //       <RenderDropDown
      //         keyFilter={filter.key}
      //         filter={filter}
      //         getSelectedFilterValues={() => filterValues}
      //         setSelectedFiltersValues={(currentValue: any) =>
      //           setFilterValues((prevValue: any) => ({
      //             ...prevValue,
      //             ...currentValue,
      //           }))
      //         }
      //       />
      //     );
      //   }

      //   if (filter?.inputType == "range") {
      //     return cloneElement(
      //       <RenderRange
      //         keyFilter={filter.key}
      //         filter={filter}
      //         getSelectedFilterValues={() => filterValues}
      //         setSelectedFiltersValues={(currentValue: any) =>
      //           setFilterValues((prevValue: any) => ({
      //             ...prevValue,
      //             ...currentValue,
      //           }))
      //         }
      //       />
      //     );
      //   }

      //   return cloneElement(
      //     <RenderSearcher
      //       keyFilter={filter.key}
      //       filter={filter}
      //       getSelectedFilterValues={() => filterValues}
      //       setSelectedFiltersValues={(currentValue: any) =>
      //         setFilterValues((prevValue: any) => ({
      //           ...prevValue,
      //           ...currentValue,
      //         }))
      //       }
      //     />
      //   );
      // });
    },
  };
};

export const useSortBtn = ({
  ...props
}: {
  sortCollection: SortCollectionType[];
}) => {
  const translator = useTranslator();
  const navigator = useNavigator();
  const query = useQuery();

  const [selectedKey, setSelectedKey] = useState<Iterable<string>>(new Set([]));

  const sortValue = useMemo(() => Array.from(selectedKey)[0], [selectedKey]);

  useEffect(() => {
    const activeSorter = props.sortCollection.find(sc => sc.key == sortValue);

    const querys = location.search.split('&').filter(r => !(r.includes('sort')));

    const actualRoute = `${location.pathname}${querys.toString().replace(',', '&')}`;
    
    if(activeSorter){      
      navigator({route: `${actualRoute}&sort=${activeSorter.key}`});
    }
  }, [sortValue]);

  useEffect(() => {
    const sorter = query.get('sort')?.toString();
    
    if(sorter != undefined && sorter.length > 0){
      const sorterValue = props.sortCollection.find(sc => sc.key == sorter);

      setSelectedKey(new Set([String(sorterValue?.key)]))      
    }    
  }, [query]);
  
  return {
    sortValue: sortValue,
    setSortValue: setSelectedKey,
    SortBtnComponent: () => (
      <Dropdown
        classNames={{ base: "" }}
        className="bg-gray-200 dark:bg-gray-700"
      >
        <DropdownTrigger>
          <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border !max-w-[350px] px-5 border-gray-800  bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
            endContent={<Icon icon="arrowDown" size="xs" color="text-gray-900 dark:text-gray-100" />}
            startContent={<Icon icon="sort" size="base" color="text-gray-900 dark:text-gray-100"/>}
          >
            <p className={`text-md text-gray-900 dark:text-gray-100`}>
              {translator({text: 'ordenar'})}
              <span className="font-bold">{sortValue? ` ${translator({text: String(props.sortCollection.find(sc => sc.key == sortValue)?.text)}).toLowerCase()} ${String(props.sortCollection.find(sc => sc.key == sortValue)?.value).toLowerCase()}`: ''}</span>
            </p>
          </Button>
        </DropdownTrigger>
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
          <DropdownSection
            title={translator({text: 'ordenar-por'})}
            aria-aria-labelledby="ddd"
            classNames={{ heading: "text-sm" }}
          >
            {props.sortCollection.map((sc) => (
              <DropdownItem
                key={sc.key}
                className={`text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100 `}
                //startContent={filter.icon}
              >
                {`${translator({text: sc.text})}: ${
                  sc.text2
                    ? translator({text: sc.text2}).toLowerCase()
                    : translator({text: sc.value}).toLowerCase()
                }`}
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    ),
  };
};

const RenderDropDown: FunctionComponent<IRendersProps> = ({
  ...props
}: IRendersProps) => {
  const translator = useTranslator();

  const [filterValues, setFilterValues] = useState<any>(
    props.getSelectedFilterValues()[props.keyFilter]
      ? { [props.keyFilter]: props.getSelectedFilterValues()[props.keyFilter] }
      : {}
  );

  const [selectedKey, setSelectedKey] = useState<Iterable<string>>(
    props.getSelectedFilterValues()[props.keyFilter]
      ? new Set([
          String(
            (props.filter.inputOptions?.items as commonType[]).find((it) => {
              if (typeof it.value == "object") {
                return (
                  (it.value as any[])
                    .filter((v) => v !== null && !String(v).includes("."))
                    .reduce((a, b) => Math.max(a, b)) ==
                  props.getSelectedFilterValues()[props.keyFilter]
                );
              }

              return (
                it.value == props.getSelectedFilterValues()[props.keyFilter]
              );
            })?.key
          ),
        ])
      : new Set([])
  );

  const selectedValue2 = useMemo(
    () => Array.from(selectedKey)[0],
    [selectedKey]
  );

  useEffect(() => {
    if (Object.keys(filterValues).length <= 0)
      return props.setSelectedFiltersValues({ [props.keyFilter]: {} });
    props.setSelectedFiltersValues(filterValues);
  }, [filterValues]);

  useEffect(() => {
    const temp = (props.filter.inputOptions?.items as commonType[]).find(
      (f) => f.key == selectedValue2
    );

    if (temp === undefined) return;

    if (typeof temp.value == "object") {
      setFilterValues({
        ...filterValues,
        [props.keyFilter]: (temp.value as any[])
          .filter((v) => v !== null && !String(v).includes("."))
          .reduce((a, b) => Math.max(a, b)),
      });
    } else {
      setFilterValues({
        ...filterValues,
        [props.keyFilter]: temp.value,
      });
    }
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
          badge: ` top-1 p-2 right-[2px] bg-gray-800 text-gray-100 dark:bg-gray-100 border-none dark:text-gray-800 cursor-pointer`,
        }}
        onClick={() => {
          let currentFilters = props.getSelectedFilterValues();

          Object.keys(currentFilters).forEach((cf) => {
            if (cf === props.keyFilter)
              currentFilters = { ...currentFilters, [cf]: undefined };
          });

          props.setSelectedFiltersValues(currentFilters);
        }}
      >
        <DropdownTrigger>
          <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
            endContent={<Icon icon="arrowDown" size="xs" color="text-gray-900 dark:text-gray-100"/>}
            startContent={props.filter.icon}
          >
            <p className={`text-md text-gray-900 dark:text-gray-100`}>
              {translator({text: props.filter.text})}:{" "}
              <span className="font-bold">
                {(props.filter.inputOptions?.items as commonType[]).find(
                  (f) => f.key == selectedValue2
                )
                  ? translator(
                      {text:String(
                        (props.filter.inputOptions?.items as commonType[]).find(
                          (f) => f.key == selectedValue2
                        )?.text
                      )}
                    )
                  : ""}
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
          >
            {`${translator({text: f.text})} `}

          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

const RenderRange: FunctionComponent<IRendersProps> = ({
  ...props
}: IRendersProps) => {
  const translator = useTranslator();

  const [filterValues, setFilterValues] = useState<any>(
    props.getSelectedFilterValues()[props.keyFilter]
      ? {
          [props.keyFilter]: {
            ...props.getSelectedFilterValues()[props.keyFilter],
          },
        }
      : {
          [props.keyFilter]: {
            min: 0,
            max: 0,
          },
        }
  );

  useEffect(() => props.setSelectedFiltersValues(filterValues), [filterValues]);

  return (
    <Dropdown
    classNames={{
      base: " !min-w-[20em]  !max-h-[6em]",
    }}
      className="bg-gray-200 dark:bg-gray-700"
    >
      <Badge
        content={"X"}
        color="primary"
        size="sm"
        classNames={{
          badge: ` top-1 p-2 right-[2px] bg-gray-800 text-gray-100 dark:bg-gray-100 border-none dark:text-gray-800 cursor-pointer`,
        }}
        onClick={() => {
          let currentFilters = props.getSelectedFilterValues();

          Object.keys(currentFilters).forEach((cf) => {
            if (cf === props.keyFilter)
              currentFilters = { ...currentFilters, [cf]: undefined };
          });

          props.setSelectedFiltersValues(currentFilters);
        }}
      >
        <DropdownTrigger>
          <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
            endContent={<Icon icon="arrowDown" size="xs" color="text-gray-900 dark:text-gray-100" />}
            startContent={props.filter.icon}
          >
            <p className={`text-md text-gray-900 dark:text-gray-100`}>
              {translator({text: props.filter.text})}:{" "}
              <span className="font-bold">
                {Object.values(filterValues[props.keyFilter]).some(
                  (p: any) => p > 0
                )
                  ? ` min ${filterValues[props.keyFilter].min}, max ${
                      filterValues[props.keyFilter].max
                    }`
                  : ""}
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
        className=" !min-w-[20em] !max-h-[6em]"
        aria-label="dd"
        closeOnSelect={false}
      >
        <DropdownItem
          className={`text-gray-800 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:text-gray-100 cursor-default !h-[500px]`}
          isReadOnly
        >
          <div className="flex flex-col gap-2">
            <div className=""></div>
            <div className="flex gap-5">
              <Input
                classNames={{

                  input: "text-sm ",
                  inputWrapper:
                    "border border-gray-700 !bg-transparent text-gray-900 dark:text-gray-100 dark:border-gray-600 hover:!bg-gray-200 dark:hover:!bg-gray-700 ",
                }}
                size="sm"
                type="number"
                label="Min"
                maxLength={2}
                min={0}
                startContent={<Icon icon="dollarSign" size="xs" color="text-gray-900 dark:text-gray-100"/>}
                value={String(filterValues[props.keyFilter]?.min)}
                onValueChange={(value) => {
                  const x = {
                    ...filterValues,
                    [props.keyFilter]: {
                      ...filterValues[props.keyFilter],
                      min: Number(value),
                    },
                  };

                  x[props.keyFilter].max = x[props.keyFilter].min * 2;

                  props.setSelectedFiltersValues(x);
                  setFilterValues(x);
                }}
              />
              <Input
                classNames={{
                  input: "text-sm ",
                  inputWrapper:
                    "border border-gray-700 !bg-transparent text-gray-900 dark:text-gray-100 dark:border-gray-600 hover:!bg-gray-200 dark:hover:!bg-gray-700 ",
                }}
                className="!z-50"
                size="sm"
                type="number"
                label="Max"
                maxLength={2}
                min={0}
                startContent={<Icon icon="dollarSign" size="xs" color="text-gray-900 dark:text-gray-100" />}
                value={String(filterValues[props.keyFilter]?.max)}
                onValueChange={(value) => {
                  //if (Number(value) < filterValues.price.min) return;
                  props.setSelectedFiltersValues({
                    ...filterValues,
                    [props.keyFilter]: {
                      ...filterValues[props.keyFilter],
                      max: Number(value),
                    },
                  });
                  setFilterValues({
                    ...filterValues,
                    [props.keyFilter]: {
                      ...filterValues[props.keyFilter],
                      max: Number(value),
                    },
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
  const translator = useTranslator();

  const [filterValues, setFilterValues] = useState<any>(
    props.getSelectedFilterValues()[props.keyFilter]
      ? {
          [props.keyFilter]: props.getSelectedFilterValues()[props.keyFilter],
        }
      : {
          [props.keyFilter]: "",
        }
  );

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
      startContent={<Icon icon="search" size="sm" color="text-gray-900 dark:text-gray-100"/>}
      value={filterValues.search}
      width={50}
      placeholder={translator({text: "escribe-algo"})}
      onValueChange={(value) =>
        setFilterValues({ ...filterValues, search: value })
      }
      endContent={
        <div
          className={`cursor-pointer `}
          onClick={() => {
            let currentFilters = props.getSelectedFilterValues();

            Object.keys(currentFilters).forEach((cf) => {
              if (cf === props.keyFilter)
                currentFilters = { ...currentFilters, [cf]: undefined };
            });

            props.setSelectedFiltersValues(currentFilters);
          }}
        >
          <Icon icon="x" size="xs" color="text-gray-900 dark:text-gray-100"/>
        </div>
      }
    />
  );
};