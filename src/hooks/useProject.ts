import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {projectValues, projectReducer, projectLoading} from "../redux/projects/projectSlice";
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import {useUser} from "./useUser";
import {ActiveModal, modalReducer} from "../redux/modals/modalSlice";

export const useProject = () => {

    const projects = useAppSelector(projectReducer);
    const URL = process.env.REACT_APP_API_URL;
    const userHook = useUser();
    const {userInfo} = userHook;

    const {projectForm} = projects;
    const dispatch = useAppDispatch();
    const modals = useAppSelector(modalReducer)
    const {activeModal} = modals;

    function onChange(key: string, value: string) {
        return dispatch(projectValues(
            {...projects.projectForm, [key]: value}))
    }

    const createProject = createAsyncThunk('projects/createproject', async () => {
        dispatch(projectLoading(true))
            return axios.post(`${URL}/projects`, {
                id: uuidv4(),
                name: projectForm.name,
                description: projectForm.description,
                owner: userInfo.username
            }).then(() => {
                dispatch(projectLoading(false))
                dispatch(ActiveModal(''))
            }).catch((err) => {
                dispatch(projectLoading(false))
                console.log(err)
            })
        })

    function closeModal() {
        return dispatch(projectValues(
            {}
        ))
    }

    return {
        onChange,
        projects,
        closeModal,
        createProject
    }
}