import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type LayoutType = {
	scrollToSection: (sectionId: string) => void;
	activeSection: string;
	children: ReactNode;
};

export function Layout({
	children,
	scrollToSection,
	activeSection,
}: LayoutType) {
	return (
		<div className="grid min-h-[100dvh] grid-cols-1 grid-rows-[auto_1fr_auto]">
			<Header scrollToSection={scrollToSection} activeSection={activeSection} />
			<main>{children}</main>
			<Footer scrollToSection={scrollToSection} />
		</div>
	);
}
