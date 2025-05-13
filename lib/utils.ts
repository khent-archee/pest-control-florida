import { DIRECTORY_TYPE, features, PLURAL_DIRECTORY_TYPE } from "@/app/constant";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//special cases of string
const specialCase = [
  'Larkfield-Wikiup',
  'La Crescenta-Montrose',
  'Carmel-By-The-Sea',
  'Winston-Salem',
  'St. Louis',
  "Lee's Summit",
  "D'Iberville",
  "St. Charles",
  "St. Petersburg",
  "St. Augustine",
  'St. George',
  'Sault Ste. Marie',
  'Port St. Lucie',
  "Land O' Lakes", //check
  "Mt. Julie",
  "Wilkes-Barre Township",
  "Town 'N' Country",
  "Kailua-Kona",
  "Mt. Juliet",
  "Wilkes-Barre",
  "Coeur d'Alene",
  "Setauket- East Setauket",
  "Fuquay-Varina",
  "Wood-Ridge",
  "O'Fallon",
  "Croton-On-Hudson",
  "Sedro-Woolley",
  "Hastings-On-Hudson",
  "Kapa'a",
  "Kapaʻa",

]


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertSpaceToHyphen(urlString: string): string {
  return urlString.replace(/[.'’]/g, '').replace(/\s+/g, '-');  // Replaces all spaces (whitespace) with hyphens
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";

  return str
    .split(/([ -])/g) // Split on spaces and hyphens, but keep the separator
    .map(word => {
      return word.match(/[a-zA-ZÀ-ÿ]/)
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word;
    })
    .join('');
}

export function convertHyphenToSpace(urlString: string): string {
  // First, check if the string matches a special case
  const matched = specialCase.find((original) => {
    const urlFriendly = convertSpaceToHyphen(original);
    return urlString.toLowerCase() === urlFriendly.toLowerCase();
  });
  if (matched) return matched;

  // Otherwise, replace all hyphens with spaces
  return urlString.replace(/-/g, ' ');
}

export function convertHyphenToUnderscore(urlString: string): string {
  return urlString.replace(/-/g, '_');  // Replaces all hyphens with underscore
}

export function convertUnderscoreToHyphen(input: string): string {
  return input.replace(/_/g, "-");
}

export function fixUrlString(input: string): string {
  return input.replace(/%20/g, " ");
}

export function convertSpaceToUnderscore(urlString: string): string {
  return urlString.replace(/\s+/g, '_');  // Replaces all spaces (whitespace) with hyphens
}

// used in map to convert location link (google map location) to embeded url
export function convertGoogleMapToEmbed(
  urlString: string,
  city: string,
  state: string
): string {
  try {
    const url = new URL(urlString);

    // Try to extract the /place/slug from the pathname
    const match = url.pathname.match(/\/maps\/place\/([^\/]+)/);
    const placeSlug = match?.[1];

    // Fallback if not found
    const query = placeSlug
      ? decodeURIComponent(placeSlug)
      : `${city}, ${state}`;

    // Return embeddable maps URL without API key
    return `https://www.google.com/maps?q=${encodeURIComponent(
      `${query}, ${city}, ${state}`
    )}&output=embed`;
  } catch {
    // Fallback for invalid URL
    return `https://www.google.com/maps?q=${encodeURIComponent(
      `${city}, ${state}`
    )}&output=embed`;
  }
}

// USED IN MAKING THE TILE OF PAGES WITH (filter, filter/[page]) DYNAMIC
export function getOverrideFilterTitles(filter: string, single?: boolean) {
  const feature = features.find(feat => feat.key === filter)
  if (feature && feature.titleOverride) {
    return feature.titleOverride
  } else
    return single ? DIRECTORY_TYPE : PLURAL_DIRECTORY_TYPE

}


