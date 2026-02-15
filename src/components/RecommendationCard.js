import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { useState } from 'react';

/* ──────────────────────────────
   COLOR schemes per feature area
   ────────────────────────────── */
const REC_COLORS = {
  nose: { gradient: 'from-amber-500 to-orange-500', light: 'bg-amber-50', border: 'border-amber-200' },
  eyes: { gradient: 'from-sky-500 to-blue-500', light: 'bg-sky-50', border: 'border-sky-200' },
  lips: { gradient: 'from-rose-500 to-pink-500', light: 'bg-rose-50', border: 'border-rose-200' },
  brows: { gradient: 'from-violet-500 to-purple-500', light: 'bg-violet-50', border: 'border-violet-200' },
  face_shape: { gradient: 'from-emerald-500 to-teal-500', light: 'bg-emerald-50', border: 'border-emerald-200' },
  jawline: { gradient: 'from-orange-500 to-amber-500', light: 'bg-orange-50', border: 'border-orange-200' },
  chin: { gradient: 'from-cyan-500 to-blue-500', light: 'bg-cyan-50', border: 'border-cyan-200' },
  cheekbones: { gradient: 'from-pink-500 to-rose-500', light: 'bg-pink-50', border: 'border-pink-200' },
};

const FEATURE_EMOJIS = {
  nose: '👃',
  eyes: '👁️',
  lips: '👄',
  brows: '✏️',
  face_shape: '🧑',
  jawline: '🦴',
  chin: '🔻',
  cheekbones: '✨',
};

export default function RecommendationCard({ recommendation, index }) {
  const [expanded, setExpanded] = useState(false);

  const rec = recommendation;
  const featureKey = rec.feature || 'nose';
  const palette = REC_COLORS[featureKey] || REC_COLORS.nose;
  const emoji = FEATURE_EMOJIS[featureKey] || '💡';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${palette.border} overflow-hidden hover:shadow-md transition-all duration-300`}>
      {/* ── HEADER ── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-5 text-left"
      >
        {/* Number badge with gradient */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${palette.gradient} text-white flex items-center justify-center font-bold text-sm shadow-md`}
        >
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          {/* Feature + technique */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-lg">{emoji}</span>
            <h4 className="text-sm font-bold text-gray-900 capitalize">{rec.feature}</h4>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500 capitalize">{rec.variant} variant</span>
          </div>

          {/* Technique name */}
          <p className="text-sm font-semibold text-blue-700 capitalize mb-1">
            {rec.technique}
          </p>

          {/* Why it matches — truncated when collapsed */}
          <p className={`text-xs text-gray-600 leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
            {rec.why_it_matches}
          </p>
        </div>

        <div className="flex-shrink-0 mt-1">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* ── EXPANDED BODY ── */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {/* ── Steps ── */}
          {rec.steps && rec.steps.length > 0 && (
            <div className={`${palette.light} rounded-xl p-4`}>
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                Step-by-Step Guide
              </h5>
              <ol className="space-y-3">
                {rec.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${palette.gradient} text-white flex items-center justify-center text-[11px] font-bold`}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ── Awareness / Pro-tip ── */}
          {rec.awareness && (
            <div className="flex gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Pro Tip
                </h5>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  {rec.awareness}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
