import { Component } from "react";

class CGOLMenu extends Component{

    populateHelpText = () => {
        return <div id="help-container">
            <div id="about-text">
                <div id="header-text">
                    <h4>About the game</h4>
                </div>

                <div id="sub-text">
                    <p>
                        This is a Cellular Automaton. A zero player game, your only involvement is to populate the grid. Amazing patterns emerge out of simple rules. The cell behavior is dictated by the 3 following rules:
                    </p>
                    <div id="game-rules">
                        <p>A cell will reproduce if it has 2 surrounding cells</p>
                        <p>Cells can die of overpopulation if one has greater than 3 surrounding cells</p>
                        <p>Similarly a cell can die of underpopulation if it has less than 2 surrounding cells</p>
                    </div>
                </div>
            </div>

            <div id="keys">
                <div id="header-text">
                    <h4>Controls</h4>
                </div>

                <div id="keys">
                    <p>I - display cell statistics. Shows population growth/decline and graph</p>
                    <p>V - Opens vertex mode. Pixels are displayed in a 1 to 1 ratio. </p>
                    <p>P - Starts/Stops the game. </p>
                    <p>E - Enables draw mode for populating cells and randomization options. </p>
                    <p>K - Enables selection options for image input and perlin noise implementation . </p>
                    <p>Press +  Zoom in. </p>
                    <p>Press - for Zoom in. </p>
                </div>
            </div>
        </div>
    }

    populateButtons = () => {
        
        const buttons = ["Play", "Help", "Quit"];

        return buttons.map(buttonName => (
             <li key={buttonName}><button className="bg-black w-full text-white hover:text-gray-200 p-2 px-20 hover:cursor-pointer hover:bg-blue-800 transition duration-200">{buttonName}</button></li>
        ))
    }

    render(){
        return (
            <div id="main-menu" className="absolute h-full w-full flex flex-col  top-220 items-center gap-25">
                <div id="game-header">
                    <h3 className="text-6xl text-center text-[rgb(250,205,138)]">Conway's Game of Life</h3>
                </div>
                <div id="option-container">
                    <ul className="list-none flex flex-col gap-5 text-xl text-center">
                        {this.populateButtons()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default CGOLMenu;