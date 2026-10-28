'use client';

import isPropValid from '@emotion/is-prop-valid';
import { NextStudio } from 'next-sanity/studio';
import { StyleSheetManager } from 'styled-components';
import config from '../../../../sanity.config';

// Force dynamic — Sanity Studio requires client-side rendering
export const dynamic = 'force-dynamic';

// styled-components v6 forwards every prop to the DOM (v5 filtered them), so the Studio's
// internal props ("intent", "params") reached <div>s and logged warnings. Filter like v5,
// only for plain HTML elements — Sanity's own components still receive every prop.
const shouldForwardProp = (prop: string, target: unknown) => typeof target !== 'string' || isPropValid(prop);

export default function StudioPage() {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <NextStudio config={config} />
    </StyleSheetManager>
  );
}
