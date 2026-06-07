/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import UnitCategoryConverter from './components/UnitCategoryConverter';
import ZakatCalculator from './components/ZakatCalculator';
import GoldCalculator from './components/GoldCalculator';
import SawahCalculator from './components/SawahCalculator';
import PocketCalculator from './components/PocketCalculator';
import { UNIT_GROUPS } from './data/units';
import { UnitCategory } from './types';
import { Compass, Coins, TrendingUp, Sprout, Info, Layers, Award } from 'lucide-react';

export default function App() {
  // Main states for converter
  const [activeCategory, setActiveCategory] = useState<UnitCategory>('length');
  // Sync value is represented in the base unit of the currently selected category:
  // length -> meters (default: 10 meters)
  // mass -> grams (default: 100 grams)
  // volume -> liters (default: 5 liters)
  // area -> square feet (default: 1000 square feet)
  const [syncValue, setSyncValue] = useState<number>(10);
  const [activeUnitId, setActiveUnitId] = useState<string>('jengkal');

  // Secondary Tab selection (zakat fitrah, gold mayam, agricultural sawah)
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<'zakat' | 'gold' | 'sawah'>('zakat');

  // Get matching current active unit label and current converted absolute value
  const currentGroup = UNIT_GROUPS.find((g) => g.category === activeCategory) || UNIT_GROUPS[0];
  const currentUnitObj = currentGroup.units.find((u) => u.id === activeUnitId) || currentGroup.units[0];
  const convertedCurrentValue = syncValue / currentUnitObj.ratioToBase;

  // Pull value to pocket calculator (returns the value of active converter unit)
  const handlePullFromConverter = () => {
    return parseFloat(convertedCurrentValue.toFixed(5));
  };

  // Push value from pocket calculator (updates the active unit value in converter)
  const handleSendToConverter = (newVal: number) => {
    setSyncValue(newVal * currentUnitObj.ratioToBase);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12" id="app_container">
      {/* Visual Header Banner */}
      <header className="bg-slate-900/50 border-b border-slate-800 text-white" id="app_header">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-widest font-extrabold px-2.5 py-0.5 rounded-full uppercase font-mono">
                Adat & Sains Kemasyarakatan
              </span>
              <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white mt-1">
                KiraMelayu <span className="text-emerald-400 font-light">Pro Converter</span>
              </h1>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest">
              AKTA TIMBANGAN & SUKATAN 1972
            </p>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Sistem Piawai Kemandirian Sukatan Tempatan
            </p>
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8" id="app_main">
        
        {/* Left Section: Primary Unit Converter (Span 7) */}
        <section className="lg:col-span-7 flex flex-col gap-6" id="left_section">
          {/* Main unit converter widget */}
          <UnitCategoryConverter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            syncValue={syncValue}
            setSyncValue={setSyncValue}
            activeUnitId={activeUnitId}
            setActiveUnitId={setActiveUnitId}
          />
        </section>

        {/* Right Section: Auxiliary Spec Calculators (Span 5) */}
        <section className="lg:col-span-5 flex flex-col gap-6" id="right_section">
          {/* Secondary tabs selector */}
          <div className="bg-slate-900/40 p-1.5 rounded-2xl flex border border-slate-800">
            <button
              onClick={() => setActiveSecondaryTab('zakat')}
              className={`flex-1 py-3 px-2 rounded-xl text-xs font-semibold font-display flex items-center justify-center gap-1.5 transition-all outline-hidden ${
                activeSecondaryTab === 'zakat'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg'
                  : 'text-slate-400 hover:bg-slate-850/60 hover:text-slate-200'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              Zakat Fitrah
            </button>
            <button
              onClick={() => setActiveSecondaryTab('gold')}
              className={`flex-1 py-3 px-2 rounded-xl text-xs font-semibold font-display flex items-center justify-center gap-1.5 transition-all outline-hidden ${
                activeSecondaryTab === 'gold'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg'
                  : 'text-slate-400 hover:bg-slate-850/60 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Niaga Emas (Mayam)
            </button>
            <button
              onClick={() => setActiveSecondaryTab('sawah')}
              className={`flex-1 py-3 px-2 rounded-xl text-xs font-semibold font-display flex items-center justify-center gap-1.5 transition-all outline-hidden ${
                activeSecondaryTab === 'sawah'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg'
                  : 'text-slate-400 hover:bg-slate-850/60 hover:text-slate-200'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              Hasil Sawah Padi
            </button>
          </div>

          {/* Active Auxiliary Tab */}
          <div className="transition-all duration-250">
            {activeSecondaryTab === 'zakat' && <ZakatCalculator />}
            {activeSecondaryTab === 'gold' && <GoldCalculator />}
            {activeSecondaryTab === 'sawah' && <SawahCalculator />}
          </div>

          {/* Integration Pocket Desk Calculator */}
          <PocketCalculator
            currentConverterValue={convertedCurrentValue}
            currentConverterUnitName={currentUnitObj.name}
            onSendToConverter={handleSendToConverter}
            onPullFromConverter={handlePullFromConverter}
          />
        </section>

      </main>

      {/* Citation Footer */}
      <footer className="max-w-6xl mx-auto px-6 mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500" id="app_footer">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-500" />
          <span>Aplikasi Pemuliharaan Budaya & Sukatan Sejarah Malaysia © 2026.</span>
        </div>
        <div className="flex gap-4">
          <a href="#category_converter" className="hover:text-emerald-400 transition-colors">Penukar Unit</a>
          <span className="text-slate-800">|</span>
          <a href="#zakat_calculator" className="hover:text-emerald-400 transition-colors">Zakat Fitrah</a>
          <span className="text-slate-300">|</span>
          <a href="#gold_calculator" className="hover:text-emerald-400 transition-colors">Zakat Emas</a>
        </div>
      </footer>
    </div>
  );
}

