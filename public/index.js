let users = JSON.parse(localStorage.getItem("users")) || [];

async function addUsers() {
  let userName = document.getElementById("signup-username").value;
  let password = document.getElementById("signup-password").value;

  users.push({
    userName: userName,
    password: password,
  });

  localStorage.setItem("users", JSON.stringify(users));
  console.log(users);
}

async function get() {
  try {
    let userName = document.getElementById("signin-username").value;
    let password = document.getElementById("signin-password").value;
    let user = users.find((elem) => {
      return elem.userName === userName && elem.password === password;
    });

    console.log(user);

    if (user.userName) {
      let response = await axios.post("/signin", {
        userName: user.userName,
        password: user.password,
      });
      // console.log(response.data.message)
      let token = response.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      window.location.reload();
    }
  } catch (err) {
    console.log("the err is ", err);
  }
}

const inputBtn = document.querySelector("#add-todo-button");
const outputBtn = document.querySelector(".output-delete-btn");
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
async function dotherest() {
  const output = document.getElementById("output");
  // console.log(outputBtn)

  console.log(todoList);

  todoList.forEach((elem) => {
    createElem(elem);
  });

  output.addEventListener("click", (elem) => {
    let value = elem.target;
    if (value.innerText === "Delete") {
      let parentNode = value.parentNode;
      // console.log(parentNode.childNodes)
      // parentNode.childNodes.forEach((elem) => {
      //     console.log(elem.innerText)
      // });
      let task = parentNode.querySelector("h1").textContent;
      // console.log(task)
      let taskIndex = todoList.findIndex((elem) => {
        return elem === task;
      });
      // console.log(taskIndex)
      // console.log(todoList)
      const splicedValue = todoList.splice(taskIndex, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      // console.log(splicedValue)
      output.removeChild(parentNode);
    }
  });
}

function getElement() {
  const task = document.getElementById("todo-input").value;
  todoList.push(task);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  createElem(task);
  // localStorage.setItem("todoList", JSON.stringify(todoList))
  console.log(todoList);
}

function createElem(task) {
  let newElem = document.createElement("div");
  let newH1 = document.createElement("h1");
  let newBtn = document.createElement("button");

  newH1.textContent = task;
  newBtn.textContent = "Delete";

  newElem.appendChild(newH1);
  newElem.appendChild(newBtn);
  output.appendChild(newElem);
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("token")) {
    dotherest();
  } else {
    document.querySelector("#input").style.display = "none";
  }
});
