import { useEffect } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const UseLocalStorageComponent = () => {
  const [lsValue, setLsValue] = useLocalStorage("name", "");

  const onChange = (e) => {
    setLsValue(e.target.value);
  };

  useEffect(() => {
    console.log(lsValue);
  }, []);

  return (
    <div>
      <h1>Persisted input</h1>
      <input value={lsValue} onChange={onChange} />
    </div>
  )
};