import { Component } from "react";
import technologies from "../../helpers/techStack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5, faGit, faPython, faJs, faReact, faNpm, faNode, faFigma, faCss3, faBootstrap } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faHtml5, faGit, faPython, faJs, faReact, faNpm, faNode, faFigma, faCss3, faBootstrap);


class TechStackBox extends Component{

    populateTechStack(){
        const technologiesArray = Object.entries(technologies);

        const listItem = (techName,iconName) => {

        const isImage = typeof iconName === "string";
        const isIcon = iconName.iconImg ? true : false;
        if(isIcon){
        // console.log(`${techName} = `,typeof iconName.iconImg,isIcon)
        }
        return( 
        <li id={techName} key={techName}
        className={isIcon ? iconName.color : "hover:text-blue-500"}>
            <div className="flex flex-col items-center text-center">
                {isImage || isIcon ? (
                    <img 
                        src={iconName.iconImg} 
                        alt={techName} 
                        loading="lazy" 
                        className="w-8 h-8 object-contain"
                    />
                ) : (
                    <FontAwesomeIcon icon={iconName} size="2x"></FontAwesomeIcon>
                )}
                <p className="mt-2 text-sm select-none not-italic text-[clamp(10px,0.8vw,12.2px)]">{techName.toUpperCase()[0] + techName.slice(1)}</p>
            </div>
        </li>
        );
        };

        const output = [];

        for(const [tech, value] of technologiesArray) {
            if(tech === "database") {
                for(const [dbTech, dbIcon] of Object.entries(value)){
                    output.push(listItem(dbTech, dbIcon));
                }
            } else {
                output.push(listItem(tech,value));
            }
        }
        return output;
    }

    render(){
        return (
        <div id="stack-icons-box"
            className="bg-[rgba(255,255,255,0.06)] w-[60vw] lg:w-[25vw] backdrop-blur-sm relative z-0">

            <p className="bg-[rgb(22,36,79)] text-[clamp(13px,1vw,15.3px)] not-italic p-2 text-center select-none"
            >Technologies</p>

            <ul className="list-none flex gap-2 font-normal justify-center px-5">
                <div id="icons-container"
                className="grid grid-cols-5 sm:grid-cols-6 gap-y-6 gap-x-6 py-3">    
                {this.populateTechStack()}
                </div>
            </ul>
        </div>
        );
    }
}

export default TechStackBox;