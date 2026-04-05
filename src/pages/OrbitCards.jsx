// OrbitCards.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Calculator, TrendingUp, Box, CheckCircle2, Clock } from 'lucide-react';

export default function OrbitCards() {
  const [angle, setAngle] = useState(0);
  const isHovered = useRef(false);
  const requestRef = useRef();

  // Animatsiya sikli
  const animate = () => {
    if (!isHovered.current) {
      setAngle((prev) => (prev + 0.4) % 360); // 0.4 - aylanish tezligi
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Har bir karta uchun 3D pozitsiyani hisoblash
  const getCardStyle = (index) => {
    // 3 ta karta bo'lgani uchun ularni 120 darajaga bo'lib chiqamiz
    const cardAngle = (angle + index * 120) * (Math.PI / 180);
    
    // Orbita radiusi (Kompyuterda kengroq, telefonda qisqaroq)
    const radiusX = window.innerWidth >= 768 ? 320 : 160; // Yon tomonlarga qancha ochilishi
    const radiusZ = 120; // Oldinga va orqaga qancha uzoqlashishi

    const x = Math.sin(cardAngle) * radiusX;
    const z = Math.cos(cardAngle) * radiusZ;

    // Orqadagi karta kichrayadi (scale) va xiralashadi (opacity)
    const scale = 1 + (z / radiusZ) * 0.15; // 0.85 dan 1.15 gacha kattalashadi
    const opacity = 0.5 + ((z + radiusZ) / (2 * radiusZ)) * 0.5; // 0.5 dan 1 gacha tiniqlashadi
    const zIndex = Math.round(z + 100); // Oldindagi karta doim ustda turadi

    return {
      transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      transition: 'none', // JS o'zi silliq harakatlantiradi, CSS xalaqit bermasligi kerak
    };
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto h-[350px] sm:h-[450px] flex items-center justify-center perspective-[1200px]"
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      onTouchStart={() => (isHovered.current = true)}
      onTouchEnd={() => (isHovered.current = false)}
    >
      {/* Markaziy yorug'lik */}
      <div className="absolute w-[200px] h-[200px] bg-green-500/20 blur-[80px] rounded-full pointer-events-none -z-10"></div>

      {/* 1-Karta: Karzinkalar */}
      <div 
        className="absolute w-[260px] sm:w-[320px] bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl cursor-grab active:cursor-grabbing"
        style={getCardStyle(0)}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400">
            <Box size={24} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Karzinkalar</p>
            <p className="text-xl font-black text-white">4,250 <span className="text-xs font-medium text-blue-400">dona</span></p>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[70%] h-full bg-blue-500 rounded-full"></div>
          </div>
          <p className="text-[10px] font-medium text-gray-400 text-left">70% karzinkalar tarqatilgan</p>
        </div>
      </div>

      {/* 2-Karta: Tushum */}
      <div 
        className="absolute w-[260px] sm:w-[320px] bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl cursor-grab active:cursor-grabbing"
        style={getCardStyle(1)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30 text-green-400">
            <TrendingUp size={24} />
          </div>
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full border border-green-500/30">+12.5%</span>
        </div>
        <div className="text-left mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jami kunlik tushum</p>
          <h2 className="text-3xl font-black text-white drop-shadow-md">84.5 <span className="text-lg font-bold text-gray-400">tonna</span></h2>
        </div>
        <div className="flex items-end gap-1.5 h-12 w-full mt-2">
          {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-green-500/80 to-green-300/50 rounded-sm" style={{height: `${h}%`}}></div>
          ))}
        </div>
      </div>

      {/* 3-Karta: Hisob-kitob */}
      <div 
        className="absolute w-[260px] sm:w-[320px] bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl cursor-grab active:cursor-grabbing"
        style={getCardStyle(2)}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30 text-purple-400">
            <Calculator size={24} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hisob-kitob</p>
            <p className="text-xl font-black text-white">412M <span className="text-xs font-medium text-purple-400">so'm</span></p>
          </div>
        </div>
        <div className="space-y-3 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white/10"></div>
            <div className="flex-1 h-2 bg-white/10 rounded-full"></div>
            <CheckCircle2 size={14} className="text-green-400"/>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white/10"></div>
            <div className="flex-1 h-2 bg-white/10 rounded-full"></div>
            <Clock size={14} className="text-yellow-400"/>
          </div>
        </div>
      </div>
    </div>
  );
}