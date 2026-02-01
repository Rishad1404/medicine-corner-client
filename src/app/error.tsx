"use client"; 

import { useEffect } from "react";
import { Button } from "@/components/ui/button"; 
import ErrorPage from "./error-page-01/page";


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
   <>
   <ErrorPage/>
   </>
  );
}