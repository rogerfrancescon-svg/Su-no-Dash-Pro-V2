const React = require('react');
const { BarChart, Bar, XAxis, YAxis } = require('recharts');
const { renderToStaticMarkup } = require('react-dom/server');

const data = [{ name: 'Test', desvio: NaN }];
try {
  const markup = renderToStaticMarkup(
    React.createElement(BarChart, { data, width: 400, height: 400 },
      React.createElement(XAxis, { dataKey: "name" }),
      React.createElement(YAxis),
      React.createElement(Bar, { dataKey: "desvio" })
    )
  );
  console.log('SUCCESS');
} catch (e) {
  console.log('ERROR:', e.message);
}
