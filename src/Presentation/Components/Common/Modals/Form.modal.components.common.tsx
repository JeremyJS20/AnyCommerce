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
  Dispatch,
  PropsWithChildren,
  cloneElement,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import Btn from "../Inputs/Button";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import { ZodObject } from "zod";
import { ModalProps } from "../../../Utils/types.utils";

interface IFormModalProps extends PropsWithChildren<any> {
  validatorFunction?: (values: any, setIsInvalidInput: Dispatch<any>) => void;
  validator?: ZodObject<any>;
  inputs?: any[];
  resetParentValues?: () => void;
}


const FormModal = forwardRef(({ ...props }: IFormModalProps, ref) => {
  const { validator, validatorFunction, inputs, resetParentValues } = props;

  const { t } = useTranslation();

  const { onOpenChange } = useDisclosure();

  const [modalProps, setModalProps] = useState<ModalProps>({
    type: 'form',
    visible: false,
    title: "",
    actionTitle: "",
    size: "md",
    //data:
  });

  useImperativeHandle(ref, () => ({
    setModalProps: (props: ModalProps) => setModalProps({ ...modalProps, ...props }),
    modalProps: modalProps,
  }));

  const [formValues, setFormValues] = useState<unknown>({});
  const [invalidInputs, setInvalidInputs] = useState<unknown[]>([]);

  const onModalClose = () => {
    setFormValues({});
    setInvalidInputs([]);
    setModalProps({ ...modalProps, visible: false });
    if(resetParentValues) resetParentValues();
  };

  return (
    <Modal
      placement="center"
      size={modalProps.size}
      isOpen={modalProps.visible}
      onOpenChange={onOpenChange}
      className="bg-gray-200 dark:bg-gray-800 max-h-[70vh] text-gray-900 dark:text-gray-100"
      classNames={{
        closeButton: "bg-transparent hover:bg-transparent",
        body: "max-h-[25em] overflow-y-auto",
      }}
      closeButton={
        <Button
          onPress={onModalClose}
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
              formValues: formValues,
              setFormValues: setFormValues,
              invalidInputs: invalidInputs,
            })}
          </ModalBody>
          <ModalFooter>
            <Btn
              text="descartar"
              size="md"
              type="secondary"
              onPress={onModalClose}
            />

            <Btn
              text={modalProps.actionTitle}
              size="md"
              type="primary"
              onPress={() => {
                if (validatorFunction)
                  return validatorFunction(formValues, setInvalidInputs);

                let x:any = [];

                Object.keys(formValues as any).forEach((key) => {
                  let isInvalid: boolean;
                  let message = "";
                  let validate;

                  if (inputs?.find((i) => i.key == key).isRequired) {
                    validate = validator?.partial().safeParse({
                      [key]: (formValues as any)[key],
                    });
                    isInvalid = !validate?.success;
                  } else {                    
                    isInvalid = false;
                  }

                  if (isInvalid)
                    message = (validate as any).error.format()[key]._errors[0];

                  x.push({
                    [key]: isInvalid,
                    message: message,
                  })
                });

                setInvalidInputs(x);
              }}
            />
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
});

export default FormModal;