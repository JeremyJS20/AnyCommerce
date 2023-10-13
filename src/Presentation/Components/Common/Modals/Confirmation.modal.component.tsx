import {
  useDisclosure,
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { forwardRef, useState, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import Btn from "../Inputs/Button";
import { ModalProps } from "../../../Utils/types.utils";

interface IConfirmationModalProps {
    onConfirmBtnClicked: (id:string) => void;
}

const ConfirmationModal = forwardRef(
  ({ ...props }: IConfirmationModalProps, ref) => {
    //   const { validator, validatorFunction, inputs, resetParentValues } = props;

    const { t } = useTranslation();

    const { onOpenChange } = useDisclosure();

    const [modalProps, setModalProps] = useState<ModalProps>({
      type: "form",
      visible: false,
      title: "",
      actionTitle: "",
      size: "md",
      confirmBtnColor: ''
    });

    useImperativeHandle(ref, () => ({
      setModalProps: (props: ModalProps) =>
        setModalProps({ ...modalProps, ...props }),
      modalProps: modalProps,
    }));

    const onModalClose = () => {
      setModalProps({ ...modalProps, visible: false });
      //  if(resetParentValues) resetParentValues();
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
            <ModalBody className="text-center text-default-500 text-base">
              {t(String(modalProps.msg))}
            </ModalBody>
            <ModalFooter>
              <Btn
                text="no"
                size="md"
                type="secondary"
                onPress={onModalClose}
              />

              <Btn
                text={t("si")}
                size="md"
                type="primary"
                aditionalClassnames={modalProps.confirmBtnColor}
                onPress={() => {props.onConfirmBtnClicked(String(modalProps.itemId))}}
              />
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    );
  }
);

export default ConfirmationModal;
