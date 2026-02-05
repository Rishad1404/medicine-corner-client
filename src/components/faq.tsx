"use client";

import { Plus, PhoneCall, MessageCircleQuestion, Sparkles } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const medicineFaq = [
  {
    question: "How do I upload my prescription?",
    answer: "You can upload your prescription directly on the checkout page or through your profile dashboard. Our registered pharmacists will verify it before processing your order.",
  },
  {
    question: "How long does medicine delivery take?",
    answer: "Orders within Dhaka city are delivered within 24 hours. For locations outside Dhaka, it usually takes 2-3 business days.",
  },
  {
    question: "Are the medicines authentic and unexpired?",
    answer: "Yes, we source all medicines directly from reputable manufacturers. We strictly monitor expiry dates and batch numbers for every shipment.",
  },
  {
    question: "Can I return temperature-sensitive insulin?",
    answer: "To ensure safety and efficacy, we cannot accept returns on cold-chain items like insulin once delivered. Please check items upon receipt.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes, we offer Cash on Delivery across Bangladesh. You can also pay securely via bKash, Nagad, or any major credit/debit card.",
  },
  {
    question: "How should I store my medicines?",
    answer: "Most medicines should be stored in a cool, dry place away from sunlight. Specific storage instructions are mentioned on the packaging.",
  },
  {
    question: "What if my required medicine is out of stock?",
    answer: "You can click the 'Notify Me' button on the product page. We will send you an alert via email or SMS as soon as the stock is replenished.",
  },
  {
    question: "Are there any delivery charges?",
    answer: "Delivery is ৳60 within Dhaka and ৳120 for the rest of the country. We often offer free delivery on orders above ৳1000.",
  },
];

const FAQ = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 mx-auto py-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-pink-600 dark:text-pink-400">
            <MessageCircleQuestion className="h-3 w-3" />
            Support Center
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-blue-900 dark:text-white leading-tight">
            Frequently Asked <span className="text-pink-600 dark:text-pink-500">Questions</span>
          </h2>
          
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium max-w-2xl text-base">
            Everything you need to know about our pharmacy services, prescriptions, and delivery process.
          </p>
        </motion.div>

        {/* --- FAQ GRID --- */}
        <div className="grid w-full gap-x-12 md:grid-cols-2 gap-8 items-start">
          
          {/* Column 1 */}
          <Accordion type="multiple" className="w-full space-y-4">
            {medicineFaq.slice(0, 4).map(({ question, answer }, index) => (
              <FaqItem key={index} value={`item-left-${index}`} question={question} answer={answer} />
            ))}
          </Accordion>

          {/* Column 2 */}
          <Accordion type="multiple" className="w-full space-y-4">
            {medicineFaq.slice(4).map(({ question, answer }, index) => (
              <FaqItem key={index} value={`item-right-${index}`} question={question} answer={answer} />
            ))}
          </Accordion>
        </div>

        {/* --- ANIMATED CONTACT CTA --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20 relative overflow-hidden rounded-[2.5rem] bg-blue-900 dark:bg-slate-900 border border-blue-800 dark:border-slate-800 shadow-2xl shadow-blue-900/20"
        >
          {/* Background Gradient Blob */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
             <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-pink-400 font-bold uppercase tracking-widest text-xs">
                  <Sparkles className="h-4 w-4 animate-pulse" /> 24/7 Pharmacist Support
                </div>
                <h4 className="text-3xl font-black text-white tracking-tight">
                  Still have medical questions?
                </h4>
                <p className="text-blue-200 dark:text-slate-400 max-w-lg text-lg">
                  Can't find the answer you're looking for? Chat directly with our certified pharmacists.
                </p>
             </div>

             <Link href="/contact" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200" />
                <button className="relative flex items-center gap-3 bg-white text-blue-900 font-bold py-4 px-8 rounded-full transition-transform transform group-hover:scale-[1.02] active:scale-95 shadow-xl">
                   <div className="bg-pink-100 p-1.5 rounded-full">
                     <PhoneCall className="h-5 w-5 text-pink-600" />
                   </div>
                   Contact Pharmacist
                </button>
             </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- SUB-COMPONENT FOR CLEANER CODE ---
const FaqItem = ({ value, question, answer }: { value: string, question: string, answer: string }) => (
  <AccordionItem 
    value={value}
    className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl px-6 transition-all duration-300 data-[state=open]:border-pink-200 dark:data-[state=open]:border-pink-900/50 data-[state=open]:shadow-lg dark:data-[state=open]:shadow-none"
  >
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-5 font-bold text-left text-base md:text-lg transition-all",
          "text-blue-900 dark:text-slate-200", // Default Text
          "hover:text-pink-600 dark:hover:text-pink-400", // Hover Text
          "[&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:text-pink-600", // Icon Rotation & Color
          "[&[data-state=open]]:text-pink-600 dark:[&[data-state=open]]:text-pink-400" // Active Text Color
        )}
      >
        {question}
        <div className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 transition-colors duration-300 data-[state=open]:bg-pink-50 dark:data-[state=open]:bg-pink-900/20">
           <Plus className="h-5 w-5 text-slate-400 transition-transform duration-300" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
    <AccordionContent className="text-slate-500 dark:text-slate-400 leading-relaxed pb-6 pr-4 text-sm md:text-base font-medium">
      {answer}
    </AccordionContent>
  </AccordionItem>
);

export default FAQ;