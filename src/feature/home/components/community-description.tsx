import { Button } from "@/shared/components/shadcn/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/shadcn/ui/dialog";
import { motion } from "framer-motion";
import { ArrowRight, Building, Home, Users } from "lucide-react";

const data = [
	{
		logo: "Home",
		title: "Residents",
		description:
			"Local community members learn proper waste segregation and participate in collection events. They become the foundation of our circular economy model.",
		modal: {
			description:
				"Residents are the foundation of the MARE! ecosystem. By properly segregating waste at home and participating in collection events, they contribute to a cleaner community and a healthier environment.",
			category: [
				{
					title: "Benefits for Residents",
					description: [
						"Cleaner neighborhoods and reduced waste-related health hazards",
						"Potential income from recyclable materials",
						"Educational opportunities about sustainable living",
						"Pride in contributing to environmental conservation",
					],
				},
			],
			footer: {
				title: "How to Participate",
				description:
					"Residents can join MARE! by attending community orientation sessions, implementing proper waste segregation at home, and participating in scheduled collection events.",
			},
		},
	},
	{
		logo: "Users",
		title: "Barangay Leaders",
		description:
			"Local government officials who champion MARE! in their communities, providing support and resources to ensure program success and compliance with waste management policies.",
		modal: {
			description:
				"Barangay leaders play a crucial role in implementing MARE! in their communities. They provide the necessary support, resources, and policy framework to ensure the program's success.",
			category: [
				{
					title: "Role of Barangay Leaders",
					description: [
						"Champion waste management initiatives in the community",
						"Allocate resources for MARE! implementation",
						"Enforce waste management policies",
						"Coordinate with MARE! team for program implementation",
						"Monitor and evaluate program impact",
					],
				},
			],
			footer: {
				title: "Success Stories",
				description:
					"Barangay San Isidro in Manila reduced their landfill contribution by 75% within six months of implementing MARE!, while creating 5 new jobs for local residents.",
			},
		},
	},
	{
		logo: "Building",
		title: "Franchisees",
		description:
			"Local entrepreneurs who operate MARE! Centers in their communities, creating sustainable businesses while solving waste management challenges.",
		modal: {
			description:
				"MARE! franchisees are local entrepreneurs who operate MARE! Centers in their communities. They play a vital role in the collection, segregation, and processing of recyclable materials.",
			category: [
				{
					title: "Benefits for Franchisees",
					description: [
						"Profitable business opportunity with social and environmental impact",
						"Comprehensive training and ongoing support",
						"Access to MARE!'s network of recyclers and processors",
						"Marketing and community engagement support",
						"Opportunity to be a community leader in sustainability",
					],
				},
			],
			footer: {
				title: "Investment and Returns",
				description:
					"MARE! franchisees typically recover their initial investment within 12-18 months, with ongoing revenue streams from material sales, service fees, and community partnerships.",
			},
		},
	},
];

const IconMap = {
	Home: Home,
	Users: Users,
	Building: Building,
} as const;

export function CommunityDescription() {
	return (
		<div className="mb-16 grid w-full flex-col items-center gap-7 lg:mb-20 lg:grid-cols-3 lg:gap-8">
			{data.map((item, index) => {
				const Icon = IconMap[item.logo as keyof typeof IconMap];
				return (
					<motion.div
						key={item.title}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.4,
							ease: "circInOut",
							delay: index * 0.3,
						}}
						className="flex h-full flex-col gap-2 rounded-xl border border-[#e6f3f1] bg-white p-6 shadow duration-300 hover:shadow-2xl lg:gap-3 lg:p-8"
					>
						<Icon className="h-14 w-14 rounded-full bg-[#F69C91] p-3 text-white shadow-lg" />
						<h2 className="font-bold text-[#026853] text-xl">{item.title}</h2>
						<p className="flex-1 text-gray-600">{item.description}</p>
						<Dialog>
							<DialogTrigger asChild>
								<div className="group flex items-center gap-0.5">
									<button
										type="button"
										className="cursor-pointer items-center font-medium text-[#038167] text-sm group-hover:underline"
									>
										Learn more
									</button>
									<ArrowRight className="h-4 w-4 text-[#038167] transition-transform group-hover:translate-x-1" />
								</div>
							</DialogTrigger>
							<DialogContent className="max-h-[90dvh] overflow-auto sm:max-w-[500px]">
								<DialogHeader>
									<DialogTitle>
										<span className="font-bold text-2xl text-[#026853] tracking-tight">
											{item.title}
										</span>
									</DialogTitle>
									<DialogDescription>
										<span className="flex flex-col gap-5">
											<span className="block text-base">
												{item.modal.description}
											</span>
											{item.modal.category.map((sub) => {
												return (
													<span className="flex flex-col gap-3" key={sub.title}>
														<span className="mt-4 block font-semibold text-[#038167] text-lg">
															{sub.title}
														</span>
														<span className="block text-base">
															{sub.description}
														</span>
													</span>
												);
											})}
											<span className="flex flex-col gap-2">
												<span className="mt-4 block font-semibold text-[#038167] text-lg">
													{item.modal.footer.title}
												</span>
												<span className="block text-base">
													{item.modal.footer.description}
												</span>
											</span>
										</span>
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											type="submit"
											className="w-full cursor-pointer"
											variant="outline"
										>
											Close
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</motion.div>
				);
			})}
		</div>
	);
}
