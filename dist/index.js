import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMathjax from 'rehype-mathjax/svg';
import rehypeTypst from '@myriaddreamin/rehype-typst';

// src/transformer.ts
var Latex = (opts) => {
  const engine = opts?.renderEngine ?? "katex";
  const macros = opts?.customMacros ?? {};
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath];
    },
    htmlPlugins() {
      switch (engine) {
        case "katex": {
          return [[rehypeKatex, { output: "html", macros, ...opts?.katexOptions ?? {} }]];
        }
        case "typst": {
          return [[rehypeTypst, opts?.typstOptions ?? {}]];
        }
        default:
        case "mathjax": {
          return [
            [
              rehypeMathjax,
              {
                ...opts?.mathJaxOptions ?? {},
                tex: {
                  ...opts?.mathJaxOptions?.tex ?? {},
                  macros
                }
              }
            ]
          ];
        }
      }
    },
    externalResources() {
      switch (engine) {
        case "katex":
          return {
            css: [{ content: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" }],
            js: [
              {
                src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js",
                loadTime: "afterDOMReady",
                contentType: "external"
              }
            ]
          };
      }
    }
  };
};

export { Latex };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map