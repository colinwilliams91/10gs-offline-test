const { computeTubesBrokenAndCosts, replaceTubesAndSort } = require("../src/index.js");

const starterCost = 112;
const yearInHours = 2700;
const tubesAndCost = { broken: 0, cost: starterCost, replaced: 0 };

/**
 * Formula
*/

const pricePerTube = 7; /* <<-- cost per tube ($) */

describe("computeTubesBrokenAndCosts", () => {
  test("cost should match the expected formula", () => {
    const universityClassroom = Array.from({ length: 4 }, () => replaceTubesAndSort([0, 0, 0, 0])).sort((a, b) => a[1] - b[1]);
    const output = computeTubesBrokenAndCosts(universityClassroom, yearInHours, tubesAndCost);

    expect(output.cost - starterCost).toBe(output.replaced * pricePerTube);
  });

  test("tubes broken should handle edge case where > 2 tubes are broken in a single unit", () => {
    const threeTubesBroken = [[ 111, 136, 175, 187 ], [ -57, 0, 0, 53 ], [ 133, 157, 166, 199 ], [ 123, 145, 179, 198 ]];
    const output = computeTubesBrokenAndCosts(threeTubesBroken, yearInHours, tubesAndCost);

    expect(output.cost - starterCost).toBe(output.replaced * pricePerTube);
  });

});