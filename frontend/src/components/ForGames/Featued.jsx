import { Component } from "react";
import FeaturedBox from "./FeaturedBox";

class Featured extends Component{
    render(){
        return(
            <section id="featured-games"
            className="min-h-160 w-full bg-[url(games/background.png)] bg-cover bg-bottom">
                <div id="container"
                className="min-h-[600px] flex place-content-center" >
                    <FeaturedBox />
                </div>
            </section>
        )
    }
}

export default Featured;