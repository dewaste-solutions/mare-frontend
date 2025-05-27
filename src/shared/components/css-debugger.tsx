"use client";

import { env } from "../../app/env";

export const CssDebugger = () => {
	if (env.NEXT_PUBLIC_CSS_DEBUGGER === "true") {
		return (
			<style jsx global>{`
      * {
        box-sizing: border-box;
        outline: 1px solid limegreen !important;
      }
    `}</style>
		);
	}

	return null;
};
