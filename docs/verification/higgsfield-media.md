# Higgsfield media QA

The first two Higgsfield assets were reviewed on 13 August 2026 before storefront wiring. The wide editorial hero uses a calm parchment-and-cedar studio setting with the text-safe region on the left. The portrait bag still life shows an unbranded cedar leather tote on a travertine plinth with natural window light, warm cream plaster, and charcoal textile. Both belong to the existing Material Quiet visual language and contain no visible text, brand mark, person, or watermark.

The small-leather-goods still life was also reviewed. It presents an unbranded cedar wallet, card holder, and brass keyring against limestone, archival paper, and charcoal textile. Its warm natural light, quiet material treatment, and restrained prop count match the hero and bag visual system.

The asset collection is still in progress. Until managed storage is reachable, the direct Higgsfield delivery URLs are retained as temporary source references and must be copied into managed project storage before production publishing.

The approved bag asset was uploaded to managed storage at `/manus-storage/usamabhanbhro-bags-higgsfield_8b834722.webp` and is now the resilient media fallback across catalog, collection, journal, and homepage modules. Browser-saved WebP variants of the hero and small-leather-goods assets are retained in `/home/ubuntu/webdev-static-assets/` and await the same storage handoff once the endpoint is stable; they will replace their category-specific fallback mappings when available.

On mobile visual QA, fresh product-gallery requests intermittently hit a Forge DNS outage after the managed path had already resolved at desktop width. The server-side proxy now keeps a four-minute in-memory cache of successful signed URLs and returns a short private cache-control response. It does not cache credentials, persist any URL, or alter authorization; it simply lets already approved object URLs survive a short upstream outage.
