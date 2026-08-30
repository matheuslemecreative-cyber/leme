document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. ANIMAÇÃO DE TYPING NO TERMINAL
  // ==========================================
  const terminalLines = [
    { text: "// iniciando... projeto Leme; > Analisando seu negócio...", class: "comment" },
    { text: "status: ⚠️ oportunidades sendo perdidas; > dinheiro jogado fora; > faturamento despencando;", class: "status-warning" },
    { text: "", class: "" },
    { text: "// sem uma presença digital forte:", class: "comment" },
    { text: "> menos confiança; > menos clientes; > menos vendas; > menos crescimento; > menos dinheiro;", class: "" },
    { text: "", class: "" },
    { text: "// apresentando sua solução:", class: "comment" },
    { text: "> site profissional; > perfil estruturado; > posts impulsionados; > mais autoridade; > mais conversões;", class: "" },
    { text: "", class: "" },
    { text: "// sistema pronto para transformar:", class: "comment" },
    { text: "> visitantes; > clientes;", class: "purple-text" },
    { text: "", class: "" },
    { text: "// a pergunta é simples:", class: "comment" },
    { text: "> você vai esperar seu concorrente crescer ou vai começar agora?", class: "highlight" }
  ];

  const terminalBody = document.getElementById("terminal-body");
  
  if (terminalBody) {
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";

    let lineIndex = 0;
    let charIndex = 0;
    let currentParagraph = null;
    let typingStarted = false;

    function typeNextChar() {
      if (lineIndex < terminalLines.length) {
        const currentLineData = terminalLines[lineIndex];

        if (charIndex === 0) {
          currentParagraph = document.createElement("p");
          if (currentLineData.class) {
            currentParagraph.className = currentLineData.class;
          }
          terminalBody.appendChild(currentParagraph);
          terminalBody.appendChild(cursor);
        }

        if (currentLineData.text === "") {
          currentParagraph.innerHTML = "&nbsp;";
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNextChar, 80);
          return;
        }

        currentParagraph.textContent += currentLineData.text[charIndex];
        charIndex++;

        if (charIndex < currentLineData.text.length) {
          setTimeout(typeNextChar, 20);
        } else {
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNextChar, 150);
        }
      }
    }

    const checkTerminalScroll = () => {
      const terminalSection = document.querySelector(".terminal-section");
      if (terminalSection && !typingStarted) {
        const sectionPos = terminalSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        // Dispara a animação assim que o elemento entra na tela
        if (sectionPos < screenPos * 0.9) {
          typingStarted = true;
          typeNextChar();
        }
      }
    };

    // Executa a checagem no carregamento inicial e durante o scroll
    checkTerminalScroll();
    window.addEventListener("scroll", checkTerminalScroll);
  }

  // ==========================================
  // 2. CONTADORES NUMÉRICOS
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  let animated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('+', '');
        const inc = target / speed;

        if (count < target) {
          counter.innerText = '+' + Math.ceil(count + inc);
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = '+' + target;
        }
      };
      updateCount();
    });
  };

  const checkStatsScroll = () => {
    const statsSection = document.querySelector('.section-stats');
    if (statsSection && !animated) {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight;

      if (sectionPos < screenPos * 0.85) {
        startCounters();
        animated = true;
      }
    }
  };

  checkStatsScroll();
  window.addEventListener('scroll', checkStatsScroll);
});