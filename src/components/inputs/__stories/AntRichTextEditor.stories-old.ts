// import AntRichTextEditor from '../AntRichTextEditor.vue';
// import { ref } from 'vue';
// // @ts-nocheck
// export default {
//   title: 'Inputs/Ant Rich Text Editor',
//   component: AntRichTextEditor,
//   decorators: [() => ({ template: '<div class="m-2"><story/></div>' })],
//   argTypes: {
//     args: {
//       description:
//         'Additional attributes will be given to the EditorContent from <a href="https://www.npmjs.com/package/%40tiptap%2Fvue-3">@tiptap/vue-3</a>.',
//     },
//     data: {
//       description: 'The value diplayed inside the Editor',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     label: {
//       description:
//         'The main label for the Editor.<br>Can also be set via the default slot.',
//     },
//     default: {
//       description:
//         'The main label for the Editor.<br>Can also be set via the label prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     buttons: {
//       description:
//         'Slot to override all editor buttons.<br>Gets the tip-tap Editor Element as prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     'headers-buttons': {
//       description:
//         'Slot to override the header buttons.<br>Gets the tip-tap Editor Element as prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     'bold-button': {
//       description:
//         'Slot to override the bold button.<br>Gets the tip-tap Editor Element as prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     'italic-button': {
//       description:
//         'Slot to override the italic button.<br>Gets the tip-tap Editor Element as prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     'underline-button': {
//       description:
//         'Slot to override the underline button.<br>Gets the tip-tap Editor Element as prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     'strike-button': {
//       description:
//         'Slot to override the strike button.<br>Gets the tip-tap Editor Element as prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//     'custom-buttons': {
//       description:
//         'Slot to add additional buttons.<br>Gets the tip-tap Editor Element as prop.',
//       table: {
//         type: { summary: 'HTML' },
//       },
//     },
//   },
// };
//
// const Template = (args: any) => ({
//   components: { AntRichTextEditor },
//   setup() {
//     return { args };
//   },
//   template: '<AntRichTextEditor v-bind="args"/>',
// });
//
// export const Simple = Template.bind({});
// // @ts-ignore
// Simple.args = {
//   data: '',
//   label: 'This is a Rich Text Editor or WYSIWYG Editor',
// };
//
// const WithDefaultContentTemplate = (args: any) => ({
//   components: { AntRichTextEditor },
//   setup() {
//     const data = ref<string>(
//       '<h1><u>HI</u></h1> <p>This is an example on the <i>rich</i> text <b>editor</b>.</p>'
//     );
//
//     return { args, data };
//   },
//   template: `
//   <AntRichTextEditor v-bind="args" v-model:data="data"/>
//   <span class="text-xs text-gray-400">Reactive value: {{data}}</span>
//   `,
// });
//
// export const WithDefaultContent = WithDefaultContentTemplate.bind({});
// // @ts-ignore
// WithDefaultContent.args = {
//   label: 'This is a Rich Text Editor with content',
// };
//
// export const Disabled = WithDefaultContentTemplate.bind({});
// // @ts-ignore
// Disabled.args = {
//   label: 'Disabled test',
//   disabled: true,
// };
//
// export const Loading = Template.bind({});
// // @ts-ignore
// Loading.args = {
//   label: 'Loading test',
//   loading: true,
// };
