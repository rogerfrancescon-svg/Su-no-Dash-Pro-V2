const fs = require('fs');
let content = fs.readFileSync('src/components/Notifications.tsx', 'utf8');

const target = `export function Notifications() {`;
const replace = `interface NotificationsProps {
  visits?: any;
  integrados?: any;
}

export function Notifications({ visits, integrados }: NotificationsProps) {`;

content = content.replace(target, replace);
fs.writeFileSync('src/components/Notifications.tsx', content);
