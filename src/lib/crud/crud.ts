import { Criteria } from '../criteria/classes/criteria';
export interface CRUD<Primitives> {
    /**
     * Insert into the database the following object passed by parameters.
     *
     * @param object
     */
    create(object: Primitives): Promise<Primitives>;

    /**
     * Get one or more objects from the database who matches the criteria.
     *
     * @param queryParameters
     */
    getByCriteria(queryParameters: Criteria): Promise<Primitives[]>;

    /**
     * Get one object from the database by id.
     *
     * @param id
     */
    getById(id: number): Promise<Primitives | null>;

    /**
     * Update an object from the database that matches the object primitives.
     *
     * @param id
     * @param modifiedObject
     */
    update(modifiedObject: Primitives): Promise<Primitives>;

    /**
     * Delete the object who matches the given id.
     * @param id
     */
    delete(id: number): Promise<Primitives>;
}
