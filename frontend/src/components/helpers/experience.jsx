const experience = [
    {
        title: "EYantra",
        description: 
        "EYantra is an annual international robotics competition organized by IIT Bombay during August. The competition involves completion of tasks to develop solutions to assigned problem statements. Teams initially work on software to test their solutions in simulation followed by implementation on hardware. ",
        theme: [
            {
            title: "Luminosity Drone",
            images: ["./experience/eyantra/Luminosity Drone/drone.png",
                "./experience/eyantra/Luminosity Drone/IMG_20231009_115328.jpg",
                "./experience/eyantra/Luminosity Drone/IMG_20240115_174202.jpg",
                "./experience/eyantra/Luminosity Drone/IMG_20240118_131436.jpg"
            ],
            tasks_description: [
                "developed PID script for autonomous drone flight in Gazebo simulation via ROS Noetic in Python.",
                "wrote OpenCV based script to detect LED clusters from drone's IR camera by using image segmentation.",
                "led a team of 4 people to 2nd stage being part of the 50 teams selected from 2400 global theme participants to receive hardware kits.",
                "implemented ButterWorth filter to cancel WhyCON marker height noise in RPi based drone.",
            ],
            time: "01/08/23 - 22/02/24"
            },
            {
            title: "Balancing Bot",
            images: ["./experience/eyantra/Balancing Bot/hardware pic.jpg"],
            tasks_description: [
                "wrote PID controller script for inverted pendulum on a cart problem",
                "developed state model of balancing bot and wrote a LDR controller",
                "tested scripted controllers and ran simulations in CoppeliaSim for a balancing bot"
            ],
            time: "01/08/24 - 22/02/25"
            }
        ]
        ,
        buttons: [
                // {
                //     label: "Luminosity Drone",
                //     action: () => { this.setState({ selectedTheme: 0 }) },
                //     className: this.state.selectedTheme === 0 ? this.state.selectedThemeClass : this.state.unselectedThemeClass
                // },
                // {
                //     label: "Balancing Bot",
                //     action: () => { this.setState({ selectedTheme: 1 }) },
                //     className: this.state.selectedTheme !== 0 ? this.state.selectedThemeClass : this.state.unselectedThemeClass
                // }
            ]
    },
    {
        title: "Emerging Technology", 
        description: "Emerging Technologies is an IT firm based in Nashik. The firm delivers IT services to its clients.",
        detail_description: "Being a project based internship as trainees we spent 2 weeks in training period in which we learned how industry grade apps are developed. We learned technologies like .NET, .ASP and make several apps as a part of training. We were then assigned projects to work on. My project being the firm's website. ",
        images: ["./experience/Emerging Technologies/website.png",
            "./experience/Emerging Technologies/Courses.png",
            "./experience/Emerging Technologies/LoginPage.png",
            "./experience/Emerging Technologies/Services.png",
            "./experience/Emerging Technologies/Update Info.png",
            "./experience/Emerging Technologies/Admin Panel.png"
            
        ],
        tasks_description: ["- Worked on desktop app development as a trainee on .NET Framework and completed a project",
            "Developed various applications as part of tasks during training period in .NET i.e Paint application, text editor, shopping app",
            "Worked frontend UI for internship portal as well as backend",
            "Enabled interactions between frontend and backend by JWT authentication, utilizing MongoDB database",
            "Implemented sales analysis, intern activity analysis on admin portal of website."
        ],
        time: "15/12/23 - 15/01/24",
        buttons: <svg className="h-6 w-[100%] flex justify-center" viewBox="0 0 256 256">
                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10">
                    <g transform="scale(5.12,5.12)">
                        <path d="M24.40234,9c-6.60156,0 -12.80078,0.5 -16.10156,1.19922c-2.19922,0.5 -4.10156,2 -4.5,4.30078c-0.39844,2.39844 -0.80078,6 -0.80078,10.5c0,4.5 0.39844,8 0.89844,10.5c0.40234,2.19922 2.30078,3.80078 4.5,4.30078c3.50391,0.69922 9.5,1.19922 16.10156,1.19922c6.60156,0 12.59766,-0.5 16.09766,-1.19922c2.20313,-0.5 4.10156,-2 4.5,-4.30078c0.40234,-2.5 0.90234,-6.09766 1,-10.59766c0,-4.5 -0.5,-8.10156 -1,-10.60156c-0.39844,-2.19922 -2.29687,-3.80078 -4.5,-4.30078c-3.5,-0.5 -9.59766,-1 -16.19531,-1zM24.40234,11c7.19922,0 12.99609,0.59766 15.79688,1.09766c1.5,0.40234 2.69922,1.40234 2.89844,2.70313c0.60156,3.19922 1,6.60156 1,10.10156c-0.09766,4.29688 -0.59766,7.79688 -1,10.29688c-0.29687,1.89844 -2.29687,2.5 -2.89844,2.70313c-3.60156,0.69922 -9.60156,1.19531 -15.60156,1.19531c-6,0 -12.09766,-0.39844 -15.59766,-1.19531c-1.5,-0.40234 -2.69922,-1.40234 -2.89844,-2.70312c-0.80078,-2.80078 -1.10156,-6.5 -1.10156,-10.19922c0,-4.60156 0.40234,-8 0.80078,-10.09766c0.30078,-1.90234 2.39844,-2.50391 2.89844,-2.70312c3.30078,-0.69922 9.40234,-1.19922 15.70313,-1.19922zM19,17v16l14,-8zM21,20.40234l8,4.59766l-8,4.59766z"></path>
                    </g>
                    </g>
                </svg>
    }

]


export default experience;