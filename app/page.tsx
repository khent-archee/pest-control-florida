import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import FAQContent from "@/components/FAQ";
import Image from "next/image";
import { convertSpaceToHyphen } from "@/lib/utils";
import {
  DB_NAME,
  DB_STATE,
  DIRECTORY_STATE,
  FEATURED_CITIES,
  HOMEPAGE_DESC,
  HOMEPAGE_DESC_TITLE,
  PLURAL_DIRECTORY_TYPE,
  POPULAR_CITIES,
  RPC_NAME,
  STATE_CODE,
  WEBSITE_NAME,
} from "./constant";
import Search from "@/components/Search";

async function fetchCities(state: string): Promise<string[] | null> {
  const supabase = await createClient();
  const { data: cities, error } = await supabase
    .from(DB_NAME)
    .select("city")
    .filter("us_state", "ilike", state);

  if (error || !cities) {
    console.error(error);
    return null;
  }

  const uniqueCities = Array.from(new Set(cities.map((row) => row.city)));

  return uniqueCities;
}

export const metadata: Metadata = {
  title: `Find the Best ${PLURAL_DIRECTORY_TYPE} in ${DIRECTORY_STATE} - ${WEBSITE_NAME}`,
  description: HOMEPAGE_DESC,
};

export default async function DirectoryPage() {
  const data = await fetchCities(DB_STATE);

  if (!data) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center mb-10 w-full">
      <section className="h-[220px] md:h-[420px] w-full">
        <div className="aspect-w-16 aspect-h-9 relative w-full h-full">
          <Image
            src="/images/texas.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            objectPosition="center 50%"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-center px-4">
            <h1 className="text-white text-3xl md:text-6xl font-bold mb-4">
              Find the Best {PLURAL_DIRECTORY_TYPE} in {DIRECTORY_STATE}
            </h1>
            <div className="hidden md:block w-full max-w-3xl mt-1 md:mt-6">
              <Search />
            </div>
          </div>
        </div>
      </section>

      <div className=" max-w-7xl flex flex-col gap-8 ">
        <section className="flex flex-col gap-4 w-full p-6 items-center pt-12 pb-10 bg-white rounded-b-xl shadow">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-2xl text-primary-dark md:text-4xl font-bold mb-4 text-center md:text-left">
                {HOMEPAGE_DESC_TITLE}, {STATE_CODE}
              </h2>
              <p className="text-base sm:text-xl md:text-2xl font-thin text-center md:text-left">
                {HOMEPAGE_DESC}
              </p>
            </div>
            <div className="hidden md:block basis-1/3 h-full">
              <div className="w-full h-full relative scale-110">
                <Image
                  src="/images/pest-control.png"
                  alt={"hero-image2"}
                  layout="fill"
                  objectFit="contain"
                  // className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="block md:hidden w-full max-w-3xl mt-1 md:mt-6">
            <Search />
          </div>
        </section>

        <section className="bg-white">
          <Card className="p-6 px-4 md:px-6">
            <div className="flex flex-col-reverse md:flex-row gap-10">
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-lg text-primary-dark sm:text-xl md:text-4xl font-extrabold text-left">
                  Featured Cities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  {FEATURED_CITIES.map((city, key) => (
                    <div key={key}>
                      <Link
                        href={`/${convertSpaceToHyphen(city.toLowerCase())}`}
                      >
                        <Card className="p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4 hover:bg-muted">
                          {/* <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" /> */}
                          <h3 className="text-lg sm:text-xl md:text-3xl font-medium">
                            {city}
                          </h3>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex basis-1/3">
                <div className="w-full h-96 relative">
                  <Image
                    src="/images/map.png"
                    alt={"hero-image3"}
                    layout="fill"
                    objectFit="contain"
                    // className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="flex flex-col gap-6 w-full p-4">
          <h2 className="text-lg sm:text-xl md:text-4xl font-extrabold text-primary-dark text-left">
            {/* {PLURAL_DIRECTORY_TYPE} by Cities */}
            Browse All Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {[...data]
              .sort((a, b) => a.localeCompare(b))
              .map((city, key) => (
                <div key={key}>
                  <Link href={`/${convertSpaceToHyphen(city.toLowerCase())}`}>
                    <Card className="p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                      <div className="w-[calc(100% + 80px)] h-2 bg-secondary -mt-4 -mx-10" />
                      <h3 className="text-lg sm:text-xl md:text-3xl font-medium">
                        {city}
                      </h3>
                    </Card>
                  </Link>
                </div>
              ))}
          </div>
        </section>
        <section className=" w-full p-4">
          <FAQContent />
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
