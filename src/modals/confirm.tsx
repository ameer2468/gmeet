import React from 'react';
import Modal from "../components/modal";
import {useProject} from "../hooks/useProject";
import {usePosts} from "../hooks/usePosts";

interface props {
    submit: () => void;
    message: string;
    title: string;
}

const Confirm = ({submit, message, title}: props) => {

    const projectHook = useProject();
    const postHook = usePosts();
    const {projects} = projectHook;
    const {postsStore} = postHook;

    return (
        <Modal loading={
            projects.deleteLoading ||
            postsStore.deletePostLoading
        }
               submit={submit}
               title={title}
               buttonText={'Confirm'}>
                <p style={{margin: '2rem 0', fontSize: '1.6rem'}}>{message}</p>
        </Modal>
      );
    };

 export default Confirm;