import type { Metadata } from "next";
import Header from "~/shared/components/header";

export const metadata: Metadata = {
	title: "Mare! Application",
	description: "Mare! Application",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="grid min-h-[100dvh] grid-cols-1 grid-rows-[auto_1fr_auto]">
			<Header type="home" />
			<main>{children}</main>
			<footer>footer</footer>
		</div>
	);
}
