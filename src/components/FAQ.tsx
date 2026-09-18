"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq-data";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-xl border border-stone-200 bg-white divide-y divide-stone-100 overflow-hidden">
      {FAQ_ITEMS.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full px-5 py-4 text-left flex items-center gap-3 hover:bg-stone-50 transition-colors"
              aria-expanded={open}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-md shrink-0 text-sm font-extrabold transition-colors ${
                  open ? "bg-teal-600 text-white" : "bg-stone-100 text-stone-400"
                }`}
              >
                {open ? "−" : "+"}
              </span>
              <h3 className="text-sm font-bold text-stone-900">{item.question}</h3>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-200 ${
                open ? "max-h-[40rem]" : "max-h-0"
              }`}
            >
              <p className="px-5 pb-5 pl-14 text-sm text-stone-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
