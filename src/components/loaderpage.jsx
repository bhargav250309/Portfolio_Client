import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import '../styles/loader.css'

function Loaderpage() {

  const helloArray = ['Hello', 'Bonjour', 'Ciao', 'おい', 'Olá', 'Hallå', 'Hallo', 'Guten tag', 'स्वागत हे'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // GSAP animation to shrink the loader from 100vh to 0 height after 3 seconds
    gsap.to(".loader", {
      height: 0,
      delay: 1.8,  // Wait for 3 seconds before animating the height
      duration: 1,
      ease: "power4.in",
    });

    // GSAP animation to fade out the loader after 3 seconds
    gsap.to(".loader h1", {
      opacity: 1,
      duration: 1,
      ease: "power1.out",
    });

    gsap.to(".loader h1", {
      opacity: 0,
      delay: 2.6,  // Wait for 3 seconds before fading out the text
      duration: 0.1,
      ease: "power1.out",
    });

    // Set a 1-second delay before starting the interval
    const initialDelayTimeout = setTimeout(() => {
      // Set interval to change the word in the list every 2.5 seconds, but only once
      const wordInterval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          if (prevIndex + 1 < helloArray.length) {
            return prevIndex + 1;
          } else {
            clearInterval(wordInterval);  // Clear the interval once the last word is displayed
            return prevIndex;  // Keep the last word
          }
        });
      }, 175); // 2.5 seconds interval

      // Cleanup the interval when the component unmounts
      return () => clearInterval(wordInterval);
    }, 200); // 1-second initial delay

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(initialDelayTimeout);

  }, []);

  return (
    <>
      <div className="loader">
        <h1><li>{helloArray[currentWordIndex]}</li></h1>
      </div>
    </>
  )
}

export default Loaderpage
