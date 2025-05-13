import { ReactNode } from "react";
import { TooltipWrapper } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function ClickableHover({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  return (
    <>
      <div className="hidden md:flex">
        <TooltipWrapper content={content}>{children}</TooltipWrapper>
      </div>
      <div className="flex md:hidden">
        <Popover>
          <PopoverTrigger>{children}</PopoverTrigger>
          <PopoverContent>{content}</PopoverContent>
        </Popover>
      </div>
    </>
  );
}
