import React from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:5000/api"
});

function Get(route, params) {
    const [item, setItem] = React.useState(null);

    React.useEffect(() => {
        client.get(route, params).then((response) => {
            setItem(response.data);
        });
    }, []);

    console.log(item)
}

export default Get;