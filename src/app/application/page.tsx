import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QuestionList } from "~/feature/application/components/question-list";
import { getQuestion } from "~/feature/application/data/get-question";
import { getQueryClient } from "~/shared/hooks/get-query-client";

export default async function ApplicationPage() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["application", 1],
		queryFn: () => getQuestion(1),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<QuestionList />
		</HydrationBoundary>
	);
}
