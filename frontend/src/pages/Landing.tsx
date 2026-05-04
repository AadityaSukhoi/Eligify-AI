import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mic,
  MessageSquare,
  Search,
  Shield,
  FileCheck,
  Globe,
  CheckCircle2,
  Sparkles,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGateModal } from "@/components/auth/AuthGateModal";
import { useState } from "react";

const features = [
  {
    icon: Sparkles,
    title: "Precision Eligibility Intelligence",
    description: "Match your profile against 800+ programs in seconds with ranked, explainable outcomes.",
  },
  {
    icon: MessageSquare,
    title: "Conversational, Not Bureaucratic",
    description: "Describe your situation naturally. Eligify AI handles the policy mapping for you.",
  },
  {
    icon: Mic,
    title: "Voice-First Guidance",
    description: "Hands-free access in English and key regional languages, tuned for clarity and speed.",
  },
  {
    icon: FileCheck,
    title: "Transparent Decision Trails",
    description: "See the exact rules and documents behind every eligibility verdict.",
  },
  {
    icon: Shield,
    title: "Verified by Sources",
    description: "Recommendations link directly to official government notifications and portals.",
  },
  {
    icon: Globe,
    title: "Inclusive by Design",
    description: "Accessibility and low-bandwidth performance built in from day one.",
  },
];

const stats = [
  { value: "847+", label: "Programs Indexed" },
  { value: "29", label: "States Covered" },
  { value: "8", label: "Languages Supported" },
  { value: "100%", label: "Free & Accessible" },
];

export default function Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/app");

  const openAuthGate = (path: string) => {
    setRedirectPath(path);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <AuthGateModal open={authModalOpen} onOpenChange={setAuthModalOpen} redirectPath={redirectPath} />

      <div className="tricolor-bar" />

      <section className="pattern-overlay hero-gradient relative overflow-hidden text-foreground">
        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6 text-primary">
              <span className="text-xs font-semibold tracking-wide uppercase">
                Government Scheme Eligibility Checking
              </span>
            </div>

            <h1 className="font-editorial leading-tight mb-6">
              <span className="block text-3xl md:text-5xl lg:text-6xl text-foreground">
                Check your eligibility for government schemes.
              </span>
              <span className="block text-6xl md:text-8xl lg:text-9xl font-bold text-accent">Eligify AI</span>
            </h1>

            <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
              Get clear, source-verified guidance on the schemes you qualify for,
              in your language and without confusing forms.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base glow-accent cta-shine"
                onClick={() => openAuthGate("/app")}
              >
                Check Eligibility
                <ArrowRight className="w-5 h-5 ml-2 !text-black" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/30 text-foreground hover:bg-foreground/5 font-medium px-8 h-12 text-base"
                onClick={() => openAuthGate("/app?tab=explore")}
              >
                <Search className="w-5 h-5 mr-2 text-foreground" />
                Explore Programs
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-xl p-4 text-left">
                  <div className="text-2xl md:text-3xl font-semibold text-accent">{stat.value}</div>
                  <div className="text-xs text-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-foreground mb-4">
              A refined experience, built on public trust
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Our platform blends rigorous policy intelligence with a polished, accessible interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="luxe-card p-6 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary/60 via-secondary/40 to-primary/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-foreground mb-4">
              How the experience flows
            </h2>
            <p className="text-lg text-foreground/80">
              Thoughtfully designed to get you to verified answers quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Share Your Profile</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Answer a few clear questions or speak naturally. We capture only what is needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center text-accent-foreground text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Eligibility Intelligence</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Eligify AI evaluates official criteria and highlights the best-fit programs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success mx-auto mb-4 flex items-center justify-center text-success-foreground text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Verified Outcomes</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Review results with transparent reasoning and source citations for each decision.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
  size="lg"
  className="bg-accent text-black hover:bg-accent/90 font-semibold px-8 h-12 text-base glow-accent cta-shine"
>
  Start Your Check
  <ArrowRight className="w-5 h-5 ml-2" /> 
</Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-t from-secondary/40 to-background">
        <div className="container">
          <div className="luxe-card p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-editorial text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Verified, transparent, and built for trust
                </h2>
                <p className="text-foreground/75 mb-6 leading-relaxed">
                  Eligify AI provides clear eligibility logic, reliable references, and a privacy-first approach
                  so decisions feel dependable.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground">Each recommendation links to official policy documents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground">No personal data stored beyond the session</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground">Database refreshed from official sources regularly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground">Designed for accessibility and low-bandwidth use</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm p-6 glass-panel rounded-xl shadow-md">
                  <div className="flex items-center gap-2 mb-4">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Trusted Sources</span>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>MyScheme (myscheme.gov.in)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>National Portal of India</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Ministry Official Websites</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>Gazette Notifications</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>RTI Disclosed Documents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-header-main text-primary-foreground py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold font-editorial text-white">Eligify<span className="text-accent"> AI</span></span>
              <span className="text-white text-sm">
                | Eligibility Intelligence
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white">
              <a href="#" className="hover:text-accent">About</a>
              <a href="#" className="hover:text-accent">Privacy</a>
              <a href="#" className="hover:text-accent">Terms</a>
              <a href="#" className="hover:text-accent">Contact</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-center text-xs text-white">
            <p>© 2026 Eligify AI. All rights reserved. Not an official government portal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
