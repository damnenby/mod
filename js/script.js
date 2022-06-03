
const TODO_URL = 'http://localhost:8080/todo';
const ITEM_URL = 'http://localhost:8080/todo/';


const submit = document.getElementById("submit");

function createToDo(id){
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;
    let check = document.getElementById("completed");
    let state = check.checked;
    let container = document.getElementById("content");
    let myDiv = document.createElement("div");
    myDiv.className += "todo";
    let myH2 = document.createElement("h2");
    myH2.className += "title";
    myH2.innerHTML += title;
    let myBody = document.createElement("div");
    myBody.className += "body";
    myBody.innerHTML += body;
    let checkbox = document.createElement("div");
    checkbox.className += "completed";
    let label = document.createElement("label");
    label.innerHTML += "Is completed";
    let checked = document.createElement("input");
    checked.type = "checkbox";
    checked.checked = state;
    checked.className += "check";
    let delbtn = document.createElement("button");
    delbtn.className += "delete btnx";
    delbtn.innerHTML += "X";
    label.appendChild(checked);
    checkbox.appendChild(label)
    myDiv.appendChild(myH2);
    myDiv.appendChild(myBody);
    myDiv.appendChild(checkbox);
    myDiv.appendChild(delbtn);
    container.appendChild(myDiv)
    let prevSibId = parseInt(myDiv.previousElementSibling.getAttribute("data-id"))
    console.log("Created element with data-id: ", id)
    myDiv.setAttribute("data-id", id)
    
}



function createRequest(){
    const newPost = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value,
        completed: document.getElementById("completed").checked,
      };
      fetch(TODO_URL, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('создание запроса навернулось');
          }
          return response.json();
        })
        .then((result) => {
            createToDo(result.id);
            // let mybuttons = document.getElementsByClassName("delete");
            // for (let i = mybuttons.length-1; i <= mybuttons.length-1; i++){
            //     mybuttons[i].addEventListener("click", function(e){
            //         let targ = e.target
            //         my_id = parseInt(targ.parentNode.getAttribute("data-id"));
            //       },false)
            //     mybuttons[i].addEventListener("click", () => deleteRequest(my_id));  

            // }

            const targ1 = document.querySelector("[data-id='" + result.id + "']");
            const delbtn = targ1.querySelector(".delete")
            delbtn.addEventListener("click", () => deleteRequest(result.id)); 
            console.log(targ1.children) 
            let checkbox = targ1.getElementsByClassName("completed")[0].getElementsByTagName("label")[0].getElementsByTagName("input")[0]
            checkbox.addEventListener("click", () => patchRequest(result.id, checkbox))
            

          })
          .catch((err) => console.log(err))

        
}

let my_id = 0;

function deleteRequest(id){
    fetch(ITEM_URL + id, {
    method: "DELETE",
    })
  .then((response) => {
    if (!response.ok) {
        throw new Error('удаление запроса навернулось')
    }
    if (response.ok){
        console.log("DELETE ITEM WITH ID: " + id)
        let targ1 = document.querySelector("[data-id='" + id + "']");
        targ1.remove()
    }
    return response.json();
  })
  .catch((err) => console.log(err))
}

function patchRequest(id, checkbox){
    const editedPost = {
        completed: checkbox.checked
      };
      fetch(ITEM_URL + id, {
        method: "PATCH",
        body: JSON.stringify(editedPost),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('изменение запроса навернулось')
          }
          return response.json();
        })
        .catch((err) => console.log(err))
}

submit.addEventListener("click", () => createRequest())
// submit.addEventListener("click", () => createRequest())



