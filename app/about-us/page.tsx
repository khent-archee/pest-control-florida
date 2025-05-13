import { Card, CardContent } from "@/components/ui/card";
import { WEBSITE_NAME } from "../constant";

const textStyles = {
  h1: "text-4xl font-bold mb-10 text-center text-primary",
  h2: "text-2xl font-bold mb-2 text-primary-light",
  h3: "text-lg font-bold mb-2 text-primary-light",
  p: "mb-4",
  p2: "text-primary-dark",
  ul: "list-disc ml-6 md:ml-12 mb-4",
  ol: "list-decimal ml-6 md:ml-12 mb-4",
  a: "underline text-blue-500",
};

export const generateMetadata = () => {
  return {
    title: `About Us - ${WEBSITE_NAME}`,
  };
};

export default function About() {
  return (
    <main className="flex flex-col gap-10 p-2 md:p-5 mt-4 md:mt-6 max-w-4xl w-full shadow-sm">
      <Card className="px-2 md:px-5 py-8 rounded-xl">
        <CardContent>
          <h1 className={textStyles.h1}>About Us</h1>

          <p className={textStyles.p}>
            Welcome to Your Escape Room - America's most comprehensive escape
            room directory. We're dedicated to helping thrill-seekers, puzzle
            enthusiasts, and adventure lovers find their perfect escape
            experience across the United States.
          </p>

          <h2 className={textStyles.h2}>Our Mission</h2>
          <p className={textStyles.p}>
            We created Your Escape Room with a single goal: to connect people
            with extraordinary puzzle experiences that challenge minds and
            create lasting memories. Our directory solves a common problem -
            finding detailed, reliable information about escape rooms throughout
            the country, all in one place.
          </p>

          <h2 className={textStyles.h2}>What Makes Our Directory Special</h2>
          <p className={textStyles.p}>
            Every escape room in our directory features enriched information
            gathered from real visitor experiences. We go beyond basic details
            to provide the insights that matter most to escape room enthusiasts:
          </p>
          <ul className={textStyles.ul}>
            <li>
              <strong className={textStyles.p2}>Difficulty Levels:</strong> We
              help you understand how challenging each room is, with reviews
              highlighting varying difficulty across different rooms at the same
              venue.
            </li>
            <li>
              <strong className={textStyles.p2}>Themed Experiences:</strong>{" "}
              From prison breaks and heists to detective mysteries and TV
              show-inspired rooms like "Only Murders in the Building", our
              directory details the unique themes available.
            </li>
            <li>
              <strong className={textStyles.p2}>Puzzle Types:</strong> Whether
              you prefer logic-based challenges, physical puzzles, or
              search-oriented adventures, we specify the mix of puzzle types in
              each room.
            </li>
            <li>
              <strong className={textStyles.p2}>Special Experiences:</strong>{" "}
              Our listings highlight rooms with mystery/detective elements,
              prison break scenarios, heist themes, and kid-friendly options.
            </li>
            <li>
              <strong className={textStyles.p2}>Group Accommodations:</strong>{" "}
              We provide insights on which venues work well for large groups,
              birthday parties, and special events.
            </li>
            <li>
              <strong className={textStyles.p2}>Practical Information:</strong>{" "}
              Find details about pricing options, parking availability, scare
              factors, and discount opportunities for multiple games or larger
              groups.
            </li>
          </ul>

          <h2 className={textStyles.h2}>How Our Directory Works</h2>
          <p className={textStyles.p}>
            Finding your next escape adventure is simple:
          </p>
          <ol className={textStyles.ol}>
            <li>
              <strong className={textStyles.p2}>
                Search by location to find escape rooms in your area
              </strong>
            </li>
            <li>
              <strong className={textStyles.p2}>
                Filter results based on specific features that matter to you,
                including:
              </strong>
            </li>
          </ol>
          <ul className={textStyles.ul}>
            <li>Affordability</li>
            <li>Parking availability</li>
            <li>Difficulty level</li>
            <li>
              Themes (Mystery/Detective, Prison Break, Heist, Zombie, Tomb,
              Kid-friendly)
            </li>
            <li>Puzzle types</li>
            <li>Scare factor</li>
            <li>Group size accommodations</li>
            <li>Party hosting options</li>
            <li>Discount availability</li>
          </ul>
          <p className={textStyles.p}>
            Each listing provides comprehensive information about room features,
            themes, and practical details to help you make the perfect choice
            for your group.
          </p>

          <h2 className={textStyles.h2}>Commitment to Accuracy</h2>
          <p className={textStyles.p}>
            We maintain our directory through regular updates, user feedback,
            and direct communication with escape room owners. While we strive to
            provide the most current information, we always recommend confirming
            details directly with venues before planning your visit.
          </p>

          <h2 className={textStyles.h2}>Connect With Us</h2>
          <p className={textStyles.p}>
            We're constantly working to improve our directory and provide better
            information about escape rooms throughout the USA. Your feedback and
            suggestions help us create a more valuable resource for puzzle
            enthusiasts everywhere.
          </p>
          <p className={textStyles.p}>
            Have questions or suggestions? We'd love to hear from you! Contact
            us at{" "}
            <a href="mailto:info@yourescaperoom.com" className={textStyles.a}>
              info@yourescaperoom.com
            </a>
            , and help us make finding the perfect escape challenge easier for
            everyone.
          </p>

          <p className={textStyles.p}>
            Thank you for choosing Your Escape Room as your trusted resource for
            discovering exceptional escape experiences across America.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
