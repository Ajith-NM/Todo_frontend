import ReactDOM from "react-dom";
import "./Loader.css";

const Loader = () => {
  const portalLoading = document.getElementById("loadingPortal")!;
  return ReactDOM.createPortal(
    <div className="load">
      <div className="loader"></div>
    </div>,
    portalLoading
  );
};

export default Loader;
