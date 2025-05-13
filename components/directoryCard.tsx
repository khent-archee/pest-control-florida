import { Directory } from "@/app/types/directory";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { MapPin, Phone } from "lucide-react";
import ProsCons from "./CardProsCons";
import { DIRECTORY_TYPE } from "@/app/constant";

export function DirectoryCard({
  data,
  item,
  params: { city },
  noRank,
}: {
  data: Directory;
  item: number;
  params: {
    city: string;
  };
  noRank?: boolean;
}) {
  return (
    <>
      <Card className="p-0 sm:p-2 md:p-4 hover:shadow-lg transition-shadow h-full border-2 overflow-hidden">
        <div className="w-[calc(100%+80px)] h-2 bg-secondary -mt-0 sm:-mt-2 md:-mt-4 -mx-10" />
        <CardContent className="relative flex flex-col items-center gap-4 p-3 md:px-6 py-6 ">
          {!noRank && item < 10 && (
            <div className="md:absolute top-4 right-2 sm:right-0 w-9 h-9 md:w-7 md:h-7 rounded-full bg-primary flex justify-center items-center">
              <p className="text-white text-xl md:text-xl">{item + 1}</p>
            </div>
          )}
          <div className="flex flex-col gap-1 w-full">
            <Link
              href={`/${city}/pest-control/${data.id}`}
              className="flex gap-2 hover:underline"
            >
              <h2 className="text-xl md:text-2xl font-bold md:font-semibold">
                {data.name}
              </h2>
            </Link>
            {data.full_address && (
              <p className="text-sm md:text-base">
                Address:{" "}
                <span className="text-muted-foreground">
                  {data.full_address}
                </span>
              </p>
            )}
          </div>
          <div className="w-full h-[2px] bg-primary" />
          <div className="flex flex-col gap-3 w-full">
            <p className="text-base md:text-lg">
              {data.detailed_description ??
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry...`}
            </p>
            {data.range && (
              <p className="text-sm md:text-base text-black truncate">
                <span className="text-muted-foreground">Price Range: </span>
                {data.range}{" "}
              </p>
            )}
          </div>
          <div className="w-full">
            <ProsCons data={data} limitCols={2} />
          </div>
          {data.url && (
            <Button
              size="sm"
              asChild
              className="bg-primary-light hover:bg-primary w-full"
            >
              <a target="_blank" href={data.url} className="flex gap-2">
                <MapPin className="h-4 w-6" />
                Get Directions
              </a>
            </Button>
          )}
          {data.phone && (
            <Button
              size="sm"
              asChild
              className="bg-secondary hover:bg-secondary/20 w-full"
            >
              <a href={`tel:${data.phone}`} className="flex gap-2">
                <Phone className="h-4 w-6" />
                Call: {data.phone}
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
}
