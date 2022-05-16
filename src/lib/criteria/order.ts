export class Order {
    /**
     * Class constructor
     *
     * @param orderBy
     */
    constructor(public orderBy: { [key: string]: string }) {}

    /**
     * Generates an order from the received body parameters
     *
     * @param parameters
     * @return Order
     */
    public static fromValues(parameters: { [key: string]: string }): Order {
        // Get the first value of the map
        console.log(Object.values(parameters));

        for (const key in parameters) {
            if (Object.prototype.hasOwnProperty.call(parameters, key)) {
                const value = parameters[key];

                console.log(`${key} -> ${value}`);
            }
        }

        // // Check if the order is not asc or desc
        // if (firstValue.toLowerCase() != 'asc' || firstValue.toLowerCase() != 'desc') {
        //     return this.defaultOrder();
        // }

        // Return the desired order
        return new Order(parameters);
    }

    /**
     * Generates a default order if no order is provided in the body parameters
     *
     * @returns Order
     */
    public static defaultOrder(): Order {
        let defaultMap = { id: 'asc' };
        return new Order(defaultMap);
    }
}
