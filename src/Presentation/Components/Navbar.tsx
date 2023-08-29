import { useLocation, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../Utils/routermanager.routes.utils";
import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
  Input,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Divider,
  Badge,
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
import {
  ArrowDownIcon,
  CartIcon,
  CollapseIcon,
  LanguageIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  ThemeDarkIcon,
  ThemeLightIcon,
  TrashIcon,
  XIcon,
} from "../Assets/Icons/IconsCollection";
import { CartContext } from "../Context/CartContext";
import { cartProducts } from "../Utils/types.utils";
import { toast } from "sonner";

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

    const localesDropdownItems = [
      {
        key: 0,
        text: "es-espanol",
        value: "es",
      },
      {
        key: 1,
        text: "en-ingles",
        value: "en",
      },
    ];

    const featureItems:{
      key: string;
      text: string;
      description: string;
      route: string;
    }[] = [
      {
        key: "feature0",
        text: "productos",
        description: "productos-descripcion",
        route: PublicRoutes.PRODUCTS,
      },
      {
        key: "feature1",
        text: "tiendas",
        description: "tiendas-descripcion",
        route: PublicRoutes.STORES,
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
        className="py-0 h-14 bg-gray-100/90 dark:bg-gray-900/90"
        maxWidth="2xl"
        isBordered
      >
        <NavbarContent className=" gap-6 items-center" justify="start">
          <NavbarItem className="flex laptop:hidden">
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              variant="bordered"
              className="border border-none bg-gray-100 hover:bg-gray-200  dark:hover:bg-transparent dark:text-gray-800 dark:bg-transparent"
              onClick={() =>
                props.mobileNavBarRef.current?.setCollapseMobileMenu(true)
              }
            >
              <CollapseIcon size={"xl"} />
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
            >
              <div className="gap-2 items-center flex">
                <img
                  src={
                    theme === "light"
                      ? anyCommerceIconDark
                      : anyCommerceIconLight
                  }
                  className="w-5 h-auto"
                />
                <p className="font-bold text-xl !text-gray-800 dark:!text-gray-100">
                  Any<span className="text-green-700">Commerce</span>
                </p>
              </div>
            </Link>
          </NavbarItem>
          <Dropdown className="bg-gray-200 dark:bg-gray-700">
            <NavbarItem className="!pt-1 hidden laptop:flex">
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<ArrowDownIcon size="xs" />}
                  radius="sm"
                  size="md"
                  variant="light"
                >
                  {t("articulos")}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              className="w-[15em]"
              itemClasses={{
                base: "gap-4",
                title: "text-sm",
                description: "",
              }}
              aria-label="ddd"
            >
              {featureItems.map((feat) => (
                <DropdownItem
                  key={feat.key}
                  description={t(feat.description)}
                  className={`text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100 ${
                    location.pathname == feat.route
                      ? "!bg-gray-300 dark:!bg-gray-500"
                      : ""
                  }`}
                  onClick={() => navigate(feat.route)}
                >
                  {t(feat.text)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarContent justify="center" className="hidden laptop:flex">
          <Input
            classNames={{
              base: "desktop:w-[45rem] laptop:w-[35em] tablet:w-[25em]",
              mainWrapper: "h-full",
              input: "text-xs",
              inputWrapper:
                "h-full border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
            }}
            placeholder={t("buscar-productos")}
            size="md"
            startContent={<SearchIcon size="lg" />}
            //endContent={<SearchIcon />}
            type="search"
          />
        </NavbarContent>
        <NavbarContent as="div" className="items-center gap-2" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform hidden"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              variant="bordered"
              className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
              onClick={onThemeBtnClick}
            >
              {themeVerifier(theme) == "dark" ? (
                <ThemeDarkIcon size="xs" />
              ) : (
                <ThemeLightIcon size="xs" />
              )}
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Dropdown className="bg-gray-200 dark:bg-gray-700">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  radius="sm"
                  variant="bordered"
                  className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
                >
                  <LanguageIcon size="xs" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {localesDropdownItems.map((loc) => (
                  <DropdownItem
                    key={loc.key}
                    className={`text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100 ${
                      locale == loc.value
                        ? "!bg-gray-300 dark:!bg-gray-500"
                        : ""
                    }`}
                    onClick={() => onLocaleItemClick(loc.value)}
                  >{`${t(loc.text)}`}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Badge content={cart != null && cart.reduce((a,b) => a + b.cartInfo.amount, 0)}  color="primary" size="md" classNames={{badge: `bg-gray-800 text-gray-100 dark:bg-gray-100 border-none dark:text-gray-800 ${cart != null && cart.reduce((a,b) => a + b.cartInfo.amount, 0) <= 0? 'hidden':''}`}}>
              <Button
                isIconOnly
                size="sm"
                radius="sm"
                variant="bordered"
                className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
                onClick={() => {
                  props.cartRef.current?.setCollapseCart(true);
                }}
              >
                <CartIcon size="xs" />
              </Button>
            </Badge>
          </NavbarItem>
          <NavbarItem>
            <Button
              size="sm"
              radius="sm"
              variant="bordered"
              className="border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
              onClick={() => navigate(PublicRoutes.SIGNIN)}
            >
              {t("iniciar-sesion")}
            </Button>
          </NavbarItem>
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
    if(collapseMobileMenu) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden')
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
              <XIcon size="xs" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NextNavbar>
    </div>
  );
});

const Cart = forwardRef(({}, ref) => {
  const { t } = useTranslation();
  const { cart, setCart } = useContext(CartContext);

  const [collapseCart, setCollapseCart] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setCollapseCart: setCollapseCart,
  }));

  const screenWidth = window.innerWidth;

  useEffect(() => {
    if(collapseCart) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden')
  }, [collapseCart]);

  const getCartSubtotal = (cart: cartProducts[]) => {
    return `${
      String(
        cart.reduce(
          (a: any, b) => a + b.productInfo.cost * b.cartInfo.amount,
          0
        )
      ).split(".")[0]
    }.${!String(
      cart.reduce((a: any, b) => a + b.productInfo.cost * b.cartInfo.amount, 0)
    )
      .split(".")[1]? '00': String(
        cart.reduce((a: any, b) => a + b.productInfo.cost * b.cartInfo.amount, 0)
      )
        .split(".")[1].substring(0,2)}`;
  };

  return (
    <div
      id="noCartArea"
      className={`fixed bottom-0 z-0 right-0 h-screen bg-gray-900/50 backdrop-blur-sm transition-width duration-300 ${
        collapseCart ? "w-full !z-50 " : "w-0"
      }`}
      onClick={(e) => {
        if (!collapseCart) return;
        if ((e.target as HTMLDivElement).id == "noCartArea")
          setCollapseCart(false);
      }}
    >
      <div
        className={`h-full top-0 right-0 absolute items-start bg-gray-100 border-l-none border-divider dark:bg-gray-900 transition-width duration-300 z-50 ${
          collapseCart ? "w-full desktopW:w-[28vw] tablet:w-[60vw] " : "w-0"
        }`}
      >
        <div
          className={`py-5 px-5 h-full w-full tablet:px-8 ${
            collapseCart ? "" : "hidden"
          }`}
        >
          <header className="mb-3 flex justify-between">
            <p className="text-xl font-bold">
              {t("carrito")}
              {`(${cart != null && cart.reduce((a, b) => a + b.cartInfo.amount, 0)})`}
            </p>
            <Button
              isIconOnly
              size="sm"
              radius="sm"
              variant="bordered"
              className="border border-none bg-gray-100 hover:bg-gray-200  dark:hover:bg-transparent dark:text-gray-800 dark:bg-transparent"
              onClick={() => setCollapseCart(false)}
            >
              <XIcon size="xs" />
            </Button>
          </header>
          <Divider orientation="horizontal" />

          <div className="h-[90vh] flex flex-col justify-between">
            {cart != null && cart.length <= 0 ? (
              <div className="flex h-[90vh] items-center justify-center">
                <p className="text-xl text-gray-500">{t("carrito-vacio")}</p>
              </div>
            ) : (
              <div className=" max-h-[65vh] overflow-auto tablet:max-h-[75vh]">
                <ol className=" ">
                  {cart != null && cart.map((prod, index) => (
                    <>
                      <li
                        key={prod.productInfo.id + index}
                        className="mt-3 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-5">
                          <img
                            className="w-16 h-16 tablet:w-20 tablet:h-20"
                            src={prod.productInfo.img}
                          />
                          <div className="flex flex-col justify-between text-sm tablet:text-base">
                            {screenWidth < 640 ? (
                              <>
                                <p className=" text-base laptop:text-lg">
                                  {prod.productInfo.name
                                    .substring(0, 10)
                                    .trim()}
                                  ...
                                </p>
                                <div>
                                  <p className="text-gray-500">
                                    {`$${prod.productInfo.cost} x ${prod.cartInfo.amount}`
                                      .substring(0, 10)
                                      .trim()}
                                    .....
                                  </p>
                                  <p className="text-gray-500">
                                    {prod.productInfo.category
                                      .substring(0, 10)
                                      .trim()}
                                    ...
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <p className=" text-base laptop:text-lg">
                                  {prod.productInfo.name}
                                </p>
                                <div>
                                  <p className="text-gray-500">
                                    {`$${prod.productInfo.cost} x ${prod.cartInfo.amount}`}
                                  </p>
                                  <p className="text-gray-500">
                                    {prod.productInfo.category}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            variant="bordered"
                            className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
                            onClick={() => {
                              const temp = cart.slice();
                              const element = temp.find(
                                (i) => i.productInfo.id == prod.productInfo.id
                              );
                              if (element) {
                                element.cartInfo.amount -= 1;

                                if (element.cartInfo.amount == 0) {
                                  temp.splice(temp.indexOf(element), 1);
                                }

                                setCart(temp);
                              }
                            }}
                          >
                            <MinusIcon size="xs" />
                          </Button>

                          <Input
                            classNames={{
                              base: "w-[3em]",
                              mainWrapper: "",
                              input: "text-xs",
                              inputWrapper:
                                "border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
                            }}
                            size="sm"
                            type="number"
                            onValueChange={(value) => {
                              const temp = cart.slice();
                              const prod2 = temp.find(
                                (i) => i.productInfo.id == prod.productInfo.id
                              );

                              if (prod2) {
                                if (value == "0") {
                                  temp.splice(temp.indexOf(prod2), 1);
                                } else {                                  
                                  if(Number(value) < prod2.productInfo.stock){
                                    prod2.cartInfo.amount = Number(value);
                                  } else{
                                    return toast.error(t('existencia-de-producto-en-tienda-excedida'));
                                  }
                                }
                                setCart(temp);
                              }
                            }}
                            value={String(prod.cartInfo.amount)}
                          />

                          <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            variant="bordered"
                            className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
                            onClick={() => {
                              const temp = cart.slice();
                              const element = temp.find(
                                (i) => i.productInfo.id == prod.productInfo.id
                              );
                              if (element) {                                
                                if(element.cartInfo.amount !== prod.productInfo.stock){
                                  element.cartInfo.amount += 1;
                                } else{
                                  return toast.error(t('existencia-de-producto-en-tienda-excedida'));
                                }
                                setCart(temp);
                              }
                            }}
                          >
                            <PlusIcon size="xs" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            variant="bordered"
                            className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
                            onClick={() => {
                              const temp = cart.slice();
                              const element = temp.find(
                                (i) => i.productInfo.id == prod.productInfo.id
                              );
                              if (element) {
                                temp.splice(temp.indexOf(element), 1);
                                setCart(temp);
                              }
                            }}
                          >
                            <TrashIcon size="xs" />
                          </Button>
                        </div>
                      </li>
                      {index != cart.indexOf(cart.slice(-1)[0]) && (
                        <Divider orientation="horizontal" className="my-3" />
                      )}
                    </>
                  ))}
                </ol>
              </div>
            )}
            {cart != null &&  cart.length > 0 && (
              <div className="">
                <Divider orientation="horizontal" className="my-3" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>{t("subtotal")}</p>
                    <p>${getCartSubtotal(cart)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>{t("envio")}</p>
                    <p>{t("no-disponible")}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>{t("impuestos")}</p>
                    <p>{t("no-disponible")}</p>
                  </div>
                </div>
                <Divider orientation="horizontal" className="my-3" />
                <div className="flex flex-col gap-2">
                  {/* <div className="flex justify-between">
                    <div>ddd</div>
                    <div>ddd</div>
                  </div> */}
                  <Button
                    size="sm"
                    radius="sm"
                    variant="bordered"
                    className="border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100"
                  >
                    {t("ir-a-pago")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
