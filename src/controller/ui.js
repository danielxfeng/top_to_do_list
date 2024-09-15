import Item from "../model/item";
import ItemForm from "./item_form";

// To handle the user interface of the application
const Ui = () => {

    // Update the lists in the aside.
    const updateLists = (controller, lists) => {
        let ul= document.createElement("ul");

        lists.forEach(list => {
            let li= document.createElement("li");
            li.classList.add("lists_items");
            li.textContent = list;
            li.addEventListener("click", () => controller.getByList(list));
            ul.appendChild(li);
        });

        let handler = document.getElementById("menu_lists_ul");
        handler.innerHTML = "";
        handler.appendChild(ul);
    }

    // Update the items in the section.
    const updateItems = (controller, items) => {
        let itemsDiv = document.createElement("div");
        itemsDiv.setAttribute("id", "items");

        items.forEach(item => {
            let itemDiv = ItemForm(controller, "update", item);
            itemsDiv.appendChild(itemDiv);
        });

        let handler = document.getElementById("section");
        handler.innerHTML = "";
        handler.appendChild(itemsDiv);
    }

    // Remove an item from the section.
    const removeItem = (id) => {
        let item = document.getElementById(id);
        item.remove();
    }

    // Add an item to the section.
    const addItem = (controller) => {
        let itemsDiv = document.createElement("div");
        itemsDiv.setAttribute("id", "items");
        itemsDiv.appendChild(ItemForm(controller, "add"));
        let handler = document.getElementById("section");
        handler.innerHTML = "";
        handler.appendChild(itemsDiv);
    }

    // Display a message to the user.
    const displayMsg = (type, msg) => {
        let div = document.createElement("div");
        div.classList.add(type);
        div.textContent = msg;
        div.addEventListener("click", () => div.remove());

        let handler = document.getElementById("msg");
        handler.innerHTML = "";
        handler.appendChild(div);

        setTimeout(() => div.remove(), 3000);
    }

    // Fill the returned id to the new added item for future updating or removing.
    const addIdToNewItem = (id) => {
        let dom = document.getElementById("item_id_new");
        dom.setAttribute("id", `item_id_${id}`);
        dom.setAttribute("value", id);
        dom = document.getElementById("item_new");
        dom.setAttribute("id", `item_${id}`);
    }

    return { updateLists, updateItems, removeItem, addItem, displayMsg, addIdToNewItem };
}

const ui = Ui();

export default ui;