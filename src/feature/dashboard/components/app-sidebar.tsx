"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/shared/components/shadcn/ui/sidebar";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { useAuth } from "@/shared/hooks/use-auth";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MENU_ITEMS, ROLE_PERMISSIONS } from "../constant/sidebar";
import { NavFooter } from "./nav-footer";

export function AppSidebar() {
	const router = useRouter();
	const { user, signOut } = useAuth();
	const { state } = useSidebar();

	const getMenuItems = () => {
		if (!user?.roleName) return [];
		const allowedItems = ROLE_PERMISSIONS[user.roleName.toLowerCase()] || [];
		return MENU_ITEMS.filter((item) => allowedItems.includes(item.id));
	};

	// this effect will handle when the user manually remove access token in localstorage, it will force logout
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const currentPath = window.location.pathname;

		const isInDashboard = currentPath.includes("/dashboard");
		if (accessToken === null && isInDashboard) {
			signOut();
			router.push("/");
		}
	}, []);

	return (
		<Sidebar collapsible="icon" className="py-2">
			<SidebarContent>
				<SidebarGroup className="flex h-full flex-col">
					<SidebarGroupLabel>
						{user ? (
							<div className="flex items-center justify-center gap-2">
								<div className="flex aspect-square w-10 items-center justify-center rounded-lg bg-[#038167]">
									<GalleryVerticalEnd className="text-white" />
								</div>
								<div className="flex flex-col justify-center gap-1">
									<h3 className="font-semibold text-sm">Dewaste Solution</h3>
									<p className="font-normal text-xs">{user.roleName} account</p>
								</div>
							</div>
						) : (
							<div className="flex items-center justify-center gap-2">
								<Skeleton className="h-10 w-10 rounded-lg bg-gray-300" />
								<div className="flex flex-col justify-center gap-1">
									<Skeleton className="h-4 w-32 bg-gray-300" />
									<Skeleton className="h-3 w-24 bg-gray-300" />
								</div>
							</div>
						)}
					</SidebarGroupLabel>
					<SidebarGroupContent className="mt-5 flex-1">
						<SidebarMenu>
							{user ? (
								getMenuItems().map((item) => (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton asChild>
											<Link href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))
							) : (
								<>
									{[1, 2, 3, 4, 5, 6, 7].map((i) => (
										<SidebarMenuItem key={i}>
											<div
												className={`flex w-full items-center gap-1 py-2 ${state === "collapsed" && "justify-center"}`}
											>
												<Skeleton className="h-6 w-6 bg-gray-300" />
												<Skeleton
													className={`h-5 w-30 bg-gray-300 ${state === "collapsed" && "hidden"}`}
												/>
											</div>
										</SidebarMenuItem>
									))}
								</>
							)}
						</SidebarMenu>
					</SidebarGroupContent>
					<SidebarFooter className="p-0">
						{user ? (
							<NavFooter
								user={{
									name: `${user.firstName} ${user.lastName}`,
									email: user.email || "",
									avatar: user.image || "",
								}}
							/>
						) : (
							<div className="flex items-center gap-3">
								<Skeleton className="h-7 w-7 rounded-full bg-gray-300" />
								<div
									className={`flex flex-col gap-2 ${state === "collapsed" && "hidden"}`}
								>
									<Skeleton className="h-4 w-32 bg-gray-300" />
									<Skeleton className="h-3 w-24 bg-gray-300" />
								</div>
							</div>
						)}
					</SidebarFooter>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
