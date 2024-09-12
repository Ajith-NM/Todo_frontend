import ReactDOM from "react-dom";
import "./Loader.css";

const Loader = () => {
  const portalLoading = document.getElementById("loadingPortal")!;
  return ReactDOM.createPortal(
    <div className="load" data-testid="load">
      <div className="loader" data-testid="load"></div>
    </div>,
    portalLoading
  );
};

export default Loader;
