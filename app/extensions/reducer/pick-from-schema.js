import { pick, keys } from 'ramda';

export const pickFromSchema = Class => pick(keys(new Class()));

export default pickFromSchema;
