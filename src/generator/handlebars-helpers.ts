import type Handlebars from 'handlebars';

export function registerHandlebarsHelpers(hbs: typeof Handlebars): void {
  hbs.registerHelper('eq', function (a: unknown, b: unknown) {
    return a === b;
  });

  hbs.registerHelper('neq', function (a: unknown, b: unknown) {
    return a !== b;
  });

  hbs.registerHelper('gt', function (a: number, b: number) {
    return a > b;
  });

  hbs.registerHelper('gte', function (a: number, b: number) {
    return a >= b;
  });

  hbs.registerHelper('lt', function (a: number, b: number) {
    return a < b;
  });

  hbs.registerHelper('lte', function (a: number, b: number) {
    return a <= b;
  });

  hbs.registerHelper('and', function (...args: unknown[]) {
    const values = args.slice(0, -1);
    return values.every(Boolean);
  });

  hbs.registerHelper('or', function (...args: unknown[]) {
    const values = args.slice(0, -1);
    return values.some(Boolean);
  });

  hbs.registerHelper('not', function (value: unknown) {
    return !value;
  });

  hbs.registerHelper('includes', function (arr: unknown[], value: unknown) {
    if (!Array.isArray(arr)) return false;
    return arr.includes(value);
  });

  hbs.registerHelper('length', function (arr: unknown[]) {
    if (!Array.isArray(arr)) return 0;
    return arr.length;
  });

  hbs.registerHelper('join', function (arr: unknown[], separator: string) {
    if (!Array.isArray(arr)) return '';
    return arr.join(typeof separator === 'string' ? separator : ', ');
  });

  hbs.registerHelper('first', function (arr: unknown[]) {
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    return arr[0];
  });

  hbs.registerHelper('last', function (arr: unknown[]) {
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    return arr[arr.length - 1];
  });

  hbs.registerHelper('uppercase', function (str: string) {
    return typeof str === 'string' ? str.toUpperCase() : '';
  });

  hbs.registerHelper('lowercase', function (str: string) {
    return typeof str === 'string' ? str.toLowerCase() : '';
  });

  hbs.registerHelper('capitalize', function (str: string) {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  hbs.registerHelper('camelCase', function (str: string) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
      .replace(/^(.)/, (char) => char.toLowerCase());
  });

  hbs.registerHelper('pascalCase', function (str: string) {
    if (typeof str !== 'string') return '';
    const camel = str
      .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
      .replace(/^(.)/, (char) => char.toLowerCase());
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  });

  hbs.registerHelper('kebabCase', function (str: string) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/([a-z])([A-Z])/g, '\$1-\$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  });

  hbs.registerHelper('snakeCase', function (str: string) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/([a-z])([A-Z])/g, '\$1_\$2')
      .replace(/[-\s]+/g, '_')
      .toLowerCase();
  });

  hbs.registerHelper('replace', function (str: string, find: string, replace: string) {
    if (typeof str !== 'string') return '';
    return str.split(find).join(replace);
  });

  hbs.registerHelper('padEnd', function (str: string, length: number) {
    if (typeof str !== 'string') return '';
    return str.padEnd(typeof length === 'number' ? length : 0);
  });

  hbs.registerHelper('ternary', function (condition: unknown, ifTrue: unknown, ifFalse: unknown) {
    return condition ? ifTrue : ifFalse;
  });

  hbs.registerHelper('ifCond', function (
    this: unknown,
    v1: unknown,
    operator: string,
    v2: unknown,
    options: Handlebars.HelperOptions
  ) {
    switch (operator) {
      case '==': return v1 == v2 ? options.fn(this) : options.inverse(this);
      case '===': return v1 === v2 ? options.fn(this) : options.inverse(this);
      case '!=': return v1 != v2 ? options.fn(this) : options.inverse(this);
      case '!==': return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case '&&': return v1 && v2 ? options.fn(this) : options.inverse(this);
      case '||': return v1 || v2 ? options.fn(this) : options.inverse(this);
      default: return options.inverse(this);
    }
  });

  hbs.registerHelper('unless_eq', function (
    this: unknown,
    a: unknown,
    b: unknown,
    options: Handlebars.HelperOptions
  ) {
    return a !== b ? options.fn(this) : options.inverse(this);
  });

  hbs.registerHelper('json', function (value: unknown) {
    return JSON.stringify(value, null, 2);
  });

  hbs.registerHelper('jsonInline', function (value: unknown) {
    return JSON.stringify(value);
  });

  hbs.registerHelper('lineComment', function (text: string) {
    return `// ${text}`;
  });

  hbs.registerHelper('blockComment', function (text: string) {
    return `/* ${text} */`;
  });

  hbs.registerHelper('hashComment', function (text: string) {
    return `# ${text}`;
  });

  hbs.registerHelper('indent', function (
    this: unknown,
    spaces: number,
    options: Handlebars.HelperOptions
  ) {
    const content = options.fn(this);
    const prefix = ' '.repeat(typeof spaces === 'number' ? spaces : 2);
    return content
      .split('\n')
      .map((line: string) => (line.trim() ? `${prefix}${line}` : line))
      .join('\n');
  });

  hbs.registerHelper('timestamp', function () {
    return new Date().toISOString();
  });

  hbs.registerHelper('year', function () {
    return new Date().getFullYear();
  });
}