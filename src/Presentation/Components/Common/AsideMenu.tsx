import { Divider, Link } from "@nextui-org/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  CartIcon,
  ListIcon,
  MoneyIcon,
  OrdersIcon,
  ProfileIcon,
  SlidersIcon,
} from "../../Assets/Icons/IconsCollection";
import { useTranslation } from "react-i18next";
import { PrivateRoutes } from "../../Utils/routermanager.routes.utils";
import { useEffect } from "react";

interface IAsideMenuProps {}

const AsideMenu: React.FunctionComponent<IAsideMenuProps> = ({}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "menuitem0",
      parentPage: "account",
      text: "perfil",
      route: "myprofile",
      icon: <ProfileIcon size="lg" />,
    },
    {
      key: "menuitem1",
      parentPage: "account",
      text: "pedidos",
      route: "myorders",
      icon: <OrdersIcon size="lg" />,
    },
    {
      key: "menuitem2",
      parentPage: "account",
      text: "compras",
      route: "mypurchases",
      icon: <CartIcon size="lg" />,
    },
    {
      key: "menuitem3",
      parentPage: "account",
      text: "listas",
      route: "mylists",
      icon: <ListIcon size="lg" />,
    },
    {
      key: "menuitem4",
      parentPage: "account",
      text: "metodos-de-pago",
      route: "mypaymentmethods",
      icon: <MoneyIcon size="lg" />,
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
      icon: <MoneyIcon size="lg" />,
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
      <div className="flex desktopW:max-w-[1510px] mx-auto h-full gap-5 relative">
        <ul className="hidden laptop:block laptop:w-[20%] h-full py-10">
          {menuItems
            .filter((mi) => location.pathname.includes(mi.parentPage))
            .map((mi) => (
              <li key={mi.key} className="mb-1">
                <Link
                  href={`${PrivateRoutes.ACCOUNT}/${mi.route}`}
                  className={`flex items-center gap-3 rounded-xl p-3 hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    location.pathname.includes(mi.route)
                      ? "text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800"
                      : "text-default-500"
                  }`}
                  as={"a"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`${PrivateRoutes.ACCOUNT}/${mi.route}`);
                  }}
                >
                  {mi.icon}
                  <p>{t(mi.text)}</p>
                </Link>
              </li>
            ))}
        </ul>
        <Divider orientation="vertical" className="hidden laptop:flex" />
        <div className="py-10 w-[90%] mx-auto laptop:w-[80%] overflow-y-auto max-h-[90vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AsideMenu;
