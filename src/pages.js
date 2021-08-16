import React, { useState, useEffect, useReducer } from "react"
import {Link, useLocation} from "react-router-dom"
import Axios from 'axios'
import { UpperSide, MainMenu, Footer, CartNotOpened} from "./index.js"
import NavBar from './components/NavBar.js'
import CartAndCheckoutNavBar from "./components/CartAndCheckoutNavBar.js"
import CartOpen from "./components/CartOpen.js"
import Checkout from "./components/Checkout.js"
import SignIn from './SignIn'

export function Autentificare() {
    return <SignIn />
}

export function Menu() {
    // useState to show the cart
    const [popUp, setPopUp] = useState("noCart");

        {/* Conditional rendering for showing the cart */}
        if (popUp == "noCart") {
            return(
            <>
                <NavBar />       
                <MainMenu setPopUp={ () => setPopUp("cart") } />
                {/* <CartNotOpened /> */}
            </>
            )
        }
        else if (popUp == "cart") { 
            return (
                <>
                    <CartAndCheckoutNavBar setPopUp={() => setPopUp("noCart")} title={"Cosul tau"} />
                    <CartOpen  setPopUpCheckout={() => setPopUp("checkout")} /> 
                </>
            );
        }
        else { 
            return (
                <>
                    <CartAndCheckoutNavBar setPopUp={() => setPopUp("cart")} title={"Aici dai comanda"} />
                    <Checkout /> 
                </>
            )
        }
        
}

export function Mysql() {
    const [Name, setName] = useState("");
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");
    const [Image, setImage] = useState("");
    const [Category, setCategory] = useState("");

    // The below useState is used to display on the front-end all my info from db(Just as an example for me to have in the future)
    const [products, setProducts] = useState([]);

    //Below useState is used to the update part of CRUD
    const [newPrice, setNewPrice] = useState("");

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setProducts(response.data);
        });
    }, []);

    const submit = () => {
        Axios.post('http://localhost:3001/api/insert', 
        {Name: Name, Price: Price, Description: Description, Image: Image, Category: Category})
        // This below is: we are pushing inside our products array, the new insert so that you don't need to refresh page in order to get new info
        setProducts([
            ...products,
            {Name: Name, Price: Price},
        ]);

    };

    const deleteProduct = (product) => {
        Axios.delete(`http://localhost:3001/api/delete/${product}`)

        setProducts(
            products.filter(val => val.Name !== product)
        )
    };

    const updatePrice = (product) => {
        Axios.put("http://localhost:3001/api/update", 
        {Name: product, Price: newPrice});
        setNewPrice("");
    };

    return(
        <div className="bg-white text-center">
            <h1>Here will do the Mysql stuff</h1>
            {/* <h2>users table</h2>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
                <label>Username<br></br>
                <input type="text" name="Username" /></label>
                <label>password<br></br>
                <input type="text" name="Password" /></label>
                <label>Email<br></br>
                <input type="text" name="Email" /></label>
                <label>Fullname<br></br>
                <input type="text" name="Fullname" /></label>
                <label>Address<br></br>
                <input type="text" name="Address" /></label>
                <label>Phone<br></br>
                <input type="text" name="Phone" /> </label>
            </div>
            <h2>cart table</h2>
            <div>
                <label>CartID<br></br>
                <input type="text" name="CartID" /></label>
                <label>UserID<br></br>
                <input type="text" name="UserID" /></label>
                <label>ProductID<br></br>
                <input type="text" name="ProductID" /></label>
            </div> */}
            <h2>products table</h2>
            <div className="mb-5">
                <label>Name<br></br>
                <input type="text" name="Name" onChange={(e) => {setName(e.target.value)}} /></label>
                <label>Price<br></br>
                <input type="text" name="Price" onChange={(e) => {setPrice(e.target.value)}} /></label>
                <label>Description<br></br>
                <input type="text" name="Description" onChange={(e) => {setDescription(e.target.value)}} /></label>
                <label>Image<br></br>
                <input type="text" name="Image" onChange={(e) => {setImage(e.target.value)}} /></label>
                <label>Category<br></br>
                <input type="text" name="Category" onChange={(e) => {setCategory(e.target.value)}} /></label>
            </div>
            <button onClick={submit}>Submit</button>

            {products.map((val) => {
                return (
                <div>
                    <h5>Name: {val.Name} | Price: {val.Price}</h5>
                    {/* <button onClick={() => {deleteProduct(val.Name)}}>Delete</button>
                    <input type="text" placeholder="Update" onChange={(e) => {setNewPrice(e.target.value)}} />
                    <button onClick={() => {updatePrice(val.Name)}}>Update</button> */}
                </div>
                )
            })}
        </div>
    )
}

// export function Home() {
//     return (
//         <>
//         <UpperSide />
//         <UpperSideSecond />
//         <Slideshow></Slideshow>
//         <Main></Main>
//         <Footer />
//         </>
//     )
// }

export function Whoops404() {
    let location = useLocation();

    return(
        <div>
            <h1>Resource not found at {location.pathname}!</h1>
        </div>
    )
}