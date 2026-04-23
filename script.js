document.addEventListener("DOMContentLoaded", () => {

  console.log("script loaded ✅");

  /* PETALS */
  setInterval(() => {
  const container = document.querySelector(".petals");

  if (!container) return;

  const p = document.createElement("div");
  p.className = "petal";

  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = (3 + Math.random() * 5) + "s";
  p.style.opacity = Math.random();

  container.appendChild(p);

  setTimeout(() => p.remove(), 8000);
}, 250);

  /* BOOK DATA */
  const books = {
    b1: {
      t: "Brutal Prince",
      m: "for the girl who makes everything softer 💖",
      pdf: "https://drive.google.com/file/d/1Nzm4iD9jPHc_heINYfx-SO8uimlT2IL-/view",
      bouquet: "https://lh3.googleusercontent.com/d/1SSmK0xFHHlUzN-6khZWs6yTN-VvKivLw"
    },
    b2: {
      t: "Haunting Madeline",
      m: "For your late night mind ✨",
      pdf: "https://drive.google.com/file/d/1MvMvrt4qqSmlGuOyuRhYcxJ62uMcVqDF/view",
      bouquet: "https://lh3.googleusercontent.com/d/1QTEIuLTgJ3IWeZa59PbJocGt6s2QP7I9"
    },
    b3: {
      t: "Promises and Pomegranates",
      m: "Because you deserve beautiful stories 🌹",
      pdf: "https://drive.google.com/file/d/1KTag56eUXX-kmETtv51Eb9HEwbdDAkjY/view",
      bouquet: "https://lh3.googleusercontent.com/d/1QDFe-f_tmsPXVf0s5bNo44vdVoZy7GJj"
    },
    b4: {
      t: "The Ritual",
      m: "For the parts of you no one understands 🌙",
      pdf: "https://drive.google.com/file/d/1lg59NNdnxL_0yZ8bhSJvI-qWtZEIkc0y/view",
      bouquet: "https://lh3.googleusercontent.com/d/1JNr9TekgQ48Jx7GAiGEInU8yDxGP1xi-"
    },
    b5: {
      t: "Twisted Emotions",
      m: "Some stories never end ✨",
      pdf: "https://drive.google.com/file/d/1T5DiSL1VBgik-KQ9nWuo78sHw8tiV9cu/view",
      bouquet: "https://lh3.googleusercontent.com/d/1S0Lvk-6KlUJnfmhnQMnjsi7zAa5vOQTo"
    }
  };

  /* =========================
     LIBRARY PAGE
  ========================= */

  const booksContainer = document.getElementById("books");

  if (booksContainer) {
    console.log("library detected 📚");

    Object.keys(books).forEach(id => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${books[id].t}</h3>
        <img src="${books[id].bouquet}" class="mini-bouquet">
      `;

      card.onclick = () => {
        console.log("clicked:", id);
        window.location.href = "book.html?b=" + id;
      };

      booksContainer.appendChild(card);
    });
  }

  /* =========================
     BOOK PAGE
  ========================= */

  const params = new URLSearchParams(window.location.search);
  const b = params.get("b");

  console.log("book page:", b);

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
        console.log("opening pdf:", books[b].pdf);
        window.open(books[b].pdf, "_blank");
      };
    }
  }

});