import { Component } from "react";
import Featured from "../ForGames/Featued.jsx";
import ConwaysGame from "../ForGames/programmed_games/CGOL.jsx";
import CGOLMenu from "../ForGames/Games/CGOLMenu.jsx";

class Games extends Component{
    render(){
        return(
            <article id="games">
                <Featured />

                <div id="subsection-author-info"
 className="bg-[linear-gradient(rgba(26,34,36,0.9),rgba(0,0,0,0.5)),url(deepdarkstarrysky_hd.jpg)] bg-[length:50%]">
                    <CGOLMenu />
                    <ConwaysGame />

                </div>
            </article>
        );
    };
};


export default Games;