import * as React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  PrivateRoutes,
  PublicRoutes,
} from "../../Utils/routermanager.routes.utils";
import { NextUIProvider } from "@nextui-org/react";
import Home from "../PublicPages/Home/Home";
import Container from "../../Components/Container";
import LanguageContextProvider from "../../Context/LanguageContext";
import ThemeContextProvider from "../../Context/ThemeContext";
import SignIn from "../PublicPages/SignIn/SignIn";
import SignUp from "../PublicPages/SignUp/SignUp";
import Products from "../PublicPages/Products/Products";
import CartContextProvider from "../../Context/CartContext";
import ProductDetails from "../PublicPages/Products/ProductDetails";
import AsideMenu from "../../Components/Common/AsideMenu";
import AsideMenuContent from "../../Components/Common/AsideMenuContent";

interface IRouterManagerProps {}

const RouterManager: React.FunctionComponent<IRouterManagerProps> = ({}) => {
  return (
    <NextUIProvider>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <CartContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<>not found</>} />

                <Route element={<Container />}>
                  <Route path={PublicRoutes.HOME} element={<Home />} />
                  <Route path={PublicRoutes.SIGNIN} element={<SignIn />} />
                  <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />

                  <Route
                    path={
                      PublicRoutes.PRODUCTS || PublicRoutes.PRODUCTSWITHFILTERS
                    }
                    element={<Outlet />}
                  >
                    <Route index element={<Products />} />
                    <Route
                      path={PublicRoutes.PRODUCTDETAILS}
                      element={<ProductDetails />}
                    />
                  </Route>

                  <Route
                    path={PrivateRoutes.ACCOUNT}
                    element={
                      <AsideMenu>
                        <Outlet />
                      </AsideMenu>
                    }
                  >
                    <Route path={":childPage"} element={<Outlet />}>
                      <Route index element={<AsideMenuContent />} />

                      <Route
                        path={`${PrivateRoutes.ACCOUNTFILTERS}`}
                        element={<AsideMenuContent />}
                      />

                      <Route
                        path={`new`}
                        element={<AsideMenuContent />}
                      />
                      <Route
                        path={`:id`}
                        element={<AsideMenuContent />}
                      >
                        <Route path="?:action" element={<AsideMenuContent />} />
                        <Route path="transactions" element={<AsideMenuContent />} />
                      </Route>
                    </Route>
                  </Route>

                  <Route
                    path={PublicRoutes.FORGOTTENPASSWORD}
                    element={<>ForgottenPass</>}
                  />
                  <Route
                    path={PublicRoutes.RESETPASSWORD}
                    element={<>ResetPass</>}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartContextProvider>
        </ThemeContextProvider>
      </LanguageContextProvider>
    </NextUIProvider>
  );
};

export default RouterManager;
