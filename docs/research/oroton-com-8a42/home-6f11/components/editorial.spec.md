# Editorial Modules Specification

## Overview

- Target file: `client/src/components/sites/oroton-com-8a42/home-6f11/OrotonEditorial.tsx`
- Interaction model: static content blocks with hover/focus link emphasis.

## DOM structure

One split campaign module followed by a three-item editorial grid. Each module contains image, eyebrow, heading, description, and a text link.

## Exact style direction

Use generous white space around each story. The campaign module uses a black panel beside a full-height image; the grid alternates wide and narrow crops to avoid a uniform card dashboard.

## Text content

`CAMPAIGN IN MOTION`, `EVERYDAY SPRING 25 COLLECTION`, `SPRING PREVIEW`, `EVERYDAY DENIM`, and source descriptions documented in `PAGE_TOPOLOGY.md`.

## Responsive behavior

Split module stacks image over black content on mobile. Editorial grid collapses to a single column with consistent image aspect ratios.

