import { ProductCard } from "@/components/modules/home/product-card";
import { FilterSidebar } from "@/components/modules/shop/filter-sidebar";
import { ShopHeader } from "@/components/modules/shop/shop-header"; 
import { getMedicines } from "@/actions/medicine.actions"; 
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { categoryService } from "@/app/services/category.service";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ShopPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  const [medicinesData, categoriesData] = await Promise.all([
    getMedicines(searchParams),
    categoryService.getCategories()
  ]);
  
  const products = medicinesData?.data?.data || [];
  const meta = medicinesData?.data?.meta || {}; 
  const rawCategories = categoriesData?.data?.data || []; 
  const categoriesList = Array.isArray(rawCategories) ? rawCategories.map((c: any) => c.name) : [];

  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams as any);
    if (pageNumber > 1) params.set("page", pageNumber.toString());
    else params.delete("page");
    return `?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <ShopHeader />

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <aside className="hidden md:block w-48 shrink-0 sticky top-20 pt-2">
             <div className="flex items-center gap-2 mb-6 text-slate-500 font-bold text-xs uppercase tracking-wider">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Refine Selection
             </div>
             <FilterSidebar categories={categoriesList} />
          </aside>

          <main className="flex-1 w-full min-w-0">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">
                  {searchParams.search ? `Results for "${searchParams.search}"` : "All Medicines"}
                </h2>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                  {products.length} Items Found
                </span>
             </div>

             {products.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                  {products.map((item: any) => (
                    <div key={item.id} className="h-full">
                      <ProductCard product={item} />
                    </div>
                  ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-24 bg-white border border-slate-200 rounded-xl border-dashed">
                  <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-slate-300" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">No Results Found</h3>
                  <Button variant="link" className="mt-2 text-xs text-indigo-600" asChild>
                    <Link href="/shop">Clear Search</Link>
                  </Button>
               </div>
             )}

             {/* PAGINATION */}
             <div className="mt-12 flex items-center justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={Number(meta.page) <= 1} 
                  asChild={Number(meta.page) > 1}
                  className="h-8 px-4 font-semibold border-slate-200 bg-white text-xs shadow-sm"
                >
                  {Number(meta.page) > 1 ? (
                    <Link href={getPageUrl(Number(meta.page) - 1)}><ChevronLeft className="h-3.5 w-3.5 mr-1" /> Prev</Link>
                  ) : "Prev"}
                </Button>

                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide px-2">
                   Page {meta.page || 1} of {meta.totalPage || 1}
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={Number(meta.page) >= (Number(meta.totalPage) || 1)} 
                  asChild={Number(meta.page) < (Number(meta.totalPage) || 1)}
                  className="h-8 px-4 font-semibold border-slate-200 bg-white text-xs shadow-sm"
                >
                  {Number(meta.page) < (Number(meta.totalPage) || 1) ? (
                    <Link href={getPageUrl(Number(meta.page) + 1)}>Next <ChevronRight className="h-3.5 w-3.5 ml-1" /></Link>
                  ) : "Next"}
                </Button>
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}