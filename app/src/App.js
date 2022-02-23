import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Gallery from './gallery';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact path = "/"
          element = {<Home />}
        >

        </Route>

        <Route
          exact path ="/gallery"
          element = {<Gallery />}
        
        ></Route>


      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
