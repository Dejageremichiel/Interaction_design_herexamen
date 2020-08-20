var casesDeaths = false;
var selected_country
var data = [
    {
        monthInWords: "januari", 
        monthInNumeric: "01", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "februari", 
        monthInNumeric: "02", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "maart", 
        monthInNumeric: "03", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "april", 
        monthInNumeric: "04", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "mei", 
        monthInNumeric: "05", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "juni", 
        monthInNumeric:"06", 
        Deaths: 0, 
        Cases: 0,  
        NumbersAvailable: false
    }, 
    {
        monthInWords: "juli", 
        monthInNumeric:"07",
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "augustus", 
        monthInNumeric:"08", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "september", 
        monthInNumeric:"09", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "oktober", 
        monthInNumeric:"10", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "november", 
        monthInNumeric:"11", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }, 
    {
        monthInWords: "december", 
        monthInNumeric:"12", 
        Deaths: 0, 
        Cases: 0, 
        NumbersAvailable: false
    }];


// let getAPI_Cases = (country) => {
//     getCoronaDataFromAPI(country);
// }

let getCoronaDataFromAPI = (country) => {
	const url = `https://api.covid19api.com/country/${country}`;
	fetch(url)
		.then(req => {
			if (!req.ok) {
				console.error('Error with fetch');
			} else {
				return req.json();
			}
		})
		.then(json => {
            splitDataInMonths(json);
            prepareAndLoadGraph();
		});
};

let splitDataInMonths = (json) => {
    for (dayInCoronaData of json) {
        let dayOfMonth = dayInCoronaData.Date.substring(8,10);
        let month = dayInCoronaData.Date.substring(5,7);
        let currentMonth = new Date().getMonth() + 1;
        let currentDay = new Date().getDate();

        if (dayOfMonth === "31") {
            loadDataInMonthVariable(dayInCoronaData);
        } else if (dayOfMonth === "30" && (month === "04" || month === "06" || month === "09" || month === "11")) {
            loadDataInMonthVariable(dayInCoronaData);
        } else if ((dayOfMonth === "29" && month === "02")) {
            loadDataInMonthVariable(dayInCoronaData);
        } else if (month == currentMonth && dayOfMonth == currentDay - 1) {
            loadDataInMonthVariable(dayInCoronaData);
        }
    }
}

let loadDataInMonthVariable = (dayInCoronaData) => {
    let monthInDay = dayInCoronaData.Date.substring(5,7);
    data.forEach(function(monthData) {
        if (monthData.monthInNumeric == monthInDay) {
            monthData.Deaths = dayInCoronaData.Deaths;
            monthData.Cases = dayInCoronaData.Confirmed;
            monthData.NumbersAvailable = true;
        }
    });
}

let prepareAndLoadGraph = () => {
    var monthsInString = "";
    var monthsDatas = "";
    data.forEach(function(monthData) {
        if (monthData.NumbersAvailable) {
            monthsInString += monthData.monthInWords + ", ";
            casesDeaths ? monthsDatas += (monthData.Deaths + ", ") : monthsDatas += (monthData.Cases + ", ")
        }
    });
    //delete last comma
    monthsInString = monthsInString.substring(0, monthsInString.length - 2);
    monthsDatas = monthsDatas.substring(0, monthsDatas.length - 2);

    //load graph
    loadGraph(monthsInString, monthsDatas);
}

let resetData = () => {
    data = [
        {
            monthInWords: "januari", 
            monthInNumeric: "01", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "februari", 
            monthInNumeric: "02", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "maart", 
            monthInNumeric: "03", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "april", 
            monthInNumeric: "04", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "mei", 
            monthInNumeric: "05", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "juni", 
            monthInNumeric:"06", 
            Deaths: 0, 
            Cases: 0,  
            NumbersAvailable: false
        }, 
        {
            monthInWords: "juli", 
            monthInNumeric:"07",
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "augustus", 
            monthInNumeric:"08", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "september", 
            monthInNumeric:"09", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "oktober", 
            monthInNumeric:"10", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "november", 
            monthInNumeric:"11", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
        }, 
        {
            monthInWords: "december", 
            monthInNumeric:"12", 
            Deaths: 0, 
            Cases: 0, 
            NumbersAvailable: false
    }];
}

let getAPICountrys = () => {
	const url = `https://api.covid19api.com/countries`;
	fetch(url)
		.then(req => {
			if (!req.ok) {
				console.error('Error with fetch');
			} else {
				return req.json();
			}
		})
		.then(json => {
			showListCountry(json);
		});
};

const loadGraph = function (chartTime, chartValue)
{
    console.log(chartValue);
    //resetGraph
    document.getElementById("chart").remove();
    let newChart = document.createElement("canvas");
    newChart.id = "chart";
    document.getElementById("chart_parent").append(newChart);


    let casesDeathsString = 'Total cases'
    if (casesDeaths)
    {
        casesDeathsString = 'Total deaths';
    }

    let massPopChart = new Chart(newChart, {
        type: "line",
        data: {
            labels: chartTime.split(',') /* tijd */,
            datasets: [{
                data: chartValue.split(','),
                backgroundColor: '#FFE2E2',
                borderColor: '#FF0000'
            }]
        },
        options:{
            maintainAspectRatio: false,
            legend:{
                display: false
                
            },
            scales: {
                yAxes: [{
                    ticks:{
                        min:0,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: casesDeathsString
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }]
            }
        }
    })
}

const changeColor = function ()
{
    if (casesDeaths)
    {
        $(".js-cases").animate({backgroundColor: "Transparent"}, 400);
        $(".js-deaths").animate({backgroundColor: "#FF7171"}, 400);
        console.log("Total deaths")
    }
    else
    {
        $(".js-cases").animate({backgroundColor: "#FF7171"}, 400);
        $(".js-deaths").animate({backgroundColor: "Transparent"}, 400);
        console.log("Total cases")
    }
}

const changeCasesDeaths = function ()
{
    casesDeaths =! casesDeaths;
    changeColor();
    prepareAndLoadGraph();
}

let showListCountry = queryResponse => {
    var listCountryapi = []
    var i;
    for (i=0; i < queryResponse.length; i++){
        listCountryapi.push(queryResponse[i].Slug)
    }
    listCountryapi.sort()
    for (i=0; i < listCountryapi.length; i++){
        if (listCountryapi[i] == "belgium") {
            document.querySelector('.js-country').innerHTML += `<option class="u-bold" value="${listCountryapi[i]}" selected="selected">${listCountryapi[i]}</option>`;
            selected_country = listCountryapi[i];
            getCoronaDataFromAPI(listCountryapi[i]);
        } else {
            document.querySelector('.js-country').innerHTML += `<option class="u-bold" value="${listCountryapi[i]}">${listCountryapi[i]}</option>`;
        }
    }
}
const countryselected = function (country){
    resetData();
    getCoronaDataFromAPI(country)
    selected_country = country
}

const listenToUI = function ()
{
    countryselect.addEventListener('input', function(e) {countryselected(e.target.value);});
    switchCases.addEventListener('click', changeCasesDeaths);
    switchDeaths.addEventListener('click', changeCasesDeaths);
}
const init = function()
{
    console.log("DOM Loaded");
    countryselect = document.querySelector('.js-country');
    switchCases = document.querySelector(".js-cases");
    switchDeaths = document.querySelector(".js-deaths");
    listenToUI();
    getAPICountrys();
}

document.addEventListener('DOMContentLoaded', init);