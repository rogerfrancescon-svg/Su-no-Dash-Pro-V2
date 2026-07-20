const fs = require('fs');
let content = fs.readFileSync('src/components/VisitForm.tsx', 'utf8');

content = content.replace(
  /<XAxis dataKey="dia" label=/g,
  '<XAxis dataKey="dia" type="number" domain={[\'dataMin\', \'dataMax\']} label='
);

fs.writeFileSync('src/components/VisitForm.tsx', content);
