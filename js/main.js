import swURL from 'sw:../service-worker.js';
import { openDB } from 'idb';
// Set up the database
const db = await openDB('settings-store', 1, {
  upgrade(db) {
    db.createObjectStore('settings');
  },
});
// Зарегистрировать сервис
if ('serviceWorker' in navigator) {
  // Дождитесь, пока событие «Load» не блокирует другую работу
  window.addEventListener('load', async () => {
    // Попробуйте зарегистрировать работник услуг.
    try {
      const reg = await navigator.serviceWorker.register(swURL);
      console.log('Сервисный работник зарегистрирован! 😎', reg);
    } catch (err) {
      console.log('😥 Регистрация обслуживания работника не удалась: ', err);
    }
  });
}
window.addEventListener('DOMContentLoaded', async () => {
  // настройтеРедактор
  const { Editor } = await import('./app/editor.js');
  const editor = new Editor(document.body);

  // Настройте меню
  const { Menu } = await import('./app/menu.js');
  new Menu(document.querySelector('.actions'), editor);

  // Установите начальное состояние в редакторе
  const defaultText = `# Добро пожаловать в PWA Edit!\n\nЧтобы покинуть область редактирования, нажмите \`esc\` , тогда \`tab\` или же \`shift+tab\`.`;

  editor.setContent(defaultText);
});