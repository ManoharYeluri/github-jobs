import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
    MAKE_REQUEST: "make request",
    GET_DATE: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: "update-has-next-page"
}

const BASE_URL = "/positions.json";

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] }

        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }

        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }

        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }

        default:
            throw new Error();
    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true, error: true });

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        const cancelToken1 = axios.CancelToken.source();
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
        }).catch(err => {
            if (axios.isCancel(err)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        });
        const cancelToken2 = axios.CancelToken.source();
        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } });
        }).catch(err => {
            if (axios.isCancel(err)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        });
        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        }
    }, [params, page]);

    return state;
}