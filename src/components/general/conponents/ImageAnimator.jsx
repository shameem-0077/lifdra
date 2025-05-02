import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function ImageAnimator({ src, alt }) {
    const containerRef = useRef(null);
    const fullScreenRef = useRef(null);
    const [isZoomed, setZoomed] = useState(false);

    const shrink = (e) => {
        setZoomed(false);
        const el = fullScreenRef.current;

        if (el) {
            // Remove cloned element from DOM after animation is over
            el.addEventListener("animationend", (e) => e.target.remove());

            // Trigger browser reflow to start animation using requestAnimationFrame
            requestAnimationFrame(() => {
                // Disable the animation temporarily
                el.style.animation = "none";

                // Force a reflow by accessing a layout property (e.g., offsetHeight)
                const offsetHeight = el.offsetHeight;

                // Re-enable the animation
                el.style.animation = "";

                // Start the animation by adding the class
                el.classList.add("shrink-down");
            });
        }
    };

    const handleCloseOnEscape = (e) => {
        if (e.key === "Escape") {
            shrink();
        }
    };

    const handleCloseOnScroll = () => {
        shrink();
    };

    const divRef = useRef(null);

    const toggleFullScreen = (e) => {
        setZoomed(true);
        // Get position values for element
        const { top, left, width, height } =
            divRef.current.getBoundingClientRect();

        // Clone the element and its children
        let fullScreen = divRef.current.cloneNode(true);

        // Set top, left, width, and height with custom properties
        fullScreen.style.setProperty("--top", `${top}px`);
        fullScreen.style.setProperty("--left", `${left}px`);
        fullScreen.style.setProperty("--width", `${width}px`);
        fullScreen.style.setProperty("--height", `${height}px`);

        // Add class with animation and position
        fullScreen.classList.add("full-screen");

        // Add event listeners for closing on "Escape" key and scrolling
        window.addEventListener("keydown", handleCloseOnEscape);
        window.addEventListener("wheel", handleCloseOnScroll);

        // Listen for click to close full screen
        fullScreen.addEventListener("click", shrink);

        fullScreenRef.current = fullScreen;

        // Place in container over element to expand
        containerRef.current.appendChild(fullScreen);
    };

    useEffect(() => {
        // Add click listeners on all boxes
        const boxes = containerRef.current.querySelectorAll(".box");
        boxes.forEach((box) => {
            box.addEventListener("click", toggleFullScreen);
        });

        // Cleanup event listeners when component unmounts
        return () => {
            boxes.forEach((box) => {
                box.removeEventListener("click", toggleFullScreen);
            });

            window.removeEventListener("keydown", handleCloseOnEscape);
            window.removeEventListener("scroll", handleCloseOnScroll);
        };
    }, []);

    return (
        <Container className="container" ref={containerRef}>
            {isZoomed && <div className="overlay"></div>}

            <div className="box" ref={divRef}>
                <img
                    src={
                        src
                            ? src
                            : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    }
                    alt={alt}
                />
            </div>
        </Container>
    );
}

const Container = styled.div`
    /* BEGIN ANIMATION STYLES */

    & .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 999;
    }

    .full-screen {
        position: fixed;
        animation: go-full-screen forwards 500ms ease-in-out;
        top: var(--top);
        left: var(--left);
        width: var(--width);
        height: var(--height);
        z-index: 1000;
        display: flex;
        align-items: center;
    }

    .shrink-down {
        animation: go-full-screen reverse backwards 500ms ease-in-out !important;
    }

    & .box {
        display: flex;
        align-items: center;
    }

    @keyframes go-full-screen {
        from {
            top: var(--top);
            left: var(--left);
            width: var(--width);
            height: var(--height);
        }
        to {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
`;

export default ImageAnimator;
