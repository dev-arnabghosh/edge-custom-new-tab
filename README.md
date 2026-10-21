# Custom New Tab for Microsoft Edge

A lightweight Microsoft Edge extension that lets you choose which website opens whenever you create a new browser tab.

Developed by [Arnab Ghosh](https://arnabghosh.dev/).

## Features

- Configure a custom website to open in every new tab.
- Set up your preferred website when you first use the extension.
- Use the default website configured by the extension.
- Change your website preference through the extension popup.
- Restore the default website whenever needed.
- Includes custom extension icons.
- Simple, lightweight, and easy to configure.

## Installation

Since this extension is not necessarily available on the Microsoft Edge Add-ons Store, you can install it manually using the following steps.

### Step 1: Download the Extension

1. Open this GitHub repository.
2. Click the **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded ZIP file to a folder on your computer.

Alternatively, clone the repository using Git:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/edge-custom-new-tab.git
```

Replace `YOUR_GITHUB_USERNAME` with the GitHub username that owns this repository.

### Step 2: Enable Developer Mode

1. Open Microsoft Edge.
2. Navigate to `edge://extensions/`.
3. Turn on **Developer mode**.

### Step 3: Load the Extension

1. Click **Load unpacked**.
2. Select the extracted `edge-custom-new-tab` project folder.
3. Confirm that the extension appears on the Extensions page.

**Important:** Select the folder containing `manifest.json`, not the parent folder or the ZIP file.

### Step 4: Configure Your Website

1. Open a new tab in Microsoft Edge.
2. If prompted, enter the website URL you want to use.
3. Click **Save and Continue**.
4. Alternatively, select **Use Default Website** to use the configured default.

Your selected website should open when you create a new tab.

## How to Change Your Website

1. Click the Extensions icon in the Microsoft Edge toolbar.
2. Open the Custom New Tab extension.
3. Enter the website URL you want to use.
4. Save your changes.

Use the settings popup to restore the default website if that option is available in your installed version.

## Project Structure

```text
edge-custom-new-tab/
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── config.json
├── manifest.json
├── newtab.html
├── newtab.js
├── settings.html
├── settings.js
└── README.md
```

## Troubleshooting

### The extension is not opening my selected website

- Verify that the URL includes the correct protocol, such as `https://`.
- Open `edge://extensions/` and check whether the extension is enabled.
- Reload the extension after making changes to its source files.
- Open a new tab and test again.

### The extension is not appearing in the toolbar

1. Open the Extensions menu in Microsoft Edge.
2. Locate Custom New Tab.
3. Pin it to the toolbar if you want quick access to its settings.

### The extension does not update after downloading a new version

1. Replace the old project files with the updated files.
2. Open `edge://extensions/`.
3. Click **Reload** on the extension.

## Contributing

Suggestions, bug reports, and improvements are welcome.

If you find a bug or have an idea for improvement, please open an issue in this repository.

## Author

**Arnab Ghosh**

- Portfolio: [https://arnabghosh.dev/](https://arnabghosh.dev/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Arnab Ghosh.

You are free to use, modify, and distribute this software in accordance with the MIT License.
