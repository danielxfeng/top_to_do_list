import { Item } from './item.js';
import { isEqual, startOfDay } from "date-fns";

// Define a items object, also responsible for the date persistentce.
const Items = () => {
    let _items = [];

    // Read items from local storage.
    const readFromStorage = () => {
        try {
            const items = JSON.parse(localStorage.getItem('items'));
            if (items) {
                _items = items.map(item => Item(item.title, item.description, item.due,
                    item.priority, item.list, item.created, item.completed));
            }
        } catch (error) {
            console.error("localStorage Error", error);
        }
    }

    // Write items to local storage.
    const writeToStorage = () => {
        localStorage.setItem('items', JSON.stringify(_items.map(item => item.get())));
    }

    // Get items whose due date is today and not completed.
    const getToday = () => {
        const today = startOfDay(new Date());
        return _items.filter(item => isEqual(item.getDue(), today) && !item.get().completed)
            .sort((a, b) => a.getCreated().getTime() - b.getCreated().getTime());
    }

    // Get all items which are not completed.
    const getAll = () => {
        return _items.filter(item => !item.get().completed)
            .sort((a, b) => a.getDue().getTime() - b.getDue().getTime());
    }

    // Get all items which are completed.
    const getHistory = () => {
        return _items.filter(item => item.get().completed)
            .sort((a, b) => a.getDue().getTime() - b.getDue().getTime())
    }

    // Add an item to the items.
    const add = (item) => {
        _items.push(item);
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
            writeToStorage();
        }
    }

    readFromStorage();
    return { getToday, getAll, getHistory, add, remove, updateCompleted, update }
}