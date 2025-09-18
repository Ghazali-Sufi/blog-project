# Minimal Blog (Node.js + Express + EJS)

A small blog app for beginners. You can create, read, edit, and delete posts.  
Built with **Node.js**, **Express**, **EJS**, and simple **CSS**.

Good for learning server routes, forms, templates, and basic CRUD.

---

## Features

- Home page that shows posts in a grid
- Create a post
- Edit and delete a post
- Post detail page
- About page
- Shared header partial on every page
- Minimal, responsive styling
- In-memory data (no database yet)

---

## Tech Stack

- Node.js
- Express
- EJS
- CSS
- body-parser

---

## Project Structure

```
.
├─ public/
│  └─ styles/
│     └─ style.css
├─ views/
│  ├─ about.ejs
│  ├─ create.ejs
│  ├─ edit.ejs
│  ├─ index.ejs
│  ├─ postDetail.ejs
│  └─ partials/
│     └─ header.ejs
├─ index.js
├─ package.json
└─ README.md
```

---

## Prerequisites

- Node.js 18 or newer
- npm

---

## Getting Started

1) Install dependencies
```bash
npm install
# If you do not have a package.json yet, install the basics:
# npm install express body-parser ejs
```

2) Run the server
```bash
npm run dev
# or
npm start
# or
node index.js
```

3) Open the app  
Visit: `http://localhost:3000`

---

## Scripts

Add these to `package.json` if you want simple commands:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

Then run:
```bash
npm run dev
```

---

## How It Works

- Posts are stored in an **array** in `index.js`:
  ```js
  const post = [ /* { id, title, desc, date } */ ];
  ```
  This is not a database. Data resets when the server restarts.

- Views are EJS templates in `/views`.

- The shared header is included like this:
  ```ejs
  <%- include('partials/header') %>
  ```

- Static files come from `/public`:
  ```js
  app.use(express.static('public'));
  ```

---

## Routes

| Method | Path               | Purpose                         |
|-------:|--------------------|---------------------------------|
| GET    | `/`                | Show all posts                  |
| GET    | `/about`           | About page                      |
| GET    | `/form`            | Show create post form           |
| POST   | `/create`          | Create a new post               |
| GET    | `/postDetail/:id`  | Show a single post              |
| GET    | `/edit/:id`        | Show edit form for a post       |
| POST   | `/edit/:id`        | Update a post                   |
| POST   | `/delete/:id`      | Delete a post                   |

---

## Add, Edit, Delete

- Create: go to `/form`, fill the form, submit.
- Edit: open a post detail page, click Edit Post, change fields, save.
- Delete: open a post detail page, click Delete Post, confirm.

On the home page each post shows:
- Title (click to open detail)
- Short description preview
- Published date

---

## Styling

- Main CSS is in `public/styles/style.css`
- The grid uses CSS Grid so you get 2 to 3 cards per row
- Buttons are simple and consistent
- The header sticks to the top and has links on the right

If CSS does not load:
- Check `index.js` has:
  ```js
  app.use(express.static('public'));
  ```
- Link CSS like:
  ```html
  <link rel="stylesheet" href="/styles/style.css">
  ```

---

## Notes for Students

- This app uses in-memory storage. It is perfect for learning, not for real data.
- To keep data after restart, connect a database such as MongoDB or PostgreSQL.
- EJS escapes values by default when you use `<%= %>`.  
  Only use `<%- %>` when you want to render raw HTML.

---

## Next Steps

- Add **method-override** to support real PUT and DELETE
- Connect a database with **Mongoose** or a SQL client
- Add form validation and flash messages
- Add slugs for pretty URLs
- Add pagination and search
- Add authentication

---

## Troubleshooting

- Port in use  
  Change `const port = 3000` in `index.js` or free the port.

- EJS errors  
  Make sure `ejs` is installed and the files are inside `/views`.

- CSS not loading  
  Check the folder path and `express.static` setup.

- Data gone after restart  
  This is expected with in-memory storage.

---

## License

MIT

---

## Author

**Mohamed Ghazali**

Happy coding!
