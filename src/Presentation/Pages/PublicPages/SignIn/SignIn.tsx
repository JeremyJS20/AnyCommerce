import {
  anyCommerceIconDark,
  anyCommerceIconLight,
  eCommerce,
} from "../../../Assets/Img/ImgCollection";
import { Button, Input, Link, Navbar, NavbarItem } from "@nextui-org/react";
import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";
import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../Assets/Icons/IconsCollection";

interface ISignInProps {}

const SignIn: React.FunctionComponent<ISignInProps> = ({}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password");

  const PassBtnRender = () => (
    <Button
      isIconOnly
      size="sm"
      radius="sm"
      variant="bordered"
      className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
      onClick={useCallback(
        () =>
          setPasswordInputType(
            passwordInputType == "password" ? "text" : "password"
          ),
        []
      )}
    >
      {passwordInputType == "password" ? (
        <Icon icon="eye" size={"xs"} />
      ) : (
        <Icon icon="eyeSlash" size={"xs"} />
      )}
    </Button>
  );

  return (
    <div className="h-screen w-screen flex">
      <div className="w-screen p-2 laptop:w-[50vw]">
        <Navbar className=" bg-gray-100 dark:bg-gray-900" maxWidth="full">
          <NavbarItem className="">
            <Link
              href={PublicRoutes.HOME}
              onClick={(e) => {
                e.preventDefault();
                navigate(PublicRoutes.HOME);
              }}
            >
              <div className="gap-2 items-center flex">
                <img
                  src={
                    theme === "light"
                      ? anyCommerceIconDark
                      : anyCommerceIconLight
                  }
                  className="w-5 h-auto"
                />
                <p className="font-bold text-xl !text-gray-800 dark:!text-gray-100">
                  Any<span className="text-green-700">Commerce</span>
                </p>
              </div>
            </Link>
          </NavbarItem>
        </Navbar>
        <div className="flex flex-col justify-center h-[85vh] w-[80%] tablet:w-[60%] mx-auto">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2 text-center">
              <header className=" text-4xl">{t("bienvenida")}!</header>
              <p className=" text-lg text-gray-500">{t("bienvenida2")}</p>
            </div>
            <Input
              classNames={{
                base: "",
                mainWrapper: "h-full",
                input: "text-sm pl-3",
                inputWrapper:
                  "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
              }}
              label={`${t("correo")}:`}
              placeholder={t("escribe-email")}
              labelPlacement="outside"
              size="lg"
              startContent={<Icon icon="mail" size="lg" />}
              //endContent={<SearchIcon />}
              type="email"
            />
            <div className="flex flex-col gap-5">
              <Input
                classNames={{
                  base: "",
                  mainWrapper: "h-full",
                  input: "text-sm pl-3",
                  inputWrapper:
                    "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
                }}
                label={`${t("contrasena")}:`}
                labelPlacement="outside"
                placeholder={t("escribe-contrasena")}
                size="lg"
                startContent={<Icon icon="key" size="lg" />}
                endContent={<PassBtnRender />}
                type={passwordInputType}
              />
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  {/* <p>dd</p> */}
                  <Link
                    href={PublicRoutes.FORGOTTENPASSWORD}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(PublicRoutes.FORGOTTENPASSWORD);
                    }}
                  >
                    <p className=" text-green-700">
                      {t("contrasena-olvidada")}?
                    </p>
                  </Link>
                </div>
                <Button
                  size="md"
                  radius="sm"
                  variant="bordered"
                  className="border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
                  // onClick={() => navigate(PublicRoutes.SIGNIN)}
                >
                  {t("iniciar-sesion")}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <p>{t("no-tienes-cuenta?")}</p>
          <Link
            href={PublicRoutes.SIGNUP}
            onClick={(e) => {
              e.preventDefault();
              navigate(PublicRoutes.SIGNUP);
            }}
          >
            <p className=" text-green-700">{t("registrate")}</p>
          </Link>
        </div>
      </div>
      <div
        className="w-[50vw] bg-cover bg-center bg-no-repeat hidden laptop:flex"
        style={{ backgroundImage: `url(${eCommerce})` }}
      ></div>
    </div>
  );
};

export default SignIn;
