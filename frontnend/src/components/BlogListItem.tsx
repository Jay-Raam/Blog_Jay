"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

interface BlogListItemProps {
  blog: {
    _id: string;
    title: string;
    authorName?: string;
    displayName?: string;
  };
  imageUrl?: string; // Add imageUrl prop
}

const BlogListItem: React.FC<BlogListItemProps> = ({ blog, imageUrl }) => {
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

  return (
    <li className="w-[300px] xl:w-[500px] flex justify-center items-center gap-2 flex-col h-auto text-center">
      <Link href={`/post/${blog._id}`}>
        <Image
          src={imageUrl || ""}
          alt="blog post"
          style={{ objectFit: "cover" }}
          quality={100}
          className="w-[300px] h-auto md:w-[450px]"
          width={1000}
          height={1000}
        />
      </Link>
      <h2>{blog.title}</h2>
      <p>Author: {blog.authorName || blog.displayName}</p>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <Link href={`/post/${blog._id}`}>
          <button className="group flex items-center text-black dark:text-white px-2 py-1 rounded focus:outline-none focus:ring-2 transition">
            Read More
            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
              <MoveRight />
            </span>
          </button>
        </Link>
        <button
          onClick={handleFavorite}
          className="group flex items-center text-black dark:text-white px-2 py-1 rounded focus:outline-none focus:ring-2 transition"
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
