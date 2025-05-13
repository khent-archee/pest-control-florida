"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, InfoIcon } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const daysOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const disclaimerText = "";
function normalizeTimePart(part: string, fallbackPeriod?: string): string {
  let cleaned = part
    .replace(/\u202F|\u00A0/g, " ")
    .replace(/[–—−]/g, "-")
    .trim();

  if (!/(AM|PM)$/i.test(cleaned) && fallbackPeriod) {
    cleaned += fallbackPeriod;
  }

  return cleaned;
}

function parseTime(timeStr: string): number {
  const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s?(AM|PM)/i);
  if (!match) return -1;
  let [_, h, m = "00", period] = match;
  let hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

export default function HoursOpenCard({
  working_hours,
}: {
  working_hours: Record<string, string>;
}) {
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    isOpen: boolean;
    label: string;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const todayIndex = now.getDay(); // 0 (Sun) to 6 (Sat)
    const today = daysOrder[todayIndex === 0 ? 6 : todayIndex - 1];
    setCurrentDay(today);

    const todayHours = working_hours[today];
    if (!todayHours || todayHours.toLowerCase().includes("closed")) {
      setStatus({ isOpen: false, label: "Closed now" });
      return;
    }

    const cleanedHours = todayHours
      .replace(/\u202F|\u00A0/g, " ")
      .replace(/[–—−]/g, "-");

    const timeRanges = cleanedHours.split(",");
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let isOpen = false;

    for (const range of timeRanges) {
      const [rawStart, rawEnd] = range.split("-").map((s) => s.trim());

      const fallbackPeriod =
        rawEnd.match(/AM|PM/i)?.[0] || rawStart.match(/AM|PM/i)?.[0] || "";

      const start = parseTime(normalizeTimePart(rawStart, fallbackPeriod));
      const end = parseTime(normalizeTimePart(rawEnd, fallbackPeriod));

      if (
        start !== -1 &&
        end !== -1 &&
        currentMinutes >= start &&
        currentMinutes <= end
      ) {
        isOpen = true;
        break;
      }
    }

    setStatus({ isOpen, label: isOpen ? "Open now" : "Closed now" });
  }, [working_hours]);

  return (
    <Card className="overflow-hidden">
      <div className="w-full h-2 bg-secondary" />
      <CardHeader className="flex flex-row items-center space-x-2">
        <Clock className="h-5 w-5 text-primary translate-y-[2px]" />
        <CardTitle>Hours Open</CardTitle>
      </CardHeader>
      <CardContent>
        {currentDay && status && (
          <div className="mb-2 text-sm">
            <span
              className={`font-semibold flex items-center gap-1 ${
                status.isOpen ? "text-green-600" : "text-destructive"
              }`}
            >
              {status.label}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-2 text-sm">
          {daysOrder.map((day) => (
            <div key={day} className="flex justify-between">
              <span
                className={`font-medium ${day === currentDay ? "text-primary" : ""}`}
              >
                {day}
              </span>
              <span className={day === currentDay ? "text-primary" : ""}>
                {working_hours[day] || "Closed"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
