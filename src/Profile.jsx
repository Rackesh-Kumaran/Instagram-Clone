import React, { useState,useEffect } from 'react'
import axios from 'axios'




function Profile() {

    const [profile, setProfile] = useState(null);

    const [followers,setFollowers] = useState([]);

    const [unfollowed,setUnfollowed] = useState(0);


    useEffect(() => {
      axios
        .get("http://localhost:3000/profile")
        .then((data) => setProfile(data.data))
        .catch((err) => console.log(err));

      axios
        .get("http://localhost:3000/followers")
        .then((data) => setFollowers(data.data))
        .catch((err) => console.log(err));
    }, [unfollowed]);

    function HandleOnChange(e){
        setProfile(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const handleUpdate = async ()=>{
        axios.put("http://localhost:3000/profile",profile)
        .then(console.log("Updated"))
        .catch(err => console.log(err))
    }

    const handleUnFollow = async (id) =>{
        axios.delete(`http://localhost:3000/followers/${id}`)
        .then(alert("unfollowed"))
        .then(setUnfollowed(!unfollowed))
        .catch(err => console.log(err))
    }



  return (
    <div className="m-5">
      {profile ? (
        <div>
          <img
            src={profile.profile_pic}
            alt="profile-pic"
            className="profile rounded-circle"
          />
          <h5>{profile.username}</h5>

          <input
            type="text"
            value={profile.username}
            name="username"
            className="form-control my-4"
            onChange={HandleOnChange}
          />

          <input
            type="text"
            name="profile_pic"
            value={profile.profile_pic}
            className="form-control"
            onChange={HandleOnChange}
          />

          <button className="btn btn-primary my-4" onClick={handleUpdate}>
            update
          </button>
        </div>
      ) : (
        <div>Loading Profile</div>
      )}

      {followers.length > 0 ?(
        followers.map(follower => (
            <div key={follower.id} className='d-flex my-2'>
                {follower.username}
                <button className='btn btn-secondary ms-auto' onClick={()=>{handleUnFollow(follower.id)}}>Un Follow</button>
            </div>
        ))
      ):(
            <div>Loading Followers</div>
      )}

    </div>
  );
}

export default Profile