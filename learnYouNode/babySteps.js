var sumOfArguments = 0;

// process.argv is an array and first contains the string 'node', then the absolute path to the current module.
// In process.argv[2] onwards is the parameters which are given to the module - the same as how paramters are
// given to a function.
for (argumentCounter = 2; argumentCounter < process.argv.length; argumentCounter++) {
  sumOfArguments += Number(process.argv[argumentCounter]);
};

console.log(sumOfArguments);