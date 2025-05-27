import { Badge } from "@/shared/components/shadcn/ui/badge";
import { Button } from "@/shared/components/shadcn/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Users } from "lucide-react";
import Image from "next/image";
import type { RefObject } from "react";
import { toast } from "sonner";
import { OurTeamMember } from "./our-team-member";

export function OurTeam({
	sectionRef,
}: { sectionRef: RefObject<HTMLDivElement | null> }) {
	return (
		<>
			<div className="h-48 bg-gradient-to-b from-white to-[#e6f3f1]" />
			<section className="bg-gradient-to-b from-[#e6f3f1] to-white">
				<div
					className="mx-auto w-full px-4 md:px-8 2xl:max-w-[1400px]"
					ref={sectionRef}
				>
					<div className="relative z-10 mx-auto w-full px-4 py-20 md:px-8 2xl:max-w-[1400px]">
						<div className="grid h-full w-full items-center">
							{/* 1 */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, ease: "easeIn" }}
								className="mb-16 flex w-full flex-col items-center gap-3 lg:mb-20"
							>
								<Badge className="bg-[#F69C91]/20 text-[#F69C91]">
									Our People
								</Badge>
								<h2 className="bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-center font-bold text-3xl/tight text-transparent tracking-tighter md:text-4xl/tight">
									Our Team
								</h2>
								<div className="h-1 w-20 rounded-full bg-[#038167]" />
								<p className="max-w-[40rem] text-center text-gray-700 text-lg">
									Meet the dedicated individuals who make MARE! possible. Our
									team combines waste management expertise with community
									organizing skills.
								</p>
							</motion.div>

							{/* 2 */}
							<OurTeamMember />

							{/* 3 */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, ease: "easeIn" }}
								className="rounded-2xl border border-[#e6f3f1] bg-gradient-to-br from-[#e6f3f1] to-[#ecf6f4] p-8 shadow-sm"
							>
								<div className="flex flex-col gap-5 lg:flex-row">
									{/* 1 */}
									<div className="flex w-full flex-col gap-5">
										<div>
											<Badge className="mb-2 bg-[#F69C91]/20 text-[#F69C91]">
												Careers
											</Badge>
											<h2 className="bg-clip-text font-bold text-2xl/tight text-[#026853] tracking-tighter md:text-4xl/tight">
												Join Our Team
											</h2>
											<div className="h-1 w-20 rounded-full bg-[#038167]" />
										</div>
										<p className="text-gray-700 text-lg">
											MARE! is always looking for passionate individuals to join
											our mission. We offer:
										</p>
										<ul className="mb-8 space-y-2">
											<li className="flex items-start">
												<div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
													<CheckCircle className="h-4 w-4" />
												</div>
												<span className="ml-3 text-gray-700">
													Meaningful work with direct community impact
												</span>
											</li>
											<li className="flex items-start">
												<div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
													<CheckCircle className="h-4 w-4" />
												</div>
												<span className="ml-3 text-gray-700">
													Training in waste management and recycling
												</span>
											</li>
											<li className="flex items-start">
												<div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
													<CheckCircle className="h-4 w-4" />
												</div>
												<span className="ml-3 text-gray-700">
													Competitive compensation and growth opportunities
												</span>
											</li>
											<li className="flex items-start">
												<div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
													<CheckCircle className="h-4 w-4" />
												</div>
												<span className="ml-3 text-gray-700">
													A supportive team environment
												</span>
											</li>
										</ul>
										<Button
											className="w-fit cursor-pointer bg-gradient-to-r from-[#038167] to-[#026853] text-white shadow-md transition-all hover:from-[#026853] hover:to-[#01574a] hover:shadow-lg"
											onClick={() => {
												toast.info(
													"This feature is currently under development.",
												);
											}}
										>
											View Open Positions
										</Button>
									</div>

									{/* 2 */}
									<div className="flex w-full items-center">
										<div className="relative h-[350px] w-full rounded-2xl border-4 border-white/20">
											<Image
												src="/homepage/about_cover.png"
												alt="MARE! community members working together"
												fill
												className="h-full w-full rounded-2xl object-cover shadow-2xl"
												priority
												sizes="(max-width: 1024px) 0px, (max-width: 1536px) 50vw, 700px"
											/>
											<div className="-bottom-4 -right-4 absolute rounded-lg bg-white p-4 shadow-lg">
												<div className="flex items-center gap-3">
													<div className="rounded-full bg-[#e6f3f1] p-2">
														<Users className="h-5 w-5 text-[#038167]" />
													</div>
													<div>
														<p className="font-semibold text-gray-800 text-sm">
															Join our team
														</p>
														<p className="text-gray-500 text-xs">
															Make an impact today
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
