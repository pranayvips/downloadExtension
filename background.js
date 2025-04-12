// Your api key of rapid api goes here
const MY_API_KEY = ""


async function youtubeMp3(videoId) {
  const url = `https://youtube-mp3-2025.p.rapidapi.com/v1/social/youtube/audio?id=${videoId}&ext=m4a&quality=128kbps`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": MY_API_KEY,
      "x-rapidapi-host": "youtube-mp3-2025.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    result["linkDownload"];
    chrome.tabs.create({ url:result["linkDownload"] });

  } catch (error) {
    console.error(error);
  }
}

async function youtubeDownload(videoId, resolution) {
  const url = `https://youtube-search-download3.p.rapidapi.com/v1/download?v=${videoId}&type=mp4&resolution=${resolution}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": MY_API_KEY,
      "x-rapidapi-host": "youtube-search-download3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    result["url"];
    result["expiresAt"];
    chrome.tabs.create({ url:result["url"] });

  } catch (error) {
    console.error(error);
  }
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action.includes("video")) {
    // Your custom background logic here
    let value = message.action.split(";=;");
    youtubeDownload(value[1], value[2]);
    sendResponse({ success: true, result: "It worked!" });
    return true;
  } else if (message.action.includes("audio")) {
    let value = message.action.split(";=;");
    youtubeMp3(value[1]);
    sendResponse({ success: true, result: "It worked!" });
    return true;
  } else if (message.action.includes("instagram")) {
    let value = message.action.split(";=;");
    instagramDownload(value[1]);
    sendResponse({ success: true, result: "It worked!" });
    return true;
  } else {
    sendResponse({ success: true, result: "Please provide a query" });
    return true;
  }
});
