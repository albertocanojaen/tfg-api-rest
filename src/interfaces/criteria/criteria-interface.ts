import { OrderInterface } from './order-interface';
import { Filter } from '../../lib/criteria/filter';

export interface CriteriaInterface {
    filters: Filter[];
    orderBy: OrderInterface;
}
