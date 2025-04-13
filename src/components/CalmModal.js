"use client";

export default function CalmModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-bold">Breathe In... Breathe Out...</h2>
        <p className="text-gray-700">You are safe. Help is on the way.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
