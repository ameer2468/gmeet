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
    projectRequests, editProjectLoading
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
import {deleteProjectThunk, editProjectThunk, getProjectsThunk, joinProjectsThunk} from "../redux/projects/thunks";
import {deleteCommentThunk, deletePostThunk} from "../redux/posts/thunks";
import {sendNotificationThunk} from "../redux/user/thunk";


export const useProject = () => {

    const projects = useAppSelector(projectReducer);
    const {projectForm} = projects;
    const dispatch = useAppDispatch();
    const userHook = useUser();
    const {userInfo, authUser} = userHook;
    const {followers} = authUser;
    const userFollowers = !authUser.followers ? '' : followers.map((value: any) => {
        return value.user_id;
    })


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

   async function editProject() {
        dispatch(editProjectLoading(true))
       await dispatch(editProjectThunk());
       notify('Project edited successfully')
       dispatch(ActiveModal(''));
       dispatch(editProjectLoading(false))
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
        return dispatch(acceptRequests(data = {
            user_id: data.user_id,
            id: data.id,
            project_id: projects.selectedProject.project_id,
            role: data.role

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

    function sendNotification(users: [], text: string) {
        dispatch(sendNotificationThunk(users, text))
    }


    function deleteProjectHandler() {
        dispatch(deleteLoading(true))
        dispatch(deleteProjectThunk(projects.selectedProject.project_id))
    }



function joinProject() {
        if (projectForm.role.length === 0 || projectForm.why.length === 0) {
            return notify('Speciality and a reason to join are required')
        }
        dispatch(joinLoading(true))
        dispatch(projectLoading(true))
        dispatch(requestsLoading(true))
        const data = {
            project_id: projects.selectedProject.project_id,
            user: authUser.username,
            user_id: authUser.attributes.sub,
            why: projectForm.why,
            role: projectForm.role,
            id: uuidv4()
        }
    dispatch(joinProjectsThunk(data)).then(() => {
        /*Notification code*/
       sendNotification(userFollowers, `${authUser.username} has requested to join your project ${projects.selectedProject.name}`)
    })
    dispatch(getProjectsThunk());
    notify('Request submitted successfully')
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
          user_id: userInfo.id,
          role: 'Founder'
        }
      return dispatch(createProject(data)).then((res) => {
          const {data} = res.payload as IcreateProject;
          sendNotification(userFollowers, `${authUser.username} has created a new project: ${data.name}`)
          const newProj = {
              project_id: data.project_id,
              name: data.name,
              description: data.description,
              owner: data.owner,
              user_id: data.user_id,
              role: data.role,
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
        editProject,
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
