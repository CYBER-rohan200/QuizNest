import type { QuestionRecord } from '../data/questions'

function randomInt(min: number, max: number, excludeZero = false): number {
  let val = Math.floor(Math.random() * (max - min + 1)) + min
  if (excludeZero && val === 0) return randomInt(min, max, excludeZero)
  return val
}

function generateLinearEquation(level: number): QuestionRecord | null {
  // Safe level 1-3
  const diffMode = level <= 1 ? 'easy' : level === 2 ? 'medium' : 'hard'
  const id = `linear-gen-${Date.now()}-${Math.floor(Math.random()*1000)}`
  
  if (diffMode === 'easy') {
    // ax + b = c
    const a = randomInt(2, 6, true)
    const x = randomInt(1, 10, true)
    const b = randomInt(1, 15)
    // to make sure it's an integer solution:
    const c = a * x + b
    
    const wrong1 = x + randomInt(1, 3)
    const wrong2 = x - randomInt(1, 3)
    const wrong3 = x + randomInt(4, 6)
    
    return {
      id,
      subject: 'Mathematics',
      chapter: 'Algebra',
      topic: 'Linear Equations',
      difficulty: 'easy',
      type: 'mcq',
      question: `Solve for x: ${a}x + ${b} = ${c}`,
      options: [`x = ${x}`, `x = ${wrong1}`, `x = ${wrong2}`, `x = ${wrong3}`].sort(() => Math.random() - 0.5),
      correctAnswer: `x = ${x}`,
      explanation: `Subtract ${b} from both sides to get ${a}x = ${c - b}, then divide by ${a} to get x = ${x}.`
    }
  } else if (diffMode === 'medium') {
    // ax + b = cx + d (ensure a != c)
    let a = randomInt(2, 9, true)
    let c = randomInt(2, 9, true)
    if (a === c) c++
    const x = randomInt(1, 8, true)
    const b = randomInt(1, 10)
    // ax + b = cx + d => (a-c)x = d - b => d = (a-c)x + b
    const d = (a - c) * x + b
    
    return {
      id,
      subject: 'Mathematics',
      chapter: 'Algebra',
      topic: 'Linear Equations',
      difficulty: 'medium',
      type: 'mcq',
      question: `Solve for x: ${a}x + ${b} = ${c}x + ${d}`,
      options: [`x = ${x}`, `x = ${x + randomInt(1, 3)}`, `x = ${x - randomInt(1, 3)}`, `x = ${-x}`].sort(() => Math.random() - 0.5),
      correctAnswer: `x = ${x}`,
      explanation: `Group x terms on one side: (${a - c})x = ${d - b}, which means x = ${x}.`
    }
  } else {
    // a(x + b) = c(x + d) => ax + ab = cx + cd => cd = ax + ab - cx
    // Let's guarantee an integer d. Wait, this is getting complicated.
    // Instead just do: ax + b = cx - d (but bigger numbers)
    let a2 = randomInt(5, 12, true)
    let c2 = randomInt(1, 8, true)
    if (a2 === c2) c2--
    const x2 = randomInt(-10, 10, true)
    const b2 = randomInt(-15, 15)
    const d2 = (a2 - c2) * x2 + b2
    
    const b2Str = b2 >= 0 ? `+ ${b2}` : `- ${Math.abs(b2)}`
    const d2Str = d2 >= 0 ? `+ ${d2}` : `- ${Math.abs(d2)}`

    return {
      id,
      subject: 'Mathematics',
      chapter: 'Algebra',
      topic: 'Linear Equations',
      difficulty: 'hard',
      type: 'mcq',
      question: `Solve for x: ${a2}x ${b2Str} = ${c2}x ${d2Str}`,
      options: [`x = ${x2}`, `x = ${x2 + 2}`, `x = ${x2 - 2}`, `x = ${-x2}`].sort(() => Math.random() - 0.5),
      correctAnswer: `x = ${x2}`,
      explanation: `Subtract ${c2}x from both sides. Simplify to find x = ${x2}.`
    }
  }
}

export function generateMathQuestion(topic?: string, level: number = 1): QuestionRecord | null {
  if (topic === 'Linear Equations') {
    return generateLinearEquation(level)
  }
  // Other topics can fallback to static for now.
  return null
}
