let data = document.getElementById("inputValue");
let addBtn = document.getElementById("addItems");
let todoList = document.querySelector(".todoListItem");



const getTodoListFromLocal = () => {
     return JSON.parse(localStorage.getItem('ProjecttodoList'));
};

const addTodoListlocalStorage = (localTodoList) => {
    return localStorage.setItem("ProjecttodoList",
     JSON.stringify(localTodoList));
}

let localTodoList = getTodoListFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
    let divElem = document.createElement("div");
    divElem.classList.add("todoDiv");
    divElem.innerHTML = `<li>${curElem}</li>
    <button class="deleteItems">Delete</button>`;
    todoList.append(divElem);
}

const addTodoList = (e) =>{
    e.preventDefault();
    
    const todoListValue = data.value.trim();

    data.value = "";
    
    if( todoListValue != "" && !localTodoList.includes(todoListValue) ){

        localTodoList.push(todoListValue);
        localTodoList = [...new Set(localTodoList)];
        console.log(localTodoList);

        localStorage.setItem(
            'ProjecttodoList',
            JSON.stringify(localTodoList) 
        );
        addTodoDynamicElement(todoListValue);
    }
};




const showTodoList = () => {
    localTodoList.forEach(curElem => {
        addTodoDynamicElement(curElem);
    });
};

showTodoList();


const removeTodoElem = (e) =>{
    e.preventDefault();
    
    const todoToRemove = e.target;
    let todoListontent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement;
    console.log(todoListontent);
   
    localTodoList = localTodoList.filter((curElem) => {
        return curElem != todoListontent.toLowerCase();
    });

    addTodoListlocalStorage(localTodoList);
    parentElem.remove();
};


addBtn.addEventListener( "click", (e) => {
     (addTodoList(e));});


todoList.addEventListener( "click",  (e) => {
    e.preventDefault();

    if(e.target.classList.contains("deleteItems")) {
        removeTodoElem(e);
    };
     
  });


 