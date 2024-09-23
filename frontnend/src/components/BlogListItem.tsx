"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Image01 from "@/components/image/m (1).jpg";
import Image02 from "@/components/image/m (2).jpg";
import Image03 from "@/components/image/m (3).jpg";
import Image04 from "@/components/image/m (4).jpg";
import Image05 from "@/components/image/m (5).jpg";
import Image06 from "@/components/image/m (6).jpg";
import Image07 from "@/components/image/m (7).jpg";
import Image08 from "@/components/image/m (8).jpg";
import Image09 from "@/components/image/m (9).jpg";
import Image010 from "@/components/image/m (10).jpg";
import Image011 from "@/components/image/m (11).jpg";
import Image012 from "@/components/image/m (12).jpg";
import Image013 from "@/components/image/m (13).jpg";
import Image014 from "@/components/image/m (14).jpg";
import Image015 from "@/components/image/m (15).jpg";
import Image016 from "@/components/image/m (16).jpg";
import Image017 from "@/components/image/m (17).jpg";
import Image018 from "@/components/image/m (18).jpg";
import Image019 from "@/components/image/m (19).jpg";
import Image020 from "@/components/image/m (20).jpg";

const images = [
  Image01,
  Image02,
  Image03,
  Image04,
  Image05,
  Image06,
  Image07,
  Image08,
  Image09,
  Image010,
  Image011,
  Image012,
  Image013,
  Image014,
  Image015,
  Image016,
  Image017,
  Image018,
  Image019,
  Image020,
];

interface BlogListItemProps {
  blog: {
    _id: string;
    title: string;
    authorName?: string;
    displayName?: string;
  };
}

const BlogListItem: React.FC<BlogListItemProps> = ({ blog }) => {
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.includes(blog._id)) {
      favorites.push(blog._id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${blog.title} has been added to your favorites!`);
    } else {
      alert(`${blog.title} is already in your favorites.`);
    }
  };

  const imageSrc = images[Math.floor(Math.random() * images.length)];

  return (
    <li className="w-[300px] xl:w-[500px] flex justify-center items-center gap-2 flex-col h-auto text-center">
      <Link href={`/post/${blog._id}`}>
        <Image
          src={imageSrc}
          alt="blog post"
          style={{ objectFit: "cover" }}
          quality={100}
          className="w-[300px] h-auto md:w-[500px]"
          width={1000}
          height={1000}
        />
      </Link>
      <h2>{blog.title}</h2>
      <p>Author: {blog.authorName || blog.displayName}</p>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <Link href={`/post/${blog._id}`}>
          <button className="group flex items-center text-white px-2 py-1 rounded focus:outline-none focus:ring-2 transition">
            Read More
            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
              <MoveRight />
            </span>
          </button>
        </Link>
        <button
          onClick={handleFavorite}
          className="group flex items-center text-white px-2 py-1 rounded focus:outline-none focus:ring-2 transition"
        >
          Favourite
          <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
            <MoveRight />
          </span>
        </button>
      </div>
    </li>
  );
};

export default BlogListItem;
