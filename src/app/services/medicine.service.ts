import { env } from "@/env";
import { Medicine } from "@/types";
import { cookies } from "next/headers";


const API_URL = env.API_URL; 



export const medicineService = {
  getCategories: async function () {
    try {
      const cookieStore = await cookies();


      const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        console.log("Backend Error:", res.status, res.statusText);
        return { data: [], error: { message: "Failed to fetch categories" } };
      }

      const categories = await res.json();

      return { data: categories || [], error: null };
    } catch (error) {
      console.log(error);
      return { data: [], error: { message: "Something Went Wrong" } };
    }
  },

 createMedicine:async(medicineData:Medicine)=>{
    try {
      const cookieStore=await cookies();
      const res = await fetch(`${API_URL}/seller/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicineData),
    });

    const data=await res.json();
    if(data.error){
      return {data:null,error:{message:data.error}}
    }

    return {data:data,error:null}
    } catch (error) {
      return {data:null,error:{message:"Something Went Wrong"}}
    }
  },

  getSellerMedicines: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/seller/medicines`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store", 
      });

      if (!res.ok) {
        throw new Error("Failed to fetch medicines");
      }

      const response = await res.json();
      
      return { data: response.data || [], error: null };
    } catch (error) {
      console.log("Service Error:", error);
      return { data: [], error: { message: "Something went wrong" } };
    }
  },
  

};