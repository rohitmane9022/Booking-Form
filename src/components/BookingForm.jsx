"use client"
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Calendar } from './ui/calendar';
import { z } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import AvailabilityDisplay from './AvailabilityDisplay';
import axios from 'axios';
import BookingSummary from './BookingSummary';


const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string().min(1, "A time slot is required."),
  guests: z.number().min(1, "At least one guest is required.").max(10, "Maximum 10 guests allowed."),
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
})

const api="http://localhost:4000"

const BookingForm = () => {
  const [step,setStep]= useState(1)
  const [bookingData, setBookingData] = useState(null)
  const [loading,setLoading]= useState(false)

  const form= useForm({
    resolver:zodResolver(formSchema),
    defaultValues: {
      guests: 1,
    },
  })
  const onSubmit = async (values) => {
    try {
      const formattedValues = { ...values, date: values.date.toISOString() };
      const res = await axios.post(`${api}/booking`, formattedValues);
      console.log("API Response:", res.data);
  
     
      setBookingData({
        ...values, 
        date: values.date, 
      });
      setStep(3); 
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
    }
  };
  

  const fetchBooking = async () => {
    try {
      setLoading(true); 
      const res = await axios.get(`${api}/booking`);
      
      setLoading(false); 
    } catch (error) {
      setLoading(false); 
      console.error("Error fetching booking data:", error);
    }
  };

  useEffect(()=>{
    if (step === 3) {
      fetchBooking(); 
    }
  },[step])
  
  if (step === 3) {
    return <BookingSummary booking={bookingData} />
  }
  
  return (
   <Card className="w-full max-w-lg mx-auto">
    <CardHeader>
        <CardTitle>Book a Reservation</CardTitle>
        <CardDescription>Fill out the form below to make your reservation.</CardDescription>
      </CardHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-5 px-6 space-y-4">
        {step===1 && (
          <>
          <FormField
          name="date"
          control={form.control}
          render={({field})=>(
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Calendar
               mode="single"
               selected={field.value}
               onSelect={field.onChange}
               disabled={(date)=> date < new Date()}
               className="rounded-md border"
               />
               <FormMessage/>
            </FormItem>
          )}
          />
          <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => setStep(2)}>Next</Button>
          
          </>
        )}
        {step===2&&
        (
          <>
          <AvailabilityDisplay date={form.getValues('date')}
                  onSelectTime={(time) => form.setValue('time', time)}/>

          <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Book Reservation</Button>       
          </>
        )}

      </form>
    </Form>

   </Card>
  )
}

export default BookingForm