import { useNavigate } from "react-router-dom";


export const NewBlog = () => {
    const navigate = useNavigate();
    return (<div className="w-full flex justify-center">
        <button
            onClick={() => navigate("/Blog/Create")}
            className="py-1 px-4 bg-[rgb(250,205,138)] text-2xl font-bold duration-1000 hover:cursor-pointer hover:bg-white">
            +
        </button>
    </div>)
}