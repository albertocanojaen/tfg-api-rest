import { OrderInterface } from '../../interfaces/criteria/order-interface';
import { InvalidOrderFormat } from '../exceptions/criteria/invalid-order';
import { OrderMaxLength } from '../exceptions/criteria/order-max-length';
export class Order {
    /**
     * Class constructor
     *
     * @param orderBy
     */
    constructor(public orderBy: OrderInterface) {}

    /**
     * Generates an order from the received body parameters
     *
     * @param parameters
     * @return Order
     */
    public static fromValues(parameters: OrderInterface): Order {
        // Check if order parameters length is more than one
        if (Object.keys(parameters).length > 1) {
            throw new OrderMaxLength();
        }

        // Get the first value of the map
        for (const key in parameters) {
            if (Object.prototype.hasOwnProperty.call(parameters, key)) {
                // Change asc or desc to lower case
                parameters[key] = parameters[key].toLowerCase();

                // Check if is not asc or desc the order
                if (parameters[key] !== 'asc' && parameters[key] !== 'desc') {
                    throw new InvalidOrderFormat();
                }
            }
        }

        // Return the desired order
        return new Order(parameters);
    }

    /**
     * Generates a default order if no order is provided in the body parameters
     *
     * @returns Order
     */
    public static defaultOrder(): Order {
        const defaultMap: OrderInterface = { id: 'asc' };
        return new Order(defaultMap);
    }
}
