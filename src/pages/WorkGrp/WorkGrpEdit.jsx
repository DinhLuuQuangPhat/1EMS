import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { WorkGrpEditMain } from '../../components'
import { getDetailNCVI, resetNCVI } from "../../actions/ncvi";

const WorkGrpEdit = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [dispatch])
    useEffect(() => {
        if (id === undefined) {
            dispatch(resetNCVI());
            dispatch(getDetailNCVI());
        } else {
            dispatch(getDetailNCVI(id));
        }
    }, [dispatch, id])

    return <WorkGrpEditMain keycode={id} mode={props.mode} />
}

export default WorkGrpEdit;