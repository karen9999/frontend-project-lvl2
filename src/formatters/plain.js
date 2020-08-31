import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);
const plain = (tree) => {
  const iter = (data, path = '') => data
    .map((object) => {
      switch (object.type) {
        case 'added': {
          return `Property ${path}${
            object.name
          } was added with value: ${getValue(object.currentValue)}`;
        }
        case 'deleted': {
          return `Property ${path}${object.name} was deleted`;
        }
        case 'modified': {
          return `Property ${path}${object.name} was chanched from ${getValue(
            object.currentValue,
          )} to ${getValue(object.previousValue)}`;
        }
        case 'unmodified': {
          return 'unmodified';
        }
        case 'nested': {
          return `${iter(object.children, `${path}${object.name}.`)
            .filter((node) => node !== 'unmodified' && node !== '')
            .join('\n')}`;
        }
        default:
          throw new Error(`${object.type} is unknown!`);
      }
    });
  return iter(tree).join('\n');
};
export default plain;
