<script>
import { GlTooltipDirective } from '@gitlab/ui';
import { __, sprintf } from '~/locale';

import UserAvatarLink from '~/vue_shared/components/user_avatar/user_avatar_link.vue';

export default {
  components: {
    UserAvatarLink,
  },
  directives: {
    GlTooltip: GlTooltipDirective,
  },
  props: {
    assignees: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      maxVisibleAssignees: 2,
      maxAssigneeAvatars: 3,
      maxAssignees: 99,
    };
  },
  computed: {
    countOverLimit() {
      return this.assignees.length - this.maxVisibleAssignees;
    },
    assigneesToShow() {
      if (this.assignees.length > this.maxAssigneeAvatars) {
        return this.assignees.slice(0, this.maxVisibleAssignees);
      }
      return this.assignees;
    },
    assigneesCounterTooltip() {
      const { countOverLimit, maxAssignees } = this;
      const count = countOverLimit > maxAssignees ? maxAssignees : countOverLimit;

      return sprintf(__('%{count} more assignees'), { count });
    },
    shouldRenderAssigneesCounter() {
      const assigneesCount = this.assignees.length;
      if (assigneesCount <= this.maxAssigneeAvatars) {
        return false;
      }

      return assigneesCount > this.countOverLimit;
    },
    assigneeCounterLabel() {
      if (this.countOverLimit > this.maxAssignees) {
        return `${this.maxAssignees}+`;
      }

      return `+${this.countOverLimit}`;
    },
  },
  methods: {
    avatarUrlTitle(assignee) {
      return sprintf(__('Avatar for %{assigneeName}'), {
        assigneeName: assignee.name,
      });
    },
  },
};
</script>
<template>
  <div class="issue-assignees">
    <user-avatar-link
      v-for="assignee in assigneesToShow"
      :key="assignee.id"
      :link-href="assignee.web_url"
      :img-alt="avatarUrlTitle(assignee)"
      :img-src="assignee.avatar_url"
      :img-size="24"
      class="js-no-trigger"
      tooltip-placement="bottom"
    >
      <span class="js-assignee-tooltip">
        <span class="bold d-block">{{ __('Assignee') }}</span> {{ assignee.name }}
        <span class="text-white-50">@{{ assignee.username }}</span>
      </span>
    </user-avatar-link>
    <span
      v-if="shouldRenderAssigneesCounter"
      v-gl-tooltip
      :title="assigneesCounterTooltip"
      class="avatar-counter"
      data-placement="bottom"
      >{{ assigneeCounterLabel }}</span
    >
  </div>
</template>
