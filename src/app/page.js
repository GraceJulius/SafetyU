import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light to-brand-pink py-16 text-center rounded-b-xl shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-brand-dark">
            Welcome to SafetyU
          </h1>
          <p className="text-lg mb-6 text-brand-dark/80">
            A web app designed to enhance personal safety through real-time monitoring, automated distress detection, and emergency alerts.
          </p>
          <Link href="/dashboard">
            <Button className="bg-brand-purple text-pink px-6 py-3 rounded-xl hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-pink/50 transition">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8 text-brand-dark">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-brand-pink rounded-xl shadow-sm bg-white">
              <h3 className="text-xl font-semibold mb-2 text-brand-dark">Contact Management</h3>
              <p>Add, edit, and delete emergency contacts to ensure help is always a click away.</p>
            </div>
            <div className="p-6 border border-brand-pink rounded-xl shadow-sm bg-white">
              <h3 className="text-xl font-semibold mb-2 text-brand-dark">AI Threat Detection</h3>
              <p>Simulate AI-driven detection of potential threats using mock sensor data.</p>
            </div>
            <div className="p-6 border border-brand-pink rounded-xl shadow-sm bg-white">
              <h3 className="text-xl font-semibold mb-2 text-brand-dark">Emergency Alerts</h3>
              <p>Trigger manual or automated alerts to notify your contacts instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-purple text-pink py-6 mt-auto rounded-t-xl">
        <div className="container mx-auto px-4 text-center">
          <p>SafetyU - A project for Spring 2025 Internship by Grace.</p>
          <p className="mt-2">Contact: juliusgrace65@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
