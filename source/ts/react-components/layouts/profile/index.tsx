/**
 * @author Ahmed Serag
 * @date 2019-07-15
 * @description home Layout of the App.
 * @filename home.tsx
 */
import React from "react";
import UserProfile from "react-user-profile";
import { USER_CONTEXT } from "contexts/user-context";

export class Profile extends React.Component {
  state = { name: "" };

  render(): React.ReactNode {
    console.log(this.props)
    const photo =
      "https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599";
    const userName = "Harvey Specter";
    const location = "New York, USA";

    return (
      <div>
        <USER_CONTEXT.Consumer>
          {(value) => {
            const photo = "http://localhost:8000/storage/" + value.user?.avatar;
            const load = value.isLoading;
            const name = value.user?.first_name + " " + value.user?.last_name;
            const phone =
              value.user?.country?.calling_code + " " + value.user?.phone;

            return (
              <>
                {value.user && (
                  <div style={{ margin: "0 auto", width: "100%" }}>
                    <UserProfile
                      photo={photo}
                      userName={name}
                      initialLikesCount={phone}
                    />
                  </div>
                )}
              </>
            );
          }}
        </USER_CONTEXT.Consumer>
      </div>
    );
  }
}
