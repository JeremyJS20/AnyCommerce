import { ReactNode } from "react";
import { useTranslator } from "../../../Hooks/Common/useCommon";
import { Link } from "@nextui-org/react";

export const Link2 = (props: {
  text: string | ReactNode;
  route?: string;
  action?: () => void;
  additionalClassName?: string
  disabled?: boolean
}) => {
  const translator = useTranslator();
  const { route, text, action, additionalClassName = '', disabled = false } = props;

  return (
    <Link
      href={route}
      className={`${!route && 'cursor-pointer'} ${additionalClassName}`}
      isDisabled={disabled}
      onPress={() => {
        if (action) action();
      }}
    >
      {typeof text == "string" ? (
        <div className="text-ideal-green">{translator({ text: text })}</div>
      ) : (
        text
      )}
    </Link>
  );
};