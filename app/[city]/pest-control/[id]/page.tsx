import React from "react";

import { MapPin, Phone, DollarSign, PanelTop } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Directory } from "@/app/types/directory";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import {
  DB_NAME,
  DB_STATE,
  DIRECTORY_TYPE,
  PLURAL_DIRECTORY_TYPE,
  RPC_NAME,
  WEBSITE_NAME,
} from "@/app/constant";
import {
  capitalizeFirstLetter,
  cn,
  convertGoogleMapToEmbed,
  convertHyphenToSpace,
  convertSpaceToHyphen,
} from "@/lib/utils";
import Image from "next/image";
import ProsCons from "@/components/CardProsCons";
import DirectoryFAQ from "./FAQ";
import HoursOpenCard from "./hoursCard";
import Link from "next/link";
import ServiceHoursCard from "./otherHoursCard";
import {
  excluded,
  getCategoryIcon,
  getFeatures,
  getTrueFeatures,
} from "@/app/helper/utils";
import { Badge } from "@/components/ui/badge";

async function fetchDirectories(id: string): Promise<Directory | null> {
  const supabase = await createClient();
  const { data: data, error } = await supabase
    .from(DB_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return data;
}

async function fetchOtherDirectories(
  id: string,
  city: string,
  state: string
): Promise<Directory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc(
    `get_top_${RPC_NAME}_in_city_state`,
    {
      input_id: id,
      input_city: city,
      input_state: state,
    }
  );

  if (error || !data) {
    console.error(error);
    return [];
  }

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchDirectories(id);

  return {
    title: `${data?.name} - ${DIRECTORY_TYPE} in ${data?.city}, ${data?.us_state} - ${WEBSITE_NAME}`,
    description: `${data?.detailed_description}`,
  };
}

export const revalidate = 7776000;

export default async function DirectoryPage({
  params,
}: {
  params: Promise<{ id: string; city: string }>;
}) {
  const { id, city } = await params;
  const processedCity = capitalizeFirstLetter(
    convertHyphenToSpace(decodeURIComponent(city))
  );

  const data = await fetchDirectories(id);
  const otherResto = await fetchOtherDirectories(id, processedCity, DB_STATE);

  if (!data || !otherResto) {
    return notFound();
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4 w-full pb-6">
      <article className="w-full flex flex-col justify-center items-center gap-4 md:gap-8">
        {/* Hero Section */}
        <section className="relative h-96 w-full overflow-clip">
          <Image
            src={data.street_view ?? "/images/hero-image.jpg"}
            alt="Hero"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60" />

          <div className="absolute z-20 inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col gap-4 justify-center items-center p-6 text-center">
            <div className="flex flex-col gap-2">
              <h1
                className={cn(
                  "font-bold text-white",
                  data.name.length > 40
                    ? "text-3xl md:text-5xl"
                    : "text-4xl md:text-6xl"
                )}
              >
                {data.name}
              </h1>
              <div className="flex flex-col gap-0">
                <h2 className="text-base text-white mb-2">
                  {DIRECTORY_TYPE} in {data.city}, {data.us_state}{" "}
                </h2>
                <p className="text-sm text-white">
                  Address: {data.full_address}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              {data.site && (
                <Button
                  asChild
                  className="border-primary-dark text-base md:text-lg"
                  size="default"
                >
                  <a target="_blank" href={data.site} className="flex gap-2">
                    <PanelTop />
                    Visit Website
                  </a>
                </Button>
              )}
              {data.url && (
                <Button
                  asChild
                  className="border-primary-dark text-primary bg-white hover:bg-white/80 text-base md:text-lg"
                  size="default"
                >
                  <a target="_blank" href={data.url} className="flex gap-2">
                    <MapPin />
                    Get Directions
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>
        {/* contact */}
        <section className="flex flex-col justify-center items-center max-w-7xl w-full">
          <section className="-mt-7 md:-mt-[80px] h-28 w-full md:w-5/6 z-20 bg-primary-light flex justify-around items-center rounded-lg">
            <div className="flex flex-col justify-center items-center space-x-2">
              <div className="rounded-full bg-white  p-3 md:p-5">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <p className="text-white ">
                <span className="text-sm">Price Range: &nbsp;</span>
                {data.range ?? "$$"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center space-x-2">
              <div className="rounded-full bg-white  p-3 md:p-5">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              {data.phone ? (
                <a
                  href={`tel:${data.phone}`}
                  className="text-sm hover:underline text-white "
                >
                  Call: {data.phone}
                </a>
              ) : (
                <p className="text-sm text-white "> Not Available</p>
              )}
            </div>
          </section>
        </section>

        {/* About */}
        <section className="flex flex-col md:flex-row gap-4 md:gap-6 max-w-7xl w-full p-2 mb-1 md:mb-0">
          <div className="flex-1 flex flex-col p-2 md:p-4 gap-4">
            <h2 className="font-bold text-2xl md:text-3xl text-primary">
              About this business
            </h2>
            <p className="text-base md:text-lg">
              {data.detailed_description !== null
                ? data.detailed_description
                : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
            </p>
          </div>
          <Tabs defaultValue="open" className="md:basis-1/3 ">
            {data.working_hours && data.other_hours && (
              <TabsList className="w-full !bg-transparent flex justify-center md:justify-start">
                <TabsTrigger
                  className="data-[state=active]:!border-b-4 data-[state=active]:!border-primary data-[state=active]:!text-primary"
                  value="open"
                >
                  Dine-in Hours
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:!border-b-4 data-[state=active]:!border-primary data-[state=active]:!text-primary"
                  value="other"
                >
                  Other Services
                </TabsTrigger>
              </TabsList>
            )}
            {data.working_hours && (
              <TabsContent value="open">
                <HoursOpenCard working_hours={data.working_hours} />
              </TabsContent>
            )}
            {data.other_hours && (
              <TabsContent value="other">
                <ServiceHoursCard other_hours={data.other_hours} />
              </TabsContent>
            )}
          </Tabs>
        </section>
        {/* Pros Cons */}
        <section className="flex flex-col gap-4 max-w-7xl w-full px-2 -mt-3">
          <ProsCons data={data} limitCols={2} />
        </section>

        {/* Detailed Information */}
        {getFeatures(data.about).length > 0 && (
          <section className="flex flex-col gap-4 max-w-7xl w-full px-2 mb-1 md:mb-0">
            <h2 className="text-xl font-semibold ">Additional Information</h2>
            <Card className="p-5">
              <div className="space-y-6">
                {getFeatures(data.about)
                  .filter((item) => !excluded.includes(item[0]))
                  .map((item) => (
                    <div key={item[0]}>
                      {getTrueFeatures(item[1]).length > 0 && (
                        <>
                          <h3 className="font-semibold flex items-center gap-2 mb-3">
                            {getCategoryIcon(item[0])} {item[0]}
                          </h3>
                          <div className="flex flex-wrap gap-2 ml-4">
                            {getTrueFeatures(item[1]).map((item) => (
                              <Badge
                                key={item}
                                variant="outline"
                                className="p-2 px-4"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </Card>
          </section>
        )}
        {/* MAP */}
        <section className="w-full h-[400px]">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={convertGoogleMapToEmbed(data.url, data.city, data.us_state)}
            rel="noopener noreferrer"
            allowFullScreen
          ></iframe>
        </section>
        {otherResto.length >= 4 && (
          <section className="flex flex-col gap-2 p-2">
            <h3 className="text-lg font-semibold text-center md:text-left">
              3 {PLURAL_DIRECTORY_TYPE} Worth Trying in the City
            </h3>
            <div className="flex flex-wrap gap-4 justify-around md:justify-center items-stretch">
              {otherResto.slice(0, 3).map((data) => (
                <Link
                  key={data.id}
                  className="w-full md:w-[300px] md:h-full"
                  href={`/${city}/pest-control/${data.id}`}
                >
                  <Card className="overflow-hidden md:h-full">
                    <div className="w-full h-36 bg-slate-500 relative">
                      <Image
                        src={data.street_view}
                        alt={`Google street view image of ${data.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="w-[300px] p-2">
                      <h5 className="font-semibold text-sm hover:underline">
                        {data.name}
                      </h5>
                      <div className="flex">
                        <div className="mt-[2px]">
                          <MapPin size={14} />
                        </div>
                        <address className="text-sm">
                          {data.full_address}
                        </address>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
        <section className="flex flex-col gap-4 max-w-7xl w-full px-2">
          <DirectoryFAQ />
        </section>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: directories, error } = await supabase
    .from(DB_NAME)
    .select("id, us_state, city")
    .filter("us_state", "ilike", DB_STATE);

  if (error || !directories) {
    console.error(error);
    return [];
  }

  return directories.map((directories) => ({
    id: directories.id.toString(),
    city: convertSpaceToHyphen(directories.city.toString().toLowerCase()),
  }));
}
