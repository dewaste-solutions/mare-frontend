// src/feature/collection/components/add-collection-sheet.tsx
"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/shared/components/shadcn/ui/sheet";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Input } from "@/shared/components/shadcn/ui/input";
import { Label } from "@/shared/components/shadcn/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/components/shadcn/ui/select";
import { Textarea } from "@/shared/components/shadcn/ui/textarea";
import { Plus } from "lucide-react";

export default function AddCollectionSheet() {
  return (
    <Sheet>
      {/* green trigger button */}
      <SheetTrigger asChild>
        <Button size="sm" className="bg-[#038167] hover:bg-[#026b52] text-white">
          <Plus className="mr-1 h-4 w-4" />
          Add Collection
        </Button>
      </SheetTrigger>

      {/* drawer */}
      <SheetContent side="right" className="w-[420px] max-w-full p-6">
        <SheetHeader>
          <SheetTitle>Add collection log</SheetTitle>
          <SheetDescription>
            Add collection log, specify the waste type, weight and location of
            the collection area.
          </SheetDescription>
        </SheetHeader>

        {/* form */}
        <form className="mt-6 flex flex-col space-y-4 overflow-y-auto pb-10">
          <Field label="Waste Type">
            <Select name="wasteType">
              <SelectTrigger>
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recyclable">Recyclable</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Collected Weight (in Kg)">
            <Input type="number" min={0} step="0.01" placeholder="Enter weight" />
          </Field>

          <Field label="Facility">
            <Input value="Facility 1 – Brgy. Tayuman" disabled />
          </Field>

          <Field label="Location">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tayuman">Facility 1 – Brgy. Tayuman</SelectItem>
                <SelectItem value="intramuros">Facility 2 – Intramuros</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Item Category">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select item category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plastic">Plastic</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Sub Category">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select sub category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bottle">Bottle</SelectItem>
                <SelectItem value="bag">Bag</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Item Name">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select item name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coke-bottle">Coke Bottle</SelectItem>
                <SelectItem value="shopping-bag">Shopping Bag</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Photo">
            <label
              htmlFor="photo"
              className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-center text-sm text-muted-foreground"
            >
              <Plus className="mb-2 h-5 w-5" />
              Drag and drop or click to upload
              <br />
              PNG or JPG
            </label>
            <Input id="photo" type="file" accept="image/*" className="hidden" />
          </Field>

          <Field label="Notes (optional)">
            <Textarea placeholder="Add optional notes.." rows={3} />
          </Field>

          <Button type="submit" className="mt-6 bg-[#038167] hover:bg-[#026b52]">
            Submit
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

/* reusable wrapper with tight label/control gap */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-[13px] font-medium">{label}</Label>
      {children}
    </div>
  );
}
