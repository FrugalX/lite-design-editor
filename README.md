# Lite Design Editor

Lite Design Editor is a lightweight, web-based graphics design editor built with JavaScript and fabric.js. It currently supports text, images and shapes. The editor allows import of fabric.js JSON files and offers a minimalist user interface focused on functional support over elegant aesthetics.

*Please Note: This project is experimental and should be used with caution. It is advised to consider Lite Design Editor as sample code for exploratory purposes. If you intend to develop a professional graphics design editor based on this repository, please use it as a reference and adapt it to your specific needs with thorough testing and validation.*

## Features

- **Simple Interface:** Clean and intuitive user interface for easy navigation and usage.
- **Canvas Editing:** Utilizes the fabric.js library for powerful canvas editing capabilities.
- **Basic Tools:** Includes essential tools such as selection, drawing, shapes, text, and images.
- **Export Options:** Supports exporting and downloading designs in various formats such as JSON, and PNG.

## Fonts

By default, only fonts supported by browsers are available in Lite Design Editor. However, the editor also provides limited support for Google fonts. When importing a JSON file, the editor parses it to identify custom fonts, and the required Google Fonts are dynamically loaded and added to the dropdown menu for font family selection.

## Getting Started

To get started with Lite Design Editor, follow these steps:

1. Clone the repository to your local machine using Git:

```bash
git clone https://github.com/FrugalX/lite-design-editor.git
```

2. Open the cloned repository in your preferred code editor. For example, you can open it using Visual Studio Code.

3. In Visual Studio Code, navigate to the index.html file located in the repository.

4. Use the "Go Live" feature of Visual Studio Code to launch a local development server and view the Lite Design Editor in your web browser.

That's it! You're now ready to start using Lite Design Editor.

## Usage

- **Adding Shapes:** Click on the Diamond tool from the toolbar to add it.
- **Editing Shapes:** Select a shape on the canvas to reveal editing options such as resizing, rotating, and styling.
- **Text Editing:** Click on the text tool from the toolbar to add text. Double click on the text to edit it.
- **Image Editing:** Click on the image tool from the toolbar to add image. Double click on the image to edit it.
- **Exporting Designs:** Use the export button to export your design in JSON format and download button for PNG format.

## Contributing

Feel free to enhance the repository in any way you see fit. Whether it's refining the codebase, enhancing the user interface for better aesthetics and responsiveness, introducing new features, or any other improvements, your contributions are highly appreciated. If you have any suggestions, bug fixes, or new features you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your modifications and enhancements.
4. Test your changes thoroughly.
5. Commit your changes with clear and descriptive commit messages.
6. Push your changes to your forked repository.
7. Submit a pull request detailing your changes and any relevant information.

Your contributions are greatly appreciated!

## License

This project is licensed under the MIT License.

## Acknowledgements

Lite Design Editor relies on the following open-source libraries:

- [Fabric.js](http://fabricjs.com/) - A powerful and simple HTML5 canvas library.
