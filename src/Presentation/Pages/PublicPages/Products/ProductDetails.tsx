import { useNavigate, useParams } from "react-router-dom";
import { cartProducts, productInfo } from "../../../Utils/types.utils";
import { useContext, useState } from "react";
import { ProductsCollection } from "../../../Utils/DataCollection/Products.datacollection.utils";
import {
  Button,
  Chip,
  Divider,
  Input,
  Link,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { PublicRoutes } from "../../../Utils/routermanager.routes.utils";
import {
  ArrowRightIcon,
  HeartFilledIcon,
  InfoIcon,
  ListIcon,
  MinusIcon,
  PlusIcon,
  StarFilledIcon,
} from "../../../Assets/Icons/IconsCollection";
import {
  ImagesSlider,
  renderProductPrice,
  renderProductRating,
  renderUnitsInStock,
} from "../../../Components/Common/CommonComponents";
import { toast } from "sonner";
import { CartContext } from "../../../Context/CartContext";

type IProductDetailsProps = {};

const ProductDetails: React.FunctionComponent<IProductDetailsProps> = ({}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCart } = useContext(CartContext);

  const [product, setProduct] = useState<productInfo>(
    ProductsCollection.find((prod) => prod.id == id) as productInfo
  );

  const [productAmount, setProductAmount] = useState<number>(1);

  const pagesResume = [
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

  const [productTabs, setProductTabs] = useState([
    {
      key: "tab0",
      label: "detalles",
      icon: <InfoIcon size="base" />,
      content: () => (
        <div className="w-[95%] mx-auto flex flex-col gap-10 tablet:w-[90%]">
          <div className="flex flex-col gap-3">
            <h1 className=" text-xl font-semibold">{t("descripcion")}</h1>
            <p className=" text-default-500">{product.description}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className=" text-xl font-semibold">{t("caracteristicas")}</h1>
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
      icon: <StarFilledIcon size="base" />,
      content: () => <div className="px-10">dd</div>,
    },
  ]);

  const RenderPageResumer = (pagesResume: any[]) =>
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
        <Link
          key={pr.key}
          href={pr.route}
          onClick={(e) => {
            e.preventDefault();
            navigate(pr.route);
          }}
          className=""
        >
          <Chip
            endContent={<ArrowRightIcon size="xs" />}
            variant="light"
            className="text-default-500 text-base p-0 flex items-center gap-3"
          >
            <p className="pb-1 underline underline-offset-2">{t(pr.text)}</p>
          </Chip>
        </Link>
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

      <div className="flex flex-col items-center gap-5 tablet:gap-14 py-10 tablet:flex-row tablet:items-start">
        {/* product images slider */}
        <ImagesSlider images={[product.img]} />
        {/* product basic data */}
        <div className="w-full tablet:[50%] flex flex-col h-full justify-between gap-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-semibold line-clamp-3 tablet:text-3xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-1">
                {renderProductRating(product.rating, "lg")}
              </div>
              <div className="flex gap-[2px]">
                {renderProductPrice(product.cost)}
              </div>
            </div>
            <div className="flex flex-col justify-start hidden">
              <Button
                isIconOnly
                size="md"
                startContent={
                  <HeartFilledIcon color="text-gray-100" size="xl" />
                }
                className="bg-transparent"
              />
              <Button
                isIconOnly
                size="md"
                startContent={<ListIcon size="xl" />}
                className="bg-transparent"
              />
            </div>
          </div>
          <Divider orientation="horizontal" className="" />

          <div className="flex flex-col hidden">
            <div>ddd</div>
            <Divider orientation="horizontal" className="" />
          </div>
          <div className="flex flex-col gap-5">
            {renderUnitsInStock(product.stock, t)}
            <div className="flex gap-5 flex-col  tablet:flex-row">
              <div className="flex justify-center tablet:justify-start gap-2 ">
                <Button
                  isIconOnly
                  size="md"
                  radius="sm"
                  variant="bordered"
                  className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
                  disabled={product.stock <= 0}
                  onClick={() => {
                    setProductAmount(
                      productAmount <= 1 ? 1 : productAmount - 1
                    );
                  }}
                >
                  <MinusIcon size="sm" />
                </Button>

                <Input
                  classNames={{
                    base: "w-full tablet:w-[6em]",
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
                        t("existencia-de-producto-en-tienda-excedida")
                      );
                    }
                  }}
                  value={String(productAmount)}
                />

                <Button
                  isIconOnly
                  size="md"
                  radius="sm"
                  variant="bordered"
                  disabled={product.stock <= 0}
                  className="border border-gray-800 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-800 dark:bg-gray-800"
                  onClick={() => {
                    setProductAmount(
                      productAmount < product.stock
                        ? productAmount + 1
                        : productAmount
                    );
                    if (productAmount == product.stock) {
                      toast.error(
                        t("existencia-de-producto-en-tienda-excedida")
                      );
                    }
                  }}
                >
                  <PlusIcon size="sm" />
                </Button>
              </div>
              <Button
                size="md"
                radius="sm"
                variant="bordered"
                className={`border border-none text-gray-100 bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300 dark:text-gray-800 dark:bg-gray-100 ${
                  product.stock <= 0
                    ? "!bg-gray-900/80 dark:!bg-gray-100/80"
                    : ""
                }`}
                disabled={product.stock <= 0}
                onClick={(e) => {
                  e.preventDefault();

                  if (product.stock <= 0) {
                    return toast.error(
                      t("existencia-de-producto-en-tienda-agotada")
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
                    t("producto-agredado-a-carrito", {
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  );
                }}
              >
                {t("agregar-al-carrito")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Divider orientation="horizontal" className="tablet:" />
        <Tabs fullWidth variant={"underlined"} aria-label="Tabs variants">
          {productTabs.map((tab) => (
            <Tab
              key={tab.key}
              title={
                <div className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{t(tab.label)}</span>
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
