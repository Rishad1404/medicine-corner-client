import { CheckoutForm } from "@/components/modules/customer/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-18 px-4 pb-32">
      <div className="max-w-[1100px] mx-auto">

        <CheckoutForm />
        
      </div>
    </div>
  );
}