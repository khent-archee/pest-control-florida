import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const textStyles = {
  h2: "text-2xl text-center font-bold mb-2 text-primary mb-6",
  h3: "text-base md:text-lg font-medium mb-2 text-left",
  p: "mb-2 text-slate-900",
};

export default function DirectoryFAQ() {
  return (
    <Card className="flex flex-col justify-center p-4">
      <CardContent className="p-2 md:p-4">
        <h2 className={textStyles.h2}>Quick FAQs</h2>

        <Accordion type="multiple">
          <AccordionItem value="quick-1">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                How difficult is this escape room?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Difficulty levels vary by room. This venue offers rooms ranging
                from beginner-friendly to advanced challenges. See the
                difficulty ratings in the listing details.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quick-2">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>Do I need to book in advance?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Yes, advance booking is recommended, especially for evenings and
                weekends. Contact the venue directly to secure your preferred
                time slot.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quick-3">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>How many people can play?</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Most rooms accommodate 2-8 players, but capacity varies by room.
                Some venues can accommodate larger groups by booking multiple
                rooms.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quick-4">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Is this escape room kid-friendly?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Check the "Kid-friendly" tag in the filters section. Rooms
                marked as kid-friendly offer age-appropriate themes and puzzles
                suitable for younger players.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quick-5">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                How long does the experience last?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Most escape rooms are designed to last 60 minutes, with
                additional time for briefing and debriefing. Plan to spend about
                75-90 minutes total at the venue.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
