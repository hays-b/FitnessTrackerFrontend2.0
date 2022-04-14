import React, { useState } from "react";
import {} from "../api";
import useAuth from "../hooks/useAuth";

const UpdateActivity = ({routine, activity}) => {
    const {} = useAuth();

    return (
        <>
          <form>
          <button type="submit">Update Activity</button>
          </form>
          </>
    )
}

export default UpdateActivity