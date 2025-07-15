import { PropagateLoader } from "react-spinners";
import style from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={style.loaderBackdrop}>
      <PropagateLoader
        loading
        size={15}
        speedMultiplier={1}
        color={"var(--button)"}
      />
    </div>
  );
};

export default Loader;
