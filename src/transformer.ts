import remarkMath from "@jajaperson/remark-math";
import rehypeKatex from "@jajaperson/rehype-katex";
import rehypeMathjaxSvg, { type Options as SvgOptions } from "@jajaperson/rehype-mathjax/svg";
import rehypeMathjaxChtml, { type Options as ChtmlOptions } from "@jajaperson/rehype-mathjax/chtml";
import rehypeTypst from "@myriaddreamin/rehype-typst";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import type { KatexOptions } from "katex";

interface TypstOptions {
  [key: string]: unknown;
}

export type Args = boolean | number | string | null;

export type LatexOptions =
  | {
      renderEngine: "katex";
      engineOptions?: KatexOptions;
    }
  | {
      renderEngine: "mathjax/chtml";
      engineOptions?: ChtmlOptions;
    }
  | {
      renderEngine: "mathjax/svg";
      engineOptions?: SvgOptions;
    }
  | {
      renderEngine: "typst";
      engineOptions?: TypstOptions;
    };

const defaultLatexOptions: LatexOptions = {
  renderEngine: "katex",
};

export const Latex: QuartzTransformerPlugin<LatexOptions | undefined> = (opts) => {
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
                contentType: "external",
              },
            ],
          };
      }
    },
  };
};
