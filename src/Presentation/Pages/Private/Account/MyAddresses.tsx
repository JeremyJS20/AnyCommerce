import {
  Dispatch,
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Chip, Divider, Link, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { addressInfo, addressKeyType, citiesType, countriesType, inputs, modalHandleProps, statesType } from "../../../Utils/types.utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DropDw, {
  dropDownItemType,
} from "../../../Components/Common/Inputs/Dropdown";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import { addressesCollection } from "../../../Utils/DataCollection/Addresses.datacollection";
import FormModal from "../../../Components/Common/Modals/Form.modal.components.common";
import Btn from "../../../Components/Common/Inputs/Button";
import MultipleFormInputs from "../../../Components/Common/Inputs/MultipleInputForm";
import { CountriesService } from "../../../../Infrastructure/Services/Countries.service";
import countries2 from "../../../Utils/DataCollection/countries.json";
import { addressValidatorSchema } from "../../../../Validation/Validators/address.validator";
import { PrivateRoutes } from "../../../Utils/routermanager.routes.utils";
import ConfirmationModal from "../../../Components/Common/Modals/Confirmation.modal.component";

type IMyAddressesProps = {};

const MyAddresses: FunctionComponent<IMyAddressesProps> = ({}) => {
  const { id, childPage } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [addresses] = useState<addressInfo[]>(addressesCollection);
  const [addressUtils, setAddressUtils] = useState<{
    countries: countriesType[];
    states: statesType[];
    cities: citiesType[];
  }>({
    countries: [],
    states: [],
    cities: [],
  });

  const formModalRef = useRef<modalHandleProps>();

  const confirmModalRef = useRef<modalHandleProps>();

  const listDropDwItems = (id: string): dropDownItemType[] => {
    return [
      {
        key: "editar",
        text: "editar",
        icon: <Icon icon="edit" size="xs" />,
        type: "normal",
        onPress: () => {
          navigate(`${location.pathname}/${id}?action=edit`);
        },
      },
      {
        key: "eliminar",
        text: "eliminar",
        icon: <Icon icon="trash" size="xs" />,
        type: "danger",
        onPress: () => {
          confirmModalRef.current?.setModalProps({
            title: `eliminar-direccion`,
            actionTitle: "eliminar",
            msg: 'eliminar-direccion-confirmacion',
            visible: true,
            confirmBtnColor: '!bg-red-600/60 !text-gray-100',
            itemId: id
          });
        },
      },
    ];
  };

  const inputs: inputs[] = useMemo(
    () => [
      {
        key: "country",
        text: "pais",
        isRequired: true,
        type: "select",
        placeholder: "seleccionar-pais",
        inputOptions: {
          items: addressUtils.countries,
          onSelectionChange: async (options: {
            value: any;
            key: string;
            selections: any;
            setSelections: Dispatch<any>;
            values: any;
            setValues: Dispatch<any>;
          }) => {
            const { value, key, selections, setSelections, values, setValues } =
              options;
  
            if (selections["state"] != undefined)
              selections["state"] = new Set([]);
            if (selections["city"] != undefined) selections["city"] = new Set([]);
  
            try {
              const states = await CountriesService.getStates<statesType>(value);
              setAddressUtils({
                ...addressUtils,
                states: states.data as statesType[],
              });
            } catch (error) {
              console.log(error);
            }
  
            setSelections({
              ...selections,
              [key]: new Set([value]),
            });
  
            setValues({
              ...values,
              [key]: value,
            });
          },
          renderValue: (items: any) => {
            const item = addressUtils.countries?.find(
              (c) => c.iso2 == items[0].key
            );
            
            if(!item) return<></>

            const emoji = countries2.find((c) => c.alpha2 == items[0].key)?.emoji;
  
            return (
              <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                <span className="text-2xl">{emoji}</span>
                <p className="text-default-500 text-sm font-normal">
                  {item?.name}
                </p>
              </div>
            );
          },
          itemsRender: (item: countriesType) => (
            <SelectItem
              key={item?.iso2}
              value={item?.iso2}
              textValue={item.name}
              className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
            >
              <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                <span className="text-2xl">
                {countries2.find((c) => c.alpha2 == item.iso2)?.emoji}
                </span>
                <p>{item?.name}</p>
              </div>
            </SelectItem>
          ),
        },
      },
      {
        key: "state",
        text: "provincia",
        isRequired: addressUtils.states.length > 0,
        type: "selectWithInheritData",
        dataInheritFrom: "country",
        dataInheritKey: "country_code",
        placeholder: "seleccionar-estado",
        inputOptions: {
          items: addressUtils.states,
          onSelectionChange: async (options: {
            value: any;
            key: string;
            selections: any;
            setSelections: Dispatch<any>;
            values: any;
            setValues: Dispatch<any>;
          }) => {
            const { value, key, selections, setSelections, values, setValues } =
              options;
  
            if (selections["city"] != undefined) selections["city"] = new Set([]);
  
            try {
              const cities = await CountriesService.getCities<citiesType>(
                values["country"],
                value
              );
              setAddressUtils({
                ...addressUtils,
                cities: cities.data as citiesType[],
              });
            } catch (error) {
              console.log(error);
            }
  
            setSelections({
              ...selections,
              [key]: new Set([value]),
            });
  
            setValues({
              ...values,
              [key]: value,
            });
          },
          itemsRender: (item: statesType) => (
            <SelectItem
              key={item?.iso2}
              value={item?.iso2}
              textValue={item.name}
              className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
            >
              <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                <p>{item?.name}</p>
              </div>
            </SelectItem>
          ),
        },
      },
      {
        key: "city",
        text: "ciudad",
        isRequired: addressUtils.cities.length > 0,
        type: "selectWithInheritData",
        dataInheritFrom: "state",
        dataInheritKey: "iso2",
        placeholder: "seleccionar-ciudad",
        inputOptions: {
          items: addressUtils.cities,
          itemsRender: (item: citiesType) => (
            <SelectItem
              key={item?.id}
              value={item?.id}
              textValue={item.name}
              className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
            >
              <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                <p>{item?.name}</p>
              </div>
            </SelectItem>
          ),
        },
      },
      {
        key: "postalCode",
        text: "codigo-postal",
        isRequired: true,
        type: "number",
        placeholder: "escribe-codigo-postal",
      },
      {
        key: "address",
        text: "direccion",
        isRequired: true,
        type: "text",
        placeholder: "escribe-direccion",
      },
      {
        key: "default",
        type: "check",
        text: "defecto",
        value: false,
      },
    ],
    [addressUtils, location]
  );

  const resetValues = () => {
    setAddressUtils({
      ...addressUtils,
      cities: [],
      states: [],
    });

    navigate(`${PrivateRoutes.ACCOUNT}/${childPage}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const countries = await CountriesService.get<countriesType>();
        setAddressUtils({
          ...addressUtils,
          countries: countries.data as countriesType[],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (id) {
        const address: addressInfo = addresses.find(
          (ad) => ad.id == id
        ) as addressInfo;

        inputs.forEach((i) => {
          if (i.type == "number")
            i.value = Number(address[i.key as addressKeyType]);
          else if(i.type == 'check') i.value = address[i.key as addressKeyType] as boolean;
          else i.value = String(address[i.key as addressKeyType]);
        });

        formModalRef.current?.setModalProps({
          type: 'form',
          title: `editar-direccion`,
          actionTitle: "editar",
          visible: true,
        });

        try {          
          const states = await CountriesService.getStates<statesType>(address.country);
          const cities = await CountriesService.getCities<citiesType>(address.country, address.state);
          setAddressUtils({
            ...addressUtils,
            states: states.data as statesType[],
            cities: cities.data as citiesType[]
          });
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [id]);

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-end gap-5 w-full flex-wrap">
          <Btn
            icon={
              <Icon
                icon="plus"
                size="base"
                color="text-gray-900 dark:text-gray-100"
              />
            }
            size="md"
            text="agregar-direccion"
            onPress={() => {
              formModalRef.current?.setModalProps({
                type: 'form',
                title: `agregar-direccion`,
                actionTitle: "agregar",
                visible: true,
                //size: 'lg'
              });
              navigate(`${location.pathname}/new`);
            }}
            type="secondary"
          />
        </div>
        <Divider orientation="horizontal" />
      </div>
      <div className="flex flex-col gap-5 justify-between flex-wrap laptop:flex-row">
        {addresses.map((address) => (
          <Link
            key={address.id}
            // href={`${location.pathname}/${address.id}`}
            className="w-full laptop:w-[49%] border cursor-default border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit"
            onClick={(e) => {
              e.preventDefault();
              //navigate(`${location.pathname}/${address.id}`);
            }}
          >
            <div className="flex w-full gap-2 items-center justify-between text-sm laptop:text-base">
              <div className=" flex  flex-col">
                <h1 className=" font-semibold">{address.address} </h1>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {address.countryName}
                </p>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {address.stateName}
                </p>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {address.cityName}
                </p>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {address.postalCode}
                </p>
              </div>

              <div className="flex items-center justify-end w-[40%]">
                {address.default ? (
                  <Chip
                    size="sm"
                    className="bg-gray-200 dark:bg-gray-800 !rounded-xl text-xs"
                  >
                    {" "}
                    {t("defecto")}
                  </Chip>
                ) : (
                  <Button
                    variant="flat"
                    size="sm"
                    color="success"
                    className="bg-transparent"
                  >
                    {t("establecer-defecto")}
                  </Button>
                )}
                <DropDw
                  btnStartIcon={
                    <Icon
                      icon="verticalDots"
                      size="lg"
                      color="text-gray-900 dark:text-gray-100"
                    />
                  }
                  items={listDropDwItems(address.id)}
                  placement="bottom-end"
                />
              </div>
            </div>
          </Link>
        ))}

        <Link
         // href={`${location.pathname}/new`}
          className={`w-full laptop:w-[49%] border-2 border-dashed cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit ${
            addresses.length <= 0 ? "hidden" : ""
          }`}
          onPress={() => {
            formModalRef.current?.setModalProps({
              type: 'form',
              title: `agregar-direccion`,
              actionTitle: "agregar",
              visible: true,
              //size: 'lg'
            });
            navigate(`${location.pathname}/new`);
          }}
        >
          <div className="flex h-[em] items-center gap-2 text-sm laptop:text-base">
            <Icon icon="plus" size="sm" color="text-default-500" />
            <h1 className=" font-semibold text-default-500">
              {`${t("agregar")} ${t("direccion").toLowerCase()}`}
            </h1>
          </div>
        </Link>
      </div>
      <FormModal
        ref={formModalRef}
        resetParentValues={resetValues}
        validator={addressValidatorSchema}
        inputs={inputs}
      >
        <MultipleFormInputs inputs={inputs} />
      </FormModal>
      <ConfirmationModal ref={confirmModalRef} onConfirmBtnClicked={(id:string) => {
        console.log(id);
        
      }}/>
    </div>
  );
};

export default MyAddresses;
