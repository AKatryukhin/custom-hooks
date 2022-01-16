import { useDisclosure } from '../hooks/useDisclosure';

export const UseDisclosureComponent = () => {
  const { isOpen: isBlockOpen, toggle: toggleBlockOpen } = useDisclosure(false, {
    onOpen: () => console.log('Я открылся'),
    onClose: () => console.log('Я закрылся')
  });
  return (
    <>
      <h1>useDisclosure</h1>
      <button onClick={toggleBlockOpen}>Открыть блок с текстом</button>
      {isBlockOpen && <p>Я скрытый блок</p>}
    </>
  )
};
