import {
  NavbarContent,
  NavbarItem,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import {
  forwardRef,
  useContext,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { Icon } from "../../Assets/Icons/IconsCollection";
import {
  anyCommerceIconDark,
  anyCommerceIconLight,
} from "../../Assets/Img/ImgCollection";
import { ThemeContext } from "../../Context/ThemeContext";
import { PublicRoutes } from "../../Utils/routermanager.routes.utils";
import { Link2 } from "./Inputs/Link";
import { useNavigator } from "../../Hooks/Common/useCommon";
import Btn from "./Inputs/Button";

export const MobileNavBar = forwardRef(({}, ref) => {
  const { theme } = useContext(ThemeContext);
  const navigator = useNavigator();

  const [collapseMobileMenu, setCollapseMobileMenu] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setCollapseMobileMenu: setCollapseMobileMenu,
  }));

  useEffect(() => {
    if (collapseMobileMenu) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [collapseMobileMenu]);

  return (
    <div
      className={`fixed top-0 z-0 w-full h-full bg-gray-900/50 backdrop-blur-sm laptop:hidden transition-opacity duration-300 ${
        collapseMobileMenu ? " opacity-100 !z-40" : "opacity-0"
      }`}
      onClick={(e) => {
        if ((e.target as HTMLDivElement).tagName === "DIV")
          setCollapseMobileMenu(false);
      }}
    >
      <NextNavbar
        className={`h-full items-start bg-gray-100 dark:bg-gray-900 transition-width duration-300 z-50 ${
          collapseMobileMenu ? "w-full tablet:w-[50%] " : "w-0"
        }`}
        isBlurred={false}
      >
        <NavbarContent className=" !justify-between">
          <NavbarItem>
            <Link2
              //route={PublicRoutes.HOME}
              action={() => {
                if (location.pathname == PublicRoutes.HOME) {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                } else {
                  navigator({ route: PublicRoutes.HOME, title: "inicio" });
                }
                setCollapseMobileMenu(false);
              }}
              text={
                <div className="flex gap-2 items-center">
                  <img
                    src={
                      theme === "light"
                        ? anyCommerceIconDark
                        : anyCommerceIconLight
                    }
                    className="w-4 h-auto"
                  />
                  <p className="font-bold text-xl !text-gray-800 dark:!text-gray-100">
                    Any<span className="text-ideal-green">Commerce</span>
                  </p>
                </div>
              }
            />
          </NavbarItem>
          <NavbarItem className="">
            <Btn
              type="onlyIcon"
              icon={<Icon icon="x" size="xs" />}
              onPress={() => setCollapseMobileMenu(false)}
            />
          </NavbarItem>
        </NavbarContent>
      </NextNavbar>
    </div>
  );
});
