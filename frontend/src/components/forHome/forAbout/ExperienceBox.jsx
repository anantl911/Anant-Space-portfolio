import { Component } from "react";
import experience from "../../helpers/experience.jsx";

class ExperienceBox extends Component{

    constructor(){
        super()
        this.state = {
            selectedTheme: 0,
            selectedThemeClass: "bg-black hover:cursor-pointer hover:bg-black p-2 w-[50%] text-white text-s transition duration-200",
            unselectedThemeClass: "bg-[#504c4c] hover:cursor-pointer hover:bg-black p-2 w-[50%] text-white text-s transition duration-200",
            descriptionContainerClass: "",
            selectedIndex: 0,
            experienceSelectionClass: "min-h-2 min-w-2 rounded-full bg-blue-600 hover:cursor-pointer hover:bg-blue-600 transition duration-400",
            experienceNonSelectedClass: "min-h-2 min-w-2 rounded-full bg-white hover:cursor-pointer hover:bg-blue-600 transition duration-400"
            
        }
    }

    populateExperience(index = 0){
        let themeExists = experience[this.state.selectedIndex].theme ? true : false;
        
        return (<div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xs max-w-[71vw] select-none flex flex-col">
                
                <div id="experience-header" className="text-center bg-[rgb(22,36,79)] text-white text-[clamp(14px,1.2vw,20px)] p-2">
                    <h2>{experience[this.state.selectedIndex].title}</h2>
                </div>

                <div id="info-container" className="flex flex-col lg:flex-row flex-grow lg:h-120">
                    <div id="sub-info-pic" className="flex flex-col bg-[rgba(91,80,80,0.1)] ">
                        <div id="pic-container">
                            <img src={ themeExists ? experience[this.state.selectedIndex].theme[this.state.selectedTheme].images[0] : experience[this.state.selectedIndex].images[0]}
                            className="w-[80vw] lg:w-[30vw] lg:h-[200px] h-[300px]"/>

                            <div id="main-description-container" className=" lg:w-[30vw] text-white p-4 text-[clamp(13px,1vw,16px)] lg:text-[clamp(14px,1vw,16px)]">
                                <p>{experience[this.state.selectedIndex].description}</p>
                            </div>
                        </div>

                        <div className="flex flex-col mt-auto">
                            <div id="buttons-container" className="flex gap-1">
                                { themeExists ? 
                                <>
                                <button
                                className={this.state.selectedTheme === 0 ? 
                                this.state.selectedThemeClass : 
                                this.state.unselectedThemeClass} onMouseOver={() => {
                                    setTimeout(() => {this.setState({selectedTheme: 0})}, 200)
                                    
                                    }}>
                                    Luminosity Drone</button>
                                    
                                <button
                                className={this.state.selectedTheme !== 0 ? 
                                this.state.selectedThemeClass : 
                                this.state.unselectedThemeClass} onMouseOver={() => {
                                    setTimeout(() => {this.setState({selectedTheme: 1})}, 200)
                                }}>
                                    Balancing Bot</button>
                                </> :
                                <button
                                className="bg-[rgb(107,31,31)] hover:cursor-pointer hover:bg-[rgb(108,62,62)] p-2 w-[100%] text-white text-s transition duration-200">
                                    {experience[this.state.selectedIndex].buttons}</button>}
                            </div>
                        </div>
                    </div>

                    <div id="sub-info-text" className="flex flex-col flex-grow ">
                        <div id="sub-info-text-container" className="p-4 flex flex-col gap-10 flex-grow">
                            <div>

                                <div id="task-description-container" className="w-[65vw] text-center relative lg:text-left  lg:w-[35vw] text-white text-[clamp(13px,1vw,16px)] flex flex-col gap-10">
                                    { themeExists ? 
                                    experience[this.state.selectedIndex].theme[this.state.selectedTheme].tasks_description.map(theme_task => (<p>{theme_task}</p>)) : 
                                    experience[this.state.selectedIndex].tasks_description.map(project_task => (<p>{project_task}</p>))
                                    }
                                </div>
                            </div>

                            <div className="text-white flex justify-end items-end mt-auto">
                                <p>{themeExists ? 
                                `${experience[this.state.selectedIndex].theme[this.state.selectedTheme].time.split("-")[0].slice(3,8)} - ${experience[this.state.selectedIndex].theme[this.state.selectedTheme].time.split("-")[1].slice(3,8)}`  :
                                `${experience[this.state.selectedIndex].time.split("-")[0].slice(3,8)} - ${experience[this.state.selectedIndex].time.split("-")[1].slice(3,8)}`}</p>
                            </div>
                        </div>
                        
                        <div id="buttons" className="flex justify-center mt-auto">
                            <button className="bg-[rgba(30,58,138)] hover:bg-[rgba(30,58,138,0.5)] hover:cursor-pointer transition duration-200  w-[100%] p-2 text-white hover:text-gray-500">Read more</button>
                        </div>
                    </div>



                </div>
        </div>
        )
    }

    render(){
        return(
            <>
                <div id="experience-container" className="flex justify-center items-center py-10 flex-col gap-5">
                    <div id="experience-box">
                        {this.populateExperience(1)}
                    </div>

                    <div id="experience-carousel-dots" className="flex gap-2 bg-[#5453774f] rounded-xs px-4 p-2">
                        <div className={this.state.selectedIndex === 0 ? 
                        this.state.experienceSelectionClass : 
                        this.state.experienceNonSelectedClass}
                        onMouseOver={() => this.setState({selectedIndex: 0})}></div>
                        <div className={this.state.selectedIndex !== 0 ? 
                        this.state.experienceSelectionClass : 
                        this.state.experienceNonSelectedClass}
                        onMouseOver={() => this.setState({selectedIndex: 1})}></div>
                    </div>

                </div>
            </>
        )
    }
}

export default ExperienceBox;