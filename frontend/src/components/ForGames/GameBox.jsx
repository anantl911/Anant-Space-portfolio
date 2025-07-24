import { Component } from "react";

class GameBox extends Component{
    render(){
        return(
            <div id="game-box" className="flex items-start ">

                <div id="container" className=" bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] transition duration-200 border-2 border-[rgba(255,255,255,0.05)] w-full text-white flex items-center">

                    <div id="game-image">
                        <img src={this.props.imageSource}
                        className="min-h-30 min-w-30 max-h-30 max-w-30 "/>
                    </div>

                    <div id="game-info" className="flex justify-between px-5 w-full min-h-30 ">

                        <div>
                            <div className="flex flex-col py-2">
                                <div id="game-name">
                                    <h3 className="text-[clamp(15px,1.2vw,100px)]">{this.props.gameName}</h3>
                                </div>

                                <div id="game-description">
                                    <p className="text-[clamp(12px,1vw,100px)] w-[35vw] md:w-[50vw] lg:w-[60vw]">{this.props.gameDescription}</p>
                                </div>
                            </div>
                        </div>

                        <div id="buttons" className="md:relative md:bottom-3 flex items-end">
                            <button className="bg-[rgb(250,205,138)] text-black h-full md:h-fit relative w-5 sm:w-6 left-4 md:left-0 md:px-6 flex items-center justify-center hover:bg-white transition duration-500 hover:cursor-pointer">▷</button>
                        </div>
                    </div>

                    
                </div>
            </div>
        )
    }
}

export default GameBox;