import React from 'react';
import Input from "../../../components/global/input";
import {useProject} from "../../../hooks/useProject";
import {useDebounce} from "use-debounce";

const Search = () => {
    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const [value] = useDebounce(projectForm.searchterm, 1000);
    const length = projectHook.projects.projects.length;

    return (
        <div className="search">
            <h1>Search Projects: {length}</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                projectHook.getSearchProjects(value)
            }
            }>
                <Input name={'searchterm'} useHook={projectHook} placeholder={'Search project by name or category'} maxWidth={'40rem'}/>
            </form>
        </div>
    );
};

export default Search;