const localStorageKey = 'to-do-list-tgs';

function validateNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");    
    let inputValue = document.getElementById("taskInput").value
    let existe = values.find(x => x.name == inputValue)
    return !existe ? false : true
}
function newTask(){ 
    let input = document.getElementById("taskInput");
    input.style.border = ''
    //validação do input
    if(!input.value){
        alert("Digite uma tarefa!")
        input.style.border = '1px solid red'
    }
    else if(validateNewTask()){
        alert('Já existe esta tarefa')
    }
    else{
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues()
    }
    input.value = ''
}
function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById("to-do-list");
    list.innerHTML = ""; // Limpa a lista antes de mostrar os valores   
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id ='buttonok' onclick ='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></button></li>`;
    }
}
function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues()
}
showValues()