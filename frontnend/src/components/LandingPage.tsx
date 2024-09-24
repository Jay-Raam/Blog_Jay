"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import StickyCursor from "@/components/StickyCursor";
import { useRef } from "react";
import DailyChart from "./DailyChart";
import Hero from "./hero";
import HeroVideoDialog from "./ui/VideoIn";
import Image from "next/image";
import Image000001 from "@/components/image/m1.png";
import Image000002 from "@/components/image/m2.png";
import Image000003 from "@/components/image/m3.png";
import Image000004 from "@/components/image/m4.png";
import Image000005 from "@/components/image/m5.png";
import Image000006 from "@/components/image/m6.jpg";
import Image000007 from "@/components/image/m7.png";
import ContactForm from "./ui/contact";
import { Button } from "./ui/button";
import Footer from "./footer";

const CommingSoon = [
  {
    image: Image000001,
    title: "காதல்",
    link: false,
    id: 1,
  },
  {
    image: Image000002,
    title: "Cybersecurity in a Digital World: The New Challenges and Solutions",
    link: false,
    id: 2,
  },
  {
    image: Image000003,
    title: "Using Next.js with Headless CMS: A Perfect Match",
    link: false,
    id: 3,
  },
  {
    image: Image000004,
    title: "Next.js Middleware: Enhancing Your Application's Functionality",
    link: false,
    id: 4,
  },
  {
    image: Image000005,
    title: "How AI is Revolutionizing Industries: Trends and Predictions",
    link: false,
    id: 5,
  },
  {
    image: Image000006,
    title: "5G and Beyond: Transforming Connectivity in the Digital Age",
    link: false,
    id: 6,
  },
  {
    image: Image000007,
    title: "Communism",
    link: false,
    id: 1,
  },
];

export default async function LandingPage() {
  const stickyElement = useRef(null);

  return (
    <>
      <Navbar ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
      <main>
        <Hero />

        <div className="details flex justify-center items-center flex-col lg:flex-row gap-3 max-w-[1200px] mx-auto my-0 mt-5">
          <div className="me flex justify-center items-start flex-col gap-3">
            <h1 className="text-3xl text-left underline-after font-bold">
              About Me
            </h1>
            <p className="text-[1rem] text-center lg:text-left">
              Hi, I&apos;m Jayasriraam, based in Chennai. I completed my studies
              at GTN Arts College in 2023. This extensive movie-watching habit
              fuels my enthusiasm and influences my personal growth, and I
              continue to write blogs about my experiences for this world.
            </p>
            <p className="text-[1rem] text-center lg:text-left">
              When I&apos;m not writing, you can find me hiking through nature
              trails, getting lost in a good book, or experimenting in the
              kitchen with new recipes, or expressing love or what I feel. I
              believe that every moment holds a story, and I&apos;m excited to
              share mine with you while learning about yours too.
            </p>
            <p className="text-[1rem] text-center lg:text-left">
              What film/blog has touched your heart recently? Share your
              thoughts in my Mail
            </p>
            <Button variant={"ghost"} className="mx-auto my-0 mt-4">
              <Link
                href="mailto:jayasriraam27@gmail.com"
                className="text-center"
              >
                Jayasriraam27@gmail.com
              </Link>
            </Button>
          </div>
          <div className="chart">
            <DailyChart />
          </div>
        </div>

        <div className="video-message max-w-[800px] mx-auto my-0 h-svh flex justify-center items-center flex-col">
          <h1 className="text-center mt-5 mb-5 text-[30px] font-bold">
            Thinking for Writing
          </h1>
          <div className="relative">
            <HeroVideoDialog
              className="dark:hidden block"
              animationStyle="from-center"
              videoSrc="https://www-ccv.adobe.io/v1/player/ccv/AEHhRg54tw5/embed?api_key=behance1&bgcolor=%23191919"
              thumbnailSrc="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6a67f1208546921.66f1059d85a87.jpg"
              thumbnailAlt="Hero Video"
            />
            <HeroVideoDialog
              className="hidden dark:block"
              animationStyle="from-center"
              videoSrc="https://www-ccv.adobe.io/v1/player/ccv/AEHhRg54tw5/embed?api_key=behance1&bgcolor=%23191919"
              thumbnailSrc="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6a67f1208546921.66f1059d85a87.jpg"
              thumbnailAlt="Hero Video"
            />
          </div>
        </div>

        <div className="comming-soon mt-5 max-w-[1220px] mx-auto my-0">
          <div className="container flex justify-center items-center gap-5 flex-col mx-auto my-0">
            <h1 className="text-center mt-5 mb-5 text-[30px] font-bold">
              Coming Soon
            </h1>
            <div className="flex flex-wrap justify-evenly items-center gap-5">
              {CommingSoon.map((item) => (
                <div
                  className="flex flex-col items-center gap-4 w-[280px] md:w-[300px] text-center"
                  key={item.id}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1000}
                    height={1000}
                    quality={100}
                    className="w-full h-auto rounded-xl hover:scale-105"
                  />
                  <p className="text-[1rem]">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="contact text-black dark:text-white max-w-[800px] mx-auto my-0 mt-10 h-svh flex justify-center items-center flex-col">
          <h2 className="text-center mt-5 mb-5 text-[30px] font-bold">
            Contact Us
          </h2>
          <p className="mb-6 text-center">
            If you have any questions, suggestions, or feedback, we&apos;d love
            to hear from you. Reach out to us using the contact form below.
          </p>
          <ContactForm />
        </section>

        <div className="footer">
          <Footer />
        </div>
      </main>
    </>
  );
}
