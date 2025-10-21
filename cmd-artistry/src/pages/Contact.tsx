import React, { useState } from "react";
import { submitContactForm, ContactFormData } from "../services/api";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");

    try {
      await submitContactForm(formData);
      setStatus("success");
      setFeedbackMessage("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (err: any) {
      setStatus("error");
      setFeedbackMessage(
        err.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-off-white via-pastel-pink/25 to-pastel-beige/20 min-h-screen py-16">
      <div className="container mx-auto max-w-2xl p-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-pastel-pink/40 text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
            Let's Collaborate
          </span>
          <h1 className="text-4xl md:text-5xl font-cursive text-dark-charcoal">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Have a project in mind or a question about my work? I'd love to hear
            from you.
          </p>
        </div>

        <div className="bg-off-white/90 backdrop-blur-sm border border-pastel-pink/40 p-8 rounded-2xl shadow-lg">
          {status === "success" ? (
            <div className="text-center p-4 bg-lime-100 text-lime-800 rounded-md">
              <p className="font-bold">Message Sent!</p>
              <p>{feedbackMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-dark-charcoal font-semibold mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-dark-charcoal font-semibold mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-dark-charcoal font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-pastel-pink text-dark-charcoal font-bold py-3 px-8 rounded text-lg hover:bg-pastel-beige transition-colors duration-300 disabled:bg-gray-400"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </div>

              {status === "error" && (
                <div className="mt-4 text-center text-red-600 font-bold">
                  {feedbackMessage}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
