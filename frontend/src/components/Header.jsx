import { Component } from "react";
import {Link} from "react-router-dom";
import navLinks from "./helpers/navLinks";

class Header extends Component{

    constructor(props){
        super(props);
    }

    populateList(index){
        return navLinks[index].map(link => {
            let linkName = link === "Paintings" ? "Art" : undefined;
            return <li className="hover:border-b-2 hover:border-[#facd8a]
            pb-6" key={link.toLowerCase()}>
                <Link to={linkName ? linkName : link} className="px-6">{link.toUpperCase()}</Link>
            </li>
        })
    }

    render(){
        return(
            <header className="sticky top-0">
                <div
                    id="container"
                    className=" flex justify-between h-[6vw] bg-center bg-[linear-gradient(rgba(26,34,36,0.8),rgba(26,34,36,0.8)),url(deepdarkstarrysky.jpg)] text-[#facd8a] px-10 bg-[length:60%]"
                >

                    <div className="flex justify-center w-full gap-[20vw]">

                    <div
                    id="anant-space-logo"
                    className="absolute left-1/2 transform -translate-x-1/2 w-[8vw]"
                    >
                    <img
                        src={this.props.anantSpaceLogo}
                        className="bg-center bg-[linear-gradient(rgba(26,34,36,0.8),rgba(26,34,36,0.8)),url(deepdarkstarrysky.jpg)] rounded-full select-none"
                        alt="Anant's Space Logo"
                    />
                    </div>

                    <div className="flex justify-between text-[1.1vw] mt-[2vw]
                    gap-[16vw]">

                        <div id="nav-links-1"
                        className="relative left-[7.5vw] select-none">
                        <ul className="list-none flex gap-2">
                            {this.populateList(0)}
                        </ul>
                        </div>

                        <div id="nav-links-2">
                        <ul className="list-none flex gap-2 select-none">
                            {this.populateList(1)}
                        </ul>
                        </div>
                    </div>

                    </div>

                    {/* Absolutely center the logo */}


                   
                </div>
            </header>

        )
    }
}

export default Header;