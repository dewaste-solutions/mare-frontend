"use client";

import { Button } from "@/shared/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/shadcn/ui/card";
import { Input } from "@/shared/components/shadcn/ui/input";
import { useAuth } from "@/shared/hooks/use-auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginCard() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const router = useRouter();
	const { signIn, isSigningIn } = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (!formData.email || !formData.password) {
				toast.warning("Please fill in all fields");
				return;
			}

			await signIn(formData);

			// Show success toast and wait for animation
			toast.success("Successfully signed in");

			router.push("/dashboard");
		} catch (_error) {
			// Error toast is already handled in useAuth
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Card className="max-w-[27.875rem] border-gray-200 shadow-md">
			<CardHeader className="space-y-1">
				<CardTitle className="text-center font-bold text-2xl">
					Welcome back
				</CardTitle>
				<CardDescription className="text-center">
					Enter your credentials to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="email" className="font-medium text-sm">
							Email
						</label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="name@example.com"
							value={formData.email}
							onChange={handleChange}
							className="w-full"
						/>
					</div>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="font-medium text-sm">
								Password
							</label>
							<Link
								href="/forgot-password"
								className="text-[#038167] text-xs hover:underline"
							>
								Forgot password?
							</Link>
						</div>
						<div className="relative">
							<Input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={formData.password}
								onChange={handleChange}
								className="w-full pr-10"
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="-translate-y-1/2 absolute top-1/2 right-3 text-gray-500 hover:text-gray-700"
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
					</div>
					<Button
						type="submit"
						className="w-full cursor-pointer bg-[#038167] hover:bg-[#026853]"
						disabled={isSigningIn}
					>
						{isSigningIn ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col space-y-4 border-t p-6">
				<div className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link
						href="/join-community"
						className="text-[#038167] hover:underline"
					>
						Join a community
					</Link>
				</div>
				<div className="text-center text-gray-500 text-xs">
					By signing in, you agree to our{" "}
					<Link href="/terms" className="underline">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link href="/privacy" className="underline">
						Privacy Policy
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
