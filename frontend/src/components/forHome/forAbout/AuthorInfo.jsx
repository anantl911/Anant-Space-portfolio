import React, { Component, createRef } from "react";
import HomeSection from "../../HomeSection.jsx";
import Intro from "./Intro.jsx";
import RoleDetail from "./RoleDetail.jsx";
import ExperienceBox from "./ExperienceBox.jsx";
import MiscInfo from "./MiscInfo.jsx";



class AuthorInfo extends Component{

    

    render(){
        return(
        <div id="subsection-author-info"
        className="min-h-170 bg-[linear-gradient(rgba(26,34,36,0.9),rgba(0,0,0,0.5)),url(deepdarkstarrysky_hd.jpg)] bg-[length:50%]">
            <div id="container mt-20">

                <HomeSection sectionID="author-home" textClass="text-[clamp(24px,2.2vw,33.7px)]" 
                sectionText={<>Hi... <span className="border-b-2 border-[#facd8a] pb-5">it's An</span>ant!</>} />

                    <Intro />

                <div className="mt-[5vw]">
                <HomeSection sectionID="author-title" textClass="text-[clamp(22px,2vw,33.7px)]" 
                sectionText={<>I'm a <span className="border-b-2 border-[#facd8a] pb-5">full sta</span>ck dev.</>} />
                </div>
                    <div className="z-1">
                    <RoleDetail />
                    </div>
                    
                <div className="mt-[3vw]">
                <HomeSection sectionID="author-title" textClass="text-[clamp(22px,2vw,33.7px)]"  
                sectionText={<>My e<span className="border-b-2 border-[#facd8a] pb-5">xperie</span>nce</>} />
                </div>

                <div className="mb-[3vw]">
                    <ExperienceBox />
                </div>

                <MiscInfo />
                   
            </div>

          

        </div>
        )
    }
}

export default AuthorInfo;