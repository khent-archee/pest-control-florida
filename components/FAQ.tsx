import { Card, CardContent } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const textStyles = {
  h2: "text-2xl text-center font-bold mb-2 text-primary mb-6",
  h3: "text-xl font-bold mb-2 text-primary",
  h4: "text-base md:text-lg font-medium mb-2 text-left",
  p: "mb-2 text-slate-900",
  ul: "list-disc ml-16 mb-4 text-slate-900",
  ol: "list-decimal ml-16 mb-4",
  a: "underline text-blue-500",
};

export default function FAQContent() {
  return (
    <Card className="flex flex-col justify-center p-4">
      <CardContent className="p-2 md:p-4">
        {/* Title */}
        <h2 className={textStyles.h2}>Frequently Asked Questions</h2>

        <div className="mt-4" />
        {/* About Our Directory */}
        <h3 className={textStyles.h3}>About Our Directory</h3>
        <Accordion type="multiple">
          <AccordionItem value="about-1">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What is Your Escape Room directory?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Your Escape Room is America’s most comprehensive escape room
                directory, designed to help adventure seekers find and compare
                escape room experiences across the United States. We provide
                detailed information about room themes, difficulty levels,
                puzzle types, and practical details to help you choose the
                perfect escape experience.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="about-2">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Is the information in your directory up-to-date?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                We strive to maintain current information through regular
                updates, user feedback, and direct communication with escape
                room owners. While we work hard to ensure accuracy, we recommend
                confirming details directly with venues before planning your
                visit, especially regarding operating hours and availability.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="about-3">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Do you list every escape room in the United States?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                We're constantly adding new escape rooms to our directory. While
                we aim to be comprehensive, there may be some venues we haven't
                listed yet. If you know of an escape room that isn't in our
                directory, please let us know through our "Submit an Escape
                Room" form on our Contact page.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="about-4">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Do you review the escape rooms in your directory?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Our directory includes review summaries based on actual visitor
                experiences. These summaries highlight aspects like difficulty
                level, puzzle types, and theme authenticity rather than
                providing our own ratings.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4" />
        {/* Using Our Directory */}
        <h3 className={textStyles.h3}>Using Our Directory</h3>
        <Accordion type="multiple">
          <AccordionItem value="using-1">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                How do I search for escape rooms?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                You can search for escape rooms by location through our search
                function. Simply enter your city, state, or zip code to find
                nearby escape rooms. You can then filter results based on
                specific features you're looking for.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="using-2">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What filters are available to narrow my search?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Our directory offers numerous filters to help you find the
                perfect escape room experience:
              </p>
              <ul className={textStyles.ul}>
                <li>Affordability (price ranges)</li>
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="using-3">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                How do I know which difficulty level is right for my group?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Our listings include detailed information about difficulty
                levels, with reviews highlighting varying difficulty across
                different rooms at the same venue. We often note which rooms are
                more suitable for beginners versus experienced players. Look for
                the difficulty level filter and descriptions in each listing to
                find the right challenge for your group.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="using-4">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Can I find escape rooms suitable for specific occasions?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Yes! Our directory includes information about escape rooms that
                accommodate birthday parties, corporate events, and other
                special occasions. Use our filters to find venues that offer
                party packages or group discounts.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4" />
        {/* Escape Room Features */}
        <h3 className={textStyles.h3}>Escape Room Features</h3>
        <Accordion type="multiple">
          <AccordionItem value="features-1">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What types of themes are available in escape rooms?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Our directory categorizes escape rooms by various themes,
                including:
                <ul>
                  <li className={textStyles.ul}>Mystery/Detective themes</li>
                  <li className={textStyles.ul}>Prison Break scenarios</li>
                  <li className={textStyles.ul}>Heist challenges</li>
                  <li className={textStyles.ul}>Zombie adventures</li>
                  <li className={textStyles.ul}>Tomb/Egyptian themes</li>
                  <li className={textStyles.ul}>Kid-friendly rooms</li>
                  <li className={textStyles.ul}>
                    TV-inspired rooms (like "Only Murders in the Building")
                  </li>
                  <li className={textStyles.ul}>
                    And many more unique scenarios
                  </li>
                </ul>
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="features-2">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What kinds of puzzles might I encounter in an escape room?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Based on our extensive research, escape rooms typically feature
                a mix of:
                <ul>
                  <li className={textStyles.ul}>Logic-based puzzles</li>
                  <li className={textStyles.ul}>Physical challenges</li>
                  <li className={textStyles.ul}>Search-oriented tasks</li>
                  <li className={textStyles.ul}>Mathematical problems</li>
                  <li className={textStyles.ul}>Pattern recognition</li>
                  <li className={textStyles.ul}>
                    Deductive reasoning challenges
                  </li>
                  <li className={textStyles.ul}>
                    Tactile and interactive elements
                  </li>
                </ul>
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="features-3">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What does the "Scare Factor" indicate?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                The Scare Factor filter helps you identify whether an escape
                room incorporates horror elements or frightening themes. Some
                rooms may be described as "scary at first" while others are
                explicitly designed as horror experiences. Many escape rooms
                have no horror elements at all.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="features-4">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What makes an escape room "Kid-friendly"?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Kid-friendly rooms typically feature:
                <ul>
                  <li className={textStyles.ul}>
                    Age-appropriate themes and storylines
                  </li>
                  <li className={textStyles.ul}>
                    Less intimidating environments
                  </li>
                  <li className={textStyles.ul}>
                    Puzzles that children can participate in solving
                  </li>
                  <li className={textStyles.ul}>
                    Lower difficulty levels or special accommodations for
                    younger players
                  </li>
                  <li className={textStyles.ul}>
                    Family-oriented scenarios like "The Playground" room
                    mentioned in our listings
                  </li>
                </ul>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4" />
        {/* Group Experiences */}
        <h3 className={textStyles.h3}>Group Experiences</h3>
        <Accordion type="multiple">
          <AccordionItem value="group-1">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                How many people can participate in an escape room?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Group size capacities vary by venue and specific room. Most
                escape rooms accommodate 2-8 players, but some can handle larger
                groups. Our listings include information about which venues work
                well for large groups and which rooms may be better suited for
                smaller teams.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="group-2">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Do escape rooms offer discounts?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Many escape rooms offer discounts for multiple game bookings,
                larger groups, or special promotions. Our directory notes where
                these discount opportunities exist, allowing you to find the
                best value for your adventure.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="group-3">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Can escape rooms host birthday parties or special events?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Yes! Many escape rooms offer birthday party packages and special
                event hosting. Our directory includes information about party
                services where available, including private room bookings and
                group accommodations.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4" />
        {/* Practical Questions */}
        <h3 className={textStyles.h3}>Practical Questions</h3>
        <Accordion type="multiple">
          <AccordionItem value="practical-1">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                How much do escape rooms typically cost?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Pricing varies widely based on location, room complexity, and
                market factors. Our directory includes affordability
                information, noting where prices are considered reasonable and
                where they might be more premium. Some venues offer varied
                pricing based on group size, time of day, or day of the week.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="practical-2">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Do escape rooms provide parking?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Parking availability varies by location. Our directory
                specifically notes when parking is or isn't readily available,
                helping you plan your visit accordingly. In urban areas, parking
                might be limited, while suburban locations often offer dedicated
                parking.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="practical-3">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                How long does an escape room experience typically last?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Most escape room games are designed to last 60 minutes, though
                the entire experience including briefing and debriefing may take
                75-90 minutes. Some specialty rooms may have different time
                limits. Always plan to arrive 15 minutes before your scheduled
                time for instructions and preparation.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="practical-4">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>Do I need to book in advance?</h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Yes, most escape rooms require advance booking to ensure
                availability. Popular times (evenings and weekends) often book
                up quickly. We recommend making reservations at least a few days
                in advance, especially for larger groups or popular venues.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-4" />
        {/* Escape Room Tips */}
        <h3 className={textStyles.h3}>Escape Room Tips</h3>
        <Accordion type="multiple">
          <AccordionItem value="tips-1">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What should I wear to an escape room?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Comfortable clothing and closed-toe shoes are recommended. Some
                rooms may require physical activity like crawling, reaching, or
                climbing. Avoid very bulky clothing or high heels that might
                restrict movement.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tips-2">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                What&apos;s the best group size for solving an escape room?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                While this varies by room, 4-6 players is often ideal. This
                provides enough diverse thinking and manpower without
                overcrowding the space. Our directory notes when rooms are
                particularly suitable for larger or smaller groups.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tips-3">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                Any tips for first-time escape room players?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <ul className={textStyles.ul}>
                <li>Communicate clearly with your team</li>
                <li>Search thoroughly but respectfully (no force is needed)</li>
                <li>Organize your found items and clues</li>
                <li>Pay attention to the briefing instructions</li>
                <li>
                  Don&apos;t be afraid to ask for hints if you&apos;re stuck
                </li>
                <li>Split up to tackle different puzzles simultaneously</li>
                <li>Share discoveries with your whole team</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tips-4">
            <AccordionTrigger>
              <h4 className={textStyles.h4}>
                If I&apos;m claustrophobic, can I still do an escape room?
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Most modern escape rooms are not designed to be physically
                confining, and emergency exits are always available. Our
                directory can help you find rooms with more spacious layouts. If
                you have specific concerns, we recommend contacting the venue
                directly before booking.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
