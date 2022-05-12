
const baseURL = process.env.REACT_APP_API_URL;


export const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;

    if (method === 'GET') {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } );
    }
}




export const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;

    if (method === 'GET') {
        return fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('token') || '',
            }
        } );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('token') || '',
            },
            body: JSON.stringify( data )
        } );
    }
}