"use client";

export default function ResourcesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Safety Resources</h1>
      <ul className="list-disc list-inside space-y-2">
        <li><a className="text-blue-500 underline" href="https://www.thehotline.org/" target="_blank">National Domestic Violence Hotline</a></li>
        <li><a className="text-blue-500 underline" href="tel:911">Call 911 - Emergency</a></li>
        <li><a className="text-blue-500 underline" href="https://police.uc.edu/safety.html" target="_blank">Campus Safety Tips</a></li>
        <li><a className="text-blue-500 underline" href="https://rainn.org/" target="_blank">RAINN - Sexual Assault Support</a></li>
      </ul>
    </div>
  );
}
