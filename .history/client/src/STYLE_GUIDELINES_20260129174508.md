# Design Guidelines

This document outlines the core design principles and constraints for the portfolio project. Ensure all future changes adhere to these guidelines to maintain visual and functional consistency.

## 1. Color System

- **Primary Background**: `#0a0a0a` (Deep Black)
- **Secondary Background**: `#1a1a1a` (Cards/Panels)
- **Text Color**: `#ffffff` (White)
- **Accent Color**: `#BA76FF` (Neon Purple)
- **Dim Color**: `rgba(255, 255, 255, 0.2)` (Borders/Text)

**Rule**: Use the accent color (`#BA76FF`) for active states, hover effects, and key highlights. Do NOT introduce new colors unless explicitly requested.

## 2. Typography

- **Font Family**: Sans-serif (System default or Inter-like)
- **Style**: Uppercase, Bold/Black weight
- **Tracking**: Tighter (`tracking-tighter`)
- **Mono Font**: Used for metadata, dates, and labels (e.g., `font-mono`)

**Rule**: Headlines and major labels should always be uppercase and bold.

## 3. Tray View Interaction (Lava Lamps)

- **Default State**: 
  - Image is Grayscale (`contrast-125 saturate-0 opacity-40`).
  - Number indicator at bottom is Black background with White text.
  - No dimming overlay on non-active items (all items visible).

- **Hover/Active State**:
  - Image becomes Full Color (`contrast-125 saturate-100 opacity-100`).
  - Number indicator background turns Neon Purple (`#BA76FF`).
  - Number text turns Black.
  - **Animation**: The number text (e.g., "02") must slide up slightly (`-translate-y-1`) on hover to provide tactile feedback.

- **Search/Filter State**:
  - Matching items automatically enter the "Active State" (Full color, Purple number bar).
  - Non-matching items remain in "Default State".
  - Hovering a non-matching item temporarily triggers its Active State.

## 4. Grid View Interaction

- **Hover State**:
  - Card lifts up slightly (`y: -5`).
  - Image saturates from grayscale to color.
  - Accent line expands.

## 5. Image Assets

- **Import Scheme**: Always use `figma:asset/HASH.png`.
- **Lava Lamp Image**: The base image contains multiple lamps. It must be sliced using `translateX` percentages (0%, -20%, -40%, etc.) to show the correct segment for each item.

## 6. Functional Constraints

- **Admin/Edit**: Textareas must auto-resize ("hug contents").
- **File Uploads**: Support both URL input and File Selection (via `FileReader` to Base64).
