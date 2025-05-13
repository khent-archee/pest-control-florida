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

export default function HoleInOneFAQ() {
  return (
    <Card className="flex flex-col justify-center p-4">
      <CardContent className="p-2 md:p-4">
        <h2 className={textStyles.h2}>Mini Golf Hole-in-One FAQs</h2>

        <Accordion type="multiple">
          <AccordionItem value="q1">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                What is a hole-in-one in mini golf?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                A hole-in-one occurs when a player successfully gets the ball
                into the hole with just one stroke. This is one of the most
                exciting achievements in mini golf and often earns special
                recognition.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Are hole-in-ones common in mini golf?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                While more common than in regular golf, hole-in-ones in mini
                golf still require skill and sometimes a bit of luck. Some holes
                are specifically designed to make hole-in-ones possible but
                challenging.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Do mini golf courses offer prizes for hole-in-ones?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Many mini golf courses offer special prizes for hole-in-ones,
                particularly on designated challenge holes. Prizes can range
                from free games to small merchandise items, depending on the
                course.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Are there special holes designed for hole-in-one opportunities?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Yes, many courses feature specially designed holes that offer
                hole-in-one opportunities. The 19th hole is often designed as a
                bonus hole where players can attempt to win a free game by
                scoring a hole-in-one.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                How are hole-in-ones verified at mini golf courses?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Most mini golf courses rely on the honor system among playing
                groups, though some modern facilities use technology to track
                shots. At tournaments or special events, staff members may be
                stationed at specific holes to verify hole-in-ones.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q6">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Do mini golf tournaments have special hole-in-one contests?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Yes, many mini golf tournaments feature special hole-in-one
                contests on designated holes. These contests often have larger
                prizes and may be sponsored by local businesses.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q7">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Are there any special rules related to hole-in-ones?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                In casual play, a hole-in-one is simply celebrated and recorded
                on the scorecard. In tournaments, players might need to have
                witnesses or notify course staff to claim any associated prizes.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q8">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Do professional mini golf players get hole-in-ones often?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Professional mini golfers have developed techniques that allow
                them to achieve hole-in-ones more regularly on certain hole
                designs. In competitive play, the world record for a perfect
                round includes 18 holes-in-one, though this is extremely rare.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q9">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                What should I do if I get a hole-in-one?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Celebrate your achievement! If the course offers prizes for
                hole-in-ones, notify a staff member. Many courses also have a
                hall of fame or recognition board where your name might be
                added.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q10">
            <AccordionTrigger>
              <h3 className={textStyles.h3}>
                Can I improve my chances of getting a hole-in-one?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <p className={textStyles.p}>
                Observe how the ball rolls on each hole and watch other players'
                shots. Practice your putting technique and learn to control your
                power. Pay attention to any slopes, bumps, or obstacles that
                might help guide your ball to the hole.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
