import React, { useState, useId } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Briefcase,
  MapPin,
  FileText,
  User,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Award,
  ChevronRight,
  AlertCircle,
  Copy,
  Check,
  X,
  UploadCloud,
  Sparkles,
  Loader2,
  Download,
  ExternalLink,
  Printer
} from 'lucide-react';
import { JOB_POSITIONS, MOCK_APPLICATION_RECORDS, COMPANY_INFO } from '../data/ghData';
import { JobPosition, ApplicationStatusRecord } from '../types';

interface CareersViewProps {
  onStartProject?: () => void;
  onNavigateContact?: () => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onStartProject, onNavigateContact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeApplication, setActiveApplication] = useState<ApplicationStatusRecord | null>(null);
  const [matchedJob, setMatchedJob] = useState<JobPosition | null>(null);
  const [apiOffer, setApiOffer] = useState<any | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState<
    'idle' | 'found-app' | 'found-job' | 'found-api-offer' | 'not-found'
  >('idle');
  const [appliedRecords, setAppliedRecords] = useState<ApplicationStatusRecord[]>(MOCK_APPLICATION_RECORDS);

  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobPosition | null>(null);
  const [applyRefInput, setApplyRefInput] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateExperience, setCandidateExperience] = useState('3-5 years');
  const [candidateNotes, setCandidateNotes] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [newlyGeneratedRef, setNewlyGeneratedRef] = useState<string | null>(null);
  const [hasCopiedRef, setHasCopiedRef] = useState(false);
  const [hasCopiedLetter, setHasCopiedLetter] = useState(false);

  // Unique accessible IDs
  const refInputId = useId();
  const modalRefInputId = useId();
  const nameInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const expSelectId = useId();
  const notesInputId = useId();

  const departments = [
    'All',
    'Project Management',
    'Estimating & Preconstruction',
    'Field Operations',
    'Skilled Trades',
    'Safety & Compliance'
  ];

  // Reference search handler calling live Offer API + fallback to local records
  const handleReferenceLookup = async (queryOverride?: string) => {
    const rawQuery = (queryOverride !== undefined ? queryOverride : searchQuery).trim();
    if (!rawQuery) {
      setSearchStatus('idle');
      setActiveApplication(null);
      setMatchedJob(null);
      setApiOffer(null);
      setApiErrorMessage(null);
      return;
    }

    setIsSearching(true);
    setApiErrorMessage(null);
    const trimmedQuery = rawQuery.trim();
    const uppercaseQuery = trimmedQuery.toUpperCase();

    // 1. Query the live Offer Letter API:
    // https://offer-letter-app-one.vercel.app/api/v1/public/offers?companyId=6aabbd53da6dded29ac060c0&reference=YOUR_REFERENCE
    try {
      const companyId = '6aabbd53da6dded29ac060c0';
      // The API is case-sensitive, so use uppercaseQuery (e.g. OFF-2026-VKUNA2)
      const apiUrl = `https://offer-letter-app-one.vercel.app/api/v1/public/offers?companyId=${companyId}&reference=${encodeURIComponent(uppercaseQuery)}`;

      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      const resData = await res.json().catch(() => null);

      if (res.ok && resData && resData.success && resData.data) {
        setApiOffer(resData.data);
        setActiveApplication(null);
        setMatchedJob(null);
        setSearchStatus('found-api-offer');
        setIsSearching(false);
        document.getElementById('reference-portal-section')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // If uppercase failed and user typed mixed case, try trimmedQuery as fallback
      if (!res.ok && uppercaseQuery !== trimmedQuery) {
        const fallbackUrl = `https://offer-letter-app-one.vercel.app/api/v1/public/offers?companyId=${companyId}&reference=${encodeURIComponent(trimmedQuery)}`;
        const fallbackRes = await fetch(fallbackUrl, { method: 'GET', headers: { Accept: 'application/json' } });
        const fallbackData = await fallbackRes.json().catch(() => null);
        if (fallbackRes.ok && fallbackData && fallbackData.success && fallbackData.data) {
          setApiOffer(fallbackData.data);
          setActiveApplication(null);
          setMatchedJob(null);
          setSearchStatus('found-api-offer');
          setIsSearching(false);
          document.getElementById('reference-portal-section')?.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }

      if (resData && resData.message) {
        setApiErrorMessage(resData.message);
      } else if (resData && resData.error) {
        setApiErrorMessage(resData.error);
      }
    } catch (err) {
      console.warn('Live Offer API query notice:', err);
    }

    // 2. Fallback: Check local candidate application records
    const normalized = uppercaseQuery.replace(/\s+/g, '');
    const foundApp = appliedRecords.find(
      (app) => app.referenceNo.toUpperCase().replace(/\s+/g, '') === normalized
    );

    if (foundApp) {
      setActiveApplication(foundApp);
      setMatchedJob(null);
      setApiOffer(null);
      setSearchStatus('found-app');
      setIsSearching(false);
      document.getElementById('reference-portal-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 3. Fallback: Check in job openings
    const foundJob = JOB_POSITIONS.find(
      (job) =>
        job.referenceNo.toUpperCase().replace(/\s+/g, '') === normalized ||
        job.id.toUpperCase() === normalized
    );

    if (foundJob) {
      setMatchedJob(foundJob);
      setActiveApplication(null);
      setApiOffer(null);
      setSearchStatus('found-job');
      setIsSearching(false);
      document.getElementById('reference-portal-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 4. Not found anywhere
    setActiveApplication(null);
    setMatchedJob(null);
    setApiOffer(null);
    setSearchStatus('not-found');
    setIsSearching(false);
    document.getElementById('reference-portal-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenApplyModal = (job?: JobPosition) => {
    if (job) {
      setSelectedJobForApply(job);
      setApplyRefInput(job.referenceNo);
    } else {
      setSelectedJobForApply(null);
      setApplyRefInput('GENERAL-APP');
    }
    setNewlyGeneratedRef(null);
    setCandidateName('');
    setCandidateEmail('');
    setCandidatePhone('');
    setCandidateNotes('');
    setResumeFileName('');
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail) return;

    // Generate real-time application reference
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedCode = `GH-APP-2026-${randomSuffix}`;

    const newRecord: ApplicationStatusRecord = {
      referenceNo: generatedCode,
      candidateName: candidateName,
      positionTitle: selectedJobForApply ? selectedJobForApply.title : 'General Commercial Talent Submission',
      positionRef: applyRefInput || (selectedJobForApply ? selectedJobForApply.referenceNo : 'GH-GEN-2026'),
      submissionDate: 'Just Now (Today)',
      department: selectedJobForApply ? selectedJobForApply.department : 'Operations & Preconstruction',
      status: 'Received',
      statusStep: 1,
      lastUpdated: 'Application registered in GH Construction candidate database',
      notes: 'Initial documents received. Hiring team will review credentials within 3 business days.',
      assignedManager: 'Terry Jomha (Operations Partner)'
    };

    setAppliedRecords((prev) => [newRecord, ...prev]);
    setNewlyGeneratedRef(generatedCode);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopiedRef(true);
    setTimeout(() => setHasCopiedRef(false), 2000);
  };

  const filteredJobs = JOB_POSITIONS.filter((job) => {
    const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesDept;
  });

  return (
    <div id="careers-page" className="pt-28 pb-28 bg-[#08090c] min-h-screen text-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Headline */}
        <div className="max-w-4xl border-b border-white/[0.08] pb-14 mb-16">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#c8aa7a] mb-4">
            <span className="w-2 h-2 bg-[#c8aa7a]" />
            <span>Careers & Opportunities • Edmonton, AB</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#f7f7f5] tracking-tight leading-[1.08]">
            Build Your Legacy With GH Construction.
          </h1>

          <p className="text-lg sm:text-2xl text-[#d6cebf] font-light mt-6 leading-relaxed max-w-3xl">
            Commercial interiors, healthcare build-outs, and construction management crafted with pride. Track an active application by reference number, or apply to open positions across Scarborough.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                document.getElementById('reference-portal-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 transition-all duration-200 flex items-center gap-2 active:scale-[0.98] shadow-lg shadow-[#c8aa7a]/15"
            >
              <Search className="w-4 h-4" />
              <span>TRACK REFERENCE NUMBER</span>
            </button>

            <button
              onClick={() => {
                document.getElementById('openings-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-white/20 hover:border-[#c8aa7a] text-[#f7f7f5] hover:text-[#c8aa7a] font-display font-semibold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 transition-all duration-200 flex items-center gap-2"
            >
              <span>EXPLORE OPEN ROLES</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* REFERENCE PORTAL SECTION */}
        <section
          id="reference-portal-section"
          className="bg-[#0e1017] border border-white/[0.1] p-6 sm:p-10 lg:p-12 mb-20 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8aa7a]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#c8aa7a] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reference Number Portal</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5] tracking-tight mb-3">
              Enter Your Reference Number
            </h2>

            <p className="text-sm sm:text-base text-[#d6cebf] font-light leading-relaxed mb-8 max-w-2xl">
              Track real-time recruitment progress for your submitted application (e.g.,{' '}
              <code className="text-[#c8aa7a] font-mono bg-white/[0.05] px-1.5 py-0.5 rounded">
                GH-APP-2024-918
              </code>
              ), or search for a specific vacancy reference (e.g.,{' '}
              <code className="text-[#c8aa7a] font-mono bg-white/[0.05] px-1.5 py-0.5 rounded">
                GH-PM-104
              </code>
              ).
            </p>

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleReferenceLookup();
              }}
              className="flex flex-col sm:flex-row items-stretch gap-3 mb-6"
            >
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-sm font-mono text-[#c8aa7a] font-bold">#</span>
                </div>
                <input
                  id={refInputId}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter reference number (e.g. OFF-2026-VKUNA2)"
                  className="w-full pl-9 pr-10 py-3.5 bg-[#08090c] border border-white/20 focus:border-[#c8aa7a] focus:ring-1 focus:ring-[#c8aa7a] text-[#f7f7f5] placeholder-[#9b9fa8] font-mono text-sm sm:text-base transition-colors uppercase"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchStatus('idle');
                      setActiveApplication(null);
                      setMatchedJob(null);
                      setApiOffer(null);
                      setApiErrorMessage(null);
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#9b9fa8] hover:text-[#f7f7f5]"
                    aria-label="Clear reference search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="bg-[#c8aa7a] hover:bg-[#d6ba8c] disabled:opacity-75 text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 transition-all duration-200 flex items-center justify-center gap-2 shrink-0 active:scale-[0.98] shadow-lg shadow-[#c8aa7a]/20 cursor-pointer"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>VERIFYING API...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>LOOKUP REFERENCE</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Pills for Instant 1-Click Testing */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#9b9fa8]">
              <span className="font-mono text-[#d6cebf]">Quick demo tests:</span>
              {[
                { code: 'OFF-2026-VKUNA2', label: 'Yuvraj: Data Analyst (Official Offer API)' },
                { code: 'GH-PM-104', label: 'Commercial PM' },
                { code: 'GH-SITE-305', label: 'Site Super' },
                { code: 'GH-APP-2024-918', label: 'Estimator' }
              ].map((pill) => (
                <button
                  key={pill.code}
                  type="button"
                  onClick={() => {
                    setSearchQuery(pill.code);
                    handleReferenceLookup(pill.code);
                  }}
                  className="bg-white/[0.04] hover:bg-[#c8aa7a]/15 border border-white/[0.08] hover:border-[#c8aa7a]/50 text-[#d6cebf] hover:text-[#c8aa7a] px-2.5 py-1 rounded font-mono text-[11px] transition-colors flex items-center gap-1"
                >
                  <span className="font-bold text-[#c8aa7a]">{pill.code}</span>
                  <span className="opacity-75">({pill.label})</span>
                </button>
              ))}
            </div>

            {/* RESULT VIEW: Live API Verified Offer Letter - 100% Original API Data */}
            {searchStatus === 'found-api-offer' && apiOffer && (() => {
              const emp = apiOffer.employee || {};
              const job = apiOffer.employment || {};
              const comp = apiOffer.company || {};

              const cName = emp.name || apiOffer.candidateName || apiOffer.name || 'Candidate';
              const cEmail = emp.email || apiOffer.candidateEmail || apiOffer.email || '';
              const cPhone = emp.phone || apiOffer.candidatePhone || apiOffer.phone || '';
              const cNationality = emp.nationality || '';
              const cPassport = emp.passportNumber || '';

              const jPos = job.position || apiOffer.position || apiOffer.positionTitle || apiOffer.role || 'Position';
              const jDept = job.department || apiOffer.department || 'Department';
              const jLoc = job.location || apiOffer.location || 'On-Site';
              const jType = job.employmentType || apiOffer.employmentType || apiOffer.type || 'Full-Time';
              const jHours = job.standardHours || '40 hours/week';
              const jProbation = job.probationPeriod || '3 Months';
              const jNotice = job.noticePeriod || '30 Days';

              const salaryFormatted = job.salary != null
                ? `${job.currency || 'USD'} ${Number(job.salary).toLocaleString()}`
                : apiOffer.salary != null
                  ? `${apiOffer.currency || 'USD'} ${Number(apiOffer.salary).toLocaleString()}`
                  : 'Per Agreement';

              const jDateFormatted = job.joiningDate
                ? new Date(job.joiningDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
                : apiOffer.joiningDate || 'Per Offer Agreement';

              const issuedDate = apiOffer.createdAt
                ? new Date(apiOffer.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
                : 'September 17, 2026';

              const cCompany = comp.name || 'Gh Construction';
              const oStatus = apiOffer.status || 'Accepted';
              const oRef = apiOffer.reference || searchQuery;
              const oContent = apiOffer.offerContent || '';

              return (
                <div className="mt-8 pt-8 border-t border-white/[0.1] animate-fadeIn">
                  <div className="bg-[#08090c] border border-emerald-500/60 p-6 sm:p-8 relative shadow-2xl">
                    {/* Status header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 font-bold tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>OFFICIAL OFFER VERIFIED VIA LIVE API</span>
                          </span>
                          <span className="text-xs font-mono text-[#c8aa7a] bg-[#c8aa7a]/10 border border-[#c8aa7a]/30 px-2.5 py-0.5 font-bold">
                            REF: {oRef}
                          </span>
                          <span className="text-xs font-mono text-[#9b9fa8]">
                            Issued: {issuedDate}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#f7f7f5]">
                          {jPos}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#d6cebf] font-mono mt-1 flex flex-wrap items-center gap-2">
                          <span>
                            Candidate: <strong className="text-[#f7f7f5] text-sm sm:text-base">{cName}</strong>
                          </span>
                          <span>•</span>
                          <span>{jDept}</span>
                          <span>•</span>
                          <span className="text-[#c8aa7a] font-semibold">{cCompany}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-mono uppercase tracking-wider px-4 py-2 font-bold border bg-emerald-500/15 text-emerald-400 border-emerald-500/40 flex items-center gap-2 shadow-lg shadow-emerald-500/10">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Status: {oStatus}</span>
                        </span>
                      </div>
                    </div>

                    {/* Candidate Details Strip */}
                    <div className="py-4 border-b border-white/[0.08] bg-white/[0.015] px-4 -mx-4 sm:-mx-6 sm:px-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm">
                      {cEmail && (
                        <div className="flex items-center gap-2 text-[#d6cebf]">
                          <Mail className="w-3.5 h-3.5 text-[#c8aa7a]" />
                          <span className="font-mono">{cEmail}</span>
                        </div>
                      )}
                      {cPhone && (
                        <div className="flex items-center gap-2 text-[#d6cebf]">
                          <Phone className="w-3.5 h-3.5 text-[#c8aa7a]" />
                          <span className="font-mono">{cPhone}</span>
                        </div>
                      )}
                      {cNationality && (
                        <div className="flex items-center gap-2 text-[#d6cebf]">
                          <User className="w-3.5 h-3.5 text-[#c8aa7a]" />
                          <span>Nationality: <strong className="text-[#f7f7f5] uppercase font-mono">{cNationality}</strong></span>
                        </div>
                      )}
                      {cPassport && (
                        <div className="flex items-center gap-2 text-[#d6cebf]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#c8aa7a]" />
                          <span>Passport: <span className="font-mono text-[#f7f7f5]">{cPassport}</span></span>
                        </div>
                      )}
                    </div>

                    {/* Employment Terms Grid */}
                    <div className="py-6 border-b border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-[11px] font-mono uppercase text-[#a39d91] mb-1">
                          Base Compensation
                        </div>
                        <div className="text-xl font-display font-bold text-[#c8aa7a]">
                          {salaryFormatted}
                        </div>
                        <div className="text-[11px] text-[#9b9fa8] mt-0.5">Per Annum (Bi-weekly)</div>
                      </div>

                      <div className="p-4 bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-[11px] font-mono uppercase text-[#a39d91] mb-1">
                          Scheduled Start Date
                        </div>
                        <div className="text-base sm:text-lg font-display font-bold text-[#f7f7f5]">
                          {jDateFormatted}
                        </div>
                        <div className="text-[11px] text-[#9b9fa8] mt-0.5">Commencement Date</div>
                      </div>

                      <div className="p-4 bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-[11px] font-mono uppercase text-[#a39d91] mb-1">
                          Location & Hours
                        </div>
                        <div className="text-base font-display font-bold text-[#f7f7f5]">
                          {jLoc} • {jType}
                        </div>
                        <div className="text-[11px] text-[#9b9fa8] mt-0.5">{jHours}</div>
                      </div>

                      <div className="p-4 bg-white/[0.02] border border-white/[0.06]">
                        <div className="text-[11px] font-mono uppercase text-[#a39d91] mb-1">
                          Probation & Notice Terms
                        </div>
                        <div className="text-base font-display font-bold text-[#f7f7f5]">
                          {jProbation} Probation
                        </div>
                        <div className="text-[11px] text-[#9b9fa8] mt-0.5">{jNotice} Notice Period</div>
                      </div>
                    </div>

                    {/* Official Offer Letter Full Text */}
                    {oContent && (
                      <div className="py-6 border-b border-white/[0.08]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#c8aa7a]" />
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#f7f7f5] font-bold">
                              Original Formal Offer Letter Document
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(oContent);
                                setHasCopiedLetter(true);
                                setTimeout(() => setHasCopiedLetter(false), 2000);
                              }}
                              className="bg-white/[0.05] hover:bg-[#c8aa7a] text-[#f7f7f5] hover:text-[#08090c] text-xs font-mono px-3 py-1.5 transition-colors flex items-center gap-1.5 border border-white/10"
                            >
                              {hasCopiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{hasCopiedLetter ? 'Copied Letter' : 'Copy Text'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => window.print()}
                              className="bg-white/[0.05] hover:bg-white/15 text-[#f7f7f5] text-xs font-mono px-3 py-1.5 transition-colors flex items-center gap-1.5 border border-white/10"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Print / Save</span>
                            </button>
                          </div>
                        </div>

                        <div className="bg-[#050608] border border-white/[0.1] p-5 sm:p-8 max-h-[500px] overflow-y-auto font-mono text-xs sm:text-sm text-[#d6cebf] leading-relaxed whitespace-pre-wrap select-text">
                          {oContent}
                        </div>
                      </div>
                    )}

                    {/* Actions & Verification Source */}
                    <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="text-xs font-mono text-[#9b9fa8]">
                        <span>Verified Live API: </span>
                        <code className="text-[#c8aa7a] bg-white/[0.03] px-2 py-1 rounded break-all">
                          offer-letter-app-one.vercel.app/api/v1/public/offers?companyId=6aabbd53da6dded29ac060c0&reference={oRef}
                        </code>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(oContent || `Offer Reference: ${oRef}`);
                            setHasCopiedLetter(true);
                            setTimeout(() => setHasCopiedLetter(false), 2000);
                          }}
                          className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs tracking-wider uppercase px-5 py-3 flex items-center gap-2 shadow-lg shadow-[#c8aa7a]/15"
                        >
                          <Copy className="w-4 h-4" />
                          <span>COPY VERIFIED DETAILS</span>
                        </button>

                        <a
                          href={`mailto:${COMPANY_INFO.email.general}?subject=Inquiry regarding Offer Ref ${oRef} for ${cName}`}
                          className="border border-white/20 hover:border-white text-[#f7f7f5] font-display text-xs tracking-wider uppercase px-5 py-3 flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4 text-[#c8aa7a]" />
                          <span>CONTACT HR OPERATIONS</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* RESULT VIEW 1: Candidate Application Status Found */}
            {searchStatus === 'found-app' && activeApplication && (
              <div className="mt-8 pt-8 border-t border-white/[0.1] animate-fadeIn">
                <div className="bg-[#08090c] border border-[#c8aa7a]/40 p-6 sm:p-8 relative">
                  {/* Status header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-xs font-mono text-[#c8aa7a] bg-[#c8aa7a]/10 border border-[#c8aa7a]/30 px-2.5 py-0.5 font-bold tracking-wider">
                          REF: {activeApplication.referenceNo}
                        </span>
                        <span className="text-xs font-mono text-[#9b9fa8]">
                          Submitted: {activeApplication.submissionDate}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5]">
                        {activeApplication.positionTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#d6cebf] font-mono mt-0.5">
                        Candidate: {activeApplication.candidateName} • {activeApplication.department}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 font-bold border ${activeApplication.status === 'Offer Extended'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : activeApplication.status === 'Interview Scheduled'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-[#c8aa7a]/15 text-[#c8aa7a] border-[#c8aa7a]/40'
                          }`}
                      >
                        ● {activeApplication.status}
                      </span>
                    </div>
                  </div>

                  {/* Multi-step Visual Progress Timeline */}
                  <div className="py-8 border-b border-white/[0.08]">
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#a39d91] mb-6">
                      Recruitment Pipeline Progress
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-2 relative">
                      {[
                        { step: 1, label: 'Application Received', detail: 'Documents verified' },
                        { step: 2, label: 'Technical Screening', detail: 'Portfolio review' },
                        { step: 3, label: 'Panel Interview', detail: 'Partner & site review' },
                        { step: 4, label: 'Offer & Onboarding', detail: 'Contract formalization' }
                      ].map((st) => {
                        const isCompleted = activeApplication.statusStep >= st.step;
                        const isCurrent = activeApplication.statusStep === st.step;
                        return (
                          <div
                            key={st.step}
                            className={`p-3.5 border transition-all ${isCurrent
                                ? 'border-[#c8aa7a] bg-[#c8aa7a]/10'
                                : isCompleted
                                  ? 'border-white/20 bg-white/[0.02]'
                                  : 'border-white/[0.05] bg-transparent opacity-40'
                              }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-mono text-[#c8aa7a]">STAGE 0{st.step}</span>
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-[#c8aa7a]" />
                              ) : (
                                <Clock className="w-4 h-4 text-[#9b9fa8]" />
                              )}
                            </div>
                            <div className="text-sm font-display font-bold text-[#f7f7f5] leading-tight">
                              {st.label}
                            </div>
                            <div className="text-xs text-[#a39d91] font-light mt-1">
                              {st.detail}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review notes and manager details */}
                  <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[#c8aa7a] mb-1">
                        Latest Hiring Milestone Notes
                      </div>
                      <p className="text-[#d6cebf] font-light leading-relaxed">
                        “{activeApplication.notes}”
                      </p>
                      <div className="text-xs font-mono text-[#9b9fa8] mt-2">
                        Last Activity: {activeApplication.lastUpdated}
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.05] p-4 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-[#a39d91] mb-1">
                          Assigned Hiring Authority
                        </div>
                        <div className="text-[#f7f7f5] font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-[#c8aa7a]" />
                          <span>{activeApplication.assignedManager}</span>
                        </div>
                        <div className="text-xs text-[#a39d91] mt-1">
                          Direct inquiry: <span className="font-mono text-[#d6cebf]">{COMPANY_INFO.email.general}</span>
                        </div>
                      </div>

                      <div className="pt-3">
                        <a
                          href={`mailto:${COMPANY_INFO.email.general}?subject=Status Inquiry on Reference ${activeApplication.referenceNo}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c8aa7a] hover:text-[#f7f7f5] transition-colors uppercase tracking-wider"
                        >
                          <span>Email Recruitment Desk</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RESULT VIEW 2: Job Position Found By Reference */}
            {searchStatus === 'found-job' && matchedJob && (
              <div className="mt-8 pt-8 border-t border-white/[0.1] animate-fadeIn">
                <div className="bg-[#08090c] border border-[#c8aa7a] p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8aa7a] mb-2 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Job Opening Reference Match: {matchedJob.referenceNo}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#f7f7f5] mb-2">
                    {matchedJob.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#d6cebf] mb-4">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#c8aa7a]" />
                      {matchedJob.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c8aa7a]" />
                      {matchedJob.location}
                    </span>
                    {matchedJob.salaryRange && (
                      <span className="text-[#c8aa7a] font-bold">
                        {matchedJob.salaryRange}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#d6cebf] font-light leading-relaxed mb-6">
                    {matchedJob.overview}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOpenApplyModal(matchedJob)}
                      className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-2.5 flex items-center gap-2 active:scale-[0.98]"
                    >
                      <span>APPLY WITH REF: {matchedJob.referenceNo}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDepartment(matchedJob.department);
                        document.getElementById('openings-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="border border-white/20 hover:border-white text-[#f7f7f5] font-display text-xs tracking-wider uppercase px-5 py-2.5"
                    >
                      <span>VIEW FULL DETAILS BELOW</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RESULT VIEW 3: Unrecognized Code */}
            {searchStatus === 'not-found' && (
              <div className="mt-8 pt-6 border-t border-white/[0.1] animate-fadeIn">
                <div className="bg-[#140d0d] border border-red-500/30 p-6 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-display font-bold text-[#f7f7f5]">
                      Reference Number Not Recognized
                    </h3>
                    <p className="text-sm text-[#d6cebf] font-light mt-1">
                      No record found matching “{searchQuery}”.{' '}
                      {apiErrorMessage && (
                        <span className="text-red-400 font-mono">
                          (Live Offer API: {apiErrorMessage})
                        </span>
                      )}{' '}
                      You can double-check your code, try vacancy codes like{' '}
                      <code className="text-[#c8aa7a] font-mono">GH-PM-104</code>, or submit a general application.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => handleOpenApplyModal()}
                        className="text-xs font-mono uppercase tracking-wider text-[#c8aa7a] hover:text-[#f7f7f5] underline flex items-center gap-1"
                      >
                        <span>Submit a general application to receive a reference number</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* OPEN ROLES BOARD SECTION */}
        <section id="openings-section" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08] mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#c8aa7a] mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Current Opportunities</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#f7f7f5] tracking-tight">
                Active Construction Openings
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenApplyModal()}
                className="border border-[#c8aa7a]/50 hover:border-[#c8aa7a] text-[#c8aa7a] hover:text-[#f7f7f5] font-display text-xs tracking-wider uppercase px-5 py-2.5 transition-colors flex items-center gap-1.5"
              >
                <span>GENERAL APPLICATION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-8">
            {departments.map((dept) => {
              const count =
                dept === 'All'
                  ? JOB_POSITIONS.length
                  : JOB_POSITIONS.filter((j) => j.department === dept).length;
              const isActive = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${isActive
                      ? 'bg-[#c8aa7a] text-[#08090c] font-bold'
                      : 'bg-white/[0.03] text-[#d6cebf] hover:text-[#f7f7f5] border border-white/[0.08] hover:border-white/20'
                    }`}
                >
                  <span>{dept}</span>
                  <span className="opacity-60 text-[11px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                id={`job-card-${job.referenceNo.toLowerCase()}`}
                className="bg-[#0b0c10] border border-white/[0.08] hover:border-[#c8aa7a]/60 p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card top badges */}
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.05] mb-5">
                    <span className="text-xs font-mono text-[#c8aa7a] bg-[#c8aa7a]/10 border border-[#c8aa7a]/30 px-2.5 py-1 font-bold tracking-wider">
                      REF: {job.referenceNo}
                    </span>
                    <span className="text-xs font-mono text-[#9b9fa8]">
                      {job.postedDate}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5] group-hover:text-[#c8aa7a] transition-colors mb-2">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3.5 text-xs font-mono text-[#d6cebf] mb-4">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#c8aa7a]" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c8aa7a]" />
                      {job.location}
                    </span>
                    <span className="text-[#9b9fa8]">
                      {job.experienceLevel}
                    </span>
                  </div>

                  {job.salaryRange && (
                    <div className="text-xs font-mono text-[#c8aa7a] font-semibold mb-4 bg-white/[0.02] inline-block px-2.5 py-1 border border-white/[0.05]">
                      Compensation: {job.salaryRange}
                    </div>
                  )}

                  <p className="text-sm text-[#d6cebf] font-light leading-relaxed mb-6">
                    {job.overview}
                  </p>

                  {/* Key requirements preview */}
                  <div className="mb-6 space-y-2 text-xs text-[#a39d91]">
                    <div className="font-mono uppercase tracking-wider text-[#f7f7f5] text-[11px]">
                      Key Scope & Requirements:
                    </div>
                    {job.qualifications.slice(0, 2).map((q, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#c8aa7a] mt-0.5">•</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-6 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenApplyModal(job)}
                    className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs tracking-wider uppercase px-5 py-2.5 flex items-center gap-1.5 active:scale-[0.98] transition-all"
                  >
                    <span>APPLY WITH REF CODE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setSearchQuery(job.referenceNo);
                      handleReferenceLookup(job.referenceNo);
                    }}
                    className="text-xs font-mono text-[#9b9fa8] hover:text-[#c8aa7a] flex items-center gap-1 transition-colors"
                  >
                    <span>Check Reference in Portal &uarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY WORK AT GH CONSTRUCTION SECTION */}
        <section className="border-t border-white/[0.08] pt-20 pb-16">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#c8aa7a] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The GH Construction Standard</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#f7f7f5] tracking-tight">
              Why Build Your Career With Us?
            </h2>
            <p className="text-base sm:text-lg text-[#d6cebf] font-light mt-4 leading-relaxed">
              Operating under our guiding principle, <em className="text-[#f7f7f5]">“Big Enough to Serve | Small Enough to Care,”</em> GH Construction delivers an empowering workplace where craft is celebrated and leadership is hands-on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Building,
                title: 'High-Spec Projects',
                desc: 'Lead intricate dental clinics, commercial headquarters, and retail spaces with top architectural partners across Scarborough.'
              },
              {
                icon: Award,
                title: 'Direct Partner Access',
                desc: 'Collaborate directly with Terry Jomha and Nadder Jomha. No bureaucratic red tape; solutions are decided fast.'
              },
              {
                icon: ShieldCheck,
                title: 'COR Safety Culture',
                desc: 'Committed to zero harm. We prioritize safe job sites, top equipment, and comprehensive site supervisor support.'
              },
              {
                icon: Briefcase,
                title: 'Growth & Apprenticeship',
                desc: 'Tuition reimbursement for apprentices, Gold Seal certification support, and clear pathways from field to management.'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/[0.06] p-6 hover:border-[#c8aa7a]/40 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#c8aa7a]/10 border border-[#c8aa7a]/30 flex items-center justify-center mb-4 text-[#c8aa7a]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-[#f7f7f5] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#d6cebf] font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* RECRUITMENT CONTACT BAR */}
        <div className="bg-[#0e1017] border border-white/[0.08] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#c8aa7a] mb-1">
              Recruitment & Trade Inquiries
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f7f5]">
              Have Questions Regarding a Vacancy or Subtrade Partnership?
            </h3>
            <p className="text-xs sm:text-sm text-[#d6cebf] font-light mt-1">
              Reach our human resources and project management team at our Edmonton headquarters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href={`mailto:${COMPANY_INFO.email.general}?subject=Career and Trade Inquiry`}
              className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL RECRUITMENT</span>
            </a>
          </div>
        </div>
      </div>

      {/* INTERACTIVE APPLICATION MODAL */}
      {isApplyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-apply-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
        >
          <div className="bg-[#0c0e14] border border-white/[0.12] w-full max-w-2xl p-6 sm:p-10 relative my-8 shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 text-[#9b9fa8] hover:text-[#f7f7f5] p-2"
              aria-label="Close application dialog"
            >
              <X className="w-6 h-6" />
            </button>

            {!newlyGeneratedRef ? (
              <>
                <div className="mb-6 border-b border-white/[0.08] pb-4">
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#c8aa7a] mb-1">
                    Direct Candidate Submission
                  </div>
                  <h3 id="career-apply-modal-title" className="text-2xl sm:text-3xl font-display font-bold text-[#f7f7f5]">
                    {selectedJobForApply ? `Apply for ${selectedJobForApply.title}` : 'Submit General Application'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d6cebf] font-light mt-1">
                    Your submission will generate a live tracking reference code for real-time recruitment updates.
                  </p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {/* Reference code field */}
                  <div>
                    <label htmlFor={modalRefInputId} className="block text-xs font-mono uppercase tracking-wider text-[#c8aa7a] mb-1.5">
                      Target Job Reference Code
                    </label>
                    <input
                      id={modalRefInputId}
                      type="text"
                      value={applyRefInput}
                      onChange={(e) => setApplyRefInput(e.target.value)}
                      required
                      placeholder="e.g. GH-PM-104"
                      className="w-full px-4 py-2.5 bg-[#08090c] border border-white/20 focus:border-[#c8aa7a] text-[#f7f7f5] font-mono text-base sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={nameInputId} className="block text-xs font-mono uppercase tracking-wider text-[#d6cebf] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id={nameInputId}
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        required
                        placeholder="Sarah Jenkins"
                        className="w-full px-4 py-2.5 bg-[#08090c] border border-white/20 focus:border-[#c8aa7a] text-[#f7f7f5] text-base sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor={emailInputId} className="block text-xs font-mono uppercase tracking-wider text-[#d6cebf] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id={emailInputId}
                        type="email"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        required
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 bg-[#08090c] border border-white/20 focus:border-[#c8aa7a] text-[#f7f7f5] text-base sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={phoneInputId} className="block text-xs font-mono uppercase tracking-wider text-[#d6cebf] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id={phoneInputId}
                        type="tel"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        placeholder="780-555-0199"
                        className="w-full px-4 py-2.5 bg-[#08090c] border border-white/20 focus:border-[#c8aa7a] text-[#f7f7f5] text-base sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor={expSelectId} className="block text-xs font-mono uppercase tracking-wider text-[#d6cebf] mb-1.5">
                        Years of Commercial Experience
                      </label>
                      <select
                        id={expSelectId}
                        value={candidateExperience}
                        onChange={(e) => setCandidateExperience(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#08090c] border border-white/20 focus:border-[#c8aa7a] text-[#f7f7f5] text-base sm:text-sm"
                      >
                        <option value="1-3 years">1 - 3 years</option>
                        <option value="3-5 years">3 - 5 years</option>
                        <option value="5-8 years">5 - 8 years</option>
                        <option value="8+ years">8+ years</option>
                      </select>
                    </div>
                  </div>

                  {/* Simulated Resume Upload */}
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-[#d6cebf] mb-1.5">
                      Resume / CV Document
                    </span>
                    <label className="border-2 border-dashed border-white/20 hover:border-[#c8aa7a] p-5 text-center cursor-pointer transition-colors bg-[#08090c] block">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFileName(e.target.files[0].name);
                          }
                        }}
                      />
                      <UploadCloud className="w-8 h-8 text-[#c8aa7a] mx-auto mb-2" />
                      <div className="text-xs text-[#d6cebf]">
                        {resumeFileName ? (
                          <span className="text-[#c8aa7a] font-mono font-bold">{resumeFileName}</span>
                        ) : (
                          <span>Click to select PDF/DOCX or drop file here</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#9b9fa8] mt-1 font-mono">
                        Standard formats accepted up to 15MB
                      </div>
                    </label>
                  </div>

                  {/* Candidate note */}
                  <div>
                    <label htmlFor={notesInputId} className="block text-xs font-mono uppercase tracking-wider text-[#d6cebf] mb-1.5">
                      Introductory Note or Project Highlights
                    </label>
                    <textarea
                      id={notesInputId}
                      rows={3}
                      value={candidateNotes}
                      onChange={(e) => setCandidateNotes(e.target.value)}
                      placeholder="Share notable commercial or healthcare projects you have managed or constructed..."
                      className="w-full px-4 py-2.5 bg-[#08090c] border border-white/20 focus:border-[#c8aa7a] text-[#f7f7f5] text-base sm:text-sm"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#9b9fa8] hover:text-[#f7f7f5]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3 flex items-center gap-2 active:scale-[0.98] shadow-lg shadow-[#c8aa7a]/15"
                    >
                      <span>SUBMIT & GENERATE REFERENCE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Submission Success with Generated Reference Number */
              <div className="py-6 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-[#c8aa7a]/15 border border-[#c8aa7a]/40 rounded-full flex items-center justify-center mx-auto mb-5 text-[#c8aa7a]">
                  <Check className="w-8 h-8" />
                </div>

                <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#c8aa7a] mb-2">
                  Application Successfully Registered
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#f7f7f5] mb-2">
                  Your Application Reference Code
                </h3>

                <p className="text-sm text-[#d6cebf] font-light max-w-md mx-auto mb-6">
                  Keep this tracking code to check your recruitment status anytime on our careers portal.
                </p>

                {/* Generated reference code display */}
                <div className="bg-[#08090c] border-2 border-[#c8aa7a] p-4 sm:p-5 max-w-sm mx-auto mb-8 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="text-[10px] font-mono uppercase text-[#a39d91]">Your Reference Number</div>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-[#c8aa7a]">
                      {newlyGeneratedRef}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(newlyGeneratedRef)}
                    className="p-2.5 bg-white/[0.05] hover:bg-[#c8aa7a] text-[#f7f7f5] hover:text-[#08090c] transition-colors rounded"
                    aria-label="Copy reference number to clipboard"
                  >
                    {hasCopiedRef ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsApplyModalOpen(false);
                      setSearchQuery(newlyGeneratedRef);
                      handleReferenceLookup(newlyGeneratedRef);
                    }}
                    className="w-full sm:w-auto bg-[#c8aa7a] hover:bg-[#d6ba8c] text-[#08090c] font-display font-bold text-xs tracking-wider uppercase px-6 py-3 flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>TRACK THIS REFERENCE NOW</span>
                  </button>

                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="w-full sm:w-auto border border-white/20 hover:border-white text-[#f7f7f5] font-display text-xs tracking-wider uppercase px-6 py-3"
                  >
                    <span>CLOSE</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
