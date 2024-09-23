import { Instagram, Linkedin, LucideGithub, Rss, Twitter } from "lucide-react";
import Link from "next/link";
import SparklesText from "./ui/Magicspark";
import { DarkModeButton } from "./DarkModeButton";

export default function Footer() {
  return (
    <>
      <footer className="max-w-[1550px] mx-auto my-0 flex justify-center items-center flex-col lg:flex-row text-white bg-[#84cc16] h-auto lg:h-[250px] p-10 gap-20 mt-9">
        <div className="flex justify-center items-center gap-4 w-full lg:w-1/3">
          <SparklesText text="JAYASRIRAAM" />
        </div>
        <div className="flex justify-center items-center gap-4 flex-col w-full lg:w-1/3">
          <Link href="/post">Blog</Link>
          <Link href="/favotire">favotire</Link>
        </div>
        <div className="flex justify-center items-center gap-4 flex-col w-full lg:w-1/3">
          <div className="flex justify-center items-center gap-4">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/jayasriraam"
            >
              <span className="text-sm">
                <Linkedin />
              </span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/_ivanjay_/"
            >
              <span className="text-sm">
                <Instagram />
              </span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://jayasriraam.blogspot.com/"
            >
              <span className="text-sm">
                <Rss />
              </span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/ivan_jayram"
            >
              <span className="text-sm">
                <Twitter />
              </span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Jay-Raam/"
            >
              <span className="text-sm">
                <LucideGithub />
              </span>
            </Link>
          </div>
          <div className="darkmode">
            <DarkModeButton />
          </div>
        </div>
      </footer>
      <div className="copyright p-4 text-white bg-black text-center text-[13px]">
        <p>
          © 2024
          <Link
            className="ml-1"
            href="https://jayasriraam.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jayasriraam
          </Link>
          . All rights reserved.
        </p>
      </div>
    </>
  );
}
