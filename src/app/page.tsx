import { Button } from "@/shared/components/shadcn/ui/button";

export default function Home() {
	return (
		<div>
			<h1 className="font-bold text-3xl underline">Hello world!</h1>
			<div>
				<Button className="cursor-pointer">Click me</Button>
				<Button variant="outline">Button</Button>
			</div>
		</div>
	);
}
