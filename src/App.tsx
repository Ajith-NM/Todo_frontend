import { BrowserRouter } from "react-router-dom";
import PageNavigation from "./Routes/PageNavigation";

function App() {
  localStorage.setItem("hii","12345")
  return (
    <>
      <BrowserRouter>
        <PageNavigation/>
      </BrowserRouter>
    </>
  );
}

export default App;
