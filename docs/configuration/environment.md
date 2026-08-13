# Environment and credential boundary

This showcase deliberately does not commit an environment file. The managed project supplies its OAuth, database, and internal service variables at runtime. Production operators should create a private environment configuration through the hosting platform, never in Git.

| Variable or secret class | Where it belongs | Client exposure |
| --- | --- | --- |
| `DATABASE_URL` | Server-only managed environment | Never expose |
| OAuth session and signing values | Server-only managed environment | Never expose |
| Payment provider merchant keys and webhook secrets | Server-only secret manager | Never expose |
| Public storefront configuration | Public build-time configuration only when genuinely non-sensitive | Review before exposing |
| `VITE_API_URL` | Optional GitHub Pages build variable containing only a separately hosted API origin | Public by design; never place a token, path secret, or credential in it |
| `PAYMENT_MODE` | Server-only configuration; use `mock` for this demo | Never expose provider credentials |

> **Important:** The checked-in payment integration is mock-only. A production payment launch requires provider-approved credentials, server-side signature verification, authenticated webhooks, fraud controls, and a migrated database.

For a static Pages deployment, `VITE_API_URL=https://api.example.com` makes the browser use `https://api.example.com/api/trpc`. Leave it unset in the managed full-stack project, where the app uses its relative `/api/trpc` endpoint. This value names a public origin; it is not an API key and should not contain user data or a secret.
