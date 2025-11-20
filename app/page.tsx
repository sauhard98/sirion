export default function Home() {
  return (
    <main className="min-h-screen bg-background-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-display-xl font-bold text-gradient">
            Welcome to Sirion
          </h1>
          <p className="text-body-xl text-neutral-700 max-w-2xl mx-auto">
            AI-Powered Contract Management Platform
          </p>
          <div className="flex justify-center gap-4 pt-8">
            <div className="px-6 py-3 bg-sirion-primary text-white rounded-lg font-medium hover:bg-sirion-primary-dark transition-colors cursor-pointer">
              Get Started
            </div>
            <div className="px-6 py-3 border-2 border-sirion-primary text-sirion-primary rounded-lg font-medium hover:bg-sirion-primary hover:text-white transition-all cursor-pointer">
              Learn More
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
