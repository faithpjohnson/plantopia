import React, { useState, useEffect } from "react";
import NavBar from '../../components/NavBar/NavBar';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Grid } from "semantic-ui-react";
import SightingFeed from "../../components/SightingFeed/SightingFeed";
import SightingCard from "../../components/SightingCard/SightingCard";

export default function AllSightings(props) {
    



    return(
        <>
            <NavBar />
            <SightingFeed/>
            <SightingCard />
        </>
    )
}