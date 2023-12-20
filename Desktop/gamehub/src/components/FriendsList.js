import React from "react";
import { useEffect, useState } from "react";
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush, get, update } from "firebase/database";

import { FriendQuizResults } from "./FriendQuizResults";

import { useParams, Link } from "react-router-dom";
import { upload } from "@testing-library/user-event/dist/upload";

export function FriendsList(props) {
  const currentUser = props.currentUser;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const matchedUsers = props.matchedUsers;


  const saveFriendStatus = (friend) => {
    const friendStatus = null;
    const db = getDatabase();
    const friendsBranchRef = ref(db, `allUsers/${currentUser.uid}/friendsList`)

    const data = {
      friendUid: friend.uid,
      friendDisplayName: friend.displayName,
      friendQuizResults: friend.mostRecentGameArray,
      friendStatus: null,
    }
    firebasePush(friendsBranchRef, data)
    .then(() => {
      console.log("Data saved successfully");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
  }

  useEffect(() => {
    const db = getDatabase();
    const allUsersRef = ref(db, 'allUsers');
    onValue(allUsersRef, (snapshot) => {
      const allUsersData = snapshot.val();
      const filteredUsers = Object.entries(allUsersData)
        .filter(([userId, userData]) => {
            return userId !== currentUser.uid && userData.favoriteGames;
        })
        .map(([userId, userData]) => {
            return {
                userId,
                displayName: Object.values(userData)[0],
                quizResults: userData.favoriteGames,
            };
        });
      setFilteredUsers(filteredUsers);
      console.log();
      console.log("filteredUsers: ", filteredUsers);
      const friendsBranchRef = ref(db, `allUsers/${currentUser.uid}`);
      onValue(friendsBranchRef, (snapshot) => {
        const data = snapshot.val();
        setFriendsList(data.FriendsList);
      } )

      for (var i = 0, l = filteredUsers.length; i < l; i++) {
        const userResults = filteredUsers[i].quizResults;
        const mostRecentGameArray = Object.values(userResults)[Object.keys(userResults).length - 1];
        filteredUsers[i].mostRecentGameArray = mostRecentGameArray;
      }
    })
  }, [currentUser.uid]);


  function handleAddFriend(friendUserID) {
    const db = getDatabase();
    const friendsBranchRef = ref(db, `allUsers/${currentUser.uid}`);
    console.log(get(friendsBranchRef), "get");
    get(friendsBranchRef).then(snapshot => {
      console.log(snapshot.val(), "snapshot");
      const newFriendsList = [...friendsList, friendUserID];
      setFriendsList(newFriendsList);
      update(friendsBranchRef, {FriendsList:newFriendsList});
    })
  }

  function handleRemoveFriend(friendUserID) {
    const db = getDatabase();
    const friendsBranchRef = ref(db, `allUsers/${currentUser.uid}`);
    console.log(get(friendsBranchRef), "get");
    get(friendsBranchRef).then(snapshot => {

      const newFriendsList = friendsList.filter((friend) => {
        return friend !== friendUserID;
      })
      console.log(newFriendsList);
      setFriendsList(newFriendsList);
      update(friendsBranchRef, {FriendsList:newFriendsList});

    })
  }


  const filteredUsersContent = filteredUsers.map((userObj) => {
    if(!friendsList.includes(userObj.userId)) {
      return <FriendCard key={userObj.userId} user={userObj} handleClick={handleAddFriend} friend={false} matchedUsers={matchedUsers} />
    }
  });
  const usersFriends = filteredUsers.map((userObj) => {
    console.log(userObj);
    if(friendsList.includes(userObj.userId)) {
      console.log("pass", userObj);
      return <FriendCard key={userObj.userId} user={userObj} friend={true} handleClick={handleRemoveFriend} matchedUsers={matchedUsers} />
    }
  });

  return (
    <div>
      <div className="row m-3">
        <h2>Friends:</h2>
        {usersFriends}
        <h2>All users:</h2>
        {filteredUsersContent}
      </div>
    </div>
  );
}

function FriendCard(props) {
  const user = props.user;
  const matchedUsers = props.matchedUsers;

  const [isFriend, setIsFriend] = useState(props.friend);
  console.log(props.friend);
  let addFriend = "Add Friend";
  if(props.friend) {
    console.log("is it true");
    addFriend = "Remove Friend";
  }
  const handleCallback = () => {
    props.handleClick(user.userId);
  }

  return (
    <div className="d-flex col-md-6 col-xl-3" >
      <div className="card mb-4 color-card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-auto col-xl-12">
              <img className="pb-3" src="/img/profile-pic.png" alt="profile icon" />
            </div>
            <div className="col-sm" key={user.uid}>
              <h2 className="card-title">{user.displayName+""}</h2>
              <Link
                  to={"/quiz-results/"+user.userId}
                  className="btn friend-actions me-1 mb-1"
                  element={ <FriendQuizResults matchedUsers={matchedUsers} /> }>
                  Quiz Results
              </Link>
              <button className="btn friend-actions me-1 mb-1" onClick={handleCallback}>{addFriend}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
