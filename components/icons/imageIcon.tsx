import { features } from "@/app/constant";
import Image from "next/image";
import React from "react";

const featureTags = features.map((f) => f.key);

type IconProps = {
  name: string;
  size?: "sm" | "md" | "lg";
};

const getUrl = (name: string): string => {
  return `/icons/${name}.png`;
};

export function ImageIcon({ name, size = "md" }: IconProps) {
  const dimensions = { sm: 32, md: 48, lg: 64 };
  const pixelSize = dimensions[size];

  return (
    <div className="scale-90 translate-x-[0px] translate-y-[0px]">
      <Image
        width={pixelSize}
        height={pixelSize}
        alt={name}
        quality={100}
        src={getUrl(name)}
        unoptimized
        className="object-cover"
      />
    </div>
  );
}
