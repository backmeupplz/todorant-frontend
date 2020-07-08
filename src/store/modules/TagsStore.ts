import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Tag } from '@/models/Tag'
import { TagColors } from '@/models/TagColors'

@Module({ namespaced: true, name: 'TagsStore' })
export default class TagsStore extends VuexModule {
  tags: Tag[] = []
  tagColors: TagColors = {}

  @Mutation
  setTags(tags: Tag[]) {
    this.tags = tags
  }

  @Mutation
  setTagColors(tagColors: TagColors) {
    this.tagColors = tagColors
  }
}
