import React from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import {
  capitalizeFirstLetter,
  convertHyphenToSpace,
  convertSpaceToHyphen,
} from "@/lib/utils";
import {
  DB_NAME,
  PLURAL_DIRECTORY_TYPE,
  RPC_NAME,
  WEBSITE_NAME,
} from "../constant";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params; // Access the state from params

  return {
    title: `Best ${PLURAL_DIRECTORY_TYPE} in ${capitalizeFirstLetter(convertHyphenToSpace(state))} - ${WEBSITE_NAME}`,
    description: `Find the best ${PLURAL_DIRECTORY_TYPE} in ${capitalizeFirstLetter(convertHyphenToSpace(state))}`,
  };
}

export const revalidate = 7776000;
export default async function StatesPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const processedState = capitalizeFirstLetter(
    convertHyphenToSpace(decodeURIComponent(state))
  );
  const citiesData = await fetchCities(processedState);

  if (!citiesData || citiesData.length === 0) {
    return notFound();
  }

  return (
    <main className="flex flex-col gap-4 p-5 mt-10 max-w-7xl w-full">
      <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-left">{`Best ${PLURAL_DIRECTORY_TYPE} in ${processedState}`}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {citiesData.map((city, key) => (
          <div key={key}>
            <Link
              href={`/${state}/${convertSpaceToHyphen(city.toLocaleLowerCase())}`}
            >
              <Card className="h-full p-4 hover:shadow-lg transition-shadow overflow-hidden flex flex-col gap-4">
                <div className="w-[calc(100% + 80px)] h-2 bg-primary -mt-4 -mx-10" />
                <h2 className="text-lg sm:text-xl md:text-3xl font-medium">
                  {city}
                </h2>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

// export async function generateStaticParams() {
//   const supabase = await createClient();
//   const { data: states, error } = await supabase.rpc(
//     `get_${RPC_NAME}_unique_us_states`
//   );

//   if (error || !states) {
//     console.error("RPC Error:", error?.message);
//     return [];
//   }

//   const listStates: { us_state: string }[] = states;

//   const uniqueStates = Array.from(
//     new Set(listStates.map((row) => row.us_state.toLowerCase()))
//   );

//   return uniqueStates.map((state) => ({
//     state: convertSpaceToHyphen(state),
//   }));
// }
