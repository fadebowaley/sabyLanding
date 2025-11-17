import React, { useState } from "react";
import { Check, X, Info } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "../src/contexts/ThemeContext";
import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";

export default function PricingPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  // Submission tiers: 1000, 2500, 5000, 7500, 10k, 25k, 50k, 75k, 100k
  const submissionTiers = [
    1000, 2500, 5000, 7500, 10000, 25000, 50000, 75000, 100000,
  ];
  const [memberCount, setMemberCount] = useState(1000);
  const [billingType, setBillingType] = useState<"monthly" | "yearly">(
    "yearly"
  );

  // Get current tier index
  const getCurrentTierIndex = () => {
    const index = submissionTiers.findIndex((tier) => tier >= memberCount);
    return index >= 0 ? index : submissionTiers.length - 1;
  };

  // Format submission count
  const formatSubmissionCount = (count: number) => {
    if (count >= 100000) return "100k+";
    if (count >= 10000) return `${count / 1000}k`;
    return count.toLocaleString();
  };

  const plans = [
    {
      name: "STARTER",
      description: "Perfect for small teams getting started",
      price: {
        monthly: 29,
        yearly: 24,
      },
      originalPrice: 29,
      launchPrice: null,
      features: {
        workspaces: 5,
        submissionsPerMonth: "25,000",
        fileUploadSize: "5MB",
        integrations: ["Email", "Webhooks"],
        apiRateLimit: "1,000 requests/day",
        support: "Community",
        analytics: "Basic",
        customBranding: false,
        aiFormGenerator: false,
        telegramIntegration: false,
        whatsappIntegration: false,
        googleSheets: false,
        apiAccess: true,
        exportFormats: ["CSV", "JSON"],
        storageQuota: "1GB",
      },
    },
    {
      name: "PRO",
      description: "For growing teams with advanced needs",
      price: {
        monthly: 79,
        yearly: 64,
      },
      originalPrice: 79,
      launchPrice: null,
      badge: "Most Popular",
      features: {
        workspaces: "Unlimited",
        submissionsPerMonth: "250,000",
        fileUploadSize: "100MB",
        integrations: ["All"],
        apiRateLimit: "10,000 requests/day",
        support: "Priority",
        analytics: "Advanced",
        customBranding: true,
        aiFormGenerator: true,
        telegramIntegration: true,
        whatsappIntegration: true,
        googleSheets: true,
        apiAccess: true,
        exportFormats: ["CSV", "Excel", "JSON"],
        storageQuota: "50GB",
      },
    },
    {
      name: "BUSINESS",
      description: "For teams scaling operations",
      price: {
        monthly: 189,
        yearly: 169,
      },
      originalPrice: 189,
      launchPrice: null,
      features: {
        workspaces: "Unlimited",
        submissionsPerMonth: "1,000,000",
        fileUploadSize: "250MB",
        integrations: ["All"],
        apiRateLimit: "50,000 requests/day",
        support: "Priority + Dedicated",
        analytics: "Advanced + Custom",
        customBranding: true,
        aiFormGenerator: true,
        telegramIntegration: true,
        whatsappIntegration: true,
        googleSheets: true,
        apiAccess: true,
        exportFormats: ["CSV", "Excel", "JSON", "Custom"],
        storageQuota: "200GB",
      },
    },
    {
      name: "ENTERPRISE",
      description: "Mission-critical deployments at scale",
      price: "Custom" as any,
      originalPrice: "Custom",
      launchPrice: null,
      isCustom: true,
      features: {
        workspaces: "Unlimited",
        submissionsPerMonth: "Unlimited",
        fileUploadSize: "1GB",
        integrations: ["All + Custom"],
        apiRateLimit: "Unlimited",
        support: "24/7 Enterprise",
        analytics: "Advanced + Custom + AI",
        customBranding: true,
        aiFormGenerator: true,
        telegramIntegration: true,
        whatsappIntegration: true,
        googleSheets: true,
        apiAccess: true,
        exportFormats: ["All + Custom"],
        storageQuota: "Unlimited",
        ssoSaml: true,
        privateDataRegions: true,
        customSla: true,
        onboardingAssistance: true,
      },
    },
  ];

  const featureRows = [
    { key: "workspaces", label: "Workspaces", category: "Platform" },
    {
      key: "submissionsPerMonth",
      label: "Submissions/month",
      category: "Platform",
    },
    { key: "fileUploadSize", label: "File upload size", category: "Platform" },
    { key: "storageQuota", label: "Storage quota", category: "Platform" },
    { key: "integrations", label: "Integrations", category: "Integrations" },
    {
      key: "telegramIntegration",
      label: "Telegram bot",
      category: "Integrations",
    },
    {
      key: "whatsappIntegration",
      label: "WhatsApp Business API",
      category: "Integrations",
    },
    {
      key: "googleSheets",
      label: "Google Sheets sync",
      category: "Integrations",
    },
    { key: "apiAccess", label: "API access", category: "Developers" },
    { key: "apiRateLimit", label: "API rate limit", category: "Developers" },
    { key: "exportFormats", label: "Export formats", category: "Data" },
    { key: "analytics", label: "Analytics & Reports", category: "Features" },
    {
      key: "aiFormGenerator",
      label: "AI Form Generator",
      category: "Features",
    },
    { key: "customBranding", label: "Custom branding", category: "Features" },
    { key: "support", label: "Support", category: "Support" },
    { key: "ssoSaml", label: "SSO/SAML", category: "Enterprise" },
    {
      key: "privateDataRegions",
      label: "Private data regions",
      category: "Enterprise",
    },
    { key: "customSla", label: "Custom SLA", category: "Enterprise" },
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return (
        <div className="flex justify-center items-center">
          {value ? (
            <Check className="w-5 h-5 text-blue-600" />
          ) : (
            <X className="w-5 h-5 text-gray-400" />
          )}
        </div>
      );
    }
    if (Array.isArray(value)) {
      return (
        <div className="flex justify-center items-center">
          <span
            className={`${
              isDark ? "text-gray-300" : "text-gray-900"
            } text-sm text-center`}>
            {value.join(", ")}
          </span>
        </div>
      );
    }
    if (value === "Unlimited" || value === "All" || value === "All + Custom") {
      return (
        <div className="flex justify-center items-center">
          <span className="text-blue-600 font-medium text-center">{value}</span>
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center">
        <span
          className={`${
            isDark ? "text-gray-300" : "text-gray-900"
          } text-sm text-center`}>
          {value}
        </span>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Pricing - Saby Analytics Platform</title>
        <meta
          name="description"
          content="Flexible pricing plans for every team size. Start free, scale as you grow."
        />
        <meta property="og:title" content="Saby Pricing - Choose Your Plan" />
      </Head>

      <div
        className={`min-h-screen ${
          isDark ? "bg-gray-900" : "bg-white"
        } transition-colors duration-300 relative overflow-hidden`}>
        {/* Patterned Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2L78 40h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <Navigation
          isDark={isDark}
          toggleTheme={toggleTheme}
          currentPage="/pricing"
        />

        {/* Main Content */}
        <div className="pt-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="text-center mb-16">
              <div
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } mb-6`}>
                Saby plans & pricing
              </div>

              <h1
                className={`text-5xl md:text-6xl font-bold leading-tight mb-6 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                Get started for free, then enjoy
                <br />
                50% off for 3 months
              </h1>

              <p
                className={`text-lg ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } mb-12`}>
                No lock-in — upgrade, downgrade, or cancel anytime.
              </p>

              {/* Submissions & Billing Row */}
              <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                  {/* Left: Label */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      } leading-tight`}>
                      <div>Based on submissions up to</div>
                      <div className="font-semibold text-blue-600">
                        {formatSubmissionCount(memberCount)} submissions/month
                      </div>
                    </div>
                  </div>

                  {/* Center: Slider with Bubble Chat - Full Width */}
                  <div className="flex-1 relative w-full">
                    <div className="relative pt-8 pb-6">
                      {/* Slider Container - positioned to align everything on the line */}
                      <div className="relative h-4">
                        {/* Background track - centered vertically */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-lg transform -translate-y-1/2"></div>
                        {/* Blue progress fill - centered vertically */}
                        <div
                          className="absolute top-1/2 left-0 h-1 bg-blue-600 rounded-lg transition-all duration-200 transform -translate-y-1/2"
                          style={{
                            width: `${
                              (getCurrentTierIndex() /
                                (submissionTiers.length - 1)) *
                              100
                            }%`,
                          }}></div>

                        {/* Slider Input */}
                        <input
                          type="range"
                          min="0"
                          max={submissionTiers.length - 1}
                          step="1"
                          value={getCurrentTierIndex()}
                          onChange={(e) => {
                            const index = parseInt(e.target.value);
                            setMemberCount(submissionTiers[index]);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          className="slider w-full h-4 rounded-lg appearance-none cursor-grab active:cursor-grabbing relative z-10 pointer-events-auto"
                        />

                        {/* Bubble Chat Indicator - positioned so arrow touches top of thumb */}
                        <div
                          className="absolute left-0 transform transition-all duration-200 ease-out pointer-events-none"
                          style={{
                            left: `${
                              (getCurrentTierIndex() /
                                (submissionTiers.length - 1)) *
                              100
                            }%`,
                            transform: `translateX(-50%)`,
                            top: "-4px",
                            zIndex: 5,
                          }}>
                          {/* Bubble */}
                          <div className="relative -translate-y-full">
                            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                              {formatSubmissionCount(memberCount)}
                            </div>
                            {/* Arrow pointing down to top edge of slider thumb */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="w-2.5 h-2.5 bg-blue-600 transform rotate-45"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>1k</span>
                        <span>25k</span>
                        <span>50k</span>
                        <span>75k</span>
                        <span>100k+</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Billing Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBillingType("monthly")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        billingType === "monthly"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent"
                      }`}>
                      Monthly billing
                    </button>
                    <button
                      onClick={() => setBillingType("yearly")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        billingType === "yearly"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-transparent"
                      }`}>
                      Yearly billing
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } p-8 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm`}>
                  <div className="mb-6">
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-2`}>
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    {plan.isCustom ? (
                      <>
                        <div
                          className={`text-4xl font-bold ${
                            isDark ? "text-white" : "text-gray-900"
                          } mb-2`}>
                          $Custom
                        </div>
                        <div
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}>
                          Available on 1-3 year term
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline mb-2">
                          <span
                            className={`text-4xl font-bold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}>
                            $
                            {typeof plan.price === "object"
                              ? plan.price[billingType]
                              : plan.price}
                          </span>
                          <span
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            } ml-2`}>
                            USD / mo
                          </span>
                        </div>
                        <div
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          } mb-4`}>
                          {billingType === "yearly"
                            ? "Billed yearly"
                            : "Billed monthly"}
                        </div>

                        {plan.badge && (
                          <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mt-3 inline-block">
                            {plan.badge}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Feature Summary List */}
                  <div className="mb-6 space-y-2">
                    {plan.name === "STARTER" && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.workspaces} workspaces
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.submissionsPerMonth}{" "}
                            submissions/month
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.integrations.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.support} support
                          </span>
                        </div>
                      </>
                    )}
                    {plan.name === "PRO" && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Unlimited workspaces
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.submissionsPerMonth}{" "}
                            submissions/month
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            All integrations (Telegram, WhatsApp, Google Sheets)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            AI Form Generator
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Advanced analytics
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Custom branding
                          </span>
                        </div>
                      </>
                    )}
                    {plan.name === "BUSINESS" && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.submissionsPerMonth}{" "}
                            submissions/month
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Priority + Dedicated support
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Advanced + Custom analytics
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.apiRateLimit} API requests/day
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            {plan.features.storageQuota} storage
                          </span>
                        </div>
                      </>
                    )}
                    {plan.name === "ENTERPRISE" && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Unlimited everything
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            SSO/SAML
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Private data regions
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            24/7 Enterprise support
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-gray-700"
                            }>
                            Custom SLA & onboarding
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      plan.isCustom
                        ? router.push("/contact")
                        : router.push(
                            `/subscribe?plan=${plan.name.toLowerCase()}`
                          )
                    }
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      index === 1
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : isDark
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}>
                    {plan.isCustom ? "Contact us" : "Choose plan"}
                  </button>
                </div>
              ))}
            </div>

            {/* Feature Comparison Table */}
            <div
              className={`rounded-2xl ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-lg overflow-hidden backdrop-blur-sm border ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}>
              <div className="overflow-x-auto">
                <table className="w-full pricing-table">
                  <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "17.5%" }} />
                    <col style={{ width: "17.5%" }} />
                    <col style={{ width: "17.5%" }} />
                    <col style={{ width: "17.5%" }} />
                  </colgroup>
                  <thead>
                    <tr
                      className={`border-b ${
                        isDark ? "border-gray-700" : "border-gray-200"
                      }`}>
                      <th
                        className={`text-left py-4 px-6 font-medium align-middle ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                        Platform
                      </th>
                      {plans.map((plan) => (
                        <th
                          key={plan.name}
                          className={`text-center py-4 px-6 font-medium align-middle ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>
                          {plan.name.charAt(0) +
                            plan.name.slice(1).toLowerCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureRows
                      .filter((row) => row.category === "Platform")
                      .map((row, index) => (
                        <tr
                          key={row.key}
                          className={`border-b ${
                            isDark ? "border-gray-700" : "border-gray-200"
                          } ${
                            index % 2 === 0
                              ? isDark
                                ? "bg-gray-750"
                                : "bg-gray-50"
                              : ""
                          }`}>
                          <td
                            className={`py-4 px-6 align-middle ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            } flex items-center`}>
                            {row.label}
                            <Info className="w-4 h-4 ml-2 text-gray-400 flex-shrink-0" />
                          </td>
                          {plans.map((plan) => (
                            <td
                              key={plan.name}
                              className="py-4 px-6 text-center align-middle">
                              {renderFeatureValue(
                                plan.features[
                                  row.key as keyof typeof plan.features
                                ]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>

                <table className="w-full mt-8 pricing-table">
                  <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "17.5%" }} />
                    <col style={{ width: "17.5%" }} />
                    <col style={{ width: "17.5%" }} />
                    <col style={{ width: "17.5%" }} />
                  </colgroup>
                  <thead>
                    <tr
                      className={`border-b ${
                        isDark ? "border-gray-700" : "border-gray-200"
                      }`}>
                      <th
                        className={`text-left py-4 px-6 font-medium align-middle ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>
                        Integrations & Features
                      </th>
                      {plans.map((plan) => (
                        <th
                          key={plan.name}
                          className={`text-center py-4 px-6 font-medium align-middle ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>
                          {plan.name.charAt(0) +
                            plan.name.slice(1).toLowerCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureRows
                      .filter((row) => row.category !== "Platform")
                      .map((row, index) => (
                        <tr
                          key={row.key}
                          className={`border-b ${
                            isDark ? "border-gray-700" : "border-gray-200"
                          } ${
                            index % 2 === 0
                              ? isDark
                                ? "bg-gray-750"
                                : "bg-gray-50"
                              : ""
                          }`}>
                          <td
                            className={`py-4 px-6 align-middle ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            } flex items-center`}>
                            {row.label}
                            <Info className="w-4 h-4 ml-2 text-gray-400 flex-shrink-0" />
                          </td>
                          {plans.map((plan) => (
                            <td
                              key={plan.name}
                              className="py-4 px-6 text-center align-middle">
                              {renderFeatureValue(
                                plan.features[
                                  row.key as keyof typeof plan.features
                                ]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .pricing-table {
            table-layout: fixed;
          }

          .slider {
            background: transparent !important;
          }

          .slider::-webkit-slider-runnable-track {
            height: 4px;
            border-radius: 4px;
            background: transparent !important;
          }

          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #2563eb;
            cursor: grab;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
            margin-top: -8px;
            -webkit-user-select: none;
            user-select: none;
            pointer-events: auto;
          }

          .slider::-webkit-slider-thumb:active {
            cursor: grabbing;
          }

          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            transition: transform 0.1s ease;
          }

          .slider::-moz-range-track {
            height: 4px;
            border-radius: 4px;
            background: transparent !important;
            border: none;
          }

          .slider::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #2563eb;
            cursor: grab;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
            -moz-user-select: none;
            user-select: none;
            pointer-events: auto;
          }

          .slider::-moz-range-thumb:active {
            cursor: grabbing;
          }

          .slider::-moz-range-thumb:hover {
            transform: scale(1.1);
            transition: transform 0.1s ease;
          }

          .slider::-moz-range-progress {
            height: 4px;
            border-radius: 4px;
            background: transparent !important;
          }
        `}</style>

        <Footer isDark={isDark} />
      </div>
    </>
  );
}
