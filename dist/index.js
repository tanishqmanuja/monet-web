"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getColorScheme: () => getColorScheme
});
module.exports = __toCommonJS(src_exports);

// src/lib/color-scheme.ts
var import_culori2 = require("culori");

// src/lib/material-you-targets.ts
var import_culori = require("culori");
var LIGHTNESS_MAP = {
  0: 1,
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
  1e3: 0
};
var ACCENT1_CHROMA = 0.1328123146401862;
var ACCENT2_CHROMA = ACCENT1_CHROMA / 3;
var ACCENT3_CHROMA = ACCENT2_CHROMA * 2;
var NEUTRAL1_CHROMA = ACCENT1_CHROMA / 12;
var NEUTRAL2_CHROMA = NEUTRAL1_CHROMA * 2;
var getShadesWithChroma = (chroma) => Object.entries(LIGHTNESS_MAP).reduce(
  (swatch, [shade, lightness]) => ({
    ...swatch,
    [shade]: (0, import_culori.oklch)({
      l: lightness,
      c: chroma,
      h: 0
    })
  }),
  {}
);
var getMaterialYouTargets = (chromaFactor = 1) => ({
  accent1: getShadesWithChroma(ACCENT1_CHROMA * chromaFactor),
  accent2: getShadesWithChroma(ACCENT2_CHROMA * chromaFactor),
  accent3: getShadesWithChroma(ACCENT3_CHROMA * chromaFactor),
  neutral1: getShadesWithChroma(NEUTRAL1_CHROMA * chromaFactor),
  neutral2: getShadesWithChroma(NEUTRAL2_CHROMA * chromaFactor)
});

// src/lib/utils.ts
var clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

// src/lib/color-scheme.ts
var ACCENT3_HUE_SHIFT = 60;
var transformColor = (target, seed, reference) => {
  const l = target.l;
  const scaleC = reference.c === 0 ? 0 : clampNumber(seed.c, 0, reference.c) / reference.c;
  const c = target.c * scaleC;
  const h = seed.h;
  return (0, import_culori2.formatHex)((0, import_culori2.oklch)({ l, c, h }));
};
var transformSwatch = (target, seed, reference) => Object.entries(target).reduce(
  (swatch, [shade, color]) => ({
    ...swatch,
    [shade]: transformColor(
      color,
      seed,
      reference[shade]
    )
  }),
  {}
);
var getColorScheme = (seedColor, opts) => {
  const _seedColor = (0, import_culori2.oklch)(seedColor);
  const _chromaFactor = (opts == null ? void 0 : opts.chromaFactor) || 1;
  const _targets = (opts == null ? void 0 : opts.targets) || getMaterialYouTargets(_chromaFactor);
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
    neutral2
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getColorScheme
});
//# sourceMappingURL=index.js.map