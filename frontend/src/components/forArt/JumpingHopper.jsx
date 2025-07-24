import React, { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { useMotionValueEvent, useTransform, useScroll } from "framer-motion";

const JumpingHopper = (props) => {
    const canvaRef = useRef(null);
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
    const [renderAnimation, setRenderAnimation] = useState(true);
    const [isScrolled, setScrolled] = useState(false);
    const [canvasReady, setCanvasReady] = useState(false);
    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [vhScrolled, setVhScrolled] = useState(false);
    const allowScrollUp = useRef(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const canvas = canvaRef.current;
        if(!canvas) return;


        const resizeCanvas = () => {
            

            if(!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = (rect.width) * dpr;
            canvas.height = (rect.height) * dpr;
            canvas.style.width = `${rect.width}px`; // *2.2505
            canvas.style.height = `${rect.height}px`; // *2.005

            const ctx = canvas.getContext("2d");

            if (ctx) {
                console.log("Ctx visible!")
                ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
                ctx.scale(1, 1); // scale context to account for DPR

                let img = new Image();
                img.src = `art/frames/1.webp`;
                
                cropCanvas(img);
            }
        };

        resizeCanvas(); // set initially
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
        
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;

            let isScrolledUp = scrollY < lastScrollY.current;

            if(!isScrolled) setScrolled(true);

            if(scrollY >= 4 * vh && renderAnimation) {
                setRenderAnimation(false);
                if(!allowScrollUp.current) allowScrollUp.current = true;
            }
            if(!vhScrolled && scrollY >= (3 * vh)) {
                setVhScrolled(true);
            }
            if(!allowScrollUp.current && isScrolledUp){
                window.scrollTo(0, lastScrollY.current);
            } else {
                lastScrollY.current = scrollY
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    const cropCanvas = (img) => {
        
        const canvas = canvaRef.current;

        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = img.width / img.height
        const ctx = canvas?.getContext("2d");
        let sx = 0, sy = 0, sw = img.width, sh = img.height

        if(imageAspect > canvasAspect) {
            sw = img.height * canvasAspect;
            sx = (img.width - sw) / 2 ;
        } else {
            sh = img.width / canvasAspect;
            sy = (img.height - sh) / 2;
        }

        if (canvas && ctx) {
            const rect = canvas.getBoundingClientRect()

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
            // if(index === 145) props.scrollToUnderwaterDiv(); This logic is causing issues for now. It sends to the end of the page
            if (!canvasReady) setCanvasReady(true);
        }
    }

    useEffect(() => {
            const loadedImages = [];
            let loadedCount = 0;

            for (let i = 1; i <= 179; i++) {
                const img = new Image();
                img.src = `art/frames/${i}.webp`;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === 179) {
                        setImagesLoaded(true);
                        setImages(loadedImages);
                    }
                };
                img.onerror = () => {
                    console.warn(`Failed to load frame ${i}`);
                    loadedCount++;
                    if (loadedCount === 179) {
                        setImagesLoaded(true);
                        setImages(loadedImages);
                    }
                };
                loadedImages.push(img);
            }
        }, []);

    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 179]);

    const render = useCallback(
        (index) => {

            if (!imagesLoaded) return;
            
            const img = images[index - 1];
            if(index === 145) props.setScrollToUnderwater(true);
            cropCanvas(img)
        },
        [images, imagesLoaded, canvasReady]
    );


    const getNonAnimationElement = (backgroundName = "wheedit-empty.jpg") => {

        return backgroundName.includes("empty") ? 
        <div
        style={{backgroundImage: `url(${backgroundName})`, 
                //display: !renderAnimation ? "flex" : "hidden",
                backgroundSize: "cover",
                backgroundPositionX: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "51.25vw",
                minHeight: "782px",
                overflow: "hidden",
                }}/>         
        :
        <div
        style={{backgroundImage: `url(${backgroundName})`, 
          display: renderAnimation ? "none" : "none", 
          backgroundSize: "contain",
          width: "100%",
          minWidth: "1536px",
          minHeight: "51.25vw",
          overflow: "hidden"}}/>
    }

    useMotionValueEvent(currentIndex, "change", (latest) => {
        const startingFrame = 34.01528617134731;
        render(Math.round(latest - startingFrame));
    });


   return (
    <>
        { renderAnimation && (
            <div ref={scrollRef} className="relative w-full h-[300vh] z-1 overflow-hidden">
                {/* { (!vhScrolled || !canvasReady) && imagesLoaded && getNonAnimationElement("wheedit_jpg.jpg") } */}
                <canvas ref={canvaRef} className="w-full h-full min-h-160 object-cover object-center lg:object-top pointer-events-none z-0 overflow-hidden"
                style={{
                    position: vhScrolled ? "sticky" : "fixed"
                }}/>
            </div>
        )}

        {getNonAnimationElement()}
    </>
);
};

export default JumpingHopper;
