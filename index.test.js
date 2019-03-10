const postcss = require('postcss');
const plugin = require('./');

function run(input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('shims display: subgrid', () => {
  return run(
    'a{ display: subgrid; }',
    'a{ display: grid; grid-column: 1 / -1; grid: inherit; grid-gap: inherit; }',
    {}
  );
});

it('applies a hack for IE autoprefixer when option enabled', () => {
  return run(
    'a{ display: subgrid; }',
    'a{ display: grid; grid-column: 1 / 99; grid: inherit; grid-gap: inherit; grid-template-columns: inherit; grid-template-areas: ; }',
    { ieHack: true }
  );
});

it('carries !important', () => {
  return run(
    'a{ display: subgrid !important; }',
    'a{ display: grid !important; grid-column: 1 / -1 !important; grid: inherit !important; grid-gap: inherit !important; }',
    {}
  );
});
