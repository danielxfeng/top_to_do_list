function toLocalDateTime(dateTime) {
    let year = dateTime.getFullYear();
    let month = String(dateTime.getMonth() + 1).padStart(2, '0');
    let day = String(dateTime.getDate()).padStart(2, '0');
    let hours = String(dateTime.getHours()).padStart(2, '0');
    let minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const itemForm = (controller, type, item = null) => {
    let form = document.createElement("form");
    let properties = item === null ? null : item.get();
    let id = type === "update" ? properties.id : "new";

    form.classList.add("item_form");

    let inputId = document.createElement("input");
    inputId.setAttribute("type", "hidden");
    inputId.setAttribute("name", "id");
    inputId.setAttribute("id", `item_id_${id}`);
    inputId.setAttribute("value", id);
    form.appendChild(inputId);

    let inputTitle = document.createElement("input");
    inputTitle.classList.add("item_title");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("name", "title");
    inputTitle.required = true;
    if (type === "update") {
        inputTitle.setAttribute("value", properties.title);
    } else {
        inputTitle.setAttribute("placeholder", "The title");
    }
    form.appendChild(inputTitle);

    let inputDescription = document.createElement("textarea");
    inputDescription.classList.add("item_description");
    inputDescription.setAttribute("name", "description");
    if (type === "update") {
        inputDescription.value = properties.description;
    } else {
        inputDescription.setAttribute("placeholder", "Add some description...");
    }
    form.appendChild(inputDescription);

    let inputDue = document.createElement("input");
    inputDue.setAttribute("type", "datetime-local");
    inputDue.setAttribute("name", "due");
    inputDue.setAttribute("id", `input_due_${id}`);
    let due = properties ? properties.due : new Date();
    console.log(toLocalDateTime(due));
    inputDue.setAttribute("value", toLocalDateTime(due));
    form.appendChild(inputDue);

    let selectPriority = document.createElement("select");
    selectPriority.setAttribute("name", "priority");
    let priorities = ["low", "medium", "high"];
    priorities.forEach(priority => {
        let option = document.createElement("option");
        option.setAttribute("value", priority);
        option.textContent = priority;
        if ((properties && priority === properties.priority) || (type === "new" && priority === "medium")) {
            option.setAttribute("selected", "selected");
        }
        selectPriority.appendChild(option);
    });
    form.appendChild(selectPriority);

    let inputList = document.createElement("input");
    inputList.setAttribute("name", "list");
    inputList.setAttribute("type", "text");
    inputList.setAttribute("id", `input_list_${id}`);
    inputList.required = true;
    let dataList = document.createElement("datalist");
    dataList.setAttribute("id", `data_lists_${id}`);
    let lists = controller.getLists();
    lists.forEach(list => {
        let option = document.createElement("option");
        option.setAttribute("value", list);
        option.textContent = list;
        dataList.appendChild(option);
    });
    inputList.setAttribute("list", `data_lists_${id}`);
    if (properties) {
        inputList.setAttribute("value", properties.list);
    }
    form.appendChild(inputList);
    form.appendChild(dataList);

    if (type === "update") {
        let label = document.createElement("label");
        label.textContent = "Completed?";
        label.setAttribute("for", `isCompleted_${id}`);
        let inputCompleted = document.createElement("input");
        inputCompleted.setAttribute("type", "checkbox");
        inputCompleted.setAttribute("name", "isCompleted");
        inputCompleted.setAttribute("id", `isCompleted_${id}`);
        inputCompleted.classList.add("is_completed_checkbox");
        inputCompleted.checked = properties.isCompleted;
        inputCompleted.addEventListener("change", (e) => controller.updateCompleted(e));
        let isCompletedDiv = document.createElement("div");
        isCompletedDiv.classList.add("is_completed_div");
        isCompletedDiv.appendChild(label);
        isCompletedDiv.appendChild(inputCompleted);
        form.appendChild(isCompletedDiv);

        let updateButton = document.createElement("button");
        updateButton.classList.add("update_btn");
        updateButton.setAttribute("type", "submit");
        updateButton.textContent = "Edit";

        let removeButton = document.createElement("button");
        removeButton.classList.add("remove_btn");
        removeButton.setAttribute("type", "button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => controller.removeItem(id));

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons_div");
        buttonsDiv.appendChild(updateButton);
        buttonsDiv.appendChild(removeButton);
        form.appendChild(buttonsDiv);
        form.addEventListener("submit", (e) => controller.updateItem(e));
    } else {
        let addButton = document.createElement("button");
        addButton.classList.add("add_btn");
        addButton.setAttribute("type", "submit");
        addButton.textContent = "Add";
        form.appendChild(addButton);
        form.addEventListener("submit", (e) => controller.addItem(e));
    }

    let div = document.createElement("div");
    div.setAttribute("id", `item_${id}`);
    div.classList.add("item");
    div.classList.add(`priority_${selectPriority.value}`);
    div.appendChild(form);

    return div;
}

export default itemForm;