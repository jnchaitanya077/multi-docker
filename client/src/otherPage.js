import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherPage() {
    return (
        <div>
            <h1>I'am some other page.</h1>
            <Link to='/'> Go back home</Link>
        </div>
    );
};
