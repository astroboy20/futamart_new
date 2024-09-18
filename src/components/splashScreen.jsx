"use client"

import { Logo_Black } from "@/assets"
import { Typewriter } from "react-simple-typewriter"

const SplashScreen = ()=>{
    return(
        <div className="w-full h-[100dvh] flex items-center justify-center">
        <div className="flex flex-col text-center">
          <Logo_Black />
          <h1 className="text-[32px] font-[600]">
            {" "}
            <Typewriter
              words={["futamart"]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            {/* futamart */}
          </h1>
        </div>
      </div>
    )
}

export {SplashScreen}