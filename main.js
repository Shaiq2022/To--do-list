

const inputList = document.querySelector(".input-list") 


const setDragDrop = (el) => {
    el.setAttribute('draggable', 'true')
    el.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text', e.target.id);    
    }, false)
  
     el.addEventListener('dragover', (e) => {   
        e.preventDefault()
     })
  
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      let sourceId=e.dataTransfer.getData("text");  
      const childNodesArr = [...document.getElementById("parent").childNodes]  
      const sourceIndex = childNodesArr.findIndex(el => el.id === sourceId);  
      
      document.getElementById("parent").replaceChild(document.getElementById(sourceId), e.currentTarget)   
      
      document.getElementById("parent").insertBefore(e.currentTarget,document.getElementById("parent").childNodes[sourceIndex]);    
    })
  }

let todoList = [] 
const initialData = localStorage.getItem('list');

if (initialData) {                   
    todoList = JSON.parse(initialData); 
    renderTodos(todoList);
}

function renderTodos(todosMassivi) {
    todosMassivi.forEach((element, indeksi) => {
        const liEl = document.createElement("li");  

        liEl.id = Math.random() + indeksi;
        setDragDrop(liEl)

        liEl.innerText = element;  
        const spanEl = document.createElement("span");
        spanEl.innerHTML = "&times"; 
        spanEl.addEventListener('click', (e) => {
            e.target.parentElement.remove();      
            todoList = todoList.filter(item => item !== element)   
            localStorage.setItem('list', JSON.stringify(todoList)) 
        })
        liEl.appendChild(spanEl);
        inputList.appendChild(liEl);    

        
        
    });
}

let inputValue = document.querySelector(".input-value") 
const btn1 = document.querySelector(".add-list")   
function btnfunck(event) {
    inputValue.value = inputValue.value.replace(/[^aA-zZ 0-9]/g, "").toLowerCase()
    inputValue.value = inputValue.value.charAt(0).toUpperCase() + inputValue.value.slice(1);

    if (inputValue.value !== "") {
        const liEl = document.createElement("li");  
        liEl.textContent = inputValue.value;    
        inputList.appendChild(liEl);    
        
        const spanEl = document.createElement("span");  
        spanEl.innerHTML = "&times";    
        liEl.appendChild(spanEl);   
        
        liEl.id = Math.random() + 1;
        setDragDrop(liEl)
        todoList.push(inputValue.value);    
        localStorage.setItem('list', JSON.stringify(todoList))  

        spanEl.addEventListener('click', (e) => {
            let delSpanX = e.target.parentElement.innerHTML.split('<span>')[0];     
            e.target.parentElement.remove();   
            todoList = todoList.filter(item => item !== delSpanX)   
            localStorage.setItem('list', JSON.stringify(todoList))  
        })

        inputValue.value = "";
    }
}
btn1.addEventListener("click", btnfunck);


const sortImage = document.querySelector(".image")
let balans = true

function sortMyList() {
    const liList = document.querySelectorAll(".input-list>li")   
    let arayFromHtml = [...liList] 

    if (balans) {
        balans = false;
        sortImage.src = "./img/Group 73.png";
        let sortingList = arayFromHtml.sort((a, b) => (
            (a.innerText > b.innerText) ? 1 : -1
        ))
        inputList.innerHTML = ""   

        for (let li of sortingList) {  
            inputList.appendChild(li)  
        }
    } else {
        balans = true;
        sortImage.src = "./img/Group 91.png";
        let sortingList = arayFromHtml.sort((a, b) => (
            (a.innerText < b.innerText) ? 1 : -1
        ))
        
        inputList.innerHTML = ""
        for (let li of sortingList) {
            inputList.appendChild(li)
        }
    }
}
sortImage.addEventListener("click", sortMyList)
