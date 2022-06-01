export interface IUser {
    /**
     * The user identifier
     */
    id?: number;

    /**
     * The user name
     */
    name?: string;

    /**
     * The user password
     */
    password?: string;

    /**
     * The user email
     */
    email?: string;

    /**
     * The date when the user was created
     */
    createdAt?: Date;

    /**
     * The date when the user was updated last time
     */
    lastUpdate?: Date;
}
