import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Zoom Guitar Lessons</h1>
      <p className="text-xl mb-8">Book your online guitar lessons with ease and start your musical journey today!</p>
      <div className="space-y-4">
        <Button asChild>
          <Link href="/book">Book a Lesson</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about">Learn More</Link>
        </Button>
      </div>
    </div>
  );
}