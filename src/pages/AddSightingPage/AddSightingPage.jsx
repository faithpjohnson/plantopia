import React, { useState, useEffect } from "react";
import NavBar from '../../components/NavBar/NavBar';
import AddSightingForm from "../../components/AddSightingForm/AddSightingForm";

export default function AddSightingPage(props) {
    
    return(
        <>
            <NavBar />
            <AddSightingForm />
        </>
    )
}

