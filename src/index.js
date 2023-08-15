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
var replaceTubes = function (tubeUnit) {
    for (var tube in tubeUnit) {
        tubeUnit[tube] = rand();
    }
    return tubeUnit;
};
var sortTubes = function (tubeUnit) { return Object.values(tubeUnit).sort(function (a, b) { return a - b; }); };
/**
 * Givens
 */
var universityClassroom = {
    unitOne: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 },
    unitTwo: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 },
    unitThree: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 },
    unitFour: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 }
};
var yearInHours = 2700;
/**
 * Simulation
 */
// initial Classroom Tube Unit setup
(function (classroom) {
    for (var unit in classroom) {
        classroom[unit] = replaceTubes(classroom[unit]);
    }
})(universityClassroom);
// const computeTubesBrokenAndCosts = (classroom: Classroom): void => {
//   // install first set of Tubes
//   for (const unit in classroom) {
//     classroom[unit] = replaceTubes(classroom[unit]);
//   }
//   while (yearInHours >= 0) {
//   }
// };
/**
 * Above implementation has poor Time Complexity but is solved Algorithmically
 */
// currently just simulates first classroom installation
// computeTubesBrokenAndCosts(universityClassroom);
console.log("classroom init install:", universityClassroom);
console.log("replaceTubes classroom unitOne:", replaceTubes(universityClassroom.unitOne));
console.log("classroom unitOne SORTED", sortTubes(universityClassroom.unitOne));
