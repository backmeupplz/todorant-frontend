import Vue, { VueConstructor } from 'vue'
import Vuetify from 'vuetify'
import { VuetifyIcons } from 'vuetify/types/services/icons'
import 'vuetify/dist/vuetify.min.css'
import DeleteIcon from '@/icons/DeleteIcon.vue'
import EditIcon from '@/icons/EditIcon.vue'
import SkipIcon from '@/icons/SkipIcon.vue'
import BreakdownIcon from '@/icons/BreakdownIcon.vue'
import CompleteIcon from '@/icons/CompleteIcon.vue'
import RefreshIcon from '@/icons/RefreshIcon.vue'

Vue.use(Vuetify)

const icons = {
  skip: SkipIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  breakdown: BreakdownIcon,
  complete: CompleteIcon,
  refresh: RefreshIcon,
} as { [index: string]: VueConstructor<Vue> }
const iconsValues = Object.keys(icons).reduce((p, c) => {
  p[c] = {
    component: icons[c],
  }
  return p
}, {} as Partial<VuetifyIcons>)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: iconsValues,
  },
})
