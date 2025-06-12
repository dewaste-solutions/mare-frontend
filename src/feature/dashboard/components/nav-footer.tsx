"use client";

import { Button } from "@/shared/components/shadcn/ui/button";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/shared/components/shadcn/ui/sidebar";
import { useAuth } from "@/shared/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavFooter({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const router = useRouter();

	const { signOut } = useAuth();
	const { isMobile, state } = useSidebar();

	const signout = () => {
		const initSignout = async () => {
			try {
				await signOut();
			} catch (_error) {}
		};
		initSignout();
	};

	const gotoSetting = () => {
		router.push("/dashboard/settings");
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					{/* trigger */}
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-300">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg px-2 py-1">
									{user.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							{state === "expanded" && (
								<>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">{user.name}</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
									<ChevronsUpDown className="ml-auto size-4" />
								</>
							)}
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					{/* content of menu */}
					<DropdownMenuContent
						className="fade-in zoom-in w-56 min-w-56 animate-in rounded-sm border bg-white px-1 shadow-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuItem className="text-xs">
								<Button
									onClick={gotoSetting}
									className="flex h-full w-full cursor-pointer items-center justify-start px-2"
									variant="ghost"
								>
									<Settings />
									<p>Settings</p>
								</Button>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<div className="-mx-1 h-px bg-border" />
						<DropdownMenuItem className="text-xs">
							<Button
								onClick={signout}
								className="flex h-full w-full cursor-pointer items-center justify-start px-2"
								variant="ghost"
							>
								<LogOut />
								<p>Log out</p>
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
