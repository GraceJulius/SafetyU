"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FakeCallPage() {
  const router = useRouter();

  useEffect(() => {
    // Play ringtone sound
    const audio = new Audio('/ringtone.mp3');
    audio.loop = true; // Loop ringtone until answered or declined
    audio.play();

    // Auto return to dashboard after 15 seconds
    const timer = setTimeout(() => {
      audio.pause();
      router.push("/dashboard");
    }, 15000); // 15 seconds

    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, []);

  const handleAnswer = () => {
    alert("Mom: Hey! Where are you? I’m coming to get you.");
  };

  const handleDecline = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl mb-6 animate-pulse">Incoming Call...</h1>

      <div className="mb-10">
        <p className="text-lg font-semibold">Mom ❤️</p>
      </div>

      <div className="flex space-x-10">
        <button
          onClick={handleAnswer}
          className="bg-green-500 p-4 rounded-full"
        >
          Answer
        </button>

        <button
          onClick={handleDecline}
          className="bg-red-500 p-4 rounded-full"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
