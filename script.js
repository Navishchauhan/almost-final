import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
   GLOBAL DB
========================= */

let db = null;

export function setDB(database) {
  db = database;
  console.log("🔥 Firestore DB connected");
}

function getDB() {
  if (!db) {
    throw new Error("Firestore not initialized. Did setDB(db) run?");
  }
  return db;
}

/* =========================
   🌹 PETALS (SAFE)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🌸 DOM ready - petals starting");

  const MAX_PETALS = 40;

  setInterval(() => {
    const container = document.querySelector(".petals");
    if (!container || container.children.length > MAX_PETALS) return;

    const p = document.createElement("div");
    p.className = "petal";

    p.style.left = Math.random() * 100 + "vw";

    const size = 6 + Math.random() * 10;
    p.style.width = size + "px";
    p.style.height = size * 1.2 + "px";

    p.style.setProperty("--drift", (Math.random() - 0.5) * 100 + "px");
    p.style.animationDuration = (4 + Math.random() * 4) + "s";

    const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1"];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(p);
    setTimeout(() => p.remove(), 9000);
  }, 200);
});

/* =========================
   BOOK DATA (STATIC)
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
    m: "I’ll ruin you...",
    pdf: "https://drive.google.com/file/d/1KTag56eUXX-kmETtv51Eb9HEwbdDAkjY/preview",
    bouquet: "https://lh3.googleusercontent.com/d/1QDFe-f_tmsPXVf0s5bNo44vdVoZy7GJj"
  },
  b4: {
    t: "The Ritual",
    m: "I’d set the world on fire...",
    pdf: "https://drive.google.com/file/d/1lg59NNdnxL_0yZ8bhSJvI-qWtZEIkc0y/preview",
    bouquet: "https://lh3.googleusercontent.com/d/1JNr9TekgQ48Jx7GAiGEInU8yDxGP1xi-"
  },
  b5: {
    t: "Twisted Emotions",
    m: "Some scars go soul deep.",
    pdf: "https://drive.google.com/file/d/1T5DiSL1VBgik-KQ9nWuo78sHw8tiV9cu/preview",
    bouquet: "https://lh3.googleusercontent.com/d/1S0Lvk-6KlUJnfmhnQMnjsi7zAa5vOQTo"
  }
};

/* =========================
   LIBRARY PAGE RENDER
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
   BOOK PAGE SAFE LOAD
========================= */

const params = new URLSearchParams(window.location.search);
const b = params.get("b");

if (b && books[b]) {
  const title = document.getElementById("title");
  const msg = document.getElementById("msg");
  const img = document.getElementById("img");
  const btn = document.getElementById("openBookBtn");

  if (title) title.innerText = books[b].t;
  if (msg) msg.innerText = books[b].m;
  if (img) img.src = books[b].bouquet;

  if (btn) {
    btn.onclick = () => window.open(books[b].pdf, "_blank");
  }
}

/* =========================
   FIRESTORE COLLECTION
========================= */

function col() {
  return collection(getDB(), "wishlist");
}

/* =========================
   ADD BOOK
========================= */

export async function addBook() {
  try {
    const name = document.getElementById("bookName").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const date = document.getElementById("bookDate").value;

    if (!name) return alert("Book name required");

    await addDoc(col(), { name, author, date, fav: false });

    loadWishlist();
  } catch (err) {
    console.error("Add book failed:", err);
    alert("Something went wrong while adding book.");
  }
}

/* =========================
   LOAD WISHLIST
========================= */

export async function loadWishlist() {
  const container = document.getElementById("wishlist");
  if (!container) return;

  try {
    const snapshot = await getDocs(col());

    container.innerHTML = "";

    snapshot.forEach(docSnap => {
      const book = docSnap.data();
      const id = docSnap.id;

      const div = document.createElement("div");
      div.className = "wish-card";

      div.innerHTML = `
        <h3>${book.name}</h3>
        <p>${book.author || ""}</p>
        <span>${book.date || ""}</span>

        <div>
          <button class="fav">❤️</button>
          <button class="edit">✏️</button>
          <button class="del">🗑️</button>
        </div>
      `;

      div.querySelector(".del").onclick = () => deleteBook(id);
      div.querySelector(".fav").onclick = () => toggleFav(id);
      div.querySelector(".edit").onclick = () => editBook(id, book);

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Load wishlist failed:", err);
  }
}

/* =========================
   DELETE
========================= */

export async function deleteBook(id) {
  try {
    await deleteDoc(doc(getDB(), "wishlist", id));
    loadWishlist();
  } catch (err) {
    console.error("Delete failed:", err);
  }
}

/* =========================
   TOGGLE FAVORITE
========================= */

export async function toggleFav(id) {
  try {
    const ref = doc(getDB(), "wishlist", id);
    const snap = await getDoc(ref);

    await updateDoc(ref, {
      fav: !snap.data().fav
    });

    loadWishlist();
  } catch (err) {
    console.error("Toggle fav failed:", err);
  }
}

/* =========================
   EDIT BOOK
========================= */

export async function editBook(id, book) {
  try {
    const name = prompt("Name:", book.name);
    if (!name) return;

    const author = prompt("Author:", book.author || "");
    const date = prompt("Date:", book.date || "");

    await updateDoc(doc(getDB(), "wishlist", id), {
      name,
      author,
      date
    });

    loadWishlist();
  } catch (err) {
    console.error("Edit failed:", err);
  }
}

/* =========================
   GLOBAL ACCESS
========================= */

window.addBook = addBook;
window.loadWishlist = loadWishlist;
window.deleteBook = deleteBook;
window.toggleFav = toggleFav;
window.editBook = editBook;
window.setDB = setDB;