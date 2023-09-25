import { FunctionComponent, useState } from "react";
import {
  Button,
  Chip,
  Divider,
  Link,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import {
  methodTypeCardInfo,
  methodTypeServiceInfo,
  paymentMethodInfo,
} from "../../../Utils/types.utils";
import { paymentMethodsCollection } from "../../../Utils/DataCollection/PaymentMethods.datacollection";
import { mastercard, paypal, visa } from "../../../Assets/Img/ImgCollection";
import DropDw, {
  dropDownItemType,
} from "../../../Components/Common/Inputs/Dropdown";
import { Icon } from "../../../Assets/Icons/IconsCollection";

type IMyPaymentMethodsProps = {};

const MyPaymentMethods: FunctionComponent<IMyPaymentMethodsProps> = ({}) => {
  const { t } = useTranslation();
  //const navigate = useNavigate();
  // const query = useQuery();

  const [paymentMethods] = useState<paymentMethodInfo[]>(
    paymentMethodsCollection
  );

  const listDropDwItems: dropDownItemType[] = [
    {
      key: "transacciones",
      text: "transacciones",
      icon: <Icon icon="moneyTransaction" size="xs" />,
      type: "normal",
      onPress: () => {},
    },
    {
      key: "eliminar",
      text: "eliminar",
      icon: <Icon icon="trash" size="xs" />,
      type: "danger",
      onPress: () => {},
    },
  ];

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-end gap-5 w-full flex-wrap">
          <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border border-gray-800 text-gray-900  bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
            startContent={
              <Icon icon="plus"
                size="base"
                color="text-gray-900 dark:text-gray-100"
              />
            }
          >
            {`${t("agregar")} ${t("metodo").toLowerCase()}`}
          </Button>
        </div>
        <Divider orientation="horizontal" />
      </div>
      <div className="flex flex-col gap-5 justify-between flex-wrap laptop:flex-row">
        {paymentMethods.map((pm) => (
          <Link
            key={pm.id}
            //href={`${location.pathname}/${list.id}`}
            className="w-full laptop:w-[49%] border  border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit"
            onClick={(e) => {
              e.preventDefault();
              //navigate(`${location.pathname}/${list.id}`);
            }}
          >
            {pm.type == "card" ? (
              <div className="flex items-center justify-between gap-5 w-full">
                <div className="flex gap-5 items-center justify-between w-full">
                  <div className="flex gap-5 items-center">
                    <img
                      src={
                        (pm.methodInfo as methodTypeCardInfo).company == "Visa"
                          ? visa
                          : mastercard
                      }
                      alt={(pm.methodInfo as methodTypeCardInfo).company}
                      className="w-[3.5em] h-auto laptop:w-[5em] border border-gray-300 p-3 rounded-xl dark:border-gray-700"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className=" font-semibold text-sm laptop:text-base">
                        {`${(pm.methodInfo as methodTypeCardInfo).company} ${t(
                          "terminada-en"
                        ).toLowerCase()} ${
                          (pm.methodInfo as methodTypeCardInfo).ending
                        }`}
                      </h1>
                      <p className=" text-default-500 text-sm laptop:text-base">
                        {`${t("fecha-de-expiracion")} ${(
                          pm.methodInfo as methodTypeCardInfo
                        ).dates.expiration.toLocaleDateString(undefined, {
                          year: "2-digit",
                          month: "2-digit",
                        })}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end w-[40%]">
                  {pm.default ? (
                    <Chip
                      size="sm"
                      className="bg-gray-200 dark:bg-gray-800 !rounded-xl text-xs hidden tablet:flex"
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
                  btnStartIcon={<Icon icon="verticalDots" size="lg" color="text-gray-900 dark:text-gray-100" />}
                  items={listDropDwItems}
                    placement="bottom-end"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-5 w-full">
                <div className="flex gap-5 items-center justify-between w-full">
                  <div className="flex gap-5 items-center">
                    <img
                      src={
                        (pm.methodInfo as methodTypeServiceInfo).name ==
                        "PayPal"
                          ? paypal
                          : undefined
                      }
                      alt={(pm.methodInfo as methodTypeServiceInfo).name}
                      className="w-[3.5em] h-auto laptop:w-[5em] border border-gray-300 p-3 rounded-xl dark:border-gray-700"
                    />
                    <div className="flex flex-col gap-1">
                      <h1 className=" font-semibold text-sm laptop:text-base">
                        {`${(pm.methodInfo as methodTypeServiceInfo).name}`}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end w-[40%]">
                  {pm.default ? (
                    <Chip
                      size="sm"
                      className="bg-gray-200 dark:bg-gray-800 !rounded-xl text-xs hidden tablet:flex"
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
                  btnStartIcon={<Icon icon="verticalDots" size="lg" color="text-gray-900 dark:text-gray-100" />}
                  items={listDropDwItems}
                    placement="bottom-end"
                  />
                </div>
              </div>
            )}
          </Link>
        ))}

        <Link
          href={`${location.pathname}/new`}
          className={`w-full laptop:w-[49%] border-2 border-dashed cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit ${
            paymentMethods.length <= 0 ? "hidden" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            //navigate(`${location.pathname}/new`);
          }}
        >
          <div className="flex h-[3.5em] items-center gap-2 text-sm laptop:text-base">
            <Icon icon="plus" size="sm" color="text-default-500" />
            <h1 className=" font-semibold text-default-500">
              {`${t("agregar")} ${t("metodo").toLowerCase()}`}
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyPaymentMethods;
