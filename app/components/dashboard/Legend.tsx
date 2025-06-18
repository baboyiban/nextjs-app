"use client";

import React from "react";

export default function Legend() {
  return (
    <div className="mt-4 flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-50 border border-gray-300"></div>
        <span>지역</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-white border border-gray-300"></div>
        <span>빈 공간</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-800 border border-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-xs">✕</span>
        </div>
        <span>진입 불가</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
          N
        </div>
        <span>패키지 수</span>
      </div>
    </div>
  );
}
