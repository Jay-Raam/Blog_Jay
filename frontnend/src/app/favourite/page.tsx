"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { shopifyImages } from "@/components/ui/image";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const FavoriteBlog = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<{ _id: string; title: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
    fetchBlogs(savedFavorites);
  }, []);

  const fetchBlogs = async (favoriteIds: string[]) => {
    if (favoriteIds.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const responses = await Promise.all(
        favoriteIds.map((id) =>
          fetch(`https://jay-blog-server.vercel.app/blogs/${id}`).then((res) =>
            res.json()
          )
        )
      );
      setBlogs(responses);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load blogs. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = (id: string, title: string) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    toast({
      title: "Removed from Favorites",
      description: `${title} has been removed from your favorites.`,
    });

    fetchBlogs(updatedFavorites);
  };

  return (
    <>
      <Navbar />
      <div className="favourite">
        {loading && (
          <div className="h-[100vh] flex justify-center items-center">
            Loading...
          </div>
        )}
        {blogs.length > 0 && (
          <ul className="flex justify-center items-center gap-4 md:gap-2 max-w-[1550px] mx-auto my-0 flex-wrap mt-5">
            {blogs.map((blog) => (
              <li
                key={blog._id}
                className="w-[300px] md:w-[500px] flex justify-center items-center gap-2 flex-col h-auto text-center"
              >
                <Link href={`/post/${blog._id}`}>
                  <Image
                    src={
                      shopifyImages[blogs.indexOf(blog) % shopifyImages.length]
                    }
                    alt={blog.title}
                    width={300}
                    height={600}
                    quality={100}
                    className="w-[300px] h-auto"
                  />
                </Link>
                <h2>{blog.title}</h2>
                {favorites.includes(blog._id) && (
                  <div className="buttons">
                    <button
                      onClick={() => handleFavorite(blog._id, blog.title)}
                      className="group flex items-center text-white px-2 py-1 rounded focus:outline-none focus:ring-2 transition"
                    >
                      Remove
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                        <MoveRight />
                      </span>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FavoriteBlog;
