import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./comp/nav/nav";
import ForUGrid from "./comp/grid/ForU-grid";
import Caro from "./comp/carousel/caro";
import Foot from "./comp/foot/foot";
import Slider from "./comp/slider/slider";
import Page from "./comp/page/page";
import OurGrid from "./comp/grid/Our-grid";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider />
                <ForUGrid />
                <Caro />
                <OurGrid />
                <Foot />
              </>
            }
          />
          <Route path="/product/:index" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );   
}

export default App;
