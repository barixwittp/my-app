export function AirQualityForecast({ data }: { data: { day: string; aqi: number }[] }) {
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500"
    if (aqi <= 100) return "bg-yellow-500"
    if (aqi <= 150) return "bg-orange-500"
    if (aqi <= 200) return "bg-red-500"
    if (aqi <= 300) return "bg-purple-500"
    return "bg-maroon-500"
  }

  const maxAqi = Math.max(...data.map((d) => d.aqi))

  return (
    <div className="flex justify-between items-end h-32">
      {data.map(({ day, aqi }) => (
        <div key={day} className="flex flex-col items-center gap-2">
          <div
            className={`w-12 ${getAqiColor(aqi)} rounded-sm`}
            style={{
              height: `${(aqi / maxAqi) * 100}%`,
              minHeight: "20px",
            }}
          >
            <div className="text-white text-center">{aqi}</div>
          </div>
          <div className="text-gray-700">{day}</div>
        </div>
      ))}
    </div>
  )
}

