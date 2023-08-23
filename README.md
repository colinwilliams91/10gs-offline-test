# 10Gs Offline Test

Please pull `master` branch for solution.

I wrote an _alternative_ solution using recursion in branch: [recursive-solution-v2](https://github.com/colinwilliams91/10gs-offline-test/tree/recursive-solution-v2) in an effort to optimize time complexity.

| Solution  | Execution Time | Branch |
| --------- | -------------- | ------ |
| Iterative | 6.5ms - 7.5ms  | **[While-Loop-Solution-V2](https://github.com/colinwilliams91/10gs-offline-test)** (_Master Branch_) |
| Recursion | 9.3ms - 11.0ms | **[Recursive-Solution-V2](https://github.com/colinwilliams91/10gs-offline-test/tree/recursive-solution-v2)** |

## To run:

(_you will need typescript and node installed to run these commands_)

```sh
cd src
tsc index.ts # <<-- to compile ts to js
node index.js # <<-- to run
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

