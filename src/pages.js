import React, { useState } from "react"
import {Link, useLocation} from "react-router-dom"
import {UpperSide, UpperSideSecond, Slideshow, Main, MainMenu, CartOpened, Checkout, Footer, CartNotOpened} from "./index.js"

export function Menu() {
    // useState to show the cart
    const [popUp, setPopUp] = useState("checkout");

        {/* Conditional rendering for showing the cart */}
        if (popUp == "noCart") {
            return(
            <>
                <UpperSide />       
                <MainMenu />
                <Link to="/">Home</Link>
                <CartNotOpened setPopUp={ () => setPopUp("cart") } />
            </>
            )
        }
        else if (popUp == "cart") { return <CartOpened setPopUp={() => setPopUp("noCart")} setPopUpCheckout={() => setPopUp("checkout")} /> }
        else { return <Checkout /> }
        
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