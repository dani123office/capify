"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  BILLING_CYCLES,
  PLANS,
  formatPrice,
  type BillingCycle,
} from "../../_lib/pricing";

const UNIT: Record<BillingCycle, string> = {
  weekly: "/week",
  monthly: "/month",
  yearly: "/year",
};

export function PricingTables() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <div>
      <div className="mx-auto flex w-fit items-center rounded-2xl border border-slate-200 bg-slate-100 p-1">
        {BILLING_CYCLES.map((c) => {
          const active = cycle === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCycle(c.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${
                active
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {c.label}
              {c.id === "yearly" && (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-black text-emerald-700">
                  -33%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const price = plan.prices[cycle] ?? 0;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border-2 bg-white p-7 shadow-sm ${
                plan.highlight ? "border-brand shadow-lg shadow-indigo-500/10" : "border-slate-200"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-sm">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-serif text-4xl text-slate-950">
                  {formatPrice(price)}
                </span>
                <span className="pb-1 text-xs font-medium text-slate-400">
                  {UNIT[cycle]}
                </span>
              </div>
              {cycle === "yearly" && price > 0 && (
                <p className="mt-1 text-xs text-slate-400">
                  ≈ ${(price / 12).toFixed(2)}/month, billed yearly
                </p>
              )}
              {plan.footnote && (
                <p className="mt-1 text-xs text-slate-400">{plan.footnote}</p>
              )}

              <Link
                href="/#editor"
                className={`mt-6 rounded-xl px-5 py-3 text-center text-sm font-bold transition ${
                  plan.highlight
                    ? "bg-brand text-white shadow-md shadow-indigo-500/25 hover:bg-brand-600"
                    : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-slate-400">
        Minutes are shared between export and transcription. Export minutes charged
        against a plan are returned automatically when a render fails.
      </p>
    </div>
  );
}
