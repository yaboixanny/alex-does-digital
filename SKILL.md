---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
---

# Frontend Design Skill

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics caused by distributional convergence—where models predict tokens based on statistical patterns, defaulting to safe, common design choices.

## The Problem

Without guidance, LLM-generated frontends converge toward:
- Inter fonts
- Purple gradients on white backgrounds
- Minimal animations
- Cookie-cutter layouts

This generic aesthetic undermines brand identity and makes AI-generated interfaces immediately recognizable—and dismissible.

## Design Axes

Focus improvements across these implementable dimensions:

### Typography

Typography instantly signals quality. Choose fonts that are beautiful, unique, and interesting.

**Never use:** Inter, Roboto, Open Sans, Lato, Arial, default system fonts

**Good choices by aesthetic:**
- Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro
- Technical: IBM Plex family, Source Sans 3
- Distinctive: Bricolage Grotesque, Newsreader

**Pairing principle:** High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights.

**Use extremes:** 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

Pick one distinctive font, use it decisively. Load from Google Fonts.

### Color & Theme

Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.

Draw inspiration from:
- IDE themes (Dracula, Nord, Catppuccin, Gruvbox)
- Cultural aesthetics (Japanese minimalism, Art Deco, Brutalism)
- Industry contexts (fintech elegance, gaming energy, editorial sophistication)

### Motion

Use animations for effects and micro-interactions.

- Prioritize CSS-only solutions for HTML
- Use Motion library for React when available
- Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions
- Leverage scroll-triggering and hover states that surprise

### Backgrounds

Create atmosphere and depth rather than defaulting to solid colors.

- Layer CSS gradients
- Use geometric patterns
- Add contextual effects matching the overall aesthetic
- Apply noise textures, gradient meshes, layered transparencies

## Themes

Claude has rich understanding of popular aesthetics. Invoke them explicitly:

**Examples:**
- RPG: Fantasy palettes, ornate borders, parchment textures, medieval serif typography
- Cyberpunk: Neon accents, dark backgrounds, glitch effects, monospace fonts
- Editorial: Generous whitespace, refined serif headers, subtle animations
- Brutalist: Raw concrete colors, stark contrasts, intentionally rough edges

## Anti-Patterns to Avoid

- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design lacking context-specific character
- Converging on secondary defaults (Space Grotesk appears frequently—vary choices)

## Implementation Notes

- Interpret creatively and make unexpected choices genuinely designed for context
- Vary between light and dark themes across generations
- Match implementation complexity to aesthetic vision
- Maximalist designs need elaborate code with extensive animations
- Minimalist designs need restraint, precision, and careful spacing

Think outside the box. Claude is capable of extraordinary creative work—commit fully to a distinctive vision.
