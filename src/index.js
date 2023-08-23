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
var tubesAndCost = { tubes: 0, cost: 112 };
var yearInHours = 2700;
var brokenTubeTracker = { 0: false, 1: false, 2: false, 3: false };
/**
 * Simulation
 */
var degradeAllTubes = function (classRoom, runTimeHours, output, containsBrokenTube) {
    // base case
    if (runTimeHours < 1) {
        console.log("output:", output);
        return output;
    }
    classRoom.forEach(function (unit, i) {
        unit[0]--;
        unit[1]--;
        unit[2]--;
        unit[3]--;
        if (unit[0] === 0 && unit[1] >= 0) {
            // count single tube breaking
            output.tubes++;
        }
        if (unit[0] < 1 && unit[1] === 0) {
            classRoom[i] = replaceTubesAndSort(unit);
            // count second tube breaking, triggering 4 tube replacements (cost += 7 * 4 && tubes += 2 total)
            output.tubes++;
            output.cost += 7 * 4;
            // containsBrokenTube[i] = false;
        }
    });
    runTimeHours--;
    degradeAllTubes(classRoom, runTimeHours, output, containsBrokenTube);
};
/**
 * I used recursion above in order to... hold onto a tracked boolean value.. which i ended up not needing...
 */
// degradeAllTubes(universityClassroom, yearInHours, tubesAndCost, brokenTubeTracker);
(function () {
    console.time('recursive solution');
    degradeAllTubes(universityClassroom, yearInHours, tubesAndCost, brokenTubeTracker);
    console.timeEnd('recursive solution');
})();
