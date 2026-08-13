# Complete storefront asset archive manifest

The user-supplied `usamabhanbhro-storefront-assets.zip` contained 17 validated PNG files and no executable content. The files use timestamp-based names; the mapping below preserves their intended semantic role before upload to managed project storage.

| Source filename | Managed URL | Dimensions | Visual classification | Intended slot |
| --- | --- | ---: | --- | --- |
| `1786605638826.png` | `/manus-storage/1786605638826_c5b84767.png` | 1408 × 768 | Saddle-leather shoulder bag still life | Homepage campaign / signature collection / bags product imagery |
| `1786605641752.png` | `/manus-storage/1786605641752_5f120be7.png` | 1408 × 768 | Wallet, chain, and compact accessories | Jewellery collection and product imagery |
| `1786605644082.png` | `/manus-storage/1786605644082_a3996dc6.png` | 1408 × 768 | Leather travel set and folded textile | Travel collection and product imagery |
| `1786605646678.png` | `/manus-storage/1786605646678_6fb24be6.png` | 1408 × 768 | Curved shoulder bag with small objects | Shoulder-bag product dossier image |
| `1786605649946.png` | `/manus-storage/1786605649946_70946391.png` | 1408 × 768 | Structured black bag with textile | Work-bag product dossier image |
| `1786605652965.png` | `/manus-storage/1786605652965_fc685904.png` | 1408 × 768 | Coordinated brown and black bag trio | Homepage campaign and bags collection editorial panel |
| `1786605656583.png` | `/manus-storage/1786605656583_7c5b1232.png` | 1408 × 768 | Belt, case, and compact leather objects | Accessories collection and product imagery |
| `1786605661481.png` | `/manus-storage/1786605661481_93115a2a.png` | 1408 × 768 | Black drawstring bag with gold accent | Evening / jewellery product dossier image |
| `1786605664388.png` | `/manus-storage/1786605664388_bc8a7e5a.png` | 1408 × 768 | Weekender, pouch, and compact case | Travel collection editorial panel |
| `1786605671429.png` | `/manus-storage/1786605671429_d418f0a0.png` | 1408 × 768 | Vessel, glassware, and folded textile | Home collection cover |
| `1786605673788.png` | `/manus-storage/1786605673788_e007e92b.png` | 1408 × 768 | Card cases, pouch, and compact leather | Small leather goods / essentials imagery |
| `1786605677702.png` | `/manus-storage/1786605677702_9c3e757f.png` | 1408 × 768 | Wallet and card-holder arrangement | Wallet product dossier image |
| `1786605681885.png` | `/manus-storage/1786605681885_2144d048.png` | 1408 × 768 | Structured tote with notebook | Work / tote product dossier and About-page image |
| `1786605695263.png` | `/manus-storage/1786605695263_992330a0.png` | 928 × 1152 | Textile, leather, and card-holder composition | Soft goods portrait card and journal imagery |
| `1786605704946.png` | `/manus-storage/1786605704946_80d9d4e5.png` | 928 × 1152 | Home objects and folded textile composition | Home portrait card and journal imagery |
| `1786605704964.png` | `/manus-storage/1786605704964_210be81d.png` | 928 × 1152 | Tote, eyewear, and desktop objects composition | Journal / editorial portrait card and eyewear imagery |
| `1786605712526.png` | `/manus-storage/usamabhanbhro-wordmark-clean_c3a17930.png` | 1792 × 592 | Usamabhanbhro wordmark, deterministically cleaned from the supplied checkerboard backdrop | Header, mobile drawer, and footer brand treatment |

> The asset set shares the existing sand, parchment, tobacco leather, charcoal, and muted brass visual language. All images are original user-supplied material and contain no legacy brand mark. The supplied wordmark's baked checkerboard background was removed with a deterministic luminance mask after image-generation refinement was unavailable due to the daily quota; its lettering and placement were preserved.

## Integration and QA evidence

All 17 supplied archive records above have a managed-storage path. The 16 editorial and product images are centralized as the `assets` map in `client/src/lib/catalog.ts`, then distributed to each category's product galleries, all eight collection covers, the journal image entries, and the homepage collection strip. The cleaned wordmark is mapped separately in `client/src/components/Storefront.tsx` so the same asset appears in desktop header, mobile drawer, and footer locations.

| Verification surface | Exact integration point | Evidence recorded |
| --- | --- | --- |
| Catalog and collection imagery | `client/src/lib/catalog.ts` — `assets`, `mediaFor`, `collections`, and `journals` | Sixteen archive-image URLs map to the eight product categories, 36 product dossiers, eight collection covers, and four journal entries. |
| Homepage campaign and editorial imagery | `client/src/pages/Home.tsx` — `heroImage`, `campaignImage`, catalog-driven journals and collections | Campaign hero uses `1786605638826`; campaign panel uses `1786605652965`; journal and collection modules resolve from the centralized catalog mapping. |
| Commerce, product, About, and journal routes | `client/src/pages/CommercePages.tsx` — collection banner, product gallery, `ArticlePage`, and `AboutPage` | Collection, product, and article images are catalog-driven; About uses `1786605681885` directly. |
| Header, mobile drawer, and footer mark | `client/src/components/Storefront.tsx` — shared `wordmarkAsset` constant | All three placements use `/manus-storage/usamabhanbhro-wordmark-clean_c3a17930.png`. |
| Desktop visual QA | Homepage, Bags collection, and About routes at 1280 × 720 | Header wordmark has no checkerboard field; campaign, collection, and About imagery render with the intended crop and hierarchy. |
| Mobile visual QA | Homepage, Bags collection, Meridian Frame Tote dossier, and About routes at 375 × 812 | Wordmark remains legible; hero, collection cover, three-image product gallery, and About image maintain responsive composition. |
| Release verification | `pnpm check`, `pnpm test`, `pnpm build`, and `GITHUB_PAGES=true pnpm build:pages` | Type check passed; 2 Vitest files and 6 tests passed; full-stack and static GitHub Pages builds passed. |
