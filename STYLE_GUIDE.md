# Hariz Crane Trucks - Visual Style Guide

## 1. Color Palette
Focused on industrial authority and high-conversion contrast.

| Usage | Color Name | Hex Code | Description |
| :--- | :--- | :--- | :--- |
| **Primary CTA** | Action Amber | `#F59E0B` | High-contrast orange for main buttons and key highlights. |
| **Secondary CTA** | Signal Green | `#16A34A` | Used specifically for "Call Now" buttons (psychologically associated with "Go"). |
| **Background** | Deep Zinc | `#09090B` | Primary background for dark sections to convey authority and modernism. |
| **Text (Primary)** | Pure White | `#FFFFFF` | For headlines on dark backgrounds. |
| **Text (Body)** | Zinc 400 | `#A1A1AA` | Low-strain gray for long-form body text. |
| **Borders** | Zinc 800 | `#27272A` | Subtle dividers for sections and cards. |

## 2. Typography
A clean, sans-serif approach for maximum readability on construction sites.

- **Primary Font**: `Inter` (or System Sans-Serif fallback)
- **Headlines (H1, H2)**: `Black (900)` weight. 
  - *Size (Desktop)*: 72px - 120px. 
  - *Size (Mobile)*: 48px - 64px.
  - *Tracking*: `-0.05em` (Tight)
- **Subheadings**: `Bold (700)` weight.
  - *Size*: 24px - 32px.
- **Body Text**: `Medium (500)` weight.
  - *Size*: 18px - 20px for high readability.
  - *Line Height*: 1.6 (Ample breathing room).

## 3. Button Styles
Designed for "thumb-friendly" interaction and clear visual hierarchy.

### Primary Button (`Action Amber`)
- **Corners**: `Rounded-2xl` (approx 1.5rem) for a modern, approachable feel.
- **Padding**: `px-12 py-6` (Large footprint).
- **Hover State**: Scale `1.05`, brightness `110%`, shadow `0 25px 50px -12px rgba(245, 158, 11, 0.4)`.
- **Active State**: Scale `0.95`.

### Secondary Button (`Signal Green`)
- **Usage**: Only for phone calls.
- **Hover State**: Pulse animation or subtle brightness increase.

## 4. Whitespace & Spacing
Prioritizing a minimalist design that focuses attention on the "Rule of One".

- **Section Padding**: `py-32` (Desktop) and `py-20` (Mobile).
- **Gaps**: `gap-12` between cards to prevent cognitive overload.
- **Max Width**: `max-w-7xl` (1280px) for layout stability.

## 5. Image & Icon Guidance
- **Image Style**: "Raw Industrial" - real job photos with high contrast. Use rounded corners (`rounded-[3rem]`) to match button styles.
- **Overlays**: Dark gradients (`bg-gradient-to-t from-black/90 to-transparent`) at the bottom of images to ensure white text remains readable.
- **Icons**: `Lucide-React` library. `Stroke Width: 2`. Always pair with text to reduce ambiguity.

## 6. Layout & Grid
- **Grid**: 12-column grid for desktop; 1-column stack for mobile.
- **Hierarchy**: Headlines are always the largest element. Use "Z-pattern" for hero and "F-pattern" for text-heavy sections.
- **Sticky Elements**: Header and Mobile Action Bar remain visible at all times to reduce friction to convert.








