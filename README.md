# @tummycrypt/tinyland-types (retired)

> **Retired 2026-10-14 (RU2/RU7, uplift wave U2).** This package is no longer maintained,
> released or published. The repository is archived read-only; nothing is deleted.

## Why

No live repository imports this package. The last holder, `xoxd-ai/tinyland.dev`, carried a
`bazel_dep(name = "tummycrypt_tinyland_types")` and an `npm_link_package` with zero imports, and
drops both during the monorepo decomposition. `tummycrypt_tinyland_stores` stopped depending on it
in 0.3.0.

## What to use instead

| Need | Use |
|---|---|
| Content, event, blog, note, profile and visibility types | `tummycrypt_tinyland_content_types` (`@tummycrypt/tinyland-content-types`, 1.0.0 and later) from the Tinyland Bazel registry (`xoxd-ai/bazel-registry`) |
| Anything else that was here | Define it next to its single consumer, or open an issue on the owning package |

```starlark
bazel_dep(name = "tummycrypt_tinyland_content_types", version = "1.0.0")
```

In-house packages are distributed through Bazel only (RU6). There is no npm release.

## Security note

`migrateVisibility()` in `src/content-visibility.ts` maps missing and unknown values to `public`
(fail open, see TIN-2651). Do not copy it. The maintained fail-closed implementation lives in
`tinyland-content-types`.

## History

- Last release: v0.2.3. Registry versions 0.2.2 and 0.2.3 stay resolvable; nothing is yanked.
- The npm and GitHub Packages publish workflow was removed at retirement (RU8). Existing npmjs
  versions are deprecated by the operator deprecation script (RV18/RV19).
