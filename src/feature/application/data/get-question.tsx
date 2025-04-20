import { isServer } from "@tanstack/react-query";
import { env } from "~/env";
import { PAGELIMIT } from "~/shared/constants/pagination";

export type Pokemon = {
	name: string;
	url: string;
};

export type PokeResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Pokemon[];
};

export const getQuestion = async (page: number): Promise<PokeResponse> => {
	await new Promise((resolve) => {
		setTimeout(resolve, 2000);
	});
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log({ isServer: isServer });

	const offset = (page - 1) * PAGELIMIT;

	const res = await fetch(
		`${env.NEXT_PUBLIC_BACKEND_URL}/api/v2/pokemon?offset=${offset}&limit=${PAGELIMIT}`,
	);
	if (!res.ok) throw new Error("Failed to fetch");
	return res.json();
};
