import React from 'react';
import Input from "../../../components/global/input";

const Search = () => {
    return (
        <div className="search">
            <h1>Search Projects</h1>
            <form>
                <Input placeholder={'Search project by name or category'} maxWidth={'40rem'}/>
            </form>
        </div>
    );
};

export default Search;