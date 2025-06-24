import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";

const data = [
	{
		profileImage: "",
		name: "Maria Santos",
		position: "Community Coordinator",
		desc: "Works directly with barangays to implement MARE! programs and train community members.",
		links: {
			facebook: "",
			linkedin: "https://www.linkedin.com/in/mariasantos",
			x: "https://x.com/mariasantos",
			instagram: "",
		},
	},
	{
		profileImage: "",
		name: "Juan Reyes",
		position: "Waste Management Specialist",
		desc: "Designs efficient waste segregation systems and trains local workers on proper handling techniques.",
		links: {
			facebook: "",
			linkedin: "https://www.linkedin.com/in/juanreyes",
			x: "",
			instagram: "",
		},
	},
	{
		profileImage: "",
		name: "Ana Lim",
		position: "Franchisee Relations Manager",
		desc: "Supports franchisees with training, resources, and ensures collected materials reach the right processing facilities.",
		links: {
			facebook: "",
			linkedin: "https://www.linkedin.com/in/analim",
			x: "https://x.com/analim",
			instagram: "",
		},
	},
	{
		profileImage: "",
		name: "Carlos Mendoza",
		position: "Education & Outreach",
		desc: "Develops educational materials and conducts workshops on waste management and environmental awareness.",
		links: {
			facebook: "",
			linkedin: "https://www.linkedin.com/in/carlosmendoza",
			x: "",
			instagram: "",
		},
	},
];

export function OurTeamMember() {
	return (
		<div className="mb-16 grid w-full flex-col items-center gap-7 sm:grid-cols-2 lg:mb-20 lg:grid-cols-4 lg:gap-8">
			{data.map((member, index) => (
				<motion.div
					key={member.name}
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.4,
						ease: "circInOut",
						delay: index * 0.3,
					}}
					className="group flex h-full flex-col gap-2 rounded-xl border border-[#e6f3f1] bg-white p-6 shadow duration-300 hover:shadow-2xl lg:gap-3 lg:p-8"
				>
					<div className="flex justify-center">
						{!member.profileImage ? (
							<div className="group-hover:-translate-y-1 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#e6f3f1] bg-[#038167] transition-transform delay-150 duration-300">
								<span className="font-semibold text-2xl text-white">
									{member.name.charAt(0)}
								</span>
							</div>
						) : (
							<img
								src={member.profileImage}
								alt={`${member.name}'s profile`}
								className="group-hover:-translate-y-1 h-24 w-24 rounded-full border-4 border-[#e6f3f1] object-cover transition-transform delay-150 duration-300"
							/>
						)}
					</div>
					<div>
						<h3 className="text-center font-bold text-[#026853] text-xl">
							{member.name}
						</h3>
						<p className="text-center text-[#038167] text-sm">
							{member.position}
						</p>
					</div>
					<p className="mb-1 flex-1 text-center text-gray-500 text-sm">
						{member.desc}
					</p>
					<div className="flex justify-center gap-3">
						{member.links.facebook && (
							<a
								href={member.links.facebook}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bfe2de] bg-[#d3f0ea] text-[#038167] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#c1e6e0]">
									<Facebook className="h-5 w-5" />
								</div>
								<span className="sr-only">Facebook</span>
							</a>
						)}
						{member.links.linkedin && (
							<a
								href={member.links.linkedin}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bfe2de] bg-[#d3f0ea] text-[#038167] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#c1e6e0]">
									<Linkedin className="h-5 w-5" />
								</div>
								<span className="sr-only">LinkedIn</span>
							</a>
						)}
						{member.links.x && (
							<a
								href={member.links.x}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bfe2de] bg-[#d3f0ea] text-[#038167] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#c1e6e0]">
									<X className="h-5 w-5" />
								</div>
								<span className="sr-only">X</span>
							</a>
						)}
						{member.links.instagram && (
							<a
								href={member.links.instagram}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bfe2de] bg-[#d3f0ea] text-[#038167] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#c1e6e0]">
									<Instagram className="h-5 w-5" />
								</div>
								<span className="sr-only">Instagram</span>
							</a>
						)}
					</div>
				</motion.div>
			))}
		</div>
	);
}
