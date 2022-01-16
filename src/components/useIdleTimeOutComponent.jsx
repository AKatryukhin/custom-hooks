import { useState } from 'react';
import { useIdleTimeOut } from '../hooks/useIdleTimeOut';

export const UseIdleTimeOutComponent = () => {
  const [active, setActive] = useState(false);

  const events = [
        "load",
        "mousemove",
        "mousedown",
        "click",
        "scroll",
        "keypress",
        "touchcancel",
        "touchend",
        "touchmove",
        "touchstart"
      ];
  
  const onActivity = () => {
    setActive(true);
  };
  const onTimeOut = () => {
    setActive(false);
  };

  useIdleTimeOut(1000, onTimeOut, onActivity, events);

  return (
    <div>
      <h1>Прошу, не трогай меня</h1>
      {active && <h2>ААА НУ ПОЖАЛУЙСТА, НЕ ТРОГАЙ</h2>}
    </div>
  )
};