import { Color } from 'culori';

declare type SwatchNames = "accent1" | "accent2" | "accent3" | "neutral1" | "neutral2";
declare type ShadeNames = 0 | 10 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
declare type CuloriColor = Color;
declare type ColorSwatch = {
    [shade in ShadeNames]: CuloriColor;
};
declare type ColorScheme = {
    [swatch in SwatchNames]: ColorSwatch;
};
declare type HexColor = `#${string}`;
declare type MonetColorSwatch = {
    [shade in ShadeNames]: HexColor;
};
declare type MonetColorScheme = {
    [swatch in SwatchNames]: MonetColorSwatch;
};

declare type OptionsType = {
    targets: ColorScheme;
    chromaFactor: number;
};
declare const getColorScheme: (seedColor: HexColor, opts?: OptionsType) => MonetColorScheme;

export { MonetColorScheme as ColorScheme, MonetColorSwatch as ColorSwatch, ShadeNames, SwatchNames, getColorScheme };
