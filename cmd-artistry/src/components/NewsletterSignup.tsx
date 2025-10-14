import React, { useState } from "react";
import { subscribeToNewsletter } from "../services/api";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Join My Newsletter</h3>
      <p className="text-pastel-beige mb-4">
        Get updates on new artwork, classes, and special events.
      </p>

      {status === "success" ? (
        <div className="p-3 bg-lime-100 text-lime-800 rounded-md font-bold">
          {message}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="px-4 py-2 rounded-md text-dark-charcoal focus:outline-none focus:ring-2 focus:ring-pastel-pink flex-grow"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-pastel-pink text-dark-charcoal font-bold py-2 px-6 rounded-md hover:bg-pastel-beige transition-colors duration-300 disabled:bg-gray-400"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && <p className="mt-2 text-red-400">{message}</p>}
    </div>
  );
};

export default NewsletterSignup;
