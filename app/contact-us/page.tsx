import { Card, CardContent } from "@/components/ui/card";
import { WEBSITE_NAME } from "../constant";

const textStyles = {
  h1: "text-4xl font-bold mb-10 text-center text-primary",
  h2: "text-2xl font-bold mb-2 text-primary-light",
  p: "mb-4",
  ul: "list-disc ml-6 md:ml-12 mb-4",
  p2: "text-primary-dark",
};

export const generateMetadata = () => {
  return {
    title: `Contact Us - ${WEBSITE_NAME}`,
  };
};

export default function Contact() {
  return (
    <main className="flex flex-col gap-10 p-2 md:p-5 mt-4 md:mt-6 max-w-4xl w-full shadow-sm">
      <Card className="px-2 md:px-5 py-8 rounded-xl">
        <CardContent>
          <h1 className={textStyles.h1}>Contact Us</h1>

          <p className={textStyles.p}>
            We value your feedback and questions! Whether you have suggestions
            for our escape room directory, want to recommend an escape room for
            our listings, or need help finding specific options like
            family-friendly rooms or locations with unique themes and puzzles,
            we're here to provide prompt and friendly assistance.
          </p>

          <h2 className={textStyles.h2}>Email</h2>
          <p className={textStyles.p}>
            Feel free to reach out to us using any of the following email
            addresses, depending on the nature of your inquiry:
          </p>
          <ul className={textStyles.ul}>
            <li>
              <strong className={textStyles.p2}>
                info@yourescaperoom.com:
              </strong>{" "}
              For general questions about our escape room directory.
            </li>
            <li>
              <strong className={textStyles.p2}>
                suggestions@yourescaperoom.com:
              </strong>{" "}
              For recommending escape rooms that should be added to our
              directory.
            </li>
            <li>
              <strong className={textStyles.p2}>
                support@yourescaperoom.com:
              </strong>{" "}
              For technical assistance with using our website or finding escape
              rooms.
            </li>
            <li>
              <strong className={textStyles.p2}>
                feedback@yourescaperoom.com:
              </strong>{" "}
              For suggestions on how we can improve our directory or add new
              features.
            </li>
            <li>
              <strong className={textStyles.p2}>
                partnerships@yourescaperoom.com:
              </strong>{" "}
              For escape room partnerships or business collaboration
              opportunities.
            </li>
            <li>
              <strong className={textStyles.p2}>
                advertising@yourescaperoom.com:
              </strong>{" "}
              For advertising inquiries.
            </li>
            <li>
              <strong className={textStyles.p2}>
                corrections@yourescaperoom.com:
              </strong>{" "}
              For updates to escape room information, including themes,
              difficulty levels, puzzle types, or facility details.
            </li>
          </ul>
          <p className={textStyles.p}>
            We strive to respond to all emails within 48 hours during business
            days.
          </p>

          <h2 className={textStyles.h2}>Submit an Escape Room</h2>
          <p className={textStyles.p}>
            Know of a great escape room that offers exceptional features like
            immersive themes, challenging puzzles, interactive elements, or
            unique game designs? Help us make our directory more comprehensive
            by submitting escape room details through our online form.
          </p>
          <p className={textStyles.p}>
            When submitting an escape room, please include information about:
          </p>
          <ul className={textStyles.ul}>
            <li>Escape room name and location</li>
            <li>Available themes and rooms</li>
            <li>Difficulty levels for each room</li>
            <li>Puzzle types (logic-based, physical, search-oriented)</li>
            <li>
              Special themes (Mystery/Detective, Prison Break, Heist, Zombie,
              Tomb)
            </li>
            <li>Family-friendly options (kid-friendly rooms)</li>
            <li>
              Practical details (price range, parking availability, operating
              hours)
            </li>
            <li>
              Special accommodations (large groups, birthday parties, discounts)
            </li>
            <li>Scare factor (if applicable)</li>
          </ul>

          <h2 className={textStyles.h2}>Stay Connected</h2>
          <p className={textStyles.p}>
            Have you found Your Escape Room directory helpful during your
            puzzle-solving adventures? We're constantly working to improve our
            directory and provide better information about escape rooms
            throughout the USA. Your feedback helps us create a more valuable
            resource for escape room enthusiasts everywhere.
          </p>
          <p className={textStyles.p}>
            Thank you for using Your Escape Room - your trusted resource for
            discovering the best escape experiences across America!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
