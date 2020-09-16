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
import AddIcon from '@/icons/AddIcon.vue'
import SettingsIcon from '@/icons/SettingsIcon.vue'
import InfoIcon from '@/icons/InfoIcon.vue'
import MoveToTodayIcon from '@/icons/MoveToTodayIcon.vue'
import RepeatIcon from '@/icons/RepeatIcon.vue'
import DragIcon from '@/icons/DragIcon.vue'

Vue.use(Vuetify)

const icons = {
  skip: SkipIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  breakdown: BreakdownIcon,
  complete: CompleteIcon,
  refresh: RefreshIcon,
  add: AddIcon,
  settings: SettingsIcon,
  info: InfoIcon,
  moveToToday: MoveToTodayIcon,
  repeat: RepeatIcon,
  drag: DragIcon,
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
