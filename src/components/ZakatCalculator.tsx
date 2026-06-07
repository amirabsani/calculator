/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STATE_ZAKAT_DATA } from '../data/units';
import { StateZakat } from '../types';
import { Coins, Heart, Users, ShieldCheck, Scale, Award } from 'lucide-react';

export default function ZakatCalculator() {
  const [selectedStateName, setSelectedStateName] = useState<string>('Selangor');
  const [familyMembers, setFamilyMembers] = useState<number>(1);
  const [riceBracket, setRiceBracket] = useState<'normal' | 'medium' | 'premium'>('normal');

  const currentState = STATE_ZAKAT_DATA.find((s) => s.state === selectedStateName) || STATE_ZAKAT_DATA[0];

  // Pick price based on bracket
  const getRate = () => {
    switch (riceBracket) {
      case 'medium':
        return currentState.rateMedium;
      case 'premium':
        return currentState.ratePremium;
      case 'normal':
      default:
        return currentState.rateNormal;
    }
  };

  const ratePerPerson = getRate();
  const totalZakatRM = familyMembers * ratePerPerson;
  const totalRiceWeightKg = familyMembers * currentState.weightEquivalent;

  // Let's convert rice volume (1 Gantang Baghdad = 4 Cupak = 1 Gallon = 4.546 L = ~2.70 kg)
  // Therefore, familyMembers * 1 Gantang = familyMembers Gantangs
  const totalGantang = familyMembers;
  const totalCupak = familyMembers * 4;

  const handleMemberChange = (increment: number) => {
    const newVal = familyMembers + increment;
    if (newVal >= 1 && newVal <= 100) {
      setFamilyMembers(newVal);
    }
  };

  const getRiceTypeLabel = () => {
    switch (riceBracket) {
      case 'normal':
        return 'Beras Tempatan Standard (SST 5%)';
      case 'medium':
        return 'Beras Import (Basmati, Ponni, Perang)';
      case 'premium':
        return 'Beras Wangi, Jepun, Basmati Premium, atau Organik';
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col gap-6" id="zakat_calculator">
      <div>
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Coins className="w-5 h-5 text-emerald-400" />
          Kalkulator Zakat Fitrah Tradisi
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Zakat Fitrah disandarkan mengukur <strong className="text-slate-200 font-semibold">Satu Gantang Baghdad</strong> bersamaan kira-kira <strong className="text-slate-200 font-semibold">2.7 kg</strong> beras bersih bagi setiap jiwa di Malaysia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Parameters Box */}
        <div className="flex flex-col gap-4">
          {/* State selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400" htmlFor="state_selector">
              Pilih Negeri Kelayakan Zakat:
            </label>
            <select
              id="state_selector"
              value={selectedStateName}
              onChange={(e) => setSelectedStateName(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-hidden cursor-pointer"
            >
              {STATE_ZAKAT_DATA.map((s) => (
                <option key={s.state} value={s.state} className="bg-slate-900 text-white">
                  {s.state} (Kadar Normal: RM{s.rateNormal.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Household / Family Counters */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              Bilangan Ahli Keluarga (Tanggungan Jiwa):
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                id="member_decrement"
                onClick={() => handleMemberChange(-1)}
                disabled={familyMembers <= 1}
                className="w-11 h-11 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 flex items-center justify-center font-bold font-mono text-lg hover:bg-slate-800 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              >
                -
              </button>
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg text-center h-11 flex items-center justify-center font-mono font-bold text-slate-200 text-base">
                <Users className="w-4 h-4 text-emerald-400 mr-2" />
                {familyMembers} Jiwa
              </div>
              <button
                type="button"
                id="member_increment"
                onClick={() => handleMemberChange(1)}
                className="w-11 h-11 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 flex items-center justify-center font-bold font-mono text-lg hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Rice brackets radio */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              Gred Makanan Utama (Beras yang dimakan harian):
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRiceBracket('normal')}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  riceBracket === 'normal'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800 text-xs'
                }`}
              >
                <div className="text-xs font-bold">Standard</div>
                <div className="text-[10px] font-mono mt-0.5">RM{currentState.rateNormal.toFixed(2)}</div>
              </button>
              <button
                type="button"
                onClick={() => setRiceBracket('medium')}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  riceBracket === 'medium'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800 text-xs'
                }`}
              >
                <div className="text-xs font-bold">Import</div>
                <div className="text-[10px] font-mono mt-0.5">RM{currentState.rateMedium.toFixed(2)}</div>
              </button>
              <button
                type="button"
                onClick={() => setRiceBracket('premium')}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  riceBracket === 'premium'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800 text-xs'
                }`}
              >
                <div className="text-xs font-bold">Premium</div>
                <div className="text-[10px] font-mono mt-0.5">RM{currentState.ratePremium.toFixed(2)}</div>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Beras: {getRiceTypeLabel()}
            </p>
          </div>
        </div>

        {/* Output Results / Visualization Container */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-5 flex flex-col justify-between gap-5 relative overflow-hidden">
          {/* Subtle Watermark Badge */}
          <div className="absolute right-3 top-3 opacity-5 rotate-12 pointer-events-none">
            <ShieldCheck className="w-24 h-24 text-emerald-400" />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase px-2 py-0.5 rounded-full inline-block mb-1">
                Kiraan Ringkasan Zakat
              </span>
              <h4 className="text-xs font-medium text-slate-400">Jumlah Zakat Fitrah Perlu Dibayar:</h4>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-300 font-display">RM</span>
              <span className="text-5xl font-black text-emerald-400 tracking-tight font-display" id="zakat_total_rm">
                {totalZakatRM.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-slate-800 pt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold flex items-center gap-1">
                  <Scale className="w-3 h-3 text-emerald-400" />
                  Kuantiti Beras (KG):
                </span>
                <p className="text-base font-bold font-mono text-slate-200 mt-0.5">
                  {~~totalRiceWeightKg === totalRiceWeightKg ? totalRiceWeightKg : totalRiceWeightKg.toFixed(2)} kg
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold flex items-center gap-1">
                  <Heart className="w-3 h-3 text-emerald-400" />
                  Sukatan Tradisi:
                </span>
                <p className="text-base font-bold text-slate-200 mt-0.5 font-display" id="zakat_trad_measure">
                  {totalGantang} Gantang
                </p>
                <p className="text-[10px] text-emerald-400 font-mono leading-none mt-1">
                  ({totalCupak} Cupak Tempurung)
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Gantang Container Visualizer */}
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-4">
            <div className="relative w-16 h-16 bg-slate-950 rounded-b-xl border-l-[3px] border-r-[3px] border-b-[3px] border-emerald-500/45 overflow-hidden flex flex-col justify-end shrink-0 shadow-inner">
              {/* Rice filling */}
              <div 
                className="bg-emerald-500/25 border-t-2 border-dashed border-emerald-400 w-full transition-all duration-300 relative shadow-inner"
                style={{ height: `${Math.min(100, 15 + (familyMembers * 8))}%` }}
              >
                {/* Tiny rice grain grains visual pattern */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:4px_4px]" />
              </div>
              <div className="absolute inset-x-0 top-1 text-center text-[8px] font-mono font-bold text-slate-450">
                GANTANG
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">
                Visualisasi Simpanan Zakat
              </p>
              <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                Kapasiti Zakat dari {familyMembers} Tanggungan memerlukan pengisian sebanyak {totalGantang} takaran Gantang penuh, setara beras bersaiz {totalRiceWeightKg.toFixed(1)}kg.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Syariah background note */}
      <div className="bg-slate-950 border border-slate-800 text-slate-450 rounded-xl p-3.5 text-[11px] flex items-start gap-2">
        <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-slate-400">
          <strong>Ketetapan Syarak:</strong> Majlis Agama Islam Negeri menetapkan kadar Zakat Fitrah bersandarkan 1 Gantang Baghdad beras yang bersih dari kulit. Penyediaan kadar tunai (RM) dibenarkan sebagai gantian ta&apos;wid bagi memudahkan urusan pengurusan zakat fitrah moden di Malaysia.
        </p>
      </div>
    </div>
  );
}
