# Managed media DNS recovery

## Scope

During final visual integration, the sandbox resolver intermittently timed out while resolving managed Forge, connector, S3, and CloudFront hosts. The symptom was fresh `/manus-storage/` media requests failing after a valid upload, which could leave the homepage hero and mobile product gallery blank.

## Scoped recovery

A reversible, **sandbox-only** `/etc/hosts` fallback was added after resolving the current addresses through independent paths. It covers the Forge upload service, the connector configuration service, the S3 presign hop, and the signed CloudFront delivery hostname. The pre-change host file was preserved at `/etc/hosts.manus-dns-backup-20260813`.

> This is an operational recovery for the active sandbox, not application code and not a production deployment mechanism. CloudFront addresses can rotate; a fresh environment should prefer normal DNS and remove the temporary fallback when service resolution is healthy.

## Verification evidence

| Path | Evidence | Result |
| --- | --- | --- |
| Managed Forge presign/upload | Uploaded the approved small-goods and editorial hero assets to `/manus-storage/` | Passed |
| Managed media proxy | Followed the signed asset redirect and retrieved image bytes with HTTP 200 | Passed |
| Mobile media delivery | Captured fresh 375 × 812 homepage, collection, and product-dossier views using the managed asset routes | Passed |
| Higgsfield connector configuration | Retrieved the `generate_image` tool contract through the restored configuration host path | Passed; new image generation remains unavailable because the selected Higgsfield workspace reports zero credits |
| Managed database runner | Direct schema query still reports an unresolved TiDB gateway hostname | Not recoverable from this sandbox because that query runner uses a separate managed network environment; application repositories retain their safe in-memory fallback during that outage |

## Current media mapping

The storefront now uses the approved Higgsfield editorial asset for the homepage and the dedicated small-leather-goods asset for wallet and card-holder imagery. This preserves a consistent warm, restrained materials palette without relying on temporary third-party delivery URLs in the application source.
