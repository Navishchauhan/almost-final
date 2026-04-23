
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
    b1: { t: "Love & Roses", m: "for the girl who makes everything softer 💖", pdf: "assets/books/b1.pdf", bouquet: "assets/bouquets/b1.png" },
    b2: { t: "Midnight Thoughts", m: "for your late night mind ✨", pdf: "assets/books/b2.pdf", bouquet: "assets/bouquets/b2.png" },
    b3: { t: "Dream Pages", m: "because you deserve beautiful stories 🌹", pdf: "assets/books/b3.pdf", bouquet: "assets/bouquets/b3.png" },
    b4: { t: "Soft Chaos", m: "for the parts of you no one understands 🌙", pdf: "assets/books/b4.pdf", bouquet: "assets/bouquets/b4.png" },
    b5: { t: "Eternal Pages", m: "some stories never end ✨", pdf: "assets/books/b5.pdf", bouquet: "assets/bouquets/b5.png" }
  };

  /* =========================
     LIBRARY PAGE (library.html)
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
        location = "book.html?b=" + id;
      };

      booksContainer.appendChild(card);
    });
  }

  /* =========================
     BOOK PAGE (book.html)
  ========================= */

  const params = new URLSearchParams(location.search);
  const b = params.get("b");

  if (b && books[b]) {

    const bookView = document.getElementById("bookView");
    const pdfViewer = document.getElementById("pdfViewer");

    const titleEl = document.getElementById("title");
    const msgEl = document.getElementById("msg");
    const imgEl = document.getElementById("img");
    const openBtn = document.getElementById("openBookBtn");

    if (titleEl) titleEl.innerText = books[b].t;
    if (msgEl) msgEl.innerText = books[b].m;
    if (imgEl) imgEl.src = books[b].bouquet;

    if (openBtn) {
      openBtn.onclick = () => {

        bookView.classList.add("unfold");

        setTimeout(() => {
          bookView.style.display = "none";
          pdfViewer.classList.remove("hidden");

          document.getElementById("pdfFrame").src = books[b].pdf;
          document.getElementById("pdfTitle").innerText = books[b].t;

        }, 700);

      };
    }

  }

});

/* CLOSE PDF */
function closePDF() {
  const bookView = document.getElementById("bookView");
  const pdfViewer = document.getElementById("pdfViewer");

  pdfViewer.classList.add("hidden");
  bookView.style.display = "block";

  setTimeout(() => {
    bookView.classList.remove("unfold");
  }, 50);
}