# Environment and credential boundary

This showcase deliberately does not commit an environment file. The managed project supplies its OAuth, database, and internal service variables at runtime. Production operators should create a private environment configuration through the hosting platform, never in Git.

| Variable or secret class | Where it belongs | Client exposure |
| --- | --- | --- |
| `DATABASE_URL` | Server-only managed environment | Never expose |
| OAuth session and signing values | Server-only managed environment | Never expose |
| Payment provider merchant keys and webhook secrets | Server-only secret manager | Never expose |
| Public storefront configuration | Public build-time configuration only when genuinely non-sensitive | Review before exposing |
| `PAYMENT_MODE` | Server-only configuration; use `mock` for this demo | Never expose provider credentials |

> **Important:** The checked-in payment integration is mock-only. A production payment launch requires provider-approved credentials, server-side signature verification, authenticated webhooks, fraud controls, and a migrated database.
