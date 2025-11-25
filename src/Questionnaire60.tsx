import { useState } from 'react'
import { AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react'
import { factors, Factor, Question } from './data/questionnaire'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import './App.css'

function ScoreCard({ score, description, variant }: { score: string; description: string; variant: 'high' | 'mid' | 'low' }) {
  const styles = {
    high: {
      bg: 'bg-emerald-500/15 border-emerald-500/30 hover:bg-emerald-500/20',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/30 text-emerald-300'
    },
    mid: {
      bg: 'bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/20',
      text: 'text-amber-400',
      badge: 'bg-amber-500/30 text-amber-300'
    },
    low: {
      bg: 'bg-red-500/15 border-red-500/30 hover:bg-red-500/20',
      text: 'text-red-400',
      badge: 'bg-red-500/30 text-red-300'
    }
  }

  const style = styles[variant]

  return (
    <div className={`rounded-xl border-2 p-4 transition-all duration-200 ${style.bg}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold ${style.badge}`}>
          {score}
        </span>
        <span className={`text-xs font-medium uppercase tracking-wider ${style.text}`}>
          {variant === 'high' ? '優秀' : variant === 'mid' ? '標準' : '要改善'}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-white/85">{description}</p>
    </div>
  )
}

function QuestionCard({ question, factor, isOpen, onToggle, index }: { 
  question: Question; 
  factor: Factor; 
  isOpen: boolean; 
  onToggle: () => void;
  index: number;
}) {
  return (
    <div 
      className="rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 bg-white/5 backdrop-blur-sm hover:bg-white/8"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-5 flex items-start gap-4 text-left transition-colors"
      >
        <div 
          className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl"
          style={{
            background: `linear-gradient(135deg, ${factor.gradientColors})`
          }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-white/10 rounded-lg text-xs font-semibold text-white/90">
              {question.id}
            </span>
            <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-200 font-medium">
              {question.mini_note}
            </span>
          </div>
          <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed pr-2">
            {question.text}
          </p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/50" />
          ) : (
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/50" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 md:px-5 pb-5 pt-2 space-y-5 border-t border-white/10 bg-black/20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <ScoreCard 
              score="5" 
              description={question.scoring_examples["5"]} 
              variant="high" 
            />
            <ScoreCard 
              score="3" 
              description={question.scoring_examples["3"]} 
              variant="mid" 
            />
            <ScoreCard 
              score="1" 
              description={question.scoring_examples["1"]} 
              variant="low" 
            />
          </div>

          <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
                  よくある誤読
                </p>
                <p className="text-sm text-amber-100/90 leading-relaxed">
                  {question.misread_warning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FactorHeader({ factor, questionCount }: { factor: Factor; questionCount: number }) {
  const Icon = factor.icon
  return (
    <div 
      className="rounded-2xl p-5 md:p-6 mb-6 border border-white/20 shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${factor.gradientColors})`
      }}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl md:text-5xl">{factor.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
            <h3 className="text-xl md:text-2xl font-bold text-white truncate">{factor.name}</h3>
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white/70 flex-shrink-0" />
          </div>
          <p className="text-sm md:text-base text-white/80">{factor.nameEn}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-3xl md:text-4xl font-bold text-white/90">{questionCount}</div>
          <div className="text-xs md:text-sm text-white/70">問</div>
        </div>
      </div>
    </div>
  )
}

function Questionnaire60() {
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const expandAll = (factorId: string) => {
    const factor = factors.find(f => f.id === factorId)
    if (factor) {
      setOpenQuestions(prev => {
        const next = new Set(prev)
        factor.questions.forEach(q => next.add(q.id))
        return next
      })
    }
  }

  const collapseAll = (factorId: string) => {
    const factor = factors.find(f => f.id === factorId)
    if (factor) {
      setOpenQuestions(prev => {
        const next = new Set(prev)
        factor.questions.forEach(q => next.delete(q.id))
        return next
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 md:py-12 pt-20 md:pt-24">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">
            スタートアップ成功の<br className="sm:hidden" />60問診断
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-300 mb-3 md:mb-4">
            6つの質 × 各10問
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            AI審査官ロジックと連携する機械可読な問診票。各質問は5点・3点・1点の評価基準と、よくある誤読の警告を含みます。
          </p>
        </header>

        <div className="mb-6 md:mb-8 flex justify-center px-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"></div>
              <span className="text-xs sm:text-sm text-gray-300">5点: 優秀</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/30"></div>
              <span className="text-xs sm:text-sm text-gray-300">3点: 標準</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30"></div>
              <span className="text-xs sm:text-sm text-gray-300">1点: 要改善</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="Q1" className="w-full">
            <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 gap-2 bg-transparent h-auto p-0 mb-6 md:mb-8">
              {factors.map((factor) => {
                const Icon = factor.icon
                return (
                  <TabsTrigger
                    key={factor.id}
                    value={factor.id}
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-3 sm:py-4 rounded-xl border-2 border-white/10 bg-white/5 data-[state=active]:border-purple-500/50 data-[state=active]:bg-purple-500/20 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/20 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                  >
                    <span className="text-xl sm:text-2xl">{factor.emoji}</span>
                    <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1.5">
                      <span className="text-xs font-semibold text-white/90">{factor.id}</span>
                      <Icon className="w-3.5 h-3.5 text-white/60 hidden sm:block" />
                    </div>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {factors.map((factor) => (
              <TabsContent key={factor.id} value={factor.id} className="mt-0 focus-visible:outline-none">
                <FactorHeader factor={factor} questionCount={factor.questions.length} />
                
                <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 mb-4 md:mb-6">
                  <button
                    onClick={() => expandAll(factor.id)}
                    className="px-4 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20"
                  >
                    すべて展開
                  </button>
                  <button
                    onClick={() => collapseAll(factor.id)}
                    className="px-4 py-2.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20"
                  >
                    すべて閉じる
                  </button>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {factor.questions.map((question, index) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      factor={factor}
                      isOpen={openQuestions.has(question.id)}
                      onToggle={() => toggleQuestion(question.id)}
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <footer className="text-center mt-10 md:mt-12 text-gray-400 px-4">
          <p className="text-xs sm:text-sm mb-2">
            各質問をクリックすると評価基準と誤読警告が表示されます
          </p>
          <p className="text-xs text-gray-500">
            Version 1.0 | Shiftcraft OS
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Questionnaire60
