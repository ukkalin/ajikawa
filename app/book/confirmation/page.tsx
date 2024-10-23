"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function ConfirmationPage() {
  const [bookingDetails, setBookingDetails] = useState<{ date: string; time: string } | null>(null)
  const searchParams = useSearchParams()
  const paymentIntent = searchParams.get('payment_intent')
  const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret')

  useEffect(() => {
    const storedDetails = localStorage.getItem('bookingDetails')
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails))
      localStorage.removeItem('bookingDetails') // Clear the stored details
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Booking Confirmation</CardTitle>
          <CardDescription>Your guitar lesson has been booked successfully!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {bookingDetails && (
            <>
              <p><strong>Date:</strong> {new Date(bookingDetails.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {bookingDetails.time}</p>
            </>
          )}
          <p><strong>Payment Status:</strong> Successful</p>
          <p><strong>Payment ID:</strong> {paymentIntent}</p>
          <Button asChild className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}