import { format } from "date-fns";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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
    inputDue.setAttribute("type", "text");
    inputDue.setAttribute("name", "due");
    inputDue.setAttribute("id", `input_due_${id}`);
    let due = properties ? properties.due : new Date();
    form.appendChild(inputDue);
    flatpickr(inputDue, {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        defaultDate: due,
        time_24hr: true
    });

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
    let list = properties ? properties.list : "default";
    inputList.setAttribute("value", list);
    form.appendChild(inputList);
    form.appendChild(dataList);

    if (type === "update") {
        let inputCompleted = document.createElement("input");
        inputCompleted.setAttribute("type", "checkbox");
        inputCompleted.setAttribute("name", "isCompleted");
        inputCompleted.checked = properties.isCompleted;
        inputCompleted.addEventListener("change", (e) => controller.updateCompleted(e));
        form.appendChild(inputCompleted);

        let updateButton = document.createElement("button");
        updateButton.classList.add("update_btn");
        updateButton.setAttribute("type", "submit");
        updateButton.textContent = "Edit";
        form.appendChild(updateButton);
        form.addEventListener("submit", (e) => controller.updateItem(e));

        let removeButton = document.createElement("button");
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
        form.appendChild(addButton);
        form.addEventListener("submit", (e) => controller.addItem(e));
    }

    let div = document.createElement("div");
    div.setAttribute("id", `item_${id}`);
    div.classList.add("item");
    div.appendChild(form);

    return div;
}

export default itemForm;