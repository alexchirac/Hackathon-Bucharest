import React from 'react';

function Page({ setPage }) {
    function changeToHome() {
        setPage("home"); // Schimbăm pagina înapoi la "home"
    }

    return (
        <>
            <h1>This is the Page</h1>
            <p>This is a new page!</p>
            {/* Butonul pentru a te întoarce la pagina principală */}
            <button onClick={changeToHome}>Go back to Home</button>
        </>
    );
}

export default Page;