import { format } from "date-fns";

const itemForm = (controller, type, item = null) => {
    let form = document.createElement("form");
    let properties = item === null ? null : item.get();
    let id = type === "update" ? properties.id : "new";

    form.classList.add("item");

    let inputId = document.createElement("input");
    inputId.setAttribute("type", "hidden");
    inputId.setAttribute("name", "id");
    inputId.setAttribute("id", `item_id_${id}`);
    inputId.setAttribute("value", properties.id || "new");
    form.appendChild(inputId);

    let inputTitle = document.createElement("input");
    inputTitle.classList.add("item_title");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("name", "title");
    inputTitle.setAttribute("required", "required");
    if (type === "update") {
        inputTitle.setAttribute("value", properties.title);
    } else {
        inputTitle.setAttribute("placeholder", "Please enter the title");
    }
    form.appendChild(inputTitle);

    let inputDescription = document.createElement("textarea");
    inputDescription.classList.add("item_description");
    inputDescription.setAttribute("name", "description");
    if (type === "update") {
        inputDescription.setAttribute("value", properties.description);
    } else {
        inputDescription.setAttribute("placeholder", "Please enter the title");
    }
    form.appendChild(inputDescription);

    let inputDue = document.createElement("input");
    inputDue.setAttribute("type", "text"); 
    inputDue.setAttribute("name", "due");
    inputDue.setAttribute("id", `datetime_picker_${id}`);

    flatpickr(`#datetime_picker_${id}`, {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        defaultDate: properties.due || new Date(),
        time_24hr: true,
        onChange: (selectedDates, dateStr, instance) => {
            return;
        }
    });
    form.appendChild(inputDue);

    let selectPriority = document.createElement("select");
    let priorities = ["low", "medium", "high"];
    priorities.forEach(priority => {
        let option = document.createElement("option");
        option.setAttribute("value", priority);
        option.textContent = priority;
        if (priority === properties.priority || (type === "new" && priority === "medium")) {
            option.setAttribute("selected", "selected");
        }
        selectPriority.appendChild(option);
    });
    form.appendChild(selectPriority);

    let selectList = document.createElement("select");
    let lists = controller.getLists();
    lists.forEach(list => {
        let option = document.createElement("option");
        option.setAttribute("value", list);
        option.textContent = list;
        if (list === properties.list) {
            option.setAttribute("selected", "selected");
        }
        selectList.appendChild(option);
    });
    form.appendChild(selectList);

    if (type === "update") {
        let created = document.createElement("p");
        created.textContent = `Created: ${format(properties.created, "dd-MM-yyyy HH:mm")}`;
        form.appendChild(created);

        let inputCompleted = document.createElement("input");
        inputCompleted.setAttribute("type", "checkbox");
        inputCompleted.setAttribute("name", "isCompleted");
        inputCompleted.setAttribute("checked", priorities.isCompleted);
        inputCompleted.addEventListener("change", () => controller.updateCompleted(id, inputCompleted.checked));
        form.appendChild(inputCompleted);

        updateButton = document.createElement("button");
        updateButton.classList.add("update_btn");
        updateButton.setAttribute("type", "submit");
        updateButton.textContent = "Edit";
        updateButton.addEventListener("click", (e) => controller.updateItem(e));
        form.appendChild(updateButton);

        removeButton = document.createElement("button");
        removeButton.classList.add("remove_btn");
        removeButton.setAttribute("type", "button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => controller.removeItem(id));
        form.appendChild(removeButton);
    } else {
        let addButton = document.createElement("button");
        addButton.classList.add("add_btn");
        addButton.setAttribute("type", "submit");
        addButton.textContent = "Add";
        addButton.addEventListener("click", (e) => controller.addItem(e));
        form.appendChild(addButton);
    }

    let div = document.createElement("div");
    div.setAttribute("id", id);
    div.appendChild(form);

    return div;
}

export default itemForm;