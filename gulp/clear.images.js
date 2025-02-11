import { deleteAsync } from 'del';

export default function ({ config }) {
    return function clearImages() {
        const { rootBuild } = config;
        return deleteAsync(`${rootBuild}/assets/files`);
    };
}
