import { ShieldCheck, Truck, Headphones, Award } from "lucide-react";

export function TrustBar() {
  const points = [
    { icon: ShieldCheck, title: "Genuine Pharma", desc: "Sourced from verified labs" },
    { icon: Truck, title: "Cold-Chain Delivery", desc: "Temperature controlled" },
    { icon: Headphones, title: "Pharmacist Help", desc: "24/7 Professional advice" },
    { icon: Award, title: "Govt. Licensed", desc: "Drug Admin Certified" },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {points.map((p, i) => (
        <div key={i} className="flex flex-col items-center text-center p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent hover:border-indigo-100 transition-all">
          <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-indigo-600 shadow-sm mb-6">
            <p.icon className="h-7 w-7" />
          </div>
          <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{p.title}</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </section>
  );
}