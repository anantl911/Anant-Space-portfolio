import React, { Component, createRef } from "react";
import ParticlesComponent from "../../particlesParams.jsx";

class MiscInfo extends Component{
    constructor(){
            super()
            this.sectionRef = createRef();
            this.state = {
                showParticles: false,
                educationBtn: {
                    btnHovered: false,
                    ringHoverClassRing: "h-2 w-2 border-1 rounded-full bg-blue-800 border-blue-800 transition duration-200",
                    ringUnhoverClassRing: "h-2 w-2 border-white border-1 rounded-full transition duration-200",
                }
            };
            this.observer = null;
        }

        componentDidMount() {
                if("IntersectionObserver" in window){
                    this.observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if(entry.isIntersecting){
                                    this.setState({ showParticles: entry.isIntersecting});
                                }
                            });
                        }, 
                        { threshold: 0.01, }
                    );
                    if(this.sectionRef.current) {
                        this.observer.observe(this.sectionRef.current);
                    }
                } else {
                    this.setState({ showParticles: true})
                }
        }

        addStars(){
            return(
                <>
                    {this.state.showParticles && <div className="absolute inset-0 z-0 opacity-0 fade-in" style={{ pointerEvents: "none" }}>
                    <ParticlesComponent id="particles-background" particleCount={Math.floor(Math.random()*301)} movementSpeed={0.2} particleColors={["#FFFFFF","#5d36c0"]} linkEnabled={true}/>
                    
                </div>}

                {this.state.showParticles && <div className="absolute inset-0 z-0 opacity-0 fade-in" style={{ pointerEvents: "none" }}>
                    <ParticlesComponent id="particles-foreground" particleCount={Math.floor(Math.random()*5)} movementSpeed={30} particleColors={["#ca7e7e"]} linkEnabled={false}/>
                </div>}
            </>
            )
        }

        addFigures(){
            return(
            <div id="transparent-figures" className="hidden sm:flex" >
                    <div className="min-h-[630px] w-full bg-cover absolute z-10 bg-[url(home/hills.png)]" />
                    <div className="min-h-[620px] w-full bg-cover absolute z-20 top-[10px] bg-[url(home/figures.png)]" />
                </div>
            )
        }

        render(){
            return(
                <div ref={this.sectionRef} id="wow" className="min-h-[630px] bg-[url(home/anant_space_bg.png)] bg-cover relative w-full overflow-hidden">
  
                {this.addStars()}
            
                {this.addFigures()}
                

            </div>
            )
        }
};

export default MiscInfo;