import React, { useState, useEffect } from "react";

function Load() {
    const [properties, setProperties] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProperties = async () => {
            try {
                console.log("Entering request block");

                const SERVER_URL = "/asset-app/api/all-property?pageNo=0&pageSize=10";
                console.log(`Requesting data from ${SERVER_URL}`);

                const response = await fetch(
                    SERVER_URL, {
                                method: "GET",
                                redirect: "follow",
                                referrerPolicy: "origin-when-cross-origin",
                            }
                        );

                    console.log(`Is redirecting: ${response.redirected}`);

                    if(response.redirected){
                        console.log(`Redirecting to: ${response.url}`);
                        document.location=response.url;
                    }

                    if(!response.ok){
                        throw new Error('Failed to fetch data')
                    }

                    const data = await response.json();
                    setProperties(data);
                //console.log("Response received:", response);

                /*                 
                if (response.type === 'opaqueredirect') {
                    // Manejar redirección de manera transparente
                    window.location.href = response.url;
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Data received:", data);
                setProperties(data); 
                */

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
