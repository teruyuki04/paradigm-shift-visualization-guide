import { useState } from 'react'
import { AlertTriangle, ChevronDown } from 'lucide-react'
import { factors, Factor, Question } from './data/questionnaire'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import './App.css'

function ScoreCard({ score, description, variant }: { score: string; description: string; variant: 'high' | 'mid' | 'low' }) {
  const bgColors = {
    high: 'bg-emerald-500/20 border-emerald-500/40',
    mid: 'bg-amber-500/20 border-amber-500/40',
    low: 'bg-red-500/20 border-red-500/40'
  }
  const textColors = {
    high: 'text-emerald-300',
    mid: 'text-amber-300',
    low: 'text-red-300'
  }

  return (
    <div className={`rounded-lg border p-3 ${bgColors[variant]}`}>
      <div className={`text-lg font-bold ${textColors[variant]} mb-1`}>{score}点</div>
      <div className="text-sm text-white/90">{description}</div>
    </div>
  )
}

function QuestionCard({ question, factor, isOpen, onToggle }: { 
  question: Question; 
  factor: Factor; 
  isOpen: boolean; 
  onToggle: () => void 
}) {
  return (
    <div 
      className="rounded-xl border border-white/10 overflow-hidden mb-3 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${factor.gradientColors})`,
        opacity: 0.95
      }}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-start justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-white/20 rounded-md text-sm font-bold text-white">
              {question.id}
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-purple-100">
              {question.mini_note}
            </span>
          </div>
          <div className="text-base md:text-lg text-white font-medium leading-relaxed">
            {question.text}
          </div>
        </div>
        <ChevronDown 
          className={`w-6 h-6 text-white/70 transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

          <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wide mb-1">
                  よくある誤読
                </div>
                <div className="text-sm text-amber-100">
                  {question.misread_warning}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FactorHeader({ factor }: { factor: Factor }) {
  const Icon = factor.icon
  return (
    <div 
      className="rounded-xl p-6 mb-6 border border-white/20"
      style={{
        background: `linear-gradient(135deg, ${factor.gradientColors})`
      }}
    >
      <div className="flex items-center gap-4">
        <div className="text-5xl">{factor.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl font-bold text-white">{factor.name}</span>
            <Icon className="w-8 h-8 text-white/80" />
          </div>
          <div className="text-lg text-purple-100">{factor.nameEn}</div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-white/90">10</div>
          <div className="text-sm text-purple-200">問</div>
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
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            スタートアップ成功の60問診断
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-4">
            6つの質 × 各10問
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            AI審査官ロジックと連携する機械可読な問診票。各質問は5点・3点・1点の評価基準と、よくある誤読の警告を含みます。
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-6 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-gray-300">5点: 優秀</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-gray-300">3点: 標準</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-300">1点: 要改善</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="Q1" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-2 mb-8">
              {factors.map((factor) => {
                const Icon = factor.icon
                return (
                  <TabsTrigger
                    key={factor.id}
                    value={factor.id}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 data-[state=active]:bg-white/20 data-[state=active]:border-white/30 transition-all duration-300 hover:bg-white/10"
                  >
                    <span className="text-xl">{factor.emoji}</span>
                    <span className="hidden md:inline text-sm font-medium text-white">{factor.name}</span>
                    <Icon className="w-4 h-4 text-white/70 hidden sm:block" />
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {factors.map((factor) => (
              <TabsContent key={factor.id} value={factor.id} className="mt-0">
                <FactorHeader factor={factor} />
                
                <div className="flex justify-end gap-3 mb-4">
                  <button
                    onClick={() => expandAll(factor.id)}
                    className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    すべて展開
                  </button>
                  <button
                    onClick={() => collapseAll(factor.id)}
                    className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    すべて閉じる
                  </button>
                </div>

                <ScrollArea className="h-auto max-h-none">
                  <div className="space-y-3">
                    {factor.questions.map((question) => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        factor={factor}
                        isOpen={openQuestions.has(question.id)}
                        onToggle={() => toggleQuestion(question.id)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="text-center mt-12 text-gray-400">
          <p className="text-sm mb-2">
            各質問をクリックすると評価基準と誤読警告が表示されます
          </p>
          <p className="text-xs text-gray-500">
            Version 1.0 | Shiftcraft OS
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire60
