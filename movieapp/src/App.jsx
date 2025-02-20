import "./App.css";
import Header from "./components/header";

import Carousel from "./components/crausel";

import Products from "./components/products";
const slides = [
  "https://i.ibb.co/ncrXc2V/1.png",
  "https://i.ibb.co/B3s7v4h/2.png",
  "https://i.ibb.co/XXR8kzF/3.png",
  "https://i.ibb.co/yg7BSdM/4.png",
];
function App() {
  return (
    <div className="app">
      
      <Header className="header" />

      {/* <div className="max-w-lg"> */}
      <div className="max-h-lg">
        <Carousel>
          {slides.map((s) => (
            <img src={s} />
          ))}
        </Carousel>
      </div>

      <Products />
    </div>
  );
}

export default App;
