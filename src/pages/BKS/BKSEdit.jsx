import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { BKSEditMain } from '../../components'
import { getDetailBKS, resetBKS } from "../../actions/bks";

const BKSEdit = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [dispatch])
    useEffect(() => {
        if (id === undefined) {
            dispatch(resetBKS());
            dispatch(getDetailBKS());
        } else {
            dispatch(getDetailBKS(id));
        }
    }, [dispatch, id])

    return <BKSEditMain keycode={id} mode={props.mode} />
}

export default BKSEdit;