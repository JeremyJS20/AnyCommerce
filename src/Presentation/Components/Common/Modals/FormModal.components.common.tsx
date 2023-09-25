import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  PropsWithChildren,
  cloneElement,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { personalInfoSchema } from "../../../../Validation/Validators/personalInfo.validator";
import Btn from "../Inputs/Button";
import { Icon } from "../../../Assets/Icons/IconsCollection";

interface IFormModalProps extends PropsWithChildren<any> {
  validateForm: () => void;
}

export type formModalProps = {
  visible: boolean;
  title: string;
  actionTitle: string;
};

export type formModalHandleProps = {
  setModalProps: (props: formModalProps) => void;
  modalProps: formModalProps;
};

const FormModal = forwardRef(({ ...props }: IFormModalProps, ref) => {
  const { t } = useTranslation();

  const { onOpenChange } = useDisclosure();

  const [modalProps, setModalProps] = useState<formModalProps>({
    visible: false,
    title: "",
    actionTitle: "",
    //data:
  });

  useImperativeHandle(ref, () => ({
    setModalProps: (props: any) => setModalProps({ ...modalProps, ...props }),
    modalProps: modalProps,
  }));

  const [values, setValues] = useState<any>("");
  const [isInvalidInput, setIsInvalidInput] = useState<any>();

  return (
    <Modal
      placement="center"
      isOpen={modalProps.visible}
      onOpenChange={onOpenChange}
      className="bg-gray-200 dark:bg-gray-800 max-h-[70vh] text-gray-900 dark:text-gray-100"
      classNames={{ closeButton: "bg-transparent hover:bg-transparent" }}
      closeButton={
        <Button
          onPress={() => setModalProps({ ...modalProps, visible: false })}
          isIconOnly
          size="sm"
          startContent={<Icon icon="x" size="xs" />}
        />
      }
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {t(modalProps.title)}
          </ModalHeader>
          <ModalBody>
            {cloneElement(props.children, {
              values: values,
              setValues: setValues,
              isInvalidInput: isInvalidInput,
            })}
          </ModalBody>
          <ModalFooter>
            <Btn
              text="descartar"
              size="md"
              onPress={() => {
                setValues("");
                setIsInvalidInput(undefined);
                setModalProps({ ...modalProps, visible: false });
              }}
              type="secondary"
            />

            <Btn
              text={modalProps.actionTitle}
              size="md"
              type="primary"
              onPress={() => {
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
                      const validate = await personalInfoSchema
                        .partial()
                        .safeParse({
                          [k]: `${values[k].prefix}${values[k].value}`,
                        });
                      isInvalid = !validate.success;
                      if (isInvalid)
                        message = (validate as any).error.format()[k]
                          ._errors[0];
                    }
                  } else {
                    const validate = await personalInfoSchema
                      .partial()
                      .safeParse({
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
            />
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
});

export default FormModal;


/**
 * 
 * export const MultipleInputFormModal = forwardRef(({ ...props }: IMultipleInputFormModalProps, ref) => {
  const { t } = useTranslation();

  const { onOpenChange } = useDisclosure();

  const [modalProps, setModalProps] = useState<formModalProps>({
    visible: false,
    title: "",
    actionTitle: "",
    //data:
  });

  useImperativeHandle(ref, () => ({
    setModalProps: (props: any) => setModalProps({ ...modalProps, ...props }),
    modalProps: modalProps,
  }));

  const [values, setValues] = useState<any>("");
  const [isInvalidInput, setIsInvalidInput] = useState<any>();

  return (
    <Modal
      placement="center"
      isOpen={modalProps.visible}
      onOpenChange={onOpenChange}
      className="bg-gray-200 dark:bg-gray-800 max-h-[70vh] text-gray-900 dark:text-gray-100"
      classNames={{ closeButton: "bg-transparent hover:bg-transparent" }}
      closeButton={
        <Button
          onPress={() => setModalProps({ ...modalProps, visible: false })}
          isIconOnly
          size="sm"
          startContent={<Icon icon="x" size="xs" />}
        />
      }
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {t(modalProps.title)}
          </ModalHeader>
          <ModalBody>
            {cloneElement(props.children, {
              values: values,
              setValues: setValues,
              isInvalidInput: isInvalidInput,
            })}
          </ModalBody>
          <ModalFooter>
            <Btn
              text="descartar"
              size="md"
              onPress={() => {
                setValues("");
                setIsInvalidInput(undefined);
                setModalProps({ ...modalProps, visible: false });
              }}
              type="secondary"
            />

            <Btn
              text={modalProps.actionTitle}
              size="md"
              type="primary"
              onPress={() => {
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
                      const validate = await personalInfoSchema
                        .partial()
                        .safeParse({
                          [k]: `${values[k].prefix}${values[k].value}`,
                        });
                      isInvalid = !validate.success;
                      if (isInvalid)
                        message = (validate as any).error.format()[k]
                          ._errors[0];
                    }
                  } else {
                    const validate = await personalInfoSchema
                      .partial()
                      .safeParse({
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
            />
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
});
 */