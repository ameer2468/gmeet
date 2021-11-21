import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    projectValues,
    projectReducer,
    createProjectLoading,
    addProject,
    selectedProject, deleteLoading, userProjects, removeProject, joinLoading, projectArr
} from "../redux/projects/projectSlice";
import {
    createProject,
    deleteProject,
    getProject,
    getProjects,
    joinProjectRequest
} from "../redux/projects/services";
import {useUser} from "./useUser";
import {ActiveModal} from "../redux/modals/modalSlice";
import {project} from "../redux/projects/types";
import {v4 as uuidv4} from "uuid";
import { toast } from 'react-toastify';
import {projectLoading} from "../redux/projects/projectSlice";


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

    function toggleJoin(projectInfo: project) {
        dispatch(ActiveModal('JOIN'));
        dispatch(projectValues({...projectForm, why: '', speciality: ''}))
        dispatch(selectedProject(projectInfo))
    }

  function getUserProjects(user: string) {
        dispatch(projectLoading(true));
        return dispatch(getProject(user)).then((res: any) => {
            const {data} = res.payload;
            dispatch(userProjects(data.rows))
            dispatch(projectLoading(false));
        })
    }

    async function getSearchProjects(search: string) {
            await dispatch(getProjects(search))
    }

    function toggleRequests(modal: string) {
        dispatch(ActiveModal(modal))
    }


    function deleteProjectHandler() {
        dispatch(deleteLoading(true))
         return dispatch(deleteProject(projects.selectedProject.project_id))
             .then(() => {
                 dispatch(removeProject(projects.selectedProject.project_id))
                 dispatch(deleteLoading(false))
                 dispatch(ActiveModal(''))
                 dispatch(getProjects(''))
             })
             .catch(() => {
                 dispatch(deleteLoading(false))
             })
    }


 function joinProject() {
        if (projectForm.speciality.length === 0 || projectForm.why.length === 0) {
            return notify('Speciality and a reason to join are required')
        }
        dispatch(joinLoading(true))
        const data = {
            project_id: projects.selectedProject.project_id,
            user: userInfo.username,
            why: projectForm.why,
            speciality: projectForm.speciality
        }
        return dispatch(joinProjectRequest(data)).then(() => {
            dispatch(joinLoading(false))
            dispatch(ActiveModal(''))
            const updatedArr = projects.projects.map((value) => {
                return value.project_id === data.project_id ? {...value, requests: [...value.requests as [], data]} : value
            })
            dispatch(projectArr(updatedArr))
        })
            .catch(() => {
                dispatch(joinLoading(false));
            })
    }

    function projectDetails() {

    }


    function createProjectHandler() {
        if (projectForm.name.length === 0 || projectForm.name.length === 0) {
            return notify('A project name and description is required');
        }
      dispatch(createProjectLoading(true))
        const data = {
          project_id: uuidv4(),
          name: projectForm.name,
          description: projectForm.description,
          owner: userInfo.username
        }
      return dispatch(createProject(data)).then((res: any) => {
          const {data} = res.payload;
          const newProj = {
              project_id: data.project_id,
              name: data.name,
              description: data.description,
              owner: data.owner,
              requests: []
          }
          dispatch(addProject(newProj))
          dispatch(createProjectLoading(false))
          dispatch(ActiveModal(''))
          dispatch(projectValues({name: '', description: '', searchterm: ''}))
      })
    }

    return {
        onChange,
        notify,
        projects,
        projectForm,
        toggleJoin,
        joinProject,
        closeModal,
        toggleDelete,
        toggleRequests,
        getUserProjects,
        deleteProjectHandler,
        getSearchProjects,
        createProjectHandler,
    }
}