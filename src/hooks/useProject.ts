import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {projectValues, projectReducer, projectLoading} from "../redux/projects/projectSlice";
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import {useUser} from "./useUser";
import {ActiveModal} from "../redux/modals/modalSlice";
import {addProject} from '../redux/projects/projectSlice'

export const useProject = () => {

    const projects = useAppSelector(projectReducer);
    const URL = process.env.REACT_APP_API_URL;
    const userHook = useUser();
    const {userInfo} = userHook;

    const {projectForm} = projects;
    const dispatch = useAppDispatch();

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
            }).then((res) => {
                const newProj = {
                    id: res.data.id,
                    name: res.data.name,
                    description: res.data.description,
                    owner: res.data.owner
                }
                dispatch(projectLoading(false))
                dispatch(ActiveModal(''))
                dispatch(addProject(newProj))
                dispatch(projectValues({}))
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