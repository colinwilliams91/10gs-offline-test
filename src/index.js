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
// `replaceTubes` and `sortTubes` can method-chain combine to be 1 function: `replaceTubesAndSort`
var replaceTubesAndSort = function (tubeUnit) { return tubeUnit.map(function (_) { return rand(); }).sort(function (a, b) { return a - b; }); };
// const sortTubes = (tubeUnit: TubeUnit): number[] => tubeUnit.sort((a: number, b: number) => a - b);
/**
 * Givens
 */
var universityClassroom = {
    unitOne: [0, 0, 0, 0],
    unitTwo: [0, 0, 0, 0],
    unitThree: [0, 0, 0, 0],
    unitFour: [0, 0, 0, 0]
};
var yearInHours = 2700;
/**
 * Simulation
 */
// initial Classroom Tube Unit setup IIFE
(function (classroom) {
    for (var unit in classroom) {
        classroom[unit] = replaceTubesAndSort(classroom[unit]);
    }
})(universityClassroom);
// const degradeTubes = (unit: TubeUnit): void => {
//   const sortedTubes: number[] = sortTubes(unit);
//   // I think we only need to count down the second sorted tube, as this will determine when unit replacement occurs
//   while (sortedTubes[1] >= 0) {
//     sortedTubes.forEach((tube: number) => --tube)
//   }
// };
var computeTubesBrokenAndCosts = function (classroom) {
    // sort classroom by second item unit[1] of each unit, these will be the determining tubes as they will force unit replacement
    var sortedClassroom = Object.values(classroom).sort(function (a, b) { return a[1] - b[1]; });
    console.log("sorted CLASSROOM:", sortedClassroom);
    // replacerTubes will be an array of each second shortest-life Tube (when these break units are replaced, incurring costs)
    var replacerTubes = sortedClassroom.map(function (unit, i) { return unit[1]; });
    console.log("TEST:", replacerTubes);
    // need to watch for when replacer tube == 0
    // subtract replacer tube life from yearInHours and all other Tubes
    // incur $7 to cost.total and tube count obj (init this)
    // replace entire unit from parent unit to replacer Tube (need to figure out a way to track this from replacerTubes array...)
    // repeat
    // replaceTubes and subtract [1] smallest from next smallest && yearInHours, repeat
    // while (yearInHours >= 0) {
    // }
};
/**
 * Above implementation has poor Time Complexity but is solved Algorithmically
 */
console.log("classroom init install:", universityClassroom);
// console.log("replaceTubes classroom unitOne:", replaceTubesAndSort(universityClassroom.unitOne));
// console.log("classroom unitOne SORTED:", sortTubes(universityClassroom.unitOne));
// const sortedClassroom: TubeUnit[] = (Object as any).values(universityClassroom).sort((a: any, b: any) => a[1] - b[1]);
// console.log("sorted classroom:", sortedClassroom);
computeTubesBrokenAndCosts(universityClassroom);
console.log("after simulation/sort?:", universityClassroom);
