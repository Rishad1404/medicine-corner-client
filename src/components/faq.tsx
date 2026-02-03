"use client";

import { PlusIcon} from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const medicineFaq = [
  {
    question: "How do I upload my prescription?",
    answer:
      "You can upload your prescription directly on the checkout page or through your profile dashboard. Our registered pharmacists will verify it before processing your order.",
  },
  {
    question: "How long does medicine delivery take?",
    answer:
      "Orders within Dhaka city are delivered within 24 hours. For locations outside Dhaka, it usually takes 2-3 business days.",
  },
  {
    question: "Are the medicines authentic and unexpired?",
    answer:
      "Yes, we source all medicines directly from reputable manufacturers and top-tier distributors. We strictly monitor expiry dates and batch numbers for every shipment.",
  },
  {
    question: "Can I return temperature-sensitive insulin?",
    answer:
      "To ensure safety and efficacy, we cannot accept returns on cold-chain items like insulin once delivered. Please check the items thoroughly upon receipt.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes, we offer Cash on Delivery across Bangladesh. You can also pay securely via bKash, Nagad, or any major credit/debit card.",
  },
  {
    question: "How should I store my medicines?",
    answer:
      "Most medicines should be stored in a cool, dry place away from direct sunlight. Specific storage instructions (like refrigeration) are mentioned on the product packaging.",
  },
  {
    question: "What if my required medicine is out of stock?",
    answer:
      "You can click the 'Notify Me' button on the product page. We will send you an alert via email or SMS as soon as the stock is replenished.",
  },
  {
    question: "Are there any delivery charges?",
    answer:
      "Delivery is ৳60 within Dhaka and ৳120 for the rest of the country. We often offer free delivery on orders above ৳1000.",
  },
];

const FAQ = () => {
  // Using separate states or allowing multiple prevents the "dual-column sync" issue
  return (
    <div className="w-full bg-background mx-auto py-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Support Center
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Everything you need to know about our pharmacy services, prescriptions, and delivery process.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid w-full gap-x-12 md:grid-cols-2 gap-10 items-start">
          
          {/* Column 1 */}
          <Accordion type="multiple" className="w-full">
            {medicineFaq.slice(0, 4).map(({ question, answer }, index) => (
              <AccordionItem 
                key={index} 
                value={`item-left-${index}`}
                className="border-b border-border/50 py-2"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold text-start text-base md:text-lg transition-all hover:text-primary [&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:text-primary"
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pr-6">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Column 2 */}
          <Accordion type="multiple" className="w-full">
            {medicineFaq.slice(4).map(({ question, answer }, index) => (
              <AccordionItem 
                key={index} 
                value={`item-right-${index}`}
                className="border-b border-border/50 py-2"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold text-start text-base md:text-lg transition-all hover:text-primary [&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:text-primary"
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pr-6">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
           <div>
              <h4 className="text-xl font-bold">Still have questions?</h4>
              <p className="text-muted-foreground">Our pharmacists are available 24/7 to assist you with medical queries.</p>
           </div>
           <Button className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20">
              Contact Pharmacist
           </Button>
        </div>
      </div>
    </div>
  );
};

// Simple Button shim if not using your UI library's button
const Button = ({ children, className, ...props }: any) => (
  <button className={cn("bg-primary text-primary-foreground font-semibold py-2 px-4 rounded transition-all hover:opacity-90", className)} {...props}>
    {children}
  </button>
);

export default FAQ;