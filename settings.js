const EMERGENCY_FALLBACK_URL = "https://www.arnabghosh.dev/";

const urlInput = document.getElementById("url");
const statusElement = document.getElementById("status");

function validateUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
        throw new Error("Please enter a URL.");
    }

    const url = new URL(value.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Only HTTP and HTTPS URLs are allowed.");
    }

    return url.href;
}

function showStatus(message, isError = false) {
    statusElement.textContent = message;
    statusElement.style.color = isError ? "#b91c1c" : "#15803d";
}

async function getDefaultUrl() {
    try {
        const response = await fetch(chrome.runtime.getURL("config.json"));

        if (!response.ok) {
            throw new Error("Unable to load config.json.");
        }

        const config = await response.json();

        return validateUrl(config.defaultUrl);
    } catch (error) {
        console.error("Using emergency fallback:", error);
        return EMERGENCY_FALLBACK_URL;
    }
}

async function getEffectiveUrl() {
    const { targetUrl } = await chrome.storage.local.get("targetUrl");

    if (targetUrl) {
        try {
            return validateUrl(targetUrl);
        } catch {
            await chrome.storage.local.remove("targetUrl");
        }
    }

    return getDefaultUrl();
}

async function initializeSettings() {
    const { targetUrl } = await chrome.storage.local.get("targetUrl");

    urlInput.value = targetUrl || "";
}

document.getElementById("settingsForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const value = urlInput.value.trim();

        if (!value) {
            await chrome.storage.local.remove("targetUrl");
            showStatus("Custom URL cleared. Using config.json default.");
            return;
        }

        const targetUrl = validateUrl(value);

        await chrome.storage.local.set({ targetUrl });

        urlInput.value = targetUrl;

        showStatus("Custom URL saved successfully.");
    } catch (error) {
        showStatus(error.message, true);
    }
});

document.getElementById("open").addEventListener("click", async () => {
    try {
        const url = await getEffectiveUrl();

        await chrome.tabs.create({ url });

        showStatus("Opened: " + url);
    } catch (error) {
        showStatus("Unable to open website: " + error.message, true);
    }
});

document.getElementById("reload").addEventListener("click", async () => {
    try {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });

        if (!tab || tab.id === undefined) {
            throw new Error("Current tab not found.");
        }

        await chrome.tabs.reload(tab.id);

        showStatus("Reload requested.");
    } catch (error) {
        showStatus(error.message, true);
    }
});

document.getElementById("reset").addEventListener("click", async () => {
    try {
        await chrome.storage.local.remove("targetUrl");

        urlInput.value = "";

        const defaultUrl = await getDefaultUrl();

        showStatus("Restored configured default: " + defaultUrl);
    } catch (error) {
        showStatus("Unable to restore default: " + error.message, true);
    }
});

initializeSettings().catch((error) => {
    showStatus("Unable to load settings: " + error.message, true);
});
