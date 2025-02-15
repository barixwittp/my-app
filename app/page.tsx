import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Welcome() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-light text-[#40C4AA] mb-2">Welcome</h1>
      <p className="text-xl text-[#40C4AA] mb-12">And Thankyou For Using Our App</p>

      <div className="relative w-32 h-32 mb-8">
        <Image src="/placeholder.svg" alt="Y.E.A. Logo" fill className="object-contain" />
      </div>

      <h2 className="text-xl text-[#1E88E5] mb-6">Youth Environmental Awareness (Y.E.A.)</h2>

      <div className="flex gap-4 mb-12">
        <Link href="#" className="w-10 h-10">
          <Image src="/placeholder.svg" alt="Facebook" width={40} height={40} className="object-contain" />
        </Link>
        <Link href="#" className="w-10 h-10">
          <Image src="/placeholder.svg" alt="Instagram" width={40} height={40} className="object-contain" />
        </Link>
      </div>

      <Button asChild className="w-full bg-[#40C4AA] hover:bg-[#35A892] text-white rounded-full py-6 text-xl">
        <Link href="/monitor">START</Link>
      </Button>

      <div className="flex gap-2 mt-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={cn("w-2 h-2 rounded-full", i === 5 ? "bg-red-500" : "bg-gray-300")} />
        ))}
      </div>
    </main>
  )
}

