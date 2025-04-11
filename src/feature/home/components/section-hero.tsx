"use client";
import { useInViewport } from "@mantine/hooks";
import { useEffect } from "react";
import { headerStore } from "../stores/headerStore";

export default function SectionHero() {
	const { inViewport, ref } = useInViewport();
	const { setCurrentSection } = headerStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (inViewport) setCurrentSection("hero");
	}, [inViewport]);
	return (
		<>
			<section
				className="h-[92dvh] bg-gradient-to-r from-[#026853]/90 to-[#038167]/90"
				id="hero"
			>
				<div className="w-full after:content-['']" ref={ref} />
				<div className="mx-auto h-[8dvh] px-2 md:max-w-[1200px]">
					SectionHero
				</div>
			</section>
			<section className="h-10 w-full bg-gradient-to-b from-[#038167] to-white after:content-['']" />
		</>
	);
}
