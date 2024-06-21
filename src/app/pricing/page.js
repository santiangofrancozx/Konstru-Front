'use client'
import { Navbar } from "@/components/navbars/navbar";
import { Pricing } from "@/components/pricing";
import { CardFooter } from "@/components/ui/card";


export default function PricingRender() {
  return (
    <div className="bg-zinc-800">
        <Navbar/>
        <Pricing />
    </div>
  );
}