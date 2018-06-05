export class Translation {

    /**
     * Creates an instance of Translation.
     * @param {string} text Translation, synonym or antonym itself
     * @param {string} lexicalCategory E.g. noun
     * @param {string[]} registers E.g. informal
     * @param {string[]} regions E.g. North America
     * @memberof Translation
     */
    constructor(
        public text: string,
        public lexicalCategory: string,
        public registers: string[],
        public regions: string[]) { }
}
