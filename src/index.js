import "./style.scss";
import ExpandArrow from "./expand.svg";
var taskProject;
let taskPriority = undefined;
var projectArray = [];
let taskArray = [];

class Project {
  constructor(projectName) {
    this.ProjectName = projectName;
  }
  pushProject() {
    projectArray.push(this.ProjectName);
  }
}

class Task {
  constructor(title, priority, dueDate, description, project) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.project = project;
    this.finish = false;
  }
  Task2List() {
    taskArray.push([
      this.title,
      this.priority,
      this.dueDate,
      this.description,
      this.project,
    ]);
    console.log(taskArray);
    return this;
  }
}

const closeBtn = document.querySelector(".close");
const addProject = document.querySelector(".addProject");
const bgModal = document.querySelector(".bg-modal");
const lowPrio = document.querySelector(".LP");
const medPrio = document.querySelector(".MP");
const HighPrio = document.querySelector(".HP");
const AppendBtn = document.querySelector(".submitProject");
const middle = document.querySelector(".middle");

AppendBtn.addEventListener("click", function () {
  appendProject();
});

addProject.addEventListener("click", function () {
  this.classList.toggle("slide");
  document.querySelector(".ProjectInput").style.display = "flex";
  document.querySelector(".btnCont").style.display = "flex";
  if (this.classList.value == "addProject") {
    document.querySelector(".ProjectInput").style.display = "none";
    document.querySelector(".btnCont").style.display = "none";
  }
});

closeBtn.addEventListener("click", function () {
  bgModal.style.display = "none";
});

lowPrio.addEventListener("click", function () {
  taskPriority = "Low";
  this.style.backgroundColor = "green";
  medPrio.style.backgroundColor = "rgb(230, 248, 255)";
  HighPrio.style.backgroundColor = "rgb(230, 248, 255)";
});

medPrio.addEventListener("click", function () {
  taskPriority = "Medium";
  this.style.backgroundColor = "yellow";
  lowPrio.style.backgroundColor = "rgb(230, 248, 255)";
  HighPrio.style.backgroundColor = "rgb(230, 248, 255)";
});

HighPrio.addEventListener("click", function () {
  taskPriority = "High";
  this.style.backgroundColor = "red";
  lowPrio.style.backgroundColor = "rgb(230, 248, 255)";
  medPrio.style.backgroundColor = "rgb(230, 248, 255)";
});

// listen to body for click on tagnam img
document.querySelector("body").addEventListener("click", function (event) {
  if (event.target.tagName.toLowerCase() === "img") {
    event.target.parentElement.querySelector("taskBtn").style.display = "none";
    event.target.parentElement.querySelector("edit").style.display = "none";
    event.target.parentElement.querySelector("detail").style.display = "none";

    event.target.classList.toggle("rotate");
    event.target.parentElement
      .querySelector("tabDiv")
      .classList.toggle("scrollSlide");
  }
  if (event.target.tagName.toLowerCase() == "closebtn") {
    event.target.parentElement.remove();
  }
  if (event.target.tagName.toLowerCase() === "taskbtn") {
    taskProject = event.target.id;
    console.log(event.target.id);
  }
  if (event.target.classList == "rotate") {
    event.target.parentElement.querySelector("taskBtn").style.display = "flex";
    event.target.parentElement.querySelector("taskBtn").textContent =
      "Add Task";
    event.target.parentElement.querySelector("edit").style.display = "flex";
    event.target.parentElement.querySelector("edit").textContent = "Edit";
    event.target.parentElement.querySelector("detail").style.display = "flex";
    event.target.parentElement.querySelector("detail").textContent = "detail";
  }

  if (event.target.tagName.toLowerCase() === "taskbtn") {
    document.querySelector(".bg-modal").style.display = "flex";
    document.querySelector(".topText").textContent =
      "Project:" + " " + taskProject;
  }

  if (event.target.tagName.toLowerCase() === "detail") {
    document.querySelector(".detailModal").style.display = "flex";

    let tempArr = [];
    const realtaskList = document.querySelector(".realtaskList");
    removeAllChild(realtaskList);
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i][4] == event.target.id) {
        tempArr.push(taskArray[i]);
      }

      if (taskArray[i][4] == event.target.id) {
        var listOfTask = document.createElement("divfortask");
        listOfTask.setAttribute("id", event.target.id);
        const taskTitle = document.createElement("taskTitle");
        const taskDes = document.createElement("taskDes");
        const taskDD = document.createElement("taskDD");
        const taskPrio = document.createElement("taskPrio");
        taskDes.textContent = tempArr.slice(-1)[0][3];
        taskTitle.textContent = tempArr.slice(-1)[0][0];
        taskDD.textContent = tempArr.slice(-1)[0][2];
        taskPrio.textContent = tempArr.slice(-1)[0][1];
        listOfTask.appendChild(taskTitle);

        listOfTask.appendChild(taskDes);
        listOfTask.appendChild(taskDD);
        listOfTask.appendChild(taskPrio);
        realtaskList.appendChild(listOfTask);
      }
    }
  }

  if (event.target.classList == "detailClose") {
    console.log("hi");
    document.querySelector(".detailModal").style.display = "none";
  }
});

document.querySelector(".test").addEventListener("click", function () {
  AddTask();
});

//function that removes all child from parent
function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function makeProjectDiv() {
  const ArrowPic = new Image();
  ArrowPic.src = ExpandArrow;
  const right = document.querySelector(".right");
  const tab = document.createElement("tabDiv");
  const detail = document.createElement("detail");
  const projDiv = document.createElement("div");

  const tabBtnContainer = document.createElement("tabBtnContainer");
  let addTaskBtn = document.createElement("taskBtn");
  addTaskBtn.setAttribute("id", projectArray.slice(-1));
  detail.setAttribute("id", projectArray.slice(-1));
  const editBtn = document.createElement("edit");
  const closeBtn = document.createElement("closeBtn");
  closeBtn.textContent = "+";

  projDiv.classList.add("Project");
  projDiv.setAttribute("id", projectArray.slice(-1));
  projDiv.textContent = projectArray.slice(-1);

  middle.appendChild(projDiv);

  projDiv.appendChild(tab);
  tabBtnContainer.appendChild(detail);
  tab.appendChild(tabBtnContainer);
  tabBtnContainer.appendChild(addTaskBtn);
  tabBtnContainer.appendChild(editBtn);

  projDiv.appendChild(closeBtn);
  projDiv.appendChild(ArrowPic);
}

function appendProject() {
  let pname = document.querySelector(".ProjectInput").value;
  var project = new Project(pname);

  project.pushProject();

  makeProjectDiv();
  document.querySelector(".ProjectInput").value = "";
}

function AddTask() {
  if (taskPriority == undefined) {
    alert("please choose a priority");
    return;
  }

  let taskName = document.querySelector(".taskName").value;
  let description = document.querySelector(".description").value;
  let taskDue = document.querySelector(".taskDue").value;
  var tasks = new Task(
    taskName,
    taskPriority,
    taskDue,
    description,
    taskProject
  );
  tasks.Task2List();
  document.querySelector(".bg-modal").style.display = "none";
}
