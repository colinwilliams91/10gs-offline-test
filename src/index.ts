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

const tubesAndCost: TubesAndCost = { tubes: 0, cost: 0 };

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

const computeTubesBrokenAndCosts = (classroom: Classroom, runTimeHours: number, output: TubesAndCost): TubesAndCost => {
  // sort classroom by second item unit[1] of each unit, these will be the determining tubes as they will force unit replacement
  let sortedClassroom: TubeUnit[] = sortClassroom(classroom);
  console.log("sorted CLASSROOM:", sortedClassroom);
  // to keep this function modular, it will calculate how many tubes are currently installed in the classroom for TubesAndCost output:
  sortedClassroom.forEach((unit: TubeUnit) => {
    unit.forEach((tube: number) => {
      output.tubes++;
      output.cost += 7;
    });
  });
  console.log("init cost:", output);

  while (runTimeHours >= 0) {
    let containsBrokenTube: boolean = false;
    sortedClassroom.forEach((unit: TubeUnit, i: number, classroom: Classroom) => {
      // containsBrokenTube = unit.includes(0);
      unit[0]--;
      unit[1]--;
      unit[2]--;
      unit[3]--;
      if (unit[0] < 1 && !containsBrokenTube) {
        containsBrokenTube = true;
        output.tubes += 1;
        output.cost += 7;
      }
      if (unit[1] > 0) {
        // console.log(classroom);
        // unit[1]--;
        runTimeHours--;
        // TODO: above runTimeHours should only change ONCE per 16 tubes tick...
      } else {
        // when the second shortest Tube hits 0 from its generated "hour life expectancy" we "replace" the Tube Unit (array inside "classroom matrix")
        sortedClassroom[i] = replaceTubesAndSort(unit);
        output.tubes += 1 * 3;
        output.cost += 7 * 3;
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



function degradeAllTubes(classRoom: Classroom, runTimeHours: number, output: TubesAndCost, containsBrokenTube: BrokenTubeTracker) {

  if (runTimeHours < 1) {
    return output;
  }

  classRoom.forEach((unit: TubeUnit, i: number) => {
    unit[0]--;
    unit[1]--;
    unit[2]--;
    unit[3]--;
    if (unit[0] === 0 && !containsBrokenTube[i]) {
      containsBrokenTube[i] = true;
      output.tubes++;
    }
    // need to track for 2 broken tubes...
  });
  runTimeHours--;
};
