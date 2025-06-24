import { AnimatedCounter } from "@/shared/components/animated-counter";
import { Badge } from "@/shared/components/shadcn/ui/badge";
import { motion } from "framer-motion";
import { type RefObject, useEffect, useState } from "react";
import { ImpactDescription } from "./impact-description";

const statsData = [
	{ value: 85, symbol: "%", label: "Waste Diversion Rate" },
	{ value: 12, symbol: "+", label: "Communities Served" },
	{ value: 50, symbol: "+", label: "Local Jobs Created" },
	{ value: 1000, symbol: "+", label: "Households Participating" },
];

export function Impact({
	sectionRef,
}: { sectionRef: RefObject<HTMLDivElement | null> }) {
	const [isImpactInView, setIsImpactInView] = useState(false);

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
			setIsImpactInView(visiblePercentage >= 30);
		};

		window.addEventListener("scroll", handleScroll);
		// Call once on mount to check initial position
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section
			className={`relative w-full before:absolute before:inset-0 before:z-0 before:bg-gradient-to-br before:from-[#e6f3f1] before:to-[#f5faf9] before:opacity-0 before:transition-opacity before:duration-700 ${
				isImpactInView ? "before:opacity-100" : "before:opacity-0"
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
						<Badge className="bg-[#FFC539]/20 text-[#FFC539]">Our Result</Badge>
						<h2 className="bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-center font-bold text-3xl/tight text-transparent tracking-tighter md:text-4xl/tight">
							Our Impact
						</h2>
						<div className="h-1 w-20 rounded-full bg-[#038167]" />
						<p className="w-full max-w-[40rem] text-center text-gray-700 text-lg">
							MARE! create positive change for communities, workers, and the
							environment.
						</p>
					</motion.div>

					{/* 2 */}
					<ImpactDescription />

					{/* 3 */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, ease: "easeIn" }}
						className="mt-16"
					>
						<div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#038167] to-[#026853] shadow-xl">
							<div className="relative grid gap-8 p-10 text-center md:grid-cols-4">
								{statsData.map((stat) => (
									<div key={stat.label} className="relative z-10">
										{/* <div className="mb-2 font-bold text-5xl text-white">
											{stat.value}
										</div> */}
										<p className="mb-2 flex items-center justify-center gap-1 font-bold text-5xl text-white">
											<AnimatedCounter target={stat.value} duration={3} />
											<span>{stat.symbol}</span>
										</p>
										<div className="mx-auto mb-2 h-1 w-12 rounded-full bg-[#a3e0d6]" />
										<p className="text-[#e6f3f1]">{stat.label}</p>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
