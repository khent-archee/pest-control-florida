import { LOGO_SUBTEXT, WEBSITE_NAME } from "@/app/constant";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative h-10 w-10 md:h-14 md:w-14">
        <Image
          // className="scale-150"
          src="/logo/logo.png"
          alt="logo"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="flex flex-col justify-center items-center w-60">
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
          {WEBSITE_NAME}
        </p>
        <p className="w-11/12 relative text-xs text-center text-gray-500 ">
          {LOGO_SUBTEXT}
        </p>
      </div>
    </div>
  );
}
