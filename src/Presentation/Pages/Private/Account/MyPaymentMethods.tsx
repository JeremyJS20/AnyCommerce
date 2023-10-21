import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import {
  inputs,
  methodTypeCardInfo,
  methodTypeServiceInfo,
  modalHandleProps,
  paymentMethodInfo,
  transactionsInfo,
} from "../../../Utils/types.utils";
import { paymentMethodsCollection } from "../../../Utils/DataCollection/PaymentMethods.datacollection";
import { imgCollectionType, imgs } from "../../../Assets/Img/ImgCollection";
import DropDw, {
  dropDownItemType,
} from "../../../Components/Common/Inputs/Dropdown";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import Btn from "../../../Components/Common/Inputs/Button";
import MultipleFormInputs from "../../../Components/Common/Inputs/MultipleInputForm";
import ConfirmationModal from "../../../Components/Common/Modals/Confirmation.modal.component";
import FormModal from "../../../Components/Common/Modals/Form.modal.components.common";
import { PrivateRoutes } from "../../../Utils/routermanager.routes.utils";
import { useParams } from "react-router-dom";
import cardIssuers from "../../../Utils/DataCollection/cardsIIN.json";
import { paymentMethodValidatorSchema } from "../../../../Validation/Validators/paymentMethod.validator";
import ViewModal from "../../../Components/Common/Modals/View.modal.components.common";
import { TransactionsCollection } from "../../../Utils/DataCollection/Transactions.datacollection";
import { LanguageContext } from "../../../Context/LanguageContext";
import { renderProductPrice } from "../../../Components/Common/CommonComponents";
import {
  useNavigator,
  useQuery,
  useTranslator,
} from "../../../Hooks/Common/useCommon";
import { Link2 } from "../../../Components/Common/Inputs/Link";

type IMyPaymentMethodsProps = {};

// this function is for find the card user when an user input a card number
const findCardIssuer = (cardNumber: string) => {
  const sanitizedCardNumber = cardNumber.replace(/\s/g, ""); // remove white spaces

  const cardIssuer = cardIssuers.find((issuer) => {
    //issuer object have values that contains ranges in string like "52-50"
    return issuer.values.some((range) => {
      const [range0, range1] = range.split("-"); // split the ranges
      const cardDigits = sanitizedCardNumber.substring(0, range0.length); // limit input digits to the first range length

      if (range1) {
        //if exists the second range
        if (range0.length <= 4 && range1.length <= 4) {
          // verify the length, just note the first four digits
          return (
            parseInt(cardDigits) >= parseInt(range0) &&
            parseInt(cardDigits) <= parseInt(range1)
          );
        } else {
          return cardDigits.startsWith(range0[0]);
        }
      } else {
        //return depending the length of input card digits
        return (
          cardDigits.length === range0.length && cardDigits.startsWith(range0)
        );
      }
    });
  });

  return cardIssuer ? cardIssuer.key : "unknowncard";
};

const MyPaymentMethods: FunctionComponent<IMyPaymentMethodsProps> = ({}) => {
  const navigator = useNavigator();
  const { id, childPage } = useParams();
  const { locale } = useContext(LanguageContext);
  const query = useQuery();

  const translator = useTranslator();

  const [paymentMethods] = useState<paymentMethodInfo[]>(
    paymentMethodsCollection
  );
  const [transactions] = useState<transactionsInfo[]>(TransactionsCollection);

  const listDropDwItems = (id: string): dropDownItemType[] => {
    return [
      {
        key: "transacciones",
        text: "transacciones",
        icon: <Icon icon="moneyTransaction" size="xs" />,
        type: "normal",
        onPress: () => {
          navigator({ route: `${location.pathname}/${id}?action=view` });
        },
      },
      {
        key: "eliminar",
        text: "eliminar",
        icon: <Icon icon="trash" size="xs" />,
        type: "danger",
        onPress: () => {
          confirmModalRef.current?.setModalProps({
            title: `eliminar-metodo`,
            actionTitle: "eliminar",
            msg: "eliminar-metodo-confirmacion",
            visible: true,
            confirmBtnColor: "!bg-red-600/60 !text-gray-100",
            itemId: id,
          });
        },
      },
    ];
  };

  const [inputsEndContent, setInputsEndContent] = useState({
    cardNumber: () => (
      <img
        className="w-[2.5em] h-auto  p-1 rounded-xl bg-gray-200"
        src={imgs["unknowncard"]}
      />
    ),
  });

  const inputs: inputs[] = useMemo(
    () => [
      {
        key: "cardName",
        text: "nombre-del-titulante",
        isRequired: true,
        type: "text",
        placeholder: "escribe-nombre-titulante",
      },
      {
        key: "cardNumber",
        text: "numero-de-la-tarjeta",
        isRequired: true,
        type: "text",
        placeholder: "escribe-numero-tarjeta",
        onValueChange: (props) => {
          const { key, value, state, setState } = props;

          if (value.length > 19) return;

          let formattedValue = value;
          let whiteSpaces = [4, 9, 14];

          if (
            whiteSpaces.includes(formattedValue.length) &&
            !String(state[key]).endsWith(" ")
          )
            formattedValue = `${formattedValue} `;

          const cardIssuer = findCardIssuer(formattedValue);

          setInputsEndContent({
            cardNumber: () => (
              <img
                className="w-[2.5em] h-auto  p-1 rounded-xl bg-gray-200"
                src={imgs[cardIssuer as imgCollectionType]}
              />
            ),
          });

          setState({
            ...state,
            [key]: formattedValue,
          });
        },
        endContent: inputsEndContent["cardNumber"](),
      },
      {
        key: "expirationDate",
        text: "fecha-de-expiracion",
        isRequired: true,
        type: "text",
        placeholder: "MM/YY",
        width: "40",
        onValueChange: (props) => {
          const { key, value, state, setState } = props;

          if (value.length > 5) return;

          let formattedValue = value.replace(/[a-zA-Z]/g, "");

          if (formattedValue.length == 2 && !state[key].includes("/"))
            formattedValue = `${formattedValue}/`;

          setState({
            ...state,
            [key]: formattedValue,
          });
        },
      },
      {
        key: "securityCode",
        text: "codigo-de-seguridad",
        isRequired: true,
        type: "password",
        placeholder: "CCV",
        onValueChange: (props) => {
          const { key, value, state, setState } = props;

          if (value.length > 4) return;

          let formattedValue = value.replace(/[a-zA-Z]/g, "");

          setState({
            ...state,
            [key]: formattedValue,
          });
        },
        width: "40",
      },
      {
        key: "default",
        type: "check",
        text: "defecto",
        value: false,
      },
    ],
    [location, inputsEndContent]
  );

  const renderHistory = useCallback(
    (idMethod?: string): JSX.Element => {
      let trs = transactions.slice();

      if (idMethod) trs = transactions.filter((tr) => tr.idMethod == idMethod);

      if (!transactions) return <></>;

      if (trs.length <= 0)
        return (
          <div className="flex flex-col justify-center items-center w-full h-[20em]">
            <Icon icon="moneyTransaction" size="4xl" />
            <h1 className="font-semibold text-lg text-default-500">
              {translator({ text: "no-se-encontraron-transacciones" })}
            </h1>
          </div>
        );

      const getPaymentMethodProperties = (
        tr: transactionsInfo,
        key: "company" | "name" | "ending" | "expirationDate"
      ) => {
        const pm = paymentMethods.find((pm) => pm.id == tr.idMethod)
          ?.methodInfo as methodTypeCardInfo;

        return pm[key];
      };

      return (
        <div className="flex flex-wrap gap-3">
          {trs.map((tr) => (
            <Card
              key={tr.id}
              isBlurred={false}
              className="border w-full rounded-lg border-gray-300 dark:border-gray-700 bg-transparent "
              shadow="none"
            >
              <CardBody className="p-0 rounded-lg border-none border-gray-300 dark:border-gray-700 ">
                <Link2
                  additionalClassName="!h-full"
                  text={
                    <div className="h-full w-full flex justify-between items-center gap-4 border-none text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex flex-col gap-2">
                        <h1 className=" font-semibold text-sm laptop:text-base">
                          {`${getPaymentMethodProperties(
                            tr,
                            "company"
                          )} ${translator({
                            text: "terminada-en",
                          }).toLowerCase()} ${getPaymentMethodProperties(
                            tr,
                            "ending"
                          )}`}
                        </h1>
                        <div className="flex flex-col text-default-500 text-base">
                          <p className="">{`${translator({
                            text: "id-pedido",
                          })} #${tr.idOrder}`}</p>
                          {new Date(
                            getPaymentMethodProperties(
                              tr,
                              "expirationDate"
                            ) as Date
                          ).toLocaleDateString(locale, {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                      <div className="flex !text-xl">
                        -{renderProductPrice(tr.cost)}
                      </div>
                    </div>
                  }
                />
              </CardBody>
            </Card>
          ))}
        </div>
      );
    },
    [id]
  );

  const formModalRef = useRef<modalHandleProps>();
  const confirmModalRef = useRef<modalHandleProps>();
  const viewModalRef = useRef<modalHandleProps>();

  const resetValues = () => {
    navigator({ route: `${PrivateRoutes.ACCOUNT}/${childPage}` });
  };

  useEffect(() => {
    const action = query.get("action");

    if (id) {
      //const tr: transactionsInfo = transactions.find((tr) => tr.id == id) as transactionsInfo;

      if (action == "edit") {
        formModalRef.current?.setModalProps({
          title: `editar-lista`,
          actionTitle: "editar",
          visible: true,
        });
      } else {
        viewModalRef.current?.setModalProps({
          title: `historial`,
          actionTitle: "",
          visible: true,
        });
      }
    }
  }, [id]);

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-end gap-3 w-full flex-wrap">
          <Btn
            icon={
              <Icon
                icon="circleArrow"
                size="md"
                color="text-gray-900 dark:text-gray-100"
              />
            }
            size="md"
            text="historial"
            onPress={() => {
              viewModalRef.current?.setModalProps({
                title: `historial`,
                size: "xl",
                actionTitle: "",
                visible: true,
              });
            }}
            type="secondary"
          />
          <Btn
            icon={
              <Icon
                icon="plus"
                size="base"
                color="text-gray-900 dark:text-gray-100"
              />
            }
            size="md"
            text="agregar-metodo"
            onPress={() => {
              formModalRef.current?.setModalProps({
                type: "form",
                title: `agregar-metodo`,
                actionTitle: "agregar",
                visible: true,
              });
              navigator({ route: `${location.pathname}/new` });
            }}
            type="secondary"
          />
        </div>
        <Divider orientation="horizontal" />
      </div>
      <div className="flex flex-col gap-5 justify-between flex-wrap laptop:flex-row">
        {paymentMethods.map((pm) => (
          <Link2
            key={pm.id}
            //href={`${location.pathname}/${list.id}`}
            additionalClassName="w-full laptop:w-[49%] border  border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit"
            action={() => {
              //navigate(`${location.pathname}/${list.id}`);
            }}
            text={
              pm.type == "card" ? (
                <div className="flex items-center justify-between gap-5 w-full">
                  <div className="flex gap-5 items-center justify-between w-full">
                    <div className="flex gap-5 items-center">
                      <img
                        src={
                          (pm.methodInfo as methodTypeCardInfo).company ==
                          "Visa"
                            ? imgs["visa"]
                            : imgs["mastercard"]
                        }
                        alt={(pm.methodInfo as methodTypeCardInfo).company}
                        className="w-[3.5em] h-auto laptop:w-[5em] border border-gray-300 p-3 rounded-xl dark:border-gray-700"
                      />
                      <div className="flex flex-col gap-1">
                        <h1 className=" font-semibold text-sm laptop:text-base">
                          {`${
                            (pm.methodInfo as methodTypeCardInfo).company
                          } ${translator({
                            text: "terminada-en",
                          }).toLowerCase()} ${
                            (pm.methodInfo as methodTypeCardInfo).ending
                          }`}
                        </h1>
                        <p className=" text-default-500 text-sm laptop:text-base">
                          {`${translator({ text: "fecha-de-expiracion" })} ${(
                            pm.methodInfo as methodTypeCardInfo
                          ).dates.expiration.toLocaleDateString(undefined, {
                            year: "2-digit",
                            month: "2-digit",
                          })}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end w-[40%]">
                    {pm.default ? (
                      <Chip
                        size="sm"
                        className="bg-gray-200 dark:bg-gray-800 !rounded-xl text-xs hidden tablet:flex"
                      >
                        {" "}
                        {translator({ text: "defecto" })}
                      </Chip>
                    ) : (
                      <Button
                        variant="flat"
                        size="sm"
                        color="success"
                        className="bg-transparent"
                      >
                        {translator({ text: "establecer-defecto" })}
                      </Button>
                    )}
                    <DropDw
                      btnStartIcon={
                        <Icon
                          icon="verticalDots"
                          size="lg"
                          color="text-gray-900 dark:text-gray-100"
                        />
                      }
                      items={listDropDwItems(pm.id)}
                      placement="bottom-end"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-5 w-full">
                  <div className="flex gap-5 items-center justify-between w-full">
                    <div className="flex gap-5 items-center">
                      <img
                        src={
                          (pm.methodInfo as methodTypeServiceInfo).name ==
                          "PayPal"
                            ? imgs["paypal"]
                            : undefined
                        }
                        alt={(pm.methodInfo as methodTypeServiceInfo).name}
                        className="w-[3.5em] h-auto laptop:w-[5em] border border-gray-300 p-3 rounded-xl dark:border-gray-700"
                      />
                      <div className="flex flex-col gap-1">
                        <h1 className=" font-semibold text-sm laptop:text-base">
                          {`${(pm.methodInfo as methodTypeServiceInfo).name}`}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end w-[40%]">
                    {pm.default ? (
                      <Chip
                        size="sm"
                        className="bg-gray-200 dark:bg-gray-800 !rounded-xl text-xs hidden tablet:flex"
                      >
                        {" "}
                        {translator({ text: "defecto" })}
                      </Chip>
                    ) : (
                      <Button
                        variant="flat"
                        size="sm"
                        color="success"
                        className="bg-transparent"
                      >
                        {translator({ text: "establecer-defecto" })}
                      </Button>
                    )}
                    <DropDw
                      btnStartIcon={
                        <Icon
                          icon="verticalDots"
                          size="lg"
                          color="text-gray-900 dark:text-gray-100"
                        />
                      }
                      items={listDropDwItems(pm.id)}
                      placement="bottom-end"
                    />
                  </div>
                </div>
              )
            }
          />
        ))}

        <Link2
          additionalClassName={`w-full laptop:w-[49%] border-2 border-dashed cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit ${
            paymentMethods.length <= 0 ? "hidden" : ""
          }`}
          action={() => {
            formModalRef.current?.setModalProps({
              type: "form",
              title: `agregar-metodo`,
              actionTitle: "agregar",
              visible: true,
            });
            navigator({ route: `${location.pathname}/new` });
          }}
          text={
            <div className="flex h-[3.5em] items-center gap-2 text-sm laptop:text-base">
              <Icon icon="plus" size="sm" color="text-default-500" />
              <h1 className=" font-semibold text-default-500">
                {`${translator({ text: "agregar" })} ${translator({
                  text: "metodo",
                }).toLowerCase()}`}
              </h1>
            </div>
          }
        />
      </div>

      <FormModal
        ref={formModalRef}
        resetParentValues={resetValues}
        validator={paymentMethodValidatorSchema}
        inputs={inputs}
      >
        <MultipleFormInputs inputs={inputs} />
      </FormModal>
      <ViewModal ref={viewModalRef} resetParentValues={resetValues}>
        {renderHistory(id)}
        <></>
      </ViewModal>
      <ConfirmationModal
        ref={confirmModalRef}
        onConfirmBtnClicked={(id: string) => {
          console.log(id);
        }}
      />
    </div>
  );
};

export default MyPaymentMethods;
