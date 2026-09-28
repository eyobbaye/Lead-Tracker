
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  forceWebSockets,
} from "firebase/database";

forceWebSockets();

const firebaseConfig = {
  databaseURL:import.meta.env.VITE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
// render all items using onValue
onValue(referenceInDB, function (snapshot) {
  // turn the object into array
  const leads = Object.values(snapshot.val() || {});
  render(leads);
});

deleteBtn.addEventListener("dblclick", function () {
  //remove from the UI
  ulEl.innerHTML = "";
  //remove from the DB
  remove(referenceInDB);
});

inputBtn.addEventListener("click", function () {
  console.log("btn clicked");
  push(referenceInDB, inputEl.value);
  // push(referenceInDB, {
  //   value: inputEl.value,
  //   timestamp: Date.now(),
  // });
  console.log(inputEl.value);
  inputEl.value = "";
});
