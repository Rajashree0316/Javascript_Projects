const API_KEY = "46f774d6f2244197b764f930bcb46fe1";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const navItems = document.querySelectorAll(".nav-item");
const toggleMenu = document.getElementById("toggle-menu");
const navLinks = document.getElementById("nav-links");
const categoryMap = {
    india: "India",
    world: "World",
    local: "Local",
    business: "business",
    technology: "technology",
    entertainment: "entertainment",
    sports: "sports",
    science: "science",
    health: "health",
};

//1)
async function fetchCategoryNews(category) {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=30&apiKey=${API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
        return [];
    }
}

//5) 
async function handleSearch() {
    const query = searchField.value.trim();
    if (query) {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query:", error);
        }
    }
}
//7)
navItems.forEach((item) => {
    item.addEventListener("click", async () => {
        const category = item.id.toLowerCase(); // Use nav-item ID
        if (["india", "world", "local"].includes(category)) {
            // For custom categories, use a search query instead of category
            const articles = await fetchNewsQuery(category);
            displayBlogs(articles);
        } else if (categoryMap[category]) {
            // For standard categories, fetch by API category
            const articles = await fetchCategoryNews(categoryMap[category]);
            displayBlogs(articles);
        } else {
            console.error(`Invalid category: ${category}`);
        }
        // Close the navbar
        navLinks.classList.remove("active");
    });
});

// 4)
searchIcon.addEventListener("click", handleSearch);
searchField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});
toggleMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

//6)
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=30&apiKey=${API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles || []; // Safeguard for empty responses
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

//3)
function displayBlogs(articles) {
    blogContainer.innerHTML = ""; // Clear previous content
    if (articles.length === 0) {
        blogContainer.innerHTML = `<p>No articles found for "${query}". Please try a different search term.</p>`;
        return;
    }
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img")
        img.src = article.urlToImage || "https://placehold.co/600x400?text=No+Image";
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30
            ? article.title.slice(0, 40) + "....."
            : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120
            ? article.description.slice(0, 160) + "....."
            : "No description available.";
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        // Open the article in a new tab on click
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard);

    });

}

//2 
(async () => {
    try {
        const articles = await fetchCategoryNews("general");
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching default news:", error);
    }
})();



/***Comments to know 
   1)Fetch News by Category
   =>fetching the apiUrl using await because this function contain lot of data and 
   sometimes server can be slow and they can make some delay and storing them in response variable
   (Note: if you are using await then you have to use async also)
   =>convert response into json format - now we are storing json in data variable and again we are using await here.
   2) Load default news on page load=>create async function - inside we are using fetch random news function and store them in articles variable.
    => for showing the data we have to return the articles 
   3) displayBlog() - generate our cards and if our website showing previously fetched data first remove them and replace them with new news
    and create elements one by one
   4) Event listener for the search icon , enter key and toggle active class - if user click search icon then only take the data from input section.
   5) Handle search when the search icon is clicked => if query is not empty then i have to fetch that --> try catch block - store them in articles variable
   6) Fetch news based on query=> we have to push our query - fetching api url and converting them into json and then simply returning the articles
   7) Handle Navigation Clicks- For custom categories, use a search query instead of category,For standard categories, fetch by API category ,Close the navbar
 ***/