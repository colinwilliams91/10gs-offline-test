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

const replaceTubesAndSort = (tubeUnit: TubeUnit): TubeUnit => tubeUnit.map((_: number) => rand()).sort((a: number, b: number) => a - b);

// sorts classRoom Matrix by shortest second item (Tube) to longest (array[1])
const sortClassroom = (classroom: Classroom): Classroom => classroom.sort((tubeUnitOne: TubeUnit, tubeUnitTwo: TubeUnit) => tubeUnitOne[1] - tubeUnitTwo[1]);

/**
 * Givens
 */

const universityClassroom: Classroom = (Array as any).from({ length: 4 }, () => replaceTubesAndSort([0, 0, 0, 0]));

const tubesAndCost: TubesAndCost = { tubes: 0, cost: 112 };

let yearInHours: number = 2700;

const brokenTubeTracker = { 0: false, 1: false, 2: false, 3: false };

/**
 * Types
 */

type Classroom = TubeUnit[];

type TubeUnit = number[];

type TubesAndCost = { "tubes": number; "cost": number; };

type BrokenTubeTracker = { 0: boolean, 1: boolean, 2: boolean, 3: boolean };

/**
 * Simulation
 */

const degradeAllTubes = (classRoom: Classroom, runTimeHours: number, output: TubesAndCost, containsBrokenTube: BrokenTubeTracker) => {
  // base case
  if (runTimeHours < 1) {
    console.log("output:", output);
    return output;
  }

  classRoom.forEach((unit: TubeUnit, i: number) => {
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
 * Below invokes the function and prints execution time.
 */

(() => {
  console.time('recursive solution');
  degradeAllTubes(universityClassroom, yearInHours, tubesAndCost, brokenTubeTracker);
  console.timeEnd('recursive solution');
})();
