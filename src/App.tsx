import { BrowserRouter } from "react-router-dom";
import PageNavigation from "./Routes/PageNavigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
