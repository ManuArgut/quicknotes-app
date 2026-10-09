# QuickNotes

QuickNotes is a simple note-taking web app built with plain HTML, CSS and JavaScript. You type a short note, choose a category (Personal, Work or Study), and the app shows it as a coloured card. Your notes are saved in your browser, so they are still there when you refresh the page or come back later.

## Features

- Add notes with a category: Personal, Work or Study
- Each note is shown as a card with its text, a category label, the date and time it was created, and a Delete button
- A different colour for each category (teal, dark red and blue)
- Validation: an empty note or a note over 200 characters shows an error message
- Delete any single note
- Live search: the list filters as you type (not case-sensitive), with a "No notes match your search." message
- A correct note count for zero, one and many notes
- Notes are saved with `localStorage` and survive a page refresh
- Responsive layout: the form stacks vertically on screens 600px wide or narrower
- Bonus: a "Clear all" button that asks for confirmation before deleting every note

## How to run it locally

1. Clone the repository:
   ```
   git clone https://github.com/ManuArgut/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser. No installation or server is needed.

## What I learned

- How to rebuild a list from an array with a `render()` function, so the page always matches the data.
- How to build page elements with `createElement` and `textContent` instead of `innerHTML`, which keeps user text safe (a note like `<b>hi</b>` is shown as plain text, not run as HTML).
- How to save and load data with `localStorage`, using `JSON.stringify` to save the array and `JSON.parse` to read it back.
- How to use Flexbox for the form and a `@media (max-width: 600px)` rule to make the layout work on small screens.
- How to split a project into small tasks and commit after each one, so the Git history tells the story of the project.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and form |
| `style.css` | Layout, cards, category colours and responsive rules |
| `script.js` | Add, delete, search, validation, count and saving |
| `README.md` | This file |
