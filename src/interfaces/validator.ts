export interface Validator<Primitives> {
    /**
     * Validate the received primitives
     *
     * @param primitives
     */
    validate(primitives: Primitives): Promise<void>;
}
