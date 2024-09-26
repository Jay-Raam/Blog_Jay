import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { forwardRef } from "react";
import Magnetic from "@/components/Magnetic";

const Navbar = forwardRef(function index(props, ref: any) {
  return (
    <div className="Navbar-component">
      <div className={`mt-3 md:mt-8`}>
        <nav className="nav-items flex justify-evenly overflow-hidden items-center gap-10 md:gap-32 max-w-[800px] mx-auto my-0 rounded-full">
          <Magnetic>
            <Link href="/post">
              <h1 className="font-bold text-[16px] md:text-xl">Blog</h1>
            </Link>
          </Magnetic>
          <div className="logo mix-blend-difference z-50" ref={ref}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/">
                    <div className="">
                      <svg
                        className="w-[100px] h-[100px]"
                        viewBox="0 0 80 43.41602422464838"
                      >
                        <g
                          transform="translate(-0.0000034950150600198934, -8.737537650049734e-7) scale(3.6647889115754197)"
                          className="css-17ivn46"
                          fill="#000000"
                        >
                          <defs xmlns="http://www.w3.org/2000/svg"></defs>
                          <g xmlns="http://www.w3.org/2000/svg">
                            <path
                              className="fil0"
                              d="M20.3903 8.1099c2.2996,2.2533 1.3831,-1.6564 0.4062,-2.1933 -0.2226,-0.1223 -4.4787,-3.1748 -5.172,-3.6014 -0.1805,-0.6499 -0.6454,-1.6654 -0.8259,-2.3152 -0.1354,0.5506 0.0136,1.4667 -0.1218,2.0173 -5.6737,-1.2051 -11.5358,6.3283 -10.3981,1.8143 -1.5199,2.4016 0.4725,2.6871 2.5183,1.9225 -1.7225,1.2475 -3.2194,2.1002 -6.797,1.0291 4.3449,3.9315 9.7568,-0.208 10.9263,-2.207 -0.2501,1.749 -3.9167,4.3103 -6.0421,4.6856 2.5603,0.6584 4.7532,-0.3207 6.5429,1.5831 1.0332,0.3053 1.4593,0.4949 2.4099,1.0019 0.2693,-1.9146 0.0222,-1.536 1.4622,-2.8161 -1.019,-0.5823 -0.955,-0.7688 -1.1643,-1.8413 0.9472,2.0768 2.5001,1.1509 4.1159,0.704 0.8858,0.601 0.6684,0.7079 1.2997,1.5706 1.1419,0.295 0.8148,-0.5624 0.8398,-1.3541z"
                              fill="#ee129f"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <h1>Jayasriraam</h1>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Magnetic>
            <Link href="/favourite">
              <h1 className="font-bold text-[16px] md:text-xl">Favoutire</h1>
            </Link>
          </Magnetic>
        </nav>
      </div>
    </div>
  );
});

export default Navbar;
