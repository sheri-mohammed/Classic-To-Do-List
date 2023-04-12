let containerD = document.querySelector(".container")
let cont = document.querySelector(".cont");
let images = document.querySelectorAll(".images img");
let allis = document.querySelectorAll(".colors li")

// for colorfull background :
allis.forEach((li)=>{
    li.addEventListener("click",(e)=>{
        allis.forEach((li)=>{
            li.classList.remove("active");
        });
        images.forEach((img)=>{
            img.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        cont.style.backgroundImage = "none";
        cont.style.backgroundColor = e.currentTarget.dataset.color;
        //window.localStorage.setItem("color",e.currentTarget.dataset.color);
    })
})
// for image background :
images.forEach((img)=>{
    img.addEventListener("click",(e)=>{
        allis.forEach((li)=>{
            li.classList.remove("active");
        });
        images.forEach((img)=>{
            img.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        cont.style.backgroundImage = `url('${e.currentTarget.src}')`;
        
    })
})

containerD.addEventListener("click",(e)=>{
    if(e.target.classList.contains("active")){
        if(e.target.dataset.color){
            cont.style.backgroundImage = "none";
            window.localStorage.setItem("color",e.target.dataset.color);
        }else if(e.target.src){
            window.localStorage.removeItem("color");
            window.localStorage.setItem("image",e.target.src);
        }

    }
})


//for storing color or image at local storage :

if(window.localStorage.getItem("color")){
    cont.style.backgroundImage = "none";
    cont.style.backgroundColor = window.localStorage.getItem("color");
    document.querySelector(`[data-color = "${window.localStorage.getItem("color")}"]`).classList.add("active");
}else if(window.localStorage.getItem("image")){
    cont.style.backgroundImage = `url('${window.localStorage.getItem("image")}')`;
    document.querySelector(`[src = "${window.localStorage.getItem("image")}"]`).classList.add("active");
}

///////////////////////////////////////////

// start to-do mechanism :
let inputT = document.querySelector(".form .input");
let submit = document.querySelector(".form .add");
let tasksD = document.querySelector(".cont .tasks");

// empty array to store tasks:
let taskArray = [];

//check if there is data in local so the array wont be empty:
if(localStorage.getItem("tasks")){
    taskArray = JSON.parse(localStorage.getItem("tasks"));
};

// putting data from local in the page:
getDataFromLocal();


// job of submit button :
submit.onclick = ()=>{
    if(inputT.value !== ""){
        addTasks(inputT.value);
        inputT.value = ""
    }
};



/////////////////////////////////// Functions :

// function to create task object & add it to array & div in page & local storage:
function addTasks(taskText){
    const task = {
        id : Date.now(),
        title : taskText,
        completed : false,
        checked : false,
    }
    taskArray.push(task);
    addTaskToDiv(taskArray);
    addTaskTolocal(taskArray);
}

//create my task div by looping in array and add it in the cont div:
function addTaskToDiv(taskArray) {
    tasksD.innerHTML = "";
    taskArray.forEach((task)=>{
        // create div :
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);

        // the ability of completing:
        if(task.completed){
            div.className = "task done";
        }
        
        // add check button to div :
        let check = document.createElement("input");
        check.className = "check";
        check.type = "radio";
        div.appendChild(check);

        // the ability of checking :
        if(task.checked){
            check.checked = true;
        }

        // add p to the div:
        let p = document.createElement("p");
        p.style.width = "78%";
        p.appendChild(document.createTextNode(task.title));
        div.appendChild(p);
        // create delete button:
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"));
        // div appending span :
        div.appendChild(span);
        // add the task to the container:
        tasksD.appendChild(div) ;


        /// oberate delete button
        span.onclick = ()=>{
            deleteFromLoc(div.getAttribute("data-id"));
            div.remove();
        }
        /// oberate check button
        check.onclick = ()=>{
            task.completed == false ?(task.completed = true): (task.completed = false);
            task.checked == false ?(task.checked = true): (task.checked = false);
            if(task.completed && task.checked){
                div.className = "task done";
            }else{
                div.className = "task";
                check.checked = false;
            }
            updateCheck(div.getAttribute("data-id"));
        }

    })
} 


// add tasks to local storage:
function addTaskTolocal(taskArray){
    window.localStorage.setItem("tasks", JSON.stringify(taskArray));
}
// get data from local storage :
function getDataFromLocal(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let localdata = JSON.parse(data);
        addTaskToDiv(localdata);
    }
}
// deleting task from local :
function deleteFromLoc(taskId){
    taskArray = taskArray.filter((task)=>task.id != taskId);
    addTaskTolocal(taskArray);
}
// checking status:
function updateCheck(taskId){
    for(let i = 0; i <taskArray.length; i++){
        if(taskArray[i].id == taskId){
            taskArray[i].completed == false ? (taskArray[i].completed = true) : (taskArray[i].completed = false);
            taskArray[i].checked == false ? (taskArray[i].checked = true) : (taskArray[i].checked = false);
        }
    }
    addTaskTolocal(taskArray);
}
