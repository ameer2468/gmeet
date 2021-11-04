import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    projectValues,
    projectReducer,
    createProjectLoading,
    addProject,
    selectedProject, deleteLoading, userProjects, removeProject
} from "../redux/projects/projectSlice";
import {createProject, deleteProject, getProject, getProjects} from "../redux/projects/services";
import {useUser} from "./useUser";
import {ActiveModal} from "../redux/modals/modalSlice";
import {project} from "../redux/projects/types";
import {v4 as uuidv4} from "uuid";
import { toast } from 'react-toastify';
import {projectLoading} from "../redux/projects/projectSlice";
import {FormEvent} from "react";


export const useProject = () => {

    const notify = (text: string) => toast(text, {
        theme: 'dark',
        progressStyle: {
            backgroundColor: '#4ad58b'
        }
    });

    const projects = useAppSelector(projectReducer);
    const {projectForm} = projects;
    const dispatch = useAppDispatch();
    const userHook = useUser();
    const {userInfo} = userHook;

    function onChange(key: string, value: string) {
        return dispatch(projectValues(
            {...projects.projectForm, [key]: value}))
    }

    function closeModal() {
        return dispatch(projectValues(
            {name: '', description: ''}
        ))
    }

    function toggleDelete(projectInfo: project) {
        dispatch(ActiveModal('DELETE_PROJECT'))
        dispatch(selectedProject(projectInfo))
    }

    async function getUserProjects(user: string) {
        dispatch(projectLoading(true));
        return await dispatch(getProject(user)).then((res: any) => {
            const {data} = res.payload;
            dispatch(userProjects(data.rows))
            dispatch(projectLoading(false));
        })
    }

    async function getSearchProjects(search: string) {
            dispatch(getProjects(search));
    }


    async function deleteProjectHandler() {
        dispatch(deleteLoading(true))
         return await dispatch(deleteProject(projects.selectedProject.id))
             .then(() => {
                 dispatch(removeProject(projects.selectedProject.id))
                 dispatch(deleteLoading(false))
                 dispatch(ActiveModal(''))
                 dispatch(getProjects(''))
             })
             .catch((err) => {
                 dispatch(deleteLoading(false))
             })
    }


    async function createProjectHandler() {

        if (projectForm.name.length === 0 || projectForm.name.length === 0) {
            return notify('A project name and description is required');
        }
      dispatch(createProjectLoading(true))
        const data = {
          id: uuidv4(),
          name: projectForm.name,
          description: projectForm.description,
          owner: userInfo.username
        }
      return await dispatch(createProject(data)).then((res: any) => {
          const {data} = res.payload;
          const newProj = {
              id: data.id,
              name: data.name,
              description: data.description,
              owner: data.owner
          }
          dispatch(addProject(newProj))
          dispatch(createProjectLoading(false))
          dispatch(ActiveModal(''))
          dispatch(projectValues({name: '', description: ''}))
      })
    }

    return {
        onChange,
        projects,
        closeModal,
        toggleDelete,
        getUserProjects,
        deleteProjectHandler,
        getSearchProjects,
        createProjectHandler,
    }
}