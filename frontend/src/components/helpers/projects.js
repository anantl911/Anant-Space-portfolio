const projects = [ 
    {
        id:"cautomaton",
        title: "Cellular Automaton",
        description: [
            "Implemented Conway's Game of Life, Langton Ant and Predator vs Prey--popular models in CA as part of Project Based Learning (PBL)",
            "Introduced Perlin's Noise and image input by using OpenCV in C++",
            "Introduced vertex mode, generation count and graph to visualize cell population growth"],
        image: [
            "projects/CGOL/cgol.jpg", 
            "projects/CGOL/langAnt.jpg", 
            "projects/CGOL/main-menu.jpg", 
            "projects/CGOL/pvp.jpg"],
        techInvolved: {
            "C++":"tech-stack-icons/cpp.svg",
            "OpenCV":"tech-stack-icons/opencv.svg",
            "SFML":"tech-stack-icons/sfml.svg",
        },
        date: "01/04/23-01/05/23"
    },
    {
        id:"iportal",
        title: "Interns Portal",
        description: [
            "Developed full fledged website and interns portal by utilizing ASP.NET for backend and .NET framework for desktop portal",
            "Refactord existing project into ReactJS and Node based backend with introduced course sales and interns performance analytics", 
            "Refactored plain css to TailwindCSS with resposive design."],
        image: ["projects/ET_PORTAL/desktop_dashboard.png", 
            "projects/ET_PORTAL/website.png", 
            "projects/ET_PORTAL/services.png", 
            "projects/ET_PORTAL/services.png"],
        techInvolved: {
            ".NET":"tech-stack-icons/dotnetframework.jpg",
            "ASPNET":"tech-stack-icons/aspnet.svg",
        },
        date: "01/12/23-15/01/24"
    },
    {
        id:"pookienews",
        title: "PeekyNews 1.0",
        description: [
            "PeekyNews is an AI based news site developed for enhanced journalism integrity where users can smartly consume news content.",
            "Developed an AI agent that summarizes news, verifies facts and can be queried for news powered by llama 2.5 and QuenZ vector database",
            "Utilized Redis for inmemory data caching to reduce API calls and improved response time."
        ],
        image: ["projects/PEEKYNEWS/pnews_home.jpg"], 
        techInvolved: {
            ".NET":"tech-stack-icons/dotnetframework.jpg",
            "ASPNET":"tech-stack-icons/aspnet.svg",
        },
        date: "01/02/25-01/03/25"
    },
    {
        id:"antispoof",
        title: "Hybrid Anti Spoofing",
        description: [
            "Developed an integrated anti spoofing framework to prevent FAS spoofing as a part of Final Year project",
            "Detects 2D Spoof attacks, DeepFake attacks and Video injection/Virtual Camera",
            "Powered by CNN models namely MobileNet V3 and XCeptionNet"
        ],
        image: ["projects/ET_PORTAL/desktop_dashboard.png", 
            "projects/SPOOF/architecture.png"],
        techInvolved: {
            ".NET":"tech-stack-icons/dotnetframework.jpg",
            "ASPNET":"tech-stack-icons/aspnet.svg",
        },
        date: "01/01/25-01/02/25"
    },
    {
        id:"issstorwage",
        title: "ISS Stowage System",
        description: [
            "Developed a stowage system and mission simulation for the ISS as a solo participant. A solution for National Space Hackathon 25' organized by IIT Delhi",
            "Managed data interactions between frontend and backend by utilizing Postman for API testing",
            "Implemented frontend powered by ReactJS and tailwindCSS with Node based backend powered by pgSQL as database.",
            "Introduced visualizations for stowage operations along with simulation by using d3.js",
            "Developed priority sorting based 3D Bin Packing solution for efficient storage operations."
        ],
        image: ["projects/ET_PORTAL/desktop_dashboard.png", 
            "projects/SPOOF/architecture.png"],
        techInvolved: {
            ".NET":"tech-stack-icons/dotnetframework.jpg",
            "ASPNET":"tech-stack-icons/aspnet.svg",
        },
        date: "20/03/25-16/04/25"
    }
]


export default projects;