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

const replaceTubes = (tubeUnit: TubeUnit): TubeUnit => {
  for (const tube in tubeUnit) {
    tubeUnit[tube] = rand();
  }
  return tubeUnit;
};

const sortTubes = (tubeUnit: TubeUnit): number[] => (Object as any).values(tubeUnit).sort((a: number, b: number) => a - b);

/**
 * Givens
 */

const universityClassroom: Classroom = {
  unitOne: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 },
  unitTwo: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 },
  unitThree: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 },
  unitFour: { tubeOne: 0, tubeTwo: 0, tubeThree: 0, tubeFour: 0 }
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

// convert to array and sort early in process?
type TubeUnit = {
  tubeOne: number;
  tubeTwo: number;
  tubeThree: number;
  tubeFour: number;
};

type Cost = {
  "total": number;
};

/**
 * Simulation
 */

// initial Classroom Tube Unit setup
((classroom: Classroom) => {
  for (const unit in classroom) {
    classroom[unit] = replaceTubes(classroom[unit]);
  }
})(universityClassroom);

const degradeTubes = (unit: TubeUnit): void => {
  const sortedTubes: number[] = sortTubes(unit);
  // I think we only need to count down the second sorted tube, as this will determine when unit replacement occurs
  while (sortedTubes[1] >= 0) {
    sortedTubes.forEach((tube: number) => --tube)
  }
};

const computeTubesBrokenAndCosts = (classroom: Classroom): void => {
  // sort classroom
  const sortedClassroom: TubeUnit[] = []
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

console.log("replaceTubes classroom unitOne:", replaceTubes(universityClassroom.unitOne));

console.log("classroom unitOne SORTED:", sortTubes(universityClassroom.unitOne));