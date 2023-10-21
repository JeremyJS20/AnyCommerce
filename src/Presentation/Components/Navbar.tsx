import { useLocation } from "react-router-dom";
import {
  PrivateRoutes,
  PublicRoutes,
} from "../Utils/routermanager.routes.utils";
import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Badge,
  DropdownSection,
} from "@nextui-org/react";
import { ThemeContext, themeVerifier } from "../Context/ThemeContext";
import {
  Dispatch,
  FunctionComponent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LanguageContext, changeLanguage } from "../Context/LanguageContext";
import {
  anyCommerceIconLight,
} from "../Assets/Img/ImgCollection";
import { CartContext } from "../Context/CartContext";
import Btn from "./Common/Inputs/Button";
import Cart, { cartProps } from "./Cart";
import { Icon } from "../Assets/Icons/IconsCollection";
import DropDw, { dropDownItemType } from "./Common/Inputs/Dropdown";
import { useNavigator, useTranslator } from "../Hooks/Common/useCommon";
import { Link2 } from "./Common/Inputs/Link";
import { MobileNavBar } from "./Common/MobileNavBar";

interface INavbarProps {}

const Navbar: FunctionComponent<INavbarProps> = ({}) => {
  const location = useLocation();

  const mobileNavBarRef = useRef<{
    setCollapseMobileMenu: Dispatch<boolean>;
  }>();
  const mainNavBarRef = useRef<{}>();
  const cartRef = useRef<cartProps>();

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
      cartRef: MutableRefObject<cartProps | undefined>;
    },
    ref
  ) => {
    const translator = useTranslator();
    const navigator = useNavigator();

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
        onPress: () =>
          !location.pathname.includes(PublicRoutes.PRODUCTS) && navigator({ route: PublicRoutes.PRODUCTS, title: "productos" }),
      },
      {
        key: "feature1",
        text: "tiendas",
        description: "tiendas-descripcion",
        type: "normal",
        onPress: () =>
        !location.pathname.includes(PublicRoutes.STORES) && navigator({ route: PublicRoutes.STORES, title: "tiendas" }),
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
            <Btn
              type="onlyIcon"
              icon={<Icon icon="bars" size={"xl"} color="text-gray-100" />}
              onPress={() =>
                props.mobileNavBarRef.current?.setCollapseMobileMenu(true)
              }
            />
          </NavbarItem>
          <NavbarItem className="hidden laptop:flex">
            <Link2
              //route={PublicRoutes.HOME}
              action={() => {
                if (location.pathname == PublicRoutes.HOME) {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  props.mobileNavBarRef.current?.setCollapseMobileMenu(false);
                } else {
                  navigator({ route: PublicRoutes.HOME, title: "inicio" });
                }
              }}
              text={
                <div className="gap-2 items-center flex">
                  <img src={anyCommerceIconLight} className="w-6 h-auto" />
                  <p className="font-semibold text-xl !text-gray-100 dark:!text-gray-100">
                    AnyCommerce
                  </p>
                </div>
              }
              additionalClassName="hidden laptop:flex"
            />
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
              onPress={() => navigator({route: PublicRoutes.SIGNIN, title: 'inicio'})}
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
                    navigator({route: `${PrivateRoutes.ACCOUNT}/myprofile`, title: 'myprofile'});
                  }}
                >
                  {translator({text: 'cuenta'})}
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  textValue="3"
                  className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                  startContent={<Icon icon="store" size="base" />}
                >
                  {translator({text: 'tiendas'})}
                </DropdownItem>
              </DropdownSection>

              <DropdownItem
                key="logout"
                textValue="4"
                className="text-gray-800 hover:!bg-red-600/60 hover:!text-gray-100 dark:text-gray-100"
                startContent={<Icon icon="signOut" size="base" />}
              >
                  {translator({text: 'cerrar-sesion'})}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NextNavbar>
    );
  }
);



export default Navbar;
