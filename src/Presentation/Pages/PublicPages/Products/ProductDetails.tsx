import { useParams } from "react-router-dom";
import {
  cartProducts,
  commonTypeRoute,
  productInfo,
} from "../../../Utils/types.utils";
import { useContext, useState } from "react";
import { ProductsCollection } from "../../../Utils/DataCollection/Products.datacollection.utils";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";
import {
  ImagesSlider,
  renderProductPrice,
  renderProductRating,
  renderUnitsInStock,
} from "../../../Components/Common/CommonComponents";
import { toast } from "sonner";
import { CartContext } from "../../../Context/CartContext";
import { LanguageContext } from "../../../Context/LanguageContext";
import Btn from "../../../Components/Common/Inputs/Button";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import { useNavigator, useTranslator } from "../../../Hooks/Common/useCommon";
import { Link2 } from "../../../Components/Common/Inputs/Link";

type IProductDetailsProps = {};

const ProductDetails: React.FunctionComponent<IProductDetailsProps> = ({}) => {
  const translator = useTranslator();
  const navigator = useNavigator();

  const { id } = useParams();
  const { setCart } = useContext(CartContext);
  const { locale } = useContext(LanguageContext);

  const [product] = useState<productInfo>(
    ProductsCollection.find((prod) => prod.id == id) as productInfo
  );

  const [productAmount, setProductAmount] = useState<number>(1);

  const pagesResume: commonTypeRoute[] = [
    {
      key: "pageResume0",
      text: "productos",
      route: PublicRoutes.PRODUCTS,
      current: false,
    },
    {
      key: "pageResume1",
      text: product.category,
      route: `${PublicRoutes.PRODUCTS}?page=1&filters=${JSON.stringify({
        category: product.category,
      })}`,
      current: false,
    },
    {
      key: "pageResume2",
      text: product.name,
      current: true,
    },
  ];

  const [productTabs] = useState([
    {
      key: "tab0",
      label: "detalles",
      icon: <Icon icon="info" size="base" />,
      content: () => (
        <div className="w-[95%] mx-auto flex flex-col gap-10 tablet:w-[90%]">
          <div className="flex flex-col gap-3">
            <h1 className=" text-xl font-semibold">
              {translator({ text: "descripcion" })}
            </h1>
            <p className=" text-default-500">{product.description}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className=" text-xl font-semibold">
              {translator({ text: "caracteristicas" })}
            </h1>
            <div className="flex flex-col">
              {product.details?.characteristics?.map((cha) => (
                <div key={cha.key} className="flex gap-3 text-default-500">
                  <p className=" font-semibold">{cha.text}:</p>
                  <p>{cha.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "tab1",
      label: "calificaciones-y-opiniones",
      icon: <Icon icon="starFilled" size="base" />,
      content: () => (
        <div className="w-[95%] mx-auto flex flex-col gap-14 tablet:w-[90%]">
          {product.reviews && product.reviews.length <= 0 ? (
            <div className="flex flex-col py-24 gap-2 items-center justify-center">
              <Icon icon="starFilled" size="4xl" />
              <p className="text-xl">
                {translator({ text: "no-se-encontraron-reviews" })}
              </p>
            </div>
          ) : (
            product.reviews?.map((r) => (
              <div key={r.key} className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-3 tablet:flex-row tablet:items-center">
                  <Avatar
                    size="lg"
                    src={
                      r.profileImg
                        ? r.profileImg
                        : "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    }
                  />
                  <div className="flex flex-col gap-0">
                    <p className=" font-semibold text-lg">{r.userName}</p>
                    <div className="flex items-start gap-2 text-default-500 flex-col tablet:flex-row tablet:items-center">
                      <div className="flex items-center">
                        {renderProductRating(r.rating, "base", translator)}
                      </div>
                      <p>{`${translator({ text: "calificado-en" })} ${
                        r.from
                      }, ${new Date(r.date).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`}</p>
                    </div>
                  </div>
                </div>
                <p className="text-default-500">"{r.opinion}"</p>
                <Divider
                  orientation="horizontal"
                  className={`${
                    product.reviews?.slice(-1)[0] == r ? "hidden" : ""
                  }`}
                />
              </div>
            ))
          )}
        </div>
      ),
    },
  ]);

  const RenderPageResumer = (pagesResume: commonTypeRoute[]) =>
    pagesResume.map((pr) =>
      pr.current ? (
        <Chip
          key={pr.key}
          variant="light"
          className="text-gray-900 dark:text-gray-100 text-base p-0 flex items-center "
        >
          <p className="pb-[7px]">{pr.text.substring(0, 15)}...</p>
        </Chip>
      ) : (
        <Link2
          key={pr.key}
          action={() => {
            navigator({ route: pr.route, title: "productos" });
          }}
          additionalClassName=""
          text={
            <Chip
              endContent={<Icon icon="arrowRight" size="xs" />}
              variant="light"
              className="text-default-500 text-base p-0 flex items-center gap-3"
            >
              <p className="pb-1 underline underline-offset-2">
                {translator({ text: pr.text })}
              </p>
            </Chip>
          }
        />
      )
    );

  return (
    <div className="w-[95%] px-6 py-10 laptop:w-[80%]">
      <div className="flex flex-col gap-0 ">
        <div className="flex items-center justify-center tablet:justify-start gap-2">
          {RenderPageResumer(pagesResume)}
        </div>
        {/* <Divider orientation="horizontal" className="" /> */}
      </div>

      <div className="flex flex-col items-center h-fit gap-5 tablet:gap-8 py-10 laptop:flex-row tablet:items-start">
        {/* product images slider */}
        <ImagesSlider images={[product.img]} />
        {/* product basic data */}
        <div className="w-full tablet:[50%] flex flex-col h-full justify-between py-5 gap-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font- line-clamp-3">{product.name}</h1>
              <div className="flex items-center gap- text-default-500">
                {renderProductRating(product.rating, "base", translator)}
              </div>
            </div>
          </div>
          <Divider orientation="horizontal" className="" />

          {/* <div className="flex flex-col hidden">
            <div>ddd</div>
            <Divider orientation="horizontal" className="" />
          </div> */}
          <div className="flex flex-col gap-5">
            <div className="text-base">
              {renderUnitsInStock(product.stock, translator)}
            </div>
            <div
              className={`flex gap-5 flex-col items-center justify-between  tablet:flex-row ${
                product.stock <= 0 ? "hidden" : ""
              }`}
            >
              <div className="flex flex-col gap-5 w-full">
                <Divider orientation="horizontal" className="" />
                <div className="flex justify-between">
                  <div className="flex flex-row justify-center tablet:justify-start gap-2 ">
                    <div className="flex gap-[2px] text-3xl">
                      {renderProductPrice(product.cost)}
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap tablet:flex-row items-center justify-end gap-2">
                    <Input
                      classNames={{
                        base: "w-[3.5em]",
                        mainWrapper: "",
                        input: "text-sm",
                        inputWrapper:
                          "border border-gray-700 !bg-transparent text-default-500 dark:border-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-700 dark:!bg-gray-800",
                      }}
                      size="md"
                      type="number"
                      disabled={product.stock <= 0}
                      onValueChange={(value) => {
                        setProductAmount(
                          Number(value) <= 1
                            ? 1
                            : Number(value) < product.stock
                            ? Number(value)
                            : product.stock
                        );
                        if (productAmount == product.stock) {
                          toast.error(
                            translator({
                              text: "existencia-de-producto-en-tienda-excedida",
                            })
                          );
                        }
                      }}
                      value={String(productAmount)}
                    />
                    <Btn
                      size="md"
                      type="quaternary"
                      text="agregar-al-carrito"
                      aditionalClassnames="text-gray-100 "
                      onPress={
                        () => {
                          //e.preventDefault();

                          if (product.stock <= 0) {
                            return toast.error(
                              translator({
                                text: "existencia-de-producto-en-tienda-agotada",
                              })
                            );
                          }

                          const cartExists = JSON.parse(
                            String(localStorage.getItem("cart"))
                          ) as cartProducts[] | null;

                          if (cartExists != null) {
                            const prodInCart = cartExists.find(
                              (ce) => ce.productInfo.id == product.id
                            );

                            if (prodInCart != null || prodInCart != undefined) {
                              prodInCart.cartInfo.amount = productAmount;
                            } else {
                              const cartProduct: cartProducts = {
                                productInfo: product,
                                cartInfo: {
                                  amount: productAmount,
                                },
                              };
                              cartExists.push(cartProduct);
                            }
                            setCart(cartExists);
                          } else {
                            const cartProducts: cartProducts[] = [
                              {
                                productInfo: product,
                                cartInfo: {
                                  amount: productAmount,
                                },
                              },
                            ];
                            setCart(cartProducts);
                          }

                          toast.success(
                            translator({ text: "producto-agredado-a-carrito" }),
                            {
                              action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                              },
                            }
                          );
                        }
                        // props.cartRef.current?.setCollapseCart(true)
                      }
                    />
                    <Btn
                      size="md"
                      type="primary"
                      text="comprar-ahora"
                      onPress={() => {}}
                    />
                    <Btn
                      icon={
                        <Icon
                          icon="heartFilled"
                          size="xl"
                          color="text-default-500"
                        />
                      }
                      size="md"
                      type="onlyIcon"
                      aditionalClassnames="rounded-full bg-gray-200 dark:bg-gray-800 "
                      onPress={
                        () => {}
                        // props.cartRef.current?.setCollapseCart(true)
                      }
                    />
                    <Btn
                      icon={
                        <Icon icon="list" size="xl" color="text-default-500" />
                      }
                      size="md"
                      type="onlyIcon"
                      aditionalClassnames="rounded-full bg-gray-200 dark:bg-gray-800 "
                      onPress={
                        () => {}
                        // props.cartRef.current?.setCollapseCart(true)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex ${product.stock > 0 ? "hidden" : ""}`}>
              <div className="flex flex-col text-default-500 gap-4">
                {product.dates.restock ? (
                  <p className=" text-default-500">
                    {translator({ text: "posible-existencia-mensaje" })}
                    {": "}
                    {`${new Date(
                      String(product.dates.restock)
                    ).toLocaleDateString(locale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}`}
                  </p>
                ) : (
                  <p>{translator({ text: "sin-existencia-mensaje" })}:</p>
                )}

                <div className="flex items-center flex-col gap-2 tablet:flex-row">
                  <Btn
                    icon={
                      <Icon
                        icon="bell"
                        size="lg"
                        color="text-gray-100 dark:text-gray-900"
                      />
                    }
                    size="md"
                    aditionalClassnames="w-full tablet:w-fit"
                    text="agregar-recordatorio"
                    type="primary"
                  />
                  <p>{translator({ text: "o" }).toLowerCase()}</p>

                  <Dropdown
                    classNames={{ base: "!max-w-[13em] " }}
                    className="bg-gray-200 dark:bg-gray-700"
                  >
                    <DropdownTrigger>
                      <Button
                        startContent={
                          <Icon
                            icon="list"
                            size="lg"
                            color="text-gray-100 dark:text-gray-900"
                          />
                        }
                        endContent={
                          <Icon
                            icon="arrowDown"
                            size="xs"
                            color="text-gray-100 dark:text-gray-900"
                          />
                        }
                        size="md"
                        className="border border-none text-gray-100 bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100 w-full tablet:w-fit"
                      >
                        {translator({ text: "agregar-a-lista" })}
                      </Button>
                    </DropdownTrigger>

                    <DropdownMenu className="!max-w-[13em]" aria-label="ddd">
                      <DropdownSection showDivider>
                        <DropdownItem className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100">
                          <div className="flex gap-2">
                            <div className="flex flex-col">
                              <span className="">List1</span>
                              <span className=" text-default-500">private</span>
                            </div>
                          </div>
                        </DropdownItem>
                      </DropdownSection>
                      <DropdownItem
                        startContent={<Icon icon="plus" size="sm" />}
                        className="text-gray-800 hover:!bg-gray-300 dark:hover:!bg-gray-600 dark:text-gray-100"
                      >
                        {translator({ text: "crear-lista" })}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* products tabs details */}
      <div className="flex flex-col gap-5">
        <Divider orientation="horizontal" className="tablet:" />
        <Tabs fullWidth variant={"underlined"} aria-label="Tabs variants">
          {productTabs.map((tab) => (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{translator({ text: tab.label })}</span>
                </div>
              }
              className="text-base pb-5"
            >
              {tab.content()}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
