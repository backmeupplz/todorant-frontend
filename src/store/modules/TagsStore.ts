import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Tag } from '@/models/Tag'
import { TagColors } from '@/models/TagColors'
import { db } from '@/utils/db'
import { v4 } from 'uuid'
import { serverBus } from '@/main'

@Module({ namespaced: true, name: 'TagsStore' })
export default class TagsStore extends VuexModule {
  searchTags = new Set()
  tagColors: TagColors = {}

  lastSyncDate: Date | undefined = undefined

  @Action({ rawError: true })
  async onObjectFromServer({
    objects,
    pushBack,
    completeSync,
  }: {
    objects: Tag[]
    pushBack: (objects: Tag[]) => Promise<Tag[]>
    completeSync: () => void
  }) {
    // Modify dates
    const tagsChangedOnServer = objects
    await Promise.all(
      tagsChangedOnServer.map(async (tag) => {
        tag.updatedAt = new Date(tag.updatedAt)
        tag.createdAt = new Date(tag.createdAt)
        if (
          tag._id &&
          !tag._tempSyncId &&
          !(await getTagById(tag._id, false))
        ) {
          tag._tempSyncId = v4()
        }
      })
    )
    // Get variables
    const serverTagsMap = tagsChangedOnServer.reduce((p, c) => {
      if (c._id) {
        p[c._id] = c
      }
      return p
    }, {} as { [index: string]: Tag })
    const tagsChangedLocally = await (this.lastSyncDate
      ? db.tags.filter((tag) => tag.updatedAt > this.lastSyncDate!).toArray()
      : db.tags.toArray())
    // Pull
    await db.transaction('rw', db.tags, async () => {
      for (const serverTag of tagsChangedOnServer) {
        if (!serverTag._id) {
          continue
        }
        let localTag = await getTagById(serverTag._id, false)
        if (localTag) {
          if (localTag.updatedAt < serverTag.updatedAt) {
            const newTag = Object.assign(localTag, serverTag)
            db.tags.put(newTag)
          }
        } else {
          const newTag = {
            ...serverTag,
          }
          db.tags.put(newTag)
        }
      }
    })
    // Push
    const tagsToPush = tagsChangedLocally.filter((tag) => {
      if (!tag._id) {
        return true
      }
      const serverTag = serverTagsMap[tag._id]
      if (serverTag) {
        return tag.updatedAt > serverTag.updatedAt
      } else {
        return true
      }
    })
    if (!tagsToPush.length) {
      // Complete sync
      completeSync()
      return
    }
    const savedPushedTags = await pushBack(
      tagsToPush.map((v) => ({ ...v })) as any
    )
    savedPushedTags.forEach((tag) => {
      tag.updatedAt = new Date(tag.updatedAt)
      tag.createdAt = new Date(tag.createdAt)
    })
    db.transaction('rw', db.tags, async () => {
      for (const tag of savedPushedTags) {
        if (!tag._tempSyncId) {
          continue
        }
        const localTag = await getTagById(tag._tempSyncId, true)
        if (localTag) {
          const newTag = Object.assign(localTag, tag)
          db.tags.put(newTag)
        }
      }
    })
    // Complete sync
    completeSync()
  }

  @Action
  async addTags(tagsText: string[]) {
    const tagsInDb = await db.tags.where('tag').anyOf(tagsText).toArray()
    const tagsTextInDb = tagsInDb.map((tag) => tag.tag)
    const tagsTextToAdd = tagsText.filter((tag) => !tagsTextInDb.includes(tag))
    const tagsToAdd = tagsTextToAdd.map((tag) => createTag(tag))
    await db.tags.bulkPut(tagsToAdd)
  }

  @Action
  async deleteTag(tag: Tag) {
    tag.deleted = true
    tag.updatedAt = new Date()
    db.tags.put(tag)
  }

  @Action
  async deleteAllTags() {
    const allTags = (await db.tags.toArray()).map((tag) => {
      tag.updatedAt = new Date()
      tag.deleted = true
      return tag
    })
    await db.tags.bulkPut(allTags)
  }

  @Action
  async editTag({
    tag,
    color,
    epic,
    epicGoal,
    epicCompleted,
    newEpicName,
  }: {
    tag: Tag
    color?: string
    epic?: boolean
    epicGoal?: number
    epicCompleted?: boolean
    newEpicName?: string
  }) {
    tag.updatedAt = new Date()
    tag.color = color || undefined
    tag.epic = epic || false
    tag.epicCompleted = epicCompleted || false
    tag.epicGoal = epicGoal || 0
    // Check if completed
    if (epicCompleted) {
      tag.epicPoints = 0
    }
    if (newEpicName && !!newEpicName.match(/^[\S]+$/)) {
      await changeTagInTodos(`#${tag.tag}`, `#${newEpicName}`)
      tag.tag = newEpicName
    }
    await db.tags.put(tag)
  }

  @Mutation
  setTagColors(tagColors: TagColors) {
    this.tagColors = tagColors
  }
}

async function changeTagInTodos(tag: string, newName: string) {
  const re = new RegExp(tag, 'g')
  await db.transaction('rw', db.todos, async () => {
    const replacedTodos = (await db.todos.toArray()).map((todo) => {
      if (re.test(todo.text)) {
        todo.updatedAt = new Date()
        todo.text = todo.text.replace(re, newName)
      }
      return todo
    })
    await db.todos.bulkPut(replacedTodos)
  })
}

export async function getTagById(id: string, temp: boolean) {
  return temp
    ? await db.tags.get({ _tempSyncId: id })
    : await db.tags.get({ _id: id })
}

function createTag(tagText: string) {
  return {
    _tempSyncId: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    tag: tagText,
    color: undefined,
    numberOfUses: 0,
    epic: false,
    epicGoal: 0,
    epicCompleted: false,
    epicPoints: 0,
  } as Tag
}
