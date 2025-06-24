import LoginCard from "@/feature/login/components/login-card";
import { Recycle } from "lucide-react";
import Link from "next/link";

export default function Login() {
	return (
		<div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-5">
			{/* 1 */}
			<div className="flex justify-center">
				<Link href="/">
					<div className="flex items-center gap-2">
						<div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
							<Recycle className="h-6 w-6" />
						</div>
						<span className="bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text font-bold text-2xl text-transparent">
							MARE!
						</span>
					</div>
				</Link>
			</div>
			{/* 2 */}
			<LoginCard />
			{/* 3 */}
			<div>
				<Link
					href="/"
					className="w-full cursor-pointer rounded-md bg-[#038167] px-5 py-2 text-white hover:bg-[#026853]"
				>
					Go Home
				</Link>
			</div>
		</div>
	);
}
