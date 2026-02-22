import {
    Activity,
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Eye,
    Sparkles,
    Star,
    User,
} from 'lucide-react';
import { useState } from 'react';
import FeatureCard from './FeatureCard';
import RecommendationCard from './RecommendationCard';

/* ──────────────────────────────────────────────────────
   ICON MAP  –  maps API feature keys → lucide icon name
   ────────────────────────────────────────────────────── */
const FEATURE_ICONS = {
  nose: '👃',
  eyes: '👁️',
  lips: '👄',
  eyebrows: '🔲',
  face_shape: '🧑',
  face_symmetry: '⚖️',
  jaw_chin: '🦴',
  cheekbones: '✨',
};

const FEATURE_LABELS = {
  nose: 'Nose',
  eyes: 'Eyes',
  lips: 'Lips',
  eyebrows: 'Eyebrows',
  face_shape: 'Face Shape',
  face_symmetry: 'Symmetry',
  jaw_chin: 'Jaw & Chin',
  cheekbones: 'Cheekbones',
};

const FEATURE_COLORS = {
  nose: { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-600', ring: 'ring-amber-200', badge: 'bg-amber-100 text-amber-700' },
  eyes: { bg: 'bg-sky-50', border: 'border-sky-200', accent: 'text-sky-600', ring: 'ring-sky-200', badge: 'bg-sky-100 text-sky-700' },
  lips: { bg: 'bg-rose-50', border: 'border-rose-200', accent: 'text-rose-600', ring: 'ring-rose-200', badge: 'bg-rose-100 text-rose-700' },
  eyebrows: { bg: 'bg-violet-50', border: 'border-violet-200', accent: 'text-violet-600', ring: 'ring-violet-200', badge: 'bg-violet-100 text-violet-700' },
  face_shape: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-600', ring: 'ring-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
  face_symmetry: { bg: 'bg-indigo-50', border: 'border-indigo-200', accent: 'text-indigo-600', ring: 'ring-indigo-200', badge: 'bg-indigo-100 text-indigo-700' },
  jaw_chin: { bg: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-600', ring: 'ring-orange-200', badge: 'bg-orange-100 text-orange-700' },
  cheekbones: { bg: 'bg-pink-50', border: 'border-pink-200', accent: 'text-pink-600', ring: 'ring-pink-200', badge: 'bg-pink-100 text-pink-700' },
};

export default function FaceAnalysisResults({ results, selectedImage, onBack }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview | features | recommendations
  const [expandedSummary, setExpandedSummary] = useState(false);

  const prediction = results?.predictionResult;
  const features = prediction?.face_features;
  const recommendations = prediction?.recommendations;
  const humanReadable = prediction?.human_readable;

  if (!prediction) return null;

  const summaryLines = humanReadable ? humanReadable.split('\n').filter(Boolean) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Back button ── */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Upload
      </button>

      {/* ══════════════════════════════════════════════
          HERO SUMMARY CARD
          ══════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-2xl shadow-xl text-white p-8">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          {/* Uploaded image thumbnail */}
          {selectedImage && (
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-lg">
                <img src={selectedImage} alt="Uploaded face" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-200">
                AI Analysis Complete
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Your GlamAi Results
            </h2>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3 mb-4">
              {features?.face_shape?.primary && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  <User className="w-3.5 h-3.5" />
                  {features.face_shape.primary} face
                </span>
              )}
              {features?.eyes?.shape && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  <Eye className="w-3.5 h-3.5" />
                  {features.eyes.shape} eyes
                </span>
              )}
              {features?.face_symmetry?.level && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  <Activity className="w-3.5 h-3.5" />
                  {features.face_symmetry.level}
                </span>
              )}
              {recommendations && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  <Star className="w-3.5 h-3.5" />
                  {recommendations.length} tips
                </span>
              )}
            </div>

            {/* Human-readable summary */}
            {summaryLines.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className={`text-sm leading-relaxed text-blue-100 space-y-1 ${!expandedSummary ? 'line-clamp-3' : ''}`}>
                  {summaryLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                {summaryLines.length > 3 && (
                  <button
                    onClick={() => setExpandedSummary(!expandedSummary)}
                    className="mt-2 text-xs text-blue-200 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {expandedSummary ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {expandedSummary ? 'Show less' : 'Read full analysis'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          TAB NAVIGATION
          ══════════════════════════════════════════════ */}
      <div className="flex bg-white rounded-xl shadow-sm p-1 gap-1">
        {[
          { key: 'overview', label: 'Overview', icon: Activity },
          { key: 'features', label: 'Face Features', icon: Eye },
          { key: 'recommendations', label: 'Recommendations', icon: Sparkles },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === key
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          TAB CONTENT
          ══════════════════════════════════════════════ */}

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Feature highlights grid */}
          {features && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(features).map(([key, value]) => {
                const colors = FEATURE_COLORS[key] || FEATURE_COLORS.nose;
                const label = FEATURE_LABELS[key] || key;
                const icon = FEATURE_ICONS[key] || '✨';
                const primaryValue = value?.primary || value?.shape || value?.level ||
                  value?.fullness || value?.arch || value?.definition ||
                  (value?.jaw ? `${value.jaw} jaw` : null) || '—';

                return (
                  <div
                    key={key}
                    className={`${colors.bg} ${colors.border} border rounded-xl p-4 text-center hover:shadow-md transition-shadow cursor-default`}
                  >
                    <div className="text-2xl mb-2">{icon}</div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    <p className={`text-sm font-bold capitalize ${colors.accent}`}>
                      {primaryValue}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick recommendations preview */}
          {recommendations && recommendations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Top Recommendations
                </h3>
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all →
                </button>
              </div>
              <div className="grid gap-3">
                {recommendations.slice(0, 3).map((rec, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 capitalize">
                        {rec.feature} — {rec.technique}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">{rec.why_it_matches}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── FEATURES TAB ── */}
      {activeTab === 'features' && features && (
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(features).map(([key, value]) => (
            <FeatureCard
              key={key}
              featureKey={key}
              data={value}
              label={FEATURE_LABELS[key] || key}
              icon={FEATURE_ICONS[key] || '✨'}
              colors={FEATURE_COLORS[key] || FEATURE_COLORS.nose}
            />
          ))}
        </div>
      )}

      {/* ── RECOMMENDATIONS TAB ── */}
      {activeTab === 'recommendations' && recommendations && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Personalized makeup & styling techniques based on your unique facial features.
          </p>
          <div className="grid gap-4">
            {recommendations.map((rec, idx) => (
              <RecommendationCard key={idx} recommendation={rec} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
