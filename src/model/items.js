import { Item } from './item.js';
import { Lists } from './lists.js';
import { isEqual, startOfDay } from "date-fns";

// A helper function for sorting items by due date.
function sortByDue(a, b) {
    return a.getDue().getTime() - b.getDue().getTime();
}

// Define a items object, also responsible for the date persistence.
const Items = () => {
    let _items = [];
    let _lists = new Lists();

    // Read items from local storage.
    const readFromStorage = () => {
        try {
            const items = JSON.parse(localStorage.getItem('items'));
            if (items) {
                _items = items.map(item => Item(item.title, item.description, startOfDay(new Date(item.due)),
                    item.priority, item.list, startOfDay(new Date(item.created)), item.completed));
            }
        } catch (error) {
            console.error("Error reading from localStorage", error);
        }
    }

    // Write items to local storage.
    const writeToStorage = () => {
        try {
            localStorage.setItem('items', JSON.stringify(_items.map(item => item.get())));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }

    // Get items whose due date is today and not completed.
    const getToday = () => {
        const today = startOfDay(new Date());
        return _items.filter(item => isEqual(item.getDue(), today) && !item.get().completed)
            .sort((a, b) => a.getCreated().getTime() - b.getCreated().getTime());
    }

    // Get all items which are not completed.
    const getAll = () => {
        return _items.filter(item => !item.get().completed).sort(sortByDue);
    }

    // Get all items which are completed.
    const getHistory = () => {
        return _items.filter(item => item.get().completed).sort(sortByDue);
    }

    // Get items by list.
    const getByList = (list) => {
        return _items.filter(item => item.get().list === list).sort(sortByDue);
    }

    // Add an item to the items.
    const add = (item) => {
        _items.push(item);
        _lists.addOrUpdate(item.getList());
        writeToStorage();
    }

    // Remove an item from the items.
    const remove = (id) => {
        _items = _items.filter(item => item.getId() !== id);
        writeToStorage();
    }

    // Update the completed status of an item.
    const updateCompleted = (id, completed) => {
        const item = _items.find(item => item.getId() === id);
        if (item) {
            item.setCompleted(completed);
            writeToStorage();
        }
    }

    // Update an item.
    const update = (id, properties) => {
        const item = _items.find(item => item.getId() === id);
        if (item) {
            item.set(properties);
            _lists.addOrUpdate(item.getList());
            writeToStorage();
        }
    }

    readFromStorage();
    _lists.readFromItems(_items);
    return { getToday, getAll, getHistory, getByList, add, remove, updateCompleted, update }
}