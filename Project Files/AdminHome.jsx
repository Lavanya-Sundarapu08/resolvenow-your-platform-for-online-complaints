import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               setUserName(user.name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
               <Navbar.Brand>
                  Hi Admin {userName}
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                     <Nav.Link
                        onClick={() => handleNavLinkClick('dashboard')}
                        className={activeComponent === 'dashboard' ? 'active' : ''}
                     >
                        Dashboard
                     </Nav.Link>
                     <Nav.Link
                        onClick={() => handleNavLinkClick('UserInfo')}
                        className={activeComponent === 'UserInfo' ? 'active' : ''}
                     >
                        User
                     </Nav.Link>
                     <Nav.Link
                        onClick={() => handleNavLinkClick('Agent')}
                        className={activeComponent === 'Agent' ? 'active' : ''}
                     >
                        Agent
                     </Nav.Link>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-danger">
                     Log out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div className="content p-3">
            {activeComponent === 'dashboard' && <AccordionAdmin />}
            {activeComponent === 'UserInfo' && <UserInfo />}
            {activeComponent === 'Agent' && <AgentInfo />}
         </div>
      </>
   );
};

export default AdminHome;
