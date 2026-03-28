import type { Difficulty } from './subjects'
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

export const QUESTIONS: QuestionRecord[] = [
  {
    "id": "math-algebra-linear-e-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Solve: 2x + 3 = 7",
      "hi": "हल करें: 2x + 3 = 7",
      "te": "పరిష్కరించండి: 2x + 3 = 7"
    },
    "options": [
      {
        "en": "x = 1",
        "hi": "एक्स = 1",
        "te": "x = 1"
      },
      {
        "en": "x = 2",
        "hi": "एक्स = 2",
        "te": "x = 2"
      },
      {
        "en": "x = 3",
        "hi": "एक्स = 3",
        "te": "x = 3"
      },
      {
        "en": "x = 4",
        "hi": "एक्स = 4",
        "te": "x = 4"
      }
    ],
    "correctAnswer": {
      "en": "x = 2",
      "hi": "एक्स = 2",
      "te": "x = 2"
    },
    "explanation": {
      "en": "Subtract 3 from both sides to get 2x = 4, then divide by 2 to get x = 2.",
      "hi": "दोनों पक्षों से 3 घटाएं जिससे 2x = 4 प्राप्त हो, फिर 2 से भाग दें जिससे x = 2 प्राप्त हो।",
      "te": "రెండు వైపుల నుండి 3 తీసివేసి 2x = 4 పొందండి, ఆపై 2 తో భాగించండి x = 2 పొందడానికి."
    }
  },
  {
    "id": "math-algebra-linear-e-2",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Which of the following is a linear equation in x?",
      "hi": "निम्नलिखित में से कौन सा x में एक रैखिक समीकरण है?",
      "te": "కింది వాటిలో xలో సరళ సమీకరణం ఏది?"
    },
    "options": [
      {
        "en": "x² + 3x = 0",
        "hi": "x² + 3x = 0",
        "te": "x² + 3x = 0"
      },
      {
        "en": "2x + 5 = 9",
        "hi": "2x + 5 = 9",
        "te": "2x + 5 = 9"
      },
      {
        "en": "x³ - 1 = 0",
        "hi": "x³ - 1 = 0",
        "te": "x³ - 1 = 0"
      },
      {
        "en": "x² + 1 = 0",
        "hi": "x² + 1 = 0",
        "te": "x² + 1 = 0"
      }
    ],
    "correctAnswer": {
      "en": "2x + 5 = 9",
      "hi": "2x + 5 = 9",
      "te": "2x + 5 = 9"
    },
    "explanation": {
      "en": "A linear equation has the variable only to the first power, like 2x + 5 = 9.",
      "hi": "एक रैखिक समीकरण में केवल पहली घात तक ही चर होता है, जैसे 2x + 5 = 9।",
      "te": "సరళ సమీకరణం 2x + 5 = 9 వంటి మొదటి శక్తికి మాత్రమే వేరియబుల్‌ను కలిగి ఉంటుంది."
    }
  },
  {
    "id": "math-algebra-linear-drag-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "easy",
    "type": "drag-drop",
    "question": {
      "en": "Match each linear concept with its meaning.",
      "hi": "प्रत्येक रैखिक अवधारणा का उसके अर्थ से मिलान करें।",
      "te": "ప్రతి సరళ భావనను దాని అర్థంతో సరిపోల్చండి."
    },
    "pairs": [
      {
        "term": {
          "en": "Slope",
          "hi": "ढलान",
          "te": "వాలు"
        },
        "definition": {
          "en": "Rate of change; rise over run",
          "hi": "परिवर्तन की दर; दौड़ से ऊपर उठना",
          "te": "మార్పు రేటు; పరుగు మీద పెరుగుతుంది"
        }
      },
      {
        "term": {
          "en": "y-intercept",
          "hi": "Y- अंत",
          "te": "y-అంతరాయం"
        },
        "definition": {
          "en": "Point where the line crosses the y-axis",
          "hi": "वह बिंदु जहां रेखा y-अक्ष को पार करती है",
          "te": "రేఖ y-అక్షాన్ని దాటే ప్రదేశాన్ని సూచించండి"
        }
      },
      {
        "term": {
          "en": "ax + b = 0",
          "hi": "कुल्हाड़ी + बी = 0",
          "te": "గొడ్డలి + బి = 0"
        },
        "definition": {
          "en": "Standard form of a linear equation",
          "hi": "रैखिक समीकरण का मानक रूप",
          "te": "సరళ సమీకరణం యొక్క ప్రామాణిక రూపం"
        }
      },
      {
        "term": {
          "en": "Linear",
          "hi": "रेखीय",
          "te": "లీనియర్"
        },
        "definition": {
          "en": "First-degree; graph is a straight line",
          "hi": "पहला डिग्री; ग्राफ़ एक सीधी रेखा है",
          "te": "ఫస్ట్-డిగ్రీ; గ్రాఫ్ ఒక సరళ రేఖ"
        }
      }
    ]
  },
  {
    "id": "math-algebra-quadratic-m-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Quadratic Equations",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "The graph of a quadratic function is called a…",
      "hi": "द्विघात फलन के ग्राफ़ को कहा जाता है…",
      "te": "క్వాడ్రాటిక్ ఫంక్షన్ యొక్క గ్రాఫ్‌ని ఒక…"
    },
    "options": [
      {
        "en": "Line",
        "hi": "रेखा",
        "te": "లైన్"
      },
      {
        "en": "Circle",
        "hi": "घेरा",
        "te": "సర్కిల్"
      },
      {
        "en": "Parabola",
        "hi": "परवलय",
        "te": "పరబోలా"
      },
      {
        "en": "Hyperbola",
        "hi": "अतिशयोक्ति",
        "te": "హైపర్బోలా"
      }
    ],
    "correctAnswer": {
      "en": "Parabola",
      "hi": "परवलय",
      "te": "పరబోలా"
    },
    "explanation": {
      "en": "Quadratic functions have U-shaped graphs called parabolas.",
      "hi": "द्विघात फलनों में U-आकार के ग्राफ़ होते हैं जिन्हें परवलय कहा जाता है।",
      "te": "చతురస్రాకార విధులు పారాబొలాస్ అని పిలువబడే U- ఆకారపు గ్రాఫ్‌లను కలిగి ఉంటాయి."
    }
  },
  {
    "id": "math-algebra-quadratic-h-boss-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Quadratic Equations",
    "difficulty": "hard",
    "type": "boss",
    "question": {
      "en": "Solve: x² - 5x + 6 = 0",
      "hi": "हल करें: x² - 5x + 6 = 0",
      "te": "పరిష్కరించండి: x² - 5x + 6 = 0"
    },
    "options": [
      {
        "en": "x = 2 or x = 3",
        "hi": "एक्स = 2 या एक्स = 3",
        "te": "x = 2 లేదా x = 3"
      },
      {
        "en": "x = -2 or x = -3",
        "hi": "एक्स = -2 या एक्स = -3",
        "te": "x = -2 లేదా x = -3"
      },
      {
        "en": "x = 1 or x = 6",
        "hi": "एक्स = 1 या एक्स = 6",
        "te": "x = 1 లేదా x = 6"
      },
      {
        "en": "x = -1 or x = -6",
        "hi": "एक्स = -1 या एक्स = -6",
        "te": "x = -1 లేదా x = -6"
      }
    ],
    "correctAnswer": {
      "en": "x = 2 or x = 3",
      "hi": "एक्स = 2 या एक्स = 3",
      "te": "x = 2 లేదా x = 3"
    },
    "explanation": {
      "en": "Factor to (x - 2)(x - 3) = 0, so the solutions are x = 2 and x = 3.",
      "hi": "(x - 2)(x - 3) = 0 का गुणनखंड करें, इसलिए समाधान x = 2 और x = 3 हैं।",
      "te": "(x - 2)(x - 3) = 0కి కారకం, కాబట్టి పరిష్కారాలు x = 2 మరియు x = 3."
    }
  },
  {
    "id": "math-algebra-systems-h-boss-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Systems of Equations",
    "difficulty": "hard",
    "type": "boss",
    "question": {
      "en": "Which method eliminates a variable by adding or subtracting equations?",
      "hi": "कौन सी विधि समीकरणों को जोड़कर या घटाकर एक चर को समाप्त कर देती है?",
      "te": "సమీకరణాలను జోడించడం లేదా తీసివేయడం ద్వారా వేరియబుల్‌ను ఏ పద్ధతి తొలగిస్తుంది?"
    },
    "options": [
      {
        "en": "Graphing",
        "hi": "ग्राफ़",
        "te": "గ్రాఫింగ్"
      },
      {
        "en": "Substitution",
        "hi": "प्रतिस्थापन",
        "te": "ప్రత్యామ్నాయం"
      },
      {
        "en": "Elimination",
        "hi": "उन्मूलन",
        "te": "ఎలిమినేషన్"
      },
      {
        "en": "Factoring",
        "hi": "फैक्टरिंग",
        "te": "ఫ్యాక్టరింగ్"
      }
    ],
    "correctAnswer": {
      "en": "Elimination",
      "hi": "उन्मूलन",
      "te": "ఎలిమినేషన్"
    },
    "explanation": {
      "en": "In the elimination method, you add or subtract equations to remove one variable.",
      "hi": "उन्मूलन विधि में, आप एक चर को हटाने के लिए समीकरण जोड़ते या घटाते हैं।",
      "te": "తొలగింపు పద్ధతిలో, మీరు ఒక వేరియబుల్‌ను తీసివేయడానికి సమీకరణాలను జోడించడం లేదా తీసివేయడం."
    }
  },
  {
    "id": "math-calculus-limits-m-1",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Limits",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "The limit of a function describes…",
      "hi": "किसी फ़ंक्शन की सीमा का वर्णन है...",
      "te": "ఫంక్షన్ యొక్క పరిమితి వివరిస్తుంది..."
    },
    "options": [
      {
        "en": "Its value at infinity only",
        "hi": "इसका मान अनन्त पर ही है",
        "te": "దాని విలువ అనంతం వద్ద మాత్రమే"
      },
      {
        "en": "Its value only at x = 0",
        "hi": "इसका मान केवल x = 0 पर है",
        "te": "దీని విలువ x = 0 వద్ద మాత్రమే"
      },
      {
        "en": "The value it approaches as x gets close to a point",
        "hi": "जैसे-जैसे x एक बिंदु के करीब पहुंचता है, इसका मान बढ़ता जाता है",
        "te": "x ఒక బిందువుకు దగ్గరగా వచ్చినప్పుడు అది చేరుకునే విలువ"
      },
      {
        "en": "The slope of the tangent line",
        "hi": "स्पर्शरेखा रेखा का ढलान",
        "te": "టాంజెంట్ లైన్ యొక్క వాలు"
      }
    ],
    "correctAnswer": {
      "en": "The value it approaches as x gets close to a point",
      "hi": "जैसे-जैसे x एक बिंदु के करीब पहुंचता है, इसका मान बढ़ता जाता है",
      "te": "x ఒక బిందువుకు దగ్గరగా వచ్చినప్పుడు అది చేరుకునే విలువ"
    },
    "explanation": {
      "en": "A limit describes the value a function approaches as the input approaches some number.",
      "hi": "एक सीमा उस मान का वर्णन करती है जो एक फ़ंक्शन इनपुट के किसी संख्या के करीब पहुंचने पर पहुंचता है।",
      "te": "ఇన్‌పుట్ కొంత సంఖ్యకు చేరుకున్నప్పుడు ఫంక్షన్ చేరుకునే విలువను పరిమితి వివరిస్తుంది."
    }
  },
  {
    "id": "math-calculus-derivatives-h-boss-1",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Derivatives",
    "difficulty": "hard",
    "type": "boss",
    "question": {
      "en": "Using the power rule, the derivative of x⁴ is…",
      "hi": "घात नियम का उपयोग करते हुए, x⁴ का व्युत्पन्न है…",
      "te": "శక్తి నియమాన్ని ఉపయోగించి, x⁴ యొక్క ఉత్పన్నం..."
    },
    "options": [
      {
        "en": "4x³",
        "hi": "4x³",
        "te": "4x³"
      },
      {
        "en": "x³",
        "hi": "x³",
        "te": "x³"
      },
      {
        "en": "2x",
        "hi": "2x",
        "te": "2x"
      },
      {
        "en": "4x",
        "hi": "4 एक्स",
        "te": "4x"
      }
    ],
    "correctAnswer": {
      "en": "4x³",
      "hi": "4x³",
      "te": "4x³"
    },
    "explanation": {
      "en": "By the power rule, d/dx(xⁿ) = n·xⁿ⁻¹, so d/dx(x⁴) = 4x³.",
      "hi": "घात नियम के अनुसार, d/dx(xⁿ) = n·xⁿ⁻¹, इसलिए d/dx(x⁴) = 4x³।",
      "te": "శక్తి నియమం ప్రకారం, d/dx(xⁿ) = n·xⁿ⁻¹, కాబట్టి d/dx(x⁴) = 4x³."
    }
  },
  {
    "id": "phys-mech-motion-e-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Motion",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Velocity is…",
      "hi": "वेग है...",
      "te": "వేగం…"
    },
    "options": [
      {
        "en": "Speed without direction",
        "hi": "दिशाहीन गति",
        "te": "దిక్కులేని వేగం"
      },
      {
        "en": "Speed with direction",
        "hi": "दिशा के साथ गति",
        "te": "దిశతో వేగం"
      },
      {
        "en": "Distance divided by area",
        "hi": "दूरी को क्षेत्रफल से विभाजित किया गया",
        "te": "దూరం ప్రాంతం ద్వారా విభజించబడింది"
      },
      {
        "en": "Mass times acceleration",
        "hi": "मास गुना त्वरण",
        "te": "మాస్ టైమ్స్ త్వరణం"
      }
    ],
    "correctAnswer": {
      "en": "Speed with direction",
      "hi": "दिशा के साथ गति",
      "te": "దిశతో వేగం"
    },
    "explanation": {
      "en": "Velocity is speed in a given direction.",
      "hi": "वेग एक निश्चित दिशा में गति है।",
      "te": "వేగం అనేది ఇచ్చిన దిశలో వేగం."
    }
  },
  {
    "id": "phys-mech-forces-m-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Forces",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "According to Newton’s second law, F equals…",
      "hi": "न्यूटन के दूसरे नियम के अनुसार, F बराबर है...",
      "te": "న్యూటన్ యొక్క రెండవ నియమం ప్రకారం, F సమానం…"
    },
    "options": [
      {
        "en": "m + a",
        "hi": "एम + ए",
        "te": "m + a"
      },
      {
        "en": "ma",
        "hi": "एमए",
        "te": "ma"
      },
      {
        "en": "m/a",
        "hi": "एम/ए",
        "te": "m/a"
      },
      {
        "en": "a/m",
        "hi": "पूर्वाह्न",
        "te": "a/m"
      }
    ],
    "correctAnswer": {
      "en": "ma",
      "hi": "एमए",
      "te": "ma"
    },
    "explanation": {
      "en": "Newton’s second law is F = ma: force equals mass times acceleration.",
      "hi": "न्यूटन का दूसरा नियम F = ma है: बल द्रव्यमान गुणा त्वरण के बराबर होता है।",
      "te": "న్యూటన్ యొక్క రెండవ నియమం F = ma: శక్తి ద్రవ్యరాశి సమయాల త్వరణానికి సమానం."
    }
  },
  {
    "id": "phys-mech-energy-h-boss-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Energy",
    "difficulty": "hard",
    "type": "boss",
    "question": {
      "en": "Kinetic energy is given by the formula…",
      "hi": "गतिज ऊर्जा सूत्र द्वारा दी जाती है...",
      "te": "గతి శక్తి సూత్రం ద్వారా ఇవ్వబడుతుంది…"
    },
    "options": [
      {
        "en": "mv",
        "hi": "एमवी",
        "te": "mv"
      },
      {
        "en": "½mv²",
        "hi": "½mv²",
        "te": "½mv²"
      },
      {
        "en": "mg",
        "hi": "एमजी",
        "te": "mg"
      },
      {
        "en": "mgh",
        "hi": "एमजीएच",
        "te": "mgh"
      }
    ],
    "correctAnswer": {
      "en": "½mv²",
      "hi": "½mv²",
      "te": "½mv²"
    },
    "explanation": {
      "en": "Kinetic energy of a moving object is ½mv².",
      "hi": "किसी गतिशील वस्तु की गतिज ऊर्जा ½mv² है।",
      "te": "కదిలే వస్తువు యొక్క గతి శక్తి ½mv²."
    }
  },
  {
    "id": "phys-mech-motion-drag-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Motion",
    "difficulty": "easy",
    "type": "drag-drop",
    "question": {
      "en": "Match motion terms to their definitions.",
      "hi": "गति शर्तों को उनकी परिभाषाओं से मिलाएँ।",
      "te": "చలన నిబంధనలను వాటి నిర్వచనాలకు సరిపోల్చండి."
    },
    "pairs": [
      {
        "term": {
          "en": "Velocity",
          "hi": "वेग",
          "te": "వేగం"
        },
        "definition": {
          "en": "Speed with direction; rate of position change",
          "hi": "दिशा के साथ गति; स्थिति परिवर्तन की दर",
          "te": "దిశతో వేగం; స్థానం మార్పు రేటు"
        }
      },
      {
        "term": {
          "en": "Acceleration",
          "hi": "त्वरण",
          "te": "త్వరణం"
        },
        "definition": {
          "en": "Rate of change of velocity",
          "hi": "वेग परिवर्तन की दर",
          "te": "వేగం మార్పు రేటు"
        }
      },
      {
        "term": {
          "en": "Displacement",
          "hi": "विस्थापन",
          "te": "స్థానభ్రంశం"
        },
        "definition": {
          "en": "Change in position; a vector",
          "hi": "स्थिति में परिवर्तन; एक सदिश",
          "te": "Change in position; ఒక వెక్టర్"
        }
      },
      {
        "term": {
          "en": "s = ut + ½at²",
          "hi": "s = ut + ½at²",
          "te": "s = ut + ½at²"
        },
        "definition": {
          "en": "Equation of motion for distance",
          "hi": "दूरी के लिए गति का समीकरण",
          "te": "దూరం కోసం చలన సమీకరణం"
        }
      }
    ]
  },
  {
    "id": "chem-atoms-e-1",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Atoms",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The atomic number of an element is…",
      "hi": "किसी तत्व का परमाणु क्रमांक होता है...",
      "te": "మూలకం యొక్క పరమాణు సంఖ్య…"
    },
    "options": [
      {
        "en": "The number of neutrons",
        "hi": "न्यूट्रॉन की संख्या",
        "te": "న్యూట్రాన్ల సంఖ్య"
      },
      {
        "en": "The number of electrons in the outer shell",
        "hi": "बाहरी कोश में इलेक्ट्रॉनों की संख्या",
        "te": "బయటి షెల్‌లోని ఎలక్ట్రాన్‌ల సంఖ్య"
      },
      {
        "en": "The number of protons",
        "hi": "प्रोटॉनों की संख्या",
        "te": "ప్రోటాన్ల సంఖ్య"
      },
      {
        "en": "The total number of protons and neutrons",
        "hi": "प्रोटॉन और न्यूट्रॉन की कुल संख्या",
        "te": "ప్రోటాన్లు మరియు న్యూట్రాన్ల మొత్తం సంఖ్య"
      }
    ],
    "correctAnswer": {
      "en": "The number of protons",
      "hi": "प्रोटॉनों की संख्या",
      "te": "ప్రోటాన్ల సంఖ్య"
    },
    "explanation": {
      "en": "Atomic number is defined as the number of protons in the nucleus.",
      "hi": "परमाणु संख्या को नाभिक में प्रोटॉन की संख्या के रूप में परिभाषित किया गया है।",
      "te": "పరమాణు సంఖ్య కేంద్రకంలోని ప్రోటాన్ల సంఖ్యగా నిర్వచించబడింది."
    }
  },
  {
    "id": "chem-reactions-m-1",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Reactions",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "In a chemical equation, substances on the left side of the arrow are…",
      "hi": "एक रासायनिक समीकरण में, तीर के बाईं ओर के पदार्थ हैं...",
      "te": "రసాయన సమీకరణంలో, బాణం యొక్క ఎడమ వైపున ఉన్న పదార్థాలు..."
    },
    "options": [
      {
        "en": "Products",
        "hi": "उत्पादों",
        "te": "ఉత్పత్తులు"
      },
      {
        "en": "Reactants",
        "hi": "अभिकारक",
        "te": "ప్రతిచర్యలు"
      },
      {
        "en": "Catalysts",
        "hi": "उत्प्रेरक",
        "te": "ఉత్ప్రేరకాలు"
      },
      {
        "en": "Solvents",
        "hi": "विलायक",
        "te": "ద్రావకాలు"
      }
    ],
    "correctAnswer": {
      "en": "Reactants",
      "hi": "अभिकारक",
      "te": "ప్రతిచర్యలు"
    },
    "explanation": {
      "en": "Reactants are the starting substances that react to form products.",
      "hi": "अभिकारक वे आरंभिक पदार्थ हैं जो प्रतिक्रिया करके उत्पाद बनाते हैं।",
      "te": "రియాక్టెంట్లు ఉత్పత్తిని ఏర్పరచడానికి ప్రతిస్పందించే ప్రారంభ పదార్థాలు."
    }
  },
  {
    "id": "chem-reactions-drag-1",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Reactions",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": {
      "en": "Match the reaction terms with their meanings.",
      "hi": "प्रतिक्रिया शब्दों को उनके अर्थों से मिलाएँ।",
      "te": "ప్రతిచర్య పదాలను వాటి అర్థాలతో సరిపోల్చండి."
    },
    "pairs": [
      {
        "term": {
          "en": "Reactant",
          "hi": "अभिकारक",
          "te": "రియాక్టెంట్"
        },
        "definition": {
          "en": "Starting substance in a chemical reaction",
          "hi": "रासायनिक प्रतिक्रिया में प्रारंभिक पदार्थ",
          "te": "రసాయన ప్రతిచర్యలో ప్రారంభ పదార్ధం"
        }
      },
      {
        "term": {
          "en": "Product",
          "hi": "उत्पाद",
          "te": "ఉత్పత్తి"
        },
        "definition": {
          "en": "Substance formed in a reaction",
          "hi": "प्रतिक्रिया में बनने वाला पदार्थ",
          "te": "ప్రతిచర్యలో ఏర్పడిన పదార్ధం"
        }
      },
      {
        "term": {
          "en": "Balanced equation",
          "hi": "संतुलित समीकरण",
          "te": "సమతుల్య సమీకరణం"
        },
        "definition": {
          "en": "Same number of atoms on both sides",
          "hi": "दोनों तरफ परमाणुओं की समान संख्या",
          "te": "రెండు వైపులా ఒకే సంఖ్యలో అణువులు"
        }
      },
      {
        "term": {
          "en": "Catalyst",
          "hi": "उत्प्रेरक",
          "te": "ఉత్ప్రేరకం"
        },
        "definition": {
          "en": "Speeds up a reaction without being consumed",
          "hi": "उपभोग किए बिना प्रतिक्रिया को तेज़ करता है",
          "te": "వినియోగించకుండానే ప్రతిచర్యను వేగవంతం చేస్తుంది"
        }
      }
    ]
  },
  {
    "id": "bio-cells-e-1",
    "subject": "Biology",
    "chapter": "Cells",
    "topic": "Cell Structure",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Which structure controls what enters and leaves the cell?",
      "hi": "कौन सी संरचना कोशिका में प्रवेश करने और छोड़ने वालों को नियंत्रित करती है?",
      "te": "సెల్‌లోకి ప్రవేశించే మరియు వదిలే వాటిని ఏ నిర్మాణం నియంత్రిస్తుంది?"
    },
    "options": [
      {
        "en": "Nucleus",
        "hi": "नाभिक",
        "te": "న్యూక్లియస్"
      },
      {
        "en": "Cell membrane",
        "hi": "कोशिका झिल्ली",
        "te": "కణ త్వచం"
      },
      {
        "en": "Mitochondrion",
        "hi": "माइटोकांड्रिया",
        "te": "మైటోకాండ్రియన్"
      },
      {
        "en": "Ribosome",
        "hi": "राइबोसोम",
        "te": "రైబోజోమ్"
      }
    ],
    "correctAnswer": {
      "en": "Cell membrane",
      "hi": "कोशिका झिल्ली",
      "te": "కణ త్వచం"
    },
    "explanation": {
      "en": "The cell membrane regulates the movement of substances into and out of the cell.",
      "hi": "कोशिका झिल्ली कोशिका के अंदर और बाहर पदार्थों की गति को नियंत्रित करती है।",
      "te": "కణ త్వచం కణంలోకి మరియు బయటికి పదార్థాల కదలికను నియంత్రిస్తుంది."
    }
  },
  {
    "id": "bio-genetics-m-1",
    "subject": "Biology",
    "chapter": "Genetics",
    "topic": "DNA & Genes",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "DNA stands for…",
      "hi": "डीएनए का मतलब है...",
      "te": "DNA అంటే…"
    },
    "options": [
      {
        "en": "Deoxyribonucleic acid",
        "hi": "डिऑक्सीराइबोन्यूक्लिक अम्ल",
        "te": "డియోక్సిరిబోన్యూక్లిక్ యాసిడ్"
      },
      {
        "en": "Dioxyribonuclear acid",
        "hi": "डाइऑक्सीराइबोन्यूक्लियर एसिड",
        "te": "డయాక్సిరైబోన్యూక్లియర్ యాసిడ్"
      },
      {
        "en": "Deoxyribose nucleic acid",
        "hi": "डीऑक्सीराइबोज़ न्यूक्लिक एसिड",
        "te": "డియోక్సిరైబోస్ న్యూక్లియిక్ ఆమ్లం"
      },
      {
        "en": "Dihydroribonucleic acid",
        "hi": "डायहाइड्रोरिबोन्यूक्लिक एसिड",
        "te": "డైహైడ్రోరిబోన్యూక్లిక్ యాసిడ్"
      }
    ],
    "correctAnswer": {
      "en": "Deoxyribonucleic acid",
      "hi": "डिऑक्सीराइबोन्यूक्लिक अम्ल",
      "te": "డియోక్సిరిబోన్యూక్లిక్ యాసిడ్"
    },
    "explanation": {
      "en": "DNA stands for deoxyribonucleic acid, the molecule that carries genetic information.",
      "hi": "डीएनए का मतलब डीऑक्सीराइबोन्यूक्लिक एसिड है, वह अणु जो आनुवंशिक जानकारी रखता है।",
      "te": "DNA అంటే డియోక్సిరిబోన్యూక్లియిక్ యాసిడ్, జన్యు సమాచారాన్ని చేరవేసే అణువు."
    }
  },
  {
    "id": "bio-genetics-drag-1",
    "subject": "Biology",
    "chapter": "Genetics",
    "topic": "DNA & Genes",
    "difficulty": "medium",
    "type": "drag-drop",
    "question": {
      "en": "Match genetic terms with their descriptions.",
      "hi": "आनुवंशिक शब्दों को उनके विवरण से मिलाएँ।",
      "te": "జన్యు పదాలను వాటి వివరణలతో సరిపోల్చండి."
    },
    "pairs": [
      {
        "term": {
          "en": "Gene",
          "hi": "जीन",
          "te": "జన్యువు"
        },
        "definition": {
          "en": "Segment of DNA that codes for a trait",
          "hi": "डीएनए का वह खंड जो किसी गुण को कोड करता है",
          "te": "ఒక లక్షణానికి సంకేతాలు ఇచ్చే DNA విభాగం"
        }
      },
      {
        "term": {
          "en": "Chromosome",
          "hi": "क्रोमोसाम",
          "te": "క్రోమోజోమ్"
        },
        "definition": {
          "en": "Long DNA molecule with part or all of the genetic material",
          "hi": "आंशिक या संपूर्ण आनुवंशिक सामग्री वाला लंबा डीएनए अणु",
          "te": "జన్యు పదార్ధం యొక్క భాగం లేదా మొత్తంతో పొడవైన DNA అణువు"
        }
      },
      {
        "term": {
          "en": "Allele",
          "hi": "एलील",
          "te": "యుగ్మ వికల్పం"
        },
        "definition": {
          "en": "Different form of a gene",
          "hi": "एक जीन का भिन्न रूप",
          "te": "జన్యువు యొక్క విభిన్న రూపం"
        }
      },
      {
        "term": {
          "en": "Genotype",
          "hi": "जीनोटाइप",
          "te": "జన్యురూపం"
        },
        "definition": {
          "en": "Genetic makeup of an organism",
          "hi": "किसी जीव की आनुवंशिक संरचना",
          "te": "ఒక జీవి యొక్క జన్యు అలంకరణ"
        }
      }
    ]
  },
  {
    "id": "general-study-e-1",
    "subject": "General",
    "chapter": "Study Skills",
    "topic": "Effective Practice",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Short daily study sessions are usually better than…",
      "hi": "छोटे दैनिक अध्ययन सत्र आमतौर पर इससे बेहतर होते हैं…",
      "te": "చిన్న రోజువారీ అధ్యయన సెషన్‌లు సాధారణంగా వాటి కంటే మెరుగ్గా ఉంటాయి…"
    },
    "options": [
      {
        "en": "One long session once a week",
        "hi": "सप्ताह में एक बार एक लंबा सत्र",
        "te": "వారానికి ఒకసారి సుదీర్ఘ సెషన్"
      },
      {
        "en": "Never taking breaks",
        "hi": "कभी भी ब्रेक नहीं लेना",
        "te": "ఎప్పుడూ విరామం తీసుకోరు"
      },
      {
        "en": "Studying only when tests are near",
        "hi": "परीक्षा नजदीक आने पर ही पढ़ाई करें",
        "te": "పరీక్షలు దగ్గరలో ఉన్నప్పుడే చదువుతా"
      },
      {
        "en": "Any kind of spaced practice",
        "hi": "किसी भी प्रकार का अंतराल अभ्यास",
        "te": "ఏ రకమైన ఖాళీ అభ్యాసం"
      }
    ],
    "correctAnswer": {
      "en": "One long session once a week",
      "hi": "सप्ताह में एक बार एक लंबा सत्र",
      "te": "వారానికి ఒకసారి సుదీర్ఘ సెషన్"
    },
    "explanation": {
      "en": "Spaced, consistent practice beats cramming in a single long session.",
      "hi": "अंतराल, लगातार अभ्यास एक ही लंबे सत्र में रटने को मात देता है।",
      "te": "ఒకే సుదీర్ఘ సెషన్‌లో ఖాళీ, స్థిరమైన ప్రాక్టీస్ క్రామ్మింగ్‌ను కొట్టింది."
    }
  },
  {
    "id": "math-algebra-linear-e-3",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Which graph represents a linear function?",
      "hi": "कौन सा ग्राफ़ एक रैखिक फलन का प्रतिनिधित्व करता है?",
      "te": "ఏ గ్రాఫ్ లీనియర్ ఫంక్షన్‌ను సూచిస్తుంది?"
    },
    "options": [
      {
        "en": "A straight line",
        "hi": "एक सीधी पंक्ति",
        "te": "ఒక సరళ రేఖ"
      },
      {
        "en": "A circle",
        "hi": "एक चक्र",
        "te": "ఒక వృత్తం"
      },
      {
        "en": "A parabola",
        "hi": "एक परवलय",
        "te": "ఒక పారాబొలా"
      },
      {
        "en": "A hyperbola",
        "hi": "एक अतिपरवलय",
        "te": "ఒక హైపర్బోలా"
      }
    ],
    "correctAnswer": {
      "en": "A straight line",
      "hi": "एक सीधी पंक्ति",
      "te": "ఒక సరళ రేఖ"
    },
    "explanation": {
      "en": "Linear functions have graphs that are straight lines.",
      "hi": "रैखिक फ़ंक्शंस में ऐसे ग्राफ़ होते हैं जो सीधी रेखाएँ होते हैं।",
      "te": "లీనియర్ ఫంక్షన్‌లు సరళ రేఖలుగా ఉండే గ్రాఫ్‌లను కలిగి ఉంటాయి."
    }
  },
  {
    "id": "math-algebra-linear-e-4",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "In y = 3x − 5, what is the slope?",
      "hi": "y = 3x − 5 में, ढलान क्या है?",
      "te": "y = 3x − 5లో, వాలు ఎంత?"
    },
    "options": [
      {
        "en": "−5",
        "hi": "-5",
        "te": "−5"
      },
      {
        "en": "3",
        "hi": "3",
        "te": "3"
      },
      {
        "en": "5",
        "hi": "5",
        "te": "5"
      },
      {
        "en": "1/3",
        "hi": "1/3",
        "te": "1/3"
      }
    ],
    "correctAnswer": {
      "en": "3",
      "hi": "3",
      "te": "3"
    },
    "explanation": {
      "en": "In y = mx + b, m is the slope; here m = 3.",
      "hi": "y = mx + b में, m ढलान है; यहाँ m = 3.",
      "te": "y = mx + bలో, m అనేది వాలు; ఇక్కడ m = 3."
    }
  },
  {
    "id": "math-algebra-linear-m-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Solve for x: 5x − 7 = 3x + 9",
      "hi": "x के लिए हल करें: 5x − 7 = 3x + 9",
      "te": "x కోసం పరిష్కరించండి: 5x - 7 = 3x + 9"
    },
    "options": [
      {
        "en": "x = 1",
        "hi": "एक्स = 1",
        "te": "x = 1"
      },
      {
        "en": "x = 6",
        "hi": "एक्स = 6",
        "te": "x = 6"
      },
      {
        "en": "x = 8",
        "hi": "एक्स = 8",
        "te": "x = 8"
      },
      {
        "en": "x = −8",
        "hi": "एक्स = −8",
        "te": "x = -8"
      }
    ],
    "correctAnswer": {
      "en": "x = 8",
      "hi": "एक्स = 8",
      "te": "x = 8"
    },
    "explanation": {
      "en": "5x − 7 = 3x + 9 ⇒ 2x = 16 ⇒ x = 8.",
      "hi": "5x − 7 = 3x + 9 ⇒ 2x = 16 ⇒ x = 8.",
      "te": "5x - 7 = 3x + 9 ⇒ 2x = 16 ⇒ x = 8."
    }
  },
  {
    "id": "math-algebra-quadratic-e-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Quadratic Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Which of these is a quadratic equation?",
      "hi": "इनमें से कौन सा द्विघात समीकरण है?",
      "te": "వీటిలో ఏది చతుర్భుజ సమీకరణం?"
    },
    "options": [
      {
        "en": "2x + 3 = 0",
        "hi": "2x + 3 = 0",
        "te": "2x + 3 = 0"
      },
      {
        "en": "x² − 4 = 0",
        "hi": "x² − 4 = 0",
        "te": "x² - 4 = 0"
      },
      {
        "en": "3/x = 1",
        "hi": "3/एक्स = 1",
        "te": "3/x = 1"
      },
      {
        "en": "√x + 2 = 0",
        "hi": "√x + 2 = 0",
        "te": "√x + 2 = 0"
      }
    ],
    "correctAnswer": {
      "en": "x² − 4 = 0",
      "hi": "x² − 4 = 0",
      "te": "x² - 4 = 0"
    },
    "explanation": {
      "en": "A quadratic equation has x raised to the second power.",
      "hi": "एक द्विघात समीकरण में x को दूसरी घात तक बढ़ा दिया गया है।",
      "te": "ఒక వర్గ సమీకరణం xని రెండవ శక్తికి పెంచింది."
    }
  },
  {
    "id": "math-algebra-quadratic-e-2",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Quadratic Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "How many x-intercepts can a quadratic function have?",
      "hi": "एक द्विघात फलन में कितने x-अवरोधन हो सकते हैं?",
      "te": "ఒక క్వాడ్రాటిక్ ఫంక్షన్ ఎన్ని x-ఇంటర్‌సెప్ట్‌లను కలిగి ఉంటుంది?"
    },
    "options": [
      {
        "en": "0 or 1 only",
        "hi": "केवल 0 या 1",
        "te": "0 లేదా 1 మాత్రమే"
      },
      {
        "en": "Exactly 1",
        "hi": "बिलकुल 1",
        "te": "సరిగ్గా 1"
      },
      {
        "en": "0, 1, or 2",
        "hi": "0, 1, या 2",
        "te": "0, 1, లేదా 2"
      },
      {
        "en": "Exactly 2",
        "hi": "बिल्कुल 2",
        "te": "సరిగ్గా 2"
      }
    ],
    "correctAnswer": {
      "en": "0, 1, or 2",
      "hi": "0, 1, या 2",
      "te": "0, 1, లేదా 2"
    },
    "explanation": {
      "en": "A quadratic can cross the x-axis 0, 1, or 2 times.",
      "hi": "एक द्विघात x-अक्ष को 0, 1 या 2 बार पार कर सकता है।",
      "te": "ఒక చతుర్భుజం x-అక్షం 0, 1 లేదా 2 సార్లు దాటగలదు."
    }
  },
  {
    "id": "math-algebra-quadratic-m-2",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Quadratic Equations",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "The discriminant b² − 4ac of a quadratic is negative. What does this mean?",
      "hi": "द्विघात का विभेदक b² − 4ac ऋणात्मक है। इसका अर्थ क्या है?",
      "te": "చతుర్భుజం యొక్క వివక్షత b² - 4ac ప్రతికూలంగా ఉంటుంది. దీని అర్థం ఏమిటి?"
    },
    "options": [
      {
        "en": "Two real roots",
        "hi": "दो वास्तविक जड़ें",
        "te": "రెండు నిజమైన మూలాలు"
      },
      {
        "en": "One real root",
        "hi": "एक असली जड़",
        "te": "ఒక నిజమైన రూట్"
      },
      {
        "en": "No real roots",
        "hi": "कोई वास्तविक जड़ें नहीं",
        "te": "అసలు మూలాలు లేవు"
      },
      {
        "en": "Roots are both zero",
        "hi": "जड़ें दोनों शून्य हैं",
        "te": "మూలాలు రెండూ సున్నా"
      }
    ],
    "correctAnswer": {
      "en": "No real roots",
      "hi": "कोई वास्तविक जड़ें नहीं",
      "te": "అసలు మూలాలు లేవు"
    },
    "explanation": {
      "en": "A negative discriminant means the roots are complex, not real.",
      "hi": "एक नकारात्मक विभेदक का अर्थ है कि जड़ें जटिल हैं, वास्तविक नहीं।",
      "te": "ప్రతికూల వివక్ష అంటే మూలాలు సంక్లిష్టమైనవి, వాస్తవం కాదు."
    }
  },
  {
    "id": "math-algebra-quadratic-h-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Quadratic Equations",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "The quadratic y = (x − 3)² + 4 has its vertex at…",
      "hi": "द्विघात y = (x − 3)² + 4 का शीर्ष बिंदु है...",
      "te": "క్వాడ్రాటిక్ y = (x - 3)² + 4 దాని శీర్షాన్ని ఇక్కడ కలిగి ఉంది…"
    },
    "options": [
      {
        "en": "(3, 4)",
        "hi": "(3,4)",
        "te": "(3, 4)"
      },
      {
        "en": "(−3, 4)",
        "hi": "(−3,4)",
        "te": "(-3, 4)"
      },
      {
        "en": "(3, −4)",
        "hi": "(3, −4)",
        "te": "(3, -4)"
      },
      {
        "en": "(−3, −4)",
        "hi": "(−3, −4)",
        "te": "(-3, -4)"
      }
    ],
    "correctAnswer": {
      "en": "(3, 4)",
      "hi": "(3,4)",
      "te": "(3, 4)"
    },
    "explanation": {
      "en": "In vertex form (x − h)² + k, the vertex is (h, k) = (3, 4).",
      "hi": "शीर्ष रूप में (x − h)² + k, शीर्ष (h, k) = (3, 4) है।",
      "te": "శీర్ష రూపంలో (x - h)² + k, శీర్షం (h, k) = (3, 4)."
    }
  },
  {
    "id": "math-algebra-systems-e-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Systems of Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "A solution to a system of two linear equations in two variables is…",
      "hi": "दो चर वाले दो रैखिक समीकरणों की प्रणाली का एक समाधान है...",
      "te": "రెండు వేరియబుల్స్‌లోని రెండు సరళ సమీకరణాల వ్యవస్థకు పరిష్కారం…"
    },
    "options": [
      {
        "en": "Any point on either line",
        "hi": "किसी भी पंक्ति पर कोई बिंदु",
        "te": "ఏదైనా లైన్‌లో ఏదైనా పాయింట్"
      },
      {
        "en": "The point where the lines intersect",
        "hi": "वह बिंदु जहाँ रेखाएँ प्रतिच्छेद करती हैं",
        "te": "పంక్తులు కలిసే బిందువు"
      },
      {
        "en": "The midpoint of the lines",
        "hi": "रेखाओं का मध्यबिंदु",
        "te": "పంక్తుల మధ్య బిందువు"
      },
      {
        "en": "Always (0, 0)",
        "hi": "हमेशा (0, 0)",
        "te": "ఎల్లప్పుడూ (0, 0)"
      }
    ],
    "correctAnswer": {
      "en": "The point where the lines intersect",
      "hi": "वह बिंदु जहाँ रेखाएँ प्रतिच्छेद करती हैं",
      "te": "పంక్తులు కలిసే బిందువు"
    },
    "explanation": {
      "en": "Solutions are points that satisfy both equations, i.e., their intersection.",
      "hi": "समाधान वे बिंदु हैं जो दोनों समीकरणों को संतुष्ट करते हैं, यानी, उनका प्रतिच्छेदन।",
      "te": "పరిష్కారాలు రెండు సమీకరణాలను సంతృప్తిపరిచే పాయింట్లు, అంటే వాటి ఖండన."
    }
  },
  {
    "id": "math-algebra-systems-e-2",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Systems of Equations",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "If two lines in a system are parallel and distinct, the system has…",
      "hi": "यदि किसी सिस्टम में दो रेखाएं समानांतर और अलग-अलग हैं, तो सिस्टम में…",
      "te": "సిస్టమ్‌లోని రెండు పంక్తులు సమాంతరంగా మరియు విభిన్నంగా ఉంటే, సిస్టమ్ కలిగి ఉంటుంది..."
    },
    "options": [
      {
        "en": "One solution",
        "hi": "एक हल",
        "te": "ఒక పరిష్కారం"
      },
      {
        "en": "No solution",
        "hi": "कोई समाधान नहीं",
        "te": "పరిష్కారం లేదు"
      },
      {
        "en": "Infinitely many solutions",
        "hi": "अनंत अनेक समाधान",
        "te": "అనంతమైన అనేక పరిష్కారాలు"
      },
      {
        "en": "Four solutions",
        "hi": "चार समाधान",
        "te": "నాలుగు పరిష్కారాలు"
      }
    ],
    "correctAnswer": {
      "en": "No solution",
      "hi": "कोई समाधान नहीं",
      "te": "పరిష్కారం లేదు"
    },
    "explanation": {
      "en": "Parallel distinct lines never meet, so there is no common solution.",
      "hi": "समानांतर विशिष्ट रेखाएँ कभी नहीं मिलतीं, इसलिए कोई सामान्य समाधान नहीं है।",
      "te": "సమాంతర విభిన్న పంక్తులు ఎప్పుడూ కలవవు, కాబట్టి సాధారణ పరిష్కారం లేదు."
    }
  },
  {
    "id": "math-algebra-systems-m-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Systems of Equations",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Solve the system: x + y = 5 and x − y = 1.",
      "hi": "सिस्टम को हल करें: x + y = 5 और x - y = 1.",
      "te": "సిస్టమ్‌ను పరిష్కరించండి: x + y = 5 మరియు x - y = 1."
    },
    "options": [
      {
        "en": "(3, 2)",
        "hi": "(3,2)",
        "te": "(3, 2)"
      },
      {
        "en": "(2, 3)",
        "hi": "(2,3)",
        "te": "(2, 3)"
      },
      {
        "en": "(4, 1)",
        "hi": "(4,1)",
        "te": "(4, 1)"
      },
      {
        "en": "(1, 4)",
        "hi": "(1,4)",
        "te": "(1, 4)"
      }
    ],
    "correctAnswer": {
      "en": "(3, 2)",
      "hi": "(3,2)",
      "te": "(3, 2)"
    },
    "explanation": {
      "en": "Adding equations gives 2x = 6 so x = 3, then y = 2.",
      "hi": "समीकरण जोड़ने पर 2x = 6 प्राप्त होता है इसलिए x = 3, फिर y = 2।",
      "te": "సమీకరణాలను జోడించడం వలన 2x = 6 వస్తుంది కాబట్టి x = 3, ఆపై y = 2."
    }
  },
  {
    "id": "math-algebra-systems-h-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Systems of Equations",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "A system has infinitely many solutions when the two equations are…",
      "hi": "एक प्रणाली में अनंत रूप से कई समाधान होते हैं जब दो समीकरण होते हैं...",
      "te": "రెండు సమీకరణాలు ఉన్నప్పుడు సిస్టమ్ అనంతమైన అనేక పరిష్కారాలను కలిగి ఉంటుంది…"
    },
    "options": [
      {
        "en": "Inconsistent",
        "hi": "असंगत",
        "te": "అస్థిరమైనది"
      },
      {
        "en": "Different lines with different slopes",
        "hi": "अलग-अलग ढलानों वाली अलग-अलग रेखाएँ",
        "te": "వివిధ వాలులతో విభిన్న పంక్తులు"
      },
      {
        "en": "Equivalent (same line)",
        "hi": "समतुल्य (समान पंक्ति)",
        "te": "సమానం (అదే లైన్)"
      },
      {
        "en": "Perpendicular lines",
        "hi": "लंबवत रेखाएँ",
        "te": "లంబ రేఖలు"
      }
    ],
    "correctAnswer": {
      "en": "Equivalent (same line)",
      "hi": "समतुल्य (समान पंक्ति)",
      "te": "సమానం (అదే లైన్)"
    },
    "explanation": {
      "en": "If both equations represent the same line, every point on it is a solution.",
      "hi": "यदि दोनों समीकरण एक ही रेखा का प्रतिनिधित्व करते हैं, तो उस पर प्रत्येक बिंदु एक समाधान है।",
      "te": "రెండు సమీకరణాలు ఒకే రేఖను సూచిస్తే, దానిపై ఉన్న ప్రతి పాయింట్ ఒక పరిష్కారం."
    }
  },
  {
    "id": "math-calculus-limits-e-1",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Limits",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The notation limₓ→2 f(x) = 5 means…",
      "hi": "अंकन limₓ→2 f(x) = 5 का अर्थ है...",
      "te": "సంజ్ఞామానం limₓ→2 f(x) = 5 అంటే…"
    },
    "options": [
      {
        "en": "f(2) must equal 5",
        "hi": "f(2) 5 के बराबर होना चाहिए",
        "te": "f(2) తప్పనిసరిగా 5కి సమానం"
      },
      {
        "en": "As x approaches 2, f(x) approaches 5",
        "hi": "जैसे-जैसे x 2 के करीब पहुंचता है, f(x) 5 के करीब पहुंचता है",
        "te": "x 2కి చేరుకున్నప్పుడు, f(x) 5కి చేరుకుంటుంది"
      },
      {
        "en": "As x goes to infinity, f(x) is 5",
        "hi": "जैसे ही x अनंत तक जाता है, f(x) 5 होता है",
        "te": "x అనంతానికి వెళ్లినప్పుడు, f(x) 5"
      },
      {
        "en": "The derivative at x = 2 is 5",
        "hi": "x = 2 पर व्युत्पन्न 5 है",
        "te": "x = 2 వద్ద ఉత్పన్నం 5"
      }
    ],
    "correctAnswer": {
      "en": "As x approaches 2, f(x) approaches 5",
      "hi": "जैसे-जैसे x 2 के करीब पहुंचता है, f(x) 5 के करीब पहुंचता है",
      "te": "x 2కి చేరుకున్నప్పుడు, f(x) 5కి చేరుకుంటుంది"
    },
    "explanation": {
      "en": "A limit describes behavior as x gets close to a value, not necessarily at that value.",
      "hi": "एक सीमा व्यवहार का वर्णन करती है क्योंकि x एक मान के करीब पहुंचता है, जरूरी नहीं कि उस मान पर हो।",
      "te": "x విలువకు దగ్గరగా ఉన్నప్పుడు పరిమితి ప్రవర్తనను వివరిస్తుంది, ఆ విలువ వద్ద అవసరం లేదు."
    }
  },
  {
    "id": "math-calculus-limits-e-2",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Limits",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "If the left-hand and right-hand limits at x = a are different, the limit…",
      "hi": "यदि x = a पर बाएँ और दाएँ हाथ की सीमाएँ भिन्न हैं, तो सीमा…",
      "te": "x = a వద్ద ఎడమ చేతి మరియు కుడి చేతి పరిమితులు భిన్నంగా ఉంటే, పరిమితి…"
    },
    "options": [
      {
        "en": "Exists and equals the left-hand limit",
        "hi": "मौजूद है और बाएं हाथ की सीमा के बराबर है",
        "te": "ఎడమ చేతి పరిమితి ఉంది మరియు సమానం"
      },
      {
        "en": "Exists and equals the right-hand limit",
        "hi": "मौजूद है और दाहिने हाथ की सीमा के बराबर है",
        "te": "కుడి చేతి పరిమితి ఉంది మరియు సమానం"
      },
      {
        "en": "Does not exist",
        "hi": "मौजूद नहीं",
        "te": "ఉనికిలో లేదు"
      },
      {
        "en": "Is always zero",
        "hi": "सदैव शून्य है",
        "te": "ఎల్లప్పుడూ సున్నా"
      }
    ],
    "correctAnswer": {
      "en": "Does not exist",
      "hi": "मौजूद नहीं",
      "te": "ఉనికిలో లేదు"
    },
    "explanation": {
      "en": "A limit exists only when both one-sided limits are equal.",
      "hi": "एक सीमा तभी मौजूद होती है जब दोनों एकतरफ़ा सीमाएँ समान हों।",
      "te": "రెండు ఏకపక్ష పరిమితులు సమానంగా ఉన్నప్పుడు మాత్రమే పరిమితి ఉంటుంది."
    }
  },
  {
    "id": "math-calculus-limits-m-2",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Limits",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "A removable discontinuity in a graph looks like…",
      "hi": "ग्राफ़ में एक हटाने योग्य असंततता इस प्रकार दिखती है...",
      "te": "గ్రాఫ్‌లో తొలగించగల నిలిపివేత ఇలా కనిపిస్తుంది..."
    },
    "options": [
      {
        "en": "A vertical asymptote",
        "hi": "एक ऊर्ध्वाधर अनंतस्पर्शी",
        "te": "ఒక నిలువు లక్షణం"
      },
      {
        "en": "A jump between two values",
        "hi": "दो मूल्यों के बीच छलांग",
        "te": "రెండు విలువల మధ్య జంప్"
      },
      {
        "en": "A single “hole” in an otherwise smooth curve",
        "hi": "अन्यथा चिकने वक्र में एक एकल \"छेद\"।",
        "te": "లేకపోతే మృదువైన వంపులో ఒకే \"రంధ్రం\""
      },
      {
        "en": "A perfectly continuous curve",
        "hi": "एक पूर्णतः सतत वक्र",
        "te": "సంపూర్ణ నిరంతర వక్రరేఖ"
      }
    ],
    "correctAnswer": {
      "en": "A single “hole” in an otherwise smooth curve",
      "hi": "अन्यथा चिकने वक्र में एक एकल \"छेद\"।",
      "te": "లేకపోతే మృదువైన వంపులో ఒకే \"రంధ్రం\""
    },
    "explanation": {
      "en": "Removable discontinuities occur when a single point is missing but the limit exists.",
      "hi": "हटाने योग्य असंततताएं तब होती हैं जब एक भी बिंदु गायब होता है लेकिन सीमा मौजूद होती है।",
      "te": "ఒక పాయింట్ తప్పిపోయినప్పుడు కానీ పరిమితి ఉనికిలో ఉన్నప్పుడు తొలగించగల నిలిపివేతలు సంభవిస్తాయి."
    }
  },
  {
    "id": "math-calculus-limits-h-1",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Limits",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "The limit limₓ→∞ 1/x equals…",
      "hi": "सीमा limₓ→∞ 1/x बराबर है...",
      "te": "పరిమితి పరిమితిₓ→∞ 1/x సమానం…"
    },
    "options": [
      {
        "en": "0",
        "hi": "0",
        "te": "0"
      },
      {
        "en": "1",
        "hi": "1",
        "te": "1"
      },
      {
        "en": "∞",
        "hi": "∞",
        "te": "∞"
      },
      {
        "en": "Does not exist",
        "hi": "मौजूद नहीं",
        "te": "ఉనికిలో లేదు"
      }
    ],
    "correctAnswer": {
      "en": "0",
      "hi": "0",
      "te": "0"
    },
    "explanation": {
      "en": "As x grows without bound, 1/x gets closer and closer to 0.",
      "hi": "जैसे-जैसे x बिना किसी सीमा के बढ़ता है, 1/x 0 के और करीब आता जाता है।",
      "te": "x బంధం లేకుండా పెరుగుతున్నప్పుడు, 1/x 0కి దగ్గరగా మరియు దగ్గరగా ఉంటుంది."
    }
  },
  {
    "id": "math-calculus-derivatives-e-1",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Derivatives",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The derivative of a position function with respect to time represents…",
      "hi": "समय के संबंध में स्थिति फ़ंक्शन का व्युत्पन्न दर्शाता है...",
      "te": "సమయానికి సంబంధించి స్థానం ఫంక్షన్ యొక్క ఉత్పన్నం సూచిస్తుంది..."
    },
    "options": [
      {
        "en": "Acceleration",
        "hi": "त्वरण",
        "te": "త్వరణం"
      },
      {
        "en": "Velocity",
        "hi": "वेग",
        "te": "వేగం"
      },
      {
        "en": "Jerk",
        "hi": "झटका",
        "te": "కుదుపు"
      },
      {
        "en": "Displacement",
        "hi": "विस्थापन",
        "te": "స్థానభ్రంశం"
      }
    ],
    "correctAnswer": {
      "en": "Velocity",
      "hi": "वेग",
      "te": "వేగం"
    },
    "explanation": {
      "en": "The first derivative of position with respect to time is velocity.",
      "hi": "समय के संबंध में स्थिति का पहला व्युत्पन्न वेग है।",
      "te": "సమయానికి సంబంధించి స్థానం యొక్క మొదటి ఉత్పన్నం వేగం."
    }
  },
  {
    "id": "math-calculus-derivatives-e-2",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Derivatives",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "At a maximum point on a smooth curve, the derivative is usually…",
      "hi": "एक चिकने वक्र पर अधिकतम बिंदु पर, व्युत्पन्न आमतौर पर होता है…",
      "te": "మృదువైన వక్రరేఖపై గరిష్ట పాయింట్ వద్ద, ఉత్పన్నం సాధారణంగా…"
    },
    "options": [
      {
        "en": "Positive",
        "hi": "सकारात्मक",
        "te": "సానుకూలమైనది"
      },
      {
        "en": "Negative",
        "hi": "नकारात्मक",
        "te": "ప్రతికూలమైనది"
      },
      {
        "en": "Zero",
        "hi": "शून्य",
        "te": "సున్నా"
      },
      {
        "en": "Undefined",
        "hi": "अपरिभाषित",
        "te": "నిర్వచించబడలేదు"
      }
    ],
    "correctAnswer": {
      "en": "Zero",
      "hi": "शून्य",
      "te": "సున్నా"
    },
    "explanation": {
      "en": "Tangent lines at local maxima and minima are horizontal, so the derivative is zero.",
      "hi": "स्थानीय मैक्सिमा और मिनिमा पर स्पर्शरेखा रेखाएँ क्षैतिज होती हैं, इसलिए व्युत्पन्न शून्य होता है।",
      "te": "స్థానిక మాగ్జిమా మరియు మినిమా వద్ద టాంజెంట్ లైన్లు సమాంతరంగా ఉంటాయి, కాబట్టి ఉత్పన్నం సున్నా."
    }
  },
  {
    "id": "math-calculus-derivatives-m-1",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Derivatives",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Using the power rule, d/dx(3x³) equals…",
      "hi": "पावर नियम का उपयोग करते हुए, d/dx(3x³) बराबर होता है...",
      "te": "శక్తి నియమాన్ని ఉపయోగించి, d/dx(3x³) సమానం…"
    },
    "options": [
      {
        "en": "9x²",
        "hi": "9x²",
        "te": "9x²"
      },
      {
        "en": "3x²",
        "hi": "3x²",
        "te": "3x²"
      },
      {
        "en": "x³",
        "hi": "x³",
        "te": "x³"
      },
      {
        "en": "6x",
        "hi": "6x",
        "te": "6x"
      }
    ],
    "correctAnswer": {
      "en": "9x²",
      "hi": "9x²",
      "te": "9x²"
    },
    "explanation": {
      "en": "Derivative of 3x³ is 3·3x² = 9x².",
      "hi": "3x³ का व्युत्पन्न 3·3x² = 9x² है।",
      "te": "3x³ యొక్క ఉత్పన్నం 3·3x² = 9x²."
    }
  },
  {
    "id": "math-calculus-derivatives-h-1",
    "subject": "Mathematics",
    "chapter": "Calculus",
    "topic": "Derivatives",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "If f(x) = sin(x), then fʺ(x) (the second derivative) is…",
      "hi": "यदि f(x) = पाप(x), तो fʺ(x) (दूसरा व्युत्पन्न) है...",
      "te": "f(x) = sin(x), అయితే fʺ(x) (రెండవ ఉత్పన్నం)…"
    },
    "options": [
      {
        "en": "sin(x)",
        "hi": "पाप(x)",
        "te": "పాపం(x)"
      },
      {
        "en": "cos(x)",
        "hi": "क्योंकि(x)",
        "te": "cos(x)"
      },
      {
        "en": "−sin(x)",
        "hi": "−sin(x)",
        "te": "−పాపం(x)"
      },
      {
        "en": "−cos(x)",
        "hi": "−cos(x)",
        "te": "−cos(x)"
      }
    ],
    "correctAnswer": {
      "en": "−sin(x)",
      "hi": "−sin(x)",
      "te": "−పాపం(x)"
    },
    "explanation": {
      "en": "First derivative is cos(x), second derivative is −sin(x).",
      "hi": "पहला अवकलज cos(x) है, दूसरा अवकलज −sin(x) है।",
      "te": "మొదటి ఉత్పన్నం cos(x), రెండవ ఉత్పన్నం −sin(x)."
    }
  },
  {
    "id": "phys-mech-motion-e-2",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Motion",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Speed is defined as…",
      "hi": "गति को इस प्रकार परिभाषित किया गया है...",
      "te": "వేగం ఇలా నిర్వచించబడింది…"
    },
    "options": [
      {
        "en": "Distance divided by time",
        "hi": "दूरी समय से विभाजित",
        "te": "దూరం సమయం ద్వారా విభజించబడింది"
      },
      {
        "en": "Time divided by distance",
        "hi": "समय को दूरी से विभाजित किया गया",
        "te": "సమయం దూరంతో విభజించబడింది"
      },
      {
        "en": "Distance plus time",
        "hi": "दूरी प्लस समय",
        "te": "దూరం ప్లస్ సమయం"
      },
      {
        "en": "Mass times velocity",
        "hi": "द्रव्यमान गुना वेग",
        "te": "ద్రవ్యరాశి సమయాల వేగం"
      }
    ],
    "correctAnswer": {
      "en": "Distance divided by time",
      "hi": "दूरी समय से विभाजित",
      "te": "దూరం సమయం ద్వారా విభజించబడింది"
    },
    "explanation": {
      "en": "Speed = distance / time.",
      "hi": "गति = दूरी/समय.",
      "te": "వేగం = దూరం / సమయం."
    }
  },
  {
    "id": "phys-mech-motion-m-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Motion",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "If a car’s velocity is constant, its acceleration is…",
      "hi": "यदि किसी कार का वेग स्थिर है, तो उसका त्वरण है...",
      "te": "కారు వేగం స్థిరంగా ఉంటే, దాని త్వరణం..."
    },
    "options": [
      {
        "en": "Positive",
        "hi": "सकारात्मक",
        "te": "సానుకూలమైనది"
      },
      {
        "en": "Negative",
        "hi": "नकारात्मक",
        "te": "ప్రతికూలమైనది"
      },
      {
        "en": "Zero",
        "hi": "शून्य",
        "te": "సున్నా"
      },
      {
        "en": "Increasing",
        "hi": "की बढ़ती",
        "te": "పెరుగుతోంది"
      }
    ],
    "correctAnswer": {
      "en": "Zero",
      "hi": "शून्य",
      "te": "సున్నా"
    },
    "explanation": {
      "en": "Acceleration measures change in velocity; constant velocity means zero acceleration.",
      "hi": "त्वरण के उपाय वेग में परिवर्तन करते हैं; स्थिर वेग का अर्थ शून्य त्वरण है।",
      "te": "త్వరణం వేగంలో మార్పును కొలుస్తుంది; స్థిరమైన వేగం అంటే సున్నా త్వరణం."
    }
  },
  {
    "id": "phys-mech-motion-m-2",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Motion",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "On a distance–time graph, a steeper line indicates…",
      "hi": "दूरी-समय ग्राफ़ पर, एक तीव्र रेखा इंगित करती है...",
      "te": "దూరం-సమయం గ్రాఫ్‌లో, కోణీయ రేఖ సూచిస్తుంది..."
    },
    "options": [
      {
        "en": "Lower speed",
        "hi": "कम गति",
        "te": "తక్కువ వేగం"
      },
      {
        "en": "Higher speed",
        "hi": "उच्च गति",
        "te": "అధిక వేగం"
      },
      {
        "en": "Negative distance",
        "hi": "नकारात्मक दूरी",
        "te": "ప్రతికూల దూరం"
      },
      {
        "en": "Zero speed",
        "hi": "शून्य गति",
        "te": "సున్నా వేగం"
      }
    ],
    "correctAnswer": {
      "en": "Higher speed",
      "hi": "उच्च गति",
      "te": "అధిక వేగం"
    },
    "explanation": {
      "en": "Steeper slope on distance–time graphs means faster change in distance.",
      "hi": "दूरी-समय ग्राफ़ पर तेज़ ढलान का मतलब दूरी में तेज़ बदलाव है।",
      "te": "దూరం-సమయం గ్రాఫ్‌లపై కోణీయ వాలు అంటే దూరం వేగంగా మారడం."
    }
  },
  {
    "id": "phys-mech-motion-h-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Motion",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "Instantaneous velocity at a point on a position–time graph is given by…",
      "hi": "स्थिति-समय ग्राफ पर एक बिंदु पर तात्कालिक वेग किसके द्वारा दिया जाता है...",
      "te": "స్థానం-సమయం గ్రాఫ్‌లో ఒక బిందువు వద్ద తక్షణ వేగం అందించబడుతుంది…"
    },
    "options": [
      {
        "en": "The area under the curve",
        "hi": "वक्र के नीचे का क्षेत्र",
        "te": "వక్రరేఖ కింద ఉన్న ప్రాంతం"
      },
      {
        "en": "The slope of the tangent line",
        "hi": "स्पर्शरेखा रेखा का ढलान",
        "te": "టాంజెంట్ లైన్ యొక్క వాలు"
      },
      {
        "en": "The y-intercept of the graph",
        "hi": "ग्राफ़ का y-अवरोधन",
        "te": "గ్రాఫ్ యొక్క y-ఇంటర్‌సెప్ట్"
      },
      {
        "en": "The average of starting and ending speeds",
        "hi": "आरंभ और समाप्ति गति का औसत",
        "te": "ప్రారంభ మరియు ముగింపు వేగం యొక్క సగటు"
      }
    ],
    "correctAnswer": {
      "en": "The slope of the tangent line",
      "hi": "स्पर्शरेखा रेखा का ढलान",
      "te": "టాంజెంట్ లైన్ యొక్క వాలు"
    },
    "explanation": {
      "en": "Instantaneous velocity is the derivative of position with respect to time.",
      "hi": "तात्क्षणिक वेग समय के संबंध में स्थिति का व्युत्पन्न है।",
      "te": "తక్షణ వేగం అనేది సమయానికి సంబంధించి స్థానం యొక్క ఉత్పన్నం."
    }
  },
  {
    "id": "phys-mech-forces-e-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Forces",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "A force that opposes motion between two surfaces in contact is called…",
      "hi": "वह बल जो संपर्क में दो सतहों के बीच गति का विरोध करता है, कहलाता है...",
      "te": "సంపర్కంలో ఉన్న రెండు ఉపరితలాల మధ్య కదలికను వ్యతిరేకించే శక్తిని అంటారు..."
    },
    "options": [
      {
        "en": "Gravity",
        "hi": "गुरुत्वाकर्षण",
        "te": "గురుత్వాకర్షణ"
      },
      {
        "en": "Friction",
        "hi": "टकराव",
        "te": "ఘర్షణ"
      },
      {
        "en": "Tension",
        "hi": "तनाव",
        "te": "టెన్షన్"
      },
      {
        "en": "Normal force",
        "hi": "सामान्य बल",
        "te": "సాధారణ శక్తి"
      }
    ],
    "correctAnswer": {
      "en": "Friction",
      "hi": "टकराव",
      "te": "ఘర్షణ"
    },
    "explanation": {
      "en": "Friction resists relative motion between surfaces.",
      "hi": "घर्षण सतहों के बीच सापेक्ष गति का विरोध करता है।",
      "te": "ఘర్షణ ఉపరితలాల మధ్య సాపేక్ష కదలికను నిరోధిస్తుంది."
    }
  },
  {
    "id": "phys-mech-forces-e-2",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Forces",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The unit of force in the SI system is…",
      "hi": "SI प्रणाली में बल की इकाई है...",
      "te": "SI వ్యవస్థలో శక్తి యూనిట్…"
    },
    "options": [
      {
        "en": "Joule",
        "hi": "जौल",
        "te": "జూల్"
      },
      {
        "en": "Watt",
        "hi": "वाट",
        "te": "వాట్"
      },
      {
        "en": "Newton",
        "hi": "न्यूटन",
        "te": "న్యూటన్"
      },
      {
        "en": "Pascal",
        "hi": "पास्कल",
        "te": "పాస్కల్"
      }
    ],
    "correctAnswer": {
      "en": "Newton",
      "hi": "न्यूटन",
      "te": "న్యూటన్"
    },
    "explanation": {
      "en": "The newton (N) is the SI unit for force.",
      "hi": "न्यूटन (एन) बल के लिए एसआई इकाई है।",
      "te": "న్యూటన్ (N) అనేది శక్తికి SI యూనిట్."
    }
  },
  {
    "id": "phys-mech-forces-m-2",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Forces",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "If the net force on an object is zero, the object…",
      "hi": "यदि किसी वस्तु पर नेट बल शून्य है, तो वस्तु...",
      "te": "వస్తువుపై నికర బలం సున్నా అయితే, ఆ వస్తువు..."
    },
    "options": [
      {
        "en": "Must be at rest",
        "hi": "आराम करना चाहिए",
        "te": "విశ్రాంతిగా ఉండాలి"
      },
      {
        "en": "Must be moving",
        "hi": "चलती होगी",
        "te": "కదులుతూ ఉండాలి"
      },
      {
        "en": "Has no acceleration",
        "hi": "कोई त्वरण नहीं है",
        "te": "త్వరణం లేదు"
      },
      {
        "en": "Has negative acceleration",
        "hi": "ऋणात्मक त्वरण है",
        "te": "ప్రతికూల త్వరణం ఉంది"
      }
    ],
    "correctAnswer": {
      "en": "Has no acceleration",
      "hi": "कोई त्वरण नहीं है",
      "te": "త్వరణం లేదు"
    },
    "explanation": {
      "en": "Zero net force implies zero acceleration (Newton’s first law).",
      "hi": "शून्य शुद्ध बल का तात्पर्य शून्य त्वरण (न्यूटन का पहला नियम) है।",
      "te": "సున్నా నికర శక్తి సున్నా త్వరణాన్ని సూచిస్తుంది (న్యూటన్ యొక్క మొదటి చట్టం)."
    }
  },
  {
    "id": "phys-mech-forces-h-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Forces",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "Doubling the mass while keeping the same net force will make acceleration…",
      "hi": "समान शुद्ध बल रखते हुए द्रव्यमान को दोगुना करने से त्वरण उत्पन्न होगा...",
      "te": "అదే నికర శక్తిని ఉంచుతూ ద్రవ్యరాశిని రెట్టింపు చేయడం వల్ల త్వరణం పెరుగుతుంది…"
    },
    "options": [
      {
        "en": "Double",
        "hi": "दोहरा",
        "te": "రెట్టింపు"
      },
      {
        "en": "Half",
        "hi": "आधा",
        "te": "సగం"
      },
      {
        "en": "Stay the same",
        "hi": "ऐसे ही रहना",
        "te": "అలాగే ఉండండి"
      },
      {
        "en": "Zero",
        "hi": "शून्य",
        "te": "సున్నా"
      }
    ],
    "correctAnswer": {
      "en": "Half",
      "hi": "आधा",
      "te": "సగం"
    },
    "explanation": {
      "en": "From F = ma, if F is constant and m doubles, a must be halved.",
      "hi": "F = ma से, यदि F स्थिर है और m दोगुना हो जाता है, तो a को आधा करना होगा।",
      "te": "F = ma నుండి, F స్థిరంగా మరియు m రెట్టింపు అయితే, తప్పనిసరిగా సగానికి తగ్గించబడాలి."
    }
  },
  {
    "id": "phys-mech-energy-e-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Energy",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Potential energy due to height above the ground is called…",
      "hi": "जमीन से ऊंचाई के कारण संभावित ऊर्जा कहलाती है...",
      "te": "భూమి పైన ఉన్న ఎత్తు కారణంగా సంభావ్య శక్తిని అంటారు..."
    },
    "options": [
      {
        "en": "Thermal energy",
        "hi": "थर्मल ऊर्जा",
        "te": "ఉష్ణ శక్తి"
      },
      {
        "en": "Kinetic energy",
        "hi": "गतिज ऊर्जा",
        "te": "గతి శక్తి"
      },
      {
        "en": "Gravitational potential energy",
        "hi": "गुरुत्वाकर्षण स्थितिज ऊर्जा",
        "te": "గురుత్వాకర్షణ సంభావ్య శక్తి"
      },
      {
        "en": "Chemical energy",
        "hi": "रसायन ऊर्जा",
        "te": "రసాయన శక్తి"
      }
    ],
    "correctAnswer": {
      "en": "Gravitational potential energy",
      "hi": "गुरुत्वाकर्षण स्थितिज ऊर्जा",
      "te": "గురుత్వాకర్షణ సంభావ్య శక్తి"
    },
    "explanation": {
      "en": "Energy stored due to an object’s position in a gravitational field.",
      "hi": "गुरुत्वाकर्षण क्षेत्र में किसी वस्तु की स्थिति के कारण संग्रहीत ऊर्जा।",
      "te": "గురుత్వాకర్షణ క్షేత్రంలో వస్తువు యొక్క స్థానం కారణంగా నిల్వ చేయబడిన శక్తి."
    }
  },
  {
    "id": "phys-mech-energy-e-2",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Energy",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The unit of energy in the SI system is…",
      "hi": "SI प्रणाली में ऊर्जा की इकाई है...",
      "te": "SI వ్యవస్థలో శక్తి యూనిట్…"
    },
    "options": [
      {
        "en": "Joule",
        "hi": "जौल",
        "te": "జూల్"
      },
      {
        "en": "Newton",
        "hi": "न्यूटन",
        "te": "న్యూటన్"
      },
      {
        "en": "Watt",
        "hi": "वाट",
        "te": "వాట్"
      },
      {
        "en": "Pascal",
        "hi": "पास्कल",
        "te": "పాస్కల్"
      }
    ],
    "correctAnswer": {
      "en": "Joule",
      "hi": "जौल",
      "te": "జూల్"
    },
    "explanation": {
      "en": "Energy is measured in joules (J).",
      "hi": "ऊर्जा को जूल (J) में मापा जाता है।",
      "te": "శక్తిని జూల్స్ (J)లో కొలుస్తారు."
    }
  },
  {
    "id": "phys-mech-energy-m-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Energy",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Which change will increase an object’s kinetic energy the most?",
      "hi": "कौन सा परिवर्तन किसी वस्तु की गतिज ऊर्जा को सबसे अधिक बढ़ाएगा?",
      "te": "ఏ మార్పు వస్తువు యొక్క గతి శక్తిని ఎక్కువగా పెంచుతుంది?"
    },
    "options": [
      {
        "en": "Doubling its mass at constant speed",
        "hi": "स्थिर गति से इसके द्रव्यमान को दोगुना करना",
        "te": "స్థిరమైన వేగంతో దాని ద్రవ్యరాశిని రెట్టింపు చేస్తుంది"
      },
      {
        "en": "Doubling its speed at constant mass",
        "hi": "स्थिर द्रव्यमान पर इसकी गति दोगुनी हो जाती है",
        "te": "స్థిరమైన ద్రవ్యరాశి వద్ద దాని వేగాన్ని రెట్టింపు చేస్తుంది"
      },
      {
        "en": "Halving its speed",
        "hi": "इसकी गति आधी कर दी जाए",
        "te": "దాని వేగాన్ని సగానికి తగ్గించడం"
      },
      {
        "en": "Halving its mass",
        "hi": "इसके द्रव्यमान को आधा करना",
        "te": "దాని ద్రవ్యరాశిని సగానికి తగ్గించడం"
      }
    ],
    "correctAnswer": {
      "en": "Doubling its speed at constant mass",
      "hi": "स्थिर द्रव्यमान पर इसकी गति दोगुनी हो जाती है",
      "te": "స్థిరమైన ద్రవ్యరాశి వద్ద దాని వేగాన్ని రెట్టింపు చేస్తుంది"
    },
    "explanation": {
      "en": "Kinetic energy is ½mv², so it depends on the square of speed.",
      "hi": "गतिज ऊर्जा ½mv² है, इसलिए यह गति के वर्ग पर निर्भर करती है।",
      "te": "గతి శక్తి ½mv², కనుక ఇది వేగం యొక్క వర్గాన్ని బట్టి ఉంటుంది."
    }
  },
  {
    "id": "phys-mech-energy-h-1",
    "subject": "Physics",
    "chapter": "Mechanics",
    "topic": "Energy",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "In a closed system with no non‑conservative forces, the total mechanical energy…",
      "hi": "बिना किसी गैर-रूढ़िवादी बलों वाली एक बंद प्रणाली में, कुल यांत्रिक ऊर्जा...",
      "te": "సాంప్రదాయేతర శక్తులు లేని క్లోజ్డ్ సిస్టమ్‌లో, మొత్తం యాంత్రిక శక్తి…"
    },
    "options": [
      {
        "en": "Always increases",
        "hi": "हमेशा बढ़ता रहता है",
        "te": "ఎల్లప్పుడూ పెరుగుతుంది"
      },
      {
        "en": "Always decreases",
        "hi": "हमेशा घटता है",
        "te": "ఎప్పుడూ తగ్గుతుంది"
      },
      {
        "en": "Is conserved",
        "hi": "संरक्षित है",
        "te": "సంరక్షించబడింది"
      },
      {
        "en": "Becomes zero",
        "hi": "शून्य हो जाता है",
        "te": "సున్నా అవుతుంది"
      }
    ],
    "correctAnswer": {
      "en": "Is conserved",
      "hi": "संरक्षित है",
      "te": "సంరక్షించబడింది"
    },
    "explanation": {
      "en": "Conservation of energy states total energy remains constant in a closed system.",
      "hi": "ऊर्जा संरक्षण में कहा गया है कि किसी बंद प्रणाली में कुल ऊर्जा स्थिर रहती है।",
      "te": "శక్తి స్థితిస్థాపన పరిరక్షణ మొత్తం శక్తి ఒక క్లోజ్డ్ సిస్టమ్‌లో స్థిరంగా ఉంటుంది."
    }
  },
  {
    "id": "chem-atoms-e-2",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Atoms",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "Which subatomic particle has a negative charge?",
      "hi": "किस उपपरमाण्विक कण पर ऋणात्मक आवेश होता है?",
      "te": "ఏ సబ్‌టామిక్ కణం ప్రతికూల చార్జ్‌ని కలిగి ఉంటుంది?"
    },
    "options": [
      {
        "en": "Proton",
        "hi": "प्रोटोन",
        "te": "ప్రోటాన్"
      },
      {
        "en": "Neutron",
        "hi": "न्यूट्रॉन",
        "te": "న్యూట్రాన్"
      },
      {
        "en": "Electron",
        "hi": "इलेक्ट्रॉन",
        "te": "ఎలక్ట్రాన్"
      },
      {
        "en": "Nucleus",
        "hi": "नाभिक",
        "te": "న్యూక్లియస్"
      }
    ],
    "correctAnswer": {
      "en": "Electron",
      "hi": "इलेक्ट्रॉन",
      "te": "ఎలక్ట్రాన్"
    },
    "explanation": {
      "en": "Electrons carry negative electric charge.",
      "hi": "इलेक्ट्रॉन ऋणात्मक विद्युत आवेश वहन करते हैं।",
      "te": "ఎలక్ట్రాన్లు ప్రతికూల విద్యుత్ చార్జ్ కలిగి ఉంటాయి."
    }
  },
  {
    "id": "chem-atoms-m-1",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Atoms",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Changing the number of protons in an atom changes its…",
      "hi": "किसी परमाणु में प्रोटॉनों की संख्या बदलने से उसका आकार बदल जाता है...",
      "te": "పరమాణువులోని ప్రోటాన్‌ల సంఖ్యను మార్చడం వల్ల దాని..."
    },
    "options": [
      {
        "en": "Mass number only",
        "hi": "केवल द्रव्यमान संख्या",
        "te": "మాస్ నంబర్ మాత్రమే"
      },
      {
        "en": "Charge only",
        "hi": "केवल चार्ज करें",
        "te": "ఛార్జ్ మాత్రమే"
      },
      {
        "en": "Element identity",
        "hi": "तत्व पहचान",
        "te": "మూలకం గుర్తింపు"
      },
      {
        "en": "Isotope only",
        "hi": "केवल आइसोटोप",
        "te": "ఐసోటోప్ మాత్రమే"
      }
    ],
    "correctAnswer": {
      "en": "Element identity",
      "hi": "तत्व पहचान",
      "te": "మూలకం గుర్తింపు"
    },
    "explanation": {
      "en": "The number of protons (atomic number) defines which element it is.",
      "hi": "प्रोटॉनों की संख्या (परमाणु संख्या) परिभाषित करती है कि यह कौन सा तत्व है।",
      "te": "ప్రోటాన్ల సంఖ్య (పరమాణు సంఖ్య) అది ఏ మూలకాన్ని నిర్వచిస్తుంది."
    }
  },
  {
    "id": "chem-atoms-m-2",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Atoms",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Isotopes of the same element have…",
      "hi": "एक ही तत्व के समस्थानिकों में…",
      "te": "ఒకే మూలకం యొక్క ఐసోటోపులు ఉన్నాయి..."
    },
    "options": [
      {
        "en": "Different numbers of protons, same neutrons",
        "hi": "प्रोटॉन की भिन्न संख्या, समान न्यूट्रॉन",
        "te": "వేర్వేరు సంఖ్యలో ప్రోటాన్లు, అదే న్యూట్రాన్లు"
      },
      {
        "en": "Same numbers of protons, different neutrons",
        "hi": "प्रोटॉन की समान संख्या, अलग-अलग न्यूट्रॉन",
        "te": "ఒకే సంఖ్యలో ప్రోటాన్లు, వివిధ న్యూట్రాన్లు"
      },
      {
        "en": "Different protons and electrons",
        "hi": "विभिन्न प्रोटॉन और इलेक्ट्रॉन",
        "te": "వివిధ ప్రోటాన్లు మరియు ఎలక్ట్రాన్లు"
      },
      {
        "en": "No neutrons at all",
        "hi": "बिल्कुल भी न्यूट्रॉन नहीं",
        "te": "న్యూట్రాన్లు అస్సలు లేవు"
      }
    ],
    "correctAnswer": {
      "en": "Same numbers of protons, different neutrons",
      "hi": "प्रोटॉन की समान संख्या, अलग-अलग न्यूट्रॉन",
      "te": "ఒకే సంఖ్యలో ప్రోటాన్లు, వివిధ న్యూట్రాన్లు"
    },
    "explanation": {
      "en": "Isotopes vary in neutron count but have the same proton count.",
      "hi": "आइसोटोप न्यूट्रॉन गिनती में भिन्न होते हैं लेकिन प्रोटॉन गिनती समान होती है।",
      "te": "ఐసోటోపులు న్యూట్రాన్ గణనలో మారుతూ ఉంటాయి కానీ అదే ప్రోటాన్ గణనను కలిగి ఉంటాయి."
    }
  },
  {
    "id": "chem-atoms-h-1",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Atoms",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "The mass number of an atom is equal to…",
      "hi": "एक परमाणु की द्रव्यमान संख्या बराबर होती है...",
      "te": "పరమాణువు ద్రవ్యరాశి సంఖ్య దీనికి సమానం..."
    },
    "options": [
      {
        "en": "Protons minus electrons",
        "hi": "प्रोटॉन माइनस इलेक्ट्रॉन",
        "te": "ప్రోటాన్లు మైనస్ ఎలక్ట్రాన్లు"
      },
      {
        "en": "Protons plus neutrons",
        "hi": "प्रोटॉन प्लस न्यूट्रॉन",
        "te": "ప్రోటాన్లు ప్లస్ న్యూట్రాన్లు"
      },
      {
        "en": "Neutrons minus protons",
        "hi": "न्यूट्रॉन माइनस प्रोटॉन",
        "te": "న్యూట్రాన్లు మైనస్ ప్రోటాన్లు"
      },
      {
        "en": "Electrons plus neutrons",
        "hi": "इलेक्ट्रॉन प्लस न्यूट्रॉन",
        "te": "ఎలక్ట్రాన్లు ప్లస్ న్యూట్రాన్లు"
      }
    ],
    "correctAnswer": {
      "en": "Protons plus neutrons",
      "hi": "प्रोटॉन प्लस न्यूट्रॉन",
      "te": "ప్రోటాన్లు ప్లస్ న్యూట్రాన్లు"
    },
    "explanation": {
      "en": "Mass number counts the total number of protons and neutrons.",
      "hi": "द्रव्यमान संख्या प्रोटॉन और न्यूट्रॉन की कुल संख्या की गणना करती है।",
      "te": "ద్రవ్యరాశి సంఖ్య ప్రోటాన్లు మరియు న్యూట్రాన్ల మొత్తం సంఖ్యను లెక్కిస్తుంది."
    }
  },
  {
    "id": "chem-reactions-e-1",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Reactions",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "In a balanced chemical equation, the number of each type of atom on both sides is…",
      "hi": "एक संतुलित रासायनिक समीकरण में, दोनों तरफ प्रत्येक प्रकार के परमाणु की संख्या होती है...",
      "te": "సమతుల్య రసాయన సమీకరణంలో, రెండు వైపులా ఉన్న ప్రతి రకమైన అణువుల సంఖ్య..."
    },
    "options": [
      {
        "en": "Greater on the product side",
        "hi": "उत्पाद पक्ष पर बेहतर",
        "te": "ఉత్పత్తి వైపు ఎక్కువ"
      },
      {
        "en": "Greater on the reactant side",
        "hi": "अभिकारक पक्ष पर अधिक",
        "te": "రియాక్టెంట్ వైపు ఎక్కువ"
      },
      {
        "en": "Equal",
        "hi": "बराबर",
        "te": "సమానం"
      },
      {
        "en": "Zero",
        "hi": "शून्य",
        "te": "సున్నా"
      }
    ],
    "correctAnswer": {
      "en": "Equal",
      "hi": "बराबर",
      "te": "సమానం"
    },
    "explanation": {
      "en": "Balanced equations obey the law of conservation of mass.",
      "hi": "संतुलित समीकरण द्रव्यमान संरक्षण के नियम का पालन करते हैं।",
      "te": "సమతుల్య సమీకరణాలు ద్రవ్యరాశి పరిరక్షణ నియమాన్ని పాటిస్తాయి."
    }
  },
  {
    "id": "chem-reactions-e-2",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Reactions",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "A substance that speeds up a reaction without being used up is called a…",
      "hi": "वह पदार्थ जो बिना उपयोग किये प्रतिक्रिया को तेज कर देता है, कहलाता है...",
      "te": "ఉపయోగించకుండా ప్రతిచర్యను వేగవంతం చేసే పదార్థాన్ని అంటారు…"
    },
    "options": [
      {
        "en": "Solvent",
        "hi": "विलायक",
        "te": "ద్రావకం"
      },
      {
        "en": "Reactant",
        "hi": "अभिकारक",
        "te": "రియాక్టెంట్"
      },
      {
        "en": "Catalyst",
        "hi": "उत्प्रेरक",
        "te": "ఉత్ప్రేరకం"
      },
      {
        "en": "Product",
        "hi": "उत्पाद",
        "te": "ఉత్పత్తి"
      }
    ],
    "correctAnswer": {
      "en": "Catalyst",
      "hi": "उत्प्रेरक",
      "te": "ఉత్ప్రేరకం"
    },
    "explanation": {
      "en": "Catalysts increase reaction rate and are regenerated at the end.",
      "hi": "उत्प्रेरक प्रतिक्रिया दर को बढ़ाते हैं और अंत में पुनर्जीवित होते हैं।",
      "te": "ఉత్ప్రేరకాలు ప్రతిచర్య రేటును పెంచుతాయి మరియు చివరిలో పునరుత్పత్తి చేయబడతాయి."
    }
  },
  {
    "id": "chem-reactions-m-2",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Reactions",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "When two clear solutions are mixed and a solid forms, this solid is called a…",
      "hi": "जब दो स्पष्ट घोलों को मिलाया जाता है और एक ठोस बनता है, तो इस ठोस को…",
      "te": "రెండు స్పష్టమైన పరిష్కారాలు కలిపి ఒక ఘన రూపాన్ని కలిగి ఉన్నప్పుడు, ఈ ఘనాన్ని ఒక…"
    },
    "options": [
      {
        "en": "Gas",
        "hi": "गैस",
        "te": "గ్యాస్"
      },
      {
        "en": "Precipitate",
        "hi": "तलछट",
        "te": "అవక్షేపం"
      },
      {
        "en": "Reactant",
        "hi": "अभिकारक",
        "te": "రియాక్టెంట్"
      },
      {
        "en": "Solvent",
        "hi": "विलायक",
        "te": "ద్రావకం"
      }
    ],
    "correctAnswer": {
      "en": "Precipitate",
      "hi": "तलछट",
      "te": "అవక్షేపం"
    },
    "explanation": {
      "en": "A precipitate is an insoluble solid that forms in a solution.",
      "hi": "अवक्षेप एक अघुलनशील ठोस है जो घोल में बनता है।",
      "te": "అవక్షేపం అనేది ఒక ద్రావణంలో ఏర్పడే కరగని ఘనపదార్థం."
    }
  },
  {
    "id": "chem-reactions-h-1",
    "subject": "Chemistry",
    "chapter": "Chemical Reactions",
    "topic": "Reactions",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "In an exothermic reaction, energy is…",
      "hi": "एक ऊष्माक्षेपी प्रतिक्रिया में, ऊर्जा है…",
      "te": "ఎక్సోథర్మిక్ ప్రతిచర్యలో, శక్తి…"
    },
    "options": [
      {
        "en": "Absorbed from surroundings",
        "hi": "परिवेश से अवशोषित",
        "te": "పరిసరాల నుండి గ్రహించబడింది"
      },
      {
        "en": "Released to surroundings",
        "hi": "परिवेश में जारी किया गया",
        "te": "పరిసరాలకు విడుదల చేశారు"
      },
      {
        "en": "Unchanged",
        "hi": "स्थिर",
        "te": "మారలేదు"
      },
      {
        "en": "Converted entirely to mass",
        "hi": "पूर्णतः द्रव्यमान में परिवर्तित हो गया",
        "te": "పూర్తిగా మాస్‌గా మార్చబడింది"
      }
    ],
    "correctAnswer": {
      "en": "Released to surroundings",
      "hi": "परिवेश में जारी किया गया",
      "te": "పరిసరాలకు విడుదల చేశారు"
    },
    "explanation": {
      "en": "Exothermic reactions give off heat to their surroundings.",
      "hi": "ऊष्माक्षेपी प्रतिक्रियाएँ उनके परिवेश को गर्मी देती हैं।",
      "te": "ఎక్సోథర్మిక్ ప్రతిచర్యలు వాటి పరిసరాలకు వేడిని ఇస్తాయి."
    }
  },
  {
    "id": "hist-ancient-egypt-e-1",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Pharaoh Trials",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The Nile River was important to ancient Egypt because it…",
      "hi": "नील नदी प्राचीन मिस्र के लिए महत्वपूर्ण थी क्योंकि यह…",
      "te": "పురాతన ఈజిప్టుకు నైలు నది ముఖ్యమైనది ఎందుకంటే అది…"
    },
    "options": [
      {
        "en": "Separated Egypt from all neighbors",
        "hi": "मिस्र को सभी पड़ोसियों से अलग कर दिया",
        "te": "అన్ని పొరుగు దేశాల నుండి ఈజిప్టును వేరు చేసింది"
      },
      {
        "en": "Provided water, transportation, and fertile soil",
        "hi": "पानी, परिवहन और उपजाऊ मिट्टी उपलब्ध करायी",
        "te": "నీరు, రవాణా మరియు సారవంతమైన నేల అందించబడింది"
      },
      {
        "en": "Was worshipped as the only god",
        "hi": "एकमात्र देवता के रूप में पूजा जाता था",
        "te": "ఏకైక దేవుడిగా పూజించబడ్డాడు"
      },
      {
        "en": "Was the site of the Olympics",
        "hi": "ओलंपिक का स्थल था",
        "te": "ఒలింపిక్స్ జరిగే ప్రదేశం"
      }
    ],
    "correctAnswer": {
      "en": "Provided water, transportation, and fertile soil",
      "hi": "पानी, परिवहन और उपजाऊ मिट्टी उपलब्ध करायी",
      "te": "నీరు, రవాణా మరియు సారవంతమైన నేల అందించబడింది"
    },
    "explanation": {
      "en": "The Nile’s yearly flooding created fertile land and supported Egyptian life.",
      "hi": "नील नदी की वार्षिक बाढ़ ने उपजाऊ भूमि का निर्माण किया और मिस्र के जीवन को सहारा दिया।",
      "te": "నైలు నది యొక్క వార్షిక వరదలు సారవంతమైన భూమిని సృష్టించాయి మరియు ఈజిప్షియన్ జీవితానికి మద్దతునిచ్చాయి."
    }
  },
  {
    "id": "hist-ancient-egypt-e-2",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Pharaoh Trials",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "A pharaoh in ancient Egypt was…",
      "hi": "प्राचीन मिस्र में एक फिरौन था...",
      "te": "పురాతన ఈజిప్టులో ఒక ఫారో…"
    },
    "options": [
      {
        "en": "A military general only",
        "hi": "केवल एक सैन्य जनरल",
        "te": "సైనిక జనరల్ మాత్రమే"
      },
      {
        "en": "A divine king",
        "hi": "एक दिव्य राजा",
        "te": "ఒక దివ్య రాజు"
      },
      {
        "en": "A merchant",
        "hi": "एक व्यापारी",
        "te": "ఒక వ్యాపారి"
      },
      {
        "en": "A foreign governor",
        "hi": "एक विदेशी गवर्नर",
        "te": "ఒక విదేశీ గవర్నర్"
      }
    ],
    "correctAnswer": {
      "en": "A divine king",
      "hi": "एक दिव्य राजा",
      "te": "ఒక దివ్య రాజు"
    },
    "explanation": {
      "en": "Pharaohs were considered both political rulers and living gods.",
      "hi": "फिरौन को राजनीतिक शासक और जीवित देवता दोनों माना जाता था।",
      "te": "ఫారోలు రాజకీయ పాలకులు మరియు సజీవ దేవతలుగా పరిగణించబడ్డారు."
    }
  },
  {
    "id": "hist-ancient-egypt-m-1",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Pharaoh Trials",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Pyramids in Egypt were primarily built as…",
      "hi": "मिस्र में पिरामिड मुख्य रूप से बनाए गए थे…",
      "te": "ఈజిప్టులోని పిరమిడ్‌లు ప్రధానంగా ఇలా నిర్మించబడ్డాయి..."
    },
    "options": [
      {
        "en": "Defense structures",
        "hi": "रक्षा संरचनाएँ",
        "te": "రక్షణ నిర్మాణాలు"
      },
      {
        "en": "Markets",
        "hi": "बाज़ार",
        "te": "మార్కెట్లు"
      },
      {
        "en": "Royal tombs",
        "hi": "शाही कब्रें",
        "te": "రాజ సమాధులు"
      },
      {
        "en": "Schools",
        "hi": "स्कूलों",
        "te": "పాఠశాలలు"
      }
    ],
    "correctAnswer": {
      "en": "Royal tombs",
      "hi": "शाही कब्रें",
      "te": "రాజ సమాధులు"
    },
    "explanation": {
      "en": "Pyramids served as monumental tombs for pharaohs.",
      "hi": "पिरामिड फिरौन के लिए स्मारकीय कब्रों के रूप में काम करते थे।",
      "te": "పిరమిడ్లు ఫారోలకు స్మారక సమాధులుగా పనిచేశాయి."
    }
  },
  {
    "id": "hist-ancient-egypt-h-1",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Pharaoh Trials",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "The writing system of ancient Egypt is known as…",
      "hi": "प्राचीन मिस्र की लेखन प्रणाली को कहा जाता है...",
      "te": "పురాతన ఈజిప్టు యొక్క వ్రాత విధానాన్ని అంటారు..."
    },
    "options": [
      {
        "en": "Cuneiform",
        "hi": "क्यूनेइफ़ॉर्म",
        "te": "క్యూనిఫారం"
      },
      {
        "en": "Hieroglyphics",
        "hi": "चित्रलेख",
        "te": "చిత్రలిపి"
      },
      {
        "en": "Sanskrit",
        "hi": "संस्कृत",
        "te": "సంస్కృతం"
      },
      {
        "en": "Latin",
        "hi": "लैटिन",
        "te": "లాటిన్"
      }
    ],
    "correctAnswer": {
      "en": "Hieroglyphics",
      "hi": "चित्रलेख",
      "te": "చిత్రలిపి"
    },
    "explanation": {
      "en": "Hieroglyphics used picture symbols to represent sounds and ideas.",
      "hi": "चित्रलिपि में ध्वनियों और विचारों को दर्शाने के लिए चित्र प्रतीकों का उपयोग किया जाता था।",
      "te": "శబ్దాలు మరియు ఆలోచనలను సూచించడానికి చిత్రలిపి చిత్ర చిహ్నాలను ఉపయోగించింది."
    }
  },
  {
    "id": "hist-ancient-greece-e-1",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Olympus Challenges",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The Olympics in ancient Greece were originally held to honor…",
      "hi": "प्राचीन ग्रीस में ओलंपिक मूल रूप से सम्मान के लिए आयोजित किए गए थे...",
      "te": "పురాతన గ్రీస్‌లో ఒలింపిక్స్ మొదట గౌరవార్థం నిర్వహించబడ్డాయి…"
    },
    "options": [
      {
        "en": "Zeus",
        "hi": "ज़ीउस",
        "te": "జ్యూస్"
      },
      {
        "en": "Poseidon",
        "hi": "Poseidon",
        "te": "పోసిడాన్"
      },
      {
        "en": "Athena",
        "hi": "एथेना",
        "te": "ఎథీనా"
      },
      {
        "en": "Apollo",
        "hi": "अपोलो",
        "te": "అపోలో"
      }
    ],
    "correctAnswer": {
      "en": "Zeus",
      "hi": "ज़ीउस",
      "te": "జ్యూస్"
    },
    "explanation": {
      "en": "The Olympic Games were part of a religious festival dedicated to Zeus.",
      "hi": "ओलंपिक खेल ज़ीउस को समर्पित एक धार्मिक उत्सव का हिस्सा थे।",
      "te": "ఒలింపిక్ క్రీడలు జ్యూస్‌కు అంకితమైన మతపరమైన పండుగలో భాగంగా ఉన్నాయి."
    }
  },
  {
    "id": "hist-ancient-greece-e-2",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Olympus Challenges",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The city‑state famous for developing early democracy was…",
      "hi": "प्रारंभिक लोकतंत्र विकसित करने के लिए प्रसिद्ध शहर-राज्य था...",
      "te": "ప్రారంభ ప్రజాస్వామ్యాన్ని అభివృద్ధి చేయడంలో ప్రసిద్ధి చెందిన నగర-రాష్ట్రం…"
    },
    "options": [
      {
        "en": "Sparta",
        "hi": "स्पार्टा",
        "te": "స్పార్టా"
      },
      {
        "en": "Athens",
        "hi": "एथेंस",
        "te": "ఏథెన్స్"
      },
      {
        "en": "Corinth",
        "hi": "कोरिंथ",
        "te": "కొరింథు"
      },
      {
        "en": "Thebes",
        "hi": "थेबेस",
        "te": "తీబ్స్"
      }
    ],
    "correctAnswer": {
      "en": "Athens",
      "hi": "एथेंस",
      "te": "ఏథెన్స్"
    },
    "explanation": {
      "en": "Athens experimented with direct democratic government.",
      "hi": "एथेंस ने प्रत्यक्ष लोकतांत्रिक सरकार का प्रयोग किया।",
      "te": "ఏథెన్స్ ప్రత్యక్ష ప్రజాస్వామ్య ప్రభుత్వంతో ప్రయోగాలు చేసింది."
    }
  },
  {
    "id": "hist-ancient-greece-m-1",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Olympus Challenges",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Which philosopher taught Alexander the Great?",
      "hi": "किस दार्शनिक ने सिकंदर महान को शिक्षा दी?",
      "te": "అలెగ్జాండర్ ది గ్రేట్ బోధించిన తత్వవేత్త ఎవరు?"
    },
    "options": [
      {
        "en": "Socrates",
        "hi": "सुकरात",
        "te": "సోక్రటీస్"
      },
      {
        "en": "Plato",
        "hi": "प्लेटो",
        "te": "ప్లేటో"
      },
      {
        "en": "Aristotle",
        "hi": "अरस्तू",
        "te": "అరిస్టాటిల్"
      },
      {
        "en": "Pythagoras",
        "hi": "पाइथागोरस",
        "te": "పైథాగరస్"
      }
    ],
    "correctAnswer": {
      "en": "Aristotle",
      "hi": "अरस्तू",
      "te": "అరిస్టాటిల్"
    },
    "explanation": {
      "en": "Aristotle was hired to tutor the young Alexander of Macedon.",
      "hi": "अरस्तू को मैसेडोन के युवा अलेक्जेंडर को पढ़ाने के लिए काम पर रखा गया था।",
      "te": "అరిస్టాటిల్ మాసిడోన్ యువ అలెగ్జాండర్‌కు బోధించడానికి నియమించబడ్డాడు."
    }
  },
  {
    "id": "hist-ancient-greece-h-1",
    "subject": "History",
    "chapter": "Ancient History",
    "topic": "Olympus Challenges",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "A Greek polis was…",
      "hi": "एक यूनानी पोलिस था...",
      "te": "ఒక గ్రీక్ పోలిస్…"
    },
    "options": [
      {
        "en": "A temple",
        "hi": "एक मंदिर",
        "te": "ఒక దేవాలయం"
      },
      {
        "en": "A city‑state",
        "hi": "एक शहर-राज्य",
        "te": "ఒక నగర-రాష్ట్రం"
      },
      {
        "en": "A coin",
        "hi": "सिक्का",
        "te": "ఒక నాణెం"
      },
      {
        "en": "A festival",
        "hi": "एक त्यौहार",
        "te": "ఒక పండుగ"
      }
    ],
    "correctAnswer": {
      "en": "A city‑state",
      "hi": "एक शहर-राज्य",
      "te": "ఒక నగర-రాష్ట్రం"
    },
    "explanation": {
      "en": "The polis was the basic political unit in Greece, often a city and its surrounding countryside.",
      "hi": "पोलिस ग्रीस में बुनियादी राजनीतिक इकाई थी, जो अक्सर एक शहर और उसके आसपास का ग्रामीण इलाका होता था।",
      "te": "పోలిస్ అనేది గ్రీస్‌లో ప్రాథమిక రాజకీయ విభాగం, తరచుగా ఒక నగరం మరియు దాని చుట్టుపక్కల గ్రామీణ ప్రాంతాలు."
    }
  },
  {
    "id": "hist-modern-ww2-e-1",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "WWII Survival Run",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "World War II began in Europe when Germany invaded…",
      "hi": "द्वितीय विश्व युद्ध यूरोप में तब शुरू हुआ जब जर्मनी ने आक्रमण किया...",
      "te": "జర్మనీ దాడి చేయడంతో ఐరోపాలో రెండవ ప్రపంచ యుద్ధం ప్రారంభమైంది…"
    },
    "options": [
      {
        "en": "France",
        "hi": "फ्रांस",
        "te": "ఫ్రాన్స్"
      },
      {
        "en": "Poland",
        "hi": "पोलैंड",
        "te": "పోలాండ్"
      },
      {
        "en": "Italy",
        "hi": "इटली",
        "te": "ఇటలీ"
      },
      {
        "en": "Russia",
        "hi": "रूस",
        "te": "రష్యా"
      }
    ],
    "correctAnswer": {
      "en": "Poland",
      "hi": "पोलैंड",
      "te": "పోలాండ్"
    },
    "explanation": {
      "en": "Germany’s 1939 invasion of Poland led Britain and France to declare war.",
      "hi": "जर्मनी के 1939 में पोलैंड पर आक्रमण के कारण ब्रिटेन और फ्रांस को युद्ध की घोषणा करनी पड़ी।",
      "te": "పోలాండ్‌పై జర్మనీ 1939 దండయాత్ర బ్రిటన్ మరియు ఫ్రాన్స్‌లను యుద్ధం ప్రకటించేలా చేసింది."
    }
  },
  {
    "id": "hist-modern-ww2-e-2",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "WWII Survival Run",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The alliance of Germany, Italy, and Japan was called the…",
      "hi": "जर्मनी, इटली और जापान के गठबंधन को कहा जाता था...",
      "te": "జర్మనీ, ఇటలీ మరియు జపాన్‌ల కూటమిని..."
    },
    "options": [
      {
        "en": "Allies",
        "hi": "मित्र राष्ट्रों",
        "te": "మిత్రులు"
      },
      {
        "en": "Axis Powers",
        "hi": "धुरी शक्तियां",
        "te": "యాక్సిస్ పవర్స్"
      },
      {
        "en": "League of Nations",
        "hi": "राष्ट्रों का संघटन",
        "te": "లీగ్ ఆఫ్ నేషన్స్"
      },
      {
        "en": "Triple Entente",
        "hi": "ट्रिपल अंतंत",
        "te": "ట్రిపుల్ ఎంటెంటే"
      }
    ],
    "correctAnswer": {
      "en": "Axis Powers",
      "hi": "धुरी शक्तियां",
      "te": "యాక్సిస్ పవర్స్"
    },
    "explanation": {
      "en": "Germany, Italy, and Japan formed the Axis alliance.",
      "hi": "जर्मनी, इटली और जापान ने एक्सिस गठबंधन बनाया।",
      "te": "జర్మనీ, ఇటలీ, జపాన్ యాక్సిస్ కూటమిగా ఏర్పడ్డాయి."
    }
  },
  {
    "id": "hist-modern-ww2-m-1",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "WWII Survival Run",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "D‑Day refers to the Allied invasion of…",
      "hi": "डी‑डे मित्र देशों के आक्रमण को संदर्भित करता है…",
      "te": "డి-డే మిత్రరాజ్యాల దండయాత్రను సూచిస్తుంది…"
    },
    "options": [
      {
        "en": "North Africa",
        "hi": "उत्तरी अफ्रीका",
        "te": "ఉత్తర ఆఫ్రికా"
      },
      {
        "en": "Italy",
        "hi": "इटली",
        "te": "ఇటలీ"
      },
      {
        "en": "Normandy, France",
        "hi": "नॉर्मंडी, फ़्रांस",
        "te": "నార్మాండీ, ఫ్రాన్స్"
      },
      {
        "en": "Germany",
        "hi": "जर्मनी",
        "te": "జర్మనీ"
      }
    ],
    "correctAnswer": {
      "en": "Normandy, France",
      "hi": "नॉर्मंडी, फ़्रांस",
      "te": "నార్మాండీ, ఫ్రాన్స్"
    },
    "explanation": {
      "en": "On June 6, 1944, Allied forces landed on the beaches of Normandy.",
      "hi": "6 जून, 1944 को मित्र सेनाएँ नॉर्मंडी के समुद्र तटों पर उतरीं।",
      "te": "జూన్ 6, 1944 న, మిత్రరాజ్యాల దళాలు నార్మాండీ బీచ్‌లలో అడుగుపెట్టాయి."
    }
  },
  {
    "id": "hist-modern-ww2-h-1",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "WWII Survival Run",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "The systematic genocide of six million Jews during WWII is known as the…",
      "hi": "द्वितीय विश्व युद्ध के दौरान छह मिलियन यहूदियों के व्यवस्थित नरसंहार को ... के रूप में जाना जाता है।",
      "te": "WWII సమయంలో ఆరు మిలియన్ల యూదుల క్రమబద్ధమైన మారణహోమం అంటారు..."
    },
    "options": [
      {
        "en": "Great Purge",
        "hi": "महान शुद्धिकरण",
        "te": "గొప్ప ప్రక్షాళన"
      },
      {
        "en": "Holocaust",
        "hi": "प्रलय",
        "te": "హోలోకాస్ట్"
      },
      {
        "en": "Cold War",
        "hi": "शीत युद्ध",
        "te": "ప్రచ్ఛన్న యుద్ధం"
      },
      {
        "en": "Cultural Revolution",
        "hi": "सांस्कृतिक क्रांति",
        "te": "సాంస్కృతిక విప్లవం"
      }
    ],
    "correctAnswer": {
      "en": "Holocaust",
      "hi": "प्रलय",
      "te": "హోలోకాస్ట్"
    },
    "explanation": {
      "en": "The Holocaust was Nazi Germany’s campaign of mass murder against Jews and other groups.",
      "hi": "होलोकॉस्ट नाजी जर्मनी का यहूदियों और अन्य समूहों के खिलाफ सामूहिक हत्या का अभियान था।",
      "te": "హోలోకాస్ట్ అనేది యూదులు మరియు ఇతర సమూహాలపై నాజీ జర్మనీ యొక్క సామూహిక హత్యల ప్రచారం."
    }
  },
  {
    "id": "hist-modern-coldwar-e-1",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "Cold War Clash",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The Cold War was mainly a rivalry between which two superpowers?",
      "hi": "शीत युद्ध मुख्यतः किन दो महाशक्तियों के बीच प्रतिद्वंद्विता थी?",
      "te": "ప్రచ్ఛన్న యుద్ధం ప్రధానంగా ఏ రెండు అగ్రరాజ్యాల మధ్య పోటీగా ఉంది?"
    },
    "options": [
      {
        "en": "USA and China",
        "hi": "अमेरिका और चीन",
        "te": "USA మరియు చైనా"
      },
      {
        "en": "USA and Soviet Union (USSR)",
        "hi": "यूएसए और सोवियत संघ (यूएसएसआर)",
        "te": "USA మరియు సోవియట్ యూనియన్ (USSR)"
      },
      {
        "en": "USA and Germany",
        "hi": "अमेरिका और जर्मनी",
        "te": "USA మరియు జర్మనీ"
      },
      {
        "en": "UK and France",
        "hi": "ब्रिटेन और फ्रांस",
        "te": "UK మరియు ఫ్రాన్స్"
      }
    ],
    "correctAnswer": {
      "en": "USA and Soviet Union (USSR)",
      "hi": "यूएसए और सोवियत संघ (यूएसएसआर)",
      "te": "USA మరియు సోవియట్ యూనియన్ (USSR)"
    },
    "explanation": {
      "en": "The Cold War described political and military tension between the US and USSR.",
      "hi": "शीत युद्ध ने अमेरिका और यूएसएसआर के बीच राजनीतिक और सैन्य तनाव का वर्णन किया।",
      "te": "ప్రచ్ఛన్న యుద్ధం US మరియు USSR మధ్య రాజకీయ మరియు సైనిక ఉద్రిక్తతను వివరించింది."
    }
  },
  {
    "id": "hist-modern-coldwar-e-2",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "Cold War Clash",
    "difficulty": "easy",
    "type": "mcq",
    "question": {
      "en": "The “Iron Curtain” described the division between…",
      "hi": "\"आयरन कर्टेन\" ने इनके बीच विभाजन का वर्णन किया...",
      "te": "\"ఐరన్ కర్టెన్\" మధ్య విభజనను వివరించింది…"
    },
    "options": [
      {
        "en": "North and South America",
        "hi": "उत्तर और दक्षिण अमेरिका",
        "te": "ఉత్తర మరియు దక్షిణ అమెరికా"
      },
      {
        "en": "East and West Europe",
        "hi": "पूर्वी और पश्चिमी यूरोप",
        "te": "తూర్పు మరియు పశ్చిమ ఐరోపా"
      },
      {
        "en": "Asia and Africa",
        "hi": "एशिया और अफ़्रीका",
        "te": "ఆసియా మరియు ఆఫ్రికా"
      },
      {
        "en": "Oceans and land",
        "hi": "महासागर और भूमि",
        "te": "మహాసముద్రాలు మరియు భూమి"
      }
    ],
    "correctAnswer": {
      "en": "East and West Europe",
      "hi": "पूर्वी और पश्चिमी यूरोप",
      "te": "తూర్పు మరియు పశ్చిమ ఐరోపా"
    },
    "explanation": {
      "en": "The Iron Curtain separated communist Eastern Europe from the West.",
      "hi": "आयरन कर्टेन ने साम्यवादी पूर्वी यूरोप को पश्चिम से अलग कर दिया।",
      "te": "ఇనుప తెర కమ్యూనిస్ట్ తూర్పు ఐరోపాను పశ్చిమ దేశాల నుండి వేరు చేసింది."
    }
  },
  {
    "id": "hist-modern-coldwar-m-1",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "Cold War Clash",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "NATO, formed in 1949, is best described as…",
      "hi": "1949 में गठित नाटो का सबसे अच्छा वर्णन इस प्रकार किया गया है...",
      "te": "1949లో ఏర్పడిన NATO, ఉత్తమంగా ఇలా వర్ణించబడింది..."
    },
    "options": [
      {
        "en": "An economic union",
        "hi": "एक आर्थिक संघ",
        "te": "ఒక ఆర్థిక సంఘం"
      },
      {
        "en": "A military alliance of Western nations",
        "hi": "पश्चिमी देशों का एक सैन्य गठबंधन",
        "te": "పాశ్చాత్య దేశాల సైనిక కూటమి"
      },
      {
        "en": "A peace treaty with the USSR",
        "hi": "यूएसएसआर के साथ शांति संधि",
        "te": "USSR తో శాంతి ఒప్పందం"
      },
      {
        "en": "A colonial empire",
        "hi": "एक औपनिवेशिक साम्राज्य",
        "te": "ఒక వలస సామ్రాజ్యం"
      }
    ],
    "correctAnswer": {
      "en": "A military alliance of Western nations",
      "hi": "पश्चिमी देशों का एक सैन्य गठबंधन",
      "te": "పాశ్చాత్య దేశాల సైనిక కూటమి"
    },
    "explanation": {
      "en": "NATO is a collective defense alliance of many Western countries.",
      "hi": "नाटो कई पश्चिमी देशों का सामूहिक रक्षा गठबंधन है।",
      "te": "NATO అనేది అనేక పాశ్చాత్య దేశాల సమిష్టి రక్షణ కూటమి."
    }
  },
  {
    "id": "hist-modern-coldwar-h-1",
    "subject": "History",
    "chapter": "Modern History",
    "topic": "Cold War Clash",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "The arms race during the Cold War mainly involved the buildup of…",
      "hi": "शीत युद्ध के दौरान हथियारों की होड़ में मुख्य रूप से... का निर्माण शामिल था।",
      "te": "ప్రచ్ఛన్న యుద్ధ సమయంలో ఆయుధాల రేసు ప్రధానంగా నిర్మాణాన్ని కలిగి ఉంది…"
    },
    "options": [
      {
        "en": "Conventional armies",
        "hi": "पारंपरिक सेनाएँ",
        "te": "సంప్రదాయ సైన్యాలు"
      },
      {
        "en": "Naval trade fleets",
        "hi": "नौसेना व्यापार बेड़े",
        "te": "నావికా వాణిజ్య నౌకాదళాలు"
      },
      {
        "en": "Nuclear weapons",
        "hi": "परमाणु हथियार",
        "te": "అణ్వాయుధాలు"
      },
      {
        "en": "Colonial territories",
        "hi": "औपनिवेशिक क्षेत्र",
        "te": "వలసరాజ్యాల భూభాగాలు"
      }
    ],
    "correctAnswer": {
      "en": "Nuclear weapons",
      "hi": "परमाणु हथियार",
      "te": "అణ్వాయుధాలు"
    },
    "explanation": {
      "en": "Both superpowers built large nuclear arsenals as part of the arms race.",
      "hi": "दोनों महाशक्तियों ने हथियारों की दौड़ के हिस्से के रूप में बड़े परमाणु शस्त्रागार बनाए।",
      "te": "రెండు అగ్రరాజ్యాలు ఆయుధ పోటీలో భాగంగా భారీ అణు ఆయుధాగారాలను నిర్మించాయి."
    }
  },
  {
    "id": "math-algebra-linear-m-extra-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "medium",
    "type": "mcq",
    "question": {
      "en": "Solve for x: 5x - 4 = 3x + 8",
      "hi": "x के लिए हल करें: 5x - 4 = 3x + 8",
      "te": "x కొరకు పరిష్కరించండి: 5x - 4 = 3x + 8"
    },
    "options": [
      { "en": "x = 2", "hi": "x = 2", "te": "x = 2" },
      { "en": "x = 4", "hi": "x = 4", "te": "x = 4" },
      { "en": "x = 6", "hi": "x = 6", "te": "x = 6" },
      { "en": "x = 8", "hi": "x = 8", "te": "x = 8" }
    ],
    "correctAnswer": { "en": "x = 6", "hi": "x = 6", "te": "x = 6" },
    "explanation": {
      "en": "Subtract 3x from both sides: 2x - 4 = 8. Add 4 to both sides: 2x = 12. Divide by 2: x = 6.",
      "hi": "दोनों पक्षों से 3x घटाएं: 2x - 4 = 8. दोनों पक्षों में 4 जोड़ें: 2x = 12. 2 से भाग दें: x = 6.",
      "te": "రెండు వైపుల నుండి 3x తీసివేయండి: 2x - 4 = 8. రెండు వైపులా 4 జోడించండి: 2x = 12. 2 చే భాగించండి: x = 6."
    }
  },
  {
    "id": "math-algebra-linear-h-extra-1",
    "subject": "Mathematics",
    "chapter": "Algebra",
    "topic": "Linear Equations",
    "difficulty": "hard",
    "type": "mcq",
    "question": {
      "en": "Solve the system: 2x + y = 10, x - y = 2",
      "hi": "प्रणाली हल करें: 2x + y = 10, x - y = 2",
      "te": "సిస్టమ్‌ను పరిష్కరించండి: 2x + y = 10, x - y = 2"
    },
    "options": [
      { "en": "x = 4, y = 2", "hi": "x = 4, y = 2", "te": "x = 4, y = 2" },
      { "en": "x = 3, y = 4", "hi": "x = 3, y = 4", "te": "x = 3, y = 4" },
      { "en": "x = 2, y = 6", "hi": "x = 2, y = 6", "te": "x = 2, y = 6" },
      { "en": "x = 5, y = 0", "hi": "x = 5, y = 0", "te": "x = 5, y = 0" }
    ],
    "correctAnswer": { "en": "x = 4, y = 2", "hi": "x = 4, y = 2", "te": "x = 4, y = 2" },
    "explanation": {
      "en": "Add the equations: (2x+x) = 10+2 -> 3x=12 -> x=4. Substitute x=4 into x-y=2 -> 4-y=2 -> y=2.",
      "hi": "समीकरण जोड़ें: (2x+x) = 10+2 -> 3x=12 -> x=4। x-y=2 -> 4-y=2 -> y=2 में x=4 प्रतिस्थापित करें।",
      "te": "సమీకరణాలను జోడించండి: (2x+x) = 10+2 -> 3x=12 -> x=4. x-y=2 -> 4-y=2 -> y=2 లోకి x=4 ని ప్రత్యామ్నాయం చేయండి."
    }
  }
];
