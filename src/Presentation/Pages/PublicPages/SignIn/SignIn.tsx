import { Input, Navbar, NavbarItem } from "@nextui-org/react";
import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import Btn from "../../../Components/Common/Inputs/Button";
import { useNavigator, useTranslator } from "../../../Hooks/Common/useCommon";
import { Link2 } from "../../../Components/Common/Inputs/Link";
import { imgs } from "../../../Assets/Img/ImgCollection";

interface ISignInProps {}

const SignIn: React.FunctionComponent<ISignInProps> = ({}) => {
  const translator = useTranslator();
  const navigator = useNavigator();

  const { theme } = useContext(ThemeContext);

  const [passwordInputType, setPasswordInputType] = useState<
    "text" | "password"
  >("password");

  const PassBtnRender = () => (
    <Btn
      icon={
        passwordInputType == "password" ? (
          <Icon icon="eye" size={"xs"} />
        ) : (
          <Icon icon="eyeSlash" size={"xs"} />
        )
      }
      size="md"
      onPress={() =>
        setPasswordInputType(
          passwordInputType == "password" ? "text" : "password"
        )
      }
      type="onlyIcon"
    />
  );

  return (
    <div className="h-screen w-screen flex">
      <div className="w-screen p-2 laptop:w-[50vw]">
        <Navbar className=" bg-gray-100 dark:bg-gray-900" maxWidth="full">
          <NavbarItem className="">
            <Link2
              route={""}
              action={() => navigator({ route: PublicRoutes.HOME, title: "inicio" })}
              text={
                <div className="gap-2 items-center flex">
                  <img
                    src={
                      theme === "light"
                        ? imgs['anyCommerceDark']
                        : imgs['anyCommerceLight']
                    }
                    className="w-5 h-auto"
                  />
                  <p className="font-bold text-xl !text-gray-800 dark:!text-gray-100">
                    Any<span className="text-ideal-green">Commerce</span>
                  </p>
                </div>
              }
            />
          </NavbarItem>
        </Navbar>
        <div className="flex flex-col justify-center h-[85vh] w-[80%] tablet:w-[60%] mx-auto">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2 text-center">
              <header className=" text-4xl">{translator({text: 'bienvenida'})}!</header>
              <p className=" text-lg text-gray-500">{translator({text: 'bienvenida2'})}</p>
            </div>
            <Input
              classNames={{
                base: "",
                mainWrapper: "h-full",
                input: "text-sm pl-3",
                inputWrapper:
                  "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
              }}
              label={`${translator({text: 'correo'})}:`}
              placeholder={translator({text: 'escribe-email'})}
              labelPlacement="outside"
              size="lg"
              startContent={<Icon icon="mail" size="lg" />}
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
                label={`${translator({text: 'contrasena'})}:`}
                labelPlacement="outside"
                placeholder={translator({text: 'escribe-contrasena'})}
                size="lg"
                startContent={<Icon icon="key" size="lg" />}
                endContent={<PassBtnRender />}
                type={passwordInputType}
              />
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <Link2
                    route={PublicRoutes.FORGOTTENPASSWORD}
                    action={() => 
                      navigator({
                        route: PublicRoutes.FORGOTTENPASSWORD,
                        title: "contrasena-olvidada",
                      })
                    }
                    text={'contrasena-olvidada'}
                  />
                </div>
                <Btn
                  size="md"
                  text="iniciar-sesion"
                  onPress={() => {}}
                  type="primary"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <p>{translator({text: 'no-tienes-cuenta?'})}</p>
          <Link2
            route={PublicRoutes.SIGNUP}
            action={() => navigator({ route: PublicRoutes.SIGNUP, title: "registrate" })}
            text={'registrate'}
          />
        </div>
      </div>
      <div
        className="w-[50vw] bg-cover bg-center bg-no-repeat hidden laptop:flex"
        style={{ backgroundImage: `url(${imgs['ecommerce']})` }}
      ></div>
    </div>
  );
};

export default SignIn;
