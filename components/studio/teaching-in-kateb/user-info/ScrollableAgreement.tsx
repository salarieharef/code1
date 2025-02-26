import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Modal from "@/components/ui/modals/modal";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

interface ScrollableAgreementProps {
  title: string;
  content: string;
  isModalRules: boolean;
  setIsModalRules: (open: boolean) => void;
  onAccept: (accepted: boolean) => void;
  initialAccepted: boolean;
}

const ScrollableAgreement = ({
  title,
  content,
  isModalRules,
  setIsModalRules,
  onAccept,
  initialAccepted,
}: ScrollableAgreementProps) => {
  const contentRef = useRef(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [tempChecked, setTempChecked] = useState(initialAccepted);

  const { ref: intersectionRef, entry } = useIntersection({
    root: contentRef.current,
    threshold: 1.0,
  });

  const isBottom = !!entry?.isIntersecting;

  useEffect(() => {
    if (isBottom) {
      setHasScrolledToBottom(true);
    }
  }, [isBottom]);

  useEffect(() => {
    setTempChecked(initialAccepted);
  }, [initialAccepted]);

  // Handle final acceptance with button
  const handleAcceptance = () => {
    if (tempChecked) {
      onAccept(true);
      setIsModalRules(false);
    }
  };

  return (
    <Modal open={isModalRules} onOpenChange={() => setIsModalRules(false)}>
      <div>
        <p className='pb-2 text-center font-semibold'>{title}</p>
        <Separator orientation='horizontal' />
      </div>

      <Card className='mx-auto w-full max-w-md'>
        <CardContent ref={contentRef} className='h-80 overflow-y-auto p-4'>
          <p className='text-sm'>{content}</p>
          <span ref={intersectionRef}></span>
        </CardContent>
      </Card>

      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex items-center justify-center gap-2'>
          <Checkbox
            id='rules_accepted_modal'
            disabled={!hasScrolledToBottom || initialAccepted}
            checked={tempChecked}
            onCheckedChange={(checked) => setTempChecked(checked as boolean)}
          />
          <label
            htmlFor='rules_accepted_modal'
            className={cn(
              "select-none text-sm font-medium leading-none",
              (!hasScrolledToBottom || initialAccepted) &&
                "cursor-not-allowed opacity-50"
            )}
          >
            تمام قوانین و ضوابط را می‌پذیرم.
          </label>
        </div>

        <Button
          disabled={!hasScrolledToBottom || !tempChecked || initialAccepted}
          variant='default'
          className={cn(
            "w-full max-w-[200px]",
            (!hasScrolledToBottom || !tempChecked || initialAccepted) &&
              "cursor-not-allowed opacity-50"
          )}
          onClick={handleAcceptance}
        >
          تایید و ثبت قوانین
        </Button>
      </div>
    </Modal>
  );
};

export default ScrollableAgreement;
