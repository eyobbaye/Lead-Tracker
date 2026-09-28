import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  forceWebSockets,
  set,
} from "firebase/database";

forceWebSockets();

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

let currentLeads = [];
let editingId = null;

// Read

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    const [id, url] = leads[i];
    if (editingId === id) {
      listItems += `
        <li class="lead-item editing">
          <input type="text" class="edit-input" id="edit-input-${id}" value="${url}" />
          <div class="btn-group">
            <button class="save-btn" data-id="${id}" title="Save">Save</button>
            <button class="cancel-btn" data-id="${id}" title="Cancel">Cancel</button>
          </div>
        </li>
      `;
    } else {
      listItems += `
        <li class="lead-item">
          <a href="${url}" target="_blank">${url}</a>
          <div class="btn-group">
            <button class="edit-btn" data-id="${id}" title="Edit">✏️</button>
            <button class="delete-item-btn" data-id="${id}" title="Delete">🗑️</button>
          </div>
        </li>
      `;
    }
  }
  ulEl.innerHTML = listItems;
}
// render all items using onValue
// READ
onValue(referenceInDB, function (snapshot) {
  // turn the object into array
  // const leads = Object.values(snapshot.val() || {});
  currentLeads = Object.entries(snapshot.val() || {});
  render(currentLeads);
});
// input function
function saveInput() {
  const value = inputEl.value.trim();
  if (value) {
    push(referenceInDB, value);
    inputEl.value = "";
  }
}
deleteBtn.addEventListener("dblclick", function () {
  //remove from the UI
  ulEl.innerHTML = "";
  //remove from the DB
  remove(referenceInDB);
});
inputBtn.addEventListener("click", saveInput);
inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    saveInput();
  }
  // push(referenceInDB, {
  //   value: inputEl.value,
  //   timestamp: Date.now(),
  // });
  // console.log(inputEl.value);
});
// UPDATE
ulEl.addEventListener("click", function (event) {
  const target = event.target;
  const id = target.dataset.id;

  // edit mode
  if (target.classList.contains("edit-btn")) {
    editingId = id;
    render(currentLeads);
  }
  // cancel edit
  if (target.classList.contains("cancel-btn")) {
    editingId = null;
    render(currentLeads);
  }

  // update
  if (target.classList.contains("save-btn")) {
    const editInput = document.getElementById(`edit-input-${id}`);
    const updatedUrl = editInput.value.trim();
    if (updatedUrl) {
      set(ref(database, `leads/${id}`), updatedUrl);
      editingId = null;
      render(currentLeads);
    }
  }
  // DELETE
  // 4. Delete single lead from Firebase (Delete)
  if (target.classList.contains("delete-item-btn")) {
    remove(ref(database, `leads/${id}`));
  }
});
// Delete ALL
deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB);
});
