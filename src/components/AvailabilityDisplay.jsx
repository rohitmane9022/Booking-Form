import { useEffect, useState } from "react"
import { Button } from "./ui/button"


const AvailabilityDisplay = ({date,onSelectTime}) => {
  const [availableSlots,setAvailableSlots]= useState([])
  const [selectedTime,setSelectedTime]= useState(null)

  useEffect(()=>{
    const mockSlote=['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

    setAvailableSlots(mockSlote)
  },[date])

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    onSelectTime(time)
  }
  return (
    <div className="space-y-4">
    <h3 className="text-lg font-semibold">Available Time Slots</h3>
    <div className="grid grid-cols-3 gap-2">
      {availableSlots.map((time) => (
        <Button
          key={time}
          variant={selectedTime === time ? 'default' : 'outline'}
          onClick={() => handleTimeSelect(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  </div>
  )
}

export default AvailabilityDisplay