# C15 ES — Frontend Navigation & State Contract

## Entry and exit paths

| Source | Action                                  | Destination                                | Status after this phase                  |
| ------ | --------------------------------------- | ------------------------------------------ | ---------------------------------------- |
| C01 EN | Book a Service                          | existing C15 route, EN                     | Remains working                          |
| C01 EN | each active service category            | existing C15, canonical preselected ID, EN | Remains working                          |
| C01 ES | Reservar un servicio                    | existing C15 route, ES                     | **Enable**                               |
| C01 ES | center Reservar tab                     | existing C15 route, ES                     | **Enable**                               |
| C01 ES | each of 7 active service categories     | existing C15, canonical preselected ID, ES | **Enable**                               |
| C01 ES | Montaje adicional (disabled paid extra) | no C15 navigation                          | Preserve existing honest optional notice |
| C15 ES | Android back gesture/button             | C01 ES                                     | Must work                                |
| C15 EN | Android back gesture/button             | C01 EN                                     | Must work                                |

Figma C15 Spanish row links: `C18-J/M/F/A/T/G/R` (future). Figma bottom action links: `C15-S`, `C16`, `C16-F`, `C15-E` (future). **These screens must not be implemented yet**. Taps may update selected in-memory service state and present a localized honest pending notice, but must not create booking objects, quote/price objects, eligibility decisions, account sessions, or navigation to nonexistent routes.

## Selection state

Use stable canonical identifiers independent of locale. Locale changes should replace displayed text but not mutate service ID. Persisting any selection as a confirmed reservation is prohibited. Default may remain the existing English C15 default (`junk-removal`) when no preselection is provided. No new global backend state or dummy JWT.

## Profile state

The English demo identity is Sarah Mitchell; Spanish demo identity is Bryan Lopez, unless an existing locale-specific edit changed that name. Use the existing typed profile fixture/store; do not duplicate it. The static Figma C15-ES screen contains Sarah, which is a design-source inconsistency, not a requirement to leak English customer identity into Spanish runtime.

## No bottom navbar on C15

C15 is part of a distinct booking discovery flow. Flow header only; use Android native status bar/safe area, not Figma's illustrative iOS bar. C01 does keep its shared sculpted bottom navbar.
