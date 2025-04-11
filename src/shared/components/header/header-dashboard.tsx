import Link from "next/link";

export default function HeaderDashboard() {
	return (
		<header className="sticky top-0 bg-red-900">
			<div className="">
				<Link href="/" className="">
					Logo
				</Link>
			</div>
			<nav className="">
				<Link href="/login" className="">
					login
				</Link>
			</nav>
		</header>
	);
}
