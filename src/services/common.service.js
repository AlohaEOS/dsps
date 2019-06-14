import { handleResponse } from '../helpers';

function getRequest(_url, _params) {
    const requestOptions = {
        method: 'GET'
    };
    
    let _paramsStr = '';
    if(typeof _params === "object")
        _paramsStr = _params.join('/');
    
    if(_params)
        _paramsStr = `/${_paramsStr}`;

    return fetch(`${_url}${_paramsStr}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        })
}


function getRequest2(_url, _params) {
    const requestOptions = {
        method: 'GET',
        mode: 'no-cors'
    };
    
    let _paramsStr = '';
    if(typeof _params === "object")
        _paramsStr = _params.join('/');
    
    if(_params)
        _paramsStr = `/${_paramsStr}`;

    return fetch(`${_url}${_paramsStr}`, requestOptions)
        .then(_res => {
            console.log(_res)
            _res.text()
                .then(_data => {
                    console.log(_data, 'data')
                })
        })
}

function postJSONRequest(_url, _body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    if(_body)
        requestOptions.body = JSON.stringify(_body);

    return fetch(`${_url}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        })
}


function postRequest(_url, _body) {
    const requestOptions = {
        method: 'POST'
    };

    if(_body)
        requestOptions.body = JSON.stringify(_body);

    return fetch(`${_url}`, requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        })
}

export const commonService = {
    getRequest2,
    getRequest,
    postRequest,
    postJSONRequest
};