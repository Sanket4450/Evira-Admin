import React, { useEffect } from "react"
import { Spinner } from "reactstrap";

const CustomSpinner = () => {
    return (
        <React.Fragment>
            <Spinner color="danger" style={{height:'16px',width:"16px"}} />
        </React.Fragment>
    )
}

export default CustomSpinner;