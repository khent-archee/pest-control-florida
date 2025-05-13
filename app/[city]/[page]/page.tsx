import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Directory } from "@/app/types/directory";
import {
  capitalizeFirstLetter,
  convertHyphenToSpace,
  convertSpaceToHyphen,
} from "@/lib/utils"; // utility to convert hyphen back to space
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

async function fetchDirectories(
  state: string,
  city: string
): Promise<Directory[] | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(`get_${RPC_NAME}_by_city_state`, {
    input_city: city,
    input_state: state,
  });

  if (error || !data) {
    console.error("RPC Error:", error?.message);
    return null;
  }

  return data as Directory[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string; page: string }>;
}): Promise<Metadata> {
  const { city, page } = await params;
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
  params: Promise<{ city: string; page: string }>;
}) {
  const { city, page } = await params;
  const decodedCity = convertHyphenToSpace(decodeURIComponent(city));
  const pageNumber = parseInt(page);

  const dataList = await fetchDirectories(DB_STATE, decodedCity);

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
          Best {PLURAL_DIRECTORY_TYPE} in{" "}
          <span className="text-primary">
            {capitalizeFirstLetter(decodedCity)}
            {","}
          </span>{" "}
          <span className="text-primary">
            {capitalizeFirstLetter(DIRECTORY_STATE)}
          </span>
        </h1>
        <section className=" basis-2/5">
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
              noRank
            />
          </div>
        ))}
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
    .eq("us_state", DB_STATE);

  if (error || !cityState) {
    console.error(error);
    return [];
  }

  const uniqueCityState = Array.from(
    new Set(cityState.map((row) => row.city))
  ).map((city) => {
    return { city };
  });

  const staticParams = [];

  for (const { city } of uniqueCityState) {
    const directories = await fetchDirectories(DB_STATE, city);

    if (directories && directories.length > 15) {
      const remaining = directories.length - 15;
      const pages = Math.ceil(remaining / 20);

      for (let i = 1; i <= pages; i++) {
        staticParams.push({
          city: convertSpaceToHyphen(city.toLowerCase()),
          page: (i + 1).toString(), // i+1 because page=2 onwards (page=1 is handled by base path)
        });
      }
    }
  }

  return staticParams;
}
