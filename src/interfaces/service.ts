export interface CRUD<Primitives> {
    /**
     * Insert into the database the following object passed by parameters.
     *
     * @param object
     */
    create(object: Primitives): Promise<Primitives | void>;

    /**
     * List one or more objects from the database that matches the query parameters.
     * @param queryParameters
     */
    read(queryParameters: any): Promise<Primitives[]>;

    /**
     * Update the object from the database that matches the object primitives.
     *
     * @param modifiedObject
     */
    update(modifiedObject: Primitives): Promise<void>;

    /**
     * Delete the field that matches the id in the parameters from the database.
     * @param id
     */
    delete(id: number): Promise<void>;
}
