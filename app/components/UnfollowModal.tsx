import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type UnFollowModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UnfollowModal = ({ isOpen, onClose }: UnFollowModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader>Unfollow</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to unfollow this user?</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UnfollowModal;
