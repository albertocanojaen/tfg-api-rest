import { OrderInterface } from './order-interface';
import { Filter } from '../classes/filter';

export interface CriteriaInterface {
    filters: Filter[];
    orderBy: OrderInterface;
}
