import { Button, Divider, Link, Tooltip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { PublicRoutes } from "../Utils/routermanager.routes.utils";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import {
  CopyRightIcon,
  InstagramIcon,
  XTwitterIcon,
} from "../Assets/Icons/IconsCollection";
import {
  anyCommerceIconDark,
  anyCommerceIconLight,
} from "../Assets/Img/ImgCollection";

type IFooterProps = {};

const Footer: React.FunctionComponent<IFooterProps> = ({}) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const socialNetworks = [
    {
      key: "sn0",
      text: "X Twitter",
      icon: <XTwitterIcon size="lg" />,
    },
    {
      key: "sn1",
      text: "Instagram",
      icon: <InstagramIcon size="xl" />,
    },
  ];

  return (
    <div className="backdrop-blur-md bg-gray-200/50 dark:bg-gray-800/50">
      <Divider orientation="horizontal" />
      <footer className="w-[95%] m-auto px-6 py-14 laptop:w-[80%]">
        <div className="flex flex-col gap-7">
          <div className="flex justify-between flex-col items-center tablet:flex-row gap-3">
            <Link
              href={PublicRoutes.HOME}
              onClick={(e) => {
                e.preventDefault();
                // if (location.pathname == PublicRoutes.HOME) {
                //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                //   props.mobileNavBarRef.current?.setCollapseMobileMenu(false);
                // } else {
                //   navigate(PublicRoutes.HOME);
                // }
              }}
            >
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
                  Any<span className="text-green-700">Commerce</span>
                </p>
              </div>
            </Link>
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
                <CopyRightIcon size="xs" color="text-default-500" />
              </span>{" "}
              {t("derechos-de-autor")}
            </p>
            <div className="flex gap-2">
              <Link className="cursor-pointer text-sm text-default-500 underline underline-offset-2">
                {t("terminos-de-servicio")}
              </Link>
              <Link className="cursor-pointer text-sm text-default-500 underline underline-offset-2">
                {t("politica-de-servicio")}
              </Link>
              <Link className="cursor-pointer text-sm text-default-500 underline underline-offset-2">
                {t("politica-de-cookies")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
