"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Combine } from "lucide-react";
import { useState } from "react";

import AddCollectionSheet from "@/feature/collection/components/add-collection-sheet";
import CollectionTable from "@/feature/collection/components/collection-table";
import { DateTabsList } from "@/feature/collection/components/date-tabs";

/* sample card data */
const dateData = [
	{ date: "April 2, Mon", weight: "Weight: 20kg", type: "Type: Recyclable" },
	{ date: "April 3, Tue", weight: "Weight: 20kg", type: "Type: Recyclable" },
	{ date: "April 4, Wed", weight: "Weight: 20kg", type: "Type: Recyclable" },
	{ date: "April 5, Thu", weight: "Weight: 20kg", type: "Type: Recyclable" },
];

export default function CollectionPage() {
	const [client] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={client}>
			<section className="space-y-6 p-6">
				{/* header */}
				<header className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Combine size={22} className="text-[#038167]" />
						<div>
							<h1 className="font-semibold text-2xl leading-tight">
								Waste Collection
							</h1>
							<p className="-mt-0.5 text-muted-foreground text-sm">
								View logs or add a new collection entry.
							</p>
						</div>
					</div>

					{/* green button wrapped in SheetTrigger inside component */}
					<AddCollectionSheet />
				</header>

				{/* date cards */}
				<h2 className="font-semibold text-sm">For this week</h2>
				<DateTabsList data={dateData} />

				{/* collection history table */}
				<CollectionTable />
			</section>
		</QueryClientProvider>
	);
}
