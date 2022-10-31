import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";

export default function Fib() {

    const [inputValue, setInput] = useState("");
    const [calculatedValues, setCalculatedValues] = useState({});
    const [previousValues, setPreviousValues] = useState([]);


    useEffect(() => {

        async function getAllPreviousValues() {

            const url =  '/api/values/all';
            const values = await axios.get(url);

            setPreviousValues(values.data);

        }

        getAllCalcualtedValues();
        getAllPreviousValues();

    }, []);

    async function getAllCalcualtedValues() {

        const url = '/api/values/current';
        const values = await axios.get(url);

        setCalculatedValues(values.data);

    }

    async function handleSubmit(event) {
        event.preventDefault();

        const url =  '/api/values';
        const body = {
            index: inputValue
        }

        await axios.post(url, body);

        setInput('');
        // update the last seen values.
        setPreviousValues([...previousValues, {number:parseInt(body.index) } ]);
        // get the caluclated value if already not calculated.
        if(!calculatedValues[parseInt(body.index)]) getAllCalcualtedValues();
    };

    function renderCalculatedValues() {
        let entries = [];
        for (const key in calculatedValues) {
            if (Object.hasOwnProperty.call(calculatedValues, key)) {
                const element = calculatedValues[key];
                entries.push(<div key={key}> For {key} the calculated value: {element}</div>)
            };
        };
        return entries;
    };

    function renderLastSeen() {
        return (previousValues.map(({ number }) => number).join(', '));
    };


    return (
        <div>
            <h1>Fib calculatorrr</h1>
            <input placeholder="Enter a value" value={inputValue} onChange={(event) => { setInput(event.target.value) }} />
            <button onClick={handleSubmit}>Submit</button>
            <h3>Last Seen:</h3>
            {renderLastSeen()}
            <h3>Calculated Values:</h3>
            {renderCalculatedValues()}
        </div>
    )
};