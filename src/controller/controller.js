import Item from "../model/item.js";
import Items from "../model/items.js";
import Lists from "../model/lists.js";
import ui from "./ui.js";

function toUtcDateTime(str) {
    return new Date(str);
}

// Define a controller object.
const Controller = () => {
    let _items = Items();
    let _lists = Lists();

    try {
        _items.readFromStorage();
    } catch (error) {
        ui.displayMsg("err", error);
    }
    _lists.readFromItems(_items.getAll());

    // Get all lists.
    const getLists = () => {
        let lists = _lists.get();
        ui.updateLists(controller, lists);
        return lists;
    }

    // Get upcoming items.
    const getUpcoming = () => {
        let items = _items.getUpcoming();
        ui.updateItems(controller, items);
    }

    // Get past items.
    const getPast = () => {
        let items = _items.getPast();
        ui.updateItems(controller, items);
    }

    // Get all items.
    const getAll = () => {
        let items = _items.getAll();
        ui.updateItems(controller, items);
    }

    // Get items by list.
    const getByList = (list) => {
        let items = _items.getByList(list);
        ui.updateItems(controller, items);
    }

    // Add an item.
    const addItem = (e) => {
        console.log("add item");
        e.preventDefault();
        let form = e.target;
        console.log(form.elements["title"].value, form.elements["description"].value, form.elements["due"].value, form.elements["priority"].value, form.elements["list"].value);
        try {
            _items.add(Item(form.elements["title"].value, form.elements["description"].value,
                toUtcDateTime(form.elements["due"].value), form.elements["priority"].value, form.elements["list"].value));
            _lists.addOrUpdate(form.elements["list"].value);
            form.reset();
            ui.displayMsg("ok", "Item added successfully.");
        } catch (error) {
            ui.displayMsg("err", error);
        }
    }

    // Update an item.
    const updateItem = (e) => {
        e.preventDefault();
        let form = e.target;
        let id = form.elements['id'].value;;

        let properties = {
            title: form.elements["title"].value,
            description: form.elements["description"].value,
            due: toUtcDateTime(form.elements["due"].value),
            priority: form.elements["priority"].value,
            list: form.elements["list"].value
        }

        try {
            _items.update(id, properties);
            ui.displayMsg("ok", "Item updated successfully.");
        } catch (error) {
            ui.displayMsg("err", error);
        }
    }

    // Update the completed status of an item.
    const updateCompleted = (e) => {
        e.preventDefault();
        let id = e.target.form.elements['id'].value;
        try {
            _items.updateCompleted(id, e.target.checked);
            ui.displayMsg("ok", "Item updated successfully.");
        } catch (error) {
            ui.displayMsg("err", error);
        }
    }

    // Remove an item.
    const removeItem = (id) => {
        try {
            _items.remove(id);
            ui.removeItem(id);
            ui.displayMsg("ok", "Item Removed successfully.");
        } catch (error) {
            ui.displayMsg("err", error);
        }
    }

    return { getLists, getUpcoming, getPast, getAll, getByList, addItem, updateItem, updateCompleted, removeItem };
}

// The single instance of the controller.
const controller = Controller();

export default controller;