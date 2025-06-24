import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/shared/components/shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const data = [
	{
		barangay: "Barangay San Isidro",
		city: "Manila",
		review:
			"MARE! transformed how our community handles waste. We've reduced our landfill contribution by 75% and created 5 new jobs for local residents.",
	},
	{
		barangay: "Barangay Mabuhay",
		city: "Quezon City",
		review:
			"Our MARE! Center has become a community hub where residents learn about sustainability while contributing to a cleaner environment.",
	},
	{
		barangay: "Barangay Bagong Pag-asa",
		city: "Cebu",
		review:
			"The income from our recycled materials has funded community projects and provided additional income for participating households.",
	},
];

export function CommunityStories() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(1);
	const [count, setCount] = useState(0);

	const plugin = useRef(Autoplay({ delay: 2000 }));

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const handleMouseEnter = useCallback(() => {
		plugin.current?.stop();
	}, []);

	const handleMouseLeave = useCallback(() => {
		plugin.current?.reset();
		plugin.current?.play();
	}, []);

	const nextCount = () => {
		api?.scrollNext();
	};
	const previousCount = () => {
		api?.scrollPrev();
	};

	return (
		<div className="flex w-full flex-col items-center gap-7 lg:gap-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4, ease: "easeIn" }}
			>
				<h2 className="text-center font-bold text-2xl text-[#026853]">
					Community Success Stories
				</h2>
				<div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#038167] text-center" />
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.4, ease: "easeIn" }}
			>
				{/* todo */}
				{/* broken layout in mobile */}
				<Carousel
					plugins={[plugin.current]}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					opts={{ loop: true }}
					setApi={setApi}
					className="relative w-full overflow-hidden "
				>
					<CarouselContent className="h-full min-h-[25.113rem] w-full">
						{data.map((item) => (
							<CarouselItem key={item.city} className="w-full">
								<div className="inset-shadow-sm flex h-full w-full select-none flex-col items-center justify-center rounded-2xl border border-gray-300/95 bg-white shadow-lg duration-300 hover:inset-shadow-sm/15 hover:shadow-xl">
									<p className="text-center font-bold text-[#026853] text-xl">
										{item.barangay}
									</p>
									<p className="text-center text-gray-500 text-sm">
										{item.city}
									</p>
									<p className="w-full max-w-[42rem] text-center text-gray-700 text-lg italic">
										&ldquo;{item.review}&ldquo;
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					<div className="absolute right-0 bottom-6 left-0">
						<div className="flex justify-center gap-5">
							<button
								type="button"
								onClick={previousCount}
								className="cursor-pointer rounded-full bg-[#e6f3f1] p-2 text-[#038167] duration-300 hover:bg-[#d1ebe7]"
							>
								<ChevronLeft className="h-5 w-5" />
							</button>
							<div className="flex items-center justify-center gap-1">
								{Array.from({ length: count }).map((_, index) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className={`h-2 w-2 rounded-full border border-gray-300 duration-300 ${
											current === index + 1 ? "bg-[#038167]" : "bg-[#e6f3f1]"
										}`}
									/>
								))}
							</div>
							<button
								type="button"
								onClick={nextCount}
								className="cursor-pointer rounded-full bg-[#e6f3f1] p-2 text-[#038167] duration-300 hover:bg-[#d1ebe7]"
							>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>
					</div>

					<div className="-translate-y-1/2 absolute inset-shadow-sm top-0 right-0 h-64 w-64 translate-x-1/2 rounded-full bg-[#e6f3f1] opacity-50 shadow-2xl" />
					<div className="-translate-x-1/2 absolute inset-shadow-sm bottom-0 left-0 h-64 w-64 translate-y-1/2 rounded-full bg-[#e6f3f1] opacity-50 shadow-2xl" />
				</Carousel>
			</motion.div>
		</div>
	);
}
