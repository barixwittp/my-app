"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AlertSettings() {
  const [threshold, setThreshold] = useState(100)

  const handleSave = () => {
    // Save threshold to user preferences
    console.log(`Saving alert threshold: ${threshold}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Alert Settings</h2>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-24"
        />
        <span>AQI</span>
      </div>
      <Button onClick={handleSave}>Save Alert Threshold</Button>
    </div>
  )
}

