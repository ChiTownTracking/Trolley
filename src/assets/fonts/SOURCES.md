# Local font sources

Retrieved: 2026-07-23

The four WOFF2 files in this directory are unmodified official Google Fonts
Latin subsets returned by the Google Fonts CSS API. The CSS API query used
the audited site ranges:

```text
Cormorant Garamond: normal 400-600; italic 400-500
Jost: normal 300-600; italic 300
```

## Jost

- Google Fonts repository: `https://github.com/google/fonts/tree/main/ofl/jost`
- Upstream source commit recorded by Google Fonts:
  `35f141c970538f1ed0f235789c19156b3ce2a762`
- Binary version: 3.710
- License: SIL Open Font License 1.1
- Copyright: Copyright 2020 The Jost Project Authors
  (`https://github.com/indestructible-type/Jost`)

| Local file | Official CSS API asset path | SHA-256 |
|---|---|---|
| `jost/jost-latin-variable-normal.woff2` | `/s/jost/v20/92zatBhPNqw73oTd4g.woff2` | `7726a5cd6f3c0e876c028ea2a643d45f7aad4b0f164b70966c669f4a4668f4b9` |
| `jost/jost-latin-300-italic.woff2` | `/s/jost/v20/92zJtBhPNqw73oHH7BbQp4-B6XlrZrMFBIokng.woff2` | `0bb33af605057337c79e1d8ca6f401e9f9160dea48f5aac81e45ccec81528940` |

## Cormorant Garamond

- Google Fonts repository:
  `https://github.com/google/fonts/tree/main/ofl/cormorantgaramond`
- Upstream source commit recorded by Google Fonts:
  `6d210fd3550b7358ca62d6ba3e354ec1ec940813`
- Binary version: 4.001
- License: SIL Open Font License 1.1
- Copyright: Copyright 2015 The Cormorant Project Authors
  (`https://github.com/CatharsisFonts/Cormorant`)

| Local file | Official CSS API asset path | SHA-256 |
|---|---|---|
| `cormorant-garamond/cormorant-garamond-latin-variable-normal.woff2` | `/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2` | `d80df8ff5aecd299a61549f9e29ab1ed0b9b05f4ea71d50fe978e07d5240b235` |
| `cormorant-garamond/cormorant-garamond-latin-variable-italic.woff2` | `/s/cormorantgaramond/v21/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSo.woff2` | `6f2f5c3b1abc3d0bb035a927f66a90ca873f94fc31c4966c8d024142c2036e55` |

The Latin `unicode-range` declarations in the site stylesheet are copied
from the official CSS API response. No font binary was converted, renamed
as another family, recompressed, or otherwise modified.
