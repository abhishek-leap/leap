import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LeapLogo } from "images/logo.svg";

const Logo = props => (
  <Link to="/">
    <View className={`Logo ${props.classes || ""}`}>
      {props.full && <LeapLogo alt="Logo" width={props.full ? null : "59px"} />}

      {!props.full && <View />}
    </View>
  </Link>
);

export default Logo;