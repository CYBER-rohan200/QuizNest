const QUESTIONS = [
  // Mathematics – Algebra – Linear Equations
  {
    id: "math-algebra-linear-e-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    difficulty: "easy",
    type: "mcq",
    question: { en: "Solve: 2x + 3 = 7", hi: "\u0939\u0932 \u0915\u0930\u0947\u0902: 2x + 3 = 7", te: "\u0C2A\u0C30\u0C3F\u0C37\u0C4D\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F: 2x + 3 = 7" },
    options: ["x = 1", "x = 2", "x = 3", "x = 4"],
    correctAnswer: "x = 2",
    explanation: {
      en: "Subtract 3 from both sides to get 2x = 4, then divide by 2 to get x = 2.",
      hi: "\u0926\u094B\u0928\u094B\u0902 \u092A\u0915\u094D\u0937\u094B\u0902 \u0938\u0947 3 \u0918\u091F\u093E\u090F\u0902 \u091C\u093F\u0938\u0938\u0947 2x = 4 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B, \u092B\u093F\u0930 2 \u0938\u0947 \u092D\u093E\u0917 \u0926\u0947\u0902 \u091C\u093F\u0938\u0938\u0947 x = 2 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0964",
      te: "\u0C30\u0C46\u0C02\u0C21\u0C41 \u0C35\u0C48\u0C2A\u0C41\u0C32 \u0C28\u0C41\u0C02\u0C21\u0C3F 3 \u0C24\u0C40\u0C38\u0C3F\u0C35\u0C47\u0C38\u0C3F 2x = 4 \u0C2A\u0C4A\u0C02\u0C26\u0C02\u0C21\u0C3F, \u0C06\u0C2A\u0C48 2 \u0C24\u0C4B \u0C2D\u0C3E\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F x = 2 \u0C2A\u0C4A\u0C02\u0C26\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F."
    }
  },
  {
    id: "math-algebra-linear-e-2",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    difficulty: "easy",
    type: "mcq",
    question: "Which of the following is a linear equation in x?",
    options: ["x\xB2 + 3x = 0", "2x + 5 = 9", "x\xB3 - 1 = 0", "x\xB2 + 1 = 0"],
    correctAnswer: "2x + 5 = 9",
    explanation: "A linear equation has the variable only to the first power, like 2x + 5 = 9."
  },
  {
    id: "math-algebra-linear-drag-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    difficulty: "easy",
    type: "drag-drop",
    question: "Match each linear concept with its meaning.",
    pairs: [
      { term: "Slope", definition: "Rate of change; rise over run" },
      { term: "y-intercept", definition: "Point where the line crosses the y-axis" },
      { term: "ax + b = 0", definition: "Standard form of a linear equation" },
      { term: "Linear", definition: "First-degree; graph is a straight line" }
    ]
  },
  // Mathematics – Algebra – Quadratic Equations
  {
    id: "math-algebra-quadratic-m-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    difficulty: "medium",
    type: "mcq",
    question: "The graph of a quadratic function is called a\u2026",
    options: ["Line", "Circle", "Parabola", "Hyperbola"],
    correctAnswer: "Parabola",
    explanation: "Quadratic functions have U-shaped graphs called parabolas."
  },
  {
    id: "math-algebra-quadratic-h-boss-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    difficulty: "hard",
    type: "boss",
    question: "Solve: x\xB2 - 5x + 6 = 0",
    options: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = -6"],
    correctAnswer: "x = 2 or x = 3",
    explanation: "Factor to (x - 2)(x - 3) = 0, so the solutions are x = 2 and x = 3."
  },
  // Mathematics – Algebra – Systems of Equations
  {
    id: "math-algebra-systems-h-boss-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Systems of Equations",
    difficulty: "hard",
    type: "boss",
    question: "Which method eliminates a variable by adding or subtracting equations?",
    options: ["Graphing", "Substitution", "Elimination", "Factoring"],
    correctAnswer: "Elimination",
    explanation: "In the elimination method, you add or subtract equations to remove one variable."
  },
  // Mathematics – Calculus – Limits & Derivatives
  {
    id: "math-calculus-limits-m-1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Limits",
    difficulty: "medium",
    type: "mcq",
    question: "The limit of a function describes\u2026",
    options: [
      "Its value at infinity only",
      "Its value only at x = 0",
      "The value it approaches as x gets close to a point",
      "The slope of the tangent line"
    ],
    correctAnswer: "The value it approaches as x gets close to a point",
    explanation: "A limit describes the value a function approaches as the input approaches some number."
  },
  {
    id: "math-calculus-derivatives-h-boss-1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Derivatives",
    difficulty: "hard",
    type: "boss",
    question: "Using the power rule, the derivative of x\u2074 is\u2026",
    options: ["4x\xB3", "x\xB3", "2x", "4x"],
    correctAnswer: "4x\xB3",
    explanation: "By the power rule, d/dx(x\u207F) = n\xB7x\u207F\u207B\xB9, so d/dx(x\u2074) = 4x\xB3."
  },
  // Physics – Mechanics
  {
    id: "phys-mech-motion-e-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Motion",
    difficulty: "easy",
    type: "mcq",
    question: "Velocity is\u2026",
    options: [
      "Speed without direction",
      "Speed with direction",
      "Distance divided by area",
      "Mass times acceleration"
    ],
    correctAnswer: "Speed with direction",
    explanation: "Velocity is speed in a given direction."
  },
  {
    id: "phys-mech-forces-m-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Forces",
    difficulty: "medium",
    type: "mcq",
    question: "According to Newton\u2019s second law, F equals\u2026",
    options: ["m + a", "ma", "m/a", "a/m"],
    correctAnswer: "ma",
    explanation: "Newton\u2019s second law is F = ma: force equals mass times acceleration."
  },
  {
    id: "phys-mech-energy-h-boss-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Energy",
    difficulty: "hard",
    type: "boss",
    question: "Kinetic energy is given by the formula\u2026",
    options: ["mv", "\xBDmv\xB2", "mg", "mgh"],
    correctAnswer: "\xBDmv\xB2",
    explanation: "Kinetic energy of a moving object is \xBDmv\xB2."
  },
  {
    id: "phys-mech-motion-drag-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Motion",
    difficulty: "easy",
    type: "drag-drop",
    question: "Match motion terms to their definitions.",
    pairs: [
      { term: "Velocity", definition: "Speed with direction; rate of position change" },
      { term: "Acceleration", definition: "Rate of change of velocity" },
      { term: "Displacement", definition: "Change in position; a vector" },
      { term: "s = ut + \xBDat\xB2", definition: "Equation of motion for distance" }
    ]
  },
  // Chemistry
  {
    id: "chem-atoms-e-1",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Atoms",
    difficulty: "easy",
    type: "mcq",
    question: "The atomic number of an element is\u2026",
    options: [
      "The number of neutrons",
      "The number of electrons in the outer shell",
      "The number of protons",
      "The total number of protons and neutrons"
    ],
    correctAnswer: "The number of protons",
    explanation: "Atomic number is defined as the number of protons in the nucleus."
  },
  {
    id: "chem-reactions-m-1",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Reactions",
    difficulty: "medium",
    type: "mcq",
    question: "In a chemical equation, substances on the left side of the arrow are\u2026",
    options: ["Products", "Reactants", "Catalysts", "Solvents"],
    correctAnswer: "Reactants",
    explanation: "Reactants are the starting substances that react to form products."
  },
  {
    id: "chem-reactions-drag-1",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Reactions",
    difficulty: "medium",
    type: "drag-drop",
    question: "Match the reaction terms with their meanings.",
    pairs: [
      { term: "Reactant", definition: "Starting substance in a chemical reaction" },
      { term: "Product", definition: "Substance formed in a reaction" },
      { term: "Balanced equation", definition: "Same number of atoms on both sides" },
      { term: "Catalyst", definition: "Speeds up a reaction without being consumed" }
    ]
  },
  // Biology
  {
    id: "bio-cells-e-1",
    subject: "Biology",
    chapter: "Cells",
    topic: "Cell Structure",
    difficulty: "easy",
    type: "mcq",
    question: "Which structure controls what enters and leaves the cell?",
    options: ["Nucleus", "Cell membrane", "Mitochondrion", "Ribosome"],
    correctAnswer: "Cell membrane",
    explanation: "The cell membrane regulates the movement of substances into and out of the cell."
  },
  {
    id: "bio-genetics-m-1",
    subject: "Biology",
    chapter: "Genetics",
    topic: "DNA & Genes",
    difficulty: "medium",
    type: "mcq",
    question: "DNA stands for\u2026",
    options: [
      "Deoxyribonucleic acid",
      "Dioxyribonuclear acid",
      "Deoxyribose nucleic acid",
      "Dihydroribonucleic acid"
    ],
    correctAnswer: "Deoxyribonucleic acid",
    explanation: "DNA stands for deoxyribonucleic acid, the molecule that carries genetic information."
  },
  {
    id: "bio-genetics-drag-1",
    subject: "Biology",
    chapter: "Genetics",
    topic: "DNA & Genes",
    difficulty: "medium",
    type: "drag-drop",
    question: "Match genetic terms with their descriptions.",
    pairs: [
      { term: "Gene", definition: "Segment of DNA that codes for a trait" },
      { term: "Chromosome", definition: "Long DNA molecule with part or all of the genetic material" },
      { term: "Allele", definition: "Different form of a gene" },
      { term: "Genotype", definition: "Genetic makeup of an organism" }
    ]
  },
  // General / Study meta – can be used when no specific topic mapping exists
  {
    id: "general-study-e-1",
    subject: "General",
    chapter: "Study Skills",
    topic: "Effective Practice",
    difficulty: "easy",
    type: "mcq",
    question: "Short daily study sessions are usually better than\u2026",
    options: [
      "One long session once a week",
      "Never taking breaks",
      "Studying only when tests are near",
      "Any kind of spaced practice"
    ],
    correctAnswer: "One long session once a week",
    explanation: "Spaced, consistent practice beats cramming in a single long session."
  },
  // Extra quiz questions per topic so each topic has ~5–6 MCQs across levels
  // Mathematics – Algebra – Linear Equations
  {
    id: "math-algebra-linear-e-3",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    difficulty: "easy",
    type: "mcq",
    question: "Which graph represents a linear function?",
    options: ["A straight line", "A circle", "A parabola", "A hyperbola"],
    correctAnswer: "A straight line",
    explanation: "Linear functions have graphs that are straight lines."
  },
  {
    id: "math-algebra-linear-e-4",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    difficulty: "easy",
    type: "mcq",
    question: "In y = 3x \u2212 5, what is the slope?",
    options: ["\u22125", "3", "5", "1/3"],
    correctAnswer: "3",
    explanation: "In y = mx + b, m is the slope; here m = 3."
  },
  {
    id: "math-algebra-linear-m-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Linear Equations",
    difficulty: "medium",
    type: "mcq",
    question: "Solve for x: 5x \u2212 7 = 3x + 9",
    options: ["x = 1", "x = 6", "x = 8", "x = \u22128"],
    correctAnswer: "x = 8",
    explanation: "5x \u2212 7 = 3x + 9 \u21D2 2x = 16 \u21D2 x = 8."
  },
  // Mathematics – Algebra – Quadratic Equations
  {
    id: "math-algebra-quadratic-e-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    difficulty: "easy",
    type: "mcq",
    question: "Which of these is a quadratic equation?",
    options: ["2x + 3 = 0", "x\xB2 \u2212 4 = 0", "3/x = 1", "\u221Ax + 2 = 0"],
    correctAnswer: "x\xB2 \u2212 4 = 0",
    explanation: "A quadratic equation has x raised to the second power."
  },
  {
    id: "math-algebra-quadratic-e-2",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    difficulty: "easy",
    type: "mcq",
    question: "How many x-intercepts can a quadratic function have?",
    options: ["0 or 1 only", "Exactly 1", "0, 1, or 2", "Exactly 2"],
    correctAnswer: "0, 1, or 2",
    explanation: "A quadratic can cross the x-axis 0, 1, or 2 times."
  },
  {
    id: "math-algebra-quadratic-m-2",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    difficulty: "medium",
    type: "mcq",
    question: "The discriminant b\xB2 \u2212 4ac of a quadratic is negative. What does this mean?",
    options: ["Two real roots", "One real root", "No real roots", "Roots are both zero"],
    correctAnswer: "No real roots",
    explanation: "A negative discriminant means the roots are complex, not real."
  },
  {
    id: "math-algebra-quadratic-h-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Quadratic Equations",
    difficulty: "hard",
    type: "mcq",
    question: "The quadratic y = (x \u2212 3)\xB2 + 4 has its vertex at\u2026",
    options: ["(3, 4)", "(\u22123, 4)", "(3, \u22124)", "(\u22123, \u22124)"],
    correctAnswer: "(3, 4)",
    explanation: "In vertex form (x \u2212 h)\xB2 + k, the vertex is (h, k) = (3, 4)."
  },
  // Mathematics – Algebra – Systems of Equations
  {
    id: "math-algebra-systems-e-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Systems of Equations",
    difficulty: "easy",
    type: "mcq",
    question: "A solution to a system of two linear equations in two variables is\u2026",
    options: [
      "Any point on either line",
      "The point where the lines intersect",
      "The midpoint of the lines",
      "Always (0, 0)"
    ],
    correctAnswer: "The point where the lines intersect",
    explanation: "Solutions are points that satisfy both equations, i.e., their intersection."
  },
  {
    id: "math-algebra-systems-e-2",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Systems of Equations",
    difficulty: "easy",
    type: "mcq",
    question: "If two lines in a system are parallel and distinct, the system has\u2026",
    options: ["One solution", "No solution", "Infinitely many solutions", "Four solutions"],
    correctAnswer: "No solution",
    explanation: "Parallel distinct lines never meet, so there is no common solution."
  },
  {
    id: "math-algebra-systems-m-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Systems of Equations",
    difficulty: "medium",
    type: "mcq",
    question: "Solve the system: x + y = 5 and x \u2212 y = 1.",
    options: ["(3, 2)", "(2, 3)", "(4, 1)", "(1, 4)"],
    correctAnswer: "(3, 2)",
    explanation: "Adding equations gives 2x = 6 so x = 3, then y = 2."
  },
  {
    id: "math-algebra-systems-h-1",
    subject: "Mathematics",
    chapter: "Algebra",
    topic: "Systems of Equations",
    difficulty: "hard",
    type: "mcq",
    question: "A system has infinitely many solutions when the two equations are\u2026",
    options: [
      "Inconsistent",
      "Different lines with different slopes",
      "Equivalent (same line)",
      "Perpendicular lines"
    ],
    correctAnswer: "Equivalent (same line)",
    explanation: "If both equations represent the same line, every point on it is a solution."
  },
  // Mathematics – Calculus – Limits
  {
    id: "math-calculus-limits-e-1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Limits",
    difficulty: "easy",
    type: "mcq",
    question: "The notation lim\u2093\u21922 f(x) = 5 means\u2026",
    options: [
      "f(2) must equal 5",
      "As x approaches 2, f(x) approaches 5",
      "As x goes to infinity, f(x) is 5",
      "The derivative at x = 2 is 5"
    ],
    correctAnswer: "As x approaches 2, f(x) approaches 5",
    explanation: "A limit describes behavior as x gets close to a value, not necessarily at that value."
  },
  {
    id: "math-calculus-limits-e-2",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Limits",
    difficulty: "easy",
    type: "mcq",
    question: "If the left-hand and right-hand limits at x = a are different, the limit\u2026",
    options: [
      "Exists and equals the left-hand limit",
      "Exists and equals the right-hand limit",
      "Does not exist",
      "Is always zero"
    ],
    correctAnswer: "Does not exist",
    explanation: "A limit exists only when both one-sided limits are equal."
  },
  {
    id: "math-calculus-limits-m-2",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Limits",
    difficulty: "medium",
    type: "mcq",
    question: "A removable discontinuity in a graph looks like\u2026",
    options: [
      "A vertical asymptote",
      "A jump between two values",
      "A single \u201Chole\u201D in an otherwise smooth curve",
      "A perfectly continuous curve"
    ],
    correctAnswer: "A single \u201Chole\u201D in an otherwise smooth curve",
    explanation: "Removable discontinuities occur when a single point is missing but the limit exists."
  },
  {
    id: "math-calculus-limits-h-1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Limits",
    difficulty: "hard",
    type: "mcq",
    question: "The limit lim\u2093\u2192\u221E 1/x equals\u2026",
    options: ["0", "1", "\u221E", "Does not exist"],
    correctAnswer: "0",
    explanation: "As x grows without bound, 1/x gets closer and closer to 0."
  },
  // Mathematics – Calculus – Derivatives
  {
    id: "math-calculus-derivatives-e-1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Derivatives",
    difficulty: "easy",
    type: "mcq",
    question: "The derivative of a position function with respect to time represents\u2026",
    options: ["Acceleration", "Velocity", "Jerk", "Displacement"],
    correctAnswer: "Velocity",
    explanation: "The first derivative of position with respect to time is velocity."
  },
  {
    id: "math-calculus-derivatives-e-2",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Derivatives",
    difficulty: "easy",
    type: "mcq",
    question: "At a maximum point on a smooth curve, the derivative is usually\u2026",
    options: ["Positive", "Negative", "Zero", "Undefined"],
    correctAnswer: "Zero",
    explanation: "Tangent lines at local maxima and minima are horizontal, so the derivative is zero."
  },
  {
    id: "math-calculus-derivatives-m-1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Derivatives",
    difficulty: "medium",
    type: "mcq",
    question: "Using the power rule, d/dx(3x\xB3) equals\u2026",
    options: ["9x\xB2", "3x\xB2", "x\xB3", "6x"],
    correctAnswer: "9x\xB2",
    explanation: "Derivative of 3x\xB3 is 3\xB73x\xB2 = 9x\xB2."
  },
  {
    id: "math-calculus-derivatives-h-1",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Derivatives",
    difficulty: "hard",
    type: "mcq",
    question: "If f(x) = sin(x), then f\u02BA(x) (the second derivative) is\u2026",
    options: ["sin(x)", "cos(x)", "\u2212sin(x)", "\u2212cos(x)"],
    correctAnswer: "\u2212sin(x)",
    explanation: "First derivative is cos(x), second derivative is \u2212sin(x)."
  },
  // Physics – Mechanics – Motion
  {
    id: "phys-mech-motion-e-2",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Motion",
    difficulty: "easy",
    type: "mcq",
    question: "Speed is defined as\u2026",
    options: [
      "Distance divided by time",
      "Time divided by distance",
      "Distance plus time",
      "Mass times velocity"
    ],
    correctAnswer: "Distance divided by time",
    explanation: "Speed = distance / time."
  },
  {
    id: "phys-mech-motion-m-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Motion",
    difficulty: "medium",
    type: "mcq",
    question: "If a car\u2019s velocity is constant, its acceleration is\u2026",
    options: ["Positive", "Negative", "Zero", "Increasing"],
    correctAnswer: "Zero",
    explanation: "Acceleration measures change in velocity; constant velocity means zero acceleration."
  },
  {
    id: "phys-mech-motion-m-2",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Motion",
    difficulty: "medium",
    type: "mcq",
    question: "On a distance\u2013time graph, a steeper line indicates\u2026",
    options: ["Lower speed", "Higher speed", "Negative distance", "Zero speed"],
    correctAnswer: "Higher speed",
    explanation: "Steeper slope on distance\u2013time graphs means faster change in distance."
  },
  {
    id: "phys-mech-motion-h-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Motion",
    difficulty: "hard",
    type: "mcq",
    question: "Instantaneous velocity at a point on a position\u2013time graph is given by\u2026",
    options: [
      "The area under the curve",
      "The slope of the tangent line",
      "The y-intercept of the graph",
      "The average of starting and ending speeds"
    ],
    correctAnswer: "The slope of the tangent line",
    explanation: "Instantaneous velocity is the derivative of position with respect to time."
  },
  // Physics – Mechanics – Forces
  {
    id: "phys-mech-forces-e-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Forces",
    difficulty: "easy",
    type: "mcq",
    question: "A force that opposes motion between two surfaces in contact is called\u2026",
    options: ["Gravity", "Friction", "Tension", "Normal force"],
    correctAnswer: "Friction",
    explanation: "Friction resists relative motion between surfaces."
  },
  {
    id: "phys-mech-forces-e-2",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Forces",
    difficulty: "easy",
    type: "mcq",
    question: "The unit of force in the SI system is\u2026",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: "Newton",
    explanation: "The newton (N) is the SI unit for force."
  },
  {
    id: "phys-mech-forces-m-2",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Forces",
    difficulty: "medium",
    type: "mcq",
    question: "If the net force on an object is zero, the object\u2026",
    options: [
      "Must be at rest",
      "Must be moving",
      "Has no acceleration",
      "Has negative acceleration"
    ],
    correctAnswer: "Has no acceleration",
    explanation: "Zero net force implies zero acceleration (Newton\u2019s first law)."
  },
  {
    id: "phys-mech-forces-h-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Forces",
    difficulty: "hard",
    type: "mcq",
    question: "Doubling the mass while keeping the same net force will make acceleration\u2026",
    options: ["Double", "Half", "Stay the same", "Zero"],
    correctAnswer: "Half",
    explanation: "From F = ma, if F is constant and m doubles, a must be halved."
  },
  // Physics – Mechanics – Energy
  {
    id: "phys-mech-energy-e-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Energy",
    difficulty: "easy",
    type: "mcq",
    question: "Potential energy due to height above the ground is called\u2026",
    options: ["Thermal energy", "Kinetic energy", "Gravitational potential energy", "Chemical energy"],
    correctAnswer: "Gravitational potential energy",
    explanation: "Energy stored due to an object\u2019s position in a gravitational field."
  },
  {
    id: "phys-mech-energy-e-2",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Energy",
    difficulty: "easy",
    type: "mcq",
    question: "The unit of energy in the SI system is\u2026",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: "Joule",
    explanation: "Energy is measured in joules (J)."
  },
  {
    id: "phys-mech-energy-m-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Energy",
    difficulty: "medium",
    type: "mcq",
    question: "Which change will increase an object\u2019s kinetic energy the most?",
    options: [
      "Doubling its mass at constant speed",
      "Doubling its speed at constant mass",
      "Halving its speed",
      "Halving its mass"
    ],
    correctAnswer: "Doubling its speed at constant mass",
    explanation: "Kinetic energy is \xBDmv\xB2, so it depends on the square of speed."
  },
  {
    id: "phys-mech-energy-h-1",
    subject: "Physics",
    chapter: "Mechanics",
    topic: "Energy",
    difficulty: "hard",
    type: "mcq",
    question: "In a closed system with no non\u2011conservative forces, the total mechanical energy\u2026",
    options: ["Always increases", "Always decreases", "Is conserved", "Becomes zero"],
    correctAnswer: "Is conserved",
    explanation: "Conservation of energy states total energy remains constant in a closed system."
  },
  // Chemistry – Atoms
  {
    id: "chem-atoms-e-2",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Atoms",
    difficulty: "easy",
    type: "mcq",
    question: "Which subatomic particle has a negative charge?",
    options: ["Proton", "Neutron", "Electron", "Nucleus"],
    correctAnswer: "Electron",
    explanation: "Electrons carry negative electric charge."
  },
  {
    id: "chem-atoms-m-1",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Atoms",
    difficulty: "medium",
    type: "mcq",
    question: "Changing the number of protons in an atom changes its\u2026",
    options: ["Mass number only", "Charge only", "Element identity", "Isotope only"],
    correctAnswer: "Element identity",
    explanation: "The number of protons (atomic number) defines which element it is."
  },
  {
    id: "chem-atoms-m-2",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Atoms",
    difficulty: "medium",
    type: "mcq",
    question: "Isotopes of the same element have\u2026",
    options: [
      "Different numbers of protons, same neutrons",
      "Same numbers of protons, different neutrons",
      "Different protons and electrons",
      "No neutrons at all"
    ],
    correctAnswer: "Same numbers of protons, different neutrons",
    explanation: "Isotopes vary in neutron count but have the same proton count."
  },
  {
    id: "chem-atoms-h-1",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Atoms",
    difficulty: "hard",
    type: "mcq",
    question: "The mass number of an atom is equal to\u2026",
    options: [
      "Protons minus electrons",
      "Protons plus neutrons",
      "Neutrons minus protons",
      "Electrons plus neutrons"
    ],
    correctAnswer: "Protons plus neutrons",
    explanation: "Mass number counts the total number of protons and neutrons."
  },
  // Chemistry – Reactions
  {
    id: "chem-reactions-e-1",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Reactions",
    difficulty: "easy",
    type: "mcq",
    question: "In a balanced chemical equation, the number of each type of atom on both sides is\u2026",
    options: ["Greater on the product side", "Greater on the reactant side", "Equal", "Zero"],
    correctAnswer: "Equal",
    explanation: "Balanced equations obey the law of conservation of mass."
  },
  {
    id: "chem-reactions-e-2",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Reactions",
    difficulty: "easy",
    type: "mcq",
    question: "A substance that speeds up a reaction without being used up is called a\u2026",
    options: ["Solvent", "Reactant", "Catalyst", "Product"],
    correctAnswer: "Catalyst",
    explanation: "Catalysts increase reaction rate and are regenerated at the end."
  },
  {
    id: "chem-reactions-m-2",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Reactions",
    difficulty: "medium",
    type: "mcq",
    question: "When two clear solutions are mixed and a solid forms, this solid is called a\u2026",
    options: ["Gas", "Precipitate", "Reactant", "Solvent"],
    correctAnswer: "Precipitate",
    explanation: "A precipitate is an insoluble solid that forms in a solution."
  },
  {
    id: "chem-reactions-h-1",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    topic: "Reactions",
    difficulty: "hard",
    type: "mcq",
    question: "In an exothermic reaction, energy is\u2026",
    options: ["Absorbed from surroundings", "Released to surroundings", "Unchanged", "Converted entirely to mass"],
    correctAnswer: "Released to surroundings",
    explanation: "Exothermic reactions give off heat to their surroundings."
  },
  // History – Ancient Arenas – Pharaoh Trials
  {
    id: "hist-ancient-egypt-e-1",
    subject: "History",
    chapter: "Ancient History",
    topic: "Pharaoh Trials",
    difficulty: "easy",
    type: "mcq",
    question: "The Nile River was important to ancient Egypt because it\u2026",
    options: [
      "Separated Egypt from all neighbors",
      "Provided water, transportation, and fertile soil",
      "Was worshipped as the only god",
      "Was the site of the Olympics"
    ],
    correctAnswer: "Provided water, transportation, and fertile soil",
    explanation: "The Nile\u2019s yearly flooding created fertile land and supported Egyptian life."
  },
  {
    id: "hist-ancient-egypt-e-2",
    subject: "History",
    chapter: "Ancient History",
    topic: "Pharaoh Trials",
    difficulty: "easy",
    type: "mcq",
    question: "A pharaoh in ancient Egypt was\u2026",
    options: ["A military general only", "A divine king", "A merchant", "A foreign governor"],
    correctAnswer: "A divine king",
    explanation: "Pharaohs were considered both political rulers and living gods."
  },
  {
    id: "hist-ancient-egypt-m-1",
    subject: "History",
    chapter: "Ancient History",
    topic: "Pharaoh Trials",
    difficulty: "medium",
    type: "mcq",
    question: "Pyramids in Egypt were primarily built as\u2026",
    options: ["Defense structures", "Markets", "Royal tombs", "Schools"],
    correctAnswer: "Royal tombs",
    explanation: "Pyramids served as monumental tombs for pharaohs."
  },
  {
    id: "hist-ancient-egypt-h-1",
    subject: "History",
    chapter: "Ancient History",
    topic: "Pharaoh Trials",
    difficulty: "hard",
    type: "mcq",
    question: "The writing system of ancient Egypt is known as\u2026",
    options: ["Cuneiform", "Hieroglyphics", "Sanskrit", "Latin"],
    correctAnswer: "Hieroglyphics",
    explanation: "Hieroglyphics used picture symbols to represent sounds and ideas."
  },
  // History – Ancient Arenas – Olympus Challenges
  {
    id: "hist-ancient-greece-e-1",
    subject: "History",
    chapter: "Ancient History",
    topic: "Olympus Challenges",
    difficulty: "easy",
    type: "mcq",
    question: "The Olympics in ancient Greece were originally held to honor\u2026",
    options: ["Zeus", "Poseidon", "Athena", "Apollo"],
    correctAnswer: "Zeus",
    explanation: "The Olympic Games were part of a religious festival dedicated to Zeus."
  },
  {
    id: "hist-ancient-greece-e-2",
    subject: "History",
    chapter: "Ancient History",
    topic: "Olympus Challenges",
    difficulty: "easy",
    type: "mcq",
    question: "The city\u2011state famous for developing early democracy was\u2026",
    options: ["Sparta", "Athens", "Corinth", "Thebes"],
    correctAnswer: "Athens",
    explanation: "Athens experimented with direct democratic government."
  },
  {
    id: "hist-ancient-greece-m-1",
    subject: "History",
    chapter: "Ancient History",
    topic: "Olympus Challenges",
    difficulty: "medium",
    type: "mcq",
    question: "Which philosopher taught Alexander the Great?",
    options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
    correctAnswer: "Aristotle",
    explanation: "Aristotle was hired to tutor the young Alexander of Macedon."
  },
  {
    id: "hist-ancient-greece-h-1",
    subject: "History",
    chapter: "Ancient History",
    topic: "Olympus Challenges",
    difficulty: "hard",
    type: "mcq",
    question: "A Greek polis was\u2026",
    options: ["A temple", "A city\u2011state", "A coin", "A festival"],
    correctAnswer: "A city\u2011state",
    explanation: "The polis was the basic political unit in Greece, often a city and its surrounding countryside."
  },
  // History – Modern Mayhem – WWII Survival Run
  {
    id: "hist-modern-ww2-e-1",
    subject: "History",
    chapter: "Modern History",
    topic: "WWII Survival Run",
    difficulty: "easy",
    type: "mcq",
    question: "World War II began in Europe when Germany invaded\u2026",
    options: ["France", "Poland", "Italy", "Russia"],
    correctAnswer: "Poland",
    explanation: "Germany\u2019s 1939 invasion of Poland led Britain and France to declare war."
  },
  {
    id: "hist-modern-ww2-e-2",
    subject: "History",
    chapter: "Modern History",
    topic: "WWII Survival Run",
    difficulty: "easy",
    type: "mcq",
    question: "The alliance of Germany, Italy, and Japan was called the\u2026",
    options: ["Allies", "Axis Powers", "League of Nations", "Triple Entente"],
    correctAnswer: "Axis Powers",
    explanation: "Germany, Italy, and Japan formed the Axis alliance."
  },
  {
    id: "hist-modern-ww2-m-1",
    subject: "History",
    chapter: "Modern History",
    topic: "WWII Survival Run",
    difficulty: "medium",
    type: "mcq",
    question: "D\u2011Day refers to the Allied invasion of\u2026",
    options: ["North Africa", "Italy", "Normandy, France", "Germany"],
    correctAnswer: "Normandy, France",
    explanation: "On June 6, 1944, Allied forces landed on the beaches of Normandy."
  },
  {
    id: "hist-modern-ww2-h-1",
    subject: "History",
    chapter: "Modern History",
    topic: "WWII Survival Run",
    difficulty: "hard",
    type: "mcq",
    question: "The systematic genocide of six million Jews during WWII is known as the\u2026",
    options: ["Great Purge", "Holocaust", "Cold War", "Cultural Revolution"],
    correctAnswer: "Holocaust",
    explanation: "The Holocaust was Nazi Germany\u2019s campaign of mass murder against Jews and other groups."
  },
  // History – Modern Mayhem – Cold War Clash
  {
    id: "hist-modern-coldwar-e-1",
    subject: "History",
    chapter: "Modern History",
    topic: "Cold War Clash",
    difficulty: "easy",
    type: "mcq",
    question: "The Cold War was mainly a rivalry between which two superpowers?",
    options: [
      "USA and China",
      "USA and Soviet Union (USSR)",
      "USA and Germany",
      "UK and France"
    ],
    correctAnswer: "USA and Soviet Union (USSR)",
    explanation: "The Cold War described political and military tension between the US and USSR."
  },
  {
    id: "hist-modern-coldwar-e-2",
    subject: "History",
    chapter: "Modern History",
    topic: "Cold War Clash",
    difficulty: "easy",
    type: "mcq",
    question: "The \u201CIron Curtain\u201D described the division between\u2026",
    options: ["North and South America", "East and West Europe", "Asia and Africa", "Oceans and land"],
    correctAnswer: "East and West Europe",
    explanation: "The Iron Curtain separated communist Eastern Europe from the West."
  },
  {
    id: "hist-modern-coldwar-m-1",
    subject: "History",
    chapter: "Modern History",
    topic: "Cold War Clash",
    difficulty: "medium",
    type: "mcq",
    question: "NATO, formed in 1949, is best described as\u2026",
    options: [
      "An economic union",
      "A military alliance of Western nations",
      "A peace treaty with the USSR",
      "A colonial empire"
    ],
    correctAnswer: "A military alliance of Western nations",
    explanation: "NATO is a collective defense alliance of many Western countries."
  },
  {
    id: "hist-modern-coldwar-h-1",
    subject: "History",
    chapter: "Modern History",
    topic: "Cold War Clash",
    difficulty: "hard",
    type: "mcq",
    question: "The arms race during the Cold War mainly involved the buildup of\u2026",
    options: ["Conventional armies", "Naval trade fleets", "Nuclear weapons", "Colonial territories"],
    correctAnswer: "Nuclear weapons",
    explanation: "Both superpowers built large nuclear arsenals as part of the arms race."
  }
];
export {
  QUESTIONS
};
