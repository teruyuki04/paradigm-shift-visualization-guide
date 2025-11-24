import { useState } from 'react'
import { TrendingUp, Sparkles, Building2, Scale, Globe, Zap, ArrowLeftRight, LucideIcon } from 'lucide-react'
import SixQuestions from './SixQuestions'
import './App.css'

interface Layer {
  level: string
  emoji: string
  name: string
  nameEn: string
  definition: string
  metrics: string
  examples: string[]
  color: string
  icon: LucideIcon
}

function ParadigmShift() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)

  const layers: Layer[] = [
    {
      level: "Ⅴ",
      emoji: "🌍",
      name: "パラダイムシフト",
      nameEn: "Paradigm Shift",
      definition: "社会的価値観・生活様式を変え、文化的規範として定着",
      metrics: "ARR 300億円〜、文化現象化、海外波及",
      examples: ["Airbnb", "OpenAI", "Tesla"],
      color: "from-purple-600 to-pink-600",
      icon: Globe
    },
    {
      level: "Ⅳ",
      emoji: "⚖️",
      name: "システムシフト",
      nameEn: "Systemic Shift",
      definition: "行政・規制・業界団体と連携し、新しい制度・仕組みを実装",
      metrics: "ARR 100億円〜、社会制度・政策連動、IPO〜上場後",
      examples: ["メルカリ", "PayPay", "BASE"],
      color: "from-blue-600 to-purple-600",
      icon: Scale
    },
    {
      level: "Ⅲ",
      emoji: "🏗️",
      name: "構造シフト",
      nameEn: "Structural Shift",
      definition: "既存プレイヤーを巻き込み、市場ルールや取引構造を再定義",
      metrics: "ARR 20〜100億円、業界標準化、シリーズC〜D",
      examples: ["Sansan", "freee"],
      color: "from-cyan-600 to-blue-600",
      icon: Building2
    },
    {
      level: "Ⅱ",
      emoji: "🌱",
      name: "変化萌芽シフト",
      nameEn: "Emerging Shift",
      definition: "新しい顧客・市場構造を形成し始める。既存業界の\"隙間\"で成立",
      metrics: "ARR 5〜20億円、PoC成功、シリーズB前後",
      examples: ["ココナラ", "クラウドワークス"],
      color: "from-green-600 to-cyan-600",
      icon: Sparkles
    },
    {
      level: "Ⅰ",
      emoji: "⚡",
      name: "最小シフト",
      nameEn: "Minimal Shift",
      definition: "既存市場の改善型モデル。技術・UX改善中心",
      metrics: "ARR 1〜5億円、NPS改善、初期顧客獲得",
      examples: ["SmartHR（初期）", "HENNGE"],
      color: "from-yellow-600 to-green-600",
      icon: Zap
    },
    {
      level: "0️⃣",
      emoji: "🔄",
      name: "プレシフト",
      nameEn: "Pre-Shift",
      definition: "PMF前。事業仮説が崩壊、再構築中",
      metrics: "ARR < 1億円、事業転換中、資金調達停止",
      examples: ["ピボット中スタートアップ"],
      color: "from-gray-600 to-yellow-600",
      icon: TrendingUp
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            パラダイムシフト
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-300 mb-6">
            6階層フレームワーク
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            スタートアップの成長段階を可視化する、事業構造の変化を捉える6つの階層
          </p>
        </div>

        {/* Layers Visualization */}
        <div className="max-w-6xl mx-auto space-y-4">
          {layers.map((layer, index) => {
            const Icon = layer.icon
            const isSelected = selectedLayer === index
            
            return (
              <div
                key={index}
                className={`
                  relative overflow-hidden rounded-2xl border-2 border-white/10
                  transition-all duration-500 cursor-pointer
                  ${isSelected ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'}
                `}
                onClick={() => setSelectedLayer(isSelected ? null : index)}
                style={{
                  background: `linear-gradient(135deg, ${
                    index === 0 ? '#7c3aed, #db2777' :
                    index === 1 ? '#2563eb, #7c3aed' :
                    index === 2 ? '#0891b2, #2563eb' :
                    index === 3 ? '#059669, #0891b2' :
                    index === 4 ? '#ca8a04, #059669' :
                    '#4b5563, #ca8a04'
                  })`,
                  minHeight: isSelected ? '200px' : '120px'
                }}
              >
                <div className="p-6 md:p-8">
                  {/* Layer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl md:text-6xl">{layer.emoji}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {layer.level}
                          </span>
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {layer.name}
                          </span>
                        </div>
                        <div className="text-lg md:text-xl text-purple-100 font-medium">
                          {layer.nameEn}
                        </div>
                      </div>
                    </div>
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-white/80" />
                  </div>

                  {/* Layer Content - Always visible but compact when not selected */}
                  <div className={`space-y-3 ${isSelected ? 'opacity-100' : 'opacity-90'}`}>
                    {/* Definition */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-sm font-semibold text-purple-200 mb-1">定義</div>
                      <div className="text-base md:text-lg text-white font-medium">
                        {layer.definition}
                      </div>
                    </div>

                    {/* Metrics and Examples - Show when selected or always show in compact form */}
                    {isSelected && (
                      <>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-sm font-semibold text-purple-200 mb-1">
                            到達指標
                          </div>
                          <div className="text-base md:text-lg text-white font-medium">
                            {layer.metrics}
                          </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-sm font-semibold text-purple-200 mb-2">
                            代表企業
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {layer.examples.map((example, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm md:text-base"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {!isSelected && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-purple-100">
                          {layer.metrics}
                        </div>
                        <div className="flex gap-2">
                          {layer.examples.map((example, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-medium"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Click hint */}
                  {!isSelected && (
                    <div className="text-center mt-3 text-purple-200 text-sm">
                      クリックして詳細を表示
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">
            各階層をクリックすると詳細情報が表示されます
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState<'paradigm' | 'questions'>('paradigm')

  return (
    <div className="relative">
      {/* Navigation Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setCurrentView(currentView === 'paradigm' ? 'questions' : 'paradigm')}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20"
        >
          <ArrowLeftRight className="w-5 h-5" />
          <span className="text-sm md:text-base">
            {currentView === 'paradigm' ? '6つの質へ' : '6階層へ'}
          </span>
        </button>
      </div>

      {/* View Content */}
      {currentView === 'paradigm' ? <ParadigmShift /> : <SixQuestions />}
    </div>
  )
}

export default App
