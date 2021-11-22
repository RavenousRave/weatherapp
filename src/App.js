import react from "react";
import "./App.css"
import Body from "./Components/Body.js"
import Header from "./Components/Header.js"

function App() {
  return (
    <div>
    <Header />
    <Body />
    </div>
  );
}

export default App;

{/*TODO: allow input as zip codes or city names — OR, do a lookup of city name into a code */}