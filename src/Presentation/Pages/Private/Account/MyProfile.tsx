import { Button, Divider, Input } from "@nextui-org/react";
import { EditIcon } from "../../../Assets/Icons/IconsCollection";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

type IMyProfileProps = {}

const MyProfile: FunctionComponent<IMyProfileProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-16 flex-col">
      <div className="flex items-center w-full gap-5">
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          className=" w-[10%] rounded-full"
        />
        <div className="flex flex-col">
          <p className="">Jeremy Solano</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className=" font-semibold text-lg">
              {t("informacion-personal")}
            </h1>
            <Button
              startContent={<EditIcon size="xs" />}
              size="sm"
              radius="sm"
              title="edit"
              isIconOnly
              className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
            ></Button>
          </div>
          <Divider orientation="horizontal" />
        </div>
        <div className="flex gap-5 flex-wrap">
          <Input
            label={`${t("nombre")}:`}
            placeholder="kkk"
            //value={"sss"}
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                "h-full border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
          <Input             
            label={`${t("apellido")}:`}
            placeholder="kkk"
            value={"sss"}
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                "h-full border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
          <Input
            label={`${t("correo")}:`}
            placeholder="jsjeremy4@gmail.com"
            value={"jsjeremy4@gmail.com"}
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                "h-full border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
          <Input
            label={`${t("telefono")}:`}
            placeholder="jsjeremy4@gmail.com"
            value={"829-264-4164"}
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                "h-full border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
        </div>
      </div>
    {/*               className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
 */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className=" font-semibold text-lg">{t("direccion")}</h1>
            <Button
              startContent={<EditIcon size="xs" />}
              size="sm"
              radius="sm"
              title="edit"
              isIconOnly
              className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
            ></Button>
          </div>
          <Divider orientation="horizontal" />
        </div>
        <div className="flex gap-5 flex-wrap">
          <Input
            label={`${t("pais")}:`}
            placeholder="kkk"
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                "border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
          <Input
            label={`${t("provincia")}:`}
            placeholder="San Cristóbal"
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                " border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
          <Input
            label={`${t("ciudad")}:`}
            placeholder="Bajos de Haina"
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                " border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
          <Input
            label={`${t("codigo-postal")}:`}
            placeholder="00000000"
            value={"00000000"}
            type="number"
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                " border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
          <Input
            label={`${t("direccion")}:`}
            placeholder="Bajos de Haina"
            value={"Calle Luís Pérez #219, El Carril"}
            isReadOnly
            size="lg"
            classNames={{
              base: "!w-[47%]",
              label: "mb-1 text-sm text-default-500 font-bold ",
              input: "text-sm",
              inputWrapper:
                " border border-gray-700 !bg-transparent dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            labelPlacement="outside"
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
