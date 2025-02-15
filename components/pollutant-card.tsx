import { Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PollutantCardProps {
  name: string
  value: number
  unit: string
  status: string
  color: string
}

export function PollutantCard({ name, value, unit, status, color }: PollutantCardProps) {
  return (
    <Card className={cn("p-4 flex items-center justify-between", color)}>
      <div className="flex items-center gap-4">
        <span className="text-xl font-medium text-white">{name}</span>
        <span className="text-white">
          {status} @ {value} {unit}
        </span>
      </div>
      <Info className="text-white" />
    </Card>
  )
}

