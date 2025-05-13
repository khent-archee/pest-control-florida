"use client";
import { DB_NAME, DB_STATE, PLURAL_DIRECTORY_TYPE } from "@/app/constant";
import { SearchIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Search({ search }: { search?: string }) {
  const router = useRouter();
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to manage popover visibility
  const popoverRef = useRef<HTMLDivElement | null>(null); // Ref for the popover element with type

  useEffect(() => {
    const fetchZipCodes = async () => {
      setIsLoading(true); // Set loading to true when fetching starts
      const supabase = await createClient();
      const { data, error } = await supabase
        .from(DB_NAME)
        .select("postal_code")
        .ilike("postal_code", `${searchTerm}%`)
        .filter("us_state", "ilike", DB_STATE)
        .limit(10);

      if (error) {
        console.error(error);
      } else {
        const uniqueZipCodes = Array.from(
          new Set(data?.map((item) => item.postal_code) || [])
        );
        setZipCodes(uniqueZipCodes);
      }
      setIsLoading(false); // Set loading to false when fetching ends
    };

    if (searchTerm.length === 0) {
      setZipCodes([]);
      setIsLoading(false); // Ensure loading is false when search term is empty
    } else fetchZipCodes();
  }, [searchTerm]);

  // Function to handle click outside the popover
  const handleOutsideClick = (e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setIsPopoverOpen(false);
    }
  };

  // Add event listener for click outside
  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopoverOpen]);

  return (
    <div className="flex flex-col mb-[-20px] gap-2 relative">
      {/* <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-left">
        Best {PLURAL_DIRECTORY_TYPE} in Popular Cities
      </h2> */}
      <div className="flex items-center justify-center gap-4 rounded-md">
        <div className="relative w-full md:w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${PLURAL_DIRECTORY_TYPE} by Zip Code`}
            className="w-full py-4 pl-6 sm:pl-12 pr-20 text-base md:text-lg text-gray-700 bg-white bg-clip-padding border border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-dark focus:outline-none"
            onClick={() => setIsPopoverOpen(true)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && searchTerm.length > 0) {
                router.push(`/zip-code/?search=${searchTerm}`);
                setIsPopoverOpen(false);
              }
            }}
          />
          <button
            className="absolute right-2 top-2 sm:top-[9px] flex flex-row items-center gap-2 text-white bg-secondary border-0 py-2 px-4 focus:outline-none hover:bg-secondary/50 disabled:bg-secondary/250 rounded-full text-xl"
            onClick={() => {
              router.push(`/zip-code/?search=${searchTerm}`);
              setIsPopoverOpen(false);
            }}
            disabled={!searchTerm}
          >
            <SearchIcon />
            <p className="hidden sm:block">Search</p>
          </button>
          {((zipCodes.length > 0 && !isLoading) || isLoading) &&
            isPopoverOpen && (
              <div
                ref={popoverRef}
                className="absolute top-15 left-0 w-full bg-white shadow-md p-4 z-50"
              >
                {isLoading ? (
                  <p>loading...</p>
                ) : (
                  zipCodes.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {zipCodes.map((zipCode, index) => (
                        <Link
                          key={index}
                          href={`/zip-code/?search=${zipCode}`}
                          className="text-lg hover:bg-gray-200 p-2 text-left"
                          onClick={() => {
                            setIsPopoverOpen(false);
                            setSearchTerm(zipCode);
                          }}
                        >
                          {zipCode}
                        </Link>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
