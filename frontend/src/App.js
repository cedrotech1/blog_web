
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components from the landing pages
import Home from "./pages/landing/home";
import Contact from "./pages/landing/contact";
import Quates from "./pages/landing/quates";
import Login from "./pages/landing/login";
import CustomerRegister from "./pages/landing/customer_register";
import RestRegister from "./pages/landing/restaurent_admin";
import NotFound from './pages/landing/notfound';
import Logout from './pages/landing/logout';
import Statistics1 from './components/statistics';
import Reset from './pages/landing/reset';
import Code from './pages/landing/code';
import ResetPassword from './pages/landing/resetPassword';
import PostDetail from "./pages/landing/PostDetail";
import Posts from "./pages/landing/posts";



// Importing components from the Admin resto pages    Add_post
import Index from "./pages/Admin_1/statistics";
import Add_post from "./pages/Admin_1/add_post";
import Post from "./pages/Admin_1/post";
import Setting from "./pages/Admin_1/user-profile";


// emplyoyee_requests
// emplyoyee_actives
// Main App component
function App() {
  return (
    // Set up the BrowserRouter for handling routes
    <BrowserRouter>
      {/* Define the routes using the Routes component */}
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/contact" element={<Contact />} exact={true} />
        <Route path="/quates" element={<Quates/>} exact={true} />
        <Route path="/login" element={<Login />} exact={true} />
        <Route path="/register" element={<CustomerRegister />} exact={true} />
        <Route path="/restoAdmin" element={<RestRegister />} exact={true} />
        <Route path="/logout" element={<Logout />} exact={true} />
        <Route path="/Statistics1" element={<Statistics1 />} exact={true} />
        <Route path="/reset" element={<Reset />}/>
        <Route path="/code/:email" element={<Code />}/>
        <Route path="/resetPassword/:email" element={<ResetPassword />}/>
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<NotFound />} />

     
        {/* admin 001 */}
        <Route path="/dashboard" element={<Index/>} exact={true} />
        <Route path="/view_post" element={<Add_post/>} exact={true} />
        <Route path="/post" element={<Post/>} exact={true} />
        <Route path="/settings" element={<Setting/>} exact={true} />
  
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export    OurResto
export default App;
