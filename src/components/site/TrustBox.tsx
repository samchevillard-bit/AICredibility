'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

// Widget officiel Trustpilot (modèle « Carousel »). Affiché seulement si un
// Business Unit ID est renseigné dans l'admin.
export default function TrustBox({ businessUnitId, url }: { businessUnitId: string; url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.Trustpilot && ref.current) window.Trustpilot.loadFromElement(ref.current, true);
  }, [businessUnitId]);

  return (
    <>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
        onLoad={() => ref.current && window.Trustpilot?.loadFromElement(ref.current, true)}
      />
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale="fr-FR"
        data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id={businessUnitId}
        data-style-height="140px"
        data-style-width="100%"
        data-theme="light"
        data-stars="4,5"
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          Trustpilot
        </a>
      </div>
    </>
  );
}
