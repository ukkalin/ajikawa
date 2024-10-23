"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

// Mock data for bookings
const mockBookings = [
  { id: 1, date: '2023-05-15', time: '14:00', status: 'Upcoming' },
  { id: 2, date: '2023-05-10', time: '11:00', status: 'Completed' },
  { id: 3, date: '2023-05-05', time: '09:00', status: 'Completed' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Access Denied</h1>
        <p>Please log in to view your dashboard.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session?.user?.name}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>View and manage your guitar lessons</CardDescription>
          </CardHeader>
          <CardContent>
            {mockBookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center mb-4 p-4 bg-secondary rounded-lg">
                <div>
                  <p className="font-semibold">{booking.date} at {booking.time}</p>
                  <p className="text-sm text-muted-foreground">{booking.status}</p>
                </div>
                {booking.status === 'Upcoming' && (
                  <Button variant="outline" size="sm">Cancel</Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account and bookings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/book">Book a New Lesson</Link>
            </Button>
            <Button variant="outline" className="w-full">View Lesson History</Button>
            <Button variant="outline" className="w-full">Update Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}