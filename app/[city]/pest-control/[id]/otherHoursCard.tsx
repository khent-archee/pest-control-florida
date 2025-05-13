import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const daysOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Normalize and parse time to 24hr float (e.g., 11:30AM => 11.5)
// function parseTime(timeStr: string): number {
//   console.log(timeStr);
//   const cleaned = timeStr
//     .replace(/\u202F|\u00A0/g, " ") // narrow and non-breaking space
//     .trim();

//   const match = cleaned.match(/(\d{1,2})(?::(\d{2}))?\s?(AM|PM)/i);
//   if (!match) return -1;

//   let [_, h, m = "00", period] = match;
//   let hour = parseInt(h, 10);
//   const minute = parseInt(m, 10);

//   if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
//   if (period.toUpperCase() === "AM" && hour === 12) hour = 0;

//   return hour + minute / 60;
// }

// function isOpenNow(todayHours: string): boolean {
//   if (!todayHours || todayHours.toLowerCase().includes("closed")) return false;

//   const now = new Date();
//   const current = now.getHours() + now.getMinutes() / 60;

//   const cleaned = todayHours
//     .replace(/\u202F|\u00A0/g, " ") // normalize spaces
//     .replace(/[–—−]/g, "-"); // normalize various dashes to hyphen

//   const ranges = cleaned.split(",");

//   for (const range of ranges) {
//     const [startRaw, endRaw] = range
//       .split("-")
//       .map((part) => part.trim().replace(/\u202F|\u00A0/g, " "));

//     const start = parseTime(startRaw);
//     const end = parseTime(endRaw);

//     if (start !== -1 && end !== -1 && current >= start && current <= end) {
//       return true;
//     }
//   }

//   return false;
// }

export default function ServiceHoursCard({
  other_hours,
}: {
  other_hours: { [key: string]: { [key: string]: string } }[];
}) {
  const today =
    daysOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div className="flex flex-col gap-2 w-full">
      {other_hours.slice(0, 1).map((item, index) => {
        const [type, hours] = Object.entries(item)[0];
        return (
          <Card className="overflow-hidden md:mx-0" key={index}>
            <div className="w-full h-2 bg-secondary " />
            <CardHeader className="flex flex-row items-center space-x-2">
              <Clock className="h-5 w-5 text-primary translate-y-[2px]" />
              <CardTitle className="capitalize">
                {type.replace("_", " ")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm">
                <span>&nbsp;</span>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {daysOrder.map((day) => (
                  <div key={day} className="flex justify-between">
                    <span
                      className={`font-medium ${day === today ? "text-primary" : ""}`}
                    >
                      {day}
                    </span>
                    <span className={day === today ? "text-primary" : ""}>
                      {hours[day] || "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
