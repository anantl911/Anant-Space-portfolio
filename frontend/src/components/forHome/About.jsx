import { Component } from "react";
import AuthorInfo from "./forAbout/AuthorInfo";



class SectionAbout extends Component{
    render(){
        return(
        <section id="about">
            <div>
                <AuthorInfo />
            </div>
        </section>
        )
    }
}

export default SectionAbout;