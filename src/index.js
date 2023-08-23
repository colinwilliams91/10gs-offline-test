"use strict";
/**
 * - 1 Classroom
 *   - 4 Tube Units
 *     - 4 Tubes / Tube Unit (16 Tubes)
 *
 * - Classroom used:
 *  - 15 hours  / day
 *  - 5  days   / week (15 * 5 == 75 hours)
 *  - 9  months / year (1 month == 4 weeks?) (9 * 4 == 36 * 75 == 2700 hours)
 *
 *  (google thinks 9 months == 39 weeks / 2925 hours)
 *  (2700 / 150 (avg tube life in hrs) == 18 * 4 == 72 tubes * $7 == $504)
 *  (solution: if 2700 hours of use, should average 72 tubes @ $504)
 *
 * - Tubes:
 *  - Tube Life:
 *    - @function rand(): x as number
 *    - @output   x >= 100 && x <= 200
 *  - Tube Cost:
 *    - $7
 *
 * When 2 Tubes fail in a single Tube Unit replace all 4 Tubes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeTubesBrokenAndCosts = exports.replaceTubesAndSort = void 0;
/**
 * Helpers
 */
var rand = function () { return Math.floor(Math.random() * (200 - 100 + 1) + 100); };
var replaceTubesAndSort = function (tubeUnit) { return tubeUnit.map(function (_) { return rand(); }).sort(function (a, b) { return a - b; }); };
exports.replaceTubesAndSort = replaceTubesAndSort;
/**
 * Givens
 */
var universityClassroom = Array.from({ length: 4 }, function () { return (0, exports.replaceTubesAndSort)([0, 0, 0, 0]); });
var tubesAndCost = { broken: 0, cost: 112, replaced: 0 };
var yearInHours = 2700;
/**
 * Simulation
 */
var computeTubesBrokenAndCosts = function (classRoom, runTimeHours, output) {
    // base case
    if (runTimeHours < 1) {
        console.log("output:", output);
        return output;
    }
    classRoom.forEach(function (unit, i) {
        unit.forEach(function (_, j, unit) {
            unit[j]--;
            if (unit[j] === 0) {
                // count single tube breaking
                output.broken++;
            }
        });
        if (unit.filter(function (tube) { return tube < 1; }).length > 1) {
            // count second tube breaking, triggering 4 tube replacements (cost += 7 * 4 && tubes += 2 total)
            output.cost += 7 * 4;
            output.replaced += 4;
            classRoom[i] = (0, exports.replaceTubesAndSort)(unit);
        }
    });
    runTimeHours--;
    return (0, exports.computeTubesBrokenAndCosts)(classRoom, runTimeHours, output);
};
exports.computeTubesBrokenAndCosts = computeTubesBrokenAndCosts;
/**
 * I used recursion above in order to... hold onto a tracked boolean value.. which i ended up not needing...
 * Below invokes the function and prints execution time.
 */
(function () {
    console.time("solution execution time");
    (0, exports.computeTubesBrokenAndCosts)(universityClassroom, yearInHours, tubesAndCost);
    console.timeEnd("solution execution time");
})();
