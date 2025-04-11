"use client";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div>
			<h2>Something went wrong!</h2>
			<p>
				<p>{error.message}</p>
			</p>
			<button type="button" onClick={() => reset()}>
				Try again
			</button>
		</div>
	);
}
