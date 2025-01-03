import BookingForm from "@/components/BookingForm";
import Image from "next/image";

export default function Home() {
  return (
  <main className="container mx-auto py-8">
    <h1 className="text-3xl font-bold text-center mb-8">
    Restaurant Reservation
    </h1>
    <BookingForm/>
  </main>
  );
}
