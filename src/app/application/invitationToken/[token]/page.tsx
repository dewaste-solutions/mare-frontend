import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ token: string }>;
}) {
	const { token } = await params;

	const isValid = await validateInvitationToken(token);

	if (!isValid)
		return (
			<section>
				<h1>Invalid token</h1>
				<p>
					The token you provided is invalid. Please check the link you received.
				</p>
				<p>If you believe this is an error, please contact us.</p>
				<Link href="/">Go Home</Link>
			</section>
		);

	return redirect("/application");
}

async function validateInvitationToken(token: string): Promise<boolean> {
	await new Promise((res) => setTimeout(res, 2000));
	return token.length > 10;
}
