const { difference, equals } = require("ramda");
const fastDeepEqual = require("fast-deep-equal");

const original = { };
const ticket = { name: undefined };

console.log("** fastDeepEqual", fastDeepEqual(ticket, original));
console.log("** ramda.equals", equals(ticket, original));
console.log("** -------- **");
console.log(
  "** diff = ",
  difference(Object.entries(ticket), Object.entries(original))
);
console.log("** -------- **");
