import HeroSection from "@/components/HeroSection";
import { userService } from "../services/user.service";



export default async function Home() {

  const {data,error}=await userService.getSession()
  console.log(data);

  return (
    <div>
      <HeroSection/>
    </div>
  );
}
