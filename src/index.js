/**
 * - 1 Classroom
 *   - 4 Tube Units
 *     - 4 Tubes / Tube Unit (16 Tubes)
 *
 * - Classroom used:
 *  - 15 hours  / day
 *  - 5  days   / week (15 * 5 == 75 hours)
 *  - 9  months / year (1 month == 4 weeks?) (9 * 4 == 36 * 75 == 2700 hours)
 *  (google thinks 9 months == 39 weeks / 2925 hours)
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
var sortClassroom = function (classroom) { return classroom.sort(function (tubeUnitOne, tubeUnitTwo) { return tubeUnitOne[1] - tubeUnitTwo[1]; }); };
// const sortTubes = (tubeUnit: TubeUnit): number[] => tubeUnit.sort((a: number, b: number) => a - b);
/**
 * Givens
 */
var universityClassroom = Array.from({ length: 4 }, function () { return replaceTubesAndSort([0, 0, 0, 0]); });
var tubesAndCost = { tubes: 0, cost: 0 };
var yearInHours = 2700;
/**
 * Simulation
 */
// const degradeTubes = (unit: TubeUnit): void => {
//   const sortedTubes: number[] = sortTubes(unit);
//   // I think we only need to count down the second sorted tube, as this will determine when unit replacement occurs
//   while (sortedTubes[1] >= 0) {
//     sortedTubes.forEach((tube: number) => --tube)
//   }
// };
var computeTubesBrokenAndCosts = function (classroom, runTimeHours, output) {
    // sort classroom by second item unit[1] of each unit, these will be the determining tubes as they will force unit replacement
    var sortedClassroom = sortClassroom(classroom);
    console.log("sorted CLASSROOM:", sortedClassroom);
    while (runTimeHours >= 0) {
        sortedClassroom.forEach(function (unit, _, classroom) {
            console.log("step:", sortedClassroom);
            if (unit[1] > 0) {
                unit[1]--;
                runTimeHours--;
            }
            else {
                unit = replaceTubesAndSort(unit);
                // we need to sort the Classroom again here because a new TubeUnit could theoretically expire two Tubes before a previously existing TubeUnit
                classroom = sortClassroom(sortedClassroom);
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
