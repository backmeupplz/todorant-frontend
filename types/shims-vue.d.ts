// file: shim-tsx.d.ts
import Vue, { VNode } from 'vue'
import { ComponentRenderProxy } from '@vue/composition-api'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare function useVuex(
  namespace?: string,
  store?: Store<any>
): {
  useState: (
    namespace?: string,
    map: Array<string> | Object<string | function>
  ) => Object<ComputedRef>
  useGetters: (
    namespace?: string,
    map: Array<string> | Object<string>
  ) => Object<ComputedRef>
  useMutations: (
    namespace?: string,
    map: Array<string> | Object<string | function>
  ) => Object
  useActions: (
    namespace?: string,
    map: Array<string> | Object<string | function>
  ) => Object
}
