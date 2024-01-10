import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { WorkOderEditMain } from '../../components'
import { getDetailTTCVI, resetTTCVI } from "../../actions/ttcvi";

const WorkOderEdit = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [dispatch])
    useEffect(() => {
        if (id === undefined) {
            dispatch(resetTTCVI());
            dispatch(getDetailTTCVI());
        } else {
            dispatch(getDetailTTCVI(id));
        }
    }, [dispatch, id])

    return <WorkOderEditMain keycode={id} mode={props.mode} />
}

export default WorkOderEdit;