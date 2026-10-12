/**
 * Réglages communs aux scènes three.js pour retrouver le rendu du prototype,
 * écrit pour three r128 (CDN) et désormais servi par la version npm.
 *
 * - Couleurs : r128 n'avait pas de gestion des espaces colorimétriques ; les
 *   couleurs CSS étaient envoyées telles quelles au shader et le rendu sortait
 *   sans conversion sRGB. On désactive donc ColorManagement et on sort en
 *   linéaire, ce qui reproduit exactement les teintes de la palette.
 * - Lumières : depuis r155 l'éclairage est physiquement correct. En mode
 *   « legacy », r128 multipliait l'irradiance de toutes les lumières par π ;
 *   les intensités du prototype sont donc multipliées par LEGACY_LIGHT.
 *   Les versions récentes retirent aussi au diffus la part réfléchie en
 *   spéculaire (Fresnel, F0 = 0,04 pour ces matériaux non métalliques) :
 *   on divise par 0,96 pour la rendre. Écart mesuré avec le prototype sur
 *   les trois scènes : moins de 0,4/255 en moyenne, une dizaine au maximum.
 * - Lumières ponctuelles : l'atténuation physique (1/d^decay) n'a plus la même
 *   forme que l'ancienne (1 - d/distance)^decay ; withLegacyPointFalloff()
 *   rétablit l'ancienne formule pour les matériaux concernés.
 */
import {
  Color,
  ColorManagement,
  LinearSRGBColorSpace,
  ShaderChunk,
  WebGLRenderer,
  type Material,
  type WebGLRendererParameters,
} from 'three';
import { cssVar } from './motion';

ColorManagement.enabled = false;

/** Facteur à appliquer aux intensités écrites pour three r128. */
export const LEGACY_LIGHT = Math.PI / 0.96;

export function createRenderer(params: WebGLRendererParameters): WebGLRenderer {
  const renderer = new WebGLRenderer(params);
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  return renderer;
}

/** Couleur three.js lue depuis une variable CSS de la palette. */
export function cssColor(name: string): Color {
  return new Color(cssVar(name));
}

const PHYSICAL_FALLOFF = /float getDistanceAttenuation\([^)]*\)\s*\{[\s\S]*?return distanceFalloff;\s*\}/;
const LEGACY_FALLOFF = /* glsl */ `float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
		return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
}`;

/** Rétablit l'atténuation des PointLight de three r128 sur ce matériau. */
export function withLegacyPointFalloff<M extends Material>(material: M): M {
  const chunk = ShaderChunk.lights_pars_begin;
  if (!PHYSICAL_FALLOFF.test(chunk)) {
    console.warn('three.js : atténuation des lumières ponctuelles non reconnue, rendu physique conservé.');
    return material;
  }
  const legacyChunk = chunk.replace(PHYSICAL_FALLOFF, LEGACY_FALLOFF);
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <lights_pars_begin>', legacyChunk);
  };
  material.customProgramCacheKey = () => 'legacy-point-falloff';
  return material;
}
