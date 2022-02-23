import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    projectValues,
    projectReducer,
    createProjectLoading,
    selectedProject,
    deleteLoading,
    joinLoading,
    requestsLoading,
    projectRequests, editProjectLoading,
} from "../redux/projects/projectSlice";
import {
    acceptRequests,
    getProjects,
    rejectJoinRequest, uploadProjectImage
} from "../redux/projects/services";
import {useUser} from "./useUser";
import {ActiveModal} from "../redux/modals/modalSlice";
import {project} from "../redux/projects/types";
import {v4 as uuidv4} from "uuid";
import {notify} from "../helpers/notify";
import {acceptRequest} from "../redux/types";
import {
    createProjectThunk,
    deleteProjectThunk,
    editProjectThunk,
    getProjectsThunk,
    joinProjectsThunk
} from "../redux/projects/thunks";
import {deleteCommentThunk, deletePostThunk} from "../redux/posts/thunks";
import {sendNotificationThunk} from "../redux/user/thunk";


export const useProject = () => {

    const projects = useAppSelector(projectReducer);
    const {projectForm} = projects;
    const dispatch = useAppDispatch();
    const userHook = useUser();
    const {authUser} = userHook;


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
        dispatch(projectValues({...projectForm, name: '', description: '', imageFile: '', imageSrc: ''}))
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
        dispatch(projectValues({...projectForm, why: '', speciality: '', gituser: ''}))
        dispatch(selectedProject(projectInfo))
        dispatch(joinLoading(false))
    }

   async function editProject() {
        dispatch(editProjectLoading(true))
       await dispatch(editProjectThunk());
       notify('Project edited successfully')
       dispatch(ActiveModal(''));
       dispatch(projectValues({...projectForm, imageFile: {}, imageSrc: ''}))
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

    function sendNotification(user_id: string, text: string) {
        dispatch(sendNotificationThunk(user_id, text))
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
        const data = {
            project_id: projects.selectedProject.project_id,
            user: authUser.username,
            user_id: authUser.attributes.sub,
            why: projectForm.why,
            role: projectForm.role,
            id: uuidv4()
        }
    dispatch(joinProjectsThunk(data)).then(() => {
           sendNotification(authUser.attributes.sub, `${authUser.username} has requested to join your project ${projects.selectedProject.name}`)
    })
    notify('Request submitted successfully')
    }

    async function createProjectHandler() {
        if (projectForm.name.length === 0 || projectForm.description.length === 0) {
            return notify('A project name and description is required');
        }
        if (projects.projects.find((value: any) => {
            return value.name === projectForm.name
        })) { return notify('Project name already exists') }
      dispatch(createProjectLoading(true))
        const data = {
          project_id: uuidv4(),
          name: projectForm.name,
          description: projectForm.description,
          owner: authUser.username,
          image: '',
          members: [],
          requests: [],
          user_id: authUser.attributes.sub,
          role: 'Founder'
        }
      await dispatch(uploadProjectImage({project_id: data.project_id, file: projectForm.imageFile}))
          .catch((err) => {
              notify(err)
          })
      await dispatch(createProjectThunk(data)).then(() => {
          sendNotification(authUser.attributes.sub, `${authUser.username} has created a new project: ${data.name}`)
          dispatch(getProjectsThunk(''));
          notify(`Project ${data.name} added successfully`);
          dispatch(createProjectLoading(false))
          dispatch(ActiveModal(''))
          dispatch(projectValues({...projectForm, name: '', description: '', searchterm: '', imageFile: {}, imageSrc: ''}))
         // dispatch(getProjectImage(data.project_id)).then((res: any) => {
         //      const {imageUrl} = res.payload.data;
         //      notify(`Project ${data.name} added successfully`);
         //      const updateProject = {...data, image: imageUrl}
         //      dispatch(addProject(updateProject))
         //  })
      }).catch((err) => {
          notify(err)
          dispatch(createProjectLoading(false))
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
