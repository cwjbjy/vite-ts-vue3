import { App } from 'vue';

export default function myDirective(app: App) {
  app.directive('title', {
    created(_, binding) {
      document.title = binding.value;
    },
  });
  app.directive('focus', {
    beforeMount(el) {
      el.getElementsByTagName('input')[0].focus();
    },
  });
}
