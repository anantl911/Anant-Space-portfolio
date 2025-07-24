import { Component } from "react";


class Footer extends Component{
    render(){
        return(
        <footer className="z-50">
            <div id="footer-container" className="min-h-[80px] bg-black w-full pt-12 pb-4 select-none">
                <div>
                    <div id="contact-header" className="flex justify-center">
                        <h2 className="text-[#facd8a] text-[clamp(24px,2.4vw,30px)]">Let<span className="border-b-2 border-[#facd8a] pb-4">'s ta</span>lk!</h2>
                    </div>

                    <div id="contact-form" className="flex flex-col items-center my-20">
                        <div id="email-name-inputs" className="flex gap-20">
                            <input type="text" className="bg-black  w-[31vw]  text-white border-b-2 border-[#facd8a] outline-none text-[clamp(13px,1.2vw,16px)] pb-4 px-2" placeholder="Name"/>
                             <input type="email" className="bg-black  w-[31vw] text-white border-b-2 border-[#facd8a] outline-none text-[clamp(13px,1.2vw,16px)] pb-4 px-2" placeholder="Email"/>
                        </div>

                        <div id="message-input" className="flex gap-20 my-20">
                            <textarea className="bg-black  w-[68vw]  text-white border-b-2 border-[#facd8a] outline-none text-[clamp(13px,1.2vw,16px)] min-h-15 pb-4 px-2" placeholder="Got ideas worth working on? Here to suggest me good game, book, movie or a play? Go ahead :)"/>
                        </div>

                        <div>
                            <button id="send-contact-btn" className="bg-[rgb(250,205,138)] text-black text-[1.4vw] py-1 px-4 hover:cursor-pointer hover:bg-white transition duration-500">Send</button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <p className="text-white text-[clamp(6px,0.9vw,20px)] italic w-[70%] pt-4 text-center border-t-1 border-gray-500">In loving memory of Manjima didi. A beautiful mind. 💫🦋</p>
                </div>
            </div>
        </footer>
        );
    };
};

export default Footer;