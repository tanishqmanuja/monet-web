import { formatHex, oklch } from "culori";
import { getMaterialYouTargets } from "./material-you-targets";
import {
	ColorScheme,
	ColorSwatch,
	CuloriColor,
	HexColor,
	MonetColorScheme,
	MonetColorSwatch,
} from "./types";
import { clampNumber } from "./utils";

const ACCENT3_HUE_SHIFT = 60;

type OptionsType = {
	targets: ColorScheme;
	chromaFactor: number;
};

const transformColor = (
	target: CuloriColor,
	seed: CuloriColor,
	reference: CuloriColor
) => {
	const l = target.l;
	const scaleC =
		reference.c === 0 ? 0 : clampNumber(seed.c, 0, reference.c) / reference.c;
	const c = target.c * scaleC;
	const h = seed.h;
	return formatHex(oklch({ l, c, h }));
};

const transformSwatch = (
	target: ColorSwatch,
	seed: CuloriColor,
	reference: ColorSwatch
) =>
	Object.entries(target).reduce(
		(swatch, [shade, color]) => ({
			...swatch,
			[shade]: transformColor(
				color,
				seed,
				reference[shade as unknown as keyof typeof reference]
			),
		}),
		{} as MonetColorSwatch
	);

export const getColorScheme = (
	seedColor: HexColor,
	opts?: OptionsType
): MonetColorScheme => {
	const _seedColor = oklch(seedColor);
	const _chromaFactor = opts?.chromaFactor || 1;
	const _targets = opts?.targets || getMaterialYouTargets(_chromaFactor);

	const seedNeutral = { ..._seedColor, c: _seedColor.c * _chromaFactor };
	const seedAccent = seedNeutral;

	const accent1 = transformSwatch(
		_targets.accent1,
		seedAccent,
		_targets.accent1
	);
	const accent2 = transformSwatch(
		_targets.accent2,
		seedAccent,
		_targets.accent1
	);
	const accent3 = transformSwatch(
		_targets.accent3,
		{ ...seedAccent, h: seedAccent.h + ACCENT3_HUE_SHIFT },
		_targets.accent1
	);

	const neutral1 = transformSwatch(
		_targets.neutral1,
		seedNeutral,
		_targets.neutral1
	);
	const neutral2 = transformSwatch(
		_targets.neutral2,
		seedNeutral,
		_targets.neutral1
	);

	return {
		accent1,
		accent2,
		accent3,
		neutral1,
		neutral2,
	};
};
