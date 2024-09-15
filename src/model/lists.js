const Lists = () => {
    let _lists = ["default"];

    // Read lists from items.
    const readFromItems = (items) => {
        const lists = items.map(item => item.get().list);
        _lists = [...new Set(lists)];
        if (!_lists.includes("default")) {
            _lists.push("default");
        }
    }

    // Get all lists.
    const get = () => {
        return _lists.sort();
    }

    // Add or update a list.
    const addOrUpdate = (list) => {
        if (!_lists.includes(list)) {
            _lists.push(list);
        }
    }

    return { readFromItems, get, addOrUpdate };
}