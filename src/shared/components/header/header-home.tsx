"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { headerStore } from "~/feature/home/stores/headerStore";
import { cn } from "~/shared/utils/cn";

const navigationItems = [
	{ label: "About" },
	{ label: "Community" },
	{ label: "Our Team" },
	{ label: "Impact" },
	{ label: "Contact" },
];

export default function HeaderHome() {
	const [isOpen, setIsOpen] = useState(false);
	const [section, setSection] = useState("");
	const { currentSection } = headerStore();

	const scrollToSection = (
		e: React.MouseEvent<HTMLAnchorElement>,
		sectionId: string,
	) => {
		e.preventDefault();
		const element = document.getElementById(sectionId);
		if (element) {
			element.style.scrollMarginTop = "8dvh";
			element.scrollIntoView({ behavior: "smooth" });
			setSection(sectionId);
		}
	};

	useEffect(() => {
		if (currentSection === "") setSection("");
		if (currentSection === "hero") setSection("");
		if (currentSection) setSection(currentSection);
	}, [currentSection]);

	return (
		<header className="sticky top-0 bg-white/80 shadow-md backdrop-blur-md">
			<div className="mx-auto h-[8dvh] px-2 md:max-w-[1200px]">
				<nav className="flex h-full w-full items-center justify-between">
					<div className="">
						<Link href="/" className="" onClick={() => setSection("")}>
							<Image src="./logo.svg" alt="Logo" width={120} height={120} />
						</Link>
					</div>

					<div className="hidden gap-3 md:flex">
						{navigationItems.map((item) => {
							return (
								<div key={item.label} className="hidden md:block">
									<Link
										href={`#${item.label.toLowerCase()}`}
										onClick={(e) =>
											scrollToSection(e, item.label.toLowerCase())
										}
									>
										<>
											{item.label}
											<span
												className={`block h-0.5 bg-[#038167] transition-all duration-300 ${section === item.label.toLowerCase() ? "max-w-full" : "max-w-0 group-hover:max-w-full"}`}
											/>
										</>
									</Link>
								</div>
							);
						})}
					</div>
					<div className="flex items-center gap-3">
						{/* biome-ignore lint/correctness/noConstantCondition: <explanation> */}
						{false ? (
							<Link href="/dashboard" className="">
								dashboard
							</Link>
						) : (
							<Link href="/login" className="">
								login
							</Link>
						)}
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="md:hidden"
						>
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</nav>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="absolute top-[8dvh] left-0 w-full overflow-hidden border-t bg-white shadow-md md:hidden"
					>
						<div className="flex flex-col gap-4 p-4">
							{navigationItems.map((item) => {
								return (
									<div
										key={item.label}
										className={cn(
											"w-full px-4 py-2 text-gray-600",
											currentSection.toLowerCase() ===
												item.label.toLowerCase() &&
												"rounded bg-[#038167]/10 text-[#038167]",
										)}
									>
										<Link
											href={`#${item.label.toLowerCase()}`}
											onClick={(e) =>
												scrollToSection(e, item.label.toLowerCase())
											}
											className="block w-full"
										>
											{item.label}
										</Link>
									</div>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
