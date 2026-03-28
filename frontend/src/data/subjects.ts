import type { MultilingualText } from '../utils/getText'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Topic = {
  id: string
  name: string | MultilingualText
  difficulty: Difficulty
  estimatedMinutes: number
  /** Term–definition pairs for matching / flashcard visualization games */
  visualizationPairs: { term: string | MultilingualText; definition: string | MultilingualText }[]
}

export type Chapter = {
  id: string
  name: string | MultilingualText
  topics: Topic[]
}

export type Subject = {
  id: string
  name: string | MultilingualText
  description: string | MultilingualText
  colorClass: string
  chapters: Chapter[]
}

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: { en: 'Cyber Math', hi: 'साइबर गणित', te: 'సైబర్ గణితం' },
    description: {
      en: 'Algebra, calculus, and logic puzzles boosted with neon vibes.',
      hi: 'बीजगणित, कैलकुलस, और तर्क पहेलियाँ नियॉन वाइब्स के साथ।',
      te: 'నియాన్ వైబ్స్‌తో ఆల్జీబ్రా, కాలిక్యులస్ మరియు లాజిక్ పజిల్స్.'
    },
    colorClass: 'from-emerald-500/40 via-emerald-400/40 to-cyan-400/40',
    chapters: [
      {
        id: 'algebra',
        name: { en: 'Neon Algebra', hi: 'नियॉन बीजगणित', te: 'నియాన్ ఆల్జీబ్రా' },
        topics: [
          {
            id: 'linear',
            name: { en: 'Linear Equations', hi: 'रैखिक समीकरण', te: 'సరళ సమీకరణాలు' },
            difficulty: 'easy',
            estimatedMinutes: 10,
            visualizationPairs: [
              { term: 'Slope', definition: 'Rate of change; rise over run' },
              { term: 'y-intercept', definition: 'Point where the line crosses the y-axis' },
              { term: 'ax + b = 0', definition: 'Standard form of a linear equation' },
              { term: 'Linear', definition: 'First-degree; graph is a straight line' },
            ],
          },
          {
            id: 'quadratic',
            name: { en: 'Quadratic Boss Fights', hi: 'द्विघात बॉस फाइट्स', te: 'క్వాడ్రాటిక్ బాస్ ఫైట్స్' },
            difficulty: 'medium',
            estimatedMinutes: 15,
            visualizationPairs: [
              { term: 'Vertex', definition: 'Highest or lowest point of a parabola' },
              { term: 'Discriminant', definition: 'b² - 4ac; determines number of roots' },
              { term: 'Parabola', definition: 'U-shaped curve of a quadratic function' },
              { term: 'Roots', definition: 'Solutions where the function equals zero' },
            ],
          },
          {
            id: 'systems',
            name: { en: 'Systems Showdown', hi: 'सिस्टम शोडाउन', te: 'సిస్టమ్స్ షోడౌన్' },
            difficulty: 'hard',
            estimatedMinutes: 18,
            visualizationPairs: [
              { term: 'System', definition: 'Set of equations solved together' },
              { term: 'Substitution', definition: 'Replace one variable with an expression' },
              { term: 'Elimination', definition: 'Add or subtract equations to remove a variable' },
              { term: 'Intersection', definition: 'Solution is where the lines meet on a graph' },
            ],
          },
        ],
      },
      {
        id: 'calculus',
        name: { en: 'Glitched Calculus', hi: 'ग्लिच्ड कैलकुलस', te: 'గ్లిచ్డ్ కాలిక్యులస్' },
        topics: [
          {
            id: 'limits',
            name: { en: 'Limit Lab', hi: 'सीमा लैब', te: 'పరిమితి ప్రయోగశాల' },
            difficulty: 'medium',
            estimatedMinutes: 14,
            visualizationPairs: [
              { term: 'Limit', definition: 'Value a function approaches as x approaches a point' },
              { term: 'Continuity', definition: 'No breaks or jumps in the graph' },
              { term: 'Approach', definition: 'Get closer to without necessarily reaching' },
              { term: 'Infinity', definition: 'Unbounded growth or decrease' },
            ],
          },
          {
            id: 'derivatives',
            name: { en: 'Derivative Dash', hi: 'डेरिवेटिव डैश', te: 'డెరివేటివ్ డాష్' },
            difficulty: 'hard',
            estimatedMinutes: 20,
            visualizationPairs: [
              { term: 'Derivative', definition: 'Instantaneous rate of change; slope at a point' },
              { term: 'Tangent line', definition: 'Line that touches the curve at exactly one point' },
              { term: 'Power rule', definition: 'nx^(n-1) for x^n' },
              { term: 'Chain rule', definition: 'Derivative of f(g(x)) = f\'(g(x)) · g\'(x)' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'science',
    name: { en: 'Quantum Science', hi: 'क्वांटम विज्ञान', te: 'క్వాంటం సైన్స్' },
    description: { en: 'Physics and chemistry quests for curious minds.', hi: 'जिज्ञासु दिमागों के लिए भौतिकी और रसायन विज्ञान के प्रश्न।', te: 'ఆసక్తికరమైన మనస్సుల కోసం భౌతిక మరియు రసాయన శాస్త్ర ప్రశ్నలు.' },
    colorClass: 'from-cyan-400/40 via-sky-400/40 to-fuchsia-400/40',
    chapters: [
      {
        id: 'mechanics',
        name: { en: 'Kinetic Arena', hi: 'गतिज अखाड़ा', te: 'కైనెటిక్ అరేనా' },
        topics: [
          {
            id: 'motion',
            name: { en: 'Motion Mastery', hi: 'मोशन मास्टरी', te: 'మోషన్ మాస్టరీ' },
            difficulty: 'easy',
            estimatedMinutes: 12,
            visualizationPairs: [
              { term: 'Velocity', definition: 'Speed with direction; rate of position change' },
              { term: 'Acceleration', definition: 'Rate of change of velocity' },
              { term: 'Displacement', definition: 'Change in position; a vector' },
              { term: 's = ut + ½at²', definition: 'Equation of motion for distance' },
            ],
          },
          {
            id: 'forces',
            name: { en: 'Forces Frenzy', hi: 'फोर्सेस उन्माद', te: 'ఫోర్సెస్ ఫ్రెంజీ' },
            difficulty: 'medium',
            estimatedMinutes: 16,
            visualizationPairs: [
              { term: 'Force', definition: 'Push or pull; causes acceleration (F = ma)' },
              { term: 'Net force', definition: 'Sum of all forces acting on an object' },
              { term: 'Inertia', definition: 'Tendency of an object to resist change in motion' },
              { term: 'Newton\'s 3rd Law', definition: 'Every action has an equal opposite reaction' },
            ],
          },
          {
            id: 'energy',
            name: { en: 'Energy Gauntlet', hi: 'एनर्जी गौंटलेट', te: 'ఎనర్జీ గౌంట్లెట్' },
            difficulty: 'hard',
            estimatedMinutes: 22,
            visualizationPairs: [
              { term: 'Kinetic energy', definition: 'Energy of motion; ½mv²' },
              { term: 'Potential energy', definition: 'Stored energy due to position or state' },
              { term: 'Conservation', definition: 'Total energy in a closed system stays constant' },
              { term: 'Work', definition: 'Force × distance; energy transferred' },
            ],
          },
        ],
      },
      {
        id: 'chemistry',
        name: { en: 'Neon Chemistry', hi: 'नियॉन रसायन', te: 'నియాన్ రసాయన శాస్త్రం' },
        topics: [
          {
            id: 'atoms',
            name: { en: 'Atomic Arcade', hi: 'परमाणु आर्केड', te: 'అటామిక్ ఆర్కేడ్' },
            difficulty: 'easy',
            estimatedMinutes: 10,
            visualizationPairs: [
              { term: 'Proton', definition: 'Positively charged particle in the nucleus' },
              { term: 'Neutron', definition: 'Neutral particle in the nucleus' },
              { term: 'Electron', definition: 'Negatively charged; orbits the nucleus' },
              { term: 'Atomic number', definition: 'Number of protons; defines the element' },
            ],
          },
          {
            id: 'reactions',
            name: { en: 'Reaction Rush', hi: 'प्रतिक्रिया रश', te: 'రియాక్షన్ రష్' },
            difficulty: 'medium',
            estimatedMinutes: 18,
            visualizationPairs: [
              { term: 'Reactant', definition: 'Starting substance in a chemical reaction' },
              { term: 'Product', definition: 'Substance formed in a reaction' },
              { term: 'Balanced equation', definition: 'Same number of atoms on both sides' },
              { term: 'Catalyst', definition: 'Speeds up a reaction without being consumed' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'history',
    name: { en: 'Time-Warp History', hi: 'समय-ताना बाना इतिहास', te: 'టైమ్-వార్ప్ చరిత్ర' },
    description: { en: 'Speedrun through eras, wars, and revolutions.', hi: 'युगों, युद्धों और क्रांतियों के माध्यम से स्पीडरन।', te: 'యుగాలు, యుద్ధాలు మరియు విప్లవాల గుండా స్పీడ్‌రన్.' },
    colorClass: 'from-amber-400/40 via-emerald-400/40 to-cyan-400/40',
    chapters: [
      {
        id: 'ancient',
        name: { en: 'Ancient Arenas', hi: 'प्राचीन अखाड़े', te: 'ప్రాచీన అరేనాలు' },
        topics: [
          {
            id: 'egypt',
            name: { en: 'Pharaoh Trials', hi: 'फिरौन परीक्षण', te: 'ఫారో ట్రయల్స్' },
            difficulty: 'easy',
            estimatedMinutes: 9,
            visualizationPairs: [
              { term: 'Pharaoh', definition: 'Divine ruler of ancient Egypt' },
              { term: 'Pyramid', definition: 'Monumental tomb for pharaohs' },
              { term: 'Hieroglyphics', definition: 'Ancient Egyptian writing system' },
              { term: 'Nile', definition: 'River that sustained Egyptian civilization' },
            ],
          },
          {
            id: 'greece',
            name: { en: 'Olympus Challenges', hi: 'ओलंपस चुनौतियां', te: 'ఒలింపస్ సవాళ్లు' },
            difficulty: 'medium',
            estimatedMinutes: 14,
            visualizationPairs: [
              { term: 'Democracy', definition: 'Government by the people; originated in Athens' },
              { term: 'Olympics', definition: 'Ancient Greek athletic festival' },
              { term: 'Philosophy', definition: 'Love of wisdom; Socrates, Plato, Aristotle' },
              { term: 'Polis', definition: 'Greek city-state; basic political unit' },
            ],
          },
        ],
      },
      {
        id: 'modern',
        name: { en: 'Modern Mayhem', hi: 'आधुनिक तबाही', te: 'ఆధునిక మేహెమ్' },
        topics: [
          {
            id: 'ww2',
            name: { en: 'WWII Survival Run', hi: 'द्वितीय विश्व युद्ध सर्वाइवल रन', te: 'WWII సర్వైవల్ రన్' },
            difficulty: 'hard',
            estimatedMinutes: 24,
            visualizationPairs: [
              { term: 'Axis', definition: 'Germany, Italy, Japan; opposing Allies' },
              { term: 'Allies', definition: 'USA, UK, USSR; defeated the Axis' },
              { term: 'D-Day', definition: '1944 Allied invasion of Normandy' },
              { term: 'Holocaust', definition: 'Nazi genocide of six million Jews' },
            ],
          },
          {
            id: 'cold-war',
            name: { en: 'Cold War Clash', hi: 'शीत युद्ध टकराव', te: 'ప్రచ్ఛన్న యుద్ధం క్లాష్' },
            difficulty: 'medium',
            estimatedMinutes: 17,
            visualizationPairs: [
              { term: 'Cold War', definition: 'US vs USSR tension; no direct warfare' },
              { term: 'Iron Curtain', definition: 'Division of Europe into East and West' },
              { term: 'NATO', definition: 'North Atlantic Treaty Organization; Western alliance' },
              { term: 'Arms race', definition: 'Competition in nuclear weapons' },
            ],
          },
        ],
      },
    ],
  },
]
