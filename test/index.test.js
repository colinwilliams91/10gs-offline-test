const { computeTubesBrokenAndCosts, replaceTubesAndSort } = require("../src/index.js");

const starterCost = 112;
const yearInHours = 2700;
const tubesAndCost = { tubes: 0, cost: starterCost };
const universityClassroom = Array.from({ length: 4 }, () => replaceTubesAndSort([0, 0, 0, 0])).sort((a, b) => a[1] - b[1]);

/**
 * Formula
 */

const whenToChange = 2; /* <<-- when to change unit */
const tubesToChange = 4; /* <<-- tubes per unit */
const pricePerTube = 7; /* <<-- cost per tube ($) */


test("cost should match the expected formula", () => {
  const output = computeTubesBrokenAndCosts(universityClassroom, yearInHours, tubesAndCost);

  const numOfChanges = output.tubes / whenToChange;
  const numOfBrokenPairs = Math.floor(numOfChanges);
  const expectedCost = numOfBrokenPairs * tubesToChange * pricePerTube;
  expect(output.cost - starterCost).toBe(expectedCost);
});