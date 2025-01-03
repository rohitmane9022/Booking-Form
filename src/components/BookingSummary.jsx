import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export default function BookingSummary({ booking }) {
  // Check if booking data exists
  if (!booking) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Booking Confirmation</CardTitle>
          <CardDescription>No booking data available.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Ensure date is valid
  const bookingDate = new Date(booking.date);
  if (isNaN(bookingDate)) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Booking Confirmation</CardTitle>
          <CardDescription>Invalid date provided.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Booking Confirmation</CardTitle>
        <CardDescription>Your reservation has been successfully booked.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Date:</strong> {format(bookingDate, 'MMMM d, yyyy')}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Number of Guests:</strong> {booking.guests}</p>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
        </div>
      </CardContent>
    </Card>
  );
}
