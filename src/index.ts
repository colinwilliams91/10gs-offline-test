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

const rand = (): number => Math.floor(Math.random() * (200 - 100 + 1) + 100);
// `replaceTubes` and `sortTubes` can method-chain combine to be 1 function: `replaceTubesAndSort`
const replaceTubesAndSort = (tubeUnit: TubeUnit): TubeUnit => tubeUnit.map((_: number) => rand()).sort((a: number, b: number) => a - b);

// const sortTubes = (tubeUnit: TubeUnit): number[] => tubeUnit.sort((a: number, b: number) => a - b);

/**
 * Givens
 */

const universityClassroom: Classroom = {
  unitOne: [0, 0, 0, 0],
  unitTwo: [0, 0, 0, 0],
  unitThree: [0, 0, 0, 0],
  unitFour: [0, 0, 0, 0]
};

const yearInHours: number = 2700;

/**
 * Types
 */

type Classroom = {
  unitOne: TubeUnit;
  unitTwo: TubeUnit;
  unitThree: TubeUnit;
  unitFour: TubeUnit;
};

type TubeUnit = number[];

type Cost = {
  "total": number;
};

/**
 * Simulation
 */

// initial Classroom Tube Unit setup IIFE
((classroom: Classroom) => {
  for (const unit in classroom) {
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

const computeTubesBrokenAndCosts = (classroom: Classroom): void => {
  // sort classroom by second item unit[1] of each unit, these will be the determining tubes as they will force unit replacement
  const sortedClassroom: TubeUnit[] = (Object as any).values(classroom).sort((a: any, b: any) => a[1] - b[1]);
  // compare [1] second tube of each unit to find smallest
  // replaceTubes and subtract [1] smallest from next smallest && yearInHours, repeat
  for (const unit in classroom) {

  }

  while (yearInHours >= 0) {

    // need to compare all sorted "second" tubes to find smallest
  }
};

/**
 * Above implementation has poor Time Complexity but is solved Algorithmically
 */

// currently just simulates first classroom installation
// computeTubesBrokenAndCosts(universityClassroom);
console.log("classroom init install:", universityClassroom);

console.log("replaceTubes classroom unitOne:", replaceTubesAndSort(universityClassroom.unitOne));

// console.log("classroom unitOne SORTED:", sortTubes(universityClassroom.unitOne));

const sortedClassroom: TubeUnit[] = (Object as any).values(universityClassroom).sort((a: any, b: any) => a[1] - b[1]);
console.log("sorted classroom:", sortedClassroom);