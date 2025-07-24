import { Component } from "react";


class HomeSectionText extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let textClass = `text-[#facd8a] ${this.props.textClass} text-center`
        return(
            <div id={this.props.sectionID}
                className="flex justify-center py-10 select-none">
                    <h1
                    className={textClass}>{this.props.sectionText}</h1>
            </div>
        );
    };
};

export default HomeSectionText;

// <h1 className={textClass}>Hi... <span className="border-b-2 border-[#facd8a] pb-5">it's An</span>ant!</h1>