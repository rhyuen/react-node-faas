import React, { Component } from "react";
import axios from "axios";

class Me extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    axios
      .get("/api/user", { useCredentials: true })
      .then(res => {
        console.log("ME");
        console.log(res.data.data);
        const payload = res.data.data;

        this.setState({
          data: payload[0]
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { onLogout } = this.props;
    const { email, password, user_id } = this.state.data;
    return (
      <div>
        <h1>"hi, it's me."</h1>
        <h1>murp</h1>
        <p>email:{email}</p>
        <p>password:{password}</p>
        <p>user_id:{user_id}</p>
        <p>
          <button onClick={onLogout}>Log out</button>
        </p>
      </div>
    );
  }
}

export default Me;
