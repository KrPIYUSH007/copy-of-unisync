# Integrating UniSync backend with your frontend
2. Create `.env` from `.env.example` and set `MONGODB_URI`.
3. Create `uploads/` folder at project root and give write permissions.
4. Start the server: `npm run dev` (requires nodemon) or `npm start`.


## Endpoints
- `GET /api/notes` - list all notes
- `GET /api/notes?ownerId=<id>` - list notes for a specific owner
- `GET /api/notes/:id` - get single note metadata
- `POST /api/notes` - create a note (multipart/form-data) fields: `title` (required), `description` (optional), `ownerId` (optional), `file` (optional file)
- `PUT /api/notes/:id` - update a note (same form, file will replace existing file)
- `DELETE /api/notes/:id` - delete note and file


## Example: Upload a note from the browser (vanilla JS)


```html
<form id="noteForm">
<input name="title" id="title" required />
<input name="description" id="description" />
<input type="file" name="file" id="file" />
<button type="submit">Create Note</button>
</form>
<script>
const form = document.getElementById('noteForm');
form.addEventListener('submit', async (e) => {
e.preventDefault();
const fd = new FormData();
fd.append('title', document.getElementById('title').value);
fd.append('description', document.getElementById('description').value);
const fileInput = document.getElementById('file');
if (fileInput.files[0]) fd.append('file', fileInput.files[0]);


const res = await fetch(`${location.origin.replace(/:\d+$/, ':5000')}/api/notes`, {
method: 'POST',
body: fd
});
const json = await res.json();
console.log('Created note:', json);
// Refresh UI or redirect as needed
});
</script>
```


## Example: Fetch & render notes


```js
async function loadNotes() {
const res = await fetch('http://localhost:5000/api/notes');
const notes = await res.json();
// render notes — each note.filePath is a URL path to the file
}
```


## Production hints
- Use a cloud storage (S3 / Cloud Storage) for uploaded files at scale. Replace disk storage with signed uploads.
- Use authentication (JWT + users collection) if you want private notes per user.
- Put CORS allowed origin to your frontend origin in production.
- Add rate-limiting, request size limits, and validation.
```


---


## Additional: Dockerfile (optional)


```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN mkdir -p /app/uploads
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
```


---


# Notes & Next steps
- This backend is intentionally small and clear for learning and quick integration.
- If you want, I can generate a ready-to-paste frontend component (React) that uses these endpoints to create, list and view notes.
- For multi-user support and production safety, I can add JWT auth and connect file storage to S3 or Firebase.