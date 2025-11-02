const API_BASE_URL = "http://localhost:5000/api";

// =================== CREATE NOTE ===================
async function createNote() {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;
  const fileInput = document.getElementById("noteFile");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (fileInput.files[0]) formData.append("file", fileInput.files[0]);

  try {
    const res = await fetch(`${API_BASE_URL}/notes`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Note uploaded successfully!");
      loadNotes(); // refresh notes after upload
    } else {
      alert("Failed to upload note");
    }
  } catch (error) {
    console.error("Error uploading note:", error);
  }
}

// =================== LOAD ALL NOTES ===================
async function loadNotes() {
  try {
    const res = await fetch(`${API_BASE_URL}/notes`);
    const notes = await res.json();

    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes.forEach((note) => {
      const div = document.createElement("div");
      div.classList.add("note-card");
      div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        ${
          note.filePath
            ? `<a href="http://localhost:5000/${note.filePath}" target="_blank">View File</a>`
            : ""
        }
        <button onclick="deleteNote('${note._id}')">Delete</button>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading notes:", error);
  }
}

// =================== DELETE NOTE ===================
async function deleteNote(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Note deleted!");
      loadNotes();
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}

// Automatically load notes when page loads
document.addEventListener("DOMContentLoaded", loadNotes);
