import Vue from 'vue';
import Pagination from '@gitlab-org/gitlab-ui/dist/components/base/pagination';
import progressBar from '@gitlab-org/gitlab-ui/dist/components/base/progress_bar';
import modal from '@gitlab-org/gitlab-ui/dist/components/base/modal';
import loadingIcon from '@gitlab-org/gitlab-ui/dist/components/base/loading_icon';

import dModal from '@gitlab-org/gitlab-ui/dist/directives/modal';
import dTooltip from '@gitlab-org/gitlab-ui/dist/directives/tooltip';

Vue.component('gl-pagination', Pagination);
Vue.component('gl-progress-bar', progressBar);
Vue.component('gl-ui-modal', modal);
Vue.component('gl-loading-icon', loadingIcon);

Vue.directive('gl-modal', dModal);
Vue.directive('gl-tooltip', dTooltip);