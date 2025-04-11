import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type useHeaderStoreType = {
	currentSection: string;
	setCurrentSection: (section: string) => void;
};

export const headerStore = create(
	immer<useHeaderStoreType>((set) => ({
		currentSection: "",
		setCurrentSection: (section: string) =>
			set((state) => {
				state.currentSection = section;
			}),
	})),
);
