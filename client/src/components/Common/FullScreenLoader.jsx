//External lib Import
import { useSelector } from "react-redux";

const FullScreenLoader = () => {
  const loader = useSelector((state) => state.setting.isLoading);

  return (
    <div className={loader ? "LoadingOverlay" : "d-none"}>
      <div className="loading__overlay">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
