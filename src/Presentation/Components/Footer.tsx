import { Button, Divider, Tooltip } from "@nextui-org/react";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import {
  anyCommerceIconDark,
  anyCommerceIconLight,
} from "../Assets/Img/ImgCollection";
import { Icon } from "../Assets/Icons/IconsCollection";
import { Link2 } from "./Common/Inputs/Link";
import { useTranslator } from "../Hooks/Common/useCommon";

type IFooterProps = {};

const Footer: React.FunctionComponent<IFooterProps> = ({}) => {
  const translator = useTranslator();
  const { theme } = useContext(ThemeContext);

  const socialNetworks = [
    {
      key: "sn0",
      text: "X Twitter",
      icon: <Icon icon="xTwitter" size="lg" />,
    },
    {
      key: "sn1",
      text: "Instagram",
      icon: <Icon icon="instagram" size="xl" />,
    },
  ];

  return (
    <div className="backdrop-blur-md bg-gray-200/50 dark:bg-gray-800/50">
      <Divider orientation="horizontal" />
      <footer className="w-[95%] m-auto px-6 py-14 laptop:w-[80%]">
        <div className="flex flex-col gap-7">
          <div className="flex justify-between flex-col items-center tablet:flex-row gap-3">
            <Link2
              //route={PublicRoutes.HOME}
              action={() => {
                // if (location.pathname == PublicRoutes.HOME) {
                //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                //   props.mobileNavBarRef.current?.setCollapseMobileMenu(false);
                // } else {
                //   navigate(PublicRoutes.HOME);
                // }
              }}
              text={
                <div className="gap-2 items-center flex">
                  <img
                    src={
                      theme === "light"
                        ? anyCommerceIconDark
                        : anyCommerceIconLight
                    }
                    className="w-6 h-auto tablet:w-8"
                  />
                  <p className="font-bold text-2xl tablet:text-4xl !text-gray-800 dark:!text-gray-100">
                    Any<span className="text-ideal-green">Commerce</span>
                  </p>
                </div>
              }
            />
            <div className="flex gap-1">
              {socialNetworks.map((sn) => (
                <Tooltip
                  key={sn.key}
                  content={sn.text}
                  className="text-gray-900 dark:text-gray-100 bg-gray-300 dark:bg-gray-700 !rounded-xl"
                  placement="bottom"
                  delay={100}
                  closeDelay={100}
                >
                  <Button
                    isIconOnly
                    size="sm"
                    className=" rounded-xl bg-transparent hover:bg-gray-300 dark:hover:bg-gray-700"
                    startContent={sn.icon}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
          <Divider orientation="horizontal" />
          <div className="flex justify-between items-center flex-col tablet:flex-row gap-3">
            <p className="text-default-500 text-sm">
              <span className="mr-1">
                <Icon icon="copyright" size="xs" color="text-default-500" />
              </span>{" "}
              {translator({ text: "derechos-de-autor" })}
            </p>
            <div className="flex gap-2">
              <Link2
                additionalClassName="cursor-pointer text-sm text-default-500 underline underline-offset-2"
                text="terminos-de-servicio"
              />
              <Link2
                additionalClassName="cursor-pointer text-sm text-default-500 underline underline-offset-2"
                text="politica-de-servicio"
              />
              <Link2
                additionalClassName="cursor-pointer text-sm text-default-500 underline underline-offset-2"
                text="politica-de-cookies"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
