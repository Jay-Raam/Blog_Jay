"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-2 text-black">Success</h2>
        <p className="mb-4 text-black">{message}</p>
        <Button
          onClick={onClose}
          className="py-2 px-4 bg-black text-white rounded hover:bg-transparent hover:text-black border border-black"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name as keyof FormData, value);
  };

  const validateField = (name: keyof FormData, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "name":
        if (value.trim().length < 3) {
          errorMessage = "Name must be at least 3 characters long";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorMessage = "Invalid email address";
        }
        break;
      case "message":
        if (value.trim() === "") {
          errorMessage = "Message is required";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("message", formData.message);

    if (Object.values(errors).some((error) => error !== "")) {
      console.error("Validation errors:", errors);
      return;
    }

    const json = JSON.stringify({
      ...formData,
      access_key: "88eeb5d1-5c86-48bf-bf34-b255452947af",
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Form submitted successfully:", data);
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
        setModalMessage("Your message has been sent successfully!");
        setIsModalOpen(true);
      } else {
        console.error("Error:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="flex justify-center w-full pb-5 sm:pb-0">
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          <div className="mb-6 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-transparent text-black dark:text-white border-gray-300 rounded-md focus:outline-none focus:border-black"
            />
            {errors.name && (
              <span className="text-red-600 text-sm mt-1">{errors.name}</span>
            )}
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-transparent border-gray-300 text-black dark:text-white rounded-md focus:outline-none focus:border-black"
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">{errors.email}</span>
            )}
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:border-black resize-none"
            ></textarea>
            {errors.message && (
              <span className="text-red-600 text-sm mt-1">
                {errors.message}
              </span>
            )}
          </div>
          <div className="flex justify-center items-center gap-4 md:gap-10">
            <Button
              type="submit"
              className="py-2 px-9 w-[140px] rounded-full bg-white text-black hover:text-white"
            >
              Submit
            </Button>
            <Button
              type="reset"
              className="py-2 px-9 w-[140px] rounded-full bg-white text-black hover:text-white"
              onClick={handleChangeReset}
            >
              Reset
            </Button>
          </div>
        </form>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          message={modalMessage}
        />
      </div>
    </>
  );
};

export default ContactForm;
