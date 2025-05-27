"use client";

import { useAnimationFrame, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({
	target,
	duration,
	className,
}: {
	target: number;
	duration: number;
	className?: string;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" }); // triggers a bit before fully in view

	const count = useMotionValue(0);
	const [displayValue, setDisplayValue] = useState(0);
	const startTime = useMotionValue<number | null>(null);

	useAnimationFrame((t) => {
		if (!isInView) return;

		if (startTime.get() === null) {
			startTime.set(t);
		}

		const elapsed = (t - startTime.get()) / 1000;
		const progress = Math.min(elapsed / duration, 1);
		const currentValue = Math.floor(progress * target);

		setDisplayValue(currentValue);
	});

	useEffect(() => {
		if (isInView) {
			count.set(0);
			startTime.set(null);
		}
	}, [isInView, count, startTime]);

	return (
		<span ref={ref} className={className}>
			{displayValue}
		</span>
	);
}
