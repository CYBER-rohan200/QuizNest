import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SUBJECTS } from '../data/subjects'
import type { Subject, Chapter } from '../data/subjects'
import LearningMap3D from '../components/LearningMap3D'
import { useLevel } from '../context/LevelContext'
import { useTopicProgress } from '../context/TopicProgressContext'
import { useLanguage } from '../context/LanguageContext'
import { getText } from '../utils/getText'
import { UI_TRANSLATIONS } from '../translations/ui'

function SubjectsPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(SUBJECTS[0]?.id ?? '')
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    SUBJECTS[0]?.chapters[0]?.id ?? '',
  )
  const [topicView, setTopicView] = useState<'list' | 'map'>('map')

  const { currentLevel } = useLevel()
  const { getTopicProgressStats } = useTopicProgress()
  const { language } = useLanguage()
  const t = UI_TRANSLATIONS[language]

  const selectedSubject =
    SUBJECTS.find((subject) => subject.id === selectedSubjectId) ?? SUBJECTS[0]

  const selectedChapter =
    selectedSubject?.chapters.find((chapter) => chapter.id === selectedChapterId) ??
    selectedSubject?.chapters[0]

  const navigate = useNavigate()

  function handleSelectSubject(subject: Subject) {
    setSelectedSubjectId(subject.id)
    const firstChapterId = subject.chapters[0]?.id ?? ''
    setSelectedChapterId(firstChapterId)
  }

  function handleSelectChapter(chapter: Chapter) {
    setSelectedChapterId(chapter.id)
  }

  return (
    <div className="section-spacing">
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="page-heading">{t.subjects}</p>
            <h1 className="page-title">{t.pickNextArena}</h1>
            <p className="page-subtitle max-w-xl">
              {t.pickNextArenaDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Subjects column */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t.subjects}
            </h2>
            <div className="space-y-2">
              {SUBJECTS.map((subject) => {
                const isActive = subject.id === selectedSubject?.id
                return (
                  <motion.button
                    key={subject.id}
                    type="button"
                    onClick={() => handleSelectSubject(subject)}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="card-neon-hover group relative w-full overflow-hidden px-5 py-4 text-left"
                  >
                    <div
                      className={`pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br ${subject.colorClass} ${
                        isActive ? 'opacity-40' : 'opacity-0 group-hover:opacity-25'
                      } transition-opacity`}
                    />
                    <div className="relative flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-50">
                          {getText(subject.name, language)}
                        </p>
                        {isActive ? (
                          <span className="text-[10px] font-semibold text-emerald-200">
                            {t.selected}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 group-hover:text-emerald-200">
                            {t.explore}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {getText(subject.description, language)}
                      </p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </section>

          {/* Chapters column */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t.chapters}
            </h2>
            {selectedSubject?.chapters?.length ? (
              <div className="space-y-2">
                {selectedSubject.chapters.map((chapter) => {
                  const isActive = chapter.id === selectedChapter?.id
                  return (
                    <motion.button
                      key={chapter.id}
                      type="button"
                      onClick={() => handleSelectChapter(chapter)}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="card-neon-hover group relative w-full overflow-hidden px-5 py-4 text-left"
                    >
                      <div
                        className={`pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-r from-slate-700/40 via-slate-600/40 to-slate-700/40 ${
                          isActive ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'
                        } transition-opacity`}
                      />
                      <div className="relative flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-50">
                            {getText(chapter.name, language)}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {chapter.topics.length} topic
                            {chapter.topics.length === 1 ? '' : 's'}
                          </p>
                        </div>
                        {isActive ? (
                          <span className="text-[10px] font-semibold text-emerald-200">
                            {t.active}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 group-hover:text-emerald-200">
                            {t.select}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500">
                No chapters yet. Add some to this subject soon.
              </p>
            )}
          </section>

          {/* Topics column */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t.topics}
              </h2>
              {selectedChapter?.topics?.length ? (
                <div className="inline-flex items-center rounded-full border border-emerald-500/40 bg-black/60 p-0.5 text-[10px] text-slate-300">
                  <button
                    type="button"
                    onClick={() => setTopicView('list')}
                    className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                      topicView === 'list'
                        ? 'bg-emerald-500/30 text-emerald-50'
                        : 'text-slate-400 hover:text-emerald-200'
                    }`}
                  >
                    {t.listList}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTopicView('map')}
                    className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                      topicView === 'map'
                        ? 'bg-emerald-500/30 text-emerald-50'
                        : 'text-slate-400 hover:text-emerald-200'
                    }`}
                  >
                    {t.map3d}
                  </button>
                </div>
              ) : null}
            </div>
            {selectedChapter?.topics?.length ? (
              topicView === 'list' ? (
                <div className="space-y-2">
                  {selectedChapter.topics.map((topic) => {
                    const isHard = topic.difficulty === 'hard'
                    const unlockAtLevel = isHard ? 5 : undefined
                    const isLocked = isHard && currentLevel < (unlockAtLevel ?? 1)
                    const progress = getTopicProgressStats(selectedSubject.id, selectedChapter.id, topic.id)
                    const { mastered, questionsAttempted, accuracyPercent } = progress

                    return (
                      <motion.button
                        key={topic.id}
                        type="button"
                        disabled={isLocked}
                        onClick={() => {
                          if (isLocked) return
                          navigate(`/quiz/${topic.id}`, {
                            state: {
                              subjectId: selectedSubject.id,
                              subjectName: getText(selectedSubject.name, language),
                              chapterId: selectedChapter.id,
                              chapterName: getText(selectedChapter.name, language),
                              topicId: topic.id,
                              topicName: getText(topic.name, language),
                            },
                          })
                        }}
                        whileHover={isLocked ? undefined : { y: -2, scale: 1.01 }}
                        whileTap={isLocked ? undefined : { scale: 0.99 }}
                        className={`card-neon-hover group relative w-full overflow-hidden px-4 py-3 text-left ${
                          isLocked ? 'cursor-not-allowed opacity-60 saturate-75' : ''
                        }`}
                        title={
                          isLocked && unlockAtLevel
                            ? `Unlock at Level ${unlockAtLevel}`
                            : undefined
                        }
                      >
                        <div
                          className={`pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-r ${
                            isHard
                              ? 'from-fuchsia-500/40 via-rose-500/40 to-amber-400/40'
                              : 'from-emerald-500/30 via-cyan-400/30 to-slate-500/30'
                          } opacity-0 group-hover:opacity-25 transition-opacity`}
                        />
                        <div className="relative flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-50">
                              {getText(topic.name, language)}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              ~{topic.estimatedMinutes} min ·{' '}
                              <span
                                className={
                                  topic.difficulty === 'easy'
                                    ? 'text-emerald-300'
                                    : topic.difficulty === 'medium'
                                    ? 'text-cyan-300'
                                    : 'text-rose-300'
                                }
                              >
                                {topic.difficulty.toUpperCase()}
                              </span>
                              {questionsAttempted > 0 && (
                                <>
                                  {' · '}
                                  <span className="text-slate-300">
                                    {questionsAttempted} attempted
                                    {typeof accuracyPercent === 'number'
                                      ? ` · ${accuracyPercent}% accuracy`
                                      : ''}
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {mastered ? (
                              <span
                                className="inline-flex items-center gap-1 rounded-full border border-amber-400/70 bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-100"
                                title="Mastered (≥70% accuracy)"
                              >
                                <span aria-hidden>⭐</span>
                                Mastered
                              </span>
                            ) : null}
                            {isHard ? (
                              <div className="flex items-center gap-1 rounded-full border border-amber-400/70 bg-amber-500/15 px-2 py-0.5">
                                <span aria-hidden className="text-xs">
                                  {isLocked ? '🔒' : '🔥'}
                                </span>
                                <span className="text-[10px] font-semibold text-amber-100">
                                  {isLocked ? `Unlock Lv. ${unlockAtLevel}` : 'Challenge Mode'}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              ) : (
                <LearningMap3D
                  topics={selectedChapter.topics.map((topic) => {
                    const isBoss = topic.difficulty === 'hard'
                    const unlockAtLevel = isBoss ? 5 : undefined
                    const isLocked = isBoss && currentLevel < (unlockAtLevel ?? 1)
                    const progress = getTopicProgressStats(selectedSubject.id, selectedChapter.id, topic.id)
                    return {
                      id: topic.id,
                      name: getText(topic.name, language),
                      difficulty: topic.difficulty,
                      locked: isLocked,
                      unlockAtLevel,
                      mastered: progress.mastered,
                    }
                  })}
                  onSelectTopic={(topicId) => {
                    const topic = selectedChapter.topics.find((t) => t.id === topicId)
                    if (!topic) return
                    navigate(`/quiz/${topic.id}`, {
                      state: {
                        subjectId: selectedSubject.id,
                        subjectName: getText(selectedSubject.name, language),
                        chapterId: selectedChapter.id,
                        chapterName: getText(selectedChapter.name, language),
                        topicId: topic.id,
                        topicName: getText(topic.name, language),
                      },
                    })
                  }}
                />
              )
            ) : (
              <p className="text-[11px] text-slate-500">
                Pick a chapter to see its topics.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default SubjectsPage

