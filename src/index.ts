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

/**
 * Givens
 */

const universityClassroom: Classroom = (Array as any).from({ length: 4 }, () => replaceTubesAndSort([0, 0, 0, 0]));

const tubesAndCost: TubesAndCost = { broken: 0, cost: 112, replaced: 0 };

let yearInHours: number = 2700;

/**
 * Types
 */

type Classroom = TubeUnit[];

type TubeUnit = number[];

type TubesAndCost = { "broken": number; "cost": number; "replaced": number };

/**
 * Simulation
 */

export const computeTubesBrokenAndCosts  = (classRoom: Classroom, runTimeHours: number, output: TubesAndCost) => {
  // base case
  if (runTimeHours < 1) {
    console.log("output:", output);
    return output;
  }

  classRoom.forEach((unit: TubeUnit, i: number) => {
    unit.forEach((_: number, j: number, unit: TubeUnit) => {
      unit[j]--;
      if (unit[j] === 0) {
        // count single tube breaking
        output.broken++;
      }
    })
    if (unit.filter((tube: number) => tube < 1).length > 1) {
      // count second tube breaking, triggering 4 tube replacements (cost += 7 * 4 && tubes += 2 total)
      output.cost += 7 * 4;
      output.replaced += 4;
      classRoom[i] = replaceTubesAndSort(unit);
    }
  });
  runTimeHours--;
  return computeTubesBrokenAndCosts (classRoom, runTimeHours, output);
};

/**
 * I used recursion above in order to... hold onto a tracked boolean value.. which i ended up not needing...
 * Below invokes the function and prints execution time.
 */

(() => {
  console.time("solution execution time");
  computeTubesBrokenAndCosts (universityClassroom, yearInHours, tubesAndCost);
  console.timeEnd("solution execution time");
})();
