'use client'

import {useEffect} from "react";
import { Configuration, DefaultApi } from "../api";

export function Test() {
    useEffect(() => {
        const config = new Configuration({
            basePath: "http://localhost:3000/api",
        });

        const api = new DefaultApi(config);

        api.getUsers()
            .then((response) => {
                console.log(response.users);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])


    return (
        <div>
            <h1>Test</h1>
        </div>
    );
}
