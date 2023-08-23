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
// sorts classRoom Matrix by shortest second item (Tube "lifetime") to longest (TubeUnit[1])
var sortClassroom = function (classroom) { return classroom.sort(function (tubeUnitOne, tubeUnitTwo) { return tubeUnitOne[1] - tubeUnitTwo[1]; }); };
/**
 * Givens
 */
var universityClassroom = Array.from({ length: 4 }, function () { return (0, exports.replaceTubesAndSort)([0, 0, 0, 0]); });
var tubesAndCost = { broken: 0, cost: 112, replaced: 0 }; /* <<-- this accounts for initial 16 tubes cost */
var yearInHours = 2700;
/**
 * Simulation
 */
var computeTubesBrokenAndCosts = function (classroom, runTimeHours, output) {
    // sort classroom by second item (unit[1]) of each unit, these will be the determining tubes as they will force unit (4 tubes) replacement
    // const sortedClassroom: TubeUnit[] = sortClassroom(classroom);
    while (runTimeHours > 0) {
        classroom.forEach(function (unit, i) {
            // using bracket notation inside forEach to modify original array in place ("spends" 1 hour for each child Tube inside TubeUnit)
            unit.forEach(function (_, j, unit) {
                unit[j]--;
                if (unit[j] === 0) {
                    // count single tube breaking (tubes broken += 1, no cost increase yet)
                    output.broken++;
                }
            });
            if (unit.filter(function (tube) { return tube < 1; }).length > 1) {
                // count second tube breaking, triggering 4 tube replacements (tubes broken += 1 && cost += 7 * 4)
                output.cost += 7 * 4;
                output.replaced += 4;
                classroom[i] = (0, exports.replaceTubesAndSort)(unit);
            }
        });
        // all 16 tubes should degrade 1 hour per 1 runTimeHour
        runTimeHours--;
    }
    console.log("output:", output);
    return output;
};
exports.computeTubesBrokenAndCosts = computeTubesBrokenAndCosts;
/**
 * Above: implementation has poor Time Complexity but is solved Algorithmically
 * Below: runs simulation and prints execution time
 */
(function () {
    console.time("solution execution time");
    (0, exports.computeTubesBrokenAndCosts)(universityClassroom, yearInHours, tubesAndCost);
    console.timeEnd("solution execution time");
})();
