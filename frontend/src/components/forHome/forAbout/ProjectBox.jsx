import { Component } from "react";
import projects from "../../helpers/projects";

class ProjectBox extends Component{

    populateProjects(){
        return projects.map(project => {
            return <li id={`project-${project.id}`}
            key={`${project.id}`}>
                <div id="container"
                className="flex bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.30)] border-t-2 border-b-2 border-[rgba(255,255,255,0.10)]
                z-0">

                    <div id="picture" className="bg-[rgba(11,9,36,0.45)] w-[10.5vw] h-[11.5vw] hidden md:flex md:flex-col md:justify-center md:items-center">
                        <div>
                        <img src={project.image[0]} 
                        className="max-w-[10.5vw] flex place-content-center"/>
                        </div>
                        
                        <div id="title" className="flex place-content-center">
                            <h2 className="text-[0.9vw] not-italic text-center select-none">{project.title}</h2>
                        </div>
                    </div>

                    <div id="info" className="ml-8">
                        
                        

                        <div id="description" className="flex flex-col gap-2 select-none mt-3">
                            {project.description.map(text => {
                               return <p className="w-[50vw] lg:w-[25vw] text-[clamp(10.45px,0.8vw,12.28px)]"> - {text}</p>
                            })}
                        </div>

                        <div id="details"
                        className="flex justify-between select-none mt-5">
                            
                            <div className="flex gap-4 relative left-3">
                                {Object.entries(project.techInvolved).map(tech => {
                                    return(
                                    <div className="flex flex-col relative right-2">
                                    <div className="flex justify-center"> 
                                    <img src={tech[1]} className="w-6 h-6" />
                                    </div>
                                    <p className="text-[0.6vw] not-italic">{tech[0]}</p>
                                    </div>
                                    )
                                })}
                            </div>
                            <div>
                                <p className="text-[clamp(10.45px,0.8vw,12.28px)] mt-4 relative right-4">{`${project.date.split("-")[0].slice(3,8)} - ${project.date.split("-")[1].slice(3,8)}`}</p>
                            </div>
                        </div>

                    </div>
                </div>
                
            </li>
        })
    }

    render(){
        return(
            <div id="project-gallary"
            className="bg-[rgba(255,255,255,0.06)] backdrop-blur-sm z-0]">
                <div id="gallary-header">
                    <h2 className="text-center bg-[rgb(22,36,79)] p-2 not-italic text-[clamp(13px,1vw,15.3px)]">Projects</h2>
                </div>

                <div id="projects"
                className="p-1 h-[33.56rem] overflow-hidden overflow-y-scroll border-b-4 border-[rgba(255,255,255,0.1)]">
                    <ul>
                        {this.populateProjects()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ProjectBox;