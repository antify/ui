<template></template>

<!--<script lang="ts" setup>-->
<!--defineOptions({ inheritAttrs: false });-->
<!--// TODO:: fix ts errors-->
<!--// @ts-nocheck-->
<!--import {ref, computed, onUnmounted, watch} from 'vue';-->
<!--import {useEditor, EditorContent} from '@tiptap/vue-3';-->
<!--import StarterKit from '@tiptap/starter-kit';-->
<!--import Underline from '@tiptap/extension-underline';-->
<!--import Heading from '@tiptap/extension-heading';-->
<!--import AntButton from './AntButton.vue';-->
<!--import AntSkeleton from '../AntSkeleton.vue';-->
<!--import {generateId} from '../../utils/helper';-->

<!--const emit = defineEmits(['update:data']);-->

<!--const props =-->
<!--  defineProps<{-->
<!--    id?: string;-->
<!--    data?: string;-->
<!--    label?: string;-->
<!--    description?: string;-->
<!--    validator?: Function;-->
<!--    errors?: string[];-->
<!--    isError?: boolean;-->
<!--    loading?: boolean;-->
<!--    disabled?: boolean;-->
<!--  }>();-->

<!--const _data = computed({-->
<!--  get: () => {-->
<!--    return props.data || '';-->
<!--  },-->
<!--  set: (val) => {-->
<!--    emit('update:data', val);-->
<!--  },-->
<!--});-->

<!--const _id = ref(props.id || generateId(40));-->
<!--const editor = ref(-->
<!--  useEditor({-->
<!--    content: _data.value,-->
<!--    extensions: [-->
<!--      StarterKit,-->
<!--      Underline,-->
<!--      Heading.configure({-->
<!--        levels: [1, 2, 3],-->
<!--      }),-->
<!--    ],-->
<!--    onUpdate: ({editor}) => {-->
<!--      const state = editor.getHTML();-->
<!--      _data.value = state;-->

<!--      if (props.validator && typeof props.validator === 'function') {-->
<!--        props.validator(_data.value);-->
<!--      }-->
<!--    },-->
<!--    editable: !props.disabled,-->
<!--  })-->
<!--);-->

<!--watch(-->
<!--  () => props.disabled,-->
<!--  () => {-->
<!--    editor.value?.setOptions({editable: !props.disabled});-->
<!--  }-->
<!--);-->

<!--onUnmounted(() => editor?.value?.destroy());-->
<!--</script>-->

<!--<template>-->
<!--  <div v-if="!loading">-->
<!--    <slot>-->
<!--      <label-->
<!--        v-if="label"-->
<!--        :for="_id"-->
<!--        class="block text-sm font-medium text-gray-700"-->
<!--      >-->
<!--        {{ label }}-->
<!--      </label>-->
<!--    </slot>-->

<!--    <div-->
<!--      v-if="editor"-->
<!--      class="border border-gray-200 rounded-md overflow-hidden p-2 bg-gray-50"-->
<!--    >-->
<!--      <slot name="buttons" v-bind="editor">-->
<!--        <div class="space-x-1 mb-2 flex">-->
<!--          <slot name="headers-buttons" v-bind="editor">-->
<!--            <AntButton-->
<!--              @click="-->
<!--                editor-->
<!--                  ? editor.chain().focus().toggleHeading({ level: 1 }).run()-->
<!--                  : false-->
<!--              "-->
<!--              :class="{-->
<!--                '!bg-gray-200': editor.isActive('heading', { level: 1 }),-->
<!--              }"-->
<!--              class="hover:bg-gray-200 border-none"-->
<!--              :disabled="disabled"-->
<!--            >-->
<!--              <span>H1</span>-->
<!--            </AntButton>-->

<!--            <AntButton-->
<!--              @click="-->
<!--                editor-->
<!--                  ? editor.chain().focus().toggleHeading({ level: 2 }).run()-->
<!--                  : false-->
<!--              "-->
<!--              :class="{-->
<!--                '!bg-gray-200': editor.isActive('heading', { level: 2 }),-->
<!--              }"-->
<!--              class="hover:bg-gray-200 border-none"-->
<!--              :disabled="disabled"-->
<!--            >-->
<!--              <span class="">H2</span>-->
<!--            </AntButton>-->

<!--            <AntButton-->
<!--              @click="-->
<!--                editor-->
<!--                  ? editor.chain().focus().toggleHeading({ level: 3 }).run()-->
<!--                  : false-->
<!--              "-->
<!--              :class="{-->
<!--                '!bg-gray-200': editor.isActive('heading', { level: 3 }),-->
<!--              }"-->
<!--              class="hover:bg-gray-200 border-none"-->
<!--              :disabled="disabled"-->
<!--            >-->
<!--              <span class="">H3</span>-->
<!--            </AntButton>-->
<!--          </slot>-->

<!--          <slot name="bold-button" v-bind="editor">-->
<!--            <AntButton-->
<!--              @click="-->
<!--                editor ? editor.chain().focus().toggleBold().run() : false-->
<!--              "-->
<!--              :class="{ '!bg-gray-200': editor.isActive('bold') }"-->
<!--              class="hover:bg-gray-200 border-none"-->
<!--              :disabled="disabled"-->
<!--            >-->
<!--              <span class="font-bold">B</span>-->
<!--            </AntButton>-->
<!--          </slot>-->

<!--          <slot name="italic-button" v-bind="editor">-->
<!--            <AntButton-->
<!--              @click="-->
<!--                editor ? editor.chain().focus().toggleItalic().run() : false-->
<!--              "-->
<!--              :class="{ '!bg-gray-200': editor.isActive('italic') }"-->
<!--              class="hover:bg-gray-200 border-none"-->
<!--              :disabled="disabled"-->
<!--            >-->
<!--              <span class="italic">I</span>-->
<!--            </AntButton>-->
<!--          </slot>-->

<!--          <slot name="underline-button" v-bind="editor">-->
<!--            <AntButton-->
<!--              @click="-->
<!--                editor ? editor.chain().focus().toggleUnderline().run() : false-->
<!--              "-->
<!--              :class="{ '!bg-gray-200': editor.isActive('underline') }"-->
<!--              class="hover:bg-gray-200 border-none"-->
<!--              :disabled="disabled"-->
<!--            >-->
<!--              <span class="underline">U</span>-->
<!--            </AntButton>-->
<!--          </slot>-->

<!--          <slot name="strike-button" v-bind="editor">-->
<!--            <AntButton-->
<!--              @click="-->
<!--                editor ? editor.chain().focus().toggleStrike().run() : false-->
<!--              "-->
<!--              :class="{ '!bg-gray-200': editor.isActive('strike') }"-->
<!--              class="hover:bg-gray-200 border-none"-->
<!--              :disabled="disabled"-->
<!--            >-->
<!--              <span class="line-through">S</span>-->
<!--            </AntButton>-->
<!--          </slot>-->

<!--          <slot name="custom-buttons" v-bind="editor"></slot>-->
<!--        </div>-->
<!--      </slot>-->

<!--      <EditorContent-->
<!--        :id="_id"-->
<!--        :described-by="`${_id}-description`"-->
<!--        :editor="editor"-->
<!--        v-bind="$attrs"-->
<!--        :class="{-->
<!--          'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500':-->
<!--            (errors && errors.length > 0) || isError,-->
<!--        }"-->
<!--      />-->

<!--      <slot name="errorList" v-bind="{ errors }">-->
<!--        <div v-for="error in errors" class="text-red-600">{{ error }}</div>-->
<!--      </slot>-->
<!--    </div>-->

<!--    <div-->
<!--      v-if="description"-->
<!--      class="mt-1 text-sm text-gray-500"-->
<!--      :id="`${_id}-description`"-->
<!--    >-->
<!--      <slot name="description"> {{ description }}</slot>-->
<!--    </div>-->
<!--  </div>-->

<!--  <div v-else>-->
<!--    <AntSkeleton-->
<!--      :model-value="loading"-->
<!--      v-if="label || $slots['label']"-->
<!--      class="w-2/6 h-4 rounded-md mb-1"-->
<!--    />-->

<!--    <AntSkeleton-->
<!--      :model-value="loading"-->
<!--      class="w-full h-24 rounded-md"-->
<!--    />-->

<!--    <AntSkeleton-->
<!--      :model-value="loading"-->
<!--      v-if="description || $slots['description']"-->
<!--      class="w-4/6 h-4 rounded-md mt-1"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->
