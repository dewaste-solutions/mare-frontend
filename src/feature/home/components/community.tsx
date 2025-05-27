import { Badge } from "@/shared/components/shadcn/ui/badge";
import { motion } from "framer-motion";
import { type RefObject, useEffect, useState } from "react";
import { CommunityDescription } from "./community-description";
import { CommunityStories } from "./community-stories";

export function Community({
	sectionRef,
}: { sectionRef: RefObject<HTMLDivElement | null> }) {
	const [isCommunityInView, setIsCommunityInView] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current) return;

			const rect = sectionRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const elementHeight = rect.height;

			// Calculate how much of the element is visible
			const visibleHeight =
				Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
			const visiblePercentage = (visibleHeight / elementHeight) * 100;

			// Set true if more than _% is visible
			setIsCommunityInView(visiblePercentage >= 30);
		};

		window.addEventListener("scroll", handleScroll);
		// Call once on mount to check initial position
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section
			className={`relative w-full before:absolute before:inset-0 before:z-0 before:bg-gradient-to-br before:from-[#e6f3f1] before:to-[#f5faf9] before:opacity-0 before:transition-opacity before:duration-700 ${
				isCommunityInView ? "before:opacity-100" : "before:opacity-0"
			}`}
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
						<Badge className="bg-[#FFC539]/20 text-[#FFC539]">Our People</Badge>
						<h2 className="bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-center font-bold text-3xl/tight text-transparent tracking-tighter md:text-4xl/tight">
							Our Community
						</h2>
						<div className="h-1 w-20 rounded-full bg-[#038167]" />
						<p className="w-full max-w-[40rem] text-center text-gray-700 text-lg">
							MARE! brings together diverse stakeholders to create a thriving
							ecosystem of waste management champions.
						</p>
					</motion.div>

					{/* 2 */}
					<CommunityDescription />

					{/* 3 */}
					<CommunityStories />
				</div>
			</div>
		</section>
	);
}
