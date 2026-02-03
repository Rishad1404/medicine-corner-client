import { CheckoutForm } from "@/components/modules/customer/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4 pb-32">
      <div className="max-w-[1100px] mx-auto">
        
  
        <div className="mb-10 text-center md:text-left">
           <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Checkout</h1>
           <p className="text-slate-500">Complete your purchase safely and securely.</p>
        </div>
        

        <CheckoutForm />
        
      </div>
    </div>
  );
}