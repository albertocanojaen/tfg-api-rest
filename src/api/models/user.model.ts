import { UserArguments } from '../interfaces/user.arguments';

export class UserModel implements UserArguments {
    /**
     * The user identifier
     */
    public id: number;

    /**
     * The user name
     */
    public name: string;

    /**
     * The user password
     */
    public password: string;

    /**
     * The user email
     */
    public email: string;

    /**
     * Class constructor
     * @param args
     */
    constructor(args: UserArguments) {
        // Set the arguments
        this.id = args.id;
        this.name = args.name;
        this.password = args.password;
        this.email = args.email;
    }

    /**
     * Parse the object into a primitive json
     */
    public toPrimitives(): UserArguments {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            email: this.email,
        };
    }
}
