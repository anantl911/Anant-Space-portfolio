import { Component } from "react";
import WelcomeSection from "../forHome/Welcome.jsx";
import AboutSection from "../forHome/About.jsx";

class Home extends Component{
    render(){
        return(
            <article id="home">
            <WelcomeSection/>
            <AboutSection />
            </article>
        );
    };
};

export default Home;