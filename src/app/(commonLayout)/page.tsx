import HeroSection from "@/components/HeroSection";
import { userService } from "../services/user.service";
import { medicineService } from "../services/medicine.service";
import { categoryService } from "../services/category.service";
import { CategoryGrid } from "@/components/modules/home/category-grid";
import { FeaturedShop } from "@/components/modules/home/featured-shop";
import { TrustBar } from "@/components/modules/home/trust-bar";

export default async function Home() {

  const [sessionRes, catRes, medRes] = await Promise.all([
    userService.getSession(),
    categoryService.getCategories(),
    medicineService.getAllMedicines()
  ]);

  const categories = catRes?.data || [];
  const medicinesData = medRes?.data || [];

  return (
    <main className="space-y-20 pb-20">

      <HeroSection />
      
      <FeaturedShop medicines={medicinesData} />

      <CategoryGrid categories={categories} />


      <TrustBar />



    </main>
  );
}