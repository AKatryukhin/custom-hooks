import {useEffect, useState} from "react";

// управление значениями boolean
// для управления отображением скрытых элементов (модельных окон, уведомлений и пр. )
export const useDisclosure = (initialState = false, { onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen !== initialState) {
      setIsOpen(initialState);
    }
  }, [initialState]);
  
  const open = () => {
    setIsOpen(true);
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  const close = () => {
    setIsOpen(false);
    if (typeof onOpen === 'function') {
      onClose();
    }
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };

};