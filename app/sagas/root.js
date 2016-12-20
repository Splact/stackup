import projectsSagas from './projects';

export default function* root() {
  yield [
    projectsSagas(),
  ];
}
