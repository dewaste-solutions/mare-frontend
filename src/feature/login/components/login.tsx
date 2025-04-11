"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormData) => {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.log("Form submitted with:", data);
	};

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input type="email" placeholder="email" {...register("email")} />
					{errors.email && <p>{errors.email.message}</p>}
				</div>
				<div>
					<input
						type="password"
						placeholder="password"
						{...register("password")}
					/>
					{errors.password && <p>{errors.password.message}</p>}
				</div>
				<button type="submit">Submit</button>
			</form>
		</section>
	);
}
