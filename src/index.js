import "./style.scss";

let taskPriority = undefined;
var projectArray = [];
let taskArray = [];

class Project {
  constructor(projectName) {
  this.ProjectName = projectName;
  }
  pushProject() {
    projectArray.push(this.ProjectName)
  }
}


class Task {
  constructor(title, priority, dueDate, description) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.finish = false;
  }
  Task2List() {
    taskArray.push([this.title, this.priority, this.dueDate, this.description]);
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
const AppendBtn = document.querySelector('.submitProject');
const middle = document.querySelector('.middle');

AppendBtn.addEventListener('click', function () {
  appendProject();
})


addProject.addEventListener("click", function () {
  this.classList.toggle('slide')
  document.querySelector('.ProjectInput').style.display = 'flex';
  document.querySelector('.btnCont').style.display = 'flex';
  if (this.classList.value == 'addProject')
  {
    
    
    document.querySelector('.ProjectInput').style.display = 'none';
    document.querySelector('.btnCont').style.display = 'none';
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






function AddTask() {
  if (taskPriority == undefined) {
    alert("please choose a priority");
    return;
  }


  let taskName = document.querySelector(".taskName").value;
  let description = document.querySelector(".description").value;
  let taskDue = document.querySelector(".taskDue").value;
  var tasks = new Task(taskName, taskPriority, taskDue, description);
  tasks.Task2List();
  document.querySelector(".bg-modal").style.display = "none";
}

function appendProject() {
  let pname = document.querySelector(".ProjectInput").value;
  var project = new Project(pname);

  project.pushProject();
 

  makeProjectDiv();
  console.log(projectArray)
}


function makeProjectDiv() {
  const projDiv = document.createElement('div');
  const addTaskBtn = document.createElement('taskBtn');
  const editBtn = document.createElement('edit')
  const closeBtn = document.createElement('close')
  addTaskBtn.textContent = 'Add Task'
  
  projDiv.classList.add('Project')
  projDiv.setAttribute('id', projectArray.length)
  projDiv.textContent = projectArray.slice(-1)
  
  middle.appendChild(projDiv);
  
  projDiv.appendChild(addTaskBtn);
  projDiv.appendChild(editBtn);

}




document.querySelector(".test").addEventListener("click", AddTask);

console.log(taskArray);
