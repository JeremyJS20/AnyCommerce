import { Navbar, NavbarItem, Input } from "@nextui-org/react";
import { imgs } from "../../../Assets/Img/ImgCollection";
import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";
import { ThemeContext } from "../../../Context/ThemeContext";
import { useNavigator, useTranslator } from "../../../Hooks/Common/useCommon";
import { Link2 } from "../../../Components/Common/Inputs/Link";
import React, { FunctionComponent, useContext} from "react";
import Btn from "../../../Components/Common/Inputs/Button";

interface ISignUpProps {}

const SignUp: FunctionComponent<ISignUpProps> = ({}) => {
  const translator = useTranslator();
  const navigator = useNavigator();

  const { theme } = useContext(ThemeContext);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="w-screen p-2 laptop:w-[50vw]">
        <Navbar className=" bg-gray-100 dark:bg-gray-900" maxWidth="full">
          <NavbarItem className="">
            <Link2
              route={PublicRoutes.HOME}
              action={() => navigator({route: PublicRoutes.HOME, title: 'inicio'})}
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
          <form className="flex flex-col gap-7" onSubmit={onFormSubmit}>
            <div className="flex flex-col gap-2 text-center">
              <header className=" text-4xl">{translator({text: 'crea-tu-cuenta'})}</header>
              <p className=" text-lg text-gray-500">{translator({text: 'crea-tu-cuenta2'})}</p>
            </div>
            <Input
              classNames={{
                base: "",
                mainWrapper: "h-full",
                input: "text-sm pl-3",
                inputWrapper:
                  "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
              }}
              label={`${translator({text: 'nombre'})}:`}
              placeholder={translator({text: 'escribe-nombre'})}
              labelPlacement="outside"
              size="lg"
              type="text"
            />
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
              />
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <Link2
                    route={PublicRoutes.FORGOTTENPASSWORD}
                    action={() => {
                      navigator({route: PublicRoutes.FORGOTTENPASSWORD, title: 'contrasena-olvidada'});
                    }}
                    text={'contrasena-olvidada'}
                  />
                </div>
                <Btn
                  size="md"
                  action="submit"
                  text="registrarse"
                  onPress={() => {}}
                  type="primary"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center gap-2">
          <p>{translator({text: 'ya-tienes-cuenta?'})}</p>
          <Link2
            route={PublicRoutes.SIGNIN}
            action={() => {
              navigator({route: PublicRoutes.SIGNIN, title: 'iniciar-sesion'});

            }}
            text={'iniciar-sesion'}
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

export default SignUp;
