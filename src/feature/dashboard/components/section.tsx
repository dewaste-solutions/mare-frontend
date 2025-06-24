export default function DashboardSection({
	children,
}: { children: React.ReactNode }) {
	return (
		<section className="m-2 flex-1">
			<div className="h-full w-full rounded-xl bg-muted/95 p-4">{children}</div>
		</section>
	);
}
