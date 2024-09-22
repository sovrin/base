#!/usr/bin/env tsx
import prg from './package.json';
import base from './src/index';

const { version } = prg;

const root = __dirname;

base({
    version,
    root,
});
