import { footer, mainNav, type SiteDef } from "@luxfi/ui/site-def";

import { commerceConfig as commerce } from '@luxfi/data/commerce';

export default {
  currentAs: 'https://app.luxco.in',
  nav: {
    common: mainNav
  },
  footer: footer.standard,
  commerce,
} satisfies SiteDef