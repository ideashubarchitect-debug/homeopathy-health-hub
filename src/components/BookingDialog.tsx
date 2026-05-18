import { ReactNode, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import IntakeFlow from "./IntakeFlow";

interface BookingDialogProps {
  children: ReactNode;
  defaultConsultationType?: "acute-initial" | "acute-followup" | "chronic-initial" | "chronic-followup";
}

const BookingDialog = ({ children, defaultConsultationType }: BookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-3xl w-[95vw] p-0 gap-0 max-h-[92vh] overflow-hidden flex flex-col"
      >
        <section
          ref={scrollRef}
          className="overflow-y-auto p-6 sm:p-10"
        >
          <IntakeFlow
            onCancel={() => setOpen(false)}
            cancelLabel="Close"
            defaultConsultationType={defaultConsultationType}
            scrollContainerRef={scrollRef}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
