const Lists = () => {
    let _lists = [];

    // Read lists from items.
    const readFromItems = (items) => {
        const lists = items.map(item => item.get().list);
        _lists = [...new Set(lists)];
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

    // Remove a list.
    const remove = (list) => {
        _lists = _lists.filter(l => l !== list);
    }

    return { readFromItems, get, addOrUpdate, remove };
}