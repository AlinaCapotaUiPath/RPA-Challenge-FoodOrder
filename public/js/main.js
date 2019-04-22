var mymap = L.map('mapid').setView([38.025758, -96.144704], 3.5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGFuaWVsYmFsYW4xOTg5IiwiYSI6ImNqazZrYmQxZjFhZ3ozdnFnYmtuNnB2MTkifQ.vRS1P1-6nA9VXmmTzFaqvw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 5,
    minZoom: 1,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// Setting bounds for the map - Only see region

var southWest = L.latLng(20, -60.144704),
    northEast = L.latLng(55.025758, -130.144704),
    bounds = L.latLngBounds(southWest, northEast);

// Disabling map controls

mymap.scrollWheelZoom.disable();
mymap.removeControl(mymap.zoomControl);
mymap.doubleClickZoom.disable();
mymap.keyboard.disable();
mymap.setMaxBounds(bounds);

var data = [];
var demand_flag = false,
    supply_flag = false;

var selection = [];
var supplySelection, demandSelection;
var divElem = document.getElementsByClassName("main-container")[0];

// Initial values

var pref1 = ["Premit Required", "Urgent"],
    pref2 = ["Enclosed", "Flatbed", "SteepDeck"];

// Setting locations for the Points

var res = [{
        "_id": "G-1001",
        "name": "Swagelok",
        "address1": "32100 Diamond Pkwy",
        "address2": "Ste 1488",
        "city": "Solon",
        "state": "OH",
        "zip": 44139,
        "color": "green",
        "type": "supply",
        "lat": "41.3563197",
        "lng": "-81.4535158"
    },
    {
        "_id": "G-1004",
        "name": "TwitchTV",
        "address1": "225 Bush St",
        "address2": "Floor 18",
        "city": "San Francisco",
        "state": "CA",
        "zip": 94104,
        "color": "green",
        "type": "supply",
        "lat": "37.7908821",
        "lng": "-122.4015519"

    },
    {
        "_id": "G-1006",
        "name": "GE Gas Turbine",
        "address1": "4045 Scenic Hwy",
        "address2": "Warehouse",
        "city": "Baton Rouge",
        "state": "LA",
        "zip": 70805,
        "color": "green",
        "type": "supply",
        "lat": "30.4860721",
        "lng": "-91.1697231"
    }
]

var markers = [];
markers["count"] = 0;


// Function used for getting HTTP response text

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}

// Preventing user to use tab
$(document).keydown(function(e) {
    var keycode1 = (e.keyCode ? e.keyCode : e.which);
    if (keycode1 == 0 || keycode1 == 9) {
        e.preventDefault();
        e.stopPropagation();
    }
});

// Open / Close sidebar based on window size

$(window).resize(function() {

    if ($(this).width() < 1024) {
        closeNav();
    } else {
        openNav();
    }

});

$(document).ready(function() {

    // Get random places

    var getPlaces = JSON.parse(httpGet('http://uipath509.westeurope.cloudapp.azure.com:4444/api/v1/places'));

    // Add markers for all places

    addMarkers(res);
    addMarkers(getPlaces);
});

function addMarkers(arr) {
    for (var i = 0; i < arr.length; i++) {

        data.push(arr[i]);

        var temp = arr[i];

        var markerColor = L.AwesomeMarkers.icon({
            markerColor: temp.color,
            icon: ''
        });

        var popup = '<p><b>' +
                    temp.type.toUpperCase() +
                    '</b></p><p>' +
                    temp.name +
                    '</p><p>' +
                    temp.address2 +
                    '</p><button id=' +
                    temp["_id"] +
                    ' class="btn btn-info select-button" onclick="addEle(this)">Select</button>'

        markers[temp["_id"]] = L.marker([temp.lat, temp.lng], {
                icon: markerColor
            }).addTo(mymap)
            .bindPopup(popup)
            .on('popupopen', function(e) {
                if (supply_flag && demand_flag) $('#' + temp["_id"]).addClass("display-none")
            });

        markers["count"] += 1;
    }
}


function resetMap() {
    if (markers["count"] != data.length) {
        for (var i = 0; i < data.length; i++) {
            removePin(data[i]["_id"]);
        }

        markers = [];
        supplySelection = "";
        demandSelection = "";
        data = [];

        var Places = JSON.parse(httpGet('http://uipath509.westeurope.cloudapp.azure.com:4444/api/v1/places'));

        addMarkers(res);
        addMarkers(Places);
        create();
    }
}

/* Set the width of the side navigation to 300px and the left margin of the page content to 300px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementsByClassName("main-container")[0].style.marginLeft = "300px";
}

/* Set the width of the side navigation to 0px and the left margin of the page content to 0px */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementsByClassName("main-container")[0].style.marginLeft = "0";
}

function removePin(id) {
    mymap.removeLayer(markers[id]);
    markers["count"] -= 1;
}

function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function ImageTemplate(arr, name, val)
{
    var template = "<tr>" +
                   "<td>" +
                   "<img class='imgLabel' src='" + createCaptcha(400, 0.5, 150, name, (Math.random() * 15)) + "'/>"+
                   "</td>" +

                   "<td>" +
                   val +
                   "</td>" +

                   "</tr>";

    arr.push(template);
    return arr;
}

function addEle(ele) {

    for (var i = 0; i < data.length; i++) {

        if (data[i]["_id"] == ele["id"]) {

            tableID = data[i].type + "_tbody";
            var options = [];
            if (data[i].type == "demand") {
                data[i]["cargoPref"] = pref2[Math.floor((Math.random() * 3) + 0)];
                data[i]["shipPref"] = pref1[Math.floor((Math.random() * 2))];
                data[i]["shipDate"] = randomDate(new Date(), new Date(new Date().getFullYear(), 11, 31));

                var demandMapping = {
                    "Ship preference": data[i].cargoPref,
                    "Cargo": data[i].cargo,
                    "Cargo preference": data[i].shipPref,
                    "Shipping date": data[i].shipDate
                };

                Object.keys(demandMapping).forEach(function(key) {
                        ImageTemplate(options, key, demandMapping[key]);
                })

            }

            var genericMapping = {
                "Address 1": data[i].address1,
                "Address 2": data[i].address2,
                "City": data[i].city,
                "State": data[i].state,
                "Zip Code": data[i].zip
            };

            Object.keys(genericMapping).forEach(function(key) {
                    ImageTemplate(options, key, genericMapping[key]);
            })

            options = shuffle(options);

            var dom = '<tbody id="' + tableID + '">';
            dom += '<tr>' + '<td>Name:</td>' + '<td>' + data[i].name + '<span id="' + data[i]["_id"] + '_remove" class="close" onclick="removeEle(this, \'' + data[i].type + '\')"></span></td>' + '</tr>';
            for (var j = 0; j <= options.length; j++) {

                dom += options[j];
            }
            dom += '</tbody>';

            if (data[i].type == "demand") {
                if (!demand_flag) {
                    $("#demand_table").append(dom);
                } else {
                    removeEle(ele, "demand");
                    $("#demand_table").append(dom);
                }
                demand_flag = true;
                demandSelection = data[i]["_id"];

            } else if (data[i].type == "supply") {
                if (!supply_flag) {
                    $("#supply_table").append(dom);
                } else {
                    removeEle(ele, "supply");
                    $("#supply_table").append(dom);
                }
                supply_flag = true;
                supplySelection = data[i]["_id"];
            }

            if (supply_flag && demand_flag) {
                $('#' + ele["id"]).addClass("display-none");
            }
        }
    }
    mymap.closePopup();
}

function createCaptcha(num, radius, max, name, rand) {

    var canv = document.createElement("CANVAS");

    canv.id = "captchas";
    canv.width = 150;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    for (var i = 0; i <= num; i++) {
        ctx.beginPath();
        var rand_x = Math.random(i) * max;
        var rand_y = Math.random(i) * max;
        ctx.arc(rand_x, rand_y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    ctx.font = "18px Georgia";
    ctx.fillText(name, rand, 35);
    return canv.toDataURL();

}

function refreshGame() {
    location.reload();
}

function removeEle(ele, type) {
    var id = ele["id"].replace(/_remove/g, '');
    if (type == "supply") {
        $('#supply_tbody').remove();
        supply_flag = false;
        supplySelection = "";
    } else {
        $('#demand_tbody').remove();
        demand_flag = false;
        demandSelection = "";
    }
}

function create() {
    $("#supply_tbody").remove();
    $("#demand_tbody").remove();
    $("#contract_text").val('');
    supply_flag = false;
    demand_flag = false;
}

var getObjectByValue = function(array, key, value) {
    return array.filter(function(object) {
        return object[key] === value;
    });
};

$(function() {
    var $startButton = $('.btn-launchgame');
    var $submitButton = $('.submit-form');
    var $form = $('#gamecontainer');
    var $create = $('.btn-create');

    var StartMilliseconds = 0;

    var logging = false;

    var contractNr = "";
    var inputElements;
    var currentStepIndex = 0;
    var score = 0;
    var isChallengeStarted = false;
    var totalSteps = 5;
    var validationScore = 0;
    var allRounds_validationScore = 0;
    var answerLegend = [];
    var answer;

    var all = divElem.querySelectorAll("input, select,textarea");
    for (var i = 0; i < all.length; i++) {
        all[i].setAttribute("id", makeid().toUpperCase());
        if (all[i].getAttribute("name") != "optionsRadios") {
            all[i].setAttribute("name", makeid().toUpperCase());
        }
    }

    var mapping = {
        0: "cargo",
        1: "shipDate",
        2: "shipPref",
        3: "cargoPref",
        4: "name",
        5: "address1",
        6: "address2",
        7: "city",
        8: "state",
        9: "zip",
        10: "name",
        11: "address1",
        12: "address2",
        13: "city",
        14: "state",
        15: "zip",
    };

    openNav();

    // START challenge

    $startButton.on('click', function() {

        if (isChallengeStarted) {
            return;
        }

        isChallengeStarted = true;

        $('.submit-form').removeAttr('disabled');

        resetMap();
        create();
        $startButton.addClass('disabled');

        //add start time
        StartMilliseconds = new Date().getTime();

        $startButton.text('Round ' + (currentStepIndex + 1));
    });

    // Submitting form (without contract)

    $submitButton.on('click', function() {

        if (supplySelection != "" && demandSelection != "" && isChallengeStarted) {
            // Remove the selected pin
            removePin(demandSelection);

            // Calculating score
            validationScore += compareVals(demandSelection,1);
            validationScore += compareVals(supplySelection,2);


            // Create contract ID
            contractNr = makeid().toUpperCase();

            // Clear all form values
            $('input[type=text]').val('');
            $('select').val('AL');
            $('textarea').val('');

            // Randomly deselect items
            if (Math.floor((Math.random() * 2)) == 1) {
                $('input[type="checkbox"]').removeAttr('checked');
            } else {
                $('input[type="checkbox"]').attr("checked", true);
            }

            // Show Contract Number
            $("#CTRDV").show();
            $('#CTRNR').text(contractNr);

            // Disable Submit button
            $submitButton.attr("disabled", true);
            // Enable Create button
            $('.btn-create').removeAttr('disabled');

            // Get Correct Score
            answer = httpGet("http://uipath509.westeurope.cloudapp.azure.com:4444/api/v1/place/" + demandSelection + "/" + supplySelection);

            supplySelection = "";
            demandSelection = "";
        }
    });

    // Submit ROUND

    $create.on('click', function() {
        inputElements = divElem.querySelectorAll("input[type=text], select, input:checked,textarea");

        if(logging)
        {
            console.log(answer+" "+validationScore+" "+contractNr+" "+inputElements[inputElements.length-1].value);
        }

        // Used for detailing score
        var displayValidation = contractNr == inputElements[inputElements.length - 1].value ? "CORRECT" : "INCORRECT";
        var displayAnswer = answer ? "CORRECT" : "INCORRECT";
        var displayFinal = validationScore == 16 && contractNr == inputElements[inputElements.length - 1].value ? "CORRECT" : "INCORRECT";

        allRounds_validationScore += validationScore;

        answerLegend.push({ 'round':currentStepIndex + 1, 'matched':displayAnswer, 'fieldsno':validationScore,'contract':displayValidation, 'final':displayFinal});
        // End of detailing score

        if (answer && validationScore == 16 && contractNr == inputElements[inputElements.length - 1].value) {
            score++;
        }

        create();

        currentStepIndex++;

        // Resetting values
        contractNr = "";
        answer = "";
        validationScore = 0;

        $('input[type=text]').val('');
        $('.btn-create').attr("disabled", true);
        $submitButton.removeAttr('disabled');
        $("#CTRDV").hide();
        $('#CTRNR').text("");

        // End of resetting values

        if (currentStepIndex == totalSteps) {
            var percentage = (score / totalSteps * 100).toFixed(2);
            var EndMilliseconds = new Date().getTime() - StartMilliseconds;
            var successMessage = 'Your success rate is ' + percentage + '% (' + score + ' out of ' + totalSteps + ' rounds) in ' + EndMilliseconds / 1000 + ' seconds';

            $('.success-score').text(successMessage);
            // Remove everything from the page
            $form.remove();

            $('.success-container').show();

            $('.success-details').text("Detailed score: " + allRounds_validationScore + " out of " + " 80 input fields.");

            var dom = "";

            for (var i = 0; i < answerLegend.length; i++) {

              dom += '<tr>' +
                    '<td>' + answerLegend[i]["round"].toString() + '</td>' +
                    '<td>' + answerLegend[i]["matched"].toString().toUpperCase() + '</td>' +
                    '<td>' + answerLegend[i]["fieldsno"].toString() + '</td>' +
                    '<td>' + answerLegend[i]["contract"].toString().toUpperCase() + '</td>' +
                    '<td>' + answerLegend[i]["final"].toString().toUpperCase() + '</td>' +
                     + '</tr>';
            }

            $("#score_details").append(dom);

            $startButton.text('Finished');
        } else {
            $startButton.text('Round ' + (currentStepIndex + 1));
        }
    });

    function compareVals(id,type) {
        var result = 0;
        var currentSelection;

        var min_opp = 0;
        var max_opp = 0;
        if(type==1)
        {
            min_opp = 0;
            max_opp = 10;
        }
        else {
            min_opp = 10;
            max_opp = 16;
        }


        for (var k = 0; k < data.length; k++) {
            if (data[k]["_id"] == id) {
                currentSelection = data[k];
                break;
            }
        }

        inputElements = divElem.querySelectorAll("input[type=text], select, input:checked,textarea");

        if(logging)
        {
            for (var i = 0; i < inputElements.length; i++) {
                console.log(i + " " + inputElements[i].value);
            }
        }

        Object.keys(mapping).forEach(function(key) {
            if(key>=min_opp && key<max_opp)
            {
                if (currentSelection[mapping[key]] != null && inputElements[key].value != null && inputElements[key].value == currentSelection[mapping[key]]) {
                    result++;

                    if(logging)
                    {
                      console.log("result:"+result);
                      console.log("inputElements[key].value:"+inputElements[key].value);
                      console.log("currentSelection[mapping[key]]:"+currentSelection[mapping[key]]);
                    }
                }
            }
        })

        return result;
    }

    // Creating unique ID
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

});
