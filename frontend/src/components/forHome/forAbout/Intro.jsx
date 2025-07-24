import { Component } from "react";

class Intro extends Component{
    render(){
        return(
            <div id="user-details"
                className="mt-10 flex flex-col gap-[8vw] items-center justify-center lg:flex-row lg:gap-[1vw]">

                    

                <div id="author-description"
                className="text-white italic w-[60vw] lg:w-[40vw] flex flex-col gap-10 px-2x
                text-[clamp(6.7px,40vw,15.35px)]">
                    <p>I am Anant Shivdas Chavan, a budding software developer from India. I look forward to interesting projects. </p>
                    <p>This place serves partly as a personal space and a portfolio site. Aside from coding, I like paintings, poetry, video games and reading. 
                        I'd like to dedicate forthcoming years in development of my thoughts and worldview to social welfare and societal problems. My views relating to which I'll always outline in this blog.
                     </p>
                    <p>If you'd like to contribute creative works and/or your thoughts feel free to share them. You will be credited. I'd be glad to feature your works here. </p>
                </div>

                <div id="photo"
                className="overflow-hidden w-[60vw] min-w-[280px] lg:w-[35vw] xs:min-w-[380px]">
                    <img src="./home/anant.jpg"
                    className="scale-[100%%] origin-top object-cover object-top hover:scale-[200%] transition duration-1000"/>
                </div>

            </div>
        )
    }
}

export default Intro;