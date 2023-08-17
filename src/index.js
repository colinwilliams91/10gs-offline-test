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
/**
 * Helpers
 */
var rand = function () { return Math.floor(Math.random() * (200 - 100 + 1) + 100); };
var replaceTubesAndSort = function (tubeUnit) { return tubeUnit.map(function (_) { return rand(); }).sort(function (a, b) { return a - b; }); };
// sorts classRoom Matrix by shortest second item (Tube) to longest (array[1])
var sortClassroom = function (classroom) { return classroom.sort(function (tubeUnitOne, tubeUnitTwo) { return tubeUnitOne[1] - tubeUnitTwo[1]; }); };
/**
 * Givens
 */
var universityClassroom = Array.from({ length: 4 }, function () { return replaceTubesAndSort([0, 0, 0, 0]); });
var tubesAndCost = { tubes: 0, cost: 0 };
var yearInHours = 2700;
/**
 * Simulation
 */
var computeTubesBrokenAndCosts = function (classroom, runTimeHours, output) {
    // sort classroom by second item unit[1] of each unit, these will be the determining tubes as they will force unit replacement
    var sortedClassroom = sortClassroom(classroom);
    console.log("sorted CLASSROOM:", sortedClassroom);
    while (runTimeHours >= 0) {
        sortedClassroom.forEach(function (unit, i, classroom) {
            if (unit[1] > 0) {
                console.log(classroom);
                unit[1]--;
                runTimeHours--;
            }
            else {
                // when the second shortest Tube hits 0 from its generated "hour life expectancy" we "replace" the Tube Unit (array inside "classroom matrix")
                sortedClassroom[i] = replaceTubesAndSort(unit);
                runTimeHours--;
                output.tubes += 1 * 4;
                output.cost += 7 * 4;
            }
        });
    }
    console.log(output);
    return output;
};
/**
 * Above implementation has poor Time Complexity but is solved Algorithmically
 */
computeTubesBrokenAndCosts(universityClassroom, yearInHours, tubesAndCost);
