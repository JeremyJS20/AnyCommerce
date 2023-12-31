import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect } from "react";
import { ThemeContext, themeVerifier } from "../Context/ThemeContext";
import {
  anyCommerceIconLight,
} from "../Assets/Img/ImgCollection";
import { PrivateRoutes, PublicRoutes } from "../Utils/routermanager.routes.utils";
import { Toaster } from "sonner";
import Footer from "./Footer";
import { Divider } from "@nextui-org/react";
import { useTranslator } from "../Hooks/Common/useCommon";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const translator = useTranslator();

  const { childPage } = useParams();

  const routesWithNoNavbar = [
    PublicRoutes.SIGNIN,
    PublicRoutes.SIGNUP,
    PublicRoutes.FORGOTTENPASSWORD,
    PublicRoutes.RESETPASSWORD,
  ];

  const routesWithNoFooter = [
    PrivateRoutes.MYPROFILE,
    PrivateRoutes.MYORDERS,
    PrivateRoutes.MYPURCHASES,
    PrivateRoutes.MYLISTS,
    PrivateRoutes.MYPAYMENTMETHODS
  ]

  useEffect(() => {
    if (theme === "undefined") return;
    document.body.classList.remove(themeVerifier(theme), 'bg-gray-900', 'bg-gray-100');
    document.body.classList.add(theme, 'h-screen', theme == 'dark'? 'bg-gray-900': 'bg-gray-100');
  }, [theme]);

  useEffect(() => {
    const pageTitle = localStorage.getItem('pageTitle');
    
    if(pageTitle != null) document.title = `${translator({text: pageTitle})} - AnyCommerce`
    else document.title = "AnyCommerce";
  }, []);

  useEffect(() => {
    var link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      document.head.appendChild(link);
    }
    link.href = anyCommerceIconLight;
  }, []);

  if (routesWithNoNavbar.includes(location.pathname))
    return (
      <div className="bg-gray-100 text-gray-900 tracking-tighter dark:text-gray-100 dark:bg-gray-900">
        <Outlet />
      </div>
    );

  return (
    <div className=" bg-gray-100 text-gray-900 tracking-tight dark:text-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex items-center p-2 justify-center font-bold">
        {translator({text: 'web-en-construccion'})}
      </div>
      <Divider orientation="horizontal"/>
      <div className="flex justify-center ">
        <Outlet />
      </div>
      {
        !routesWithNoFooter.includes(String(childPage)) && (<Footer />)
      }
      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "!bg-gray-900 !text-gray-100 !border-none dark:!text-gray-900 dark:!bg-gray-100",
        }}
      />
    </div>
  );
};

export default Container;
