const EMERGENCY_FALLBACK_URL = "https://www.arnabghosh.dev/";

const form = document.getElementById("setupForm");
const input = document.getElementById("url");
const status = document.getElementById("status");
const defaultButton = document.getElementById("useDefault");

function validateUrl(value) {
    const url = new URL(value.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Only HTTP and HTTPS URLs are allowed.");
    }

    return url.href;
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

function showStatus(message) {
    status.textContent = message;
}

async function openAndSaveUrl(url) {
    await chrome.storage.local.set({
        targetUrl: url,
    });

    location.replace(url);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const value = input.value.trim();

        if (!value) {
            const defaultUrl = await getDefaultUrl();
            await openAndSaveUrl(defaultUrl);
            return;
        }

        const customUrl = validateUrl(value);

        await openAndSaveUrl(customUrl);
    } catch (error) {
        showStatus(error.message || "Unable to save the website.");
    }
});

defaultButton.addEventListener("click", async () => {
    try {
        const defaultUrl = await getDefaultUrl();
        await openAndSaveUrl(defaultUrl);
    } catch {
        location.replace(EMERGENCY_FALLBACK_URL);
    }
});

async function initializeNewTab() {
    const { targetUrl } = await chrome.storage.local.get("targetUrl");

    if (!targetUrl) {
        // First use: leave the setup form visible.
        return;
    }

    try {
        location.replace(validateUrl(targetUrl));
    } catch {
        await chrome.storage.local.remove("targetUrl");
        // Invalid saved URL: let the user configure it again.
    }
}

initializeNewTab().catch((error) => {
    console.error("Initialization failed:", error);
    showStatus("Unable to load settings. Please try again.");
});
