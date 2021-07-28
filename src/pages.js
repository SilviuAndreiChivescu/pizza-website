import React, { useEffect, useState } from "react"
import {Link, useLocation} from "react-router-dom"
import {UpperSide, UpperSideSecond, UpperSideSecondMenu, Slideshow, Main, MainMenu, Checkout, Footer, CartNotOpened} from "./index.js"

export function Menu() {
    // useState to make the cart appear
    const [popUp, setPopUp] = useState(true);
    return (
        <>
        {popUp ? 
        <>
            <UpperSide />
            <UpperSideSecondMenu />
            <MainMenu />
            <Link to="/">Home</Link>
            <CartNotOpened setPopUp={() => setPopUp(false)} />
        </>

        : <Checkout setPopUp={() => setPopUp(true)} /> }
        </>
        
    )
}

export function Home() {
    return (
        <>
        <UpperSide></UpperSide>
        <UpperSideSecond></UpperSideSecond>
        <Slideshow></Slideshow>
        <Main></Main>
        <Footer year={new Date().getFullYear()}></Footer>
        </>
    )
}

export function Whoops404() {
    let location = useLocation();

    return(
        <div>
            <h1>Resource not found at {location.pathname}!</h1>
        </div>
    )
}