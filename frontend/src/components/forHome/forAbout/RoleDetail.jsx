import { Component } from "react";
import TechStackBox from "./TechStackBox.jsx";
import ProjectBox from "./ProjectBox.jsx";
import HomeSection from "../../HomeSection.jsx";


class RoleDetail extends Component{
    render(){
        return(
            <div id="author-workstack" className="mt-2">
        
                <div id="workstack-description-container"
                className="flex flex-col items-center lg:flex-row lg:justify-center mt-15 gap-10">

                    <div className="text-white italic w-[60vw] lg:w-[30.5vw] flex flex-col gap-10 px-2x
                    text-[clamp(11.7px,40vw,15.35px)]">
                        <div>
                            <p>Having worked with various projects, I've covered technologies that go from web development to desktop apps to robotics. For now, I am learning Android Development, ML and Agentic AI.</p>
                        </div>

                    <div className="flex justify-center">
                        <TechStackBox/>
                    </div>

                <div className="flex flex-col gap-8">
                    <p>From a production perspective, I am good at making React and Node based apps, C++ and Python.</p>
                    <p>I developed an interest in graphics simulations and like to make computational physics simulations. I'm completing Stiffman's Nature of Code for now.</p>
                </div>
                
        </div>

        <div className="text-white italic text-[clamp(11.7px,40vw,15.35px)]">
            <ProjectBox />
        </div>
        </div>
    </div>

        )
    }
}

export default RoleDetail;