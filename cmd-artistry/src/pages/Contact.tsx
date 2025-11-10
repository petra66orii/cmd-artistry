import React, { useState, useEffect } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import { Mail, Phone, MapPin } from "lucide-react";
import { Helmet } from "react-helmet";

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [service, setService] = useState("Select a service...");
  const [message, setMessage] = useState("");

  type SubmitStatus = "idle" | "submitting" | "success" | "error";
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        // This fetch call's only purpose is to hit the backend
        // and get the 'csrftoken' cookie set in the browser.
        await fetch("http://localhost:8000/api/get-csrf-token/", {
          // 'credentials: "include"' is ESSENTIAL for cross-origin cookies
          credentials: "include",
        });
      } catch (err) {
        console.error("Could not fetch CSRF token", err);
        // You could set an error state here if needed
      }
    };
    getCsrfToken();
  }, []);

  // Updated submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    setSubmitMessage("");

    // --- Get the CSRF token ---
    const csrftoken = getCookie("csrftoken");

    if (!csrftoken) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Could not verify security token. Please refresh the page and try again."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // --- Add the CSRF token to the request headers ---
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          subject,
          service,
          message,
        }),
      });

      if (!response.ok) {
        // Handle server errors (e.g., 500)
        throw new Error("A server error occurred. Please try again later.");
      }

      // --- Handle Success ---
      setSubmitStatus("success");
      setSubmitMessage("Thank you! Your message has been sent.");
      // Clear the form
      setName("");
      setEmail("");
      setSubject("");
      setService("Select a service...");
      setMessage("");
    } catch (err: any) {
      // --- Handle Fetch/Network Errors ---
      setSubmitStatus("error");
      setSubmitMessage(
        err.message || "An unknown error occurred. Please try again."
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-off-white via-pastel-pink/25 to-off-white min-h-screen">
      <Helmet>
        <title>Contact | CM Artistry</title>
        <meta
          name="description"
          content="Get in touch with CM Artistry to discuss your project. Let's create something beautiful together."
        />
      </Helmet>

      {/* 1. Animated Hero */}
      <div className="relative h-[22rem] overflow-hidden">
        <AnimatedBackground className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-dark-charcoal font-semibold uppercase tracking-[0.35em] text-xs md:text-sm mb-4 px-4 py-1 rounded-full">
            Let's create
          </span>
          <h1 className="text-5xl md:text-6xl font-cursive text-dark-charcoal">
            Get in Touch
          </h1>
        </div>
      </div>

      {/* 2. Overlapping Content Card */}
      <div className="relative z-10 container mx-auto p-4 md:p-8 -mt-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT COLUMN: Contact Info */}
            <div className="lg:w-1/3 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-dark-charcoal mb-4">
                  Contact Details
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Have a project in mind or just want to say hello? Send a
                  message or reach out via email.
                </p>
              </div>
              <div className="space-y-4">
                <a
                  href="mailto:carmeldeelyceramics@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <Mail className="w-6 h-6 text-pastel-pink" />
                  <span className="text-lg text-gray-700 group-hover:text-dark-charcoal transition-colors">
                    carmeldeelyceramics@gmail.com
                  </span>
                </a>
                <a
                  href="tel:+353123456789"
                  className="flex items-center gap-4 group"
                >
                  <Phone className="w-6 h-6 text-pastel-pink" />
                  <span className="text-lg text-gray-700 group-hover:text-dark-charcoal transition-colors">
                    +353 12 345 6789
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-pastel-pink" />
                  <span className="text-lg text-gray-700">Galway, Ireland</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-dark-charcoal mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-off-white/70 border border-pastel-pink/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-pink transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-dark-charcoal mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-off-white/70 border border-pastel-pink/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-pink transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-bold text-dark-charcoal mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-off-white/70 border border-pastel-pink/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-pink transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-transparent"
                  >
                    <option>Select a service...</option>
                    <option value="mural">Mural</option>
                    <option value="pottery">Pottery</option>
                    <option value="sign-writing">Sign Writing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-dark-charcoal mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-off-white/70 border border-pastel-pink/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-pink transition-all"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full bg-pastel-pink text-dark-charcoal font-bold py-3 px-8 rounded-lg text-lg hover:bg-pastel-beige transition-colors duration-300 shadow disabled:opacity-50 disabled:cursor-wait"
                  >
                    {submitStatus === "submitting"
                      ? "Sending..."
                      : "Send Message"}
                  </button>

                  {/* --- Success/Error Message Box --- */}
                  {submitStatus === "success" && (
                    <div className="mt-4 text-center text-green-700 font-semibold p-3 bg-green-100 rounded-lg">
                      {submitMessage}
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="mt-4 text-center text-red-700 font-semibold p-3 bg-red-100 rounded-lg">
                      {submitMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
