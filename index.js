
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

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

onValue(referenceInDB, function (snapshot) {
  const leads = Object.values(snapshot.val() || {});
  render(leads);
  console.log(snapshot.val());
});

deleteBtn.addEventListener("dblclick", function () {
  ulEl.innerHTML = "";
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
