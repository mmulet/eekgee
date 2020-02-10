/**
 * Like built-in Omit. But only compiles if the type
 * omitted is actually omitted.
 * @example
 * interface A {
 *  readonly a: number
 * }
 * //This compiles
 * interface WithOmit extends Omit<A, "b"> {
 * }
 *
 * //This does not compile
 * interface WithOmitStrict extends OmitStrict<A, "b"> {
 * }
 */
export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
