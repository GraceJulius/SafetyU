"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MotivationCard() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const staticQuotes = [
    { content: "You are stronger than you think.", author: "Unknown" },
    { content: "Your safety matters.", author: "Unknown" },
    { content: "Keep going, Queen.", author: "Unknown" },
    { content: "Your story isn't over yet.", author: "Unknown" },
  ];

  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://zenquotes.io/api/random");
      setQuote(res.data[0].q);
      setAuthor(res.data[0].a);
    } catch (err) {
      //console.error("Failed to fetch quote, using static one.");
      const random = staticQuotes[Math.floor(Math.random() * staticQuotes.length)];
      setQuote(random.content);
      setAuthor(random.author);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-pink-400 to-purple-500 text-white p-6 rounded-2xl shadow-lg text-center mt-6">
      <h2 className="text-xl font-bold mb-4">Motivation for You 💖</h2>
      <p className="italic text-lg mb-2">"{quote}"</p>
      <p className="text-sm">- {author}</p>
    </div>
  );
}
