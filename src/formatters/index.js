import generateTreeDifference from './stylish';
import generatePlainDifference from './plain';
import generateJsonDifference from './toJson';

export default (format, tree) => {
  if (format === 'plain') {
    return generatePlainDifference(tree);
  }
  if (format === 'recursive') {
    return generateTreeDifference(tree);
  }
  return generateJsonDifference(tree);
};
