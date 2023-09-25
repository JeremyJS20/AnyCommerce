import { useLocation, useNavigate } from "react-router-dom";
import {
  PrivateRoutes,
  PublicRoutes,
} from "../Utils/routermanager.routes.utils";
import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Badge,
  DropdownSection,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { ThemeContext, themeVerifier } from "../Context/ThemeContext";
import {
  Dispatch,
  FunctionComponent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { LanguageContext, changeLanguage } from "../Context/LanguageContext";
import {
  anyCommerceIconDark,
  anyCommerceIconLight,
} from "../Assets/Img/ImgCollection";
import { CartContext } from "../Context/CartContext";
import Btn from "./Common/Inputs/Button";
import Cart from "./Cart";
import { Icon } from "../Assets/Icons/IconsCollection";
import DropDw, { dropDownItemType } from "./Common/Inputs/Dropdown";

interface INavbarProps {}

const Navbar: FunctionComponent<INavbarProps> = ({}) => {
  const location = useLocation();

  const mobileNavBarRef = useRef<{
    setCollapseMobileMenu: Dispatch<boolean>;
  }>();
  const mainNavBarRef = useRef<{}>();
  const cartRef = useRef<{ setCollapseCart: Dispatch<boolean> }>();

  if (location.pathname.includes(PublicRoutes.SIGNIN)) return <></>;

  return (
    <>
      <MainNavBar
        ref={mainNavBarRef}
        mobileNavBarRef={mobileNavBarRef}
        cartRef={cartRef}
      />
      <MobileNavBar ref={mobileNavBarRef} />
      <Cart ref={cartRef} />
    </>
  );
};

const MainNavBar = forwardRef(
  (
    {
      ...props
    }: {
      mobileNavBarRef: MutableRefObject<any>;
      cartRef: MutableRefObject<any>;
    },
    ref
  ) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { theme, setTheme } = useContext(ThemeContext);
    const { locale } = useContext(LanguageContext);
    const { cart } = useContext(CartContext);

    const localesDropdownItems: dropDownItemType[] = [
      {
        key: "locale0",
        text: "es-espanol",
        type: "normal",
        onPress: () => onLocaleItemClick("es"),
      },
      {
        key: "locale1",
        text: "en-ingles",
        type: "normal",
        onPress: () => onLocaleItemClick("en"),
      },
    ];

    const featureItems: dropDownItemType[] = [
      {
        key: "feature0",
        text: "productos",
        description: "productos-descripcion",
        type: "normal",
        onPress: () => navigate(PublicRoutes.PRODUCTS),
        //route: PublicRoutes.PRODUCTS,
      },
      {
        key: "feature1",
        text: "tiendas",
        description: "tiendas-descripcion",
        type: "normal",
        onPress: () => navigate(PublicRoutes.STORES),
        //route: PublicRoutes.STORES,
      },
    ];

    const onThemeBtnClick = useCallback(() => {
      localStorage.setItem("theme", themeVerifier(theme));
      setTheme(themeVerifier(theme));
    }, [theme]);

    const onLocaleItemClick = useCallback(
      (loc: string) => {
        changeLanguage(locale, loc);
      },
      [locale]
    );

    useImperativeHandle(ref, () => ({}));

    return (
      <NextNavbar
        className="py-0 h-14 bg-ideal-green text-gray-100 relative"
        maxWidth="2xl"
        //isBordered
        
      >
        <NavbarContent className=" gap-6 items-center" justify="start">
          <NavbarItem className="flex laptop:hidden">
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              variant="bordered"
              className="border border-none bg-transparent z-50"
              onClick={() => props.mobileNavBarRef.current?.setCollapseMobileMenu(true)}
            >
              <Icon icon="bars" size={"xl"} color="text-gray-100" />
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden laptop:flex">
            <Link
              href={PublicRoutes.HOME}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname == PublicRoutes.HOME) {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  props.mobileNavBarRef.current?.setCollapseMobileMenu(false);
                } else {
                  navigate(PublicRoutes.HOME);
                }
              }}
              className="hidden laptop:flex"
            >
              <div className="gap-2 items-center flex">
                <img src={anyCommerceIconLight} className="w-6 h-auto" />
                <p className="font-semibold text-xl !text-gray-100 dark:!text-gray-100">
                  AnyCommerce
                </p>
              </div>
            </Link>
          </NavbarItem>
          <DropDw
            btnTitle="articulos"
            items={featureItems}
            additionalClassName="hidden laptop:flex"
            contentWidth={15}
            btnEndIcon={<Icon icon="arrowDown" size="xs" />}
            placement="bottom-start"
          />
        </NavbarContent>
        <NavbarContent justify="center" className="hidden laptop:flex">
          <Input
            classNames={{
              base: "desktop:w-[45rem] laptop:w-[35em] tablet:w-[25em]",
              mainWrapper: "h-full",
              input: "text-sm",
              label: " font-semibold !text-gray-100",
              inputWrapper:
                "h-full border-2 border-gray-100 !bg-transparent text-gray-100",
            }}
            //placeholder={t("buscar-productos")}
            size="md"
            startContent={
              <Icon icon="search" size="base" color="text-gray-100" />
            }
            //endContent={<SearchIcon />}
            type="search"
          />
        </NavbarContent>
        <NavbarContent as="div" className="items-center gap-2" justify="end">
          <NavbarItem>
            <Btn
              icon={
                themeVerifier(theme) == "dark" ? (
                  <Icon icon="moon" size="lg" color="text-gray-100" />
                ) : (
                  <Icon icon="sun" size="lg" color="text-gray-100" />
                )
              }
              size="sm"
              type="onlyIcon"
              aditionalClassnames="p-4"
              onPress={onThemeBtnClick}
            />
          </NavbarItem>
          <NavbarItem>
            <DropDw
              btnStartIcon={
                <Icon icon="globe" size="lg" color="text-gray-100" />
              }
              items={localesDropdownItems}
              placement="bottom-end"
            />
          </NavbarItem>
          <NavbarItem>
            <Badge
              content={
                cart != null && cart.reduce((a, b) => a + b.cartInfo.amount, 0)
              }
              color="primary"
              size="sm"
              classNames={{
                badge: `bg-gray-800 text-gray-100 border-none`,
              }}
              className={`${
                cart != null &&
                cart.reduce((a, b) => a + b.cartInfo.amount, 0) <= 0
                  ? "hidden"
                  : ""
              }`}
            >
              <Btn
                icon={<Icon icon="cart" size="lg" color="text-gray-100" />}
                size="sm"
                type="onlyIcon"
                aditionalClassnames="p-4"
                onPress={() => props.cartRef.current?.setCollapseCart(true)}
              />
            </Badge>
          </NavbarItem>
          <NavbarItem>
            <Btn
              text={"iniciar-sesion"}
              size="sm"
              type="primary"
              aditionalClassnames="!bg-gray-100 !text-gray-900"
              onPress={() => navigate(PublicRoutes.SIGNIN)}
            />
          </NavbarItem>
          <Dropdown
            placement="bottom-end"
            classNames={{ base: "!max-w-[13em] " }}
            className="bg-gray-200 dark:bg-gray-700"
          >
            <DropdownTrigger>
              {/* <Avatar
                as="button"
                className="transition-transform"
                size="sm"
                src={<ProfileIcon size="xl"/>}
              /> */}
              <Button
                isIconOnly
                size="md"
                startContent={
                  <Icon icon="user" size="2xl" color="text-gray-100" />
                }
                className="bg-transparent rounded-full"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider>
                <DropdownItem
                  textValue="1"
                  className="text-gray-800 hover:!bg-transparent dark:hover:!bg-transparent dark:text-gray-100 cursor-default"
                >
                  <p className="font-semibold">Jeremy Solano</p>
                  <p className="text-default-500">jeremy@example.com</p>
                </DropdownItem>
              </DropdownSection>

              <DropdownSection showDivider>
                <DropdownItem
                  key="account"
                  textValue="2"
                  className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                  startContent={<Icon icon="user" size="lg" />}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`${PrivateRoutes.ACCOUNT}/myprofile`);
                  }}
                >
                  {t("cuenta")}
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  textValue="3"
                  className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                  //className="text-gray-800 hover:!bg-ideal-green hover:!text-gray-100 dark:text-gray-100"
                  startContent={<Icon icon="store" size="base" />}
                >
                  {t("tiendas")}
                </DropdownItem>
              </DropdownSection>

              <DropdownItem
                key="logout"
                textValue="4"
                className="text-gray-800 hover:!bg-red-600/60 hover:!text-gray-100 dark:text-gray-100"
                startContent={<Icon icon="signOut" size="base" />}
              >
                {t("cerrar-sesion")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NextNavbar>
    );
  }
);

const MobileNavBar = forwardRef(({}, ref) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [collapseMobileMenu, setCollapseMobileMenu] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setCollapseMobileMenu: setCollapseMobileMenu,
  }));

  useEffect(() => {
    if (collapseMobileMenu) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [collapseMobileMenu]);

  /**
   *       className={`fixed top-0 z-0 w-full h-full bg-gray-900/50 backdrop-blur-sm laptop:hidden transition-opacity duration-300 ${
        collapseMobileMenu ? " opacity-100 !z-40" : "opacity-0"
      }`}
   */

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
            <Link
              href={PublicRoutes.HOME}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname == PublicRoutes.HOME) {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  setCollapseMobileMenu(false);
                } else {
                  navigate(PublicRoutes.HOME);
                }
              }}
            >
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
                  Any<span className="text-green-700">Commerce</span>
                </p>
              </div>
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              variant="bordered"
              className="border border-none bg-gray-100 hover:bg-gray-200  dark:hover:bg-transparent dark:text-gray-800 dark:bg-transparent"
              onClick={() => setCollapseMobileMenu(false)}
            >
              <Icon icon="x" size="xs" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NextNavbar>
    </div>
  );
});

export default Navbar;
