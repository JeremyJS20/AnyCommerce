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
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../Assets/Icons/IconsCollection";
import { ModalProps } from "../../../Utils/types.utils";

interface IViewModalProps extends PropsWithChildren<any> {
  resetParentValues: () => void
}


const ViewModal = forwardRef(({ ...props }: IViewModalProps, ref) => {
  const { resetParentValues } = props;

  const { t } = useTranslation();

  const { onOpenChange } = useDisclosure();

  const [modalProps, setModalProps] = useState<ModalProps>({
    type: 'form',
    visible: false,
    title: "",
    actionTitle: "",
    size: "2xl",
    //data:
  });

  useImperativeHandle(ref, () => ({
    setModalProps: (props: ModalProps) => setModalProps({ ...modalProps, ...props }),
    modalProps: modalProps,
  }));

  const onModalClose = () => {
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
        body: "max-h-[50em] laptop:max-h-[35em] overflow-y-auto",
      }}
      closeButton={
        <Button
          onPress={onModalClose}
          isIconOnly
          size="sm"
          startContent={<Icon icon="x" size="xs"/>}
        />
      }
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {t(modalProps.title)}
          </ModalHeader>
          <ModalBody>
            {props.children}
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
});

export default ViewModal;