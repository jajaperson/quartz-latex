import remarkMath from '@jajaperson/remark-math';
import rehypeKatex from '@jajaperson/rehype-katex';
import rehypeMathjaxSvg from '@jajaperson/rehype-mathjax/svg';
import rehypeMathjaxChtml from '@jajaperson/rehype-mathjax/chtml';
import rehypeTypst from '@myriaddreamin/rehype-typst';

// src/transformer.ts
var defaultLatexOptions = {
  renderEngine: "katex"
};
var Latex = (opts) => {
  const { renderEngine, engineOptions } = opts ?? defaultLatexOptions;
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath];
    },
    htmlPlugins() {
      switch (renderEngine) {
        case "katex": {
          return [[rehypeKatex, engineOptions ?? {}]];
        }
        case "mathjax/chtml": {
          return [[rehypeMathjaxChtml, engineOptions ?? {}]];
        }
        case "mathjax/svg": {
          return [[rehypeMathjaxSvg, engineOptions ?? {}]];
        }
        case "typst": {
          return [[rehypeTypst, engineOptions ?? {}]];
        }
      }
    },
    externalResources() {
      switch (renderEngine) {
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