import { useState } from 'react'
import { Lightbulb, Wrench, DollarSign, Rocket, Users, Globe2, LucideIcon } from 'lucide-react'
import './App.css'

interface Question {
  number: string
  emoji: string
  name: string
  nameEn: string
  definition: string
  keyPoints: string[]
  color: string
  icon: LucideIcon
}

function SixQuestions() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)

  const questions: Question[] = [
    {
      number: "①",
      emoji: "💡",
      name: "課題仮説の質",
      nameEn: "Problem Quality",
      definition: "本質的な課題を見抜き、隠れた真実を発見する力",
      keyPoints: [
        "構造的ニーズの洞察",
        "隠れた真実の発見",
        "社会的「意味」の捉え直し"
      ],
      color: "from-red-600 to-orange-600",
      icon: Lightbulb
    },
    {
      number: "②",
      emoji: "🔧",
      name: "ソリューション仮説の質",
      nameEn: "Solution Quality",
      definition: "技術的・構造的・制度的な制約を突破する設計力",
      keyPoints: [
        "技術的限界・構造的歪み・制度的制約の突破方向",
        "「本質的解決」の設計力"
      ],
      color: "from-orange-600 to-yellow-600",
      icon: Wrench
    },
    {
      number: "③",
      emoji: "💰",
      name: "ビジネスモデルの質",
      nameEn: "Business Model Quality",
      definition: "小市場独占から拡大・拡張へと続く勝ち筋の設計",
      keyPoints: [
        "小市場独占 → 拡大 → 拡張の勝ち筋設計",
        "オープン／クローズ戦略の最適化"
      ],
      color: "from-yellow-600 to-green-600",
      icon: DollarSign
    },
    {
      number: "④",
      emoji: "🚀",
      name: "仮説実装の質",
      nameEn: "Execution Quality",
      definition: "MVP構築からPMF達成、売上再現までの実行力",
      keyPoints: [
        "MVP → PMF → 売上再現の実行力",
        "学習速度・改善速度・実装精度"
      ],
      color: "from-green-600 to-cyan-600",
      icon: Rocket
    },
    {
      number: "⑤",
      emoji: "👥",
      name: "成長する組織の質",
      nameEn: "Scalable Organization Quality",
      definition: "多人数でも設計図が自律的に回る組織構造の構築",
      keyPoints: [
        "多人数でも設計図（①〜④）が自律的に回る組織構造",
        "権限移譲・標準化・ミドル育成・分業構造の設計"
      ],
      color: "from-cyan-600 to-blue-600",
      icon: Users
    },
    {
      number: "⑥",
      emoji: "🌍",
      name: "社会構造変革の質",
      nameEn: "Meta-Structural Shift Quality",
      definition: "制度・文化・価値観のレイヤーを巻き込む変革力",
      keyPoints: [
        "制度・文化・価値観のレイヤーを巻き込む力",
        "隣接市場の自動拡張（Adjacent Amplification）",
        "社会的語り（Narrative）による規範形成",
        "エコシステム・制度の再構築"
      ],
      color: "from-blue-600 to-purple-600",
      icon: Globe2
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            スタートアップ成功の6つの質
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-300 mb-6">
            Shiftcraft OS
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            スタートアップが成功するために必要な6つの質を可視化するフレームワーク
          </p>
        </div>

        {/* Questions Visualization */}
        <div className="max-w-6xl mx-auto space-y-4">
          {questions.map((question, index) => {
            const Icon = question.icon
            const isSelected = selectedQuestion === index
            
            return (
              <div
                key={index}
                className={`
                  relative overflow-hidden rounded-2xl border-2 border-white/10
                  transition-all duration-500 cursor-pointer
                  ${isSelected ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'}
                `}
                onClick={() => setSelectedQuestion(isSelected ? null : index)}
                style={{
                  background: `linear-gradient(135deg, ${
                    index === 0 ? '#dc2626, #ea580c' :
                    index === 1 ? '#ea580c, #ca8a04' :
                    index === 2 ? '#ca8a04, #16a34a' :
                    index === 3 ? '#16a34a, #0891b2' :
                    index === 4 ? '#0891b2, #2563eb' :
                    '#2563eb, #7c3aed'
                  })`,
                  minHeight: isSelected ? '200px' : '120px'
                }}
              >
                <div className="p-6 md:p-8">
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl md:text-6xl">{question.emoji}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {question.number}
                          </span>
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {question.name}
                          </span>
                        </div>
                        <div className="text-lg md:text-xl text-purple-100 font-medium">
                          {question.nameEn}
                        </div>
                      </div>
                    </div>
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-white/80" />
                  </div>

                  {/* Question Content */}
                  <div className={`space-y-3 ${isSelected ? 'opacity-100' : 'opacity-90'}`}>
                    {/* Definition */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-sm font-semibold text-purple-200 mb-1">定義</div>
                      <div className="text-base md:text-lg text-white font-medium">
                        {question.definition}
                      </div>
                    </div>

                    {/* Key Points - Show when selected */}
                    {isSelected && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm font-semibold text-purple-200 mb-3">
                          重要ポイント
                        </div>
                        <div className="space-y-2">
                          {question.keyPoints.map((point, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3"
                            >
                              <span className="text-purple-300 mt-1">•</span>
                              <span className="text-base md:text-lg text-white font-medium flex-1">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Compact view when not selected */}
                    {!isSelected && (
                      <div className="text-sm text-purple-100">
                        {question.keyPoints.length}つの重要ポイント
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
            各質問をクリックすると詳細情報が表示されます
          </p>
        </div>
      </div>
    </div>
  )
}

export default SixQuestions
