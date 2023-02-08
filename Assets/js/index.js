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

var searchHistoryList = (cityName) => {
  $(".past-search:contains(" + cityName + ")").remove();
  var searchHistoryEntry = createSearchHistoryEntry(cityName);
  var searchHistoryContainer = createSearchHistoryContainer(searchHistoryEntry);
  appendSearchHistoryToContainer(searchHistoryContainer);
  updateSavedSearches(cityName);
  resetSearchInput();
};

var getSavedSearchHistory = () => localStorage.getItem("savedSearches");

var parseSavedSearchHistory = (savedSearchHistory) =>
    savedSearchHistory ? JSON.parse(savedSearchHistory) : false;

var loadSearchHistory = () => {
        var savedSearchHistory = getSavedSearchHistory();
        var parsedSavedSearchHistory = parseSavedSearchHistory(savedSearchHistory);
        if (!parsedSavedSearchHistory) {
            return false;
        }
        parseSavedSearchHistory.forEach(searchHistoryList);
};

var todayWeatherSection = async function (cityName) {
    try {
        var response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        );
        var { coord } = await response.json();
        var oneCallResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
        );
        var weatherData = await oneCallResponse.json();

        searchHistoryList(cityName);

        var currentWeatherContainer = $("#today-weather-container");
        currentWeatherContainer.addClass("today-weather-container");

        var currentTitle = $("#current-title");
        var currentDay = moment().format("M/D/YYYY");
        currentTitle.text(`${cityName} (${currentDay})`);

        var currentIcon = $("#current-weather-icon");
        currentIcon.addClass("current-weather-icon");
        var currentIconCode = weatherData.current.weather[0].icon;
        currentIcon.attr(
            "src",
            `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`
        );

        var currentTemperature = $("#current-temperature");
        currentTemperature.text(`Temperature: ${weatherData.current.temp} \u00B0F`);

        var currentHumidity = $("#current-humidity");
        currentHumidity.text(`Humidity: ${weatherData.current.humidity}%`);

    }
}