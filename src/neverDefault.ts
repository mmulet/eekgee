/**
 * Used to assert exhaustive case checking by the
 * typescript compiler.
 * @param _x type never
 * @example
 * type abc = "a" | "b" | "c"
 *
 * //This will not compile
 * const func = (letter : abc) => {
 *  switch(letter){
 *    case "a":
 *    case "b":
 *    //There is no case for "c"
 *      break;
 *    default:
 *      //There will be an error here
 *      neverDefault(letter)
 *      break
 *  }
 * }
 *
 * //This will compile
 * const func2 = (letter : abc) => {
 *  switch(letter){
 *    case "a":
 *    case "b":
 *    //remembered to include the "c" case here
 *    case "c":
 *      break;
 *    default:
 *      //There will be an error here
 *      neverDefault(letter)
 *      break
 *  }
 * }
 *
 * // I also often use this in chained ternary operators
 * // (when using it like a cond clause in lisp)
 * // This will only compile when the test is 
 * // exhaustive
 * const func3 = (letter: abc) =>
 *  letter === "a"
 *  ? 0
 *  : letter === "b"
 *  ? 1
 *  : letter === "c"
 *  ? 2
 *  :
 *    // using the comma operator here to evaluate
 *    // neverDefault(letter) for side effects only
 *    // and returning -1
 *    (neverDefault(letter), -1);
 *
 */
export const neverDefault = (_x: never) => {
  debugger;
};