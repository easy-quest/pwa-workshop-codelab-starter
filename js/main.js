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
  // Set up install prompt
  const { Install } = await import('./lib/install.js');
  new Install(document.querySelector('#install'));

  // Настройте меню
  const { Menu } = await import('./app/menu.js');
  new Menu(document.querySelector('.actions'), editor);

  // Установите начальное состояние в редакторе
  const defaultText = `# Добро пожаловать в PWA Edit!\n\nЧтобы покинуть область редактирования, нажмите \`esc\` , тогда \`tab\` или же \`shift+tab\`.`;
  

  editor.setContent((await db.get('settings', 'content')) || defaultText);
});
// Save content to database on edit
editor.onUpdate(async (content) => {
  await db.put('settings', content, 'content');
});
// Set up night mode toggle
const { NightMode } = await import('./app/night-mode.js');
new NightMode(
  document.querySelector('#mode'),
  async (mode) => {
    editor.setTheme(mode);
    // Save the night mode setting when changed
  },
  // Retrieve the night mode setting on initialization
);
