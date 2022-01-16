import { useFullScreen } from '../hooks/useFullScreen';
import { useRef } from 'react';
import someImage from '../images/11.png';

export const UseFullScreenComponent = () => {
  const imgElement = useRef(null);
  
  const { open, close, toggleFullScreen, isFullScreen } = useFullScreen({
    element: imgElement.current
  });

  return (
    <div>
      <img src={someImage} alt='image' ref={imgElement}></img>
      <button onClick={toggleFullScreen}>Просмотр во весь экран</button>
    </div>
  )
};
