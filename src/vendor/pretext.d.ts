export type PreparedText = unknown;

export type TextLayout = {
  height: number;
  lineCount: number;
};

export function prepare(text: string, font: string): PreparedText;
export function layout(
  prepared: PreparedText,
  maxWidth: number,
  lineHeight: number,
): TextLayout;
export function setLocale(locale?: string): void;
