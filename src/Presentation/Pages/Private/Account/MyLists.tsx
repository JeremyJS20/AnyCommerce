import { FunctionComponent, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { listInfo } from "../../../Utils/types.utils";
import {
  AddPlusIcon,
  EditIcon,
  EyeIcon,
  MoneyTransferIcon,
  TrashIcon,
  VerticalDotsIcon,
} from "../../../Assets/Icons/IconsCollection";
import { listsCollection } from "../../../Utils/DataCollection/Lists.datacollection";
import { useNavigate } from "react-router-dom";

type IMyListsProps = {};

const MyLists: FunctionComponent<IMyListsProps> = ({}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const query = useQuery();

  const [lists, setLists] = useState<listInfo[]>(listsCollection);

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-end gap-5 w-full flex-wrap">
          <Button
            size="md"
            radius="sm"
            variant="bordered"
            className="border  border-gray-800 text-gray-900  bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
            startContent={
              <AddPlusIcon
                size="base"
                color="text-gray-900 dark:text-gray-100"
              />
            }
          >
            {`${t("crear")} ${t("lista").toLowerCase()}`}
          </Button>
        </div>
        <Divider orientation="horizontal" />
      </div>
      <div className="flex flex-col gap-5 justify-between flex-wrap laptop:flex-row">
        {lists.map((list) => (
          <Link
            key={list.id}
            //href={`${location.pathname}/${list.id}`}
            className="w-full laptop:w-[49%] border cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit"
            onClick={(e) => {
              e.preventDefault();
              //navigate(`${location.pathname}/${list.id}`);
            }}
          >
            <div className="flex gap-1 items-center text-sm laptop:text-base">
              <div className=" flex gap-1 flex-col">
                <h1 className=" font-semibold">
                  {list.name}{" "}
                  <span className=" text-default-500 ">
                    - {list.visibility}
                  </span>{" "}
                </h1>
                <p className=" text-default-500 text-sm line-clamp-2">
                  {list.description}
                </p>
              </div>

              <Dropdown
                placement="bottom-end"
                classNames={{ base: "!min-w-[10em] " }}
                className="bg-gray-200 dark:bg-gray-700"
              >
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    startContent={<VerticalDotsIcon size="lg" />}
                    size="sm"
                    className="bg-transparent z-10"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  className="!max-w-[10em]"
                  aria-label="ddd"
                  variant="flat"
                >
                  <DropdownItem
                    textValue="2"
                    startContent={<EyeIcon size="xs" />}
                    className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                  >
                    {t("ver")}
                  </DropdownItem>
                  <DropdownItem
                    textValue="2"
                    startContent={<EditIcon size="xs" />}
                    className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                  >
                    {t("editar")}
                  </DropdownItem>
                  <DropdownItem
                    textValue="2"
                    startContent={<TrashIcon size="xs" />}
                    className="text-gray-800 hover:!bg-red-300 hover:!bg-red-600/60 dark:hover:!bg-red-600/60 dark:text-gray-100"
                  >
                    {t("eliminar")}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Link>
        ))}

        <Link
          href={`${location.pathname}/new`}
          className={`w-full laptop:w-[49%] border-2 border-dashed cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit ${
            lists.length <= 0 ? "hidden" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            //navigate(`${location.pathname}/new`);
          }}
        >
          <div className="flex h-[em] items-center gap-2 text-sm laptop:text-base">
            <AddPlusIcon size="sm" color="text-default-500" />
            <h1 className=" font-semibold text-default-500">
              {`${t("crear")} ${t("lista").toLowerCase()}`}
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyLists;
