import { NextResponse } from "next/server";

// WhatsApp Sender Function using CallMeBot API
const sendWhatsappMessage = async (phone, message) => {
  try {
    const res = await fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${process.env.CALLMEBOT_API_KEY}`);
    const data = await res.text();
    console.log("WhatsApp API Response:", data);
  } catch (error) {
    console.error("WhatsApp API Error:", error);
  }
};

export async function POST(request) {
  const { type, contacts, location } = await request.json();

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Optional delay

  const locationUrl =
    location?.lat && location?.lng
      ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
      : "Location not available";

  const recipients = contacts.map((c) => c.name || c.email || c.phone).join(", ");

  const alert = {
    id: Math.random().toString(36).substring(2),
    timestamp: new Date().toISOString(),
    type,
    status: "sent",
    location,
    locationUrl,
    recipients,
    message: `🚨 SOS Alert: ${type.toUpperCase()}\nLocation: ${locationUrl}`,
  };

  // Send WhatsApp message to contacts with phone numbers
  const phoneContacts = contacts.filter((c) => c.phone);

  for (const contact of phoneContacts) {
    await sendWhatsappMessage(contact.phone, alert.message);
  }

  console.log("WhatsApp Message(s) sent successfully");

  return NextResponse.json(alert);
}
