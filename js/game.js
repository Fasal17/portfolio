// game.js - Quiz Game Logic

const startBtn = document.getElementById('start-quiz-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('quiz-section');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const questionNumberElem = document.getElementById('question-number');
const progressFill = document.getElementById('progress-fill');
const resultSection = document.getElementById('result-section');
const scoreElem = document.getElementById('score');
const bestScoreElem = document.getElementById('best-score');
const levelElem = document.getElementById('level');
const retryBtn = document.getElementById('retry-btn');

let currentQuestionIndex = 0;
let score = 0;

// Sample questions array (extend to 100+ questions)
const questions = [
  {
    question: "Which of the following is the strongest password?",
    answers: [
      { text: "password123", correct: false },
      { text: "Welcome@2024!", correct: true },
      { text: "john1999", correct: false },
      { text: "admin", correct: false }
    ]
  },
  {
    question: "What does phishing attempt to do?",
    answers: [
      { text: "Steal sensitive information using deception", correct: true },
      { text: "Physically damage systems", correct: false },
      { text: "Improve network performance", correct: false },
      { text: "Encrypt user data", correct: false }
    ]
  },
  {
    question: "Which protocol provides secure web communication?",
    answers: [
      { text: "HTTP", correct: false },
      { text: "FTP", correct: false },
      { text: "HTTPS", correct: true },
      { text: "SMTP", correct: false }
    ]
  },
  {
    question: "What does VPN primarily provide?",
    answers: [
      { text: "Faster internet speed", correct: false },
      { text: "Secure encrypted communication", correct: true },
      { text: "Antivirus protection", correct: false },
      { text: "Email filtering", correct: false }
    ]
  },
  {
    question: "Which attack involves overwhelming a system with traffic?",
    answers: [
      { text: "SQL Injection", correct: false },
      { text: "DDoS", correct: true },
      { text: "Phishing", correct: false },
      { text: "Brute Force", correct: false }
    ]
  },
  {
    question: "What does firewall do?",
    answers: [
      { text: "Monitors and filters network traffic", correct: true },
      { text: "Encrypts passwords", correct: false },
      { text: "Creates malware", correct: false },
      { text: "Manages databases", correct: false }
    ]
  },
  {
    question: "Which port is used by HTTPS?",
    answers: [
      { text: "21", correct: false },
      { text: "443", correct: true },
      { text: "80", correct: false },
      { text: "25", correct: false }
    ]
  },
  {
    question: "What is malware?",
    answers: [
      { text: "A hardware component", correct: false },
      { text: "A malicious software", correct: true },
      { text: "A firewall rule", correct: false },
      { text: "A network cable", correct: false }
    ]
  },
  {
    question: "Which tool is commonly used for vulnerability scanning?",
    answers: [
      { text: "Nmap", correct: true },
      { text: "Photoshop", correct: false },
      { text: "Excel", correct: false },
      { text: "PowerPoint", correct: false }
    ]
  },
  {
    question: "What does SQL Injection target?",
    answers: [
      { text: "Network cables", correct: false },
      { text: "Databases", correct: true },
      { text: "Operating systems", correct: false },
      { text: "Hardware devices", correct: false }
    ]
  },

  /* ---------------- NETWORKING ---------------- */

  {
    question: "Which device operates at Layer 3 of OSI model?",
    answers: [
      { text: "Switch", correct: false },
      { text: "Router", correct: true },
      { text: "Hub", correct: false },
      { text: "Repeater", correct: false }
    ]
  },
  {
    question: "What is the default subnet mask for Class C?",
    answers: [
      { text: "255.0.0.0", correct: false },
      { text: "255.255.255.0", correct: true },
      { text: "255.255.0.0", correct: false },
      { text: "255.255.255.255", correct: false }
    ]
  },
  {
    question: "Which protocol resolves IP to MAC address?",
    answers: [
      { text: "DNS", correct: false },
      { text: "ARP", correct: true },
      { text: "ICMP", correct: false },
      { text: "DHCP", correct: false }
    ]
  },
  {
    question: "Which protocol is used for email sending?",
    answers: [
      { text: "POP3", correct: false },
      { text: "SMTP", correct: true },
      { text: "IMAP", correct: false },
      { text: "FTP", correct: false }
    ]
  },
  {
    question: "Which IP version uses 128-bit addressing?",
    answers: [
      { text: "IPv4", correct: false },
      { text: "IPv6", correct: true },
      { text: "ARP", correct: false },
      { text: "MAC", correct: false }
    ]
  },

  /* ---------------- SECURITY AWARENESS ---------------- */

  {
    question: "What is two-factor authentication?",
    answers: [
      { text: "Using two passwords", correct: false },
      { text: "Two-step identity verification", correct: true },
      { text: "Two users sharing one account", correct: false },
      { text: "Two devices connected", correct: false }
    ]
  },
  {
    question: "What is ransomware?",
    answers: [
      { text: "A backup tool", correct: false },
      { text: "Malware that encrypts data for ransom", correct: true },
      { text: "A firewall rule", correct: false },
      { text: "A network protocol", correct: false }
    ]
  },
  {
    question: "Which is an example of social engineering?",
    answers: [
      { text: "SQL Injection", correct: false },
      { text: "Phishing email", correct: true },
      { text: "Port scanning", correct: false },
      { text: "Packet sniffing", correct: false }
    ]
  },
  {
    question: "Which tool is used for packet analysis?",
    answers: [
      { text: "Wireshark", correct: true },
      { text: "Burp Suite", correct: false },
      { text: "Metasploit", correct: false },
      { text: "SQLMap", correct: false }
    ]
  },
  {
    question: "What does brute-force attack try to do?",
    answers: [
      { text: "Guess credentials repeatedly", correct: true },
      { text: "Block network traffic", correct: false },
      { text: "Encrypt data", correct: false },
      { text: "Analyze packets", correct: false }
    ]
  },

  /* ---------------- ADVANCED ---------------- */

  {
    question: "What does IDS stand for?",
    answers: [
      { text: "Internet Detection System", correct: false },
      { text: "Intrusion Detection System", correct: true },
      { text: "Internal Data Service", correct: false },
      { text: "Internet Defense Software", correct: false }
    ]
  },
  {
    question: "Which attack exploits user trust?",
    answers: [
      { text: "Social engineering", correct: true },
      { text: "DDoS", correct: false },
      { text: "XSS", correct: false },
      { text: "ARP spoofing", correct: false }
    ]
  },
  {
    question: "Which OWASP category includes SQL Injection?",
    answers: [
      { text: "Broken Authentication", correct: false },
      { text: "Injection", correct: true },
      { text: "Security Misconfiguration", correct: false },
      { text: "Sensitive Data Exposure", correct: false }
    ]
  },
  {
    question: "What does MITM attack stand for?",
    answers: [
      { text: "Man In The Middle", correct: true },
      { text: "Machine In The Model", correct: false },
      { text: "Message In Transmission", correct: false },
      { text: "Memory In The Module", correct: false }
    ]
  },
  {
    question: "Which protocol is used to test network reachability?",
    answers: [
      { text: "ICMP", correct: true },
      { text: "FTP", correct: false },
      { text: "SMTP", correct: false },
      { text: "SNMP", correct: false }
    ]
  },
  /* ================== ADDITIONAL QUESTIONS ================== */

{
  question: "Which attack injects malicious scripts into web pages?",
  answers: [
    { text: "CSRF", correct: false },
    { text: "XSS", correct: true },
    { text: "SQL Injection", correct: false },
    { text: "DDoS", correct: false }
  ]
},
{
  question: "Which HTTP method is used to submit sensitive data securely?",
  answers: [
    { text: "GET", correct: false },
    { text: "POST", correct: true },
    { text: "TRACE", correct: false },
    { text: "OPTIONS", correct: false }
  ]
},
{
  question: "What does CSRF exploit?",
  answers: [
    { text: "Database vulnerabilities", correct: false },
    { text: "User trust in authenticated sessions", correct: true },
    { text: "Weak encryption algorithms", correct: false },
    { text: "Open network ports", correct: false }
  ]
},
{
  question: "Which port does SSH use by default?",
  answers: [
    { text: "21", correct: false },
    { text: "22", correct: true },
    { text: "23", correct: false },
    { text: "80", correct: false }
  ]
},
{
  question: "Which Linux command shows running processes?",
  answers: [
    { text: "ls", correct: false },
    { text: "ps", correct: true },
    { text: "mkdir", correct: false },
    { text: "chmod", correct: false }
  ]
},
{
  question: "What is the purpose of hashing?",
  answers: [
    { text: "Encrypt data for decryption", correct: false },
    { text: "Ensure data integrity", correct: true },
    { text: "Speed up networks", correct: false },
    { text: "Compress files", correct: false }
  ]
},
{
  question: "Which algorithm is commonly used for hashing passwords?",
  answers: [
    { text: "AES", correct: false },
    { text: "SHA-256", correct: true },
    { text: "RSA", correct: false },
    { text: "DES", correct: false }
  ]
},
{
  question: "Which attack modifies data in transit?",
  answers: [
    { text: "Brute Force", correct: false },
    { text: "Man-in-the-Middle", correct: true },
    { text: "Phishing", correct: false },
    { text: "Malware", correct: false }
  ]
},
{
  question: "Which device forwards packets based on IP address?",
  answers: [
    { text: "Hub", correct: false },
    { text: "Switch", correct: false },
    { text: "Router", correct: true },
    { text: "Repeater", correct: false }
  ]
},
{
  question: "What is the primary goal of penetration testing?",
  answers: [
    { text: "Damage systems", correct: false },
    { text: "Identify security weaknesses", correct: true },
    { text: "Install malware", correct: false },
    { text: "Monitor employees", correct: false }
  ]
},
{
  question: "Which OWASP Top 10 issue relates to poor access control?",
  answers: [
    { text: "Injection", correct: false },
    { text: "Broken Access Control", correct: true },
    { text: "XSS", correct: false },
    { text: "Security Logging Failure", correct: false }
  ]
},
{
  question: "Which protocol automatically assigns IP addresses?",
  answers: [
    { text: "DNS", correct: false },
    { text: "DHCP", correct: true },
    { text: "ARP", correct: false },
    { text: "ICMP", correct: false }
  ]
},
{
  question: "Which tool is used for exploiting vulnerabilities?",
  answers: [
    { text: "Wireshark", correct: false },
    { text: "Metasploit", correct: true },
    { text: "Nmap", correct: false },
    { text: "Nikto", correct: false }
  ]
},
{
  question: "What does port scanning help identify?",
  answers: [
    { text: "User passwords", correct: false },
    { text: "Open services on a system", correct: true },
    { text: "Encrypted files", correct: false },
    { text: "Email addresses", correct: false }
  ]
},
{
  question: "Which encryption uses public and private keys?",
  answers: [
    { text: "Symmetric", correct: false },
    { text: "Asymmetric", correct: true },
    { text: "Hashing", correct: false },
    { text: "Encoding", correct: false }
  ]
},
{
  question: "What is a zero-day vulnerability?",
  answers: [
    { text: "A known patched vulnerability", correct: false },
    { text: "An unknown vulnerability with no fix", correct: true },
    { text: "A low-risk vulnerability", correct: false },
    { text: "A user error", correct: false }
  ]
},
{
  question: "Which cloud model provides infrastructure only?",
  answers: [
    { text: "SaaS", correct: false },
    { text: "PaaS", correct: false },
    { text: "IaaS", correct: true },
    { text: "FaaS", correct: false }
  ]
},
{
  question: "Which attack uses fake Wi-Fi access points?",
  answers: [
    { text: "Evil Twin", correct: true },
    { text: "Smurf", correct: false },
    { text: "Brute Force", correct: false },
    { text: "XSS", correct: false }
  ]
},
{
  question: "Which command checks network connectivity?",
  answers: [
    { text: "ping", correct: true },
    { text: "netstat", correct: false },
    { text: "ifconfig", correct: false },
    { text: "route", correct: false }
  ]
},
{
  question: "Which protocol secures remote login?",
  answers: [
    { text: "Telnet", correct: false },
    { text: "SSH", correct: true },
    { text: "FTP", correct: false },
    { text: "SNMP", correct: false }
  ]
},
{
  question: "What is the purpose of a honeypot?",
  answers: [
    { text: "Improve system speed", correct: false },
    { text: "Detect and study attackers", correct: true },
    { text: "Store passwords", correct: false },
    { text: "Encrypt data", correct: false }
  ]
},
{
  question: "Which header helps prevent XSS attacks?",
  answers: [
    { text: "Content-Security-Policy", correct: true },
    { text: "User-Agent", correct: false },
    { text: "Host", correct: false },
    { text: "Accept-Encoding", correct: false }
  ]
},
{
  question: "Which attack floods network with ICMP requests?",
  answers: [
    { text: "Smurf Attack", correct: true },
    { text: "MITM", correct: false },
    { text: "SQL Injection", correct: false },
    { text: "XSS", correct: false }
  ]
},
{
  question: "Which security principle means minimum required access?",
  answers: [
    { text: "Defense in Depth", correct: false },
    { text: "Least Privilege", correct: true },
    { text: "Zero Trust", correct: false },
    { text: "Fail Secure", correct: false }
  ]
}
];

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

retryBtn.addEventListener('click', () => {
  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;
  resultSection.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  startQuiz();
});

function startQuiz() {
  startBtn.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
  updateProgress();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion(question) {
  questionText.innerText = question.question;

  // Shuffle answers every time
  shuffleArray(question.answers);

  question.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerText = answer.text;
    btn.classList.add('btn', 'answer-btn');

    // Store correct answer safely
    btn.dataset.correct = answer.correct ? "true" : "false";

    btn.addEventListener('click', selectAnswer);

    const li = document.createElement('li');
    li.appendChild(btn);
    answerButtons.appendChild(li);
  });
}

function resetState() {
  nextBtn.classList.add('hidden');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function updateProgress() {
  questionNumberElem.innerText =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  const progressPercent =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  progressFill.style.width = `${progressPercent}%`;
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === 'true';
  if (correct) {
    score++;
    selectedBtn.classList.add('correct');
  } else {
    selectedBtn.classList.add('wrong');
  }
  // Reveal all answers and disable
  Array.from(answerButtons.children).forEach(li => {
    const button = li.firstChild;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  // Show Next or finish quiz
  if (currentQuestionIndex < questions.length - 1) {
    nextBtn.classList.remove('hidden');
  } else {
    // Quiz complete
    setTimeout(showResults, 1000);
  }
}

function showResults() {
  questionContainer.classList.add('hidden');
  resultSection.classList.remove('hidden');
  scoreElem.innerText = `${score} / ${questions.length}`;
  const bestScore = localStorage.getItem('bestScore') || 0;
  if (score > bestScore) {
    localStorage.setItem('bestScore', score);
  }
  bestScoreElem.innerText = Math.max(score, bestScore);
  let level = '';
  const pct = (score / questions.length) * 100;
  if (pct === 100) level = 'Expert';
  else if (pct >= 70) level = 'Intermediate';
  else level = 'Beginner';
  levelElem.innerText = level;
}

// Initialize quiz (no state shown)
resetState();
