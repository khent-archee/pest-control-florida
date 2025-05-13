export interface Directory {
  id: number;
  name: string;
  site: string;
  subtypes: string;
  type: string;
  phone: string;
  full_address: string;
  street: string;
  city: string;
  postal_code: string;
  us_state: string;
  photo: string;
  street_view: string;
  working_hours: {
    [key: string]: string;
  };
  other_hours: {
    [key: string]: { [key: string]: string };
  }[];
  about: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
  range: string;
  detailed_description: string;
  url: string;
  location_review_link: string,
  booking_appointment_link: string,
  rating: number,
  reviews: number,
}