# Manual Testing Checklist

## Functionality

1. Load `web-app/index.html` and confirm the seeded todo list renders with `2 tasks remaining`.
2. Add a new todo and confirm it appears at the end of the list, the input clears, and focus returns to the field.
3. Submit the form with only spaces and confirm no blank todo is created.
4. Check a todo and confirm the completed styling appears and the remaining count updates.
5. Use `Mark All Complete` and confirm every item is completed and the counter reaches `0 tasks remaining`.
6. Use `Clear Completed` and confirm completed todos are removed and the empty state appears when the list is empty.
7. Delete a single todo and confirm only that item is removed.

## Theme Switching

1. Toggle the theme button and confirm the page colors, button label, and `aria-pressed` state update.
2. Reload the page and confirm the last selected theme persists.
3. Clear the saved `todo-app-theme` value in storage, switch the OS theme, and confirm the app follows the system theme on reload.
4. Open the app on a narrow mobile viewport and confirm controls remain readable and the theme toggle spans the full width.
