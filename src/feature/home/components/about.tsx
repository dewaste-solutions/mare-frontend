import { Badge } from "@/shared/components/shadcn/ui/badge";
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
import { ArrowUpRight, CheckCircle, Home, Recycle } from "lucide-react";
import Image from "next/image";
import type { RefObject } from "react";

export function About({
	sectionRef,
}: { sectionRef: RefObject<HTMLDivElement | null> }) {
	return (
		<section
			className="mx-auto h-[92.3dvh] w-full overflow-hidden px-4 md:px-8 2xl:max-w-[1400px] "
			ref={sectionRef}
		>
			<div className="grid h-full w-full items-center lg:grid-cols-2 lg:gap-8">
				{/* 1 */}
				<motion.div
					initial={{ opacity: 0, y: 30, x: -50 }}
					whileInView={{ opacity: 1, y: 0, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: "easeIn", delay: 0.1 }}
					className="flex w-full flex-col gap-10"
				>
					<div className="flex flex-col gap-3">
						<Badge className="bg-[#F69C91]/20 text-[#F69C91]">About Us</Badge>
						<h2 className="bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text font-bold text-3xl/tight text-transparent tracking-tighter md:text-4xl/tight">
							About MARE!
						</h2>
						<div className="h-1 w-20 rounded-full bg-[#038167]" />
					</div>
					<div className="flex flex-col gap-4">
						<p className="indent-8 text-gray-700 text-lg tracking-tight">
							MARE!, short for
							<span className="font-semibold text-[#FFC539]">
								{" "}
								Materials Recovery
							</span>
							, is a community-driven solution that brings together residents,
							local workers, and recyclers to create a sustainable waste
							management ecosystem.
						</p>
						<p className="text-gray-700 text-lg tracking-tight">
							&ldquo;We&apos;re a reverse logistics social enterprise that
							recovers
							<span className="font-semibold text-[#FFC539]">
								{" "}
								85% of household waste{" "}
							</span>
							composition and diverts them for recycling/processing, not to
							landfills.
						</p>
						<p className="text-gray-700 text-lg tracking-tight">
							Our mission is to make landfills obsolete and circular economy a
							new norm by empowering communities to take control of their waste
							management.
						</p>
					</div>
					<div className="flex gap-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button className="group flex cursor-pointer items-center justify-center gap-1 bg-[#038167] text-white shadow-md transition-all hover:bg-[#026853] hover:shadow-lg">
									Learn More
									<ArrowUpRight className="group-hover:-translate-y-0.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
								</Button>
							</DialogTrigger>
							<DialogContent className="max-h-[90dvh] overflow-auto sm:max-w-[500px]">
								<DialogHeader>
									<DialogTitle>
										<span className="font-bold text-2xl text-[#026853] tracking-tight">
											About MARE!
										</span>
									</DialogTitle>
									<DialogDescription>
										<span className="flex flex-col gap-5">
											<span className="mt-4 flex flex-col gap-3">
												<span className="block text-base">
													MARE! is a community-driven solution that addresses
													waste management challenges in the Philippines through
													a circular economy approach.
												</span>
												<span className="block text-base">
													Our innovative model brings together residents, local
													government units, and entrepreneurs to create a
													sustainable ecosystem that diverts waste from
													landfills while creating economic opportunities.
												</span>
											</span>
											<span className="flex flex-col gap-2">
												<span className="mt-4 block font-semibold text-[#038167] text-xl">
													Our Vision
												</span>
												<span className="block text-base">
													A Philippines where landfills are obsolete and
													communities thrive through sustainable waste
													management practices.
												</span>
											</span>
											<span className="flex flex-col gap-2">
												<span className="mt-4 block font-semibold text-[#038167] text-xl">
													Our Mission
												</span>
												<span className="block text-base">
													To empower communities to take control of their waste
													management through education, infrastructure, and
													economic incentives.
												</span>
											</span>
											<span className="flex gap-5">
												<span className="block w-full rounded-lg bg-[#e6f3f1] p-4">
													<span className="block font-semibold text-[#038167]">
														85%
													</span>
													<span className="block text-sm">
														Waste diverted from landfills
													</span>
												</span>
												<span className="block w-full rounded-lg bg-[#e6f3f1] p-4">
													<span className="block font-semibold text-[#038167]">
														50+
													</span>
													<span className="block text-sm">
														Local jobs created
													</span>
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
						<div className="flex items-center gap-2 text-gray-500 text-sm">
							<CheckCircle className="h-4 w-4 text-[#038167]" />
							<p>Sustainable Solution</p>
						</div>
					</div>
				</motion.div>

				{/* 2 */}
				<motion.div
					initial={{ opacity: 0, y: 30, x: 50 }}
					whileInView={{ opacity: 1, y: 0, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: "easeIn", delay: 0.1 }}
					className="relative hidden h-[450px] w-full rounded-2xl lg:block"
				>
					<Image
						src="/homepage/about_cover.png"
						alt="MARE! community center"
						fill
						className="h-full w-full rounded-2xl object-cover shadow-2xl"
						priority
						sizes="(max-width: 1024px) 0px, (max-width: 1536px) 50vw, 700px"
					/>
					<div className="-right-6 absolute top-1/4 rounded-lg bg-[#038167] p-3 shadow-lg">
						<Recycle className="h-6 w-6 text-white" />
					</div>
					<div className="-left-6 absolute top-1/2 rounded-lg bg-[#038167] p-3 shadow-lg">
						<Home className="h-6 w-6 text-white" />
					</div>
				</motion.div>
			</div>
		</section>
	);
}
