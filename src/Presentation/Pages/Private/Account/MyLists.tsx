import { FunctionComponent, useState } from "react";
import {
  Button,
  Divider,
  Link,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { listInfo } from "../../../Utils/types.utils";
import { listsCollection } from "../../../Utils/DataCollection/Lists.datacollection";
//import { useNavigate } from "react-router-dom";
import DropDw, { dropDownItemType } from "../../../Components/Common/Inputs/Dropdown";
import { Icon } from "../../../Assets/Icons/IconsCollection";

type IMyListsProps = {};

const MyLists: FunctionComponent<IMyListsProps> = ({}) => {
  const { t } = useTranslation();
 // const navigate = useNavigate();

  const [lists] = useState<listInfo[]>(listsCollection);

  const listDropDwItems:dropDownItemType[] = [
    {
      key: "ver",
      text: "ver",
      icon: <Icon icon="eye" size="xs" />,
      type: "normal",
      onPress: () => {},
    },
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
  ]

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
              <Icon icon="plus" 
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

              <DropDw
                  btnStartIcon={<Icon icon="verticalDots" size="lg" color="text-gray-900 dark:text-gray-100" />}
                  items={listDropDwItems}
                placement="bottom-end"
              />
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
            <Icon icon="plus"  size="sm" color="text-default-500" />
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
