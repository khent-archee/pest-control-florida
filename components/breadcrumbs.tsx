"use client";
import { capitalizeFirstLetter, convertHyphenToSpace } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BreadcrumbFooter() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null; // on home page, show nothing

  const city = segments[0];
  const idDirectory = segments.includes("pest-control");
  const directoryId = segments[2];

  return (
    <nav className="text-xs sm:text-sm text-center text-muted-foreground">
      <Link href="/" className="underline hover:text-primary">
        Home
      </Link>
      {city && idDirectory && (
        <>
          {" / "}
          <Link href={`/${city}`} className="underline text-muted-foreground">
            {capitalizeFirstLetter(convertHyphenToSpace(city))}
          </Link>
        </>
      )}

      {city && !idDirectory && (
        <>
          {" / "}
          <span className="text-muted-foreground">
            {capitalizeFirstLetter(convertHyphenToSpace(city))}
          </span>
        </>
      )}

      {idDirectory && (
        <>
          {" / "}
          <span className="text-muted-foreground">Pest Control</span>
        </>
      )}
      {idDirectory && directoryId && (
        <>
          {" / "}
          <span className="text-muted-foreground">{directoryId}</span>
        </>
      )}
    </nav>
  );
}
