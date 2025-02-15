'use client'
 
import { useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <div className="mt-2">
            <p>Something went wrong! Please try again later.</p>
            <button
              onClick={reset}
              className="mt-4 rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Try again
            </button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
