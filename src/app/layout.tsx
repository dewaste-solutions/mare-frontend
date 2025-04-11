import "~/shared/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mare! App",
	description: "Mare! App",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
