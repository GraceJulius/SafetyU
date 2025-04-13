"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AlertHistory({ alerts }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Location</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {alerts.map((alert, index) => (
          <TableRow key={alert.id || index}>
            <TableCell>{alert.type}</TableCell>
            <TableCell>{alert.status}</TableCell>
            <TableCell>
              {alert.timestamp
                ? new Date(alert.timestamp).toLocaleString()
                : "No Timestamp"}
            </TableCell>
            <TableCell>
              {alert.locationUrl ? (
                <a
                  href={alert.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Map
                </a>
              ) : (
                <span className="text-gray-400">No location</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
