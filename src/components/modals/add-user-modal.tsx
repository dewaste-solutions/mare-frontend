"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Add User Request</DialogTitle>
          <DialogDescription>Add a user to the pending requests list</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4"> 
          <div className="space-y-2">
            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
            <div className="mt-1">
              <Input id="email" placeholder="email@example.com" className="w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger id="role" className="bg-white w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Community Member">Community Member</SelectItem>
                <SelectItem value="Barangay Representative">Barangay Representative</SelectItem>
                <SelectItem value="Franchisee">Franchisee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-[#038167] hover:bg-[#026852] text-white">Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}