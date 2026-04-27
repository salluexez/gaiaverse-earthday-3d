---
name: Aetherial Earth
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cbb9'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849585'
  outline-variant: '#3b4b3d'
  surface-tint: '#00e479'
  primary: '#f1ffef'
  on-primary: '#003919'
  primary-container: '#00ff88'
  on-primary-container: '#007139'
  inverse-primary: '#006d37'
  secondary: '#b3c5ff'
  on-secondary: '#002b75'
  secondary-container: '#0266ff'
  on-secondary-container: '#f9f7ff'
  tertiary: '#fbfbfb'
  on-tertiary: '#2f3131'
  tertiary-container: '#dedede'
  on-tertiary-container: '#606262'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#60ff99'
  primary-fixed-dim: '#00e479'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005228'
  secondary-fixed: '#dae1ff'
  secondary-fixed-dim: '#b3c5ff'
  on-secondary-fixed: '#001849'
  on-secondary-fixed-variant: '#003fa4'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Euclid Circular A
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Euclid Circular A
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Euclid Circular A
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Euclid Circular A
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Euclid Circular A
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Euclid Circular A
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-edge: 40px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

This design system is built on the intersection of planetary conservation and high-tech futurism. It positions Earth Day not as a historical commemoration, but as a cinematic, forward-looking mission. The aesthetic is "Galactic Premium"—merging the vastness of deep space with the vibrant vitality of Earth's biological systems.

The style leverages **Glassmorphism** and **Minimalism** to create a sense of weightless instrumentation. Surfaces appear as suspended high-grade acrylics, while high-contrast neon accents serve as tactical data points. The emotional goal is to evoke a sense of "stewardship from above," making the user feel like they are operating a sophisticated planetary monitoring station.

## Colors

The palette utilizes absolute blacks and deep navies to establish infinite depth, allowing the vibrant accents to "pop" with emissive energy.

- **Deep Space Black (#050505):** The foundation for the most recessed layers and background voids.
- **Vibrant Earth Green (#00ff88):** Used exclusively for primary actions, success states, and biological data visualization. It should feel like it is glowing.
- **Ocean Blue (#0066ff):** Used for secondary interactions, information highlights, and atmospheric gradients.
- **Soft White Glow:** A pure white with reduced opacity (10-20%) used for borders and glass reflections to simulate light catching on edges.

## Typography

This design system uses **Euclid Circular A** across headlines, UI, and body text to keep the interface premium, clean, and consistent. 

Headlines should be treated as cinematic titles—tightly tracked and bold. Labels use an uppercase style with increased letter spacing to mimic aerospace instrumentation. Color contrast for typography should remain high: use pure white for primary text and a 60% transparent white for secondary/meta information.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop, centered within the viewport to maintain a cinematic focus. A 12-column grid is used with generous 24px gutters to allow the glassmorphic elements "room to breathe."

Spacing follows a strict 8px rhythmic scale. Horizontal margins are intentionally wide (40px+) to create a premium, gallery-like feel that avoids clutter. Vertical stacking uses large gaps (64px+) between major sections to emphasize the distinct nature of each content module.

## Elevation & Depth

Depth is achieved through **Backdrop Blurs** and **Inner Glows** rather than traditional drop shadows.

1.  **Base Layer:** The Deep Space Black background.
2.  **Mantle Layer:** Dark Navy surfaces with a 20px backdrop blur and a 1px soft white border (10% opacity) to define edges.
3.  **Atmospheric Layer:** Floating elements (like buttons or active cards) use a subtle radial gradient of Ocean Blue or Earth Green at 5-10% opacity to simulate a glowing aura.
4.  **Interaction Layer:** When hovered, elements increase their backdrop blur intensity and the border opacity increases to 30%, making the "glass" appear thicker and more polished.

## Shapes

The shape language is sophisticated and "squircle-inspired," avoiding the aggression of sharp corners while maintaining the structure of a professional tool. 

Standard components use a 0.5rem (8px) radius. Larger glass containers and cards use a 1.5rem (24px) radius to create a soft, organic feel that contrasts with the technical typography. Buttons and input fields should maintain a consistent 0.5rem radius to feel precise and tactile.

## Components

### Buttons
Primary buttons are solid Vibrant Earth Green with black text for maximum contrast. Secondary buttons use a glassmorphic style: a 1px white border, transparent background, and 20px backdrop blur.

### Cards
Cards are the primary container. They feature a 1px top-down linear gradient border (White to Transparent) to simulate a "rim light" from a celestial light source. The background is Dark Navy at 40% opacity with a heavy background blur (32px).

### Input Fields
Inputs are dark and recessed. Use a Deep Space Black background with a subtle inner shadow to create a "carved" look. The cursor and focus state should utilize the Vibrant Earth Green glow.

### Progress & Data
Progress bars should be stylized as "Energy Tracks"—thin, glowing lines of Earth Green against a Dark Navy track. Use motion blurs and subtle pulsing animations for active data streams.

### Special Element: Atmospheric HUD
A persistent, thin-lined frame around the viewport or main container that displays "Global Vital Signs" (e.g., CO2 levels, temperature) in small, spaced-out Label-Caps typography, reinforcing the immersive monitoring station theme.
