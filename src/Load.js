import React, { useState, useEffect } from "react";

function Load() {
    const [properties, setProperties] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProperties = async () => {
            try {
                const SERVER_URL = 'http://localhost:8080/api/all-property?pageNo=0&pageSize=10';
                const response = await fetch(
                    SERVER_URL,
                    { method: 'GET', redirect: "follow" }
                );

                if(response.redirected) {
                    document.location = response.url;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError(error.message);
            }
        };

        getProperties();
    }, []);

    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <pre>{JSON.stringify(properties, null, 2)}</pre>
            )}
        </div>
    );
}

export default Load;
