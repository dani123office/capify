"use client";

import { useState } from "react";
import { X, Mail, Lock, Sparkles, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { name: string; email: string }) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = {
        name: email.split("@")[0] || "Creator",
        email: email || "creator@example.com",
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("capify_user", JSON.stringify(user));
      }
      setLoading(false);
      setSuccessMsg(isSignUp ? "Account created successfully!" : "Signed in successfully!");
      setTimeout(() => {
        if (onSuccess) onSuccess(user);
        onClose();
        setSuccessMsg("");
      }, 700);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const user = {
        name: "Google Creator",
        email: "google.user@capify.ai",
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("capify_user", JSON.stringify(user));
      }
      setLoading(false);
      setSuccessMsg("Connected with Google!");
      setTimeout(() => {
        if (onSuccess) onSuccess(user);
        onClose();
        setSuccessMsg("");
      }, 700);
    }, 600);
  };

  const handleDemoLogin = () => {
    const user = {
      name: "Demo Creator",
      email: "demo@capify.ai",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("capify_user", JSON.stringify(user));
    }
    setSuccessMsg("Welcome to Capify Demo!");
    setTimeout(() => {
      if (onSuccess) onSuccess(user);
      onClose();
      setSuccessMsg("");
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isSignUp ? "Create your Capify account" : "Sign in to Capify"}
          </h2>
          <p className="mt-1.5 text-xs text-slate-500">
            {isSignUp
              ? "Start editing viral videos with 3D behind-subject captions"
              : "Welcome back! Enter your details to continue"}
          </p>
        </div>

        {successMsg ? (
          <div className="mt-6 flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
            <p className="mt-3 font-bold text-slate-800">{successMsg}</p>
          </div>
        ) : (
          <>
            {/* Google OAuth Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                or with email
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Email</label>
                <div className="relative mt-1">
                  <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <div className="relative mt-1">
                  <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-brand py-3 text-sm font-bold text-white shadow-md shadow-brand/25 transition hover:bg-brand-600 active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Instant Demo Option */}
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs font-semibold text-slate-500 hover:text-brand"
              >
                Instant Access: Continue as Demo Guest &rarr;
              </button>
            </div>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-5 border-t border-slate-100 pt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                {isSignUp ? (
                  <>Already have an account? <span className="font-bold text-brand">Sign in</span></>
                ) : (
                  <>Don&apos;t have an account? <span className="font-bold text-brand">Sign up free</span></>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
