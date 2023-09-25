import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FunctionComponent, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type dropDownItemType = {
  key: string;
  icon?: ReactNode;
  text: string;
  type: "normal" | "danger";
  description?: string;
  onPress?: () => void;
};

type IDropDwProps = {
  items: dropDownItemType[];
  btnStartIcon?: ReactNode;
  btnEndIcon?: ReactNode;
  btnTitle?: string;
  contentWidth?: number;
  placement?: 'bottom-end' | 'bottom-start'
  additionalClassName?: string
};

const DropDw: FunctionComponent<IDropDwProps> = ({ ...props }) => {
  const { items, btnStartIcon, btnEndIcon, btnTitle, contentWidth = 10, placement, additionalClassName} = props;

  const { t } = useTranslation();

  return (
    <Dropdown
      placement={placement}
      classNames={{ base: `!min-w-[${String(contentWidth )}em]` }}
      className="bg-gray-200 dark:bg-gray-700"
    >
      <DropdownTrigger>
        <Button
          isIconOnly={btnStartIcon != undefined}
          startContent={btnStartIcon}
          endContent={btnEndIcon}
          size="sm"
          className={`bg-transparent z-10 text-gray-100 font-semibold ${additionalClassName}`}
        >
          <p className={` text-sm  ${btnTitle ? "" : "hidden"}`}>
            {t(String(btnTitle))}
          </p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu className={`!max-w-[${String(contentWidth)}em]`} aria-label="ddd" variant="flat">
        {items.map((i) => (
          <DropdownItem
            key={i.key}
            startContent={i.icon}
            textValue={i.key}
            onPress={i.onPress}
            description={t(String(i.description || ''))}
            className={
              i.type == "normal"
                ? "text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                : "text-gray-800 hover:!bg-red-300 hover:!bg-red-600/60 dark:hover:!bg-red-600/60 dark:text-gray-100"
            }
          >
            {t(i.text)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDw;
