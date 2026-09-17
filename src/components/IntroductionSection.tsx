import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Building2,
  Briefcase,
} from "lucide-react";
import { COMPANY_INFO } from "../data/ghData";

interface IntroductionSectionProps {
  onLearnMore: () => void;
  onStartProject: () => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  onLearnMore,
  onStartProject,
}) => {
  return (
    <section
      id="introduction-section"
      className="py-24 sm:py-32 bg-[#0a0b0f] border-b border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Architectural Intro Typography */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a]">
              <span className="w-2 h-2 bg-[#c8aa7a]" />
              <span>About GH Construction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#f7f7f5] tracking-tight leading-[1.12]">
              Dedicated collaborators, not just contractors.
            </h2>

            <div className="pt-4 border-t border-white/[0.08] space-y-4 text-sm text-[#d6cebf]">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#c8aa7a] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f7f7f5] font-semibold block text-base">
                    Core Focus
                  </span>
                  <span className="text-sm text-[#a39d91]">
                    General contracting, commercial construction, commercial
                    interiors & tenant improvements.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#c8aa7a] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f7f7f5] font-semibold block text-base">
                    Client Philosophy
                  </span>
                  <span className="text-sm text-[#a39d91]">
                    “{COMPANY_INFO.motto}”
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-4">
              <button
                id="intro-read-more"
                onClick={onLearnMore}
                className="text-sm font-display font-bold uppercase tracking-wider text-[#c8aa7a] hover:text-[#d6ba8c] flex items-center gap-2 group py-2 transition-colors"
              >
                <span>READ THE GH STORY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Narrative and "We Think Business" Card */}
          <div className="lg:col-span-7 space-y-8">
            <div className="text-lg sm:text-xl text-[#d6cebf] font-light leading-relaxed space-y-5">
              <p>
                <strong className="text-[#f7f7f5] font-medium">
                  GH Construction
                </strong>{" "}
                was established in the{" "}
                <span className="text-[#c8aa7a] font-normal">
                  Winter of 2008
                </span>{" "}
                with a clear purpose: crafting exquisite commercial environments
                for our esteemed clients. Renowned across Scarborough for our
                proficiency in building intricate interiors, we pride ourselves
                on being more than just a construction company.
              </p>
              <p className="text-[#a39d91] text-base sm:text-lg leading-relaxed">
                We are dedicated collaborators working hand-in-hand with our
                clients to actualize their aspirations. Our commitment extends
                beyond the physical structures we build; we are devoted to
                fostering enduring partnerships built on trust, quality, and
                shared commercial success.
              </p>
            </div>

            {/* "We Think Business" Architectural Block */}
            <div className="p-7 sm:p-9 bg-[#0e1017] border border-white/[0.1] relative shadow-xl">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#c8aa7a] mb-3">
                <span>Core Business Thesis</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#f7f7f5] mb-3">
                “We Think Business”
              </h3>
              <p className="text-base text-[#d6cebf] leading-relaxed mb-6 font-light">
                {COMPANY_INFO.ethos.body}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-white/[0.08] text-sm text-[#f7f7f5]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c8aa7a] shrink-0" />
                  <span>Strategic leasehold consultation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c8aa7a] shrink-0" />
                  <span>Zero patient/operating downtime</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c8aa7a] shrink-0" />
                  <span>Transparent open-book budgets</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c8aa7a] shrink-0" />
                  <span>Direct founder involvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
