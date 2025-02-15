export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
        <div className="mt-4 text-center text-sm text-muted-foreground">Loading...</div>
      </div>
    </div>
  )
}
