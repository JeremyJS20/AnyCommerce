import { Button, Divider, Input, Tooltip } from "@nextui-org/react";
import { Dispatch, FunctionComponent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal, {
  formModalHandleProps,
} from "../../../Components/Common/Modals/Form.modal.components.common";
import { DynamicFormInput } from "../../../Components/Common/Inputs/DynamicFormInput.component.common";
import { inputs, profileInfoKeys } from "../../../Utils/types.utils";
import Btn from "../../../Components/Common/Inputs/Button";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import { personalInfoSchema } from "../../../../Validation/Validators/personalInfo.validator";

type IMyProfileProps = {};

const MyProfile: FunctionComponent<IMyProfileProps> = ({}) => {
  const { t } = useTranslation();

  const [profileInfo] = useState<any>({
    personalInfo: {
      name: "Jeremy",
      lastName: "Solano",
      email: {
        value: "jsjeremy4@gmail.com",
        verified: true,
      },
      phone: {
        countryAlpha2: "DO",
        prefix: "+1 829",
        value: "264-4164",
        verified: false,
      },
    },
    security: {
      password: "***************",
    },
    mainAddress: {
      country: "Dominican Republic",
      state: "San Cristóbal",
      city: "Bajos de Haina",
      postalCode: 91000,
      address: "Calle Luís Pérez #219, El Carril",
    },
  });

  const [inputToEdit, setInputToEdit] = useState<inputs>();

  const formModalRef = useRef<formModalHandleProps>();

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex items-center w-full gap-5">
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          className="w-[35%] laptop:w-[10%] tablet:w-[15%] rounded-full"
        />
        <div className="flex flex-col">
          <p className="">{`${profileInfo.personalInfo.name} ${profileInfo.personalInfo.lastName}`}</p>
        </div>
      </div>

      {Object.keys(profileInfo).map((pf) => (
        <div key={pf} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h1 className=" font-semibold text-lg">{t(pf.toLowerCase())}</h1>
              <Btn
                icon={<Icon icon="edit" size="xs" />}
                text="editar"
                aditionalClassnames={pf != "mainAddress" ? "hidden" : "hidden"}
                onPress={() => {
                  formModalRef.current?.setModalProps({
                    title: `edit-${pf.toLowerCase()}`,
                    actionTitle: "editar",
                    visible: true,
                  });
                }}
                type="tertiary"
              />
            </div>
            <Divider orientation="horizontal" />
          </div>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(profileInfo[pf as profileInfoKeys]).map((pfck) => (
              <Input
                key={pfck}
                label={
                  <p className="flex items-center gap-2">
                    <span className="text-gray-900 dark:text-gray-100">
                      {`${t(pfck.toLowerCase())}:`}{" "}
                    </span>
                    {typeof profileInfo[pf as profileInfoKeys][pfck] ==
                      "object" &&
                      (profileInfo[pf as profileInfoKeys][pfck].verified ? (
                        <Tooltip
                          className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900"
                          placement="right"
                          showArrow
                          content={t("verificado")}
                        >
                          <Button
                            isIconOnly
                            size="sm"
                            className="!h-fit !w-fit !min-w-fit text-inherit cursor-default"
                            startContent={
                              <Icon
                                icon="check"
                                size="sm"
                                color=" text-ideal-green"
                              />
                            }
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900"
                          placement="right"
                          showArrow
                          content={t("necesita-verificacion")}
                        >
                          <Button
                            isIconOnly
                            size="sm"
                            className="!h-fit !w-fit !min-w-fit text-inherit"
                            startContent={<Icon icon="question" size="sm" />}
                          />
                        </Tooltip>
                      ))}
                  </p>
                }
                placeholder={
                  pfck == "email"
                    ? String(profileInfo[pf as profileInfoKeys][pfck].value)
                    : pfck == "phone"
                    ? `${String(
                        profileInfo[pf as profileInfoKeys][pfck].prefix
                      )} ${String(
                        profileInfo[pf as profileInfoKeys][pfck].value
                      )}`
                    : String(profileInfo[pf as profileInfoKeys][pfck])
                }
                isReadOnly
                endContent={
                  pf != "mainAddress" ? (
                    <Btn
                      icon={<Icon icon="edit" size="sm" />}
                      text="editar"
                      onPress={() => {
                        formModalRef.current?.setModalProps({
                          title: `edit-${pfck.toLowerCase()}`,
                          actionTitle: "editar",
                          visible: true,
                        });
                        setInputToEdit(pfck as any);
                      }}
                      type="onlyIcon"
                    />
                  ) : (
                    <></>
                  )
                }
                size="md"
                classNames={{
                  base: "!w-full tablet:!w-[47%] ",
                  label:
                    "mb-1 text-base text-default-500 font-bold cursor-text",
                  input: "text-base cursor-default",
                  inputWrapper: "h-full !bg-transparent shadow-none",
                }}
                //labelPlacement="outside"
              />
            ))}
          </div>
        </div>
      ))}

      <FormModal
        ref={formModalRef}
        validatorFunction={(values: any, setIsInvalidInput: Dispatch<any>) => {
          Object.keys(values).forEach(async (k) => {
            let isInvalid: boolean;
            let message = "";

            if (k == "email") {
              const validate = await personalInfoSchema
                .partial()
                .safeParseAsync({
                  [k]: String(values[k].value),
                });

              isInvalid = !validate.success;
              if (isInvalid)
                message = (validate as any).error.format()[k]._errors[0];
            } else if (k == "phone") {
              if (!values[k].prefix || values[k].prefix == "") {
                isInvalid = true;
                if (isInvalid) message = "telefono-no-valido";
              } else {
                const validate = await personalInfoSchema.partial().safeParse({
                  [k]: `${values[k].prefix}${values[k].value}`,
                });
                isInvalid = !validate.success;
                if (isInvalid)
                  message = (validate as any).error.format()[k]._errors[0];
              }
            } else {
              const validate = await personalInfoSchema.partial().safeParse({
                [k]: values[k],
              });

              isInvalid = !validate.success;
              if (isInvalid)
                message = (validate as any).error.format()[k]._errors[0];
            }

            setIsInvalidInput({
              [k]: isInvalid,
              message: message,
            });
          });
        }}
      >
        <DynamicFormInput input={inputToEdit} />
      </FormModal>
    </div>
  );
};

export default MyProfile;
