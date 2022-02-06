import { toast } from 'react-toastify';

export const notify = (text: string) => toast(text, {
    theme: 'dark',
    progressStyle: {
        backgroundColor: '#d9ff50'
    }
});
