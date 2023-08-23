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

const rand = (): number => Math.floor(Math.random() * (200 - 100 + 1) + 100);

export const replaceTubesAndSort = (tubeUnit: TubeUnit): TubeUnit => tubeUnit.map((_: number) => rand()).sort((a: number, b: number) => a - b);

// sorts classRoom Matrix by shortest second item (Tube "lifetime") to longest (TubeUnit[1])
const sortClassroom = (classroom: Classroom): Classroom => classroom.sort((tubeUnitOne: TubeUnit, tubeUnitTwo: TubeUnit) => tubeUnitOne[1] - tubeUnitTwo[1]);

/**
 * Givens
 */

const universityClassroom: Classroom = (Array as any).from({ length: 4 }, () => replaceTubesAndSort([0, 0, 0, 0]));

const tubesAndCost: TubesAndCost = { tubes: 0, cost: 112 }; /* <<-- this accounts for initial 16 tubes cost */

let yearInHours: number = 2700;

/**
 * Types
 */

type Classroom = TubeUnit[];

type TubeUnit = number[];

type TubesAndCost = { "tubes": number; "cost": number; };

/**
 * Simulation
 */

export const computeTubesBrokenAndCosts = (classroom: Classroom, runTimeHours: number, output: TubesAndCost): TubesAndCost => {
  // sort classroom by second item (unit[1]) of each unit, these will be the determining tubes as they will force unit (4 tubes) replacement
  const sortedClassroom: TubeUnit[] = sortClassroom(classroom);

  while (runTimeHours > 0) {
    // console.log("SORTED CLASSROOM:", sortedClassroom);
    sortedClassroom.forEach((unit: TubeUnit, i: number) => {
      // using bracket notation inside forEach to modify original array in place ("spends" 1 hour for each child Tube inside TubeUnit)
      unit.forEach((_: number, j: number, unit: TubeUnit) => {
        unit[j]--;
        if (unit[j] === 0) {
          // count single tube breaking (tubes broken += 1, no cost increase yet)
          output.tubes++;
        }
      });

      if (unit.filter((tube: number) => tube < 1).length > 1) {
        console.log("UNIT W/ 2+ BROKEN TUBES:", unit, output);
        // count second tube breaking, triggering 4 tube replacements (tubes broken += 1 && cost += 7 * 4)
        output.tubes++;
        output.cost += 7 * 4;
        sortedClassroom[i] = replaceTubesAndSort(unit);
      }

      // if (unit[0] < 1 && unit[1] < 1 || unit[2] < 1 || unit[3] < 1) {
      //   // count second tube breaking, triggering 4 tube replacements (tubes broken += 1 && cost += 7 * 4)
      //   output.tubes++;
      //   output.cost += 7 * 4;
      //   sortedClassroom[i] = replaceTubesAndSort(unit);
      // }
    });
    // all 16 tubes should degrade 1 hour per 1 runTimeHour
    runTimeHours--;
  }
  console.log("output:", output);
  return output;
};

/**
 * Above: implementation has poor Time Complexity but is solved Algorithmically
 * Below: runs simulation and prints execution time
 */

(() => {
  console.time("solution execution time");
  computeTubesBrokenAndCosts(universityClassroom, yearInHours, tubesAndCost);
  console.timeEnd("solution execution time");
})();
