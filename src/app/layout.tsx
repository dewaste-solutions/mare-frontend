import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import ProviderTanstackQuery from "~/shared/components/provider/tanstack-query";

import "~/shared/styles/globals.css";

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
			<body>
				<ProviderTanstackQuery>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</ProviderTanstackQuery>
			</body>
		</html>
	);
}
