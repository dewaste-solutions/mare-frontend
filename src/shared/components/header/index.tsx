"use client";

import HeaderDashboard from "./header-dashboard";
import HeaderHome from "./header-home";

type HeaderType = {
	type: "home" | "dashboard";
};

export default function Header({ type }: HeaderType) {
	switch (type) {
		case "home":
			return <HeaderHome />;
		case "dashboard":
			return <HeaderDashboard />;
		default:
			return null;
	}
}
