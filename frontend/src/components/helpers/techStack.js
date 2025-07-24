import { 
    faHtml5, faGit, faPython, faJs, faReact, faNpm, faNode, faFigma, faCss3, faBootstrap 
} from "@fortawesome/free-brands-svg-icons";

const technologies = {
    HTML5: faHtml5,
    GIT: faGit,
    python: faPython,
    javascript: faJs,
    reactJs: faReact,
    NPM: faNpm,
    nodeJs: faNode,
    figma: faFigma,
    CSS3: faCss3,
    database: {
        SQL: faFigma,
        mongoDB: {iconImg: "tech-stack-icons/mongodb.svg",
            color: "hover:text-green-500"
        },
        firebase: faFigma,
    },
    SFML: {
        iconImg:"tech-stack-icons/sfml.svg",
        color:"hover:text-green-400"},
    bootstrap: faBootstrap,
    dotnet: {iconImg:"tech-stack-icons/dotnetframework.svg",
            color:"hover:text-violet-500"},
    gazebo: {iconImg: "tech-stack-icons/gazebo.svg",
             color:"hover:text-yellow-500"},
    ROS2: {iconImg: "tech-stack-icons/ros2.png",
        color:"hover:text-blue-800"},
    CoppeliaSIM: {iconImg: "tech-stack-icons/coppelia.png",
        color:"hover:text-red-500"},
};


export default technologies;