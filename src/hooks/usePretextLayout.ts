import {useEffect, type RefObject} from 'react';
import {layout, prepare, setLocale, type PreparedText} from '../vendor/pretext.js';

export function usePretextLayout(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof document === 'undefined') {
      return undefined;
    }

    let active = true;
    let resizeObserver: ResizeObserver | undefined;
    const mutationObservers: MutationObserver[] = [];
    const prepared = new Map<HTMLElement, PreparedText>();

    const relayout = () => {
      for (const [element, handle] of prepared) {
        const computed = getComputedStyle(element);
        const lineHeight = Number.parseFloat(computed.lineHeight);
        if (!element.clientWidth || !Number.isFinite(lineHeight)) {
          continue;
        }

        const result = layout(handle, element.clientWidth, lineHeight);
        element.style.height = `${Math.ceil(result.height) + 1}px`;
      }
    };

    const initialize = async () => {
      await document.fonts.ready;
      if (!active) {
        return;
      }

      setLocale('zh-Hans');
      const elements = Array.from(
        root.querySelectorAll<HTMLElement>('[data-pretext]'),
      );

      for (const element of elements) {
        const font = getComputedStyle(element).font;
        prepared.set(element, prepare(element.textContent ?? '', font));

        if (element.contentEditable === 'true') {
          const observer = new MutationObserver(() => {
            prepared.set(
              element,
              prepare(element.textContent ?? '', getComputedStyle(element).font),
            );
            relayout();
          });
          observer.observe(element, {
            characterData: true,
            subtree: true,
            childList: true,
          });
          mutationObservers.push(observer);
        }
      }

      resizeObserver = new ResizeObserver(relayout);
      resizeObserver.observe(root);
      relayout();
    };

    void initialize();

    return () => {
      active = false;
      resizeObserver?.disconnect();
      mutationObservers.forEach((observer) => observer.disconnect());
    };
  }, [rootRef]);
}
