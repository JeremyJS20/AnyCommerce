import { Divider, Input } from "@nextui-org/react";
import {
  forwardRef,
  useContext,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { cartProducts } from "../Utils/types.utils";
import { CartContext } from "../Context/CartContext";
import Btn from "./Common/Inputs/Button";
import { Icon } from "../Assets/Icons/IconsCollection";

const Cart = forwardRef(({}, ref) => {
  const { t } = useTranslation();
  const { cart, setCart } = useContext(CartContext);

  const [collapseCart, setCollapseCart] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setCollapseCart: setCollapseCart,
  }));

  const screenWidth = window.innerWidth;

  useEffect(() => {
    if (collapseCart) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [collapseCart]);

  const getCartSubtotal = (cart: cartProducts[]) => {
    return `${
      String(
        cart.reduce(
          (a: any, b) => a + b.productInfo.cost * b.cartInfo.amount,
          0
        )
      ).split(".")[0]
    }.${
      !String(
        cart.reduce(
          (a: any, b) => a + b.productInfo.cost * b.cartInfo.amount,
          0
        )
      ).split(".")[1]
        ? "00"
        : String(
            cart.reduce(
              (a: any, b) => a + b.productInfo.cost * b.cartInfo.amount,
              0
            )
          )
            .split(".")[1]
            .substring(0, 2)
    }`;
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
              <span
                className={`${
                  cart == null ? "hidden" : cart.length <= 0 ? "hidden" : ""
                }`}
              >
                {`(${
                  cart != null
                    ? cart.reduce((a, b) => a + b.cartInfo.amount, 0)
                    : 0
                })`}
              </span>
            </p>

            <Btn
              icon={<Icon icon="x"  size="xs" />}
              text="editar"
              //aditionalClassnames={pf != "mainAddress" ? "hidden" : ""}
              onPress={() => setCollapseCart(false)}
              type="onlyIcon"
            />
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
                  {cart != null &&
                    cart.map((prod, index) => (
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
                            <Btn
                              icon={<Icon icon="minus"  size="xs" />}
                              //aditionalClassnames={pf != "mainAddress" ? "hidden" : ""}
                              onPress={() => {
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
                              type="tertiary"
                            />
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
                                    if (
                                      Number(value) < prod2.productInfo.stock
                                    ) {
                                      prod2.cartInfo.amount = Number(value);
                                    } else {
                                      return toast.error(
                                        t(
                                          "existencia-de-producto-en-tienda-excedida"
                                        )
                                      );
                                    }
                                  }
                                  setCart(temp);
                                }
                              }}
                              value={String(prod.cartInfo.amount)}
                            />
                            <Btn
                              icon={<Icon icon="plus"  size="xs" />}
                              //aditionalClassnames={pf != "mainAddress" ? "hidden" : ""}
                              onPress={() => {
                                const temp = cart.slice();
                                const element = temp.find(
                                  (i) => i.productInfo.id == prod.productInfo.id
                                );
                                if (element) {
                                  if (
                                    element.cartInfo.amount !==
                                    prod.productInfo.stock
                                  ) {
                                    element.cartInfo.amount += 1;
                                  } else {
                                    return toast.error(
                                      t(
                                        "existencia-de-producto-en-tienda-excedida"
                                      )
                                    );
                                  }
                                  setCart(temp);
                                }
                              }}
                              type="tertiary"
                            />
                            <Btn
                              icon={<Icon icon="trash"  size="xs" />}
                              //aditionalClassnames={pf != "mainAddress" ? "hidden" : ""}
                              onPress={() => {
                                const temp = cart.slice();
                                const element = temp.find(
                                  (i) => i.productInfo.id == prod.productInfo.id
                                );
                                if (element) {
                                  temp.splice(temp.indexOf(element), 1);
                                  setCart(temp);
                                }
                              }}
                              type="tertiary"
                            />
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
            {cart != null && cart.length > 0 && (
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
                  <Btn
                    text="ir-a-pago"
                    onPress={() => {}}
                    type="primary"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Cart;