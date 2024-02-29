import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    fullName: yup
      .string()
      .min(3, 'Your full name should be at least 3 characters.')
      .max(50, 'Your full name cannot be longer than 50 characters.')
      .required('Please enter your full name'),
    email: yup
      .string().email()
      .required('Your email must be @noroff.no'),
    subject: yup
      .string()
      .min(3, 'Your subject should be at least 3 characters.')
      .max(100, 'Your subject cannot be longer than 1000 characters.')
      .required('Please enter your subject'),
    body: yup
      .string()
      .min(3, 'Your body should be at least 3 characters.')
      .max(1000, 'Your body cannot be longer than 10 characters.')
      .required('Please enter your body'),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} />
      <p>{errors.fullName?.message}</p>
      <input {...register('email')} />
      <p>{errors.email?.message}</p>
      <input {...register('subject')} />
      <p>{errors.subject?.message}</p>
      <input {...register('body')} />
      <p>{errors.body?.message}</p>
      <input type="submit" />
    </form>
  );
}

export default App;


                                // FORMS
// import React, { useState } from 'react';

// function App() {
//   const [fullName, setfullName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [subject, setSubject] = useState('');
//   const [body, setBody] = useState('');

//   function onFormSubmit(event) {
//     event.preventDefault();
//     const body = {
//       fullName,
//       lastName,
//       subject,
//       body,
//     };

//     fetch('http://www.example.com', {
//       method: 'POST',
//       body: JSON.stringify(body),
//     });
//   }

//   function onTextInputChange(event) {
//     const value = event.target.value;
//     if (event.target.name === 'first-name') {
//       setfullName(value);
//     }
//     if (event.target.name === 'last-name') {
//       setLastName(value);
//     }
//     if (event.target.name === 'subject') {
//       setSubject(value);
//     }
//     if (event.target.name === 'body') {
//       setBody(value);
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={onFormSubmit}>
//         <label htmlFor="first-name">First name</label>
//         <input
//           name="first-name"
//           value={fullName}
//           placeholder="Your first name"
//           onChange={onTextInputChange}
//         />
//         <label htmlFor="last-name">Last name</label>
//         <input
//           name="last-name"
//           value={lastName}
//           placeholder="Your last name"
//           onChange={onTextInputChange}
//         />
//         <label htmlFor="subject">Subject</label>
//         <input
//           name="subject"
//           value={subject}
//           placeholder="Your subject"
//           onChange={onTextInputChange}
//         />
//         <label htmlFor="body">Body</label>
//         <input
//           name="body"
//           value={body}
//           placeholder="Your body"
//           onChange={onTextInputChange}
//         />
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;



                                //ROUTE PARAMS TO FETCH DATA
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Link, useParams } from 'react-router-dom';

// function Home() {
//   return <div>Home</div>;
// }

// function Todo() {
//   const [data, setData] = useState(<div>ToDo</div>);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   let { id } = useParams();

//   useEffect(() => {
//     async function getData(url) {
//       try {
//         setIsLoading(true);
//         setIsError(false);

//         const response = await fetch(url);
//         const json = await response.json();

//         setData(json);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     getData(`https://jsonplaceholder.typicode.com/todos/${id}`);
//   }, [id]);

//   if (isLoading || !data) {
//     return <div>Loading</div>;
//   }

//   if (isError) {
//     return <div>Error</div>;
//   }

//   console.log(data);

//   return (
//     <div>
//       <div>userId: {data.userId}</div>
//       <div>id: {data.id}</div>
//       <div>title: {data.title}</div>
//       <div>completed? {data.completed}</div>
//     </div>
//   );
// }

// function Nav() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/post/1">Post with ID: 1</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// function App() {
//   return (
//     <div>
//       <Nav />
//       <Routes>
//         <Route index element={<Home />} />
//         <Route path="post/:id" element={<Todo />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;



                             // API CALL 
// import React, { useEffect, useState } from 'react';

// const url = 'https://v2.api.noroff.dev/online-shop';

// function App() {
//   const [posts, setPosts] = useState([]);
//   // State for holding our loading state
//   const [isLoading, setIsLoading] = useState(false);
//   // State for holding our error state
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     async function getData() {
//       try {
//         // Reset the error state in case there as an error previously
//         setIsError(false);
//         // Turn on the loading state each time we do an API call
//         setIsLoading(true);
//         const response = await fetch(url);
//         const json = await response.json();
//         console.log(json.data);
//         console.log(response);
//         setPosts(json.data);
//         // Clear the loading state once we've successfully got our data
//         setIsLoading(false);
//       } catch (error) {
//         // Clear the loading state if we get an error and then
//         // set our error state to true
//         setIsLoading(false);
//         setIsError(true);
//       }
//     }

//     getData();
//   }, []);

//   if (isLoading) {
//     return <div>Loading posts</div>;
//   }

//   if (isError) {
//     return <div>Error loading data</div>;
//   }

//   return (
//     <div>
//      {Array.from(posts).map((post) => {
//         return (
//           <div key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.description}</p>
//             {/* <img src={post.image.url}></img> */}
//             <p>{post.discountedPrice}$</p>
//             <p>Rating: {post.rating}</p>
//             {/* <h6>Reviews: {post.reviews[0].description}</h6> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default App;

                                // ROUTER TASK
// import React from "react"
// import { Routes, Route, Link, useParams, Outlet } from "react-router-dom"

// function Home() {
//   return <div>Home</div>
// }

// function Products() {
//   return <div>Products</div>
// }

// function Contact() {
//   return <div>Contact</div>
// }

// function Product() {
//   let params = useParams()
//   console.log(params)
//   // Logs the id of whichever product page you are on e.g.
//   // {id: '1'} or {id: '2'}
//   return <div>Individual product page: {params.id}</div>
// }

// function RouteNotFound() {
//   return <div>Page not found</div>
// }

// function Nav() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/products">Products</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//         <li>
//           <Link to="/product/1">Product with ID: 1</Link>
//         </li>
//         <li>
//           <Link to="/product/2">Product with ID: 2</Link>
//         </li>
//       </ul>
//     </nav>
//   )
// }

// // Our header component that gets used in our <Layout> component
// function Header() {
//   return (
//     <header>
//       <div>Header with Logo and nav</div>
//       <Nav />
//     </header>
//   )
// }

// // Our footer component that gets used in our <Layout> component
// function Footer() {
//   return <footer>Website footer</footer>
// }

// // The <Outlet> from react-router-dom displays any child routes, almost like
// // passing through "children" in a component
// function Layout() {
//   return (
//     <div>
//       <Header />
//       <Outlet />
//       <Footer />
//     </div>
//   )
// }

// function App() {
//   return (
//     <div>
//       {/* <Header /> */}
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="products" element={<Products />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="product/:id" element={<Product />} />
//           <Route path="*" element={<RouteNotFound />} />
//         </Route>
//       </Routes>
//     </div>
//   )
// }

// export default App