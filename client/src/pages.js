import React, { useState, useEffect } from "react";

import Axios from "axios";

export function MongoDB() {
  // States to post
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [numberOfProduct, setNumberOfProduct] = useState(1);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      name: name,
      price: price,
      numberOfProduct: numberOfProduct,
    });
    setProductsList([
      ...productsList,
      { Name: name, Price: price, NumberOfProduct: numberOfProduct },
    ]);
  };
  // state to read/get
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setProductsList(response.data);
    });
  }, []);

  // state to update
  const [newName, setNewName] = useState("");

  const updateProduct = (id) => {
    Axios.put("http://localhost:3001/update", { id: id, newName: newName });
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="text-center">
      <h1>CRUD APP with MERN</h1>
      <br></br>

      <label>Product name</label>
      <br></br>
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br></br>
      <label>Product price</label>
      <br></br>
      <input
        type="number"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />
      <br></br>
      <button className="mt-3" onClick={addToList}>
        Add to List
      </button>
      <h1>Products List</h1>

      {productsList.map((val, key) => {
        return (
          <div key={key}>
            <h1>
              {val.Name} for {val.Price}
            </h1>
            <input
              onChange={(event) => setNewName(event.target.value)}
              type="text"
              placeholder="New product name"
            />
            <button onClick={() => updateProduct(val._id)}>Update</button>
            <button onClick={() => deleteProduct(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
// ******** END MongoDB ********

// export function Mysql() {
//   const [Name, setName] = useState("");
//   const [Price, setPrice] = useState("");
//   const [Description, setDescription] = useState("");
//   const [Image, setImage] = useState("");
//   const [Category, setCategory] = useState("");

//   // The below useState is used to display on the front-end all my info from db(Just as an example for me to have in the future)
//   const [products, setProducts] = useState([]);

//   //Below useState is used to the update part of CRUD
//   const [newPrice, setNewPrice] = useState("");

//   useEffect(() => {
//     Axios.get("http://localhost:3001/api/get").then((response) => {
//       setProducts(response.data);
//     });
//   }, []);

//   const submit = () => {
//     Axios.post("http://localhost:3001/api/insert", {
//       Name: Name,
//       Price: Price,
//       Description: Description,
//       Image: Image,
//       Category: Category,
//     });
//     // This below is: we are pushing inside our products array, the new insert so that you don't need to refresh page in order to get new info
//     setProducts([...products, { Name: Name, Price: Price }]);
//   };

//   const deleteProduct = (product) => {
//     Axios.delete(`http://localhost:3001/api/delete/${product}`);

//     setProducts(products.filter((val) => val.Name !== product));
//   };

//   const updatePrice = (product) => {
//     Axios.put("http://localhost:3001/api/update", {
//       Name: product,
//       Price: newPrice,
//     });
//     setNewPrice("");
//   };

//   return (
//     <div className="bg-white text-center">
//       <h1>Here will do the Mysql stuff</h1>
//       {/* <h2>users table</h2>
//             <div className="d-flex justify-content-center align-items-center flex-wrap">
//                 <label>Username<br></br>
//                 <input type="text" name="Username" /></label>
//                 <label>password<br></br>
//                 <input type="text" name="Password" /></label>
//                 <label>Email<br></br>
//                 <input type="text" name="Email" /></label>
//                 <label>Fullname<br></br>
//                 <input type="text" name="Fullname" /></label>
//                 <label>Address<br></br>
//                 <input type="text" name="Address" /></label>
//                 <label>Phone<br></br>
//                 <input type="text" name="Phone" /> </label>
//             </div>
//             <h2>cart table</h2>
//             <div>
//                 <label>CartID<br></br>
//                 <input type="text" name="CartID" /></label>
//                 <label>UserID<br></br>
//                 <input type="text" name="UserID" /></label>
//                 <label>ProductID<br></br>
//                 <input type="text" name="ProductID" /></label>
//             </div> */}
//       <h2>products table</h2>
//       <div className="mb-5">
//         <label>
//           Name<br></br>
//           <input
//             type="text"
//             name="Name"
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           />
//         </label>
//         <label>
//           Price<br></br>
//           <input
//             type="text"
//             name="Price"
//             onChange={(e) => {
//               setPrice(e.target.value);
//             }}
//           />
//         </label>
//         <label>
//           Description<br></br>
//           <input
//             type="text"
//             name="Description"
//             onChange={(e) => {
//               setDescription(e.target.value);
//             }}
//           />
//         </label>
//         <label>
//           Image<br></br>
//           <input
//             type="text"
//             name="Image"
//             onChange={(e) => {
//               setImage(e.target.value);
//             }}
//           />
//         </label>
//         <label>
//           Category<br></br>
//           <input
//             type="text"
//             name="Category"
//             onChange={(e) => {
//               setCategory(e.target.value);
//             }}
//           />
//         </label>
//       </div>
//       <button onClick={submit}>Submit</button>

//       {products.map((val) => {
//         return (
//           <div>
//             <h5>
//               Name: {val.Name} | Price: {val.Price}
//             </h5>
//             {/* <button onClick={() => {deleteProduct(val.Name)}}>Delete</button>
//                     <input type="text" placeholder="Update" onChange={(e) => {setNewPrice(e.target.value)}} />
//                     <button onClick={() => {updatePrice(val.Name)}}>Update</button> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
