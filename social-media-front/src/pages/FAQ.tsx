import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function FAQ() {
  return (
    <div>
      <div className="container mx-auto px-4 pt-14 pb-24">
        <div className="text-center space-y-6 mb-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions? We're here to help. If you can't find what you're
            looking for, please don't hesitate to contact our support team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-6">
            <AccordionItem
              value="item-1"
              className="border border-border/40 rounded-xl px-6 shadow-lg shadow-primary/5 backdrop-blur-sm bg-background/50"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6 [&[data-state=open]>svg]:rotate-45">
                <div className="flex gap-3 items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    01
                  </span>
                  <span>What is your return policy?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                We offer a 30-day return policy for all unused items in their
                original packaging. Shipping costs for returns are the
                responsibility of the customer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-border/40 rounded-xl px-6 shadow-lg shadow-primary/5 backdrop-blur-sm bg-background/50"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6 [&[data-state=open]>svg]:rotate-45">
                <div className="flex gap-3 items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    02
                  </span>
                  <span>How long does shipping take?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                Standard shipping typically takes 3-5 business days within the
                continental US. International shipping can take 7-14 business
                days depending on the destination.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-border/40 rounded-xl px-6 shadow-lg shadow-primary/5 backdrop-blur-sm bg-background/50"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6 [&[data-state=open]>svg]:rotate-45">
                <div className="flex gap-3 items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    03
                  </span>
                  <span>Do you offer international shipping?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                Yes, we ship to most countries worldwide. International shipping
                rates vary by location and will be calculated at checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-border/40 rounded-xl px-6 shadow-lg shadow-primary/5 backdrop-blur-sm bg-background/50"
            >
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6 [&[data-state=open]>svg]:rotate-45">
                <div className="flex gap-3 items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    04
                  </span>
                  <span>How can I track my order?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                Once your order ships, you'll receive a tracking number via
                email. You can use this number to track your package on our
                website or the carrier's website.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
