import {deleteAsync} from 'del';

export default function() {
  return deleteAsync('build/assets/files');
}
