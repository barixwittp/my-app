import { Bell, Info, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Settings() {
  return (
    <main className="flex-1 p-4 space-y-4">
      <Button variant="default" className="w-full bg-[#40C4AA] hover:bg-[#35A892] text-white py-6 flex gap-2">
        <Bell className="h-6 w-6" />
        NOTIFICATIONS
      </Button>

      <Button variant="default" className="w-full bg-[#40C4AA] hover:bg-[#35A892] text-white py-6">
        MISC
      </Button>

      <Button variant="default" className="w-full bg-[#40C4AA] hover:bg-[#35A892] text-white py-6 flex gap-2">
        <Info className="h-6 w-6" />
        ABOUT
      </Button>

      <Button variant="default" className="w-full bg-[#40C4AA] hover:bg-[#35A892] text-white py-6 flex gap-2">
        <Heart className="h-6 w-6" />
        RATE THIS APP
      </Button>
    </main>
  )
}

