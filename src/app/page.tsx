"use client";

import { About } from "@/feature/home/components/about";
import { Community } from "@/feature/home/components/community";
import { Contact } from "@/feature/home/components/contact";
import { Hero } from "@/feature/home/components/hero";
import { Impact } from "@/feature/home/components/impact";
import { Layout } from "@/feature/home/components/layout";
import { OurTeam } from "@/feature/home/components/our-team";
import { useEffect, useRef, useState } from "react";

type SectionType =
	| "hero"
	| "about"
	| "community"
	| "ourTeam"
	| "impact"
	| "contact";

export default function Home() {
	const [activeSection, setActiveSection] = useState<SectionType>("hero");
	const heroRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const communityRef = useRef<HTMLDivElement>(null);
	const ourTeamRef = useRef<HTMLDivElement>(null);
	const impactRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);

	const sectionRefs = {
		hero: heroRef,
		about: aboutRef,
		community: communityRef,
		ourTeam: ourTeamRef,
		impact: impactRef,
		contact: contactRef,
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleScroll = () => {
			// Determine active section
			const current = Object.entries(sectionRefs).find(([, ref]) => {
				if (!ref.current) return false;
				const rect = ref.current.getBoundingClientRect();
				return rect.top <= 100 && rect.bottom >= 100;
			});

			if (current) {
				setActiveSection(current[0] as SectionType);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		if (sectionId in sectionRefs) {
			const section = sectionRefs[sectionId as SectionType].current;
			if (section) {
				const headerHeight = window.innerHeight * (7.7 / 100);
				const elementPosition = section.getBoundingClientRect().top;
				const offsetPosition =
					elementPosition + window.pageYOffset - headerHeight;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		}
	};

	return (
		<Layout scrollToSection={scrollToSection} activeSection={activeSection}>
			<Hero sectionRef={heroRef} scrollToSection={scrollToSection} />
			<About sectionRef={aboutRef} />
			<Community sectionRef={communityRef} />
			<OurTeam sectionRef={ourTeamRef} />
			<Impact sectionRef={impactRef} />
			<Contact sectionRef={contactRef} />
		</Layout>
	);
}
