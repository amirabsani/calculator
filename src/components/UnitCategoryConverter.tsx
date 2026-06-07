/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UNIT_GROUPS } from '../data/units';
import { UnitGroup, UnitCategory, Unit } from '../types';
import { Sliders, Copy, Check, Info, HelpCircle } from 'lucide-react';

interface UnitCategoryConverterProps {
  activeCategory: UnitCategory;
  setActiveCategory: (category: UnitCategory) => void;
  syncValue: number;
  setSyncValue: (val: number) => void;
  activeUnitId: string;
  setActiveUnitId: (id: string) => void;
}

export default function UnitCategoryConverter({
  activeCategory,
  setActiveCategory,
  syncValue,
  setSyncValue,
  activeUnitId,
  setActiveUnitId,
}: UnitCategoryConverterProps) {
  const currentGroup = UNIT_GROUPS.find((g) => g.category === activeCategory) || UNIT_GROUPS[0];
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showHelperModal, setShowHelperModal] = useState<string | null>(null);

  // Synchronize inputs when syncValue changes from outside
  useEffect(() => {
    const activeUnit = currentGroup.units.find((u) => u.id === activeUnitId) || currentGroup.units[0];
    const baseValue = syncValue;

    const newInputs: { [key: string]: string } = {};
    currentGroup.units.forEach((unit) => {
      const valInUnit = baseValue / unit.ratioToBase;
      // Format to 5 decimal places max, discarding excess trailing zeroes
      newInputs[unit.id] = parseFloat(valInUnit.toFixed(5)).toString();
    });
    setInputs(newInputs);
  }, [syncValue, activeCategory, currentGroup.units, activeUnitId]);

  const handleInputChange = (unitId: string, valueStr: string) => {
    const updatedInputs = { ...inputs, [unitId]: valueStr };
    setInputs(updatedInputs);
    setActiveUnitId(unitId);

    const numericVal = parseFloat(valueStr);
    if (!isNaN(numericVal)) {
      const unitObj = currentGroup.units.find((u) => u.id === unitId);
      if (unitObj) {
        // Compute new Base Value (Base Unit)
        const newBaseValue = numericVal * unitObj.ratioToBase;
        setSyncValue(newBaseValue);
      }
    } else if (valueStr === '') {
      // Clear values if blank
      setSyncValue(0);
    }
  };

  const handleCopy = (unitId: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(unitId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderVal = parseFloat(e.target.value);
    // Let's exponentialize slider for high scale range (0 to 10000 approx)
    const activeUnit = currentGroup.units.find((u) => u.id === activeUnitId) || currentGroup.units[0];
    const baseValue = sliderVal * activeUnit.ratioToBase;
    setSyncValue(baseValue);
  };

  // Find the label for base unit
  const baseUnitObj = currentGroup.units.find(u => u.ratioToBase === 1) || currentGroup.units[0];

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl flex flex-col gap-6" id="category_converter">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
        {UNIT_GROUPS.map((group) => {
          const isSelected = activeCategory === group.category;
          return (
            <button
              key={group.category}
              id={`tab_${group.category}`}
              onClick={() => {
                setActiveCategory(group.category);
                // Reset syncValue to basic unit amount to avoid weird overflows
                const defaultUnit = group.units[0];
                setActiveUnitId(defaultUnit.id);
                setSyncValue(defaultUnit.ratioToBase * 10);
              }}
              className={`px-4 py-2.5 rounded-xl font-display text-sm font-semibold transition-all outline-hidden cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]'
                  : 'bg-slate-950/40 text-slate-400 hover:bg-slate-800 border border-transparent hover:text-slate-200'
              }`}
            >
              {group.name}
            </button>
          );
        })}
      </div>

      {/* Category Subtitle */}
      <div>
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          {currentGroup.localName}
          <span className="text-xs bg-emerald-500/10 text-emerald-450 border border-emerald-500/25 px-2.5 py-0.5 rounded-full font-medium">
            Kiraan Tradisi
          </span>
        </h3>
        <p className="text-xs text-slate-450 mt-1 leading-relaxed">
          {currentGroup.description}
        </p>
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional list first */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 border-l-2 border-emerald-500 pl-2">
            Unit Warisan Tradisional
          </h4>
          <div className="flex flex-col gap-3">
            {currentGroup.units
              .filter((u) => u.type === 'traditional')
              .map((unit) => {
                const isActive = activeUnitId === unit.id;
                return (
                  <div
                    key={unit.id}
                    className={`relative rounded-2xl border p-3.5 transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(52,211,153,0.05)]'
                        : 'border-slate-800 bg-slate-900/40 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer" htmlFor={`input_${unit.id}`}>
                        {unit.name}
                        <button
                          type="button"
                          onClick={() => setShowHelperModal(showHelperModal === unit.id ? null : unit.id)}
                          className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                        </button>
                      </label>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-305 border border-slate-700/50 px-1.5 py-0.5 rounded-md uppercase">
                        {unit.symbol}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id={`input_${unit.id}`}
                        type="number"
                        step="any"
                        value={inputs[unit.id] || ''}
                        onChange={(e) => handleInputChange(unit.id, e.target.value)}
                        className="w-full bg-transparent text-base font-semibold font-mono text-white focus:outline-hidden py-1"
                        placeholder="0.0"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(unit.id, inputs[unit.id] || '0')}
                        className="text-slate-500 hover:text-slate-250 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Salin nilai"
                      >
                        {copiedId === unit.id ? (
                          <Check className="w-4 h-4 text-emerald-450" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Pop-up Info / Origin */}
                    {showHelperModal === unit.id && (
                      <div className="absolute z-10 left-0 right-0 top-full mt-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-3.5 shadow-2xl text-xs leading-relaxed transition-all">
                        <p className="font-semibold text-emerald-400 border-b border-slate-800/80 pb-1 mb-1">
                          Definisi & Asal Usul:
                        </p>
                        <p className="text-slate-300 mb-1.5">{unit.description}</p>
                        <p className="text-[11px] text-slate-450 italic font-medium leading-normal">
                          &ldquo;{unit.origin}&rdquo;
                        </p>
                        <div className="text-[10px] text-emerald-400 mt-2 font-mono flex justify-between">
                          <span>Nisbah Base: {unit.ratioToBase} {baseUnitObj.symbol}</span>
                          <button
                            onClick={() => setShowHelperModal(null)}
                            className="underline text-white hover:text-emerald-300 cursor-pointer"
                          >
                            Tutup
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Modern standard counterparts */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-l-2 border-slate-500 pl-2">
            Unit Metrik / Imperial Setara
          </h4>
          <div className="flex flex-col gap-3">
            {currentGroup.units
              .filter((u) => u.type === 'modern')
              .map((unit) => {
                const isActive = activeUnitId === unit.id;
                return (
                  <div
                    key={unit.id}
                    className={`relative rounded-2xl border p-3.5 transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(52,211,153,0.05)]'
                        : 'border-slate-800 bg-slate-900/40 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-300" htmlFor={`input_${unit.id}`}>
                        {unit.name}
                      </label>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-705 px-1.5 py-0.5 rounded-md">
                        {unit.symbol}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        id={`input_${unit.id}`}
                        type="number"
                        step="any"
                        value={inputs[unit.id] || ''}
                        onChange={(e) => handleInputChange(unit.id, e.target.value)}
                        className="w-full bg-transparent text-base font-semibold font-mono text-white focus:outline-hidden py-1"
                        placeholder="0.0"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(unit.id, inputs[unit.id] || '0')}
                        className="text-slate-500 hover:text-slate-250 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Salin nilai"
                      >
                        {copiedId === unit.id ? (
                          <Check className="w-4 h-4 text-emerald-450" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Range Slider for Interaction */}
      <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            Laras Interaktif (Kawalan Kasar)
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Unit Rujukan Utama: <span className="font-semibold text-emerald-400">{inputs[activeUnitId]} {activeUnitId}</span>
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="0.1"
          value={parseFloat(inputs[activeUnitId]) || 0}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[11px] text-slate-550 mt-1 font-mono">
          <span>Sifar (0)</span>
          <span>Sederhana (100)</span>
          <span>Tinggi (200)</span>
        </div>
      </div>

      {/* Educational Footer */}
      <div className="bg-slate-900/40 border border-emerald-500/10 text-slate-300 rounded-xl p-4 flex items-start gap-2.5 text-xs">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-slate-400">
          <strong className="text-slate-200">Info Warisan:</strong> Tahukah anda? Pada 1 Jan 1982, parlimen Malaysia menggubal sistem Metrik secara rasmi melalui <strong className="text-slate-200">Akta Timbangan dan Sukatan 1972</strong>. Walau bagaimanapun, takrifan rasmi bagi 1 Kati disetarakan dengan tepat sebagai <strong className="text-slate-250">1 1/3 paun</strong> (604.79g) bagi melindungi hak tatanan tradisi.
        </p>
      </div>
    </div>
  );
}
