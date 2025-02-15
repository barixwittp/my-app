import { Card } from "@/components/ui/card"

interface HealthRecommendationsProps {
  aqi: number
}

export function HealthRecommendations({ aqi }: HealthRecommendationsProps) {
  const getRecommendations = (aqi: number) => {
    if (aqi <= 50) {
      return [
        "Air quality is good. Enjoy your outdoor activities!",
        "It's a great day for exercising outside.",
        "No need for any special precautions.",
      ]
    } else if (aqi <= 100) {
      return [
        "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
        "Consider reducing prolonged or heavy exertion outdoors.",
        "Watch for symptoms such as coughing or shortness of breath.",
      ]
    } else {
      return [
        "Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects.",
        "Avoid prolonged or heavy exertion outdoors.",
        "If you have respiratory or heart disease, follow your doctor's advice for dealing with episodes of unhealthy air quality.",
        "Consider staying indoors and rescheduling outdoor activities.",
      ]
    }
  }

  const recommendations = getRecommendations(aqi)

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Health Recommendations</h2>
      <ul className="list-disc pl-5 space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </Card>
  )
}

