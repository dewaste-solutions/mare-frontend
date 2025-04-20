"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "~/shared/components/shadcn/button";
import { type Pokemon, getQuestion } from "../data/get-question";

export const QuestionList = () => {
	const [page, setPage] = useState(1);

	const { data, isFetching } = useQuery({
		queryKey: ["application", page],
		queryFn: () => getQuestion(page),
	});

	return (
		<section>
			<h1>Questions</h1>
			{isFetching && <p>loading client</p>}
			{data?.results?.map((question: Pokemon) => (
				<p key={question.url}>{question.name}</p>
			))}
			<Button
				type="button"
				onClick={() => setPage((page) => page - 1)}
				disabled={page === 1}
				className="cursor-pointer"
			>
				back
			</Button>
			page: {page}
			<Button
				type="button"
				onClick={() => {
					setPage((page) => page + 1);
				}}
				className="cursor-pointer"
			>
				next
			</Button>
		</section>
	);
};
