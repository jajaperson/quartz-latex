import { Options as Options$1 } from '@jajaperson/rehype-mathjax/svg';
import { Options } from '@jajaperson/rehype-mathjax/chtml';
import { QuartzTransformerPlugin } from '@quartz-community/types';
export { QuartzTransformerPlugin } from '@quartz-community/types';
import { KatexOptions } from 'katex';

interface TypstOptions {
    [key: string]: unknown;
}
type Args = boolean | number | string | null;
type LatexOptions = {
    renderEngine: "katex";
    engineOptions?: KatexOptions;
} | {
    renderEngine: "mathjax/chtml";
    engineOptions?: Options;
} | {
    renderEngine: "mathjax/svg";
    engineOptions?: Options$1;
} | {
    renderEngine: "typst";
    engineOptions?: TypstOptions;
};
declare const Latex: QuartzTransformerPlugin<LatexOptions | undefined>;

export { type Args, Latex, type LatexOptions };
