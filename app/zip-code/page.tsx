"use client";
import Search from "@/components/Search";
import { Suspense, useEffect, useState } from "react";
import { Directory } from "@/app/types/directory";
import { DirectoryCard } from "@/components/directoryCard";
import { DB_STATE, PLURAL_DIRECTORY_TYPE, WEBSITE_NAME } from "../constant";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { DB_NAME } from "@/app/constant";
import { convertSpaceToHyphen } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function ZipCodePage() {
  return (
    <Suspense fallback={<div>Loading search…</div>}>
      <ZipCode />
    </Suspense>
  );
}

function ZipCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!search) {
      router.push("/");
    }
  }, [search, router]);

  useEffect(() => {
    document.title = `Find the Best ${PLURAL_DIRECTORY_TYPE} Near You - ${WEBSITE_NAME}`;
  }, []);

  useEffect(() => {
    const fetchDirectories = async () => {
      setIsLoading(true);
      const supabase = await createClient();
      const { data, error } = await supabase
        .from(DB_NAME)
        .select("*")
        .eq("postal_code", search)
        .filter("us_state", "ilike", DB_STATE);

      setIsLoading(false);
      if (error) {
        console.error("Fetch Error:", error.message);
        return;
      }

      setDirectories(data as Directory[]);
    };

    fetchDirectories();
  }, [search]);

  return (
    <main className="flex flex-col items-center gap-10 mb-10 w-full">
      <section className="flex flex-col gap-4 max-w-7xl w-full p-4 mt-6">
        <Search search={search || ""} />
      </section>
      {isLoading ? (
        <div>Loading...</div>
      ) : directories.length > 0 ? (
        <section className="flex flex-col gap-4 max-w-7xl w-full p-4">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
              {`Best ${PLURAL_DIRECTORY_TYPE} in Zip Code `}
              <span className="text-primary">{search}</span>
            </h1>
            {directories.map((data, key) => (
              <div key={key}>
                <DirectoryCard
                  data={data}
                  item={key}
                  params={{
                    city: convertSpaceToHyphen(data.city.toLowerCase()),
                  }}
                  key={key}
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div>No results found</div>
      )}
    </main>
  );
}
