import { Filter } from './filter';

export class Filters {
    /**
     * Class constructor
     *
     * @param filters
     */
    constructor(public filters: Filter[]) {}

    /**
     * Generate the filters from the received map
     */
    public static fromValues(map: any[]): Filters {
        // Generate an empty array to insert the filters
        let filters: Filter[] = [];

        // For each filters in the primitives
        map.forEach((filter: Filter) => {
            // Push the filter into the array
            filters.push(Filter.fromValues(filter));
        });

        // Return the instance of the filters
        return new Filters(filters);
    }

    /**
     * Generate empty filters
     */
    public static emptyFilter(): Filters {
        return new Filters([]);
    }

    /**
     * Format the filters to make it readable by Prisma
     *
     */
    public parseFiltersToPrisma() {
        // Check if there is only one filter
        if (this.filters.length === 1) {
            return {
                where: {
                    [this.filters.at(0)?.field!]: {
                        [this.filters.at(0)?.operator!]: this.filters.at(0)?.value,
                    },
                },
            };
        }
        // Check if we have more than one filter
        if (this.filters.length > 1) {
            let orFilters: any[] = [];
            let andFilters: any[] = [];

            this.filters.forEach((filter) => {
                if (filter.connector === 'OR') {
                    orFilters.push({
                        [filter.field]: {
                            [filter.operator]: filter.value,
                        },
                    });
                } else if (filter.connector === 'AND') {
                    andFilters.push({
                        [filter.field]: {
                            [filter.operator]: filter.value,
                        },
                    });
                }
            });

            return {
                where: {
                    AND: andFilters,
                    OR: orFilters,
                },
            };
        }
    }
}
