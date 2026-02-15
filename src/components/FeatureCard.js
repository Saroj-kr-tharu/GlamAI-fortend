import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

/* ─────────────────────────────
   Metric bar (0 → 1 scale)
   ───────────────────────────── */
function MetricBar({ label, value, color = 'bg-blue-500' }) {
  const pct = Math.min(Math.round((value ?? 0) * 100), 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600 capitalize">{label.replace(/_/g, ' ')}</span>
        <span className="font-semibold text-gray-800">{pct}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────
   Badge chip
   ───────────────────────────── */
function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${className}`}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   METRIC BAR COLOR per feature key
   ───────────────────────────────────────────────────── */
const BAR_COLORS = {
  nose: 'bg-amber-500',
  eyes: 'bg-sky-500',
  lips: 'bg-rose-500',
  eyebrows: 'bg-violet-500',
  face_shape: 'bg-emerald-500',
  face_symmetry: 'bg-indigo-500',
  jaw_chin: 'bg-orange-500',
  cheekbones: 'bg-pink-500',
};

/* ══════════════════════════════════════════════════════
   FEATURE CARD
   ══════════════════════════════════════════════════════ */
export default function FeatureCard({ featureKey, data, label, icon, colors }) {
  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  const barColor = BAR_COLORS[featureKey] || 'bg-blue-500';

  // Gather descriptive fields (exclude 'metrics')
  const descriptiveEntries = Object.entries(data).filter(
    ([k]) => k !== 'metrics' && typeof data[k] !== 'object'
  );

  // Gather metric fields
  const metrics = data.metrics ? Object.entries(data.metrics) : [];

  return (
    <div
      className={`${colors.bg} ${colors.border} border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300`}
    >
      {/* ── HEADER ── */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="text-sm font-bold text-gray-900">{label}</h4>
            {/* Primary value as subtitle */}
            <p className={`text-xs capitalize ${colors.accent}`}>
              {data.primary || data.shape || data.level || data.fullness || data.arch || data.definition ||
                (data.jaw ? `${data.jaw} jaw` : '') || ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Badges for quick scan */}
          <div className="hidden sm:flex gap-1.5">
            {descriptiveEntries.slice(0, 2).map(([k, v]) => (
              <Badge key={k} className={colors.badge}>
                {String(v)}
              </Badge>
            ))}
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* ── EXPANDED BODY ── */}
      {expanded && (
        <div className={`px-5 pb-5 space-y-4 border-t border-dashed ${colors.border}`}>
          {/* Descriptive attributes */}
          {descriptiveEntries.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-4">
              {descriptiveEntries.map(([k, v]) => (
                <div key={k} className="bg-white/70 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                    {k.replace(/_/g, ' ')}
                  </p>
                  <p className="text-sm font-bold text-gray-800 capitalize">{String(v)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Metric bars */}
          {metrics.length > 0 && (
            <div className="space-y-3 pt-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Measurements
              </p>
              {metrics.map(([k, v]) => (
                <MetricBar key={k} label={k} value={v} color={barColor} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
