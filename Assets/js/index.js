var apiKey = "6eb133af829bd7bf5fe1a2fc127e701c";
var savedSearches = [];

var createSearchHistroyEntry = (cityName) => {
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);
    return searchHistoryEntry;
};

var createSearchHistoryContainer = (searchHistoryEntry) => {
    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");
    searchEntryContainer.append(searchHistoryEntry);
    return searchEntryContainer;
};
var appendSearchHistoryToContainer = (searchHistoryContainer) => {
    var searchHistoryContainerEl = $("#previous-history-container");
    searchHistoryContainerEl.append(searchHistoryContainer);
};

var updateSavedSearches = (cityName) => {
    var previousSavedSearches = localStorage.getItem("savedSearches");
    savedSearches = previousSavedSearches
        ? JSON.parse(previousSavedSearches)
        : [];
    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
};

var resetSearchInput = () => {
    $("#search-input").val("");
};

