"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  bgColor: string;
  textColor: string;
}

export default function StatCard({ title, value, unit, bgColor, textColor }: StatCardProps) {
  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <h3 className={`font-medium ${textColor} mb-2`}>{title}</h3>
      <p className={`text-2xl font-bold ${textColor.replace('text-', 'text-').replace('-800', '-600')}`}>
        {value}
      </p>
      <p className={`text-sm ${textColor.replace('text-', 'text-').replace('-800', '-600')}`}>
        {unit}
      </p>
    </div>
  );
}
