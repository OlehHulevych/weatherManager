import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import Header from "./components/Header.jsx"
import Footer from "./components/Footer.js"
import AddTown from "./components/AddTown.component"
import WeatherComponent from "./components/WeatherComponent"
import Main from "./components/Main"
import {useSelector, useDispatch} from "react-redux"
import {useState} from "react"


function App() {
  const [scale, setScale] = useState(true)
  const open = useSelector((state)=> state.cityBar.open )
  return (
      <div>
        <Header/>
          <Main/>
          {open && <AddTown scale = {scale} setScale = {setScale}/>}
        <Footer/>
        
      </div>
    
  );
}

export default App;
