import { MoveRight } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

const Data = [
  {
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cae1ef208359979.66ed308883b08.jpeg",
    title: "என் ராட்சசி",
    link: "",
  },
  {
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f05c00201475293.667516935c970.jpg",
    title: "பயணம் ஆண்டிபட்டி - கோழிப்பண்ணை",
    link: "",
  },
  {
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a96aa0208339993.66eccacd48645.jpg",
    title: "என் கொள்கை",
    link: "",
  },
];

const Hero: React.FC = () => {
  const FirstElement = Data[0];

  return (
    <div className="hero max-w-[1550px] mx-auto flex justify-evenly items-center gap-4 flex-col md:flex-row">
      <div
        className="image flex justify-between items-start gap-10 flex-col h-[300px] md:h-[600px] w-[280px] md:w-1/2 lg:mt-[17px]"
        style={{
          backgroundImage: `url(${FirstElement.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-black bg-white px-10 py-4 md:px-20 md:py-8 rounded-br-lg">
          {FirstElement.title}
        </div>
        <div className="button w-full">
          <Link href={FirstElement.link}>
            <button
              type="button"
              className="float-end bg-white dark:bg-black dark:text-white rounded-full p-5 mb-5 mr-11"
            >
              <Magnetic>
                <MoveRight />
              </Magnetic>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 flex-col w-full md:w-1/2">
        {Data.slice(1).map((item, index) => (
          <div
            key={index}
            className="image-2 flex justify-between items-start gap-10 flex-col h-[300px] w-[280px] md:w-full"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-black bg-white px-10 py-4 md:px-20 md:py-8 rounded-br-lg">
              {item.title}
            </div>
            <div className="button w-full">
              <Link href={item.link}>
                <button
                  type="button"
                  className="float-end bg-white dark:bg-black dark:text-white rounded-full p-5 mb-5 mr-11"
                >
                  <Magnetic>
                    <MoveRight />
                  </Magnetic>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
