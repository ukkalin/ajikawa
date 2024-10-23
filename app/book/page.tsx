"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns'

const timeSlots = ['09:00', '11:00', '14:00', '16:00']

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()))
  const [availableSlots, setAvailableSlots] = useState<{ [key: string]: string[] }>({})
  const router = useRouter()

  useEffect(() => {
    fetchAvailableSlots()
  }, [currentWeekStart])

  const fetchAvailableSlots = async () => {
    const startDate = format(currentWeekStart, 'yyyy-MM-dd')
    const endDate = format(endOfWeek(currentWeekStart), 'yyyy-MM-dd')
    const response = await fetch(`/api/calendar?start=${startDate}&end=${endDate}`)
    const events = await response.json()

    const slots: { [key: string]: string[] } = {}
    for (let i = 0; i < 7; i++) {
      const date = format(addDays(currentWeekStart, i), 'yyyy-MM-dd')
      slots[date] = timeSlots.filter(time => {
        const eventStart = `${date}T${time}:00`
        return !events.some((event: any) => event.start.dateTime === eventStart)
      })
    }
    setAvailableSlots(slots)
  }

  const handleBooking = async () => {
    if (selectedDate && selectedTime) {
      const date = format(selectedDate, 'yyyy-MM-dd')
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time: selectedTime }),
      })

      if (response.ok) {
        localStorage.setItem('bookingDetails', JSON.stringify({ 
          date: selectedDate.toISOString(), 
          time: selectedTime 
        }))
        router.push('/book/payment')
      } else {
        // Handle error
        console.error('Failed to book lesson')
      }
    }
  }

  const nextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7))
  }

  const prevWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7))
  }

  const renderDateCards = () => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = addDays(currentWeekStart, index)
      const formattedDate = format(date, 'yyyy-MM-dd')
      const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === formattedDate
      const hasAvailableSlots = availableSlots[formattedDate]?.length > 0

      return (
        <Card 
          key={index} 
          className={`cursor-pointer ${isSelected ? 'border-primary' : ''} ${!hasAvailableSlots ? 'opacity-50' : ''}`}
          onClick={() => hasAvailableSlots && setSelectedDate(date)}
        >
          <CardHeader className="text-center p-2">
            <CardTitle className="text-lg">{format(date, 'EEE')}</CardTitle>
            <CardDescription>{format(date, 'MMM d')}</CardDescription>
          </CardHeader>
        </Card>
      )
    })
  }

  const renderTimeSlots = () => {
    if (!selectedDate) return null
    const formattedDate = format(selectedDate, 'yyyy-MM-dd')
    const availableTimes = availableSlots[formattedDate] || []

    return timeSlots.map((time) => (
      <Button
        key={time}
        variant={selectedTime === time ? "default" : "outline"}
        className="w-full"
        disabled={!availableTimes.includes(time)}
        onClick={() => setSelectedTime(time)}
      >
        {time}
      </Button>
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book a Guitar Lesson</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select a Date</CardTitle>
          <CardDescription>Choose your preferred lesson date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button onClick={prevWeek} variant="outline">Previous Week</Button>
            <span>{format(currentWeekStart, 'MMMM d, yyyy')}</span>
            <Button onClick={nextWeek} variant="outline">Next Week</Button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderDateCards()}
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select a Time</CardTitle>
          <CardDescription>Choose your preferred lesson time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {renderTimeSlots()}
          </div>
        </CardContent>
      </Card>
      <Button 
        onClick={handleBooking} 
        disabled={!selectedDate || !selectedTime}
        className="w-full"
      >
        Proceed to Payment
      </Button>
    </div>
  )
}