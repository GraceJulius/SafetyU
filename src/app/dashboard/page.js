"use client";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import AlertStatus from "@/components/AlertStatus";
import AlertHistory from "@/components/AlertHistory";
//import { simulateThreatDetection } from "@/lib/mockAI";
import { useToast } from "@/components/ui/toast"; 

export default function Dashboard() {
  const [contacts, setContacts] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("contacts");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [alerts, setAlerts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const triggerAlert = useMutation({
    mutationFn: (type) =>
      axios
        .post("/api/alert", { type, contacts })
        .then((res) => res.data),
    onSuccess: (newAlert) => {
      setAlerts((prev) => [newAlert, ...prev]);
      toast({
        title: "Alert Triggered",
        description: `A ${newAlert.type} alert was sent to ${newAlert.recipients.join(", ")}.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send alert.",
        variant: "destructive",
      });
    },
  });

  const handleAddContact = (contact) => {
    if (editContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === editContact.id ? contact : c))
      );
      setEditContact(null);
    } else {
      setContacts((prev) => [...prev, contact]);
    }
  };

  const handleEditContact = (contact) => {
    setEditContact(contact);
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const simulateAutoAlert = () => {
    const threat = simulateThreatDetection();
    if (threat) {
      triggerAlert.mutate("auto");
    } else {
      toast({
        title: "No Threat Detected",
        description: "Simulated AI detection found no immediate threat.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Emergency Alert Dashboard</h1>

      {/* Contact Management */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Contacts</h2>
        <ContactForm
          onAddContact={handleAddContact}
          editContact={editContact}
          setEditContact={setEditContact}
        />
        {contacts.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className="flex justify-between items-center p-2 border rounded"
              >
                <span>
                  {contact.name} - {contact.phone} - {contact.email}
                </span>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditContact(contact)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No contacts added yet.</p>
        )}
      </div>

      {/* Alert Controls */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Trigger Alerts</h2>
        <Button
          onClick={() => triggerAlert.mutate("manual")}
          disabled={triggerAlert.isPending || contacts.length === 0}
        >
          Manual Alert
        </Button>
        <Button
          onClick={simulateAutoAlert}
          disabled={contacts.length === 0}
        >
          Simulate Auto Alert (AI Detection)
        </Button>
        {contacts.length === 0 && (
          <p className="text-red-500">
            Add at least one contact to trigger alerts.
          </p>
        )}
      </div>

      {/* Alert Status */}
      <AlertStatus latestAlert={alerts[0] || null} />

      {/* Alert History */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Alert History</h2>
        <AlertHistory alerts={alerts} />
      </div>
    </div>
  );
}