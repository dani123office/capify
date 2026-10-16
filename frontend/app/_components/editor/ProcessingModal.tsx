"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronDown, ChevronUp, Redo, Sparkles, Undo } from "lucide-react";
import { engine, sleep, type TranscriptResponse } from "../../_lib/api";

type StepKey = "upload" | "transcribe" | "segment" | "finalize";

interface ProcessingModalProps {
  videoId: string;
  templateId: string;
  fileName: string;
  file?: File | null;
  onClose: () => void;
  onComplete?: (videoId: string, transcript: TranscriptResponse) => void;
}

export function ProcessingModal({
  videoId,
  templateId,
  fileName,
  onClose,
  onComplete,
}: ProcessingModalProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepKey>("upload");
  const [stepIndex, setStepIndex] = useState(1);
  const [showProgressList, setShowProgressList] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps: { key: StepKey; title: string; num: number }[] = [
    { key: "upload", title: "Upload clip", num: 1 },
    { key: "transcribe", title: "Speech to text transcript", num: 2 },
    { key: "segment", title: "Depth segmentation & cutout", num: 3 },
    { key: "finalize", title: "Behind-subject composition", num: 4 },
  ];

  useEffect(() => {
    let isCancelled = false;

    async function runPipeline() {
      try {
        // Step 1: Upload Complete & Getting edit ready
        setCurrentStep("upload");
        setStepIndex(1);
        await sleep(1400);
        if (isCancelled) return;

        // Step 2: Speech transcription
        setCurrentStep("transcribe");
        setStepIndex(2);
        const transcript = await engine.transcribe(videoId);
        if (isCancelled) return;

        // Step 3: Depth segmentation
        setCurrentStep("segment");
        setStepIndex(3);
        await engine.render({
          videoId,
          templateId,
          srt: transcript.srt,
        });
        if (isCancelled) return;

        // Step 4: Finalize & Wait for render
        setCurrentStep("finalize");
        setStepIndex(4);
        let status = await engine.status(videoId);
        let retries = 0;
        while (status.status !== "completed" && status.status !== "failed" && retries < 40) {
          await sleep(1200);
          if (isCancelled) return;
          status = await engine.status(videoId);
          retries++;
        }

        if (status.status === "failed") {
          throw new Error(status.error || "Rendering pipeline failed");
        }

        // Complete! Call callback and redirect to studio
        if (onComplete) {
          onComplete(videoId, transcript);
        }

        // Navigate to the full Studio Editor page
        router.push(`/studio/${videoId}?template=${encodeURIComponent(templateId)}`);
      } catch (err: unknown) {
        if (isCancelled) return;
        const msg = err instanceof Error ? err.message : "Pipeline error";
        setError(msg);
      }
    }

    void runPipeline();

    return () => {
      isCancelled = true;
    };
  }, [videoId, templateId, router, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0c0c0e] text-white select-none">
      {/* ------------------------------------------------------------------- */}
      {/* Top Header Bar */}
      {/* ------------------------------------------------------------------- */}
      <header className="flex h-14 sm:h-16 items-center justify-between border-b border-white/10 px-4 sm:px-6">
        {/* Left: Low-res preview pill */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Low-res preview
          </span>
        </div>

        {/* Right: Controls + Home + Export */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            disabled
            className="grid size-8 place-items-center rounded-lg text-neutral-500 opacity-50"
            title="Undo"
          >
            <Undo className="size-4" />
          </button>
          <button
            type="button"
            disabled
            className="grid size-8 place-items-center rounded-lg text-neutral-500 opacity-50"
            title="Redo"
          >
            <Redo className="size-4" />
          </button>

          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#19191e] px-3.5 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10"
          >
            Upgrade
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-300 transition hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Home
          </button>

          <button
            type="button"
            disabled
            className="rounded-full bg-[#d4b15c]/60 px-4 py-1.5 text-xs font-bold text-black opacity-75 cursor-not-allowed"
          >
            Export
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* Center Body Canvas */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-6 text-center">
        {/* Ambient violet / nebula radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(124, 58, 237, 0.28) 0%, rgba(59, 18, 97, 0.1) 40%, transparent 75%)",
          }}
        />

        {error ? (
          <div className="relative z-10 max-w-md rounded-2xl border border-rose-500/40 bg-rose-950/40 p-6 text-rose-200 backdrop-blur-md">
            <h3 className="text-base font-bold text-rose-100">Processing Interrupted</h3>
            <p className="mt-2 text-xs text-rose-300">{error}</p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
              >
                Back to Home
              </button>
              <button
                type="button"
                onClick={() => router.push(`/studio/${videoId}?template=${encodeURIComponent(templateId)}`)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Open Studio Anyway
              </button>
            </div>
          </div>
        ) : currentStep === "upload" ? (
          /* =============================================================== */
          /* Step 1: Getting your edit ready (Orbital Moon Loader)            */
          /* =============================================================== */
          <div className="relative z-10 flex flex-col items-center">
            {/* Moon & Orbit Container */}
            <div className="relative flex size-44 items-center justify-center">
              {/* Outer Orbit Ring 1 */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20" />

              {/* Middle Orbit Ring 2 with Rotating Satellite */}
              <div className="absolute size-36 animate-spin rounded-full border border-indigo-500/30 [animation-duration:8s]">
                <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]" />
              </div>

              {/* Inner Orbit Ring 3 */}
              <div className="absolute size-28 rounded-full border border-violet-400/20" />

              {/* Deep Violet Glowing Moon Center */}
              <div className="relative size-20 rounded-full bg-gradient-to-tr from-[#1b0a2a] via-[#3b1261] to-[#7c3aed] shadow-[0_0_50px_rgba(147,51,234,0.65)] ring-1 ring-violet-300/30">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-violet-400/20 via-transparent to-black/60" />
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Getting your edit ready
            </h2>

            {/* Upload Complete Pill */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-300">
              <span className="grid size-3.5 place-items-center rounded-full bg-emerald-500 text-black">
                <Check className="size-2.5 stroke-[3]" />
              </span>
              Upload complete
            </div>

            <p className="mt-2 text-xs text-neutral-500 font-mono">{fileName}</p>
          </div>
        ) : (
          /* =============================================================== */
          /* Step 2-4: Turning speech into a transcript & 3D Isometric View */
          /* =============================================================== */
          <div className="relative z-10 flex max-w-lg flex-col items-center">
            {/* Kicker */}
            <span className="text-[11px] font-bold tracking-[0.22em] text-neutral-400 uppercase">
              CAPIFY IS MAKING YOUR VIDEO
            </span>

            {/* Headline */}
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {currentStep === "transcribe" && "Turning speech into a transcript"}
              {currentStep === "segment" && "Separating subject & calculating depth"}
              {currentStep === "finalize" && "Compositing captions behind subject"}
            </h2>

            {/* 3D Isometric Dual Layer Illustration */}
            <div className="my-8 flex h-48 w-72 items-center justify-center [perspective:1000px]">
              <div
                className="relative size-44 transition-transform duration-700"
                style={{
                  transform: "rotateX(42deg) rotateZ(-24deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Bottom Layer: "Your video" */}
                <div
                  className="absolute inset-0 rounded-2xl border border-white/15 bg-[#16161b] p-3 shadow-2xl transition-all"
                  style={{ transform: "translateZ(0px)" }}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[9px] font-medium text-neutral-400">
                    <span>🎞 Your video</span>
                    <span className="size-1.5 rounded-full bg-neutral-600" />
                  </div>
                  <div className="mt-2 flex h-24 items-center justify-center rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-neutral-500 font-mono">1080 × 1920</span>
                  </div>
                </div>

                {/* Top Floating Layer: "Transcript" */}
                <div
                  className="absolute inset-0 rounded-2xl border border-sky-400/50 bg-[#121829]/90 p-3 shadow-[0_20px_40px_rgba(14,165,233,0.25)] backdrop-blur-md transition-all duration-500 animate-pulse"
                  style={{ transform: "translateZ(55px)" }}
                >
                  <div className="flex items-center justify-between border-b border-sky-400/20 pb-1.5 text-[9px] font-semibold text-sky-300">
                    <span className="flex items-center gap-1">
                      <Sparkles className="size-2.5 text-amber-300" />
                      Transcript
                    </span>
                    <span className="size-1.5 rounded-full bg-sky-400 animate-ping" />
                  </div>
                  {/* Simulated caption chips */}
                  <div className="mt-2.5 space-y-2">
                    <div className="flex gap-1">
                      <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[9px] font-bold text-sky-200">
                        Jo
                      </span>
                      <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[9px] font-bold text-sky-200">
                        bhi
                      </span>
                      <span className="rounded bg-amber-400/30 px-1.5 py-0.5 text-[9px] font-bold text-amber-200">
                        tumne
                      </span>
                    </div>
                    <div className="h-1.5 w-3/4 rounded-full bg-sky-400/20" />
                    <div className="h-1.5 w-1/2 rounded-full bg-sky-400/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Segmented Progress Track */}
            <div className="w-full max-w-xs">
              <div className="grid grid-cols-4 gap-1.5">
                {steps.map((st) => (
                  <div
                    key={st.key}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      st.num < stepIndex
                        ? "bg-indigo-500"
                        : st.num === stepIndex
                        ? "bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse"
                        : "bg-neutral-800"
                    }`}
                  />
                ))}
              </div>

              {/* Collapsible "View progress X of 4" */}
              <div className="mt-3 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setShowProgressList((v) => !v)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 transition hover:text-white"
                >
                  View progress {stepIndex} of 4
                  {showProgressList ? (
                    <ChevronUp className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5" />
                  )}
                </button>

                {showProgressList && (
                  <div className="mt-3 w-full rounded-xl border border-white/10 bg-[#16161b] p-3 text-left">
                    {steps.map((st) => (
                      <div
                        key={st.key}
                        className="flex items-center justify-between py-1 text-xs"
                      >
                        <span
                          className={
                            st.num === stepIndex
                              ? "font-bold text-sky-300"
                              : st.num < stepIndex
                              ? "text-neutral-400"
                              : "text-neutral-600"
                          }
                        >
                          {st.num}. {st.title}
                        </span>
                        <span>
                          {st.num < stepIndex && (
                            <Check className="size-3.5 text-emerald-400" />
                          )}
                          {st.num === stepIndex && (
                            <span className="size-2 rounded-full bg-sky-400 animate-ping inline-block" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
