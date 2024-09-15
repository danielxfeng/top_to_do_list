import Item from "../model/item.js";
import Items from "../model/items.js";
import Lists from "../model/lists.js";
import ui from "./ui.js";

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

    // Get today's items.
    const getToday = () => {
        let items = _items.getToday();
        ui.updateItems(controller, items);
    }

    // Get all items.
    const getAll = () => {
        let items = _items.getAll();
        ui.updateItems(controller, items);
    }

    // Get history items.
    const getHistory = () => {
        let items = _items.getHistory();
        ui.updateItems(controller, items);
    }

    // Get items by list.
    const getByList = (list) => {
        let items = _items.getByList(list);
        ui.updateItems(controller, items);
    }

    // Add an item.
    const addItem = (e) => {
        e.preventDefault();
        let form = e.target;

        try {
            let id = _items.addItem(Item(form.elements["title"].value, form.elements["description"].value,
                new Date(form.elements["due"].value), form.elements["priority"].value, form.elements["list"].value));
            _lists.addOrUpdate(form.elements["list"].value);
            ui.addIdToNewItem(id);
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
            due: new Date(form.elements["due"].value),
            priority: form.elements["priority"].value,
            list: form.elements["list"].value
        }

        try {
            _items.updateItem(id, properties);
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
            _items.removeItem(id);
            ui.removeItem(id);
            ui.displayMsg("ok", "Item Removed successfully.");
        } catch (error) {
            ui.displayMsg("err", error);
        }
    }

    return { getLists, getToday, getAll, getHistory, getByList, addItem, updateItem, updateCompleted, removeItem };
}

// The single instance of the controller.
const controller = Controller();

export default controller;