import React from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:5000/api" 
});

function Get() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    client.get("/users?id=2").then((response) => {
      setUser(response.data);
    });
  }, []);

  console.log(user)

}

export default Get;