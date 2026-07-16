function calculateProfit() {

    let amount = Number(document.getElementById("amount").value);

    let plan = Number(document.getElementById("plan").value);

    let profit = amount * (plan / 100);

    document.getElementById("profit").innerHTML =
        "$" + profit.toFixed(2);

}
// Back To Top Button

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if (document.documentElement.scrollTop > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

};

topBtn.onclick = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};
function calculateProfit() {

    let amount = parseFloat(document.getElementById("amount").value) || 0;

    let roi = parseFloat(document.getElementById("roi").value) || 0;

    let days = parseFloat(document.getElementById("days").value) || 0;

    let profit = (amount * roi / 100) * days;

    document.getElementById("profit").innerHTML = "$" + profit.toFixed(2);

}