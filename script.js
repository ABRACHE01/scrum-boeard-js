
var title = document.getElementById("title");
var Feature=document.getElementById('Feature')
var Bug=document.getElementById('Bug')

var priority = document.getElementById("Priority");
var Status = document.getElementById("Status");
var date= document.getElementById("date");
var description = document.getElementById("Description");

let todoSection = document.getElementById("to-do-tasks");
let progressSection = document.getElementById("in-progress-tasks");
let doneSection = document.getElementById("done-tasks");

let todoCount=document.getElementById("to-do-tasks-count");
let inprogCount=document.getElementById("in-progress-tasks-count");
let donCount=document.getElementById("done-tasks-count");

let form=document.getElementById("modalform");

let idToUpdate;

let trackId = 1;


function charger(){
       
    todoSection.innerHTML='';
    progressSection.innerHTML='';
    doneSection.innerHTML='';
    
    var c;

    for (var i = 0; i < tasks.length; i++) {
      c=i+1;

      if (tasks[i].status == "To Do") {
        todoSection.innerHTML+=`
        <button  onclick="getInfoToUpdate(id);"  id="${tasks[i].id}" class="container-fluid border  btn-light text-black   " data-bs-toggle="modal" data-bs-target="#modalform">
        <div class="row mt-2">
          <div class="col-1 ">
            <i class=""><img width="22px" src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-lamp-frequently-asked-questions-faq-bearicons-outline-color-bearicons.png"/></i>
          </div>
          <div class="col-11 ">
            <div class="fw-bold">${tasks[i].title}</div>
            <div class="">
              <div class="text-muted"> #${c} created in ${tasks[i].date}</div>
              <div class="" title="${tasks[i].description}">${tasks[i].description.substring(0,70)+'...'}</div>
            </div>
            <div class="mb-3 mt-2">
              <span class="btn btn-primary ">${tasks[i].priority}</span>
              <span class="btn btn-secondary ">${tasks[i].type}</span>
            </div>
          </div>
        </div>
      </button>`
      todoCount.innerHTML++;
      }else if(tasks[i].status == "In Progress"){
        progressSection.innerHTML+=`
        <button  onclick="getInfoToUpdate(id);" id="${tasks[i].id}" class="container-fluid border  btn-light text-black" data-bs-toggle="modal"  data-bs-target="#modalform" >
        <div class="row mt-2">
          <div class="col-1 ">
            <i class=" "><img width="22px" src="https://img.icons8.com/color/48/000000/in-progress--v1.png"/></i>
          </div>
          <div class="col-11 ">
            <div class="fw-bold">${tasks[i].title}</div>
            <div class="">
              <div class="text-muted"> #${c} created in ${tasks[i].date}</div>
              <div class="" title="${tasks[i].description}">${tasks[i].description.substring(0,70)+'...'}</div>
            </div>
            <div class="mb-3 mt-2">
              <span class="btn btn-primary ">${tasks[i].priority}</span>
              <span class="btn btn-secondary ">${tasks[i].type}</span>
            </div>
          </div>
        </div>
      </button>`
      inprogCount.innerHTML++;
    }else if(tasks[i].status == "Done"){
        doneSection.innerHTML+=`
        <button  onclick="getInfoToUpdate(id);" id="${tasks[i].id}" class=" container-fluid border  btn-light text-black " data-bs-toggle="modal" data-bs-target="#modalform" >
        <div class="row mt-2">
          <div class="col-1 ">
            <i class=""><img width="22px" src="https://img.icons8.com/color/48/1A1A1A/checked--v1.png"/></i>
          </div>
          <div class="col-11 ">
            <div class="fw-bold">${tasks[i].title}</div>
            <div class="">
              <div class="text-muted"> #${c} created in ${tasks[i].date}</div>
              <div class="" title="${tasks[i].description}">${tasks[i].description.substring(0,70)+'...'}</div>
            </div>
            <div class="mb-3 mt-2">
              <span class="btn btn-primary ">${tasks[i].priority}</span>
              <span class="btn btn-secondary ">${tasks[i].type}</span>
            </div>
          </div>
        </div>
      </button>`
      donCount.innerHTML++;
    }
    trackId++;
  }
}

function supTous(){
  trackId=1;
  tasks_to_delete = document.querySelectorAll('.task');
  for(t of tasks_to_delete){
    t.remove();
  }
  todoCount.innerHTML = 0;
  inprogCount.innerHTML= 0;
  donCount.innerHTML= 0;

}

function ajouterTasks(){
  let typeChecked;
  if(Feature.checked){
    typeChecked = Feature.id;
  }
  else if(Bug.checked){
    typeChecked = Bug.id;
  }

    let taskObjects = {
      'id'            :   trackId,
      'title'         :   title.value,
      'type'          :  typeChecked,
      'priority'      :   priority.value,
      'status'        :   Status.value,
      'date'          :   date.value,
      'description'   :   description.value,
    }
    tasks.push(taskObjects);
    supTous();
    charger();
    addalert();
}

charger();

function getInfoToUpdate(id) {
  idToUpdate=id; 
  for(t of tasks){
    if (id==t.id){
      
    title.value = t.title;
    if(t.type == 'Bug'){
      Bug.checked = true;
    }else{
      Feature.checked = true;
    }

    priority.value = t.priority;
    Status.value = t.status;
    date.value = t.date;
    description.value = t.description;
    break;
    }
  }
}

function modifier(){
  addalert();
  for(t of tasks){
    if (idToUpdate==t.id){
      
    t.title = title.value;
    if(Bug.checked){
      t.type = 'Bug';
    }else{      
      t.type = 'Feature';
    }

    t.priority = priority.value;
    t.status = Status.value;
    t.date = date.value;
    t.description = description.value;
      break;
    }
  }
  supTous();
  charger();
}

function delete_Tasks(){
    temp = []
    for(t of tasks){
      if(t.id != idToUpdate){
        temp.push(t);
      }else{
        continue;
      }
    }
    tasks = temp;
    supTous();
    charger();
    deletalert();
}

function clear_menu(){
  document.getElementById("form").reset();
}

function addalert(){
  Swal.fire({
    icon: 'success',
    title: 'saved!',
    showConfirmButton: false,
    timer: 1500
  })
 
  
}

function deletalert(){
  Swal.fire({
    icon: 'success',
    title: 'deleted!',
    showConfirmButton: false,
    timer: 1500
  })
}



