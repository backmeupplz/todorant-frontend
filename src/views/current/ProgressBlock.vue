<template lang="pug">
div
  .epic-box(v-if='epics.length')
    v-list-item(v-for='(epic, i) in epics', :key='i')
      .digit.left(:style='{ color: epic.color ? epic.color : "#ff641a" }') {{ epicProgress(epic).completed }}
      .epic-container
        .epic-name(:style='{ color: epic.color ? epic.color : "#ff641a" }') {{ `#${epic.tag}` }}
        Progress(
          :completed='epicProgress(epic).completed',
          :total='epicProgress(epic).total',
          :color='epic.color ? epic.color : "#ff641a"'
        )
      .digit.right(:style='{ color: epic.color ? epic.color : "#ff641a" }') {{ epicProgress(epic).total }}
      v-btn.margin-left-button(
        text,
        icon,
        :loading='todoUpdating',
        @click='completeEpic(epic)',
        v-if='epic.epicGoal == epic.epicPoints',
        :color='epic.color ? epic.color : "#ff641a"'
      )
        v-icon check
  v-list-item
    .progress-container
      .digit.left {{ todosCount - incompleteTodosCount }}
      Progress(
        :completed='todosCount - incompleteTodosCount',
        :total='todosCount'
      )
      .digit.right {{ todosCount }}
      IconButton.margin-left-button.rotated-refresh-button(
        :loading='loading',
        :click='updateTodo',
        color='#ff641a',
        name='$refresh'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Progress from '@/components/Progress.vue'
import { namespace } from 'vuex-class'
import { Tag } from '@/models/Tag'
import IconButton from '@/icons/IconButton.vue'

const TagsStore = namespace('TagsStore')

@Component({
  components: {
    Progress,
    IconButton,
  },
})
export default class ProgressBlock extends Vue {
  @Prop({ required: true }) updateTodo!: () => void
  @Prop({ required: true }) completeEpic!: (epic: Tag) => void
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) todosCount!: number
  @Prop({ required: true }) incompleteTodosCount!: number

  @TagsStore.State tags!: Tag[]

  get epics() {
    return this.tags.filter((t) => t.epic)
  }

  epicProgress(epic: Tag) {
    if (!epic.epicPoints || !epic.epicGoal) {
      return {
        total: 0,
        completed: 0,
      }
    }
    return {
      total: epic.epicGoal,
      completed: epic.epicPoints,
    }
  }
}
</script>

<style>
.epic-box {
  margin-bottom: 20px;
}
.progress-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
}
.digit {
  color: #ff641a;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
}
.digit.left {
  margin-right: 8px;
}
.digit.right {
  margin-left: 8px;
}
.margin-left-button {
  margin-left: 8px;
}
.epic-container {
  flex: 1;
}
.epic-name {
  text-align: center;
  margin-bottom: 4px;
}
.rotated-refresh-button {
  transform: rotate(45deg);
}
</style>
