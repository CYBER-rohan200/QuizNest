import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SUBJECTS } from '../data/subjects'
import type { Subject, Chapter, Topic } from '../data/subjects'
import TopicMatchGame from '../components/games/TopicMatchGame'
import TopicFlashcards from '../components/games/TopicFlashcards'
import MatchGameCanvas from '../components/games/MatchGameCanvas'
import { useLevel } from '../context/LevelContext'
import { useStreak } from '../context/StreakContext'
import { getQuestions } from '../services/questionEngine'
import {
  canonicalSubjectName,
  canonicalChapterName,
  canonicalTopicName,
} from '../services/topicLookup'
import { useLanguage } from '../context/LanguageContext'
import { getText } from '../utils/getText'
import { UI_TRANSLATIONS } from '../translations/ui'

type GameMode = 'match' | 'flashcards'

function MiniGamesPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(SUBJECTS[0])
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(
    SUBJECTS[0]?.chapters[0] ?? ({} as Chapter)
  )
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [gameMode, setGameMode] = useState<GameMode>('match')
  const { currentLevel } = useLevel()
  const { markDailyActivityComplete } = useStreak()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]

  const chapter = selectedSubject.chapters.find((c) => c.id === selectedChapter.id)
  const topics = chapter?.topics ?? []

  const [miniGamePairs, setMiniGamePairs] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchMiniGamePairs() {
      if (!selectedTopic || !chapter) {
        setMiniGamePairs(null)
        return
      }

      setIsLoading(true)
      const subjectName = canonicalSubjectName(selectedSubject.id, chapter.id)
      const chapterName = canonicalChapterName(chapter.id, getText(chapter.name, 'en'))
      const topicName = canonicalTopicName(selectedTopic.id, getText(selectedTopic.name, 'en'))

      const questions = await getQuestions({
        subject: subjectName,
        chapter: chapterName,
        topic: topicName,
        level: currentLevel,
        mode: 'minigame',
      })

      const dragDrop = questions.find((q) => q.type === 'drag-drop' && q.pairs && q.pairs.length)
      setMiniGamePairs(dragDrop?.pairs ?? null)
      setIsLoading(false)
    }
    fetchMiniGamePairs()
  }, [selectedTopic, chapter, selectedSubject.id, currentLevel])

  function handleSelectSubject(subject: Subject) {
    setSelectedSubject(subject)
    const first = subject.chapters[0]
    setSelectedChapter(first ?? ({} as Chapter))
    setSelectedTopic(null)
  }

  function handleSelectChapter(ch: Chapter) {
    setSelectedChapter(ch)
    setSelectedTopic(null)
  }

  function handleSelectTopic(topic: Topic) {
    setSelectedTopic(topic)
  }

  return (
    <div className="section-spacing">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="space-y-6"
      >
        <div>
          <p className="page-heading">{t.playMinigames}</p>
          <h1 className="page-title">{t.visLearning}</h1>
          <p className="page-subtitle max-w-xl">
            {t.visLearningDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Subject & Chapter & Topic selector */}
          <section className="lg:col-span-1 space-y-4">
            <div className="rounded-2xl border border-emerald-500/40 bg-black/60 overflow-hidden shadow-[0_0_24px_rgba(16,185,129,0.3)]">
              <div className="border-b border-emerald-500/30 px-4 py-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {t.subjects}
                </h2>
              </div>
              <div className="p-2 space-y-1">
                {SUBJECTS.map((s) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectSubject(s)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      selectedSubject.id === s.id
                        ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/50'
                        : 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-100'
                    }`}
                  >
                    {getText(s.name, language)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-black/60 overflow-hidden shadow-[0_0_24px_rgba(16,185,129,0.3)]">
              <div className="border-b border-emerald-500/30 px-4 py-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {t.chapters}
                </h2>
              </div>
              <div className="p-2 space-y-1">
                {selectedSubject.chapters.map((ch) => (
                  <motion.button
                    key={ch.id}
                    type="button"
                    onClick={() => handleSelectChapter(ch)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      selectedChapter.id === ch.id
                        ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/50'
                        : 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-100'
                    }`}
                  >
                    {getText(ch.name, language)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/40 bg-black/60 overflow-hidden shadow-[0_0_24px_rgba(16,185,129,0.3)]">
              <div className="border-b border-emerald-500/30 px-4 py-3">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {t.topics}
                </h2>
              </div>
              <div className="p-2 space-y-1">
                {topics.map((t) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTopic(t)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      selectedTopic?.id === t.id
                        ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/50 font-medium'
                        : 'text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-100'
                    }`}
                  >
                    <span className="block font-medium">{getText(t.name, language)}</span>
                    <span
                      className={`text-[10px] ${
                        t.difficulty === 'easy'
                          ? 'text-emerald-400/80'
                          : t.difficulty === 'medium'
                            ? 'text-cyan-400/80'
                            : 'text-rose-400/80'
                      }`}
                    >
                      {t.difficulty.toUpperCase()} · ~{t.estimatedMinutes} min
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Game area */}
          <section className="lg:col-span-2">
            {selectedTopic ? (
              <div className="card-neon p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-lg font-semibold text-emerald-100">
                    {getText(selectedTopic.name, language)}
                  </h2>
                  <div className="flex rounded-lg border border-emerald-500/40 bg-black/60 p-0.5">
                    <button
                      type="button"
                      onClick={() => setGameMode('match')}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        gameMode === 'match'
                          ? 'bg-emerald-500/30 text-emerald-100'
                          : 'text-slate-400 hover:text-emerald-200'
                      }`}
                    >
                      {t.matchTerms}
                    </button>
                    <button
                      type="button"
                      onClick={() => setGameMode('flashcards')}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        gameMode === 'flashcards'
                          ? 'bg-emerald-500/30 text-emerald-100'
                          : 'text-slate-400 hover:text-emerald-200'
                      }`}
                    >
                      {t.flashcards}
                    </button>
                  </div>
                </div>
                {isLoading ? (
                  <div className="py-20 flex flex-col items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-4" />
                    <p className="text-emerald-300 text-sm font-medium animate-pulse">Loading visualization data...</p>
                  </div>
                ) : gameMode === 'match' ? (
                  <TopicMatchGame
                    topicName={getText(selectedTopic.name, language)}
                    pairs={miniGamePairs ?? selectedTopic.visualizationPairs}
                    onComplete={markDailyActivityComplete}
                  />
                ) : (
                  <TopicFlashcards
                    topicName={getText(selectedTopic.name, language)}
                    pairs={miniGamePairs ?? selectedTopic.visualizationPairs}
                    onComplete={markDailyActivityComplete}
                  />
                )}
              </div>
            ) : (
              <div className="card-neon p-6 md:p-8 text-center">
                <p className="text-emerald-200/80 text-sm">
                  {t.chooseTopicStart}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {t.orTryClassic}
                </p>
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-black/60 overflow-hidden">
                  <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/40">
                    {t.classicDragDrop}
                  </h3>
                  <div className="p-4">
                    <MatchGameCanvas />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </motion.div>
    </div>
  )
}

export default MiniGamesPage
