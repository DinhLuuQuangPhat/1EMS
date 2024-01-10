import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { WorkPrcsEditMain } from '../../components'
import { getDetailTCCVI, resetTCCVI } from "../../actions/tccvi";

const WorkPrcsEdit = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id === undefined) {
            dispatch(resetTCCVI());
            dispatch(getDetailTCCVI());
        } else {
            dispatch(getDetailTCCVI(id));
        }
    }, [dispatch, id])



    return <WorkPrcsEditMain keycode={id} mode={props.mode} />
}

export default WorkPrcsEdit;