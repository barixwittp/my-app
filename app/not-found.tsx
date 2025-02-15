import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Alert className="max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>
          <div className="mt-2">
            <p>Could not find the requested resource.</p>
            <Link 
              href="/"
              className="mt-4 inline-block rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Return Home
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
