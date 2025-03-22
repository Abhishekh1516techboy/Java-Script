// ---------------Notification slider bar----------------
let notificationSlider = () => {
    document.getElementById("notify-slider").style.width = "100%";

    setTimeout(() => {
        document.getElementById("notify-slider").style.display = "none";
    }, 1200);

    setTimeout(() => {
        document.getElementById("notify-slider").style.width = "0px";
        document.getElementById("notify-slider").style.display = "block";
    }, 1400);
};

// ---------------Add first time todo PopUp section---------------
function addFirstTodo () {
    let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos.length === 0) { // if localSorage card data is empty code run...
        setTimeout(() => {
            document.getElementById("first-todo").classList.remove("first-todo-slider");
        }, 2000);
    } else {
        cardCreate(); // call cardCreate...
        todoHomeBtn(); // call Home Page Navigation Btn...
        deletedToDoBtn(); // call ToDodeleteBtn History Page Navigation...

        document.getElementById("first-todo").style.display = "none"; // hide the pop-up
        document.getElementById("toDo").classList.remove("toDoAdd-slider"); // show the new Todo add Page
    }

    // if toDoCard container is empty code run...
    if (savedTodos.length !== 0) {
        document.getElementById("toDoEmptyTitle").style.display = "none";
    } else {
        document.getElementById("toDoEmptyTitle").style.display = "block    ";
    }

    // if deletedToDoCard History container is empty code run...
    let deletedTodo = JSON.parse(localStorage.getItem("deletedTodos")) || [];
    if (deletedTodo.length !== 0) {
        document.getElementById("ClearEmptyTitle").style.display = "none";
    } else {
        document.getElementById("ClearEmptyTitle").style.display = "block    ";
    }

    document.getElementById("first-todo-add").addEventListener("click", () => {
        cardCreate(); // call cardCreate...
        todoHomeBtn(); // call Home Page Navigation Btn...
        deletedToDoBtn(); // call ToDodeleteBtn History Page Navigation...

        document.getElementById("first-todo").style.display = "none"; // hide the pop-up
        document.getElementById("toDo").classList.remove("toDoAdd-slider"); // show the new Todo add Page
    });
}

// -----------------Delete ToDo List card----------------
function deleteTodoListCard () {

    document.querySelectorAll(".list-delite-btn").forEach((delBtn) => {
        delBtn.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            notificationSlider(); // call notification slider

            let todoCard = e.target.closest(".lists-card");
            if (todoCard) {
                todoCard.classList.add("lists-card-slide");

                setTimeout(() => {
                    todoCard.classList.add("lists-card-none");
                }, 400);

                setTimeout(() => {
                    // Remove card from local storage
                    let uniqueId = parseInt(todoCard.getAttribute("unique-card-id")); // get card-unique-id...
                    let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
                    savedTodos = savedTodos.filter((todo) => todo.id !== uniqueId);
                    localStorage.setItem("todos", JSON.stringify(savedTodos)); // set card data fater deletion...

                    // if toDoCard container is empty code run...
                    if (savedTodos.length !== 0) {
                        document.getElementById("toDoEmptyTitle").style.display = "none";
                    } else {
                        document.getElementById("toDoEmptyTitle").style.display = "block";
                    }

                    // Remove card from DOM
                    todoCard.remove();
                    storeDeletedCard(todoCard); // call store Deleted Cards
                }, 1200);
            }
        });
    });

    // --------------deltet All Cards Permanently section-------------
    document.getElementById("toDoMenu").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        document.getElementById("deleeAllToDo").style.transform = "translateY(0)";

        setTimeout(() => {
            document.getElementById("deleeAllToDo").style.transform = "translateY(-35px)";
        }, 3000)
    });

    let confirmBox = document.getElementById("conformationBox"); // confirmationBox...
    let container = document.getElementById("container"); // mainContainer...
    document.getElementById("toDoAllDeleteBtn").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        confirmBox.style.display = "block";
        setTimeout(() => {
            confirmBox.style.transform = "scale(1)";
            confirmBox.style.opacity = "1";
        }, 100)
        container.style.filter = "blur(5px)"
    });

    // confirmation box cancel btn...
    document.getElementById("delCancel").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        confirmBox.style.transform = "scale(0)";
        container.style.filter = "unset"
        confirmBox.style.opacity = "0";
        setTimeout(() => {
            confirmBox.style.display = "none";
        }, 100)

    });

    //confirmation box confirm btn...
    document.getElementById("delConfirm").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        confirmBox.style.transform = "scale(0)";
        container.style.filter = "unset"
        confirmBox.style.opacity = "0";
        setTimeout(() => {
            confirmBox.style.display = "none";
        }, 100)

        // delete AllToDo Permenentaly...
        localStorage.removeItem("todos"); // clear localStorage all items....
        document.getElementById("toDo-List").innerHTML = ""; // remove all card fron toDOcard Container...

        // if toDoCard container is empty code run...
        document.getElementById("toDo-List").innerHTML = `<h3 id="toDoEmptyTitle">Empty Box</h3> `;
        document.getElementById("toDoEmptyTitle").style.display = "block";
    });

}

// --------------Store deleted card in DeletedCardHistory Page--------------
function storeDeletedCard (card) {
    // Load existing deleted todo cards from local storage
    let deletedTodos = JSON.parse(localStorage.getItem("deletedTodos")) || [];
    let cardId = deletedTodos.length ? deletedTodos[deletedTodos.length - 1].id : 0;

    let cardTitle = card.querySelector(".list-title").textContent;
    let cardDescription = card.querySelector(".list-desc").textContent;
    let cardDate = card.querySelector(".list-date").textContent;

    cardId++; // Increment unique ID for new card

    let divElem = document.createElement("div");
    divElem.classList.add("deleted-lists-card");
    divElem.setAttribute("deleted-card-id", `${cardId}`); // Set unique deletedCard ID
    divElem.innerHTML = `
         <div class="list-title-container">
            <h3 class="list-title">${cardTitle}</h3>
            <div class="list-del-edit-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="deletedCard-del-btn" width="24" height="24" fill="white" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
             </svg>
        </div>
    </div>
    <div class="list-desc-container">
        <h3 class="list-desc">${cardDescription}</h3>
        <small class="list-date">${cardDate}</small>
    </div>`;

    document.getElementById("deletedCard-box").appendChild(divElem);

    // Save deleted card data to local storage
    deletedTodos.push({
        id: cardId,
        title: cardTitle,
        description: cardDescription,
        date: cardDate,
    });

    localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos)); // Set card data in local storage

    // if deletedToDoCard History container is empty code run...
    if (deletedTodos.length !== 0) {
        document.getElementById("ClearEmptyTitle").style.display = "none";
    } else {
        document.getElementById("ClearEmptyTitle").style.display = "block";
    }

    deletedCardHistory(); // Call deletedCardHistory
}

// set deletedcards in deletedTodoHistory container onload from localStorage...
function loadDeletedTodos () {
    let deletedTodos = JSON.parse(localStorage.getItem("deletedTodos")) || [];
    let deletedTodoContainer = document.getElementById("deletedCard-box");

    deletedTodos.forEach((todo) => {
        let divElem = document.createElement("div");
        divElem.classList.add("deleted-lists-card");
        divElem.setAttribute("deleted-card-id", `${todo.id}`); // Set unique deletedCard ID
        divElem.innerHTML = `
            <div class="list-title-container">
                <h3 class="list-title">${todo.title}</h3>
                <div class="list-del-edit-container">
                    <svg xmlns="http://www.w3.org/2000/svg" class="deletedCard-del-btn" width="24" height="24" fill="white" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </div>
            </div>
            <div class="list-desc-container">
                <h3 class="list-desc">${todo.description}</h3>
                <small class="list-date">${todo.date}</small>
            </div>
        `;

        deletedTodoContainer.appendChild(divElem); // set card in toDO container onLoad page...

    });

    deletedCardHistory(); // reattach delete button event listeners
}

// -------------Add a ToDo by users inputs------------
function cardCreate () {

    // Check if the event listener is already attached to avoid multiple bindings
    const form = document.getElementById("input-form");
    form.removeEventListener("submit", formSubmit);
    form.addEventListener("submit", formSubmit);

    function formSubmit (e) {
        e.preventDefault();

        // Load existing todo cards from local storage
        let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        let uniqueId = savedTodos.length ? savedTodos[savedTodos.length - 1].id : 0;

        let todoCardContainer = document.getElementById("toDo-List");
        let titleInput = document.getElementById("title-input").value.trim();
        let descInput = document.getElementById("desc-input").value.trim();

        uniqueId++; // Increment unique ID for new card

        // Get the current date
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleDateString("en-GB"); // Format the date as 'dd/mm/yyyy'

        let divElem = document.createElement("div");
        divElem.setAttribute("class", "lists-card");
        divElem.setAttribute("unique-card-id", `${uniqueId}`);
        divElem.innerHTML = `
             <div class="list-title-container">
                <h3 class="list-title">${titleInput}</h3>
                <div class="list-del-edit-container">
                    <svg xmlns="http://www.w3.org/2000/svg" class="list-delite-btn" width="24" height="24" fill="white" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                    <svg class="list-edit-btn" width="24" height="24" fill="white" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                </div>
            </div>
            <div class="list-desc-container">
                <h3 class="list-desc">${descInput}</h3>
                <small class="list-date">${formattedDate}</small>
            </div>
        `;

        todoCardContainer.appendChild(divElem); // set new card in toDO container...

        // Save card to local storage
        savedTodos.push({
            id: uniqueId,
            title: titleInput,
            description: descInput,
            date: formattedDate,
        });

        localStorage.setItem("todos", JSON.stringify(savedTodos)); // set card data in localstorage...

        // Reset the input fields after card add...
        document.getElementById("title-input").value = "";
        document.getElementById("desc-input").value = "";

        // Show or hide empty list message...
        if (savedTodos.length !== 0) {
            document.getElementById("toDoEmptyTitle").style.display = "none";
        } else {
            document.getElementById("toDoEmptyTitle").style.display = "block";
        }

        setTimeout(() => {
            document.querySelectorAll(".lists-card").forEach((e) => {
                e.classList.add("listCard-show");
            });
        }, 100);

        deleteTodoListCard(); // call delete card function...
        editTodoListCard(); // call edit ToDo card function...
    };

}

// set cards in todo container onload from localStorage in toDO container page...
function loadTodos () {
    let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    let todoCardContainer = document.getElementById("toDo-List");

    savedTodos.forEach((todo) => {
        let divElem = document.createElement("div");
        divElem.setAttribute("class", "lists-card");
        divElem.setAttribute("unique-card-id", `${todo.id}`);
        divElem.innerHTML = `
            <div class="list-title-container">
                <h3 class="list-title">${todo.title}</h3>
                <div class="list-del-edit-container">
                    <svg xmlns="http://www.w3.org/2000/svg" class="list-delite-btn" width="24" height="24" fill="white" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                    <svg class="list-edit-btn" width="24" height="24" fill="white" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                </div>
            </div>
            <div class="list-desc-container">
                <h3 class="list-desc">${todo.description}</h3>
                <small class="list-date">${todo.date}</small>
            </div>
        `;
        todoCardContainer.appendChild(divElem); // set card in toDO container onLoad page...

        document.querySelectorAll(".lists-card").forEach((e) => {
            e.classList.add("listCard-show");
        });
    });

    deleteTodoListCard(); // reattach delete button event listeners
    editTodoListCard(); // edit ToDo card...
}

// ------------deleteCardHistory cards permanently delete section-----------
function deletedCardHistory () {
    document.querySelectorAll(".deletedCard-del-btn").forEach((dell) => {
        dell.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            notificationSlider(); // call notification slider

            let delCard = e.target.closest(".deleted-lists-card");
            if (delCard) {
                delCard.classList.add("deletede-card-slide");

                setTimeout(() => {
                    // Remove card from local storage
                    let uniqueId = parseInt(delCard.getAttribute("deleted-card-id")); // get card-unique-id...
                    let deletedTodo = JSON.parse(localStorage.getItem("deletedTodos")) || [];
                    deletedTodo = deletedTodo.filter((todo) => todo.id !== uniqueId);
                    localStorage.setItem("deletedTodos", JSON.stringify(deletedTodo)); // set card data fater deletion...

                    // if deletedToDoCard History container is empty code run...
                    if (deletedTodo.length !== 0) {
                        document.getElementById("ClearEmptyTitle").style.display = "none";
                    } else {
                        document.getElementById("ClearEmptyTitle").style.display = "block";
                    }

                    // Remove Deletedcard permanently from DOM
                    delCard.remove();
                }, 600);
            }
        });
    });

    // --------------deltet All Cards Permanently section-------------
    document.getElementById("clearToDoMenu").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        document.getElementById("clearAllTodo").style.transform = "translateY(0)";

        setTimeout(() => {
            document.getElementById("clearAllTodo").style.transform = "translateY(-35px)";
        }, 3000)
    });

    let confirmBox = document.getElementById("clearConformationBox"); // confirmationBox...
    let container = document.getElementById("container"); // mainContainer...
    document.getElementById("clearAllToDoBtn").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        confirmBox.style.display = "block";
        setTimeout(() => {
            confirmBox.style.transform = "scale(1)";
            confirmBox.style.opacity = "1";
        }, 100)
        container.style.filter = "blur(5px)"
    });

    // confirmation box cancel btn...
    document.getElementById("clearDelCancel").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        confirmBox.style.transform = "scale(0)";
        container.style.filter = "unset"
        confirmBox.style.opacity = "0";
        setTimeout(() => {
            confirmBox.style.display = "none";
        }, 100)

    });

    //confirmation box confirm btn...
    document.getElementById("clearDelConfirm").addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        confirmBox.style.transform = "scale(0)";
        container.style.filter = "unset"
        confirmBox.style.opacity = "0";
        setTimeout(() => {
            confirmBox.style.display = "none";
        }, 100)

        // delete AllToDo Permenentaly...
        localStorage.removeItem("deletedTodos"); // clear localStorage all items....
        document.getElementById("deletedCard-box").innerHTML = ""; // remove all card fron toDOcard Container...

        // if toDoCard container is empty code run...
        document.getElementById("deletedCard-box").innerHTML = `<h3 id="ClearEmptyTitle">Empty Box</h3> `;
        document.getElementById("ClearEmptyTitle").style.display = "block";
    });

}

// Function to handle editing a ToDo card
function editTodoListCard () {
    document.querySelectorAll(".list-edit-btn").forEach((editBtn) => {
        editBtn.addEventListener("click", (e) => {
            e.stopImmediatePropagation();

            // Show the edit form and hide the add form
            document.getElementById("toDo").style.display = "none"; // when click edit btn toDo page hide...

            let todoCard = e.target.closest(".lists-card");
            let uniqueId = parseInt(todoCard.getAttribute("unique-card-id"), 10);
            let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

            let todoToEdit = savedTodos.find(todo => todo.id === uniqueId);

            if (todoToEdit) {
                // Populate the form with existing values
                document.getElementById("edit-title-input").value = todoToEdit.title;
                document.getElementById("edit-desc-input").value = todoToEdit.description;

                // Update the form's submit handler to update the card
                const form = document.getElementById("edit-input-form");

                // Remove any existing submit listener to avoid multiple listeners issue
                form.onsubmit = null;

                form.onsubmit = function (e) {
                    e.preventDefault();

                    // Get the updated values from the form
                    todoToEdit.title = document.getElementById("edit-title-input").value.trim();
                    todoToEdit.description = document.getElementById("edit-desc-input").value.trim();
                    todoToEdit.date = new Date().toLocaleDateString("en-GB");

                    // Update the local storage with edited values
                    localStorage.setItem("todos", JSON.stringify(savedTodos));

                    // Update the DOM with new values
                    todoCard.querySelector(".list-title").textContent = todoToEdit.title;
                    todoCard.querySelector(".list-desc").textContent = todoToEdit.description;
                    todoCard.querySelector(".list-date").textContent = todoToEdit.date;

                    // Hide the edit form and show the add form
                    document.getElementById("toDo").style.display = "block"; // when form submit toDo page show...

                    // Reset the form fields
                    document.getElementById("edit-title-input").value = "";
                    document.getElementById("edit-desc-input").value = "";

                    // Optionally reset form submission to handle new cards
                    form.onsubmit = null;
                };
            } else {
                console.error("ToDo with ID", uniqueId, "not found.");
            }
        });
    });
}


// -----------ToDo user Input Home Page Navigation section------------
function todoHomeBtn () {
    // target Home Navigation Btn for Open ToDo userInput Page...
    document.getElementById("home").addEventListener("click", () => {
        document.getElementById("edit-TodoContainer").style.display = "block";
        document.getElementById("toDo").style.display = "block";
        setTimeout(() => {
            document.getElementById("toDo").classList.remove("toDoAdd-slider");
        }, 150);
        document.getElementById("deletedCardContainer").classList.add("deletedCardContainer-Slide");
    });

    document.getElementById("home").style.cursor = "pointer";
}

// ----------------deleted Card store page navigation section---------------
function deletedToDoBtn () {

    // select deleted-ToDo Navigation btn for open Deleted History Page...
    document.getElementById("del-History").addEventListener("click", () => {
        document.getElementById("deletedCardContainer").classList.remove("deletedCardContainer-Slide");
        document.getElementById("toDo").classList.add("toDoAdd-slider");
        document.getElementById("toDo").style.display = "none";
        document.getElementById("edit-TodoContainer").style.display = "none";
    });

    document.getElementById("del-History").style.cursor = "pointer";
}

// load on pageloading....
window.addEventListener("load", () => {
    addFirstTodo(); // first ToDo Add Pop-up call...
    loadTodos(); // Load existing todos in Todo Container from LocalStorage...
    loadDeletedTodos(); // Load Exesting DeletedToDo History Card from LocalStorage...
    // created Date: 22/8/2024 to 31/8/2024 saturday by @Abhishekh1516techboy
});