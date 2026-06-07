/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UnitCategory = 'length' | 'mass' | 'volume' | 'area';

export interface Unit {
  id: string;
  name: string;
  localName: string;
  symbol: string;
  ratioToBase: number; // Multiply unit value by this to get value in Base Unit
  description: string;
  origin: string; // Brief history / cultural context
  type: 'traditional' | 'modern';
}

export interface UnitGroup {
  category: UnitCategory;
  name: string;
  localName: string;
  baseUnitSymbol: string;
  description: string;
  units: Unit[];
}

export interface StateZakat {
  state: string;
  rateNormal: number; // RM
  rateMedium: number; // RM
  ratePremium: number; // RM
  weightEquivalent: number; // kg of rice (e.g., 2.7kg)
}

export interface GoldStandard {
  type: string; // 999, 916, 750, etc.
  purity: number; // fraction
  marketPricePerGram: number; // RM
}
