export interface IEkgFileInput {
  /**
   * File path to current directory in which to init
   */
  readonly directoryPath: string;
  /**
   * optional file name to use instead of .ekg
   * @default .ekg
   */
  readonly ekgFileName?: string;
}
