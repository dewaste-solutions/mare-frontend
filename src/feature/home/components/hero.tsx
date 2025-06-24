import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/shadcn/ui/avatar";
import { Badge } from "@/shared/components/shadcn/ui/badge";
import { Button } from "@/shared/components/shadcn/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Recycle, Users } from "lucide-react";
import Image from "next/image";
import type { RefObject } from "react";
import { toast } from "sonner";

type HeroType = {
	scrollToSection: (sectionId: string) => void;
	sectionRef: RefObject<HTMLDivElement | null>;
};

export function Hero({ sectionRef, scrollToSection }: HeroType) {
	return (
		<section
			className="w-full bg-gradient-to-r from-[#026853]/90 to-[#038167]/90"
			ref={sectionRef}
		>
			<div className="flex h-[92.3dvh] w-full flex-col">
				<div className="mx-auto w-full flex-1 px-4 md:px-8 2xl:max-w-[1400px]">
					<div className="grid h-full w-full items-center lg:grid-cols-2 lg:gap-8">
						{/* 1 */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, ease: "easeIn" }}
							className="flex w-full flex-col gap-5"
						>
							<div className="flex flex-col gap-3">
								<Badge className="bg-[#FFC539] text-[#038167] backdrop-blur-sm">
									Transforming Communities
								</Badge>
								<h1 className="font-bold text-5xl/tight tracking-tighter md:text-6xl ">
									<span className="block text-white">MARE!</span>
									<span className="block text-[#FFC539]">Community</span>
								</h1>
								<div className="mb-6 h-1.5 w-40 rounded-full bg-[#F69C91]" />
							</div>
							<div className="flex flex-col gap-3">
								<p className="text-[#e6f3f1] text-xl md:text-2xl">
									People-powered materials recovery
								</p>
								<p className="max-w-lg text-lg text-white/80">
									Join our growing network of communities and workers
									transforming waste management across the Philippines.
								</p>
							</div>
							<div className="flex flex-wrap gap-4">
								<Button
									size="lg"
									className="group flex cursor-pointer items-center justify-center gap-1 bg-white text-[#026853] text-base shadow-lg transition-all duration-300 hover:bg-[#e6f3f1] hover:shadow-xl"
									onClick={() => {
										toast.info("This feature is currently under development.");
									}}
								>
									Join Our Community
									<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
								<Button
									size="lg"
									className="cursor-pointer border border-white/60 bg-[#038167] text-base text-white backdrop-blur-sm duration-300 hover:border-[#038167] hover:bg-white/60 hover:text-[#026853]"
									onClick={() => scrollToSection("ourTeam")}
								>
									Meet Our Team
								</Button>
							</div>
							<div className="flex items-center gap-5">
								<div className="-space-x-3 flex">
									<Avatar className="h-10 w-10 border-2 border-white">
										<AvatarImage
											src="homepage/avatar_1.png"
											alt="Community member"
										/>
										<AvatarFallback>CM</AvatarFallback>
									</Avatar>
									<Avatar className="h-10 w-10 border-2 border-white">
										<AvatarImage
											src="homepage/avatar_2.png"
											alt="Community member"
										/>
										<AvatarFallback>CM</AvatarFallback>
									</Avatar>
									<Avatar className="h-10 w-10 border-2 border-white">
										<AvatarImage
											src="homepage/avatar_3.png"
											alt="Community member"
										/>
										<AvatarFallback>CM</AvatarFallback>
									</Avatar>
								</div>
								<div className="flex flex-col">
									<p className="font-semibold text-[#FFC539] text-sm">
										1,000+ community members
									</p>
									<p className="block text-sm text-white/70">already joined</p>
								</div>
							</div>
						</motion.div>

						{/* 2 */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: 0.4, ease: "easeIn" }}
							className="relative hidden h-[450px] w-full rounded-2xl border-4 border-white/20 lg:block"
						>
							<Image
								src="/homepage/hero_cover.png"
								alt="MARE! community members working together"
								fill
								className="h-full w-full rounded-2xl object-cover shadow-2xl"
								priority
								sizes="(max-width: 1024px) 0px, (max-width: 1536px) 50vw, 700px"
							/>

							<div className="-bottom-6 -left-6 absolute rounded-lg bg-white p-4 shadow-xl">
								<div className="flex items-center gap-3">
									<div className="rounded-full bg-[#F69C91]/25 p-2">
										<Recycle className="h-6 w-6 text-[#F69C91]" />
									</div>
									<div>
										<p className="font-semibold text-[#F69C91] text-sm">
											85% Waste Diversion
										</p>
										<p className="text-gray-500 text-xs">
											Achieved in our communities
										</p>
									</div>
								</div>
							</div>
							<div className="-top-6 -right-6 absolute rounded-lg bg-white p-4 shadow-xl">
								<div className="flex items-center gap-3">
									<div className="rounded-full bg-[#FFC539]/20 p-2">
										<Users className="h-6 w-6 text-[#FFC539]" />
									</div>
									<div>
										<p className="font-semibold text-[#FFC539] text-sm">
											50+ Local Jobs
										</p>
										<p className="text-gray-500 text-xs">Created and growing</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				<div className="h-16 w-full bg-gradient-to-t from-white to-transparent" />
			</div>
		</section>
	);
}
