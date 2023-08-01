import {EFilters} from "../enums/filterFrom.enum";

export interface IFilterFormValue {
    [EFilters.BOTTOM_LEVEL]: number;
    [EFilters.TOP_LEVEL]: number;
    [EFilters.ABILITIES]: number[];
    [EFilters.HERO_NAME]:string;
    [EFilters.SORT_MODE]: number;
}
