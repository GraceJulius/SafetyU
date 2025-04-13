"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import AlertStatus from "@/components/AlertStatus";
import AlertHistory from "@/components/AlertHistory";
import { useToast } from "@/components/ui/toast";
import CalmModal from "@/components/CalmModal"; 
import dynamic from 'next/dynamic';
import emailjs from "emailjs-com";
import MotivationCard from "@/components/MotivationCard";

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

function simulateThreatDetection() {
  return Math.random() < 0.5;
}

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState(null);
  const [showCalm, setShowCalm] = useState(false);
  const { toast } = useToast();

  const sendEmail = (alert) => {
    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        type: alert.type,
        timestamp: alert.timestamp,
        locationUrl: alert.locationUrl,
        recipients: alert.recipients,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      toast({ title: "Email Sent", description: "SOS alert was emailed successfully." });
    })
    .catch(() => {
      toast({ title: "Email Failed", description: "Could not send the SOS email.", variant: "destructive" });
    });
  };

  const triggerAlert = useMutation({
    mutationFn: async (type) => await axios.post("/api/alert", { type, contacts, location }).then(res => res.data),
    onSuccess: (newAlert) => {
      const alert = {
        id: Math.random().toString(36).substring(2),
        timestamp: new Date().toISOString(),
        type: newAlert.type,
        status: "sent",
        location: newAlert.location,
        locationUrl: newAlert.locationUrl,
        recipients: newAlert.recipients,
      };
      setAlerts((prev) => [alert, ...prev]);
      sendEmail(alert);
      toast({ title: "Alert Triggered", description: `A ${newAlert.type} alert was sent to ${newAlert.recipients}.` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to send alert.", variant: "destructive" });
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("contacts");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          speed: position.coords.speed,
          timestamp: new Date(position.timestamp).toLocaleString(),
        });
      },
      () => setLocationError("Unable to retrieve location. Please allow location access."),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Emergency Alert Dashboard</h1>

      {/* Contacts */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Manage Contacts</h2>
        <ContactForm onAddContact={(c) => {
          editContact ? setContacts(prev => prev.map(p => p.id === editContact.id ? c : p)) : setContacts(prev => [...prev, c]);
          setEditContact(null);
        }} editContact={editContact} setEditContact={setEditContact} />
        <ul className="mt-4 space-y-2">
          {contacts.length > 0 ? contacts.map((contact) => (
            <li key={contact.id} className="flex justify-between items-center p-2 border rounded">
              <span>{contact.name} - {contact.phone} - {contact.email}</span>
              <div>
                <Button variant="outline" size="sm" onClick={() => setEditContact(contact)} className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => setContacts(prev => prev.filter(c => c.id !== contact.id))}>Delete</Button>
              </div>
            </li>
          )) : <p className="mt-4">No contacts added yet.</p>}
        </ul>
      </section>

      {/* Location */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Current Location</h2>
        {locationError ? <p className="text-red-500">{locationError}</p> :
          location.lat && location.lng ?
            <div className="space-y-1">
              <p>Latitude: <strong>{location.lat}</strong></p>
              <p>Longitude: <strong>{location.lng}</strong></p>
              <p>Accuracy: <strong>{location.accuracy} meters</strong></p>
              <p>Speed: <strong>{location.speed || "Not moving"}</strong></p>
              <p>Last Updated: <strong>{location.timestamp}</strong></p>
            </div> :
            <p>Getting your location...</p>}
        {location.lat && location.lng && <Map lat={location.lat} lng={location.lng} />}
      </section>

      {/* Alert Controls */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Trigger Alerts</h2>
        <div className="space-x-4">
          <Button onClick={() => triggerAlert.mutate("manual")} disabled={triggerAlert.isPending || contacts.length === 0}>
            {triggerAlert.isPending ? "Sending..." : "Manual Alert"}
          </Button>
          <Button onClick={() => simulateThreatDetection() ? triggerAlert.mutate("auto") : toast({ title: "No Threat Detected" })} disabled={contacts.length === 0}>
            Simulate Auto Alert
          </Button>
        </div>
      </section>

      <AlertStatus latestAlert={alerts[0] || null} />

      <section>
        <h2 className="text-xl font-semibold mb-2">Alert History</h2>
        <AlertHistory alerts={alerts} />
      </section>

      {/* Motivational Card */}
      <MotivationCard />

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Quick Safety Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button onClick={() => setShowCalm(true)} className="bg-purple-500 text-white">Need to Calm Down?</Button>
          <a href="/fakecall" className="inline-block bg-green-500 text-white px-4 py-2 rounded text-center">Trigger Fake Call</a>
          <a href="/safetytips" className="inline-block bg-blue-500 text-white px-4 py-2 rounded text-center">View Safety Tips</a>
          <Button onClick={() => toast({ title: "Check-In Successful", description: "Your trusted contacts have been notified that you're safe." })} className="bg-green-500 text-white">Check-In Safe</Button>
          <a href="/resources" className="inline-block bg-yellow-500 text-white px-4 py-2 rounded text-center">Safety Resources</a>
        </div>
      </section>

      {/* Calm Modal */}
      {showCalm && <CalmModal onClose={() => setShowCalm(false)} />}

      {/* Floating Panic Button */}
      <Button onClick={() => triggerAlert.mutate("manual")} className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white px-5 py-5 rounded-full shadow-lg animate-pulse z-50" disabled={triggerAlert.isPending || contacts.length === 0}>
        🚨
      </Button>
    </div>
  );
}
