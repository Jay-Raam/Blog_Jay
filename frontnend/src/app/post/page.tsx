import React from "react";
import BlogListItem from "@/components/BlogListItem";
import Navbar from "@/components/Navbar";

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  published?: Date;
  updated?: Date;
  url?: string;
  selfLink?: string;
  authorName: string;
  adminUrl?: string;
  adminImage?: string;
  displayName: string;
}

const BlogList = async () => {
  const response = await fetch("https://jay-blog-server.vercel.app/blogs", {
    cache: "force-cache",
  });
  const blogs: BlogPost[] = await response.json();

  return (
    <>
      <Navbar />
      <div className="blog-post mt-5 pb-4">
        {blogs.length > 0 && (
          <ul className="flex justify-center items-center gap-4 md:gap-2 max-w-[1550px] mx-auto my-0 flex-wrap mt-5">
            {blogs.map((blog) => (
              <BlogListItem key={blog._id} blog={blog} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BlogList;
