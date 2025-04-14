"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

// Record Collection Modal
export function RecordCollectionModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [date, setDate] = useState<Date>()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<<<<<<< Updated upstream
      <DialogContent className="sm:max-w-[500px]">
=======
      <DialogContent className="sm:max-w-[500px] bg-white">
>>>>>>> Stashed changes
        <DialogHeader>
          <DialogTitle>Record Collection</DialogTitle>
          <DialogDescription>Add a new waste collection record</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="barangay-san-isidro">Barangay San Isidro</SelectItem>
                <SelectItem value="barangay-mabuhay">Barangay Mabuhay</SelectItem>
                <SelectItem value="barangay-bagong-pag-asa">Barangay Bagong Pag-asa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Collection Date</Label>
            <Popover>
              <PopoverTrigger asChild>
<<<<<<< Updated upstream
                <Button color="outline" className="w-full justify-start text-left font-normal">
=======
                <Button variant="outline" className="w-full justify-start text-left font-normal">
>>>>>>> Stashed changes
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plastic">Plastic (kg)</Label>
              <Input id="plastic" type="number" placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paper">Paper (kg)</Label>
              <Input id="paper" type="number" placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metal">Metal (kg)</Label>
              <Input id="metal" type="number" placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="glass">Glass (kg)</Label>
              <Input id="glass" type="number" placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organic">Organic (kg)</Label>
              <Input id="organic" type="number" placeholder="0.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="others">Others (kg)</Label>
              <Input id="others" type="number" placeholder="0.0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea id="notes" placeholder="Add any additional information here..." />
          </div>
        </div>

        <DialogFooter>
<<<<<<< Updated upstream
          <Button color="outline" onClick={() => onOpenChange(false)}>
=======
          <Button variant="outline" onClick={() => onOpenChange(false)}>
>>>>>>> Stashed changes
            Cancel
          </Button>
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">Save Record</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Add Event Modal
export function AddEventModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [date, setDate] = useState<Date>()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<<<<<<< Updated upstream
      <DialogContent className="sm:max-w-[500px]">
=======
      <DialogContent className="sm:max-w-[500px] bg-white">
>>>>>>> Stashed changes
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>Schedule a new community event</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="Enter event title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
<<<<<<< Updated upstream
                <Button color="outline" className="w-full justify-start text-left font-normal">
=======
                <Button variant="outline" className="w-full justify-start text-left font-normal">
>>>>>>> Stashed changes
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter event location" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter event description..." />
          </div>
        </div>

        <DialogFooter>
<<<<<<< Updated upstream
          <Button color="outline" onClick={() => onOpenChange(false)}>
=======
          <Button variant="outline" onClick={() => onOpenChange(false)}>
>>>>>>> Stashed changes
            Cancel
          </Button>
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">Save Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
