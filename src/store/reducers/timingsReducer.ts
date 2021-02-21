import { DateTime } from 'luxon';

interface TimingsState {
    timings: { time: DateTime; ranking: number }[];
    loading: boolean;
    error?: Error;
}

const GET_TIMINGS = 'timingsReducer/GET_TIMINGS';
interface GetTimingsAction {
    type: typeof GET_TIMINGS;
    payload: { time: DateTime; ranking: number }[];
}

const TIMINGS_ERROR = 'timingsReducer/TIMINGS_ERROR';
interface TimingsErrorAction {
    type: typeof TIMINGS_ERROR;
    payload: Error;
}

export type TimingsActionTypes = GetTimingsAction | TimingsErrorAction;

export const getTimingsAction = (data: { time: DateTime; ranking: number; }[]): TimingsActionTypes => {
    return {
        type: GET_TIMINGS,
        payload: data,
    }
};

export const timingsErrorAction = (error: Error): TimingsActionTypes => {
    return {
        type: TIMINGS_ERROR,
        payload: error,
    }
};

const initialState: TimingsState = {
    timings: [],
    loading: true,
};

const timingsReducer = (state: TimingsState = initialState, action: TimingsActionTypes ) => {
    switch(action.type){
        case GET_TIMINGS:
            return {
                loading: false,
                timings: action.payload,
                error: undefined,
            };
        case TIMINGS_ERROR:
            return{
                loading: false,
                timings: [],
                error: action.payload,
            };
        default: return state
    }
};

export default timingsReducer;