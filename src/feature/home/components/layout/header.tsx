"use client";

import { Button } from "@/shared/components/shadcn/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderType = {
	scrollToSection: (sectionId: string) => void;
	activeSection: string;
};

export function Header({ scrollToSection, activeSection }: HeaderType) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleTabClick = async ({
		sectionId,
		mobile = false,
	}: { sectionId: string; mobile?: boolean }) => {
		if (mobile) {
			// First close the menu and wait for animation to complete
			setIsMenuOpen(false);

			// Wait for the menu close animation to complete 0.2 seconds is the duration set in the motion.div
			await new Promise((resolve) => setTimeout(resolve, 200));

			// Then scroll to section
			scrollToSection(sectionId);
		} else {
			scrollToSection(sectionId);
			setIsMenuOpen(false);
		}
	};

	return (
		<header
			className={`sticky top-0 z-40 h-[7.7dvh] w-full transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md" : "bg-white/80"} backdrop-blur-md`}
		>
			{/* w-full mx-auto px-8 2xl:max-w-[1400px] */}
			<div className="mx-auto flex h-full w-full items-center justify-between px-8 2xl:max-w-[1400px]">
				<Image
					src="/logo.svg"
					alt="MARE! Logo"
					width={50}
					height={50}
					className="h-10 w-auto cursor-pointer"
					onClick={() => handleTabClick({ sectionId: "hero", mobile: true })}
					priority
				/>

				{/* Desktop Navigation */}
				<nav className="hidden gap-6 md:flex">
					{[
						{ id: "about", label: "About" },
						{ id: "community", label: "Community" },
						{ id: "ourTeam", label: "Our Team" },
						{ id: "impact", label: "Impact" },
						{ id: "contact", label: "Contact" },
					].map((item) => {
						return (
							<button
								type="button"
								key={item.id}
								onClick={() => handleTabClick({ sectionId: item.id })}
								className={`group cursor-pointer font-medium text-sm transition-colors ${activeSection === item.id ? "text-[#038167]" : "text-gray-600 hover:text-[#038167]"}`}
							>
								{item.label}
								<span
									className={`block h-0.5 bg-[#038167] transition-all duration-300 ${activeSection === item.id ? "max-w-full" : "max-w-0 group-hover:max-w-full"}`}
								/>
							</button>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<Link href="/login">
						<Button
							variant="outline"
							className="mr-2 cursor-pointer border-[#038167]/20 transition-all hover:bg-[#038167]/5 hover:text-[#038167]"
						>
							Login
						</Button>
					</Link>

					{/* Mobile Menu Toggle */}
					<button
						type="button"
						className="cursor-pointer p-2 text-gray-600 md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="absolute top-[7.7dvh] w-full overflow-hidden border-t bg-white md:hidden"
					>
						<div className="mx-auto flex w-full flex-col space-y-4 px-8 py-4 2xl:max-w-[1400px] ">
							{[
								{ id: "about", label: "About" },
								{ id: "community", label: "Community" },
								{ id: "ourTeam", label: "Our Team" },
								{ id: "impact", label: "Impact" },
								{ id: "contact", label: "Contact" },
							].map((item) => (
								<button
									type="button"
									key={item.id}
									onClick={() =>
										handleTabClick({ sectionId: item.id, mobile: true })
									}
									className={`cursor-pointer rounded-md px-4 py-2 text-left ${activeSection === item.id ? "bg-[#038167]/10 text-[#038167]" : "text-gray-600"}`}
								>
									{item.label}
								</button>
							))}
							<Button
								className="mt-2 cursor-pointer bg-gradient-to-r from-[#038167] to-[#026853] text-white shadow-md transition-all hover:from-[#026853] hover:to-[#01574a] hover:shadow-lg"
								onClick={() => {
									setIsMenuOpen(false);
								}}
							>
								Join Our Community
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
