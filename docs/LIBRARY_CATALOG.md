---
title: Library Catalog — Z5 implementation companion
description: Operational library map for implementers of the-harness.
type: implementation-companion
status: informative
owner: environment-preparer
created: "2026-08-28"
---

# Library Catalog

This is an implementation companion, not a replacement for the sealed Z4 library decision record. Z5 must use the approved versions and constraints in `.shokunin/brief/TECHNICAL_LIBRARIES.json` as its authoritative decision source. This catalogue maps those decisions to the Z5 work so implementers can choose the right dependency without rediscovering its role.

## Z5 runtime and quality libraries

| Library                         | Version policy   | Z5 purpose                                                            | First planned use                       | Status                                      |
| ------------------------------- | ---------------- | --------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------- |
| `@opentelemetry/api`            | Locked `1.9.0`   | Trace and metric API for agent, tool, and lifecycle spans             | T2.3 telemetry exporter                 | Approved; install with the telemetry module |
| `@opentelemetry/sdk-trace-base` | Locked `1.26.0`  | Span processors and tracing pipeline implementation                   | T2.3 telemetry exporter                 | Approved; install with the telemetry module |
| `better-sqlite3`                | Locked `11.1.2`  | Local durable session, event, and spill metadata store                | T2.2 spill persistence / T2.3 event log | Approved; native-build review required      |
| `drizzle-orm`                   | Locked `0.33.0`  | Typed schema and queries over the local SQLite database               | T2.2 / T2.3                             | Approved; pair with `better-sqlite3`        |
| `zod`                           | Locked `3.23.8`  | Runtime validation at CLI, provider, storage, and IPC boundaries      | T1 onward                               | Approved; canonical schema layer            |
| `@hardmachinelabs/zod-config`   | Catalog `0.2.0`  | Compose and validate the harness configuration from typed Zod schemas | Sprint 0 configuration foundation       | Installed in `apps/cli`                     |
| `@hardmachinelabs/env-sync`     | Catalog `1.0.1`  | Synchronize declared environment configuration before runtime startup | Sprint 0 configuration foundation       | Installed in `apps/cli`                     |
| `vitest`                        | Catalog `2.0.5`  | Unit and integration tests for every sprint gate                      | T0.2 onward                             | Installed                                   |
| `@stryker-mutator/core`         | Catalog `10.0.0` | Mutation score verification at the Z5 exit gate                       | T4.1                                    | Installed and configured                    |
| `dependency-cruiser`            | Catalog `18.2.0` | Enforce import boundaries and detect circular dependencies            | T0.2 onward                             | Installed and configured                    |

## Workspace and developer tooling

| Library or tool | Version policy                | Purpose                                                     | Status                                         |
| --------------- | ----------------------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| `typescript`    | Catalog `5.6.3`               | Strict ESM type-checking and declarations                   | Installed                                      |
| `commander`     | Catalog `15.0.0`              | Public CLI command and option parsing                       | Installed in `apps/cli`                        |
| `turbo`         | Catalog `2.10.12`             | Deterministic workspace build, lint, and test orchestration | Installed                                      |
| `pnpm`          | Root package manager `9.12.0` | Frozen, catalog-driven dependency installation              | Installed policy                               |
| `eslint`        | Catalog `9.39.5`              | Flat-config linting for the current Next.js foundation      | Installed; held at v9 for plugin compatibility |

## Selection rules for Z5

1. Do not add a package merely because it is convenient: first check the sealed technical-library record, then this role map.
2. Keep external-provider credentials outside source control; configuration schemas must reject absent or malformed values before connection setup.
3. Add runtime dependencies to the shared PNPM catalogue, pin their intended role here, and add a focused test before wiring them into a service.
4. Do not import Cockpit/UI-only libraries into the CLI runtime.

## Non-Z5 UI dependencies

`next`, `react`, `tailwindcss`, and `motion` currently support the separate client foundation. They are not dependencies of the `the-harness` runtime and must not be introduced into Z5 core packages.
