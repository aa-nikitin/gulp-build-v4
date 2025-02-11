import { deleteAsync } from 'del';

export default function ({ config }) {
    return function clear() {
        const { rootBuild } = config;
        return deleteAsync(`${rootBuild}`);
    };
}
