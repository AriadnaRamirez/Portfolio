---
name: cinematic-luxury
description: >-
  High-end cinematic luxury visual system for Ariadna Ramírez portfolio and
  similar editorial developer sites. Use when redesigning UI toward elegant,
  filmic, boutique-atelier aesthetics — dark ink, champagne gold, didone
  display type, restrained motion.
---

# Cinematic Luxury — Ariadna Portfolio

Apply this direction when the brief asks for high-end, cinematic, luxury, or elegant redesign of this portfolio.

## Subject

- **Who**: Ariadna Ramírez — Fullstack Web Developer, Frontend · React · TypeScript · UX/UI
- **Audience**: recruiters and clients evaluating craft + production delivery
- **Job**: communicate precision and taste; convert to CV download / contact

## Design plan

### Color (named hex)

| Token | Hex | Role |
|-------|-----|------|
| Void | `#0B0A09` | Page ground — film still, not pure black |
| Ink soft | `#161412` | Surfaces / nav glass |
| Ivory | `#E8E0D4` | Primary text on dark |
| Mist | `#9C9388` | Secondary text |
| Champagne | `#C6A87C` | Single accent — light catching metal, not neon |
| Garnet | `#7A3340` | Rare heritage accent (links, focus) |

Light mode counterpart (optional toggle): ivory ground `#F2EDE6`, void text `#12100E`, champagne `#A8895A`, garnet `#722F37`.

**Avoid**: cream `#F4F1EA` + terracotta, purple/indigo, acid green, glow/bloom neon, SaaS soft grey shadows.

### Type

- **Display**: Bodoni Moda (didone) — brand name and section titles as the memorable element
- **Body**: Figtree — quiet, modern, high legibility
- Scale: hero name `clamp(3.5rem, 12vw, 8rem)`; section titles `clamp(2rem, 4vw, 3.25rem)`; body 1–1.125rem with 1.65 line-height

### Layout

```
┌──────────────────────────────────────────┐
│  nav: name left · anchors · CV           │
├──────────────────────────────────────────┤
│  HERO full-bleed                         │
│  [brand name giant]                      │
│  one line role · one paragraph           │
│  CTA group · soft vignette + grain       │
├──────────────────────────────────────────┤
│  About: manifesto column + focus list    │
│  Skills: editorial index (not card grid) │
│  Work: asymmetric project rows           │
│  Exp / Edu / Contact: quiet bands        │
└──────────────────────────────────────────┘
```

- Brand name is the hero-level signal (not nav-only)
- Left-aligned editorial columns; max measure ~65ch for body
- Hairline champagne rules; almost no radius
- Cards only when they contain interaction — prefer open bands

### Principles

1. **One memorable moment**: giant brand type in the hero; everything else quiet
2. **Filmic depth**: vignette + fine grain + one soft light pool — no neon glow
3. **Motion**: one hero choreography (1.2–1.6s ease-out); no per-card bounce
4. **Champagne, not gold-foil**: accent used like jewelry — sparingly
5. **Content fidelity**: CV facts unchanged; design elevates, does not rewrite

### Motion tokens

- `--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1)`
- Hero reveal 1.4s; hover 0.35s; respect `prefers-reduced-motion`

### Critique checklist

- [ ] First viewport still reads as Ariadna with nav removed
- [ ] No emoji, no purple, no terracotta-on-cream
- [ ] One accent only (champagne); garnet reserved for interactive highlight
- [ ] Mobile: brand still dominant; CTAs usable (min 44px)
- [ ] Reduced motion disables reveal animations
