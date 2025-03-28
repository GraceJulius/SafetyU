"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AlertStatus({ latestAlert }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Status</CardTitle>
      </CardHeader>
      <CardContent>
        {latestAlert ? (
          <div>
            <p>Type: {latestAlert.type}</p>
            <p>Status: {latestAlert.status}</p>
            <p>Time: {new Date(latestAlert.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p>No alerts triggered yet.</p>
        )}
      </CardContent>
    </Card>
  );
}