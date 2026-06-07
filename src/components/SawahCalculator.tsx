/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sprout, HelpCircle, Layers, Coins, Landmark, Calendar } from 'lucide-react';

export default function SawahCalculator() {
  const [landAreaRelung, setLandAreaRelung] = useState<string>('5');
  const [soilPurity, setSoilPurity] = useState<'rendah' | 'sederhana' | 'tinggi'>('sederhana');
  
  // Extra outputs
  const [seedsNeededGtg, setSeedsNeededGtg] = useState<number>(0);
  const [seedsNeededKg, setSeedsNeededKg] = useState<number>(0);
  const [estimatedYieldTon, setEstimatedYieldTon] = useState<number>(0);
  const [estimatedYieldPikul, setEstimatedYieldPikul] = useState<number>(0);
  
  // Payout details
  const [paddySaleRevenue, setPaddySaleRevenue] = useState<number>(0);
  const [subsidyRevenue, setSubsidyRevenue] = useState<number>(0);
  const [totalGrossPayout, setTotalGrossPayout] = useState<number>(0);

  // Conversion specs:
  // 1 Relung Kedah = 30,976 sq ft
  // Seeds required: 1.5 Gantang of seeds per 1 Relung Kedah.
  // Weight of seeds: 1 Gantang = ~2.6 kg of paddy seeds.
  
  // Yield rates (Metric Ton per Relung Kedah)
  const YIELD_RATES = {
    rendah: 1.2,       // 1.2 Ton per Relung
    sederhana: 1.6,   // 1.6 Ton per Relung
    tinggi: 2.1        // 2.1 Ton per Relung
  };

  // Malaysian Paddy Price values as of modern schemes:
  // Paddy Purchase Floor Price: RM 1,450 per Metric Ton
  // Government Subsidy (SSHP): RM 500 per Metric Ton
  const PRICE_PER_TON = 1450;
  const SUBSIDY_PER_TON = 500;

  useEffect(() => {
    const area = parseFloat(landAreaRelung);
    if (!isNaN(area) && area >= 0) {
      // 1. Seeds Required: 1.5 Gantang per Relung Kedah.
      const seedsGtg = area * 1.5;
      setSeedsNeededGtg(seedsGtg);
      
      // Converted to Kg: seeds weight standard (approx 2.6 kg per gantang paddy grains)
      setSeedsNeededKg(seedsGtg * 2.6);

      // 2. Yield: area * yields rate based on soil fertility
      const yieldTon = area * YIELD_RATES[soilPurity];
      setEstimatedYieldTon(yieldTon);

      // Translated to traditional Pikul (1 Pikul = 60.478982 kg. 1 Metric Ton = 1000 kg / 60.478982 = 16.53 Pikul)
      setEstimatedYieldPikul((yieldTon * 1000) / 60.478982);

      // 3. Earnings Calculations
      const saleRev = yieldTon * PRICE_PER_TON;
      const subRev = yieldTon * SUBSIDY_PER_TON;
      setPaddySaleRevenue(saleRev);
      setSubsidyRevenue(subRev);
      setTotalGrossPayout(saleRev + subRev);
    } else {
      setSeedsNeededGtg(0);
      setSeedsNeededKg(0);
      setEstimatedYieldTon(0);
      setEstimatedYieldPikul(0);
      setPaddySaleRevenue(0);
      setSubsidyRevenue(0);
      setTotalGrossPayout(0);
    }
  }, [landAreaRelung, soilPurity]);

  const handleAreaChange = (valStr: string) => {
    if (valStr === '' || parseFloat(valStr) >= 0) {
      setLandAreaRelung(valStr);
    }
  };

  const getSowingDescription = () => {
    switch (soilPurity) {
      case 'rendah':
        return 'Sesuai untuk tanah berasid tinggi / pengairan tidak sekata (Hasil purata 1.2 Tan/Relung)';
      case 'sederhana':
        return 'Tanah pamah standard, sistem saliran sederhana seimbang (Hasil purata 1.6 Tan/Relung)';
      case 'tinggi':
        return 'Padi organik / Sawah jelapang subur berpengairan MADA gred A (Hasil purata 2.1 Tan/Relung)';
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col gap-6" id="sawah_calculator">
      <div>
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-400 animate-bounce" />
          Kira Hasil Sawah & Benih Padi (Utara)
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Ketahui anggaran hasil tanaman padi, kuantiti beras/benih sapaan tradisi, dan jumlah subsidi langsung perolehan petani berdasarkan ukuran <strong className="text-slate-200 font-semibold">Relung Kedah</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Input Sidebar */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider border-l-2 border-emerald-500 pl-2">
            Perincian Luas Tanah Bendang
          </h4>

          {/* Land size input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400" htmlFor="paddy_land_input">
              Keluasan Bendang (Relung Kedah):
            </label>
            <div className="relative">
              <input
                id="paddy_land_input"
                type="number"
                value={landAreaRelung}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-base font-bold font-mono text-white focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                placeholder="0.0"
                min="0"
              />
              <span className="absolute right-3 top-2.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md font-display">
                Relung
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              *(1 Relung Kedah = 30,976 kaki persegi / ~0.71 Ekar)
            </p>
          </div>

          {/* Soil fertility/Purity choices */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              Tahap Kesuburan Tanah Bendang:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSoilPurity('rendah')}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  soilPurity === 'rendah'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800 text-xs'
                }`}
              >
                Rendah
              </button>
              <button
                type="button"
                onClick={() => setSoilPurity('sederhana')}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  soilPurity === 'sederhana'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800 text-xs'
                }`}
              >
                Sederhana
              </button>
              <button
                type="button"
                onClick={() => setSoilPurity('tinggi')}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                  soilPurity === 'tinggi'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800 text-xs'
                }`}
              >
                Tinggi
              </button>
            </div>
            <p className="text-[10px] text-emerald-450 italic mt-1 leading-normal">
              Info: {getSowingDescription()}
            </p>
          </div>

          {/* Sowing seed suggestion */}
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-mono">
              Keperluan Benih Taburan
            </span>
            <div className="flex justify-between items-baseline">
              <p className="text-sm font-bold text-slate-200">
                {seedsNeededGtg.toFixed(1)} Gantang
              </p>
              <p className="text-xs font-mono text-emerald-400 font-semibold">
                (~{seedsNeededKg.toFixed(1)} kg benih)
              </p>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard with detailed payouts */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-5 flex flex-col justify-between gap-5">
          <div>
            <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase px-2 py-0.5 rounded-full inline-block mb-1">
              Taksiran Pulangan Kasar
            </span>
            <p className="text-[11px] text-slate-455 text-slate-400">Anggaran Jumlah Hasil Tuaian Semusim:</p>
            <div className="flex justify-between items-baseline mt-2 border-b border-slate-850 pb-3">
              <div>
                <span className="text-3xl font-black text-emerald-400 font-mono">
                  {estimatedYieldTon.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-display ml-1">Tan Metrik</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-200 font-mono">
                  {estimatedYieldPikul.toFixed(1)}
                </span>
                <span className="text-xs font-semibold text-slate-500 font-display ml-1">Pikul Tradisi</span>
              </div>
            </div>
          </div>

          {/* Cost breakdown items */}
          <div className="flex flex-col gap-2.5 text-xs text-slate-400">
            <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-850">
              <span className="font-medium flex items-center gap-1 text-slate-300">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                Harga Pembelian Padi (Nilai Kasar):
              </span>
              <span className="font-mono font-bold text-slate-200">
                RM {paddySaleRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-850">
              <span className="font-medium flex items-center gap-1 text-emerald-400">
                <Landmark className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                Subsidi SSHP Kerajaan (RM500/Tan):
              </span>
              <span className="font-mono font-bold text-emerald-400">
                RM {subsidyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 p-3 rounded-2xl shadow-xs mt-1">
              <span className="text-xs font-bold leading-normal text-slate-200">
                Jumlah Penerimaan Kasar Petani:
              </span>
              <span className="font-mono font-extrabold text-base tracking-wide text-emerald-400" id="paddy_gross_payout">
                RM {totalGrossPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Note */}
      <div className="bg-slate-950 border border-slate-800 text-slate-400 rounded-xl p-3 flex items-start gap-2 text-xs">
        <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-snug leading-relaxed">
          <strong className="text-slate-200">Putaran Sawah:</strong> Masa penanaman padi kebiasaannya mengambil pusingan selama 105 - 120 hari bergantung kepada jenis kultivar benih (MR297, MR219, dll). Kiraan hasil bendang adalah ramalan kasar dan boleh dipengaruhi oleh serangan penyakit daun padi, banjir kilat, gred keasidan tanah bendang serta kualiti benih sapaan.
        </p>
      </div>
    </div>
  );
}
