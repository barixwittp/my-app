import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface HistoricalDataProps {
  data: { date: string; aqi: number }[]
}

export function HistoricalDataChart({ data }: HistoricalDataProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

