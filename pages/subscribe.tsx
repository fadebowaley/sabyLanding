import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Check,
  Shield,
  ArrowRight,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";
import { useTheme } from "../src/contexts/ThemeContext";
import { plans, Plan } from "../src/data/plans";

type Step = 0 | 1 | 2 | 3;
type BillingCycle = "monthly" | "annual";

interface WorkspaceDetails {
  workspaceName: string;
  seatCount: number;
  billingEmail: string;
  reminder: boolean;
}

interface BillingDetails {
  cardNumber: string;
  expiry: string;
  cvc: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  saveCard: boolean;
}

const initialWorkspace: WorkspaceDetails = {
  workspaceName: "",
  seatCount: 5,
  billingEmail: "",
  reminder: true,
};

const initialBilling: BillingDetails = {
  cardNumber: "",
  expiry: "",
  cvc: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  saveCard: true,
};

const progressSteps = [
  { label: "Choose plan" },
  { label: "Workspace details" },
  { label: "Payment" },
  { label: "Review" },
];

const SubscribePage = () => {
  const router = useRouter();
  const { plan: planQuery, cycle: cycleQuery } = router.query;
  const { isDark, toggleTheme } = useTheme();
  const [step, setStep] = useState<Step>(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    typeof planQuery === "string" ? planQuery : "pro"
  );
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [billing, setBilling] = useState(initialBilling);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPlan: Plan = useMemo(() => {
    return plans.find((plan) => plan.id === selectedPlanId) || plans[1];
  }, [selectedPlanId]);

  const selectedPrice = selectedPlan.billing.find((b) => b.id === billingCycle);

  const trialEnd = useMemo(() => {
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    return now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }, []);

  useEffect(() => {
    if (typeof planQuery === "string") {
      const normalizedPlan = planQuery.toLowerCase();
      if (plans.some((plan) => plan.id === normalizedPlan)) {
        setSelectedPlanId(normalizedPlan);
      }
    }
    if (typeof cycleQuery === "string") {
      const normalizedCycle = cycleQuery.toLowerCase();
      if (normalizedCycle === "monthly" || normalizedCycle === "annual") {
        setBillingCycle(normalizedCycle);
      }
    }
  }, [planQuery, cycleQuery]);

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/subscribe/success");
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Checkout – Saby</title>
      </Head>
      <div
        className={`min-h-screen relative overflow-hidden transition-colors ${
          isDark ? "bg-gray-950" : "bg-white"
        }`}>
        {/* Background grid - behind everything */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.85,
            backgroundImage: `linear-gradient(90deg, ${
              isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            } 1px, transparent 1px), linear-gradient(180deg, ${
              isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
            } 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            backgroundPosition: "center",
          }}
        />
        {/* Navigation - z-50 */}
        <Navigation
          isDark={isDark}
          toggleTheme={toggleTheme}
          currentPage="/subscribe"
        />
        {/* Main content - z-10 above background */}
        <main className="relative z-10 pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <header className="mb-12 space-y-4 text-center relative">
              <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                <Shield className="w-4 h-4" />
                30-day free trial • no charge today
              </p>
              <h1
                className={`text-4xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                Let’s get your workspace live
              </h1>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Pick a plan, enter workspace details, add a payment method, and
                start shipping in minutes.
              </p>
            </header>

            <ol className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10">
              {progressSteps.map((item, index) => {
                const active = index === step;
                const complete = index < step;
                return (
                  <li
                    key={item.label}
                    className="flex-1 flex items-center gap-3 text-sm">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        complete
                          ? "bg-blue-600 border-blue-600 text-white"
                          : active
                          ? "border-blue-600 text-blue-600"
                          : "border-gray-300 text-gray-400"
                      }`}>
                      {complete ? <Check className="w-4 h-4" /> : index + 1}
                    </span>
                    <span
                      className={`font-medium ${
                        active
                          ? "text-blue-600"
                          : isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}>
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
              <section
                className={`relative z-20 rounded-3xl border p-6 ${
                  isDark
                    ? "border-gray-800 bg-gray-900/60"
                    : "border-white bg-white shadow-lg"
                }`}>
                {step === 0 && (
                  <div className="space-y-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide ${
                          isDark
                            ? "bg-blue-500/10 text-blue-300"
                            : "bg-blue-50 text-blue-700"
                        }`}>
                        Step 1
                      </span>
                      <h2
                        className={`text-2xl font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                        Choose the plan that fits your team
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedPlanId(plan.id);
                          }}
                          className={`text-left rounded-2xl border p-4 space-y-2 transition-all cursor-pointer ${
                            selectedPlanId === plan.id
                              ? "border-blue-600 bg-blue-600/10 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/20"
                              : isDark
                              ? "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                          }`}>
                          <div className="flex items-center justify-between">
                            <h3
                              className={`text-lg font-semibold ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}>
                              {plan.name}
                            </h3>
                            {plan.badge && (
                              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600">
                                {plan.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {plan.description}
                          </p>
                          <p className="text-2xl font-semibold">
                            $
                            {
                              plan.billing.find(
                                (billing) => billing.id === billingCycle
                              )?.price
                            }
                            <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                              /seat
                            </span>
                          </p>
                          {/* Feature Summary List - matching pricing page */}
                          <div className="space-y-2 mt-4">
                            {plan.name === "Starter" && (
                              <>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    5 workspaces
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    25,000 submissions/month
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Email, Webhooks
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Community support
                                  </span>
                                </div>
                              </>
                            )}
                            {plan.name === "Pro" && (
                              <>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Unlimited workspaces
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    250,000 submissions/month
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    All integrations (Telegram, WhatsApp, Google
                                    Sheets)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    AI Form Generator
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Advanced analytics
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Custom branding
                                  </span>
                                </div>
                              </>
                            )}
                            {plan.name === "Enterprise" && (
                              <>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Unlimited everything
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    SSO/SAML
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Private data regions
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    24/7 Enterprise support
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    Custom SLA & onboarding
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                      {selectedPlan.billing.map((cycle) => (
                        <button
                          key={cycle.id}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setBillingCycle(cycle.id);
                          }}
                          className={`px-4 py-2 rounded-full border text-sm cursor-pointer transition-all ${
                            billingCycle === cycle.id
                              ? "border-blue-600 bg-blue-600/10 text-blue-600 font-medium"
                              : isDark
                              ? "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                              : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                          }`}>
                          {cycle.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-6">
                    <div>
                      <label
                        htmlFor="workspace-name"
                        className={`block text-sm font-medium ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                        Workspace name
                      </label>
                      <input
                        id="workspace-name"
                        type="text"
                        value={workspace.workspaceName}
                        onChange={(e) =>
                          setWorkspace((prev) => ({
                            ...prev,
                            workspaceName: e.target.value,
                          }))
                        }
                        className={`mt-2 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                          isDark
                            ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                            : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                        }`}
                        placeholder="acme-systems"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="seat-count"
                          className={`block text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}>
                          Seat count
                        </label>
                        <input
                          id="seat-count"
                          type="number"
                          min={1}
                          max={5000}
                          value={workspace.seatCount}
                          onChange={(e) =>
                            setWorkspace((prev) => ({
                              ...prev,
                              seatCount: Number(e.target.value),
                            }))
                          }
                          className={`mt-2 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                              : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="billing-email"
                          className={`block text-sm font-medium ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}>
                          Billing email
                        </label>
                        <input
                          id="billing-email"
                          type="email"
                          value={workspace.billingEmail}
                          onChange={(e) =>
                            setWorkspace((prev) => ({
                              ...prev,
                              billingEmail: e.target.value,
                            }))
                          }
                          className={`mt-2 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                              : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                          }`}
                          placeholder="finance@acme.com"
                        />
                      </div>
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={workspace.reminder}
                        onChange={(e) =>
                          setWorkspace((prev) => ({
                            ...prev,
                            reminder: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      Email me 7 days before trial ends
                    </label>
                  </form>
                )}

                {step === 2 && (
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-6">
                    {/* Card Number Section - Professional Design */}
                    <div>
                      <label
                        htmlFor="card-number"
                        className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                        Card number
                      </label>
                      <div
                        className={`relative rounded-xl border-2 transition-all ${
                          isDark
                            ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
                            : "bg-gradient-to-br from-gray-50 to-white border-gray-300"
                        } ${
                          billing.cardNumber
                            ? "border-blue-500 shadow-lg shadow-blue-500/20"
                            : ""
                        }`}
                        style={{
                          padding: "16px",
                          minHeight: "120px",
                        }}>
                        {/* Card Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <CreditCard className="w-8 h-8 text-gray-400" />
                          <div className="flex gap-2">
                            <div className="w-10 h-6 rounded bg-gradient-to-r from-blue-600 to-purple-600 opacity-60"></div>
                            <div className="w-10 h-6 rounded bg-gradient-to-r from-yellow-400 to-orange-500 opacity-60"></div>
                          </div>
                        </div>
                        {/* Card Number Input */}
                        <input
                          id="card-number"
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={billing.cardNumber}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\s/g, "");
                            value = value.replace(/\D/g, "");
                            if (value.length > 16) value = value.slice(0, 16);
                            const formatted =
                              value.match(/.{1,4}/g)?.join(" ") || value;
                            setBilling((prev) => ({
                              ...prev,
                              cardNumber: formatted,
                            }));
                          }}
                          className={`w-full bg-transparent text-xl font-semibold tracking-wider focus:outline-none placeholder:text-gray-400 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                          style={{ letterSpacing: "2px" }}
                        />
                        {/* Card Details Row */}
                        <div className="flex items-center justify-between mt-4 text-sm">
                          <div className="text-gray-400">
                            {billing.expiry || "MM/YY"}
                          </div>
                          <div className="text-gray-400">
                            {billing.cvc || "CVC"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Details Inputs */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}>
                          Expiry date
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={billing.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value =
                                value.slice(0, 2) + "/" + value.slice(2, 4);
                            }
                            setBilling((prev) => ({
                              ...prev,
                              expiry: value,
                            }));
                          }}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                              : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvc"
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}>
                          CVC
                        </label>
                        <input
                          id="cvc"
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          inputMode="numeric"
                          value={billing.cvc}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            setBilling((prev) => ({
                              ...prev,
                              cvc: value,
                            }));
                          }}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                              : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Billing Address Section */}
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                        Billing address
                      </h3>

                      <div>
                        <label
                          htmlFor="address"
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}>
                          Street address
                        </label>
                        <input
                          id="address"
                          type="text"
                          placeholder="123 Main Street"
                          value={billing.address}
                          onChange={(e) =>
                            setBilling((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                              : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                          }`}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="city"
                            className={`block text-sm font-medium mb-2 ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            }`}>
                            City
                          </label>
                          <input
                            id="city"
                            type="text"
                            placeholder="New York"
                            value={billing.city}
                            onChange={(e) =>
                              setBilling((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                              isDark
                                ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                                : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                            }`}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className={`block text-sm font-medium mb-2 ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            }`}>
                            State / Province
                          </label>
                          <input
                            id="state"
                            type="text"
                            placeholder="NY"
                            value={billing.state}
                            onChange={(e) =>
                              setBilling((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }))
                            }
                            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                              isDark
                                ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                                : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="postal-code"
                            className={`block text-sm font-medium mb-2 ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            }`}>
                            Postal / ZIP code
                          </label>
                          <input
                            id="postal-code"
                            type="text"
                            placeholder="10001"
                            value={billing.postalCode}
                            onChange={(e) =>
                              setBilling((prev) => ({
                                ...prev,
                                postalCode: e.target.value,
                              }))
                            }
                            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                              isDark
                                ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                                : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                            }`}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="country"
                            className={`block text-sm font-medium mb-2 ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            }`}>
                            Country
                          </label>
                          <div className="relative">
                            <select
                              id="country"
                              value={billing.country}
                              onChange={(e) =>
                                setBilling((prev) => ({
                                  ...prev,
                                  country: e.target.value,
                                }))
                              }
                              className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 transition appearance-none cursor-pointer ${
                                isDark
                                  ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500/40"
                                  : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/20"
                              }`}>
                              <option value="">Select country</option>
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="GB">United Kingdom</option>
                              <option value="AU">Australia</option>
                              <option value="DE">Germany</option>
                              <option value="FR">France</option>
                              <option value="IT">Italy</option>
                              <option value="ES">Spain</option>
                              <option value="NL">Netherlands</option>
                              <option value="BE">Belgium</option>
                              <option value="CH">Switzerland</option>
                              <option value="AT">Austria</option>
                              <option value="SE">Sweden</option>
                              <option value="NO">Norway</option>
                              <option value="DK">Denmark</option>
                              <option value="FI">Finland</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="IE">Ireland</option>
                              <option value="NZ">New Zealand</option>
                              <option value="SG">Singapore</option>
                              <option value="HK">Hong Kong</option>
                              <option value="JP">Japan</option>
                              <option value="KR">South Korea</option>
                              <option value="IN">India</option>
                              <option value="BR">Brazil</option>
                              <option value="MX">Mexico</option>
                              <option value="AR">Argentina</option>
                              <option value="ZA">South Africa</option>
                              <option value="NG">Nigeria</option>
                              <option value="KE">Kenya</option>
                              <option value="EG">Egypt</option>
                              <option value="GH">Ghana</option>
                              <option value="MA">Morocco</option>
                              <option value="TZ">Tanzania</option>
                              <option value="UG">Uganda</option>
                              <option value="ET">Ethiopia</option>
                              <option value="AO">Angola</option>
                              <option value="MZ">Mozambique</option>
                              <option value="ZM">Zambia</option>
                              <option value="ZW">Zimbabwe</option>
                              <option value="MW">Malawi</option>
                              <option value="RW">Rwanda</option>
                              <option value="SN">Senegal</option>
                              <option value="CI">Ivory Coast</option>
                              <option value="CM">Cameroon</option>
                              <option value="TN">Tunisia</option>
                              <option value="DZ">Algeria</option>
                              <option value="SD">Sudan</option>
                              <option value="OTHER">Other</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={billing.saveCard}
                        onChange={(e) =>
                          setBilling((prev) => ({
                            ...prev,
                            saveCard: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      Save card for future invoices
                    </label>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3
                        className={`text-xl font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                        Review & confirm
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                        Your trial is live until {trialEnd}. We’ll send a
                        reminder 7 days before billing starts.
                      </p>
                    </div>
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Plan
                        </dt>
                        <dd className="font-medium">
                          {selectedPlan.name} · {selectedPrice?.label}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Seats
                        </dt>
                        <dd className="font-medium">{workspace.seatCount}</dd>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Due today
                        </dt>
                        <dd className="font-medium text-emerald-500">Free</dd>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Renews on {trialEnd}
                        </dt>
                        <dd className="font-medium">
                          ${(selectedPrice?.price || 0) * workspace.seatCount}
                          /mo
                        </dd>
                      </div>
                    </dl>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-60">
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Start free trial
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-3 justify-between items-center">
                  <div>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleBack();
                        }}
                        className="text-sm cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                        ← Back
                      </button>
                    )}
                  </div>
                  <div>
                    {step < 3 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </section>

              <aside
                className={`relative z-20 rounded-3xl border p-6 space-y-6 ${
                  isDark
                    ? "border-gray-800 bg-gray-900/40"
                    : "border-white bg-white shadow-xl"
                }`}>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Make changes anytime before confirming.
                  </p>
                </div>
                <div className="border border-dashed rounded-2xl p-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Plan</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Billing</span>
                    <span className="font-medium capitalize">
                      {billingCycle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Seats</span>
                    <span className="font-medium">{workspace.seatCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next invoice</span>
                    <span className="font-semibold">
                      ${(selectedPrice?.price || 0) * workspace.seatCount}
                      /mo
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-emerald-700 dark:text-emerald-300">
                  ✅ $0 due today. Your trial ends {trialEnd}. Cancel anytime.
                </div>
                <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    PCI DSS Level 1 compliant billing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    SLA-backed uptime on paid plans
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </main>
        <div className="relative z-10">
          <Footer isDark={isDark} />
        </div>
      </div>
    </>
  );
};

export default SubscribePage;
