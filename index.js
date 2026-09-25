
const inputBtn = document.getElementById("btn-el");
const inputEl = document.getElementById("input-el");
const unorderList = document.getElementById("ul-el");
const container = document.getElementById("container");
const deleteBtn = document.querySelector("#delete-el");
const tabBtn = document.querySelector("#tab-el");

// tabBtn.addEventListener("click", function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const currentTab = tabs[0];
//     myLeads.push(currentTab.url);
//     render(myLeads);
//   });
// });
inputBtn.addEventListener("click", function () {
  inputEl.value.trim().length === 0
    ? alert("Please fill the input")
    : console.log(inputEl.value);
  inputEl.value = "";
});
deleteBtn.addEventListener("dblclick", (event) => {
 

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
