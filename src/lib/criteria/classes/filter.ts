import { FilterInterface } from '../interfaces/filter-interface';
import { InvalidFilterFormat } from '../errors/invalid-filter-format';

export class Filter {
    /**
     * Class constructor
     *
     * @param field
     * @param operator
     * @param value
     * @param connector
     */
    constructor(public connector: string, public field: string, public operator: string, public value: string) {}

    /**
     * Generates a filter from the received map
     */
    public static fromValues(filter: FilterInterface): Filter {
        // Check if any required filter parameters is not defined
        if (!filter.field || !filter.operator || !filter.value) {
            throw new InvalidFilterFormat();
        }

        // Return the filter
        return new Filter(filter?.connector, filter?.field, filter?.operator, filter?.value);
    }
}
