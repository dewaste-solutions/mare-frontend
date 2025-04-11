import SectionAbout from "~/feature/home/components/section-about";
import SectionCommunity from "~/feature/home/components/section-community";
import SectionContact from "~/feature/home/components/section-contact";
import SectionHero from "~/feature/home/components/section-hero";
import SectionImpact from "~/feature/home/components/section-impact";
import SectionOurTeam from "~/feature/home/components/section-ourteam";
import Header from "~/shared/components/header";

export default function HomePage() {
	return (
		<div className="grid min-h-[100dvh] grid-cols-1 grid-rows-[auto_1fr_auto]">
			<Header type="home" />
			<main>
				<SectionHero />
				<SectionAbout />
				<SectionCommunity />
				<SectionOurTeam />
				<SectionImpact />
				<SectionContact />
			</main>
			<footer>footer</footer>
		</div>
	);
}
