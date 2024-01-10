import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { WorkTypeEditMain } from '../../components'
import { getDetailLHCVI, resetLHCVI } from "../../actions/lhcvi";

const WorkTypeEdit = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [dispatch])
    useEffect(() => {
        if (id === undefined) {
            dispatch(resetLHCVI());
            dispatch(getDetailLHCVI());
        } else {
            dispatch(getDetailLHCVI(id));
        }
    }, [dispatch, id])



    return <WorkTypeEditMain keycode={id} mode={props.mode} />
}

export default WorkTypeEdit;