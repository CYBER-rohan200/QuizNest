import fs from 'fs';
import path from 'path';

// Helper to wait to avoid rate limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchTranslation(text, targetLang) {
  if (!text || typeof text !== 'string') return text;
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data[0]?.map(x => x[0]).join('') || text;
  } catch (err) {
    console.error(`Failed to translate "${text}" to ${targetLang}`, err.message);
    return text; // fallback to English
  }
}

async function translateToDict(text) {
  if (!text || typeof text !== 'string') return text;
  
  await delay(150); // Small delay to prevent 429 Too Many Requests
  const hi = await fetchTranslation(text, 'hi');
  const te = await fetchTranslation(text, 'te');
  
  return {
    en: text,
    hi: hi,
    te: te
  };
}

// We will read the exported compiled file
import { QUESTIONS } from './src/data/questions.mjs';

async function processQuestions() {
  console.log(`Found ${QUESTIONS.length} questions to translate...`);
  
  for (let i = 0; i < QUESTIONS.length; i++) {
    const q = QUESTIONS[i];
    console.log(`Processing Question ${i + 1}/${QUESTIONS.length}: ${q.id}`);
    
    if (typeof q.question === 'string') {
      q.question = await translateToDict(q.question);
    } else if (q.question && q.question.en && !q.question.hi) {
      q.question.hi = await fetchTranslation(q.question.en, 'hi');
      q.question.te = await fetchTranslation(q.question.en, 'te');
    }
    
    if (q.options && Array.isArray(q.options)) {
      for (let j = 0; j < q.options.length; j++) {
        if (typeof q.options[j] === 'string') {
          q.options[j] = await translateToDict(q.options[j]);
        }
      }
    }
    
    if (q.correctAnswer && typeof q.correctAnswer === 'string') {
      q.correctAnswer = await translateToDict(q.correctAnswer);
    }
    
    if (q.explanation && typeof q.explanation === 'string') {
      q.explanation = await translateToDict(q.explanation);
    } else if (q.explanation && q.explanation.en && !q.explanation.hi) {
      q.explanation.hi = await fetchTranslation(q.explanation.en, 'hi');
      q.explanation.te = await fetchTranslation(q.explanation.en, 'te');
    }
    
    if (q.pairs && Array.isArray(q.pairs)) {
      for (let j = 0; j < q.pairs.length; j++) {
        if (typeof q.pairs[j].term === 'string') {
          q.pairs[j].term = await translateToDict(q.pairs[j].term);
        }
        if (typeof q.pairs[j].definition === 'string') {
          q.pairs[j].definition = await translateToDict(q.pairs[j].definition);
        }
      }
    }
  }

  console.log('Finished translation! Generating TypeScript file...');
  
  // Format the file
  let finalString = JSON.stringify(QUESTIONS, null, 2);
  
  // Create the final TS content
  const tsContent = `import type { Difficulty } from './subjects'
import type { MultilingualText } from '../utils/getText'

export type QuestionType = 'mcq' | 'drag-drop' | 'puzzle' | 'boss'

export type QuestionRecord = {
  id: string
  subject: string
  chapter: string
  topic: string
  difficulty: Difficulty
  type: QuestionType
  question: string | MultilingualText
  options?: (string | MultilingualText)[]
  correctAnswer?: string | MultilingualText
  explanation?: string | MultilingualText
  /** For drag-drop / puzzle style mini games */
  pairs?: { term: string | MultilingualText; definition: string | MultilingualText }[]
}

export const QUESTIONS: QuestionRecord[] = ${finalString};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/data/questions.ts'), tsContent, 'utf-8');
  console.log('✅ Wrote fully translated data back to src/data/questions.ts');
}

processQuestions().catch(console.error);
