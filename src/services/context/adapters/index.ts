import { default as buffer } from './buffer';
import { default as cookie } from './cookie';
import { default as json } from './json';
import { default as path } from './path';
import { default as query } from './query';
import { default as stream } from './stream';
import { default as string } from './string';

type Adapter = <T>() => ContextAdapter<T>;
type Keys = keyof typeof adapters;

const adapters = {
    buffer,
    cookie,
    json,
    path,
    query,
    stream,
    string,
};

export default adapters;
export { Adapter, Keys };
