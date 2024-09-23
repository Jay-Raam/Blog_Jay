"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/dashboard/context/ContentProvider";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        // Use relative path to your API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (response.ok) {
        login(data);
        router.push("/dashboard");
      } else {
        setMessage(data || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login");
    }
  };

  return (
    <div className="container flex justify-center items-center gap-5 flex-col">
      <h2 className="mt-5 font-extrabold text-3xl">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-5 flex-col h-svh"
      >
        <div className="form-group flex justify-center items-center flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-red-600 outline"
          />
        </div>
        <div className="form-group flex justify-center items-center flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-red-600 outline"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div id="message">{message}</div>}
    </div>
  );
};

export default LoginPage;
