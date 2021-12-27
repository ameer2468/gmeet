import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    projectValues,
    projectReducer,
    createProjectLoading,
    addProject,
    selectedProject,
    deleteLoading,
    joinLoading,
    requestsLoading,
    projectRequests
} from "../redux/projects/projectSlice";
import {
    acceptRequests,
    createProject,
    getProjects,
    rejectJoinRequest
} from "../redux/projects/services";
import {useUser} from "./useUser";
import {ActiveModal} from "../redux/modals/modalSlice";
import {project} from "../redux/projects/types";
import {v4 as uuidv4} from "uuid";
import {notify} from "../helpers/notify";
import {projectLoading} from "../redux/projects/projectSlice";
import {acceptRequest, IcreateProject} from "../redux/types";
import {deleteProjectThunk, getProjectsThunk, joinProjectsThunk} from "../redux/projects/thunks";
import {deleteCommentThunk, deletePostThunk} from "../redux/posts/thunks";


export const useProject = () => {

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

    function toggleCreateProject() {
        dispatch(ActiveModal('ADD_PROJECT'))
        dispatch(projectValues({...projectForm, name: '', description: ''}))
    }

    function toggleDelete(projectInfo: project) {
        dispatch(ActiveModal('DELETE_PROJECT'))
        dispatch(selectedProject(projectInfo))
    }

    function toggleEditProject(projectData: project) {
        dispatch(ActiveModal('EDIT_PROJECT'));
        dispatch(selectedProject(projectData))
        dispatch(projectValues({...projectForm, name: projectData.name, description: projectData.description}))
    }

    function toggleJoin(projectInfo: project) {
        dispatch(ActiveModal('JOIN'));
        dispatch(projectValues({...projectForm, why: '', speciality: ''}))
        dispatch(selectedProject(projectInfo))
        dispatch(joinLoading(false))
    }

  // function getUserProjects(user: string) {
  //       dispatch(projectLoading(true));
  //       return dispatch(getProject(user)).then((res: any) => {
  //           const {data} = res.payload;
  //           dispatch(userProjects(data.rows))
  //           dispatch(projectLoading(false));
  //       })
  //   }

    async function getSearchProjects(search: string) {
            await dispatch(getProjects(search))
    }

    function toggleRequests(modal: string) {
        dispatch(ActiveModal(modal))
    }

    function rejectHandler(id: string) {
        dispatch(requestsLoading(true));
        return dispatch(rejectJoinRequest(id)).then(() => {
            dispatch(projectRequests(projects.projectRequests.filter((value) => {
                return value.id !== id;
            })))
            dispatch(requestsLoading(false))
            notify('User rejected successfully')
        }).catch(() => {
            notify('an error has occurred');
        })
    }

    function deleteCommentHandler(id: string, username: string ) {
        dispatch(deleteCommentThunk(id, username))
    }

    function deletePostHandler(id: string) {
       dispatch(deletePostThunk(id));
    }

    function acceptHandler(data: acceptRequest) {
        dispatch(requestsLoading(true));
        const pullProject = projects.projects.filter((value) => {
            return value.project_id === data.project_id;
        })
        const membersArr = pullProject[0].members;
        const newMembers = [membersArr,data.members].toString()
        return dispatch(acceptRequests(data = {
            id: data.id,
            project_id: projects.selectedProject.project_id,
            members: newMembers
        })).then(() => {
            notify('Member successfully added to project!')
            dispatch(requestsLoading(false));
            dispatch(projectRequests(projects.projectRequests.filter((value: any) => {
                return value.project_id !== data.project_id
            })))
        }).catch((err) => {
            notify(err)
        })
    }


    function deleteProjectHandler() {
        dispatch(deleteLoading(true))
        dispatch(deleteProjectThunk(projects.selectedProject.project_id))
    }


function joinProject() {
        if (projectForm.speciality.length === 0 || projectForm.why.length === 0) {
            return notify('Speciality and a reason to join are required')
        }
        dispatch(joinLoading(true))
        dispatch(projectLoading(true))
        dispatch(requestsLoading(true))
        const data = {
            project_id: projects.selectedProject.project_id,
            user: userInfo.username,
            why: projectForm.why,
            speciality: projectForm.speciality,
            id: uuidv4()
        }
        dispatch(joinProjectsThunk(data, projects.projects, notify))
        dispatch(getProjectsThunk());
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
          owner: userInfo.username,
          members: [userInfo.username]
        }
      return dispatch(createProject(data)).then((res) => {
          const {data} = res.payload as IcreateProject;
          const newProj = {
              project_id: data.project_id,
              name: data.name,
              members: data.members,
              description: data.description,
              owner: data.owner,
              requests: []
          }
          notify(`Project ${data.name} added successfully`);
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
        rejectHandler,
        toggleDelete,
        toggleRequests,
        toggleEditProject,
        toggleCreateProject,
        deleteCommentHandler,
        deleteProjectHandler,
        deletePostHandler,
        getSearchProjects,
        acceptHandler,
        createProjectHandler,
    }
}
