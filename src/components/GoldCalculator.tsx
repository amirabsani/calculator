/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GOLD_STANDARDS } from '../data/units';
import { GoldStandard } from '../types';
import { TrendingUp, Coins, Copy, Check, Scale, ShieldAlert, Award } from 'lucide-react';

export default function GoldCalculator() {
  const [selectedStandard, setSelectedStandard] = useState<string>('Emas 916 (22K - Perhiasan Standard MY)');
  const [customPrice, setCustomPrice] = useState<string>('365.00');
  
  // Weight representations
  const [weightGrams, setWeightGrams] = useState<string>('10');
  const [weightMayam, setWeightMayam] = useState<string>('');
  const [weightSaga, setWeightSaga] = useState<string>('');
  const [weightBongkal, setWeightBongkal] = useState<string>('');

  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Conversion definitions (Gold Specific Traditional weights)
  // 1 Mayam = 3.375 grams
  // 1 Saga = 0.28125 grams (12 Saga = 1 Mayam)
  // 1 Bongkal = 10 Mayam = 33.75 grams (83.75 Traditional Sagas historically, but simplified to 10 Mayam)
  const MAYAM_TO_GRAM = 3.375;
  const SAGA_TO_GRAM = 0.28125;
  const BONGKAL_TO_GRAM = 33.75;

  const currentStandard = GOLD_STANDARDS.find(std => std.type === selectedStandard) || GOLD_STANDARDS[1];

  // Synchronize weights starting from grams initial active
  useEffect(() => {
    const gVal = parseFloat(weightGrams);
    if (!isNaN(gVal)) {
      setWeightMayam(parseFloat((gVal / MAYAM_TO_GRAM).toFixed(4)).toString());
      setWeightSaga(parseFloat((gVal / SAGA_TO_GRAM).toFixed(3)).toString());
      setWeightBongkal(parseFloat((gVal / BONGKAL_TO_GRAM).toFixed(4)).toString());
    } else if (weightGrams === '') {
      setWeightMayam('');
      setWeightSaga('');
      setWeightBongkal('');
    }
  }, [weightGrams]);

  const handleWeightChange = (unit: 'g' | 'mayam' | 'saga' | 'bongkal', value: string) => {
    if (value === '') {
      setWeightGrams('');
      setWeightMayam('');
      setWeightSaga('');
      setWeightBongkal('');
      return;
    }

    const numVal = parseFloat(value);
    if (isNaN(numVal)) return;

    if (unit === 'g') {
      setWeightGrams(value);
    } else if (unit === 'mayam') {
      setWeightMayam(value);
      const computedGrams = numVal * MAYAM_TO_GRAM;
      setWeightGrams(parseFloat(computedGrams.toFixed(4)).toString());
    } else if (unit === 'saga') {
      setWeightSaga(value);
      const computedGrams = numVal * SAGA_TO_GRAM;
      setWeightGrams(parseFloat(computedGrams.toFixed(4)).toString());
    } else if (unit === 'bongkal') {
      setWeightBongkal(value);
      const computedGrams = numVal * BONGKAL_TO_GRAM;
      setWeightGrams(parseFloat(computedGrams.toFixed(4)).toString());
    }
  };

  // Zakat Emas parameters
  const [zakatMode, setZakatMode] = useState<'simpanan' | 'perhiasan'>('perhiasan');
  const [stateUruf, setStateUruf] = useState<number>(800); // Default Selangor = 800g

  const stateUrufs = [
    { state: 'Selangor / Johor', uruf: 800 },
    { state: 'W.P. Kuala Lumpur / Labuan / Putrajaya', uruf: 150 },
    { state: 'Kedah / Perlis / Pulau Pinang', uruf: 170 },
    { state: 'Kelantan / Terengganu', uruf: 200 }, // historically, some state urufs are or no uruf (e.g. Kelantan has u_threshold as high but let's list 200g as standard worn limit)
    { state: 'Negeri Sembilan / Melaka', uruf: 200 },
    { state: 'Pahang / Perak', uruf: 180 },
    { state: 'Sabah / Sarawak', uruf: 85 } // Sabah / Sarawak often follows standard gold 85g or customized
  ];

  const pricePerGram = parseFloat(customPrice) || currentStandard.marketPricePerGram;
  const currentWeightGrams = parseFloat(weightGrams) || 0;
  
  // Total gold asset value = Weight (g) * Price per gram (modified by purity)
  // Inside Malaysian jewelry trade, 916 is sold based on total weight * 916 price per gram.
  const baseAssetValue = currentWeightGrams * pricePerGram;

  // Zakat calculations
  const storedGoldNisabGrams = 85; 
  let isZakatRequired = false;
  let zakatPayableRM = 0;
  let explanation = '';

  if (zakatMode === 'simpanan') {
    if (currentWeightGrams >= storedGoldNisabGrams) {
      isZakatRequired = true;
      // Zakat 2.5% calculated on the entire value of the stored gold
      zakatPayableRM = baseAssetValue * 0.025;
      explanation = `Berat melebihi nisab simpanan (${storedGoldNisabGrams}g). Zakat 2.5% dikenakan ke atas keseluruhan nilai simpanan emas anda.`;
    } else {
      explanation = `Berat emas di bawah had nisab layak zakat (${storedGoldNisabGrams}g). Anda tidak wajib membayar Zakat Emas Simpanan.`;
    }
  } else {
    // Worn gold (Emas Perhiasan)
    if (currentWeightGrams >= stateUruf) {
      isZakatRequired = true;
      // Zakat is 2.5% of total worn gold value in many state rulings
      zakatPayableRM = baseAssetValue * 0.025;
      explanation = `Berat melepasi had Uruf negeri (${stateUruf}g). Di bawah hukum Zakat Negeri, anda wajib membayar Zakat 2.5% ke atas keseluruhan emas perhiasan ini.`;
    } else {
      explanation = `Berat emas di bawah had Uruf negeri (${stateUruf}g). Emas perhiasan yang dipakai harian kurang daripada limit uruf tidak dikenakan Zakat.`;
    }
  }

  const handleCopyValue = (valStr: string, label: string) => {
    navigator.clipboard.writeText(valStr);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleSelectStandard = (typeStr: string) => {
    setSelectedStandard(typeStr);
    const selectedObj = GOLD_STANDARDS.find(std => std.type === typeStr);
    if (selectedObj) {
      setCustomPrice(selectedObj.marketPricePerGram.toFixed(2));
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col gap-6" id="gold_calculator">
      <div>
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400 animate-pulse" />
          Kiraan Nilai Emas & Mayam Tradisional
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Urus timbangan emas menggunakan kaedah tradisi Pantai Timur Malaysia (Mayam dan Saga). Bersepadu dengan perkiraan Zakat Emas Lembaga Zakat negeri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Traditional Weights Converter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
            Timbangan Khas Emas Tradisional
          </h4>

          {/* Gold Grade Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-400" htmlFor="gold_std_select">Mutu Emas / Perak:</label>
            <select
              id="gold_std_select"
              value={selectedStandard}
              onChange={(e) => handleSelectStandard(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-1 focus:ring-emerald-500 focus:outline-hidden cursor-pointer"
            >
              {GOLD_STANDARDS.map(std => (
                <option key={std.type} value={std.type} className="bg-slate-900 text-white">
                  {std.type}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Price Input */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[11px]">
              <label className="font-bold text-slate-400" htmlFor="custom_price_input">Sebut Harga Semasa (RM/Gram):</label>
              <span className="font-mono text-emerald-450 font-semibold">Purity: {currentStandard.purity * 100}%</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs text-slate-500 font-bold">RM</span>
              <input
                id="custom_price_input"
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono font-bold text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Grid weights inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl">
              <label className="block text-[10px] font-bold text-amber-450 uppercase mb-0.5" htmlFor="gold_g_input">Grams (g)</label>
              <input
                id="gold_g_input"
                type="number"
                value={weightGrams}
                onChange={(e) => handleWeightChange('g', e.target.value)}
                className="w-full bg-transparent text-sm font-semibold font-mono text-white focus:outline-hidden whitespace-normal"
                placeholder="0.0"
              />
            </div>

            <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-amber-450 uppercase" htmlFor="gold_mym_input">Mayam</label>
                <span className="text-[8px] text-amber-500 font-bold font-mono">3.38g</span>
              </div>
              <input
                id="gold_mym_input"
                type="number"
                value={weightMayam}
                onChange={(e) => handleWeightChange('mayam', e.target.value)}
                className="w-full bg-transparent text-sm font-semibold font-mono text-white focus:outline-hidden mt-0.5"
                placeholder="0.0"
              />
            </div>

            <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-amber-450 uppercase" htmlFor="gold_saga_input">Saga Emas</label>
                <span className="text-[8px] text-amber-500 font-bold font-mono">1/12 mym</span>
              </div>
              <input
                id="gold_saga_input"
                type="number"
                value={weightSaga}
                onChange={(e) => handleWeightChange('saga', e.target.value)}
                className="w-full bg-transparent text-sm font-semibold font-mono text-white focus:outline-hidden mt-0.5"
                placeholder="0.0"
              />
            </div>

            <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-amber-450 uppercase" htmlFor="gold_bongkal_input">Bongkal</label>
                <span className="text-[8px] text-amber-500 font-bold font-mono">33.75g</span>
              </div>
              <input
                id="gold_bongkal_input"
                type="number"
                value={weightBongkal}
                onChange={(e) => handleWeightChange('bongkal', e.target.value)}
                className="w-full bg-transparent text-sm font-semibold font-mono text-white focus:outline-hidden mt-0.5"
                placeholder="0.0"
              />
            </div>
          </div>

          {/* Quick Copy Info panel */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-medium font-display">Taksiran Nilai Kasar Emas:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-emerald-400">RM {baseAssetValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <button
                type="button"
                onClick={() => handleCopyValue(baseAssetValue.toFixed(2), 'harga_kasar')}
                className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {copiedText === 'harga_kasar' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-450" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Gold Zakat Assistant */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-850 pb-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            Penolong Kiraan Zakat Emas
          </h4>

          {/* Selection of Zakat Mode */}
          <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-850">
            <button
              type="button"
              onClick={() => setZakatMode('simpanan')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                zakatMode === 'simpanan'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xs font-semibold'
                  : 'text-slate-450 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              Emas Simpanan
            </button>
            <button
              type="button"
              onClick={() => setZakatMode('perhiasan')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                zakatMode === 'perhiasan'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xs font-semibold'
                  : 'text-slate-450 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              Emas Perhiasan (Dipakai)
            </button>
          </div>

          {/* Dynamic parameter depends on Mode */}
          {zakatMode === 'simpanan' ? (
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] leading-relaxed text-slate-400">
              <span className="font-semibold text-slate-250 block mb-0.5">Nisab Emas Simpanan:</span>
              Emas yang tidak digunakan / disimpan secara meluas. Nisab layak Zakat adalah tetap sebanyak <strong className="text-slate-200">85 Gram</strong> di seluruh Malaysia tanpa mengira tempat simpanan.
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 bg-slate-900 p-3 rounded-xl border border-slate-800 relative">
              <label className="text-[11px] font-bold text-slate-300 block" htmlFor="uruf_state_selector">Pilih Negeri Uruf Pemakaian:</label>
              <select
                id="uruf_state_selector"
                value={stateUruf}
                onChange={(e) => setStateUruf(parseInt(e.target.value))}
                className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-hidden cursor-pointer"
              >
                {stateUrufs.map(u => (
                  <option key={u.state} value={u.uruf}>
                    {u.state} ({u.uruf}g)
                  </option>
                ))}
              </select>
              <span className="text-[9px] text-slate-500 mt-1 leading-normal">
                *Uruf bermaksud had norma berat pemakaian yang lazim bagi masyarakat setempat sebelum dikategorikan sebagai simpanan berpagar.
              </span>
            </div>
          )}

          {/* Results Block */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shrink-0 flex flex-col justify-between gap-3 min-h-[140px]">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-semibold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full inline-block">
                  Status Zakat
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-semibold">
                  Kiraan {zakatMode === 'simpanan' ? 'Stored' : 'Worn'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal mb-1">
                {explanation}
              </p>
            </div>

            {isZakatRequired ? (
              <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline">
                <span className="text-xs font-semibold text-slate-405 text-slate-400">Jumlah Zakat Wajib (2.5%):</span>
                <div className="text-right text-slate-200">
                  <span className="text-xs font-bold text-amber-400 font-mono">RM </span>
                  <span className="text-xl font-extrabold text-amber-450 font-mono" id="zakat_payable_rm">
                    {zakatPayableRM.toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="border-t border-slate-800 pt-2 flex items-center gap-1.5 text-xs text-emerald-450 font-semibold">
                <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tiada kewajipan Zakat bayaran bagi gred timbangan ini.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faith Context Footnote */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-400">
        <Award className="w-4 h-4 text-amber-450 shrink-0 mt-0.5" />
        <p className="leading-relaxed leading-snug">
          <strong className="text-slate-200">Perbezaan Timbangan:</strong> Gram emas adalah sistem berat moden (metrik). Dalam rujukan mahkamah adat lama, <strong className="text-slate-250">1 Mayam</strong> bersamaan tepat dengan 3.375g emas. Sebarang transaksi pertukaran emas lama digalakkan untuk ditukar terlebih dahulu ke unit gram bagi menjamin keadilan timbangan syariah di Malaysia.
        </p>
      </div>
    </div>
  );
}
