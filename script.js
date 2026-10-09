// ---------------------------------------------------------------
// QuickNotes
// ---------------------------------------------------------------

// 1. Select the elements we need
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all");

// 2. The data: an array of note objects { id, text, category, createdAt }
let notes = [];

// Category names shown to the user
const CATEGORY_NAMES = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

// A readable date and time, e.g. "9 Oct 2026, 14:35"
function formatDate(date) {
  return date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

// Save the notes array to localStorage as text
function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

// Load the notes when the page opens (ignores missing or damaged data)
function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem("quicknotes"));
    if (Array.isArray(saved)) {
      notes = saved;
    }
  } catch (error) {
    notes = [];
  }
}

// Notes whose text contains the search words (not case-sensitive)
function getVisibleNotes() {
  const search = searchInput.value.trim().toLowerCase();
  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(search);
  });
}

// The count message for zero, one and many notes
//function updateCount() {
  //clearAllBtn.hidden = notes.length === 0;   // no notes, nothing to clear

  //if (notes.length === 0) {
   // noteCount.textContent = "You have no notes yet.";
  //} else if (notes.length === 1) {
   // noteCount.textContent = "You have 1 note.";
  //} else {
    //noteCount.textContent = `You have ${notes.length} notes.`;
 //}
//}

// Remove the note with the given id, then redraw
//function deleteNote(id) {
 // notes = notes.filter(function (note) {
   // return note.id !== id;
  //});
 // saveNotes();
  //render();
//}

// Check the text; returns an error message, or "" if the text is fine
//function validate(text) {
 // if (text === "") {
   // return "Please type a note first.";
 // }
 // if (text.length > 200) {
 //   return "Notes must be 200 characters or fewer.";
//  }
  ///return "";
//}

// 3. Rebuild the whole list from the notes array.
// Only createElement + textContent are used for user text (never innerHTML).
function render() {
  notesList.textContent = "";   // empty the list

  const visibleNotes = getVisibleNotes();

  // Notes exist, but none match the search
  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-message";
    empty.textContent = "No notes match your search.";
    notesList.append(empty);
  }

  visibleNotes.forEach(function (note) {
    const item = document.createElement("li");
    item.className = "note-card category-" + note.category;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = CATEGORY_NAMES[note.category] || note.category;

    const date = document.createElement("span");
    date.className = "note-date";
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.append(label, date, deleteBtn);
    item.append(text, meta);
    notesList.append(item);
  });

  updateCount();
}

// 4. Add a note when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading

  const text = noteInput.value.trim();

  const error = validate(text);
  if (error !== "") {
    errorMessage.textContent = error;   // show the problem and stop
    return;
  }
  errorMessage.textContent = "";        // valid note: clear any old error

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: formatDate(new Date()),
  };

  notes.push(note);
  saveNotes();
  render();

  noteInput.value = "";     // clear the input
  noteInput.focus();
});

// Bonus: delete every note, but only after the user confirms
clearAllBtn.addEventListener("click", function () {
  if (notes.length === 0) {
    return;   // nothing to delete
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// Hide the error as soon as the user starts fixing the problem
noteInput.addEventListener("input", function () {
  errorMessage.textContent = "";
});

// Filter the list as the user types in the search box
searchInput.addEventListener("input", render);

// Start: load saved notes, then draw them
loadNotes();
render();
