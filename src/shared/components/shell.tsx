import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type ShellType = {
	children: ReactNode;
	childClassName?: string;
	ParentClassName?: string;
	ParentId?: string;
	ParentRef?: React.RefObject<HTMLDivElement>;
};

export default function Shell({
	children,
	childClassName,
	ParentClassName,
	ParentId,
	ParentRef,
}: ShellType) {
	return (
		<section className={cn(ParentClassName)} id={ParentId} ref={ParentRef}>
			<div
				className={cn(
					"mx-auto max-w-xl px-2 md:max-w-[1200px]",
					childClassName,
				)}
			>
				{children}
			</div>
		</section>
	);
}
