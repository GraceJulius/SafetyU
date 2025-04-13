import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

let sensorData = [];
let currentIndex = 0;

// Load the dataset
const loadData = async () => {
  const filePath = path.join(process.cwd(), "data", "heart_disease_uci.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return new Promise((resolve, reject) => {
    parse(fileContent, { columns: true, skip_empty_lines: true }, (err, records) => {
      if (err) return reject(err);
      sensorData = records.map((record) => ({
        heartRate: parseFloat(record.thalach) || 0, // Maximum heart rate
        noiseLevel: Math.floor(Math.random() * 100), // Simulated noise level (0-100 dB)
      }));
      resolve();
    });
  });
};

// API handler to return the next sensor data point
export async function GET() {
  if (sensorData.length === 0) {
    await loadData();
  }
  const data = sensorData[currentIndex];
  currentIndex = (currentIndex + 1) % sensorData.length; // Cycle through the data

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}