import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

// navigation bar & header imports:
import { NavigationBar } from './NavigationBar';
import { Headers } from './Headers';

// page imports
import { HomePage } from './HomePage';
import { QuizPage } from './QuizPage';
import { GamesPage } from './GamesPage';
import { FriendsList } from './FriendsList';
import { SignInPage } from './SignInPage';
import { FriendQuizResults } from './FriendQuizResults';

// static components
import { FriendResults } from './FriendResults';
import { PersonalResults } from './MyResults';

import 'bootstrap/dist/css/bootstrap.min.css'; 

function App(props) {
  const [currentUser, setCurrentUser] = useState({ uid: null });

  // Quiz Results
  const [filterCriteria, setFilterCriteria] = useState({
      genre: [], players: [], platform: []
  });

  // Matching Users
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    onAuthStateChanged(getAuth(), function(firebaseUser) {
      // console.log("someone logged in or logged out!");
      // if (firebaseUser) {
      //   console.log(firebaseUser);
      // } else {
      //   console.log("signed out!");
      // }
      setCurrentUser(firebaseUser);
    });
  });

  return (
    <div>
      <header>
        <NavigationBar />
        <Headers />
      </header>

      <main>
        <Routes>
          <Route index element={ <HomePage /> } />
          <Route path="home" element={ <HomePage /> } />
          <Route path="games" element={ <GamesPage /> } />
          <Route path="signin" element={ <SignInPage currentUser={currentUser} /> } />

          <Route element={<ProtectedPage currentUser={currentUser} /> }>
            
            <Route path="quiz" element={ <QuizPage setFilterCriteria={setFilterCriteria}/> } />
            <Route path="friends" element={ <FriendsList currentUser={currentUser} matchedUsers={matchedUsers} /> } />
            
            <Route path="profile" element={ <PersonalResults filterCriteria={filterCriteria} currentUser={currentUser} matchedUsers={matchedUsers} setMatchedUsers={setMatchedUsers} /> } />
            <Route 
              path="/quiz-results/:friendUid" 
              element={ 
                <FriendQuizResults 
                  matchedUsers={matchedUsers} 
                  setMatchedUsers={setMatchedUsers} 
                />
              }
            />
          </Route>
          
          {/* <PersonalResults filterCriteria={filterCriteria}/>  */}
          <Route path="*" element={ <Navigate to="/home"/> } />
        </Routes>
      </main>

      <footer className="my-footer p-3 mt-100">
        <p>&copy; Game Hub 2023: Cheryl Feng, Angielena Luong, Kevin Vo, Jasmine Wong</p>
      </footer>
    </div>
  );
}

function ProtectedPage(props) {
  const currentUser = props.currentUser;
  //...determine if user is logged in
  if (currentUser === null) {
    return <Navigate to="/signin" />
  } else if (currentUser.uid === null) {
    return <p>Loading...</p>
  } else {
    return <Outlet />
  }
}

export default App;
