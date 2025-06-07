import { l as n } from "./utils-CpYJUKXc.js";
n();
const a = document.getElementById("newsletter-form");
a.addEventListener("submit", function (l) {
  l.preventDefault();
  const e = a.querySelector("input[type='email']"),
    t = e.value;
  t
    ? (alert(`Thank you for signing up, ${t}!`), (e.value = ""))
    : alert("Please enter a valid email address.");
});
