import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Directory } from "@/app/types/directory";
import {
  capitalizeFirstLetter,
  convertHyphenToSpace,
  convertHyphenToUnderscore,
  convertSpaceToHyphen,
  getOverrideFilterTitles,
} from "@/lib/utils"; // utility to convert hyphen back to space
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DB_NAME,
  DB_STATE,
  DIRECTORY_STATE,
  features,
  RPC_NAME,
  VIEW_MORE_TEXT,
  WEBSITE_NAME,
} from "@/app/constant";
import { DirectoryCard } from "@/components/directoryCard";
import DirectoryFilters from "@/components/filter";

async function fetchDirectories(
  state: string,
  city: string,
  filter?: string
): Promise<Directory[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    `get_filtered_${RPC_NAME}_by_city_state`,
    {
      input_city: city,
      input_state: state,
      input_filter: filter || null,
    }
  );

  if (error || !data) {
    console.error("RPC Error:", error?.message);
    return null;
  }

  return data as Directory[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    city: string;
    filter: string;
    page: string;
  }>;
}): Promise<Metadata> {
  const { city, filter, page } = await params;
  const processedCity = capitalizeFirstLetter(
    convertHyphenToSpace(decodeURIComponent(city))
  );
  const processedFilter = convertHyphenToUnderscore(filter);

  // GET NUMBER OF DIRECTORY TO CHECK IF IT HAS CONTENT
  const directories = await fetchDirectories(
    DB_STATE,
    processedCity,
    processedFilter
  );

  const canBeCrawled = directories && directories.length > 0;

  return {
    title: `Best ${getOverrideFilterTitles(processedFilter)} in ${processedCity}, ${DIRECTORY_STATE} - ${WEBSITE_NAME}`,
    description: `Find the Best ${getOverrideFilterTitles(processedFilter)} in ${processedCity}, ${DIRECTORY_STATE}`,
    ...(!canBeCrawled && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const revalidate = 7776000;

export default async function FilterPage({
  params,
}: {
  params: Promise<{
    city: string;
    filter: string;
    page: string;
  }>;
}) {
  const { city, filter, page } = await params;
  const decodedCity = convertHyphenToSpace(decodeURIComponent(city));
  const decodedFilter = convertHyphenToUnderscore(filter);
  const pageNumber = parseInt(page);

  const dataList = await fetchDirectories(DB_STATE, decodedCity, decodedFilter);

  if (!dataList || dataList.length <= 15) {
    return notFound(); // If there's no data or not enough for page 2
  }

  const CHUNK_SIZE = 20;
  const start = 15 + (pageNumber - 2) * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;

  const pageData = dataList.slice(start, end);

  return (
    <main className="min-h-screen flex flex-col gap-6 p-2 md:p-5 mt-4 max-w-7xl w-full">
      <div className="flex flex-col justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          {`Best ${getOverrideFilterTitles(decodedFilter)} in `}
          <span className="text-primary">
            {capitalizeFirstLetter(decodedCity)}
            {","}
          </span>{" "}
          <span className="text-primary">{DIRECTORY_STATE}</span>
        </h1>
        <section className=" basis-2/5">
          <DirectoryFilters city={city} filter={filter} />
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
              noRank
            />
          </div>
        ))}
        {pageData.length === 0 && (
          <div className="text-center">
            <span>Nothing found</span>
          </div>
        )}
      </div>
      {dataList.length > end && (
        <div className="mt-2 flex flex-1">
          <Button variant="link" asChild className="w-full">
            <Link href={`/${city}/${parseInt(page) + 1}`} passHref>
              {VIEW_MORE_TEXT}
            </Link>
          </Button>
        </div>
      )}
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

  const uniqueCityStates = Array.from(
    new Set(cityState.map((row) => row.city))
  ).map((city) => {
    return { city };
  });

  const params = [];

  for (const { city } of uniqueCityStates) {
    // Paths with filters
    for (const filter of features) {
      const decodedFilter = convertHyphenToUnderscore(filter.key);
      const directories = await fetchDirectories(DB_STATE, city, decodedFilter);

      if (directories && directories.length > 15) {
        const remaining = directories.length - 15;
        const pages = Math.ceil(remaining / 20);
        for (let i = 1; i <= pages; i++) {
          params.push({
            city: convertSpaceToHyphen(city.toLowerCase()),
            filter: filter.key,
            page: (i + 1).toString(), // i+1 because page=2 onwards (page=1 is handled by base path)
          });
        }
      }
    }
  }

  return params;
}
