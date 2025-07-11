"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcn/ui/table";
import { Input } from "@/shared/components/shadcn/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn/ui/dropdown-menu";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Row = {
  id: string;
  wasteType: string;
  location: string;
  collectedAt: string;
  weight: string;
};

const demo: Row[] = [
  {
    id: "1",
    wasteType: "Recyclable",
    location: "Rizal Park, Ermita Manila (Facility...)",
    collectedAt: "01 April 2025 10:00 AM",
    weight: "20 Kg",
  },
  {
    id: "2",
    wasteType: "Recyclable",
    location: "Rizal Park, Ermita Manila (Facility...)",
    collectedAt: "31 March 2025 10:00 AM",
    weight: "20 Kg",
  },
  // …add more mock rows if needed
];

export default function CollectionTable() {
  const [search, setSearch] = useState("");
  const { data = [], isLoading } = useQuery<Row[]>({
    queryKey: ["collections", search],
    queryFn: async () =>
      demo.filter((r) =>
        r.wasteType.toLowerCase().includes(search.toLowerCase())
      ),
  });

  if (isLoading) return <Skeleton className="h-40 w-full" />;

  return (
    <div className="space-y-4">
      {/* search + columns */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search for waste type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full sm:max-w-xs"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              Columns
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Weight</DropdownMenuItem>
            <DropdownMenuItem>Location</DropdownMenuItem>
            <DropdownMenuItem>Datetime</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table className="min-w-[720px]">
          <TableHeader className="[&_tr]:border-b bg-muted/50 text-muted-foreground">
            <TableRow>
              <TableHead className="w-10 px-4 py-3">
                <input type="checkbox" />
              </TableHead>
              <Sortable label="Waste Type" />
              <Sortable label="Location" />
              <Sortable label="Datetime" />
              <Sortable label="Weight" alignment="right" />
              <TableHead className="w-8 px-4 py-3" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((r) => (
              <TableRow
                key={r.id}
                className="border-b last:border-0 hover:bg-muted/20"
              >
                <TableCell className="w-10 px-4 py-3">
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="px-4 py-3">{r.wasteType}</TableCell>
                <TableCell className="px-4 py-3">{r.location}</TableCell>
                <TableCell className="px-4 py-3">{r.collectedAt}</TableCell>
                <TableCell className="px-4 py-3 text-right">
                  {r.weight}
                </TableCell>
                <TableCell className="w-8 px-4 py-3">
                  <MoreHorizontal size={16} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* footer */}
      <div className="flex flex-col items-center gap-2 pt-2 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <span>{`1 of ${data.length} row(s) selected.`}</span>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function Sortable({
  label,
  alignment = "left",
}: {
  label: string;
  alignment?: "left" | "right";
}) {
  return (
    <TableHead
      className={`px-4 py-3 ${
        alignment === "right" ? "text-right" : "text-left"
      }`}
    >
      <div className="inline-flex items-center gap-1">
        {label}
        <ChevronUp size={12} className="opacity-40" />
      </div>
    </TableHead>
  );
}
