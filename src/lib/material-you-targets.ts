import { oklch } from "culori";
import { ColorScheme, ColorSwatch, ShadeNames } from "./types";

const LIGHTNESS_MAP: Record<ShadeNames, number> = {
	0: 1.0,
	10: 0.9880873963836093,
	50: 0.9551400440214246,
	100: 0.9127904082618294,
	200: 0.8265622041716898,
	300: 0.7412252673769428,
	400: 0.653350946076347,
	500: 0.5624050605208273,
	600: 0.48193149058901036,
	700: 0.39417829080418526,
	800: 0.3091856317280812,
	900: 0.22212874192541768,
	1000: 0.0,
};

const ACCENT1_CHROMA = 0.1328123146401862;
const ACCENT2_CHROMA = ACCENT1_CHROMA / 3;
const ACCENT3_CHROMA = ACCENT2_CHROMA * 2;

const NEUTRAL1_CHROMA = ACCENT1_CHROMA / 12;
const NEUTRAL2_CHROMA = NEUTRAL1_CHROMA * 2;

const getShadesWithChroma = (chroma: number): ColorSwatch =>
	Object.entries(LIGHTNESS_MAP).reduce(
		(swatch, [shade, lightness]) => ({
			...swatch,
			[shade]: oklch({
				l: lightness,
				c: chroma,
				h: 0,
			}),
		}),
		{} as ColorSwatch
	);
export const getMaterialYouTargets = (chromaFactor = 1.0): ColorScheme => ({
	accent1: getShadesWithChroma(ACCENT1_CHROMA * chromaFactor),
	accent2: getShadesWithChroma(ACCENT2_CHROMA * chromaFactor),
	accent3: getShadesWithChroma(ACCENT3_CHROMA * chromaFactor),
	neutral1: getShadesWithChroma(NEUTRAL1_CHROMA * chromaFactor),
	neutral2: getShadesWithChroma(NEUTRAL2_CHROMA * chromaFactor),
});
