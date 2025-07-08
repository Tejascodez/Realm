'use client';
import React from 'react';

export default function PlanCard({
  title,
  price,
  billingCycle,
  features,
  buttonText,
  bgGradient = "bg-white",
  borderColor = "border-slate-200",
  textColor = "text-blue-600",
  buttonColor = "bg-blue-600 hover:bg-blue-700",
  badgeText,
  badgeColor,
  delay = "delay-100"
}) {
  return (
    <div className={`relative p-8 rounded-2xl border-2 ${borderColor} shadow-md hover:shadow-lg transition-all duration-500 opacity-0 translate-y-6 ${delay} opacity-100 translate-y-0 ${bgGradient}`}>
      {badgeText && (
        <div className={`absolute -top-4 ${badgeColor || 'bg-blue-600'} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
          {badgeText}
        </div>
      )}

      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-slate-800">{title}</h4>
        <div className={`text-4xl font-bold ${textColor} mt-2 mb-1`}>
          {price}<span className="text-lg text-slate-500 font-normal">/{billingCycle}</span>
        </div>
      </div>

      <ul className="space-y-3 text-slate-600 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full ${buttonColor} text-white py-3 rounded-lg transition-colors font-medium`}>
        {buttonText}
      </button>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
