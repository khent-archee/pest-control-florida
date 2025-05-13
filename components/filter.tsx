"use client";

import Link from "next/link";
import { StyledBadge } from "./ui/badge";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { features } from "@/app/constant";
import { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
  convertHyphenToUnderscore,
  convertUnderscoreToHyphen,
} from "@/lib/utils";

const getName = (label: string): string =>
  ({
    Price: "Affordable Prices",
    Parking: "With Parking",
    Discounts: "Great Discounts",
  })[label] || label;

export default function DirectoryFilters({
  city,
  filter,
}: {
  city: string;
  filter: string;
}) {
  const processedFilter = convertHyphenToUnderscore(filter);
  const scrollRef = useRef<HTMLDivElement>(null);
  const leftBtnRef = useRef<HTMLButtonElement>(null);
  const rightBtnRef = useRef<HTMLButtonElement>(null);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el || !leftBtnRef.current || !rightBtnRef.current) return;

    // Show/hide left button
    if (el.scrollLeft > 0) {
      leftBtnRef.current.style.display = "inline-flex";
    } else {
      leftBtnRef.current.style.display = "none";
    }

    // Show/hide right button
    if (el.scrollLeft + el.clientWidth < el.scrollWidth - 1) {
      rightBtnRef.current.style.display = "inline-flex";
    } else {
      rightBtnRef.current.style.display = "none";
    }
  };

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-col items-center md:items-start">
        <span className="font-semibold">Filter by tags:</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          ref={leftBtnRef}
          variant="link"
          onClick={() => scroll(-400)}
          className="hidden sm:inline-flex"
        >
          <ArrowLeft />
        </Button>
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden gap-2 w-full px-1"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start sm:flex-nowrap w-max gap-2">
            {[...features]
              .sort((a) => (a.key === processedFilter ? -1 : 1))
              .map((item, idx) => {
                const isActive = processedFilter === item.key;
                const href = isActive
                  ? `/${city}`
                  : `/${city}/filter/${convertUnderscoreToHyphen(item.key)}`;

                return (
                  <div
                    key={idx}
                    className="whitespace-nowrap scroll-snap-align-start flex-shrink-0"
                  >
                    <Link href={href}>
                      <StyledBadge
                        variant={isActive ? "default" : "default_light"}
                      >
                        <span className="text-sm">{getName(item.label)}</span>
                        {isActive && <X className="ml-1 w-3 h-3" />}
                      </StyledBadge>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>

        <Button
          ref={rightBtnRef}
          onClick={() => scroll(400)}
          variant="link"
          className="hidden sm:inline-flex"
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
