import { FunctionComponent, useRef, useState } from "react";
import { Button, Chip, Divider, Link } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { addressInfo } from "../../../Utils/types.utils";
//import { useNavigate } from "react-router-dom";
import DropDw, {
  dropDownItemType,
} from "../../../Components/Common/Inputs/Dropdown";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import { addressesCollection } from "../../../Utils/DataCollection/Addresses.datacollection";
import FormModal, {
  formModalHandleProps,
} from "../../../Components/Common/Modals/FormModal.components.common";
import Btn from "../../../Components/Common/Inputs/Button";

type IMyAddressesProps = {};

const MyAddresses: FunctionComponent<IMyAddressesProps> = ({}) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  const [addresses] = useState<addressInfo[]>(addressesCollection);

  const formModalRef = useRef<formModalHandleProps>();

  const listDropDwItems: dropDownItemType[] = [
    {
      key: "editar",
      text: "editar",
      icon: <Icon icon="edit" size="xs" />,
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
  /**
 *             formModalRef.current?.setModalProps({
              title: `agregar-direccion`,
              actionTitle: "agregar",
              visible: true,
            });
 */
  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-end gap-5 w-full flex-wrap">
          {/* <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border  border-gray-800 text-gray-900  bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
            startContent={
              <Icon
                icon="plus"
                size="base"
                color="text-gray-900 dark:text-gray-100"
              />
            }
          >
            {`${t("agregar")} ${t("direccion").toLowerCase()}`}
          </Button> */}

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
            //aditionalClassnames={pf != "mainAddress" ? "hidden" : ""}
            onPress={() => {
              formModalRef.current?.setModalProps({
                title: `agregar-direccion`,
                actionTitle: "agregar",
                visible: true,
              });
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
            //href={`${location.pathname}/${list.id}`}
            className="w-full laptop:w-[49%] border cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit"
            onClick={(e) => {
              e.preventDefault();
              //navigate(`${location.pathname}/${list.id}`);
            }}
          >
            <div className="flex w-full gap-2 items-center justify-between text-sm laptop:text-base">
              <div className=" flex  flex-col">
                <h1 className=" font-semibold">{address.address} </h1>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {address.country}
                </p>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {address.state}
                </p>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {address.city}
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
                  items={listDropDwItems}
                  placement="bottom-end"
                />
              </div>
            </div>
          </Link>
        ))}

        <Link
          href={`${location.pathname}/new`}
          className={`w-full laptop:w-[49%] border-2 border-dashed cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit ${
            addresses.length <= 0 ? "hidden" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            formModalRef.current?.setModalProps({
              title: `agregar-direccion`,
              actionTitle: "agregar",
              visible: true,
            });
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
      <FormModal ref={formModalRef}>
        {/* <DynamicFormInput input={inputToEdit} /> */}
        <></>
      </FormModal>
    </div>
  );
};

export default MyAddresses;
