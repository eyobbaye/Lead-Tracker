
const inputBtn = document.getElementById("btn-el");
const inputEl = document.getElementById("input-el");
const unorderList = document.getElementById("ul-el");
const container = document.getElementById("container");
const deleteBtn = document.querySelector("#delete-el");
const tabBtn = document.querySelector("#tab-el");
let myLeads = [];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
unorderList.innerHTML = leadsFromLocalStorage;
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    myLeads.push(currentTab.url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    // console.log(currentTab.url);
  });
});
inputBtn.addEventListener("click", function () {
  inputEl.value.trim().length === 0
    ? alert("Please fill the input")
    : myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  inputEl.value = "";
});
deleteBtn.addEventListener("dblclick", (event) => {
  localStorage.removeItem("myLeads");
  myLeads = [];
  render(myLeads);
});
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
                  <li>
                    <a href='${leads[i]}' target='_blank'> 
                        ${leads[i]}
                    </a>
                  </li> `;
  }
  unorderList.innerHTML = listItems;
}
