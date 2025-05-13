import React, { ReactNode } from "react";

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Directory } from "@/app/types/directory";
import {
  capitalizeFirstLetter,
  convertHyphenToSpace,
  convertSpaceToHyphen,
} from "@/lib/utils";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DB_NAME,
  DB_STATE,
  DIRECTORY_STATE,
  PLURAL_DIRECTORY_TYPE,
  RPC_NAME,
  VIEW_MORE_TEXT,
  WEBSITE_NAME,
} from "@/app/constant";
import { DirectoryCard } from "@/components/directoryCard";
import DirectoryFilters from "@/components/filter";
import { Badge } from "@/components/ui/badge";

async function fetchDirectories(
  state: string,
  city: string
): Promise<{ data: Directory[]; cities: string[] } | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(`get_${RPC_NAME}_by_city_state`, {
    input_city: city,
    input_state: state,
  });
  const { data: cities, error: citiesEror } = await supabase
    .from(DB_NAME)
    .select("city")
    .filter("us_state", "ilike", state);

  if (error || citiesEror || !data) {
    console.error("RPC Error:", error?.message);
    return null;
  }

  const uniqueCities = Array.from(new Set(cities.map((row) => row.city)));

  return { data: data as Directory[], cities: uniqueCities };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const processedCity = capitalizeFirstLetter(
    convertHyphenToSpace(decodeURIComponent(city))
  );

  return {
    title: `Best ${PLURAL_DIRECTORY_TYPE} in ${processedCity}, ${DIRECTORY_STATE} - ${WEBSITE_NAME}`,
    description: `Find the best ${PLURAL_DIRECTORY_TYPE} in ${processedCity}, ${DIRECTORY_STATE}`,
  };
}

export const revalidate = 7776000;

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const decodedCity = convertHyphenToSpace(decodeURIComponent(city));
  const data = await fetchDirectories(DB_STATE, decodedCity);

  const end = 15;

  if (!data) {
    return notFound();
  }
  const { data: dataList, cities } = data;

  const pageData = dataList.slice(0, end);

  return (
    <main className="min-h-screen flex flex-col gap-6 p-2 md:p-5 mt-4 max-w-7xl w-full">
      <div className="flex flex-col justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          {`Best ${PLURAL_DIRECTORY_TYPE} in `}
          <span className="text-primary">
            {capitalizeFirstLetter(decodedCity)}
            {","}
          </span>{" "}
          <span className="text-primary">{DIRECTORY_STATE}</span>
        </h1>
        <section>
          <DirectoryFilters city={city} filter={""} />
        </section>
      </div>
      <div className="flex flex-col gap-6">
        {pageData.map((data, key) => (
          <div key={key}>
            <DirectoryCard
              data={data}
              item={key}
              params={{ city: city }}
              key={key}
            />
          </div>
        ))}
        {pageData.length === 0 && (
          <div className="text-center">
            <span>Nothing found</span>
          </div>
        )}
      </div>

      {dataList.length >= end && (
        <div className="mt-2 flex flex-1">
          <Button variant="link" asChild className="w-full">
            <Link href={`/${city}/2`} passHref>
              {VIEW_MORE_TEXT}
            </Link>
          </Button>
        </div>
      )}
      <section className="flex flex-col gap-2">
        {cities.length > 1 && (
          <>
            <h4 className="text-lg font-semibold">
              Other cities in {DIRECTORY_STATE}
            </h4>
            <div className="flex gap-2 flex-wrap">
              {cities
                .filter((c) => c !== capitalizeFirstLetter(decodedCity))
                .map((cityItem, key) => (
                  <div
                    key={key}
                    className="whitespace-nowrap scroll-snap-align-start flex-shrink-0"
                  >
                    <Link
                      href={`/${convertSpaceToHyphen(cityItem.toLowerCase())}`}
                    >
                      <Badge variant="default">{cityItem}</Badge>
                    </Link>
                  </div>
                ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: cityState, error } = await supabase
    .from(DB_NAME)
    .select("city")
    .filter("us_state", "ilike", DB_STATE);

  if (error || !cityState) {
    console.error(error);
    return [];
  }

  const uniqueCityState = Array.from(
    new Set(cityState.map((row) => row.city))
  ).map((city) => {
    return { city };
  });

  return uniqueCityState.map((data) => ({
    city: convertSpaceToHyphen(data.city.toLowerCase()),
  }));
}
