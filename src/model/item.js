import { startOfDay } from 'date-fns';

// Define a item object.
const Item = (title, description, due, priority, list = "default") => {
    let _id = Math.random().toString(36);
    let _title = title;
    let _description = description;
    let _due = due;
    let _priority = priority;
    let _list = list;
    let _created = startOfDay(new Date());
    let _completed = false;

    // Return the id of the item.
    const getId = () => {
        return _id;
    }

    // Return the due date of the item.
    const getDue = () => {
        return _due;
    }

    // Return the completed status of the item.
    const getCompleted = () => {
        return _completed;
    }

    // Return the created date of the item.
    const getCreated = () => {
        return _created;
    }

    // Return a item.
    const get = () => {
        return {
            id: _id,
            title: _title,
            description: _description,
            due: _due,
            priority: _priority,
            list: _list,
            created: _created,
            completed: _completed
        }
    }

    // Set the completed status of an item.
    const setCompleted = (completed) => {
        _completed = completed;
    };

    // Set the properties of the item.
    const set = (properties) => {
        _title = properties.title;
        _description = properties.description;
        _due = properties.due;
        _priority = properties.priority;
        _list = properties.list || "default";
    }

    return { getId, getDue, getCompleted, getCreated, get, setCompleted, set }
}

export default Item;