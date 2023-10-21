import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";
import {
  inputs,
  listInfo,
  listKeyType,
  modalHandleProps,
} from "../../../Utils/types.utils";
import { listsCollection } from "../../../Utils/DataCollection/Lists.datacollection";
import { useLocation, useParams } from "react-router-dom";
import DropDw, {
  dropDownItemType,
} from "../../../Components/Common/Inputs/Dropdown";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import Btn from "../../../Components/Common/Inputs/Button";
import ConfirmationModal from "../../../Components/Common/Modals/Confirmation.modal.component";
import MultipleFormInputs from "../../../Components/Common/Inputs/MultipleInputForm";
import FormModal from "../../../Components/Common/Modals/Form.modal.components.common";
import {
  PrivateRoutes,
  PublicRoutes,
} from "../../../Utils/routermanager.routes.utils";
import { listValidatorSchema } from "../../../../Validation/Validators/list.validator";
import ViewModal from "../../../Components/Common/Modals/View.modal.components.common";
import {
  useNavigator,
  useQuery,
  useTranslator,
} from "../../../Hooks/Common/useCommon";
import { Link2 } from "../../../Components/Common/Inputs/Link";

type IMyListsProps = {};

const MyLists: FunctionComponent<IMyListsProps> = ({}) => {
  const { id, childPage } = useParams();
  const location = useLocation();
  const query = useQuery();

  const translator = useTranslator();
  const navigator = useNavigator();

  const [lists] = useState<listInfo[]>(listsCollection);

  const listDropDwItems = (id: string): dropDownItemType[] => {
    return [
      {
        key: "ver",
        text: "ver",
        icon: <Icon icon="eye" size="xs" />,
        type: "normal",
        onPress: () => {
          navigator({ route: `${location.pathname}/${id}?action=view` });
        },
      },
      {
        key: "editar",
        text: "editar",
        icon: <Icon icon="edit" size="xs" />,
        type: "normal",
        onPress: () => {
          navigator({ route: `${location.pathname}/${id}?action=edit` });
        },
      },
      {
        key: "eliminar",
        text: "eliminar",
        icon: <Icon icon="trash" size="xs" />,
        type: "danger",
        onPress: () => {
          confirmModalRef.current?.setModalProps({
            title: `eliminar-lista`,
            actionTitle: "eliminar",
            msg: "eliminar-lista-confirmacion",
            visible: true,
            confirmBtnColor: "!bg-red-600/60 !text-gray-100",
            itemId: id,
          });
        },
      },
    ];
  };

  const inputs: inputs[] = useMemo(
    () => [
      {
        key: "name",
        text: "nombre",
        isRequired: true,
        type: "text",
        placeholder: "escribe-nombre-lista",
      },
      {
        key: "visibility",
        text: "visibilidad",
        isRequired: true,
        type: "select",
        placeholder: "seleccionar-visibilidad",
        inputOptions: {
          items: [
            {
              key: "public",
              text: "publico",
              value: "public",
            },
            {
              key: "private",
              text: "privado",
              value: "private",
            },
          ],
        },
      },
      {
        key: "description",
        text: "descripcion",
        isRequired: true,
        type: "textarea",
        placeholder: "escribe-descripcion",
      },
    ],
    [location]
  );

  const resetValues = () => {
    navigator({ route: `${PrivateRoutes.ACCOUNT}/${childPage}` });
  };

  const formModalRef = useRef<modalHandleProps>();
  const confirmModalRef = useRef<modalHandleProps>();
  const viewModalRef = useRef<modalHandleProps>();

  useEffect(() => {
    const action = query.get("action");

    if (id) {
      const list: listInfo = lists.find((list) => list.id == id) as listInfo;

      inputs.forEach((i) => {
        if (i.type == "number") i.value = Number(list[i.key as listKeyType]);
        else i.value = String(list[i.key as listKeyType]);
      });

      if (action == "edit") {
        formModalRef.current?.setModalProps({
          title: `editar-lista`,
          actionTitle: "editar",
          visible: true,
        });
      } else {
        viewModalRef.current?.setModalProps({
          title: `productos`,
          actionTitle: "editar",
          visible: true,
        });
      }
    }
  }, [id]);

  const renderListProducts = (): JSX.Element => {
    const list = lists.find((li) => li.id == id);

    if (!list) return <></>;

    if (list.products.length <= 0)
      return (
        <div className="flex flex-col justify-center items-center w-full h-[10em]">
          <Icon icon="box" size="6xl" />
          <h1 className="font-semibold text-lg text-default-500">
            {translator({ text: "lista-vacia" })}
          </h1>
        </div>
      );

    const listDropDwItems = (id: string): dropDownItemType[] => {
      return [
        {
          key: "eliminar",
          text: "eliminar",
          icon: <Icon icon="trash" size="xs" />,
          type: "danger",
          onPress: () => {
            // confirmModalRef.current?.setModalProps({
            //   title: `eliminar-direccion`,
            //   actionTitle: "eliminar",
            //   msg: "eliminar-direccion-confirmacion",
            //   visible: true,
            //   confirmBtnColor: "!bg-red-600/60 !text-gray-100",
            //   itemId: id,
            // });

            console.log("remove ", id);
          },
        },
      ];
    };

    return (
      <div className="flex flex-wrap gap-3">
        {list.products.map((lp) => (
          <Card
            key={lp.id}
            isBlurred={false}
            className="border w-full rounded-lg border-gray-300 dark:border-gray-700 bg-transparent tablet:w-[48%]"
            shadow="none"
          >
            <CardBody className="p-0 rounded-lg border-none border-gray-300 dark:border-gray-700 ">
              <Link2
                //href={`${PublicRoutes.PRODUCTS}/${prod.id}`}
                action={() => {
                  //  navigate(`${PublicRoutes.PRODUCTS}/${prod.id}`);
                }}
                additionalClassName="!h-full"
                text={
                  <div className="h-full flex flex-col justify-between gap-4 border-none text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex flex-col gap-2">
                      <img
                        src={lp.img}
                        className="w-[100%] h-auto bg-cover bg-center bg-no-repeat "
                      />
                      <div className="flex flex-col gap-4 px-2">
                        <p className=" text-base line-clamp-2">{lp.name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <Btn
                        size="sm"
                        type="primary"
                        text="ir-al-detalle"
                        aditionalClassnames="p-4"
                        onPress={() =>
                          navigator({
                            route: `${PublicRoutes.PRODUCTS}/${lp.id}`,
                          })
                        }
                      />
                    </div>
                  </div>
                }
              />
              <DropDw
                btnStartIcon={
                  <Icon
                    icon="horizontalDots"
                    size="sm"
                    color="text-gray-100 dark:text-gray-900"
                  />
                }
                additionalClassName="absolute right-0 top-0 bg-gray-900 dark:bg-gray-100 rounded-full h-[20px]"
                items={listDropDwItems(lp.id)}
                placement="bottom-end"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex flex-col gap-4 ">
        <div className="flex items-center justify-end gap-5 w-full flex-wrap">
          <Btn
            icon={
              <Icon
                icon="plus"
                size="base"
                color="text-gray-900 dark:text-gray-100"
              />
            }
            size="md"
            text="crear-lista"
            onPress={() => {
              formModalRef.current?.setModalProps({
                type: "form",
                title: `crear-lista`,
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
        {lists.map((list) => (
          <Link2
            key={list.id}
            //href={`${location.pathname}/${list.id}`}
            additionalClassName="w-full laptop:w-[49%] border cursor-default border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit"
            action={() => {
              //navigate(`${location.pathname}/${list.id}`);
            }}
            text={
              <div className="flex gap-1 items-center text-sm laptop:text-base">
                <div className=" flex gap-1 flex-col">
                  <h1 className=" font-semibold">
                    {list.name}{" "}
                    <span className=" text-default-500 ">
                      - {list.visibility}
                    </span>{" "}
                  </h1>
                  <p className=" text-default-500 text-sm line-clamp-2">
                    {list.description}
                  </p>
                </div>

                <DropDw
                  btnStartIcon={
                    <Icon
                      icon="verticalDots"
                      size="lg"
                      color="text-gray-900 dark:text-gray-100"
                    />
                  }
                  items={listDropDwItems(list.id)}
                  placement="bottom-end"
                />
              </div>
            }
          />
        ))}

        <Link2
          //href={`${location.pathname}/new`}
          additionalClassName={`w-full laptop:w-[49%] border-2 border-dashed cursor-pointer border-gray-800 dark:border-gray-700 rounded-xl py-3 px-5 flex items-center justify-between text-inherit ${
            lists.length <= 0 ? "hidden" : ""
          }`}
          action={() => {
            formModalRef.current?.setModalProps({
              type: "form",
              title: `crear-lista`,
              actionTitle: "agregar",
              visible: true,
            });
            navigator({ route: `${location.pathname}/new` });
          }}
          text={
            <div className="flex h-[em] items-center gap-2 text-sm laptop:text-base">
              <Icon icon="plus" size="sm" color="text-default-500" />
              <h1 className=" font-semibold text-default-500">
                {`${translator({ text: "crear" })} ${translator({
                  text: "lista",
                }).toLowerCase()}`}
              </h1>
            </div>
          }
        />
      </div>
      <FormModal
        ref={formModalRef}
        resetParentValues={resetValues}
        validator={listValidatorSchema}
        inputs={inputs}
      >
        <MultipleFormInputs inputs={inputs} />
      </FormModal>
      <ViewModal ref={viewModalRef} resetParentValues={resetValues}>
        {renderListProducts()}
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

export default MyLists;
