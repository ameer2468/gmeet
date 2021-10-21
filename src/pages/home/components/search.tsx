import React from 'react';
import Input from "../../../components/global/input";
import {useProject} from "../../../hooks/useProject";

const Search = () => {
    const projectHook = useProject();

    return (
        <div className="search">
            <h1>Search Projects</h1>
            <form>
                <Input name={'search'} useHook={projectHook} placeholder={'Search project by name or category'} maxWidth={'40rem'}/>
            </form>
        </div>
    );
};

export default Search;