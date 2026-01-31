import Image from "next/image";


const Logo = () => {
  return (
  <div className="flex items-center gap-2">
    <Image
      src="/logo.png"
      alt="Medicine Corner Logo"
      width={150}
      height={60}
      className="h-16 w-auto object-contain"
      priority 
    />

  </div>
  );
};

export default Logo;
