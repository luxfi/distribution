import React, { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { 
  RootLayout as RootLayoutCore,
  viewport as ViewPortCode
} from '@luxfi/ui/root-layout';

import siteDef from "./site-def";

export const viewport = {...ViewPortCode}
export const metadata: Metadata = {
  title: "LUX Coin Distribution App",
  description: "LUX is the native currency of Lux Network",
};

const RootLayout: React.FC<PropsWithChildren> = async ({
  children
}) =>  (
  <RootLayoutCore siteDef={siteDef} >
    {children}
  </RootLayoutCore>
)

export default RootLayout
