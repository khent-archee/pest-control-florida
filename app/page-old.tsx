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
  HOMEPAGE_DESC,
  PLURAL_DIRECTORY_TYPE,
  POPULAR_CITIES,
  RPC_NAME,
  WEBSITE_NAME,
} from "./constant";
import Search from "@/components/Search";

async function fetchStates(): Promise<{
  states: string[];
} | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    `get_${RPC_NAME}_unique_us_states`
  );

  if (error || !data) {
    console.error("RPC Error:", error?.message);
    return null;
  }

  const listData: { us_state: string }[] = data;

  const uniqueStates = Array.from(new Set(listData.map((row) => row.us_state)));

  return {
    states: uniqueStates,
  };
}

export const metadata: Metadata = {
  title: `Find the Best ${PLURAL_DIRECTORY_TYPE} Near You - ${WEBSITE_NAME}`,
  description: HOMEPAGE_DESC,
};

export default async function DirectoryPage() {
  const data = await fetchStates();

  if (!data) {
    return notFound();
  }

  const cities = POPULAR_CITIES;

  return (
    <main className="flex flex-col items-center gap-10 mb-10 w-full">
      <section className="h-[520px] w-full">
        <div className="aspect-w-16 aspect-h-9 relative w-full h-full">
          <Image
            src="/images/hero-image.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            objectPosition="center 20%"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Find the Best {PLURAL_DIRECTORY_TYPE} Near You
            </h1>
            <p className="text-white text-base sm:text-lg font-thin md:text-xl max-w-3xl">
              {HOMEPAGE_DESC}
            </p>
            <div className="w-full max-w-3xl mt-1 md:mt-6">
              <Search />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="flex flex-col gap-4 max-w-7xl w-full p-4">
        
      </section> */}

      <section className="flex flex-col gap-4 max-w-7xl w-full p-4">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-left">
          Best {PLURAL_DIRECTORY_TYPE} in Popular Cities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {cities.map(({ city, us_state }, key) => {
            return (
              <div key={key}>
                <Link
                  href={`/${convertSpaceToHyphen(us_state.toLowerCase())}/${convertSpaceToHyphen(city.toLowerCase())}`}
                >
                  <Card className="h-full p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                    <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
                    <h3 className="text-lg sm:text-xl md:text-3xl font-medium">
                      {`${city}, ${us_state}`}
                    </h3>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4 max-w-7xl w-full p-4">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-left">
          {PLURAL_DIRECTORY_TYPE} by State
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {data.states.map((state, key) => (
            <div key={key}>
              <Link href={`/${convertSpaceToHyphen(state.toLowerCase())}`}>
                <Card className="p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                  <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
                  <h3 className="text-lg sm:text-xl md:text-3xl font-medium">
                    {state}
                  </h3>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className=" max-w-7xl w-full p-4">
        <FAQContent />
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
