import axios from "axios";
import config from "../../config";
import {toast} from "react-toastify";
import {API_RESPONSES, LOADER_END, LOADER_START} from "../actions/actionType";

const defaultToasterOptions = {
    isLoading: false,
    autoClose: 4000,
    closeButton: true,
};

const httpActions = (e) => next => async action => {

    const {
        method = "GET",
        toasterString,
        url,
        isHttpAction,
        headers,
        type,
        body,
    } = action;
    const authKey = localStorage.getItem("token");

    if (isHttpAction) {

        await next({
            type: `${LOADER_START}`,
            payload: {}
        });

        let toasterId;
        toasterString && (toasterId = await toast.loading(toasterString || `Waiting for Response`));
        await next({
            type: `${type}_FETCHING`,
            payload: {},
        });
        const baseURL = config.BACKEND_BASE_API_URL;
        const accessAndContentHeader = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'Access-Control-Allow-Methods': 'POST, GET',
        };
        try {
            const response = await axios({
                url,
                headers: {
                    Authorization: authKey || '',
                    ...accessAndContentHeader,
                    ...headers,
                },
                baseURL,
                data: body,
                method,
            });
            const {data} = response;
            if (toasterId) await toast.update(toasterId, {
                type: 'success',
                render: data.message || `Success`, ...defaultToasterOptions
            });
            await next({
                type: API_RESPONSES,
                payload: data,
                actionType: `${type}_SUCCESS`,
            });
            await next({
                type: `${type}_SUCCESS`,
                payload: data,
            });
        } catch (e) {
            const {response} = e;
            console.error('Error : got in httpsAction');
            if (toasterId) await toast.update(toasterId, {
                type: 'error',
                render: response?.data?.message || `Something going wrong !`,
                ...defaultToasterOptions,
            });
            await next({
                type: API_RESPONSES,
                payload: {message: response?.data, e},
                actionType: `${type}_FAILED`,
            })
            await next({
                type: `${type}_FAILED`,
                payload: {message: response?.data?.message, e},
            });
        }

        await next({
            type: `${LOADER_END}`,
            payload: {}
        });

    } else {
        await next(action);
    }

    return e.getState();
};

export default httpActions;