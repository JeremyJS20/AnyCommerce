import { Button } from "@nextui-org/react";
import { FunctionComponent, ReactNode } from "react";
import { useTranslator } from "../../../Hooks/Common/useCommon";

type IBtnProps = {
  icon?: ReactNode;
  aditionalClassnames?: string;
  onPress?: () => void;
  text?: string;
  type: "primary" | "secondary" | "tertiary" | 'quaternary' | "onlyIcon";
  action?: "submit" | 'button' | 'reset'
  size?: "lg" | "sm" | "md";
  additionalClassName?: string;
  disabled?: boolean
};

const Btn: FunctionComponent<IBtnProps> = ({ ...props }) => {
  const translator = useTranslator();
  const { icon, aditionalClassnames, onPress, text, type, size, action = 'button', disabled = false, additionalClassName = '' } = props;

  return (
    <Button
      startContent={icon}
      type={action}
      disabled={disabled}
      isIconOnly={type == "onlyIcon" || text == undefined}
      size={size ? size : "sm"}
      radius={"md"}
      className={`${additionalClassName}
    ${
      type == "tertiary"
        ? "border border-gray-800 text-gray-900  bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-100 dark:bg-gray-800"
        : type == "primary"
        ? "border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
        : type == "secondary"
        ? "border  border-gray-800 text-gray-900  bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:bg-transparent"
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
          <p>{translator({text: String(text)})}</p>
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
