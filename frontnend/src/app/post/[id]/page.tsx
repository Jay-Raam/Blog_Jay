import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  published: string;
  updated: Date;
  url: string;
  selfLink: string;
  authorName: string;
  adminUrl: string;
  adminImage: string;
  displayName: string;
  adiminImage: string;
}

async function fetchBlogPost(id: string): Promise<BlogPost> {
  const res = await fetch(`http://localhost:3001/blogs/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Blog post not found");
  }

  return res.json();
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const blogPost = await fetchBlogPost(id);

    return (
      <div className="p-5 flex justify-center items-center gap-4 flex-col">
        <div className="flex justify-start relative right-16 md:right-[18rem] lg:right-[26rem] xl:right-[31rem] items-start flex-col">
          <Link href={`/post`} className="mb-3">
            <span className="mb-3">
              <MoveLeft />
            </span>
          </Link>
          <div className="flex items-center mb-4">
            {blogPost.adminImage && (
              <Image
                src={
                  blogPost.adminImage.startsWith("//")
                    ? `https:${blogPost.adminImage}`
                    : blogPost.adminImage
                }
                alt="Admin Avatar"
                width={200}
                height={200}
                className="w-[30px] h-[30px] rounded-full"
              />
            )}
            <Link href={blogPost.adminUrl}>
              <p className="ml-4">
                {blogPost.authorName || blogPost.displayName}
              </p>
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold">{blogPost.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
          className="mt-5 text-center"
        />
        <p className="mt-4">
          Published: {new Date(blogPost.published).toLocaleDateString()}
        </p>
        <Link href={blogPost.adminUrl} className="underline text-center">
          More Details
        </Link>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
