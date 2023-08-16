import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from '../../Utils/routermanager.routes.utils';
import { NextUIProvider } from '@nextui-org/react';
import Home from '../Home/Home';
import Container from '../../Components/Container';
import LanguageContextProvider from '../../Context/LanguageContext';
import ThemeContextProvider from '../../Context/ThemeContext';

interface IRouterManagerProps {
}

const RouterManager: React.FunctionComponent<IRouterManagerProps> = (props) => {
  return (
    <NextUIProvider>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <Routes>

              <Route path='*' element={<>not found</>} />

              <Route element={<Container />}>
                <Route path={PublicRoutes.HOME} element={<Home />} />
                <Route path={PublicRoutes.SIGNIN} element={<>SignIn</>} />
                <Route path={PublicRoutes.SIGNUP} element={<>SignUp</>} />
                <Route path={PublicRoutes.FORGOTTENPASSWORD} element={<>ForgottenPass</>} />
                <Route path={PublicRoutes.RESETPASSWORD} element={<>ResetPass</>} />
              </Route>
              {/* <Route element={<AuthPrivateRouteVerifier />}>
          <Route path={PrivateRoutes.CHATUI} element={<ChatUIComponent socket={socket} />} />
        </Route> */}
            </Routes>
          </BrowserRouter>
        </ThemeContextProvider>
      </LanguageContextProvider>
    </NextUIProvider>
  );
};

export default RouterManager;
