# 10Gs Offline Test

Please pull `master` branch for solution.

## To run:

(_you will need typescript and node installed to run these commands_)

```sh
cd src
tsc index.ts # <-- to compile ts to js
node index.js # <-- to run
```

[Simulation](https://github.com/colinwilliams91/10gs-offline-test/blob/master/src/index.ts) `computeTubesBrokenAndCost` function returns and logs output inside function scope.

## To Install
### TypeScript && Node

[Node v18](https://nodejs.dev/en/download/)

```sh
npm i typescript --save-dev
```

OR

you can run `npx tsc index.ts` without installing typescript



* The code looks very nice, descriptive variable names, good comments, no linter problems, just a couple of wild console.log()s.

* The results are wrong, but your implementation is very close of being right.

* Good you are cycling through time then units then tubes, so instead of controlling just the 2nd tube (unit[1]), go through all of them, and if one reach 0, you count that one, and if 2 are dead in the same unit you change them.

<!-- * You forgot about the cost of the initial 16 tubes the classroom has at the beginning of the year, you need to add this too. -->
