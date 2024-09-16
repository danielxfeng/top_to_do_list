import { v4 as uuidv4 } from "uuid";

// Define a item object.
const Item = (
  title,
  description,
  due,
  priority,
  list = "default",
  id = uuidv4(),
  created = new Date(),
  completed = false
) => {
  let _id = id;
  let _title = title;
  let _description = description;
  let _due = due;
  let _priority = priority;
  let _list = list;
  let _created = created;
  let _completed = completed;

  // Return the id of the item.
  const getId = () => {
    return _id;
  };

  // Return the due date of the item.
  const getDue = () => {
    return _due;
  };

  // Return the completed status of the item.
  const getCompleted = () => {
    return _completed;
  };

  // Return the list of the item.
  const getList = () => {
    return _list;
  };

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
      completed: _completed,
    };
  };

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
  };

  return { getId, getDue, getCompleted, getList, get, setCompleted, set };
};

export default Item;
