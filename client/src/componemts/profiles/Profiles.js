import { Fragment } from "react";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfilesItem";
import { useSelector } from "react-redux";

const Profiles = () => {
  const profiles = useSelector((state) => state.profileData.profiles);

  return (
    <div>
      <section className="container">
        {false ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop" /> Browse and connect with
              developers
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem
                    key={profile._id}
                    profile={{
                      user: profile.user,
                      status: profile.status,
                      company: profile.company,
                      location: profile.location,
                      skills: profile.skills,
                      githubusername: profile.githubusername,
                    }}
                  />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          </Fragment>
        )}
      </section>
    </div>
  );
};

export default Profiles;
