import { Filters } from './filters';
import { Order } from './order';

export class Criteria {
    /**
     * Class constructor
     *
     * @param filters
     * @param order
     * @param limit?
     * @param offset?
     */
    constructor(public filters: Filters, public order: Order, public limit?: number, public offset?: number) {}

    /**
     * Generates a criteria from the received body parameters
     *
     * @param bodyParameters
     */
    static fromBodyParameters(bodyParameters: any): Criteria {
        // Generate the filter array and order object
        let filters: Filters;
        let order: Order;

        // Check if the filters are defined
        if (bodyParameters.filters) {
            // Generate a filter instance from the body parameters filters
            filters = Filters.fromValues(bodyParameters.filters);
        } else {
            // Generate an empty filter
            filters = Filters.emptyFilter();
        }

        // Check if the order by is defined
        if (bodyParameters.orderBy) {
            // Generate a order instance form the body parameters order by
            order = Order.fromValues(bodyParameters.orderBy);
        } else {
            order = Order.defaultOrder();
        }

        return new Criteria(filters, order);
    }

    public parseCriteriaToPrisma() {
        return this.concatCriteria(this.filters.parseFiltersToPrisma(), this.order);
    }

    /**
     * Concat two json into one
     * @param o1
     * @param o2
     * @returns
     */
    public concatCriteria(o1: any, o2: any) {
        for (const key in o2) {
            o1[key] = o2[key];
        }
        return o1;
    }
}
