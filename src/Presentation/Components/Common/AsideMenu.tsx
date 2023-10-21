import { Divider } from "@nextui-org/react";
import { Outlet, useLocation } from "react-router-dom";

import { PrivateRoutes } from "../../Utils/routermanager.routes.utils";
import { useEffect } from "react";
import { Icon } from "../../Assets/Icons/IconsCollection";
import { Link2 } from "./Inputs/Link";
import { useNavigator, useTranslator } from "../../Hooks/Common/useCommon";

interface IAsideMenuProps {}

const AsideMenu: React.FunctionComponent<IAsideMenuProps> = ({}) => {
  const translator = useTranslator();
  const location = useLocation();
  const navigator = useNavigator();

  const menuItems = [
    {
      key: "menuitem0",
      parentPage: "account",
      text: "perfil",
      route: "myprofile",
      icon: <Icon icon="user" size="lg" />,
    },
    {
      key: "menuitem7",
      parentPage: "account",
      text: "direcciones",
      route: "myaddresses",
      icon: <Icon icon="address" size="lg" />,
    },
    {
      key: "menuitem1",
      parentPage: "account",
      text: "pedidos",
      route: "myorders",
      icon: <Icon icon="orders" size="lg" />,
    },
    {
      key: "menuitem2",
      parentPage: "account",
      text: "compras",
      route: "mypurchases",
      icon: <Icon icon="cart" size="lg" />,
    },
    {
      key: "menuitem3",
      parentPage: "account",
      text: "listas",
      route: "mylists",
      icon: <Icon icon="list" size="lg" />,
    },
    {
      key: "menuitem4",
      parentPage: "account",
      text: "metodos-de-pago",
      route: "mypaymentmethods",
      icon: <Icon icon="money" size="lg" />,
    },
    // {
    //   key: "menuitem5",
    //   parentPage: "account",
    //   text: "preferencias",
    //   route: "mypreferences",
    //   icon: <SlidersIcon size="lg" />,
    // },
    {
      key: "menuitem6",
      parentPage: "stores",
      text: "dashboard",
      route: "mypaymentmethods",
      icon: <Icon icon="money" size="lg" />,
    },
  ];

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="w-full h-[90vh]">
      <div className="flex flex-col laptop:flex-row desktopW:max-w-[1510px] mx-auto h-full gap-5 relative">
        <div className="flex flex-col laptop:w-[20%]">
          <ul className=" flex items-center justify-center laptop:block laptop:h-full py-2 laptop:py-10">
            {menuItems
              .filter((mi) => location.pathname.includes(mi.parentPage))
              .map((mi) => (
                <li key={mi.key} className="mb-1">
                  <Link2
                    //href={`${PrivateRoutes.ACCOUNT}/${mi.route}`}
                    text={
                      <>
                        {mi.icon}
                        <p className={` hidden tablet:inline`}>{translator({text: mi.text})}</p>
                      </>
                    }
                    additionalClassName={`flex items-center gap-3 rounded-xl p-3 hover:bg-ideal-green hover:text-gray-100 ${
                      location.pathname.includes(mi.route)
                        ? "text-gray-100 bg-ideal-green"
                        : "text-default-500"
                    }`}
                    action={() => {
                      navigator({route: `${PrivateRoutes.ACCOUNT}/${mi.route}`, title: mi.route});
                    }}
                  />
                </li>
              ))}
          </ul>
          <Divider orientation="horizontal" className=" laptop:hidden" />
        </div>
        <Divider orientation="vertical" className="hidden laptop:flex" />
        <div className="py-5 laptop:py-10 w-[90%] mx-auto laptop:w-[80%] overflow-y-auto max-h-[90vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AsideMenu;
