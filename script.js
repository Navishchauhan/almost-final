document.addEventListener("DOMContentLoaded", () => {

  /* PETALS */
  setInterval(() => {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (3 + Math.random() * 5) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 8000);
  }, 300);

  /* BOOK DATA */
  const books = {
    b1: {
      t: "Brutal Prince",
      m: "for the girl who makes everything softer 💖",
      pdf: "https://drive.google.com/file/d/1Nzm4iD9jPHc_heINYfx-SO8uimlT2IL-/view?usp=sharing",
      bouquet: "https://drive.google.com/file/d/1SSmK0xFHHlUzN-6khZWs6yTN-VvKivLw/view?usp=sharing"
    },
    b2: {
      t: "Haunting Madeline",
      m: "For your late night mind ✨",
      pdf: "https://drive.google.com/file/d/1MvMvrt4qqSmlGuOyuRhYcxJ62uMcVqDF/view?usp=sharing",
      bouquet: "https://drive.google.com/file/d/1QTEIuLTgJ3IWeZa59PbJocGt6s2QP7I9/view?usp=sharing"
    },
    b3: {
      t: "Promises and Pomegranates",
      m: "Because you deserve beautiful stories 🌹",
      pdf: "https://drive.google.com/file/d/1KTag56eUXX-kmETtv51Eb9HEwbdDAkjY/view?usp=sharing",
      bouquet: "https://drive.google.com/file/d/1QDFe-f_tmsPXVf0s5bNo44vdVoZy7GJj/view?usp=sharing"
    },
    b4: {
      t: "The Ritual",
      m: "For the parts of you no one understands 🌙",
      pdf: "https://drive.google.com/file/d/1lg59NNdnxL_0yZ8bhSJvI-qWtZEIkc0y/view?usp=sharing",
      bouquet: "https://drive.google.com/file/d/1JNr9TekgQ48Jx7GAiGEInU8yDxGP1xi-/view?usp=sharing"
    },
    b5: {
      t: "Twisted Emotions",
      m: "Some stories never end ✨",
      pdf: "https://drive.google.com/file/d/1T5DiSL1VBgik-KQ9nWuo78sHw8tiV9cu/view?usp=sharing",
      bouquet: "https://drive.google.com/file/d/1S0Lvk-6KlUJnfmhnQMnjsi7zAa5vOQTo/view?usp=sharing"
    }
  };

  /* =========================
     LIBRARY PAGE
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

      card.addEventListener("click", () => {
        window.location.href = "book.html?b=" + id;
      });

      booksContainer.appendChild(card);
    });
  }

  /* =========================
     BOOK PAGE
  ========================= */

const params = new URLSearchParams(location.search);
const b = params.get("b");

if (b && books[b]) {

  window.onload = () => {

    const titleEl = document.getElementById("title");
    const msgEl = document.getElementById("msg");
    const imgEl = document.getElementById("img");
    const openBtn = document.getElementById("openBookBtn");

    console.log("Book loaded:", b);

    if (titleEl) titleEl.innerText = books[b].t;
    if (msgEl) msgEl.innerText = books[b].m;
    if (imgEl) imgEl.src = books[b].bouquet;

    if (openBtn) {
      openBtn.onclick = () => {
        console.log("Opening PDF:", books[b].pdf);
        window.open(books[b].pdf, "_blank");
      };
    } else {
      console.log("openBookBtn not found ❌");
    }
  };
}

});