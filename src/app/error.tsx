"use client"; 

import { useEffect } from "react";
import { Button } from "@/components/ui/button"; 


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {

    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50 text-center">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="max-w-md text-gray-500">
        We encountered an unexpected error. Our team has been notified.
      </p>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => reset()} 
          variant="outline"
        >
          Try Again
        </Button>
        <Button 
          onClick={() => window.location.href = "/"} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}