import PlaygroundReleaseDiaryIndex from './components/PlaygroundReleaseDiaryIndex';
import PlaygroundReleaseDiaryDateIndex from './components/PlaygroundReleaseDiaryDateIndex';
import PlaygroundReleaseDiaryDatePage from './components/PlaygroundReleaseDiaryDatePage';
import PlaygroundReleaseDiaryNameIndex from './components/PlaygroundReleaseDiaryNameIndex';
import PlaygroundReleaseDiaryNamePage from './components/PlaygroundReleaseDiaryNamePage';
import PlaygroundReleaseDiaryBackLink from './components/PlaygroundReleaseDiaryBackLink';

export default ({Vue}) => {
  Vue.component('PlaygroundReleaseDiaryIndex', PlaygroundReleaseDiaryIndex);
  Vue.component('PlaygroundReleaseDiaryDateIndex', PlaygroundReleaseDiaryDateIndex);
  Vue.component('PlaygroundReleaseDiaryDatePage', PlaygroundReleaseDiaryDatePage);
  Vue.component('PlaygroundReleaseDiaryNameIndex', PlaygroundReleaseDiaryNameIndex);
  Vue.component('PlaygroundReleaseDiaryNamePage', PlaygroundReleaseDiaryNamePage);
  Vue.component('PlaygroundReleaseDiaryBackLink', PlaygroundReleaseDiaryBackLink);
};
