// Shared liquid-glass optics for @samasante/liquid-glass <Glass> surfaces.
// Kept subtle on purpose: low refraction strength + light frost so all text
// rendered on top stays crisp and high-contrast (WCAG-friendly).
export const headerGlassOptics = {
  strength: 0.04,
  frost: 10,
  depth: 0.3,
  curvature: 0.15,
  dispersion: 0.1,
  specular: 0.15,
  sheen: 0.2,
  glow: 0.06,
  brightness: 0.05,
  saturate: 1.05,
};

export const panelGlassOptics = {
  strength: 0.08,
  frost: 14,
  depth: 0.45,
  curvature: 0.2,
  dispersion: 0.15,
  specular: 0.2,
  sheen: 0.3,
  glow: 0.1,
  brightness: 0.04,
  saturate: 1.05,
};
