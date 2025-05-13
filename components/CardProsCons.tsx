import { Directory } from "@/app/types/directory";
import { PricesIcon } from "./icons/price";
import { Card, CardContent, CardTitle } from "./ui/card";
import { features } from "@/app/constant";
import { CircleHelp } from "lucide-react";
import { ResponsiveIcon } from "./icons/responsive";
import { ImageIcon } from "./icons/imageIcon";

const getLabel = (key: string) => {
  return features.find((f) => f.key === key)?.label ?? key;
};

const getDefaultExplanation = (feature: string, variant: "pros" | "cons") =>
  variant === "cons" ? `No reviews mention ${getLabel(feature)}.` : "";

const getIcon = (name: string) =>
  ({
    ants: <ImageIcon name={name} size="sm" />,
    termite: <ImageIcon name={name} size="sm" />,
    cockroaches: <ImageIcon name={name} size="sm" />,
    rodents: <ImageIcon name={name} size="sm" />,
    fleas: <ImageIcon name={name} size="sm" />,
    bed_bugs: <ImageIcon name={name} size="sm" />,
    spiders: <ImageIcon name={name} size="sm" />,
    flies: <ImageIcon name={name} size="sm" />,
    wasps: <ImageIcon name={name} size="sm" />,
    scorpions: <ImageIcon name={name} size="sm" />,
    quality: <ImageIcon name={name} size="sm" />,
    inspection_treatment: <ImageIcon name={name} size="sm" />,
    responsive: <ResponsiveIcon size="sm" />,
    prices: <PricesIcon size="sm" />,
  })[name] || <CircleHelp />;

const getExplanation = (
  feature: string,
  variant: "pros" | "cons",
  data: Directory
) => {
  const key = feature.toLowerCase().replace(/ /g, "_");
  const explanation =
    (data as any)[`${key}_explanation`] ||
    getDefaultExplanation(feature, variant);
  return explanation;
};

export default function ProsCons({
  data,
  limitCols = 3,
}: {
  data: Directory;
  limitCols?: number;
}) {
  const featureKeys = features.map((f) => f.key);

  const notIncluded: string[] = [];

  const toggledKnownFor = featureKeys.filter(
    (feature) => (data as any)[feature]
  );

  let knownFor = [...toggledKnownFor];

  const notNoted = featureKeys.filter((feature) => !(data as any)[feature]);

  return (
    <section className={`flex flex-col ${limitCols === 3 ? "gap-4" : "gap-2"}`}>
      <div className="flex flex-col justify-between py-2 gap-6 ">
        {knownFor.length > 0 && (
          <Card className="shadow-md basis-1 md:basis-1/2 flex-1">
            <div className="w-[calc(100%)] h-2 bg-secondary rounded-t-xl" />
            <CardContent className="flex-1 flex flex-col gap-4 p-2 sm:p-3 md:p-4 h-full">
              <CardTitle className="text-lg md:text-xl font-semibold">
                What People Are Saying
              </CardTitle>
              <div className="flex flex-col gap-4">
                {knownFor.map((feature) => (
                  <div
                    key={feature}
                    className="flex flex-row gap-2 items-stretch"
                  >
                    <div className="mt-[-3px] md:mt-0">{getIcon(feature)}</div>
                    <div className="flex-1 flex items-center">
                      <p>
                        <strong>{getLabel(feature)}:&nbsp;</strong>
                        {getExplanation(feature, "pros", data)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {notNoted.filter((f) => !notIncluded.includes(f)).length > 0 && (
          <Card className="shadow-md basis-1 md:basis-1/2 flex-1">
            <div className="w-[calc(100%)] h-2 bg-secondary rounded-t-xl" />
            <CardContent className="flex-1 flex flex-col gap-4 p-2 sm:p-3 md:p-4 h-full">
              <CardTitle className="text-lg md:text-xl font-semibold">
                Not Noted
              </CardTitle>
              <div className="flex flex-col gap-4">
                {notNoted
                  .filter((f) => !notIncluded.includes(f))
                  .map((feature) => (
                    <div
                      key={feature}
                      className="flex flex-row gap-2 items-start md:items-stretch"
                    >
                      <div className="mt-[-3px] md:mt-0">
                        {getIcon(feature)}
                      </div>
                      <div className="flex-1 flex items-center">
                        <p>
                          <strong>{getLabel(feature)}:&nbsp;</strong>
                          {getExplanation(feature, "cons", data)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
