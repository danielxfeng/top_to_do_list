# Fancy ToDo List

Welcome to **Fancy ToDo List**! This is a simple to-do list application built using **Vanilla JavaScript** and other web technologies (HTML, CSS). It allows users to manage items easily and efficiently within their browser. The app stores all data locally, ensuring user privacy, but it also means the data is tied to the user's browser and device.

## Features

- **Item Management**: Add, edit, and delete items easily.
- **Data Persistence**: All items are saved locally in the browser’s Local Storage.
- **Categories**: Organize items using different lists.
- **Views**:
  - New items
  - Upcoming items
  - Past items (including overdue and completed items)
  - All items
- **No Server-Side Storage**: No data is sent to any server. The data stays in your browser.
- **Responsive UI**: Basic user interface designed for desktop use, though it may not be fully responsive on mobile devices.
- **No Notification Support**: Currently, there is no support for notifications.

## How It Works

- **Local Storage**: All data (items, lists, etc.) is stored locally in your browser's Local Storage. 
  - This means that items will persist between browser sessions but will be lost if you clear your browser's history.
  - You cannot access your items from other browsers or devices.

## Usage

1. **Open the project**:
   - Open the `https://danielxfeng.github.io/top_to_do_list/index.html` file in your browser to start using the Fancy ToDo List application.

2. **Manage items**:
   - Use the buttons on the left panel to navigate between different views: New, Upcoming, Past, and All items.
   - You can add a new item, mark items as completed, or delete items directly from the interface.

## Limitations

- **Data is stored locally**: Since no data is sent to a server, you cannot access your items from other devices or browsers.
- **Data loss risk**: If you clear your browser history or Local Storage, your items will be lost.
- **No mobile optimization**: The app does not have a responsive design, so it might not work well on mobile devices.

## Future Improvements

- **Responsive Design**: Enhance the user interface to be mobile-friendly.
- **Notifications**: Add support for notifications to remind users of upcoming or overdue items.
- **Cross-device Sync**: Implement a way for users to sync their items across devices using server-side storage or cloud syncing.

## Acknowledgements

- This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum.
- Thanks to The Odin Project community for providing the learning platform and resources to help build this project.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
