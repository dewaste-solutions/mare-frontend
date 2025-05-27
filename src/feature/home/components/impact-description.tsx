import { motion } from "framer-motion";
import { CheckCircle, Heart, Leaf, Users } from "lucide-react";

const data = [
	{
		logo: "Users",
		title: "Community Benefits",
		list: [
			"Cleaner streets and public spaces",
			"Revenue from recycled materials",
			"Reduced waste management costs",
			"Improved compliance with regulations",
		],
	},
	{
		logo: "Heart",
		title: "Worker Benefits",
		list: [
			"Stable employment opportunities",
			"Skills development and training",
			"Safer working conditions",
			"Pride in environmental stewardship",
		],
	},
	{
		logo: "Leaf",
		title: "Environmental Impact",
		list: [
			"85% diversion of waste from landfills",
			"Reduced plastic pollution in waterways",
			"Lower greenhouse gas emissions",
			"Conservation of natural resources",
		],
	},
];

const IconMap = {
	Users: Users,
	Heart: Heart,
	Leaf: Leaf,
} as const;

export function ImpactDescription() {
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
						<Icon className="h-14 w-14 rounded-full bg-[#006e57] p-3 text-white shadow-lg" />
						<h2 className="font-bold text-[#026853] text-xl">{item.title}</h2>
						<ul className="mb-8 space-y-2">
							{item.list.map((listItem) => (
								<li className="flex items-start" key={listItem}>
									<div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
										<CheckCircle className="h-4 w-4" />
									</div>
									<span className="ml-3 text-gray-700">{listItem}</span>
								</li>
							))}
						</ul>
					</motion.div>
				);
			})}
		</div>
	);
}
