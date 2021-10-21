import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {projectValues, projectReducer} from "../redux/projects/projectSlice";

export const useProject = () => {

    const projects = useAppSelector(projectReducer);
    const dispatch = useAppDispatch();


    function onChange(key: string, value: string) {
        return dispatch(projectValues(
            {...projects.projectForm, [key]: value}))
    }

    return {
        onChange,
        projects
    }
}