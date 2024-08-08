import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../utils/MetaData";

import { Link, Navigate } from "react-router-dom";
import "./Account.css";
import { STATUSES } from "../../store/statusEnums";

const Profile = () => {
  const { user, status, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }
  }, [isAuthenticated]);
  return (
    <Fragment>
      {status === STATUSES.LOADING ? (
        <h1>h1</h1>
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <div className="user_account_profile_image">
                <img src={user.avatar.url} alt={user.name} />
              </div>
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
