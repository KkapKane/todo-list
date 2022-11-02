import './style.scss';

let taskArray = [];

  
class Task {
  constructor(title, priority, dueDate)
  {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.finish = false;
    
  }
  Task2List() {
    taskArray.push([this.title, this.priority, this.dueDate])
    console.log(taskArray)
    return this;
  }
  
}




function AddTask()
{

    
  let taskName = document.querySelector('.taskName').value;
  let taskPriority = document.querySelector('.taskPriority').value;
  let taskDue = document.querySelector('.taskDue').value;
  var tasks = new Task(taskName, taskPriority, taskDue);
  tasks.Task2List();
  

}


function MakeDiv() {
  
}


document.querySelector('.test').addEventListener('click', AddTask) 





console.log(taskArray)