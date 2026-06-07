/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, ArrowDown, ArrowUp, Delete, RefreshCw } from 'lucide-react';

interface PocketCalculatorProps {
  currentConverterValue: number; // Value currently active in the active unit input
  currentConverterUnitName: string; // E.g., 'Hasta', 'Mayam'
  onSendToConverter: (val: number) => void;
  onPullFromConverter: () => number;
}

export default function PocketCalculator({
  currentConverterValue,
  currentConverterUnitName,
  onSendToConverter,
  onPullFromConverter,
}: PocketCalculatorProps) {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Click on a number or operator
  const handleKeyPress = (key: string) => {
    if (isCalculated) {
      if (['+', '-', '*', '/'].includes(key)) {
        setExpression(result + key);
      } else {
        setExpression(key);
      }
      setIsCalculated(false);
    } else {
      setExpression((prev) => prev + key);
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('0');
    setIsCalculated(false);
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      // Safe substitution of math symbols before evaluation
      const cleanExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
      if (!cleanExpr) return;
      
      // Basic evaluation utilizing function constructor to avoid direct eval danger
      const calcResult = new Function(`return (${cleanExpr})`)();
      
      if (typeof calcResult === 'number' && !isNaN(calcResult)) {
        const formattedRes = parseFloat(calcResult.toFixed(5)).toString();
        setResult(formattedRes);
        setIsCalculated(true);
      } else {
        setResult('Ralat');
      }
    } catch (e) {
      setResult('Ralat');
    }
  };

  // Pull value currently in active unit of converter
  const handlePullVal = () => {
    const value = onPullFromConverter();
    setExpression(value.toString());
    setResult(value.toString());
    setIsCalculated(true);
  };

  // Push calculator result back into the converter as active unit value
  const handlePushVal = () => {
    const numericRes = parseFloat(result);
    if (!isNaN(numericRes)) {
      onSendToConverter(numericRes);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-5 shadow-lg flex flex-col gap-4 relative overflow-hidden" id="pocket_calculator">
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

      <div className="flex justify-between items-center z-10">
        <h3 className="font-display font-semibold text-sm flex items-center gap-2 text-emerald-400">
          <Calculator className="w-4 h-4" />
          Kalkulator Saku Sampingan
        </h3>
        <span className="text-[10px] bg-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
          Desk Tradisi
        </span>
      </div>

      {/* LCD Display */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 font-mono text-right z-10 shadow-inner relative flex flex-col justify-between min-h-[90px]">
        {/* Tiny label representing the linked state */}
        <span className="absolute left-3 top-2.5 text-[9px] font-bold text-slate-500 tracking-wider">
          Bilik Kira & Paut Emas/Zakat
        </span>
        <div className="text-slate-400 text-xs min-h-[20px] pt-4 break-all overflow-hidden" id="calc_expression">
          {expression || ' '}
        </div>
        <div className="text-emerald-400 text-2xl font-bold font-mono tracking-tight break-all overflow-hidden" id="calc_result">
          {result}
        </div>
      </div>

      {/* Grid Operators Binding */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          type="button"
          onClick={handlePullVal}
          className="bg-[#0f766e]/30 hover:bg-[#0f766e]/50 text-emerald-300 py-2.5 px-3 rounded-xl border border-[#0f766e]/40 flex items-center justify-center gap-1.5 font-semibold transition-all active:scale-95"
          title={`Salin nilai dari unit ${currentConverterUnitName} penukar`}
        >
          <ArrowDown className="w-3.5 h-3.5" />
          Tarik drp Penukar ({currentConverterUnitName})
        </button>

        <button
          type="button"
          onClick={handlePushVal}
          className="bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 py-2.5 px-3 rounded-xl border border-amber-500/30 flex items-center justify-center gap-1.5 font-semibold transition-all active:scale-95"
          title={`Hantar hasil ke unit ${currentConverterUnitName} penukar`}
        >
          <ArrowUp className="w-3.5 h-3.5" />
          Hantar ke Penukar
        </button>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 z-10" id="calc_keypad">
        {/* Row 1 */}
        <button
          type="button"
          onClick={handleClear}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          C
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('(')}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          (
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress(')')}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          )
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('/')}
          className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          type="button"
          onClick={() => handleKeyPress('7')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          7
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('8')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          8
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('9')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          9
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('*')}
          className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          type="button"
          onClick={() => handleKeyPress('4')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          4
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('5')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          5
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('6')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          6
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('-')}
          className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          -
        </button>

        {/* Row 4 */}
        <button
          type="button"
          onClick={() => handleKeyPress('1')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          1
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('2')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          2
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('3')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          3
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('+')}
          className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          type="button"
          onClick={() => handleKeyPress('0')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          0
        </button>
        <button
          type="button"
          onClick={() => handleKeyPress('.')}
          className="bg-slate-800/50 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
        >
          .
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center text-sm"
          title="Backspace"
        >
          <Delete className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all active:scale-95 text-sm shadow-sm"
        >
          =
        </button>
      </div>

      <div className="text-[10px] text-slate-500 text-center font-medium font-sans leading-normal">
        Sokongan Operasi: Campuran matematik lazim (+, -, *, /). Mudahkan penyingkiran pautan menggunakan butang C.
      </div>
    </div>
  );
}
