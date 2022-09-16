import { Color } from "culori";

export type SwatchNames =
	| "accent1"
	| "accent2"
	| "accent3"
	| "neutral1"
	| "neutral2";

export type ShadeNames =
	| 0
	| 10
	| 50
	| 100
	| 200
	| 300
	| 400
	| 500
	| 600
	| 700
	| 800
	| 900
	| 1000;

export type CuloriColor = Color;

export type ColorSwatch = {
	[shade in ShadeNames]: CuloriColor;
};

export type ColorScheme = {
	[swatch in SwatchNames]: ColorSwatch;
};

export type HexColor = `#${string}`;

export type MonetColorSwatch = {
	[shade in ShadeNames]: HexColor;
};

export type MonetColorScheme = {
	[swatch in SwatchNames]: MonetColorSwatch;
};
