"use client";

import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [labels, setLabels] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("labels", labels);

    try {
      const response = await axios.post(
        "https://jay-blog-server.vercel.app/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseMessage(`Post created: ${response.data.title}`);
      // Reset fields after successful submission
      setTitle("");
      setContent("");
      setLabels("");
    } catch (error: any) {
      setResponseMessage(
        error.response?.data?.message || "Error creating post"
      );
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-5">Create a New Blog Post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[300px] md:w-[500px] lg:w-[800px] max-w-[800px] mx-auto my-0"
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border-red-500 outline"
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="border-red-500 outline"
        ></textarea>

        <label htmlFor="labels">Labels (comma-separated):</label>
        <input
          type="text"
          id="labels"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
          required
          className="border-red-500 outline"
        />

        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreatePost;
