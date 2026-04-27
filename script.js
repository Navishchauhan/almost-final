document.addEventListener("DOMContentLoaded", () => {

  console.log("script loaded ✅");

  /* =========================
     🌹 PETALS
  ========================= */

  setInterval(() => {
    const container = document.querySelector(".petals");
    if (!container) return;

    const p = document.createElement("div");
    p.className = "petal";

    p.style.left = Math.random() * 100 + "vw";

    const size = 6 + Math.random() * 10;
    p.style.width = size + "px";
    p.style.height = size * 1.2 + "px";

    const depth = Math.random();
    p.style.opacity = 0.4 + depth * 0.6;
    p.style.filter = `blur(${(1 - depth) * 2}px)`;

    const drift = (Math.random() - 0.5) * 100 + "px";
    p.style.setProperty("--drift", drift);

    p.style.animationDuration = (4 + Math.random() * 4) + "s";

    const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1"];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(p);
    setTimeout(() => p.remove(), 9000);
  }, 200);


  /* =========================
     📚 BOOK DATA
  ========================= */

  const books = {
    b1: {
      t: "Brutal Prince",
      m: "Trust is rarer than love...",
      pdf: "https://drive.google.com/file/d/1Nzm4iD9jPHc_heINYfx-SO8uimlT2IL-/preview",
      bouquet: "https://lh3.googleusercontent.com/d/1SSmK0xFHHlUzN-6khZWs6yTN-VvKivLw"
    },
    b2: {
      t: "The Devil's Den",
      m: "There is no end for us...",
      pdf: "https://drive.google.com/file/d/1I2Pkq-wpzEvntpDKnNO7zakLHlOxmfo6/preview",
      bouquet: "https://lh3.googleusercontent.com/d/1QTEIuLTgJ3IWeZa59PbJocGt6s2QP7I9"
    },
    b3: {
      t: "Promises and Pomegranates",
      m: "I'll ruin you...",
      pdf: "https://drive.google.com/file/d/1KTag56eUXX-kmETtv51Eb9HEwbdDAkjY/preview",
      bouquet: "https://lh3.googleusercontent.com/d/1QDFe-f_tmsPXVf0s5bNo44vdVoZy7GJj"
    },
    b4: {
      t: "The Ritual",
      m: "I'd set the world on fire...",
      pdf: "https://drive.google.com/file/d/1lg59NNdnxL_0yZ8bhSJvI-qWtZEIkc0y/preview",
      bouquet: "https://lh3.googleusercontent.com/d/1JNr9TekgQ48Jx7GAiGEInU8yDxGP1xi-"
    },
    b5: {
      t: "Twisted Emotions",
      m: "Everyone has scars...",
      pdf: "https://drive.google.com/file/d/1T5DiSL1VBgik-KQ9nWuo78sHw8tiV9cu/preview",
      bouquet: "https://lh3.googleusercontent.com/d/1S0Lvk-6KlUJnfmhnQMnjsi7zAa5vOQTo"
    }
  };


  /* =========================
     📚 LIBRARY PAGE
  ========================= */

  const booksContainer = document.getElementById("books");

  if (booksContainer) {
    Object.keys(books).forEach(id => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${books[id].t}</h3>
        <img src="${books[id].bouquet}" class="mini-bouquet">
      `;

      card.onclick = () => {
        window.location.href = "book.html?b=" + id;
      };

      booksContainer.appendChild(card);
    });
  }


  /* =========================
     📖 BOOK PAGE
  ========================= */

  const params = new URLSearchParams(window.location.search);
  const b = params.get("b");

  if (b && books[b]) {

    const titleEl = document.getElementById("title");
    const msgEl = document.getElementById("msg");
    const imgEl = document.getElementById("img");
    const openBtn = document.getElementById("openBookBtn");

    if (titleEl) titleEl.innerText = books[b].t;
    if (msgEl) msgEl.innerText = books[b].m;
    if (imgEl) imgEl.src = books[b].bouquet;

    if (openBtn) {
      openBtn.onclick = () => {
        window.open(books[b].pdf, "_blank"); // ✅ THIS is the fix
      };
    }
  }

});