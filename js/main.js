$(document).ready(function() {

    const $valueSpan = $('.valueSpan');
    const $value = $('#slider11');
    $valueSpan.html($value.val());
    $value.on('input change', () => {

        $valueSpan.html($value.val());
    });
});


var age = document.querySelector("#age");
var socialContact = document.querySelector("#social-contact");
var gender = document.querySelector("#gender");
var climate = document.querySelector("#climate");
var hygiene = document.querySelector("#hygiene");
var otherIllness = document.querySelector("#other-illness");

var result = document.querySelector(".result");

function CalculateDeathChanse() {
    var ageRate;
    var socialContactRate;
    var genderRate;
    var climateRate;
    var hygieneRate;
    var otherIllnessRate;

    //age
    if (age.value == "0-19") {
        ageRate = 5;
    } else if (age.value == "20-39") {
        ageRate = 20;
    } else if (age.value == "40-59") {
        ageRate = 60;
    } else if (age.value == "60-89") {
        ageRate = 70;
    } else if (age.value == "90+") {
        ageRate = 90;
    }

    //socialContact
    if (socialContact.value == "არ მაქვს კონტაქტი") {
        socialContactRate = 0;
    } else if (socialContact.value == "ნაკლებად მაქვს კონტაქტი") {
        socialContactRate = 30;
    } else if (socialContact.value == "მაქვს კონტაქტი") {
        socialContactRate = 90;
    }

    //gender
    if (gender.value == "მდედრობითი") {
        genderRate = 10;
    } else if (gender.value == "მამრობითი") {
        genderRate = 20;
    }

    //climate
    if (climate.value == "ცხელი") {
        climateRate = 20;
    } else if (climate.value == "ცივი") {
        climateRate = 60;
    }

    //hygiene
    if (hygiene.value == "ვიცავ") {
        hygieneRate = 10;
    } else if (hygiene.value == "ნაკლებად ვიცავ") {
        hygieneRate = 50;
    } else if (hygiene.value == "არ ვიცავ") {
        hygieneRate = 90;
    }

    //otherIllness
    if (otherIllness.value == "არ მაქვს") {
        otherIllnessRate = 5;
    } else if (otherIllness.value == "სუსტად") {
        otherIllnessRate = 30;
    } else if (otherIllness.value == "ძლიერად") {
        otherIllnessRate = 90;
    }

    var average = (ageRate + socialContactRate + genderRate + climateRate + hygieneRate + otherIllnessRate) / 6;

    average = Math.round(average);
    result.textContent = average + "%";
}

CalculateDeathChanse();