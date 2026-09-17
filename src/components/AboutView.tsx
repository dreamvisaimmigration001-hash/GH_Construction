import React from "react";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Building,
  ShieldCheck,
  Compass,
  Users,
} from "lucide-react";
import { COMPANY_INFO, PROJECTS } from "../data/ghData";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

interface AboutViewProps {
  onStartProject: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onStartProject,
}) => {
  const navigate = useNavigate();
  // Use authentic project image for an architectural banner
  const heroBuild =
    PROJECTS.find((p) => p.id === "juriscorp-law") || PROJECTS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      id="about-page"
      className="pt-28 pb-28 bg-[#08090c] min-h-screen text-[#e5e7eb]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Headline */}
        <div className="max-w-4xl border-b border-white/[0.08] pb-16 mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-4">
            <span className="w-2 h-2 bg-[#c8aa7a]" />
            <span>Company Heritage & Ethos</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#f7f7f5] tracking-tight leading-[1.08]">
            More Than Just a Construction Company.
          </h1>

          <p className="text-xl sm:text-2xl text-[#d6cebf] font-light mt-6 leading-relaxed max-w-3xl">
            Established in the Winter of 2008 in Edmonton, Scarborough, GH
            Construction crafts commercial interiors and business spaces through
            precision general contracting and collaborative partnership.
          </p>
        </div>

        {/* Story Section with Visual Architectural Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-white/[0.08]">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#d6cebf] font-light leading-relaxed">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5] tracking-tight">
              Our Primary Focus: Exquisite Spaces Built for Business
            </h2>

            <p>
              GH Construction was established in the{" "}
              <strong className="text-[#f7f7f5] font-medium">
                Winter of 2008
              </strong>{" "}
              as a commercial construction and general contracting company. From
              our inception, our primary focus has always been crafting
              exquisite, functional spaces for our esteemed clients.
            </p>

            <p>
              Renowned across Edmonton and Scarborough for our proficiency in
              building intricate interiors, we pride ourselves on being more
              than just a construction company; we are dedicated collaborators
              working hand-in-hand with our clients to actualize their
              aspirations.
            </p>

            <p className="text-[#d6cebf]">
              Our commitment extends far beyond the physical structures we
              build; we are devoted to fostering enduring partnerships built on
              trust, quality, and shared commercial success. We collaborate with
              the region’s best sub-trades, engineers, and designers to deliver
              every project cleanly from start to finish.
            </p>

            <div className="pt-4 border-l-2 border-[#c8aa7a] pl-6">
              <p className="text-lg sm:text-xl text-[#f7f7f5] font-serif italic leading-relaxed">
                “With GH, you’re assured of a quality build each and every time.
                Our clients are continually impressed with our honesty,
                integrity, approachability, and adherence to budget and
                timelines.”
              </p>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] bg-[#0d0f15] border border-white/[0.1] overflow-hidden shadow-xl">
              <img
                src={heroBuild.heroImage}
                alt="Juriscorp Law Corporate Commercial Build by GH Construction"
                className="w-full h-full object-cover filter brightness-[0.8]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3.5 bg-[#08090c]/90 border border-white/[0.15] text-xs sm:text-sm font-mono text-[#d6cebf]">
                Juriscorp Law Offices • Edmonton, AB • GH Construction
              </div>
            </div>

            <div className="p-7 bg-[#0d0f15] border border-white/[0.1] space-y-4 shadow-lg">
              <div className="text-xs sm:text-sm font-mono text-[#c8aa7a] uppercase tracking-wider font-semibold">
                Corporate Factsheet
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-mono pt-1">
                <div>
                  <span className="text-[#a39d91] block mb-1">
                    Established:
                  </span>
                  <span className="text-[#f7f7f5] font-semibold text-sm sm:text-base">
                    Winter 2008
                  </span>
                </div>
                <div>
                  <span className="text-[#a39d91] block mb-1">
                    HQ Location:
                  </span>
                  <span className="text-[#f7f7f5] font-semibold text-sm sm:text-base">
                    Edmonton, AB
                  </span>
                </div>
                <div>
                  <span className="text-[#a39d91] block mb-1">
                    Primary Focus:
                  </span>
                  <span className="text-[#f7f7f5] font-semibold text-sm sm:text-base">
                    Commercial Interiors
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* "We Think Business" Deep Dive */}
        <div className="py-20 border-b border-white/[0.08]">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
              <span className="w-2 h-2 bg-[#c8aa7a]" />
              <span>The Operational Mindset</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#f7f7f5] tracking-tight">
              “We Think Business”
            </h2>
            <p className="text-base sm:text-lg text-[#d6cebf] font-light mt-3">
              A collaborative perspective designed to protect client revenues,
              tenant allowances, and opening timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#0d0f15] border border-white/[0.08] space-y-4">
              <div className="w-12 h-12 border border-white/[0.15] flex items-center justify-center text-[#c8aa7a]">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5]">
                Beyond Nail & Hammer
              </h3>
              <p className="text-sm sm:text-base text-[#d6cebf] font-light leading-relaxed">
                We are not a traditional, siloed construction contractor. We
                think big picture, anticipate operational bottlenecks, and come
                up with unique technical solutions for every site challenge.
              </p>
            </div>

            <div className="p-8 bg-[#0d0f15] border border-white/[0.08] space-y-4">
              <div className="w-12 h-12 border border-white/[0.15] flex items-center justify-center text-[#c8aa7a]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5]">
                Partner Capital Protection
              </h3>
              <p className="text-sm sm:text-base text-[#d6cebf] font-light leading-relaxed">
                The financial and operational goals of our partners are at the
                forefront of our minds. We safeguard tenant improvement
                allowances, evaluate municipal utility constraints, and minimize
                clinic chair downtime.
              </p>
            </div>

            <div className="p-8 bg-[#0d0f15] border border-white/[0.08] space-y-4">
              <div className="w-12 h-12 border border-white/[0.15] flex items-center justify-center text-[#c8aa7a]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5]">
                Enduring Accountability
              </h3>
              <p className="text-sm sm:text-base text-[#d6cebf] font-light leading-relaxed">
                You can be sure we are hiring the right people because it is our
                name on the line. Our involvement does not end upon occupancy
                sign-off; our post-project support remains available year-round.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Leadership Contacts */}
        <div className="pt-20">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-3">
              <span className="w-2 h-2 bg-[#c8aa7a]" />
              <span>Direct Leadership Access</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#f7f7f5] tracking-tight">
              Accessible, Responsive Project Partners
            </h2>
            <p className="text-base sm:text-lg text-[#d6cebf] font-light mt-3">
              At GH Construction, clients have direct cell phone and email
              access to the individuals managing their build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-[#0d0f15] border border-white/[0.08] space-y-4 shadow-md">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#c8aa7a] font-semibold">
                Project Partner
              </div>
              <h3 className="text-2xl font-display font-bold text-[#f7f7f5]">
                Nadder Jomha
              </h3>
              <div className="space-y-2.5 pt-3 border-t border-white/[0.08] text-sm font-mono">
                <a
                  href="tel:7805041792"
                  className="flex items-center gap-2.5 text-[#f7f7f5] hover:text-[#c8aa7a]"
                >
                  <Phone className="w-4 h-4 text-[#c8aa7a]" />
                  <span>780-504-1792</span>
                </a>
                <a
                  href="mailto:nadder@ghconstruction.ca"
                  className="flex items-center gap-2.5 text-[#d6cebf] hover:text-[#f7f7f5]"
                >
                  <Mail className="w-4 h-4 text-[#c8aa7a]" />
                  <span>nadder@ghconstruction.ca</span>
                </a>
              </div>
            </div>

            <div className="p-8 bg-[#0d0f15] border border-white/[0.08] space-y-4 shadow-md">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#c8aa7a] font-semibold">
                Project Partner
              </div>
              <h3 className="text-2xl font-display font-bold text-[#f7f7f5]">
                Terry Jomha
              </h3>
              <div className="space-y-2.5 pt-3 border-t border-white/[0.08] text-sm font-mono">
                <a
                  href="mailto:Info@ghconstructions.ca"
                  className="flex items-center gap-2.5 text-[#d6cebf] hover:text-[#f7f7f5]"
                >
                  <Mail className="w-4 h-4 text-[#c8aa7a]" />
                  <span>Info@ghconstructions.ca</span>
                </a>
              </div>
            </div>

            <div className="p-8 bg-[#0d0f15] border border-white/[0.08] space-y-4 shadow-md">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#c8aa7a] font-semibold">
                Corporate Office
              </div>
              <h3 className="text-2xl font-display font-bold text-[#f7f7f5]">
                Edmonton HQ
              </h3>
              <div className="space-y-2.5 pt-3 border-t border-white/[0.08] text-sm font-mono">
                <a
                  href={`mailto:${COMPANY_INFO.email.general}`}
                  className="flex items-center gap-2.5 text-[#d6cebf] hover:text-[#f7f7f5]"
                >
                  <Mail className="w-4 h-4 text-[#c8aa7a]" />
                  <span>{COMPANY_INFO.email.general}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
            <button
              onClick={onStartProject}
              className="w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-xl shadow-[#c8aa7a]/15 text-center"
            >
              START A PROJECT WITH GH
            </button>
            <button
              onClick={() => navigate('/work')}
              className="w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 border border-white/[0.2] hover:border-[#c8aa7a] text-[#f7f7f5] hover:text-[#c8aa7a] font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-colors text-center"
            >
              VIEW COMPLETED WORK
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
