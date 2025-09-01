const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();
let currentDown = "";

// Sample data (thumbs from Unsplash, video demo from samplelib)
const sampleVideo = "/(1) Title.mp4";
const thumbs = {
  Haldi: "/DSC_4108.jPG",
  Mehendi: "/DSC_3474.jpg",
  Sangeet: "/DSC_7682.jpg",
  Baraat: "/DSC_8401.jpg",
  Wedding: "/DSC_5637.jpg",
  Highlight: "/DSC_5354.jPG",
};

const data = [
  {
    id: 1,
    event: "Haldi",
    couple: "Pragya ❤️ Navneet",
    caption: "Haldi Highlights",
    download:
      "https://drive.usercontent.google.com/download?id=1GY2T8sngVs2oftt3vkBoJcDqKsjgm6z7&export=download&authuser=0",
    src: `<iframe src="https://drive.google.com/file/d/1GY2T8sngVs2oftt3vkBoJcDqKsjgm6z7/preview" width="640" height="480" allow="autoplay"></iframe>`,
  },
  {
    id: 2,
    event: "Mehendi",
    couple: "Pragya ❤️ Navneet",
    caption: "Mehendi Moments",
    download: "https://drive.usercontent.google.com/download?id=1mSp7I-6kDBllO1MahLeLMMvVRWr5c-GG&export=download&authuser=0",
    src: `<iframe src="https://drive.google.com/file/d/1mSp7I-6kDBllO1MahLeLMMvVRWr5c-GG/preview" width="640" height="480" allow="autoplay"></iframe>`,
  },
  {
    id: 3,
    event: "Sangeet",
    couple: "Pragya ❤️ Navneet",
    caption: "Dance Night",
    download: "https://drive.usercontent.google.com/download?id=1HXBERUBUtJgPsX0UTL29uJmzkYW8DHWs&export=download&authuser=0",
    src: `<iframe src="https://drive.google.com/file/d/1HXBERUBUtJgPsX0UTL29uJmzkYW8DHWs/preview" width="640" height="480" allow="autoplay"></iframe>`,
  },
  {
    id: 4,
    event: "Baraat",
    couple: "Pragya ❤️ Navneet",
    caption: "Grand Entry",
    download: "https://drive.usercontent.google.com/download?id=1FN7Lq28locJ2sxIYovAj1r7fowxBChdt&export=download&authuser=0",
    src: `<iframe src="https://drive.google.com/file/d/1FN7Lq28locJ2sxIYovAj1r7fowxBChdt/preview" width="640" height="480" allow="autoplay"></iframe>`,
  },
  {
    id: 5,
    event: "Wedding",
    couple: "Pragya ❤️ Navneet",
    caption: "Varmala & Pheras",
    download: "https://drive.usercontent.google.com/download?id=1vrdT4z9q5dslHGR5BtS14zIYKJphs3VC&export=download&authuser=0",
    src: `<iframe src="https://drive.google.com/file/d/1vrdT4z9q5dslHGR5BtS14zIYKJphs3VC/preview" width="640" height="480" allow="autoplay"></iframe>`,
  },
  {
    id: 6,
    event: "Highlight",
    couple: "Pragya ❤️ Navneet",
    caption: "Teasers",
    download: "https://drive.usercontent.google.com/download?id=1COUEJ4CHTPXwCH3bOXT3HiWrOkXQsKI9&export=download&authuser=0",
    src: `<iframe src="https://drive.google.com/file/d/1COUEJ4CHTPXwCH3bOXT3HiWrOkXQsKI9/preview" width="640" height="480" allow="autoplay"></iframe>`,
  },
];

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const modal = document.getElementById("modal");
const video = document.getElementById("video");
const videoSrc = document.getElementById("videoSrc");
const playlist = document.getElementById("playlist");
const guestbook = document.getElementById("guestbook");
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");

const EVENTS = [
  "All",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Baraat",
  "Wedding",
  "Highlight",
];
let currentFilter = "All";
let activeVideoId = null;
let comments = {}; // {videoId: [{name, text}]}

renderGrid();

function renderFilters() {
  filters.innerHTML = "";
  EVENTS.forEach((e) => {
    const b = document.createElement("button");
    b.className = "pill" + (currentFilter === e ? " active" : "");
    b.textContent = e;
    b.onclick = () => {
      currentFilter = e;
      renderGrid();
    };
    filters.appendChild(b);
  });
}

function renderGrid() {
  grid.innerHTML = "";
  const list =
    currentFilter === "All"
      ? data
      : data.filter((d) => d.event === currentFilter);
  list.forEach((d) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
          <div class="thumb">
            <img src="/wedding-presentation-site/${thumbs[d.event]}" alt="${
      d.event
    } thumbnail"/>
            <div class="play"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7-11-7z" fill="#fff"/></svg> Play</div>
          </div>
          <div class="meta">
            <div class="title">${d.couple}</div>
            <div class="caption">${d.event} • ${d.caption}</div>
          </div>`;
    card.onclick = () => openPlayer(d.id);
    grid.appendChild(card);
  });
}
function openPlayer(id) {
  modal.innerHTML =
    modal.innerHTML +
    data[id - 1].src +
    `<br><button onclick="downloadRedirect()" style="background-color: rgb(170, 170, 245);border-radius: 5px;border: 0px;padding: 10px; width:50%">Download</button>`;
  currentDown = data[id - 1].download;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function downloadRedirect() {
  window.location.href = currentDown;
}

// document.getElementById('closeModal').onclick = closePlayer;
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = "";
  }
});
// Init
renderFilters();
