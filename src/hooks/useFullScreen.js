import { useEffect, useCallback, useState } from 'react';

// включение полноэкранного режима выбранного элемента
export const isFullScreenElement = el => {
  const d = document;
  if (el) {
    return Boolean(
      d.fullscreenElement === el ||
      d.mozFullScreenElement === el ||
      d.webkitFullscreeenElement === el ||
      d.msFullscreenElement === el
    );
  }
  return Boolean(
    d.fullscreenElement ||
    d.mozFullScreenElement === el ||
    d.webkitFullscreeenElement === el ||
    d.msFullscreenElement === el ||
    d.fullscreen ||
    d.mozFullScreen ||
    d.webkitFullscreeen ||
    d.fullScreenMode
  );

};
 
export const useFullScreen = (options = {}) => {
  const fsEl = options && options.element;
  const initialState = window ? false : isFullScreenElement(fsEl);
  const [isFullScreen, setFullScreen] = useState(initialState);

  const openFullScreen = () => {
    const el = fsEl || document.documentElement;

    const requestFullscreen =
      el.webkitRequestFullScreen ||
      el.requestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    
    return requestFullscreen.call(el);
  };

  const closeFullScreen = () => {

    const exitFullscreen =
      document.webkitExitFullscreen ||
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;
    
    return exitFullscreen.call(document);
  };

  const handleChange = useCallback(() => {
    setFullScreen(isFullScreenElement(fsEl));
  }, [fsEl]);

  useEffect(() => {
    document.addEventListener("webkitfullscreenchange", handleChange, false);
    document.addEventListener("mozfullscreenchange", handleChange, false);
    document.addEventListener("msfullscreenchange", handleChange, false);
    document.addEventListener("MSFullscreenChange", handleChange, false);
    document.addEventListener("fullscreenchange", handleChange, false);

    return () => {
      document.removeEventListener("webkitfullscreenchange", handleChange);
      document.removeEventListener("mozfullscreenchange", handleChange);
      document.removeEventListener("msfullscreenchange", handleChange);
      document.removeEventListener("MSFullscreenChange", handleChange);
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, [options.element, handleChange]);

  return {
    isFullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggleFullScreen: isFullScreen ? closeFullScreen : openFullScreen
  };
};