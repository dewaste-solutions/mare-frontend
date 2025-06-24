import { Badge } from "@/shared/components/shadcn/ui/badge";
import { motion } from "framer-motion";
import { Building, Calendar, Mail, Phone } from "lucide-react";
import type { RefObject } from "react";

const DATA = [
	{
		icon: Building,
		title: "MARE! Headquarters",
		subtitle: "Manila, Philippines",
	},
	{
		icon: Phone,
		title: "Call Us",
		subtitle: "+63 (2) 123-4567",
	},
	{
		icon: Mail,
		title: "Email Us",
		subtitle: "info@marerecovery.org",
	},
	{
		icon: Calendar,
		title: "Working Hours",
		subtitle: "Mon-Fri: 8AM - 5PM",
	},
];

export function Contact({
	sectionRef,
}: { sectionRef: RefObject<HTMLDivElement | null> }) {
	return (
		<section
			className="relative w-full bg-gradient-to-r from-[#026853]/90 to-[#038167]/90"
			ref={sectionRef}
		>
			<div className="h-16 w-full bg-gradient-to-b from-white to-transparent" />
			<div className="mx-auto h-full w-full px-4 md:px-8 2xl:max-w-[1400px]">
				<div className="relative z-10 mx-auto w-full px-4 py-20 md:px-8 2xl:max-w-[1400px]">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, ease: "easeIn" }}
						className="mb-16 flex w-full flex-col items-center gap-3 lg:mb-20"
					>
						<Badge className="bg-[#4c9788] text-white">Contact</Badge>
						<h2 className="text-center font-bold text-3xl/tight text-white tracking-tighter md:text-4xl/tight">
							Contact Us
						</h2>
						<div className="h-1 w-20 rounded-full bg-[#a3e0d6]" />
						{/* can you change the paragraph here */}
						<p className="max-w-[40rem] text-center text-lg text-white">
							Have questions or want to learn more about MARE!? We're here to
							help! Reach out to us through any of the channels below and our
							team will get back to you as soon as possible.
						</p>
						<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
							{DATA.map((item) => {
								const Icon = item.icon;
								return (
									<div
										key={item.title}
										className="group flex items-center gap-4"
									>
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
											<Icon className="h-6 w-6 text-[#a3e0d6]" />
										</div>
										<div>
											<p className="font-medium text-white">{item.title}</p>
											<p className="text-[#e6f3f1]">{item.subtitle}</p>
										</div>
									</div>
								);
							})}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
