class Issue {
  constructor(issue, severity, responsible, date) {
    this.issue = issue;
    this.severity = severity;
    this.responsilbe = responsible;
    this.date = new Date();
  }
}
let issueArr = [];
const addIssue = (issue, severity, responsible) => {
  const problem = new Issue(issue, severity, responsible);
  return issueArr.push(problem);
};
const history = document.getElementById("historyList");
const errDesc = document.getElementById("desc");
const errMemb = document.getElementById("memb");
const issueInput = document.getElementById("issue");
const errText = document.getElementById("error1");
const severityInput = document.getElementById("severity");
const assignInput = document.getElementById("assign");
const button = document.getElementById("button");
const historyBtn = document.getElementById("historyBtn");
const textBox = document.getElementById("issueBox");
const form = document.querySelector("form");
const createContent = (issue, severity, assign) => {
  const randomIdGen = () =>
    `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  const contentDiv = document.createElement("div");
  contentDiv.className = "jumbotron text-box";
  const box = textBox.appendChild(contentDiv);
  const status = document.createElement("h1");
  status.innerText = "open";
  box.appendChild(status);
  const issueId = randomIdGen();
  const id = document.createElement("p");
  id.innerHTML = `Issue ID: ${issueId}`;
  box.appendChild(id);
  const description = document.createElement("h5");
  description.innerHTML = issue;
  box.appendChild(description);
  const infoBox = document.createElement("div");
  infoBox.className = "mb-2";
  box.appendChild(infoBox);
  if (severity === "low") {
    const severity = document.createElement("span");
    severity.className = "badge badge-info mr-2";
    severity.innerHTML = "Low";
    infoBox.appendChild(severity);
  } else if (severity === "medium") {
    const severity = document.createElement("span");
    severity.className = "badge badge-dark mr-2";
    severity.innerHTML = "Medium";
    infoBox.appendChild(severity);
  } else if (severity === "high") {
    const severity = document.createElement("span");
    severity.className = "badge badge-warning mr-2";
    severity.innerHTML = "High";
    infoBox.appendChild(severity);
  } else if (severity === "urgent") {
    const severity = document.createElement("h1");
    severity.className = "badge badge-danger mr-2";
    severity.innerHTML = "URGENT ACTION";
    infoBox.appendChild(severity);
  }
  const responsibleParty = document.createElement("p");
  responsibleParty.className = "far fa-user-circle";
  responsibleParty.innerHTML = assign;
  infoBox.appendChild(responsibleParty);
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn btn-success mr-2";
  toggleBtn.setAttribute("id", "toggleBtn");
  toggleBtn.innerHTML = "Solve";
  box.appendChild(toggleBtn);
  toggleBtn.addEventListener("click", () => {
    status.innerHTML = "Solved";
    contentDiv.className =
      "jumbotron text-box-solved bg-success text-light text-center mb-3";
    infoBox.innerHTML = `Problem has been solved`;
    removeBtn.className = "btn btn-light btn-block text-danger";
    box.removeChild(description);
    box.removeChild(id);
    box.removeChild(toggleBtn);
  });
  const removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger";
  removeBtn.setAttribute("id", "removeBtn");
  removeBtn.innerHTML = "Delete";
  box.appendChild(removeBtn);
  removeBtn.addEventListener("click", () => {
    textBox.removeChild(contentDiv);
  });
};
const addToHistory = (name, severity, issue) => {
  const newDiv = document.createElement("div");
  newDiv.className = "jumbotron bg-dark text-light";
  history.appendChild(newDiv);
  const head = document.createElement("p");
  const date = issueArr[issueArr.length - 1].date.toString().slice(0, 15);
  head.innerHTML = date;
  newDiv.appendChild(head);
  const severityLevel = document.createElement("small");
  severityLevel.innerHTML = severity;
  newDiv.appendChild(severityLevel);
  const MemberName = document.createElement("h3");
  MemberName.innerHTML = name;
  newDiv.appendChild(MemberName);
  const issues = document.createElement("h5");
  issues.innerHTML = issue;
  newDiv.appendChild(issues);
};
const addPost = e => {
  e.preventDefault();
  let issueValue = issueInput.value;
  let severityValue = severityInput.value;
  let assignValue = assignInput.value;
  if (issueValue === "" && assignValue === "") {
    button.className = "btn btn-danger text-light";
    issueInput.className = "form-control text-box-danger";
    assignInput.className = "form-control text-box-danger";
    errMemb.className = "text-danger";
    errDesc.className = "text-danger";
    const err = document.createElement("span");
    err.className = "text-danger small";
    err.innerHTML = `Description is needed`;
    errText.appendChild(err);
    form.reset();
  } else {
    button.className = "btn btn-light";
    issueInput.className = issueInput.className.replace("text-box-danger", "");
    assignInput.className = issueInput.className.replace("text-box-danger", "");
    errDesc.className = errDesc.className.replace("text-danger", "");
    errMemb.className = errMemb.className.replace("text-danger", "");
    errText.innerHTML = "";
    addIssue(issueValue, severityValue, assignValue);
    createContent(issueValue, severityValue, assignValue);
    addToHistory(assignValue, severityValue, issueValue);
    form.reset();
  }
};
addIssue(`I can't connect my main.js file `, "high", "sina");
addIssue(`for loop doesn't work `, "low", "sheldon");
addIssue(`how do l print to the console?! `, "medium", "scott");
issueArr.forEach(issue => {
  const newDiv = document.createElement("div");
  newDiv.className = "jumbotron bg-dark text-light";
  history.appendChild(newDiv);
  const head = document.createElement("p");
  const date = issue.date.toString().slice(0, 15);
  head.innerHTML = date;
  newDiv.appendChild(head);
  const severity = document.createElement("small");
  severity.innerHTML = issue.severity;
  newDiv.appendChild(severity);
  const name = document.createElement("h3");
  name.innerHTML = issue.responsilbe;
  newDiv.appendChild(name);
  const issues = document.createElement("h5");
  issues.innerHTML = issue.issue;
  newDiv.appendChild(issues);
});
button.addEventListener("click", addPost);

