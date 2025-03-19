async function fetchVideos() {
    try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos");
        const videos = await response.json();
        console.log(videos); // Check API response
        displayVideos(videos.data.data); // Corrected path to array
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

function displayVideos(videos) {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    videos.forEach(video => {
        const videoId = video.items.id;
        const title = video.items.snippet.title;
        const channelName = video.items.snippet.channelTitle;
        const thumbnail = video.items.snippet.thumbnails.medium.url;
        const views = video.items.statistics.viewCount;
        const likes = video.items.statistics.likeCount;
        const comments = video.items.statistics.commentCount;

        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
            <img src="${thumbnail}" alt="Video Thumbnail">
            <div class="video-info">
                <h3 class="video-title">${title}</h3>
                <p class="channel-name">${channelName}</p>
                <div class="video-stats">
                    <span>👁️ ${views} Views</span>
                    <span>👍 ${likes} Likes</span>
                    <span>💬 ${comments} Comments</span>
                </div>
            </div>
        `;

        videoCard.addEventListener("click", () => {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
        });

        videoContainer.appendChild(videoCard);
    });
}

// Search 
document.getElementById("search-bar").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const videoCards = document.querySelectorAll(".video-card");

    videoCards.forEach(card => {
        const title = card.querySelector(".video-title").textContent.toLowerCase().trim();
        if (title.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

document.getElementById("dark-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

fetchVideos();
