import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { DSCHEditMain } from '../../components'
import { getDetailDSCH, resetDSCH } from "../../actions/dsch";

const DSCHEdit = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [dispatch])
    useEffect(() => {
        if (id === undefined) {
            dispatch(resetDSCH());
            dispatch(getDetailDSCH());
        } else {
            dispatch(getDetailDSCH(id));
        }
    }, [dispatch, id])

    return <DSCHEditMain keycode={id} mode={props.mode} />
}

export default DSCHEdit;