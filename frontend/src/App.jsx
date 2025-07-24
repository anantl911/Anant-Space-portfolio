import { Component } from "react";

import { BrowserRouter, 
         Router, 
        Route, 
        Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Pages/Home.jsx";
import Art from "./components/Pages/Art.jsx";
import Games from "./components/Pages/Games.jsx";

class App extends Component{
    render(){
        return(
            <article>
                <BrowserRouter>
                    <div className="sticky top-0 z-50">
                    <Header anantSpaceLogo="anant_space_logo2.png"/>
                    </div>
                    <Routes>
                        <Route path="/Home" element={<Home />} />
                        <Route path="/Art" element={<Art />} />
                        <Route path="/Games" element={<Games />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </article>
        )
    }
}

export default App;