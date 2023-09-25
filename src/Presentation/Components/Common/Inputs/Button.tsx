import { Button } from "@nextui-org/react";
import { FunctionComponent, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type IBtnProps = {
  icon?: ReactNode;
  aditionalClassnames?: string;
  onPress?: () => void;
  text?: string;
  type: "primary" | "secondary" | "tertiary" | 'quaternary' | "onlyIcon";
  size?: "lg" | "sm" | "md";
};

const Btn: FunctionComponent<IBtnProps> = ({ ...props }) => {
  const { t } = useTranslation();

  const { icon, aditionalClassnames, onPress, text, type, size } = props;

  return (
    <Button
      startContent={icon}
      isIconOnly={type == "onlyIcon" || text == undefined}
      size={size ? size : "sm"}
      radius={"md"}
      className={`
    ${
      type == "tertiary"
        ? "border border-gray-800 text-gray-900  bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
        : type == "primary"
        ? "border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
        : type == "secondary"
        ? "border  border-gray-800 text-gray-900  bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:bg-transparent"
        : type == "quaternary"
        ? "bg-ideal-green"
        : "bg-transparent"
    }
       ${aditionalClassnames}
       `}
      onPress={onPress}
    >
      {type != "onlyIcon" ? (
        text != undefined ? (
          <p>{t(String(text))}</p>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Button>
  );
};

export default Btn;
