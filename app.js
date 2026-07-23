const syllabus = [
  {
    code: 'CT501',
    title: 'Artificial Intelligence',
    category: 'Theory',
    kind: 'Major',
    credits: 3,
    weeklyHours: 3,
    color: 'var(--accent)',
    modules: [
      'Intro to AI and intelligent agents',
      'State-space problem formulation',
      'Heuristic search and optimization',
      'Adversarial search',
      'Knowledge representation and inference',
      'Slot-and-filler structures',
      'Reasoning under uncertainty',
      'Planning',
      'NLP basics',
      'Machine learning overview',
    ],
  },
  {
    code: 'CT502',
    title: 'Database Management Systems',
    category: 'Theory',
    kind: 'Major',
    credits: 3,
    weeklyHours: 3,
    color: '#0f6b7a',
    modules: [
      'DBMS intro and three-schema architecture',
      'ER and relational database model',
      'Graph-based model and Neo4j',
      'SQL and integrity constraints',
      'Relational design and normalization',
      'Query optimization and concurrency',
      'File organization and indexes',
    ],
  },
  {
    code: 'CT503',
    title: 'Object Oriented Programming using Java',
    category: 'Theory',
    kind: 'Major',
    credits: 4,
    weeklyHours: 4,
    color: '#b64b2e',
    modules: [
      'OOA and OOD concepts',
      'Java basics and control flow',
      'String handling and I/O',
      'Inheritance, packages, interfaces',
      'Exception handling and multithreading',
      'Applet programming',
    ],
  },
  {
    code: 'CT504A',
    title: 'Computer Graphics',
    category: 'Theory',
    kind: 'Major elective',
    credits: 3,
    weeklyHours: 3,
    color: '#8a4fd1',
    modules: [
      'Graphics systems and display devices',
      'Raster scan algorithms',
      'Geometric transformations and projections',
      'Curves and surfaces',
      'Geometric modeling',
      'Viewing, clipping, hidden surfaces',
      'Illumination and color models',
    ],
  },
  {
    code: 'CT504B',
    title: 'Network Security and Cryptography',
    category: 'Theory',
    kind: 'Major elective',
    credits: 3,
    weeklyHours: 3,
    color: '#006d77',
    modules: [
      'Security concepts and cryptography basics',
      'Symmetric and asymmetric ciphers',
      'Hash functions and digital signatures',
      'Key management and PKI',
      'Transport and wireless security',
      'E-mail security and IP security',
    ],
  },
  {
    code: 'CT504C',
    title: 'Compiler Design',
    category: 'Theory',
    kind: 'Major elective',
    credits: 3,
    weeklyHours: 3,
    color: '#c77d00',
    modules: [
      'Lexical analysis',
      'Parsing techniques',
      'Syntax-directed translation',
      'Type checking and storage allocation',
      'Intermediate code generation',
      'Optimization and code generation',
    ],
  },
  {
    code: 'HU(CT)501',
    title: 'Economics for Engineers',
    category: 'Theory',
    kind: 'Minor',
    credits: 2,
    weeklyHours: 2,
    color: '#7a5c2d',
    modules: [
      'Managerial economics and decision making',
      'Demand and supply analysis',
      'Cost analysis and break-even',
      'Inflation and national income',
      'Accounting basics',
      'Investment decisions and time value of money',
    ],
  },
  {
    code: 'CT591',
    title: 'Artificial Intelligence Lab',
    category: 'Practical',
    kind: 'Lab',
    credits: 1.5,
    weeklyHours: 3,
    color: '#13876f',
    modules: [
      'PROLOG fundamentals',
      'Arithmetic, boolean logic, decision making',
      'Recursion and looping through recursion',
      'Lists and problem solving',
      'BFS, DFS, and A*',
      'Constraint satisfaction and game playing',
      'Project implementation and documentation',
    ],
  },
  {
    code: 'CT592',
    title: 'Database Management Systems Lab',
    category: 'Practical',
    kind: 'Lab',
    credits: 1.5,
    weeklyHours: 3,
    color: '#105d66',
    modules: [
      'ER modeling and relational mapping',
      'Normalization',
      'SQL table creation and DML',
      'Nested queries and joins',
      'Aggregation, views, and triggers',
      'Stored procedures and cursors',
    ],
  },
  {
    code: 'CT593',
    title: 'Object Oriented Programming using Java Lab',
    category: 'Practical',
    kind: 'Lab',
    credits: 1.5,
    weeklyHours: 3,
    color: '#8d3f2b',
    modules: [
      'Java basics exercises',
      'String and I/O practice',
      'Inheritance, interfaces, packages',
      'Exception handling',
      'Multithreading',
      'Applet programming',
    ],
  },
  {
    code: 'CT581',
    title: 'Internship / Industrial Training',
    category: 'Practical',
    kind: 'Internship',
    credits: 2,
    weeklyHours: 2,
    color: '#3c6e71',
    modules: [
      'Training log and weekly reflection',
      'Industrial exposure summary',
      'Final report and presentation',
    ],
  },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const storageKey = 'sem5-study-planner-state';
const aiStorageKey = 'sem5-study-planner-ai';

const state = loadState();
const aiState = loadAiState();
let activeFilter = 'All';

const heroStatsEl = document.getElementById('heroStats');
const studyRhythmEl = document.getElementById('studyRhythm');
const nextFocusEl = document.getElementById('nextFocus');
const targetListEl = document.getElementById('targetList');
const categoryFiltersEl = document.getElementById('categoryFilters');
const courseGridEl = document.getElementById('courseGrid');
const scheduleGridEl = document.getElementById('scheduleGrid');
const taskListEl = document.getElementById('taskList');
const taskFormEl = document.getElementById('taskForm');
const taskTitleEl = document.getElementById('taskTitle');
const taskCourseEl = document.getElementById('taskCourse');
const taskPriorityEl = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const resetBtn = document.getElementById('resetBtn');
const aiFormEl = document.getElementById('aiForm');
const geminiKeyEl = document.getElementById('geminiKey');
const geminiModelEl = document.getElementById('geminiModel');
const generateAiBtn = document.getElementById('generateAiBtn');
const clearAiOutputBtn = document.getElementById('clearAiOutputBtn');
const aiStatusEl = document.getElementById('aiStatus');
const aiOutputEl = document.getElementById('aiOutput');
const courseTemplate = document.getElementById('courseCardTemplate');
const taskTemplate = document.getElementById('taskTemplate');

const tasks = state.tasks ?? defaultTasks();
const progress = state.progress ?? defaultProgress();
let aiOutput = aiState.output ?? '';
let savedGeminiKey = aiState.apiKey ?? '';
let savedGeminiModel = aiState.model ?? 'gemini-1.5-flash';

init();

function init() {
  populateCourseSelect();
  populateAiSettings();
  renderHeroStats();
  renderSidebar();
  renderFilters();
  renderCourses();
  renderSchedule();
  renderTasks();
  renderAiOutput();
  bindEvents();
}

function bindEvents() {
  taskFormEl.addEventListener('submit', handleTaskSubmit);
  aiFormEl.addEventListener('submit', handleAiSave);
  generateAiBtn.addEventListener('click', handleGeneratePlan);
  clearAiOutputBtn.addEventListener('click', () => {
    aiOutput = '';
    saveAiState();
    renderAiOutput();
  });
  addTaskBtn.addEventListener('click', () => {
    taskTitleEl.focus();
  });
  resetBtn.addEventListener('click', () => {
    if (window.confirm('Reset all progress and tasks?')) {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(aiStorageKey);
      window.location.reload();
    }
  });
}

function populateAiSettings() {
  geminiKeyEl.value = savedGeminiKey;
  geminiModelEl.value = savedGeminiModel;
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const title = taskTitleEl.value.trim();
  if (!title) {
    taskTitleEl.focus();
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    courseCode: taskCourseEl.value,
    priority: taskPriorityEl.value,
    done: false,
  });

  taskTitleEl.value = '';
  taskPriorityEl.value = 'Medium';
  saveState();
  renderTasks();
}

function handleAiSave(event) {
  event.preventDefault();
  savedGeminiKey = geminiKeyEl.value.trim();
  savedGeminiModel = geminiModelEl.value.trim() || 'gemini-1.5-flash';
  saveAiState();
  setAiStatus(savedGeminiKey ? `Saved Gemini key for ${savedGeminiModel}.` : 'AI key cleared.');
}

async function handleGeneratePlan() {
  if (!savedGeminiKey) {
    setAiStatus('Add a Gemini API key first, then generate a plan.');
    return;
  }

  setAiStatus('Generating study plan...');
  generateAiBtn.disabled = true;
  try {
    aiOutput = await fetchGeminiPlan();
    saveAiState();
    renderAiOutput();
    setAiStatus('Generated a fresh revision plan.');
  } catch (error) {
    aiOutput = fallbackAiPlan();
    saveAiState();
    renderAiOutput();
    setAiStatus(`Gemini request failed, using fallback guidance. ${error instanceof Error ? error.message : 'Please retry.'}`);
  } finally {
    generateAiBtn.disabled = false;
  }
}

function renderHeroStats() {
  const totalCredits = syllabus.reduce((sum, course) => sum + course.credits, 0);
  const totalWeeklyHours = syllabus.reduce((sum, course) => sum + course.weeklyHours, 0);
  const highPriorityCourses = syllabus.filter((course) => course.credits >= 3).length;
  const completedTasks = tasks.filter((task) => task.done).length;

  heroStatsEl.innerHTML = [
    statCard('Courses tracked', syllabus.length, 'Theory, practical, and internship items'),
    statCard('Weekly contact hours', totalWeeklyHours, 'Mapped from the official syllabus'),
    statCard('Total credits', totalCredits.toFixed(1), `${highPriorityCourses} heavy-weight courses`),
    statCard('Task completion', `${completedTasks}/${tasks.length}`, 'Saved locally on this device'),
  ].join('');
}

function renderSidebar() {
  const focusQueue = syllabus
    .slice()
    .sort((left, right) => right.credits + right.weeklyHours - (left.credits + left.weeklyHours))
    .slice(0, 4);

  studyRhythmEl.textContent =
    'Use 2 focused theory blocks, 1 practical block, and 1 review block per day. Keep labs in longer sessions and rotate the elective theory subjects every second day.';

  const nextTask = tasks.find((task) => !task.done) ?? null;
  nextFocusEl.innerHTML = nextTask
    ? `<strong>${escapeHtml(nextTask.title)}</strong><br />${escapeHtml(nextTask.courseCode)} · ${escapeHtml(nextTask.priority)} priority`
    : '<strong>Nothing pending</strong><br />You have completed every saved task.';

  targetListEl.innerHTML = focusQueue
    .map((course) => {
      const sessions = Math.max(1, Math.round((course.credits + course.weeklyHours) / 2));
      return `<div class="target-pill"><span>${escapeHtml(course.code)}</span><span>${sessions} sessions</span></div>`;
    })
    .join('');
}

function renderFilters() {
  const categories = ['All', ...new Set(syllabus.map((course) => course.category))];
  categoryFiltersEl.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-chip ${category === activeFilter ? 'is-active' : ''}" type="button" data-filter="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `,
    )
    .join('');

  categoryFiltersEl.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderCourses();
    });
  });
}

function renderCourses() {
  const visibleCourses = syllabus.filter((course) => activeFilter === 'All' || course.category === activeFilter);

  courseGridEl.innerHTML = visibleCourses
    .map((course) => {
      const progressValue = progress[course.code] ?? 0;
      const moduleSummary = course.modules.slice(0, 3).map((module, index) => moduleTag(index + 1, module)).join('');
      return `
        <article class="course-card">
          <div class="course-top">
            <div>
              <p class="course-code">${escapeHtml(course.code)}</p>
              <h3 class="course-title">${escapeHtml(course.title)}</h3>
            </div>
            <span class="chip">${escapeHtml(course.kind)}</span>
          </div>
          <div class="course-meta">
            <span class="meta-pill">${course.credits} credits</span>
            <span class="meta-pill">${course.weeklyHours} hrs/week</span>
            <span class="meta-pill">${course.modules.length} modules</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-track"><span class="progress-fill" style="width: ${progressValue}%; background: linear-gradient(90deg, ${course.color}, #7cc8bf);"></span></div>
            <p class="progress-label">${progressValue}% planned coverage</p>
          </div>
          <div class="module-preview">${moduleSummary}</div>
        </article>
      `;
    })
    .join('');
}

function renderSchedule() {
  const courseOrder = [...syllabus].sort((left, right) => weight(right) - weight(left));
  const dayBuckets = days.map((day) => ({ day, items: [] }));

  courseOrder.forEach((course, index) => {
    const startDay = index % days.length;
    const blockCount = course.kind === 'Lab' ? 2 : course.kind === 'Internship' ? 1 : 1;
    for (let offset = 0; offset < blockCount; offset += 1) {
      const bucketIndex = (startDay + offset * 2) % days.length;
      dayBuckets[bucketIndex].items.push({
        title: course.code,
        body: `${course.title} · ${course.weeklyHours} hrs`,
        note: `${course.modules.length} syllabus modules`,
      });
    }
  });

  scheduleGridEl.innerHTML = dayBuckets
    .map(
      (bucket) => `
        <article class="schedule-day">
          <h3>${bucket.day}</h3>
          ${bucket.items
            .map(
              (item) => `
                <div class="schedule-item">
                  <strong>${escapeHtml(item.title)}</strong>
                  <span>${escapeHtml(item.body)}</span><br />
                  <small>${escapeHtml(item.note)}</small>
                </div>
              `,
            )
            .join('') || '<div class="empty-state">Use this as a revision buffer or catch-up day.</div>'}
        </article>
      `,
    )
    .join('');
}

function renderTasks() {
  if (!tasks.length) {
    taskListEl.innerHTML = '<div class="empty-state">No tasks yet. Add your first study block on the left.</div>';
    renderHeroStats();
    renderSidebar();
    return;
  }

  taskListEl.innerHTML = tasks
    .map((task) => {
      const course = syllabus.find((item) => item.code === task.courseCode);
      const courseName = course ? course.title : 'General';
      return `
        <button class="task-item ${task.done ? 'is-done' : ''}" type="button" data-task-id="${task.id}">
          <div>
            <p class="task-title">${escapeHtml(task.title)}</p>
            <p class="task-subtitle">${escapeHtml(task.courseCode)} · ${escapeHtml(courseName)} · ${escapeHtml(task.priority)}</p>
          </div>
          <span class="task-state">${task.done ? 'Done' : 'Open'}</span>
        </button>
      `;
    })
    .join('');

  taskListEl.querySelectorAll('[data-task-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const task = tasks.find((item) => item.id === button.dataset.taskId);
      if (!task) return;
      task.done = !task.done;
      saveState();
      renderTasks();
      renderHeroStats();
      renderSidebar();
    });
  });
}

function renderAiOutput() {
  aiOutputEl.textContent = aiOutput || 'Save a Gemini key to generate study suggestions. If you skip this, the planner still works fully offline.';
}

function setAiStatus(message) {
  aiStatusEl.textContent = message;
}

function populateCourseSelect() {
  taskCourseEl.innerHTML = syllabus
    .map((course) => `<option value="${escapeHtml(course.code)}">${escapeHtml(course.code)} - ${escapeHtml(course.title)}</option>`)
    .join('');
}

function statCard(label, value, note) {
  return `
    <article class="stat-card">
      <p class="stat-label">${escapeHtml(label)}</p>
      <p class="stat-value">${escapeHtml(String(value))}</p>
      <p class="stat-note">${escapeHtml(note)}</p>
    </article>
  `;
}

function moduleTag(index, text) {
  return `<div class="module-tag"><span>Module ${index}</span><span>${escapeHtml(text)}</span></div>`;
}

function weight(course) {
  const categoryBoost = course.category === 'Practical' ? 1.5 : 1;
  return course.weeklyHours + course.credits * categoryBoost;
}

function defaultTasks() {
  return [
    { id: crypto.randomUUID(), title: 'Revise AI heuristic search', courseCode: 'CT501', priority: 'High', done: false },
    { id: crypto.randomUUID(), title: 'Practice SQL joins and subqueries', courseCode: 'CT592', priority: 'High', done: false },
    { id: crypto.randomUUID(), title: 'Write Java inheritance examples', courseCode: 'CT593', priority: 'Medium', done: false },
  ];
}

function defaultProgress() {
  return Object.fromEntries(syllabus.map((course, index) => [course.code, Math.max(8, index * 4)]));
}

async function fetchGeminiPlan() {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(savedGeminiModel)}:generateContent?key=${encodeURIComponent(savedGeminiKey)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: buildGeminiPrompt(),
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 500,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text).filter(Boolean).join('\n').trim();
  if (!text) {
    throw new Error('No AI response returned');
  }

  return text;
}

function buildGeminiPrompt() {
  const focusCourses = syllabus
    .map((course) => `${course.code}: ${course.title} (${course.modules.length} modules, ${course.weeklyHours} hrs/week)`) 
    .join('\n');
  const openTasks = tasks
    .filter((task) => !task.done)
    .map((task) => `${task.priority}: ${task.title} for ${task.courseCode}`)
    .join('\n');

  return [
    'You are a concise semester-five study planner for a CST engineering student.',
    'Create a practical 7-day revision plan with short bullet points.',
    'Prioritize heavier courses and current open tasks.',
    'Include one line for labs, one line for theory, and one line for quick revision.',
    'Use only the information below.',
    '',
    'Courses:',
    focusCourses,
    '',
    'Open tasks:',
    openTasks || 'No open tasks.',
  ].join('\n');
}

function fallbackAiPlan() {
  const topCourse = syllabus.slice().sort((left, right) => weight(right) - weight(left))[0];
  const nextTask = tasks.find((task) => !task.done);
  return [
    'Fallback revision plan',
    `1. Spend the first block on ${topCourse.code} - ${topCourse.title}.`,
    `2. Complete the next pending task: ${nextTask ? `${nextTask.title} (${nextTask.courseCode})` : 'all saved tasks are done'}.`,
    '3. Reserve one lab block for implementation practice and one block for mixed revision.',
    '4. End the day with a 15-minute recall quiz from two different subjects.',
  ].join('\n');
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({ tasks, progress }));
}

function saveAiState() {
  localStorage.setItem(aiStorageKey, JSON.stringify({ apiKey: savedGeminiKey, model: savedGeminiModel, output: aiOutput }));
}

function loadAiState() {
  try {
    const raw = localStorage.getItem(aiStorageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
