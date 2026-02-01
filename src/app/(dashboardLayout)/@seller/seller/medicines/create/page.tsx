import { medicineService } from "@/app/services/medicine.service";
import { CreateMedicineForm } from "@/components/modules/seller/create-medicine-form";



const CreateMedicines =async () => {
  const {data}=await medicineService.getCategories()
 const categories=data?.data
  return (
    <div>
        <CreateMedicineForm categories={categories || []}/>
    </div>
  );
};

export default CreateMedicines;