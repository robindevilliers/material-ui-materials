#! /usr/bin/env node
'use strict';

import { Element, parse } from './parser';

import * as path from 'node:path';
import * as fs from 'fs';
import Properties from './properties';
import { TemplateEngine } from './freemarker';
import Store from './store/Store';
import format from 'html-format';
import { PlantainSubstitutions, Substitutions } from './Substitutions';
import RenderingEngine from './RenderingEngine';
import { FreemarkerError } from './freemarker/FreemarkerError';
import commander = require('commander');

const options = commander
    .version('1.0.0', '-v, --version')
    .usage('[OPTIONS]...')
    .option('-d, --dir <value>', 'Specifies location of the materials.', './')
    .option('-o, --output <value>', 'Specifies location of the output.', './html')
    .option('-s, --page <value>', 'Specifies a single page to process.')
    .parse(process.argv)
    .opts();


if (!fs.existsSync(path.join(process.env.INIT_CWD!, options.output))) {
    fs.mkdirSync(path.join(process.env.INIT_CWD!, options.output));
}

const classMappingsData = fs.readFileSync(path.join(process.env.INIT_CWD!, options.dir, 'class-mappings.properties'), 'utf8');

const classMappings = new Properties(classMappingsData);

const plantainSubstitutions = JSON.parse(fs.readFileSync(path.join(process.env.INIT_CWD!, options.dir, 'plantain-substitutions.json'), 'utf8')) as PlantainSubstitutions;

function processDirectory(dir: string, suffix: string, baseTemplate: string) {

    fs.readdir(path.join(process.env.INIT_CWD!, options.dir, dir), function(err: NodeJS.ErrnoException | null, files: string[]) {

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function(file) {

            if (options.page && file !== options.page) {
                return;
            }

            Store.clear();

            console.log('processing ' + file);

            const substitutions = plantainSubstitutions[file] || {} as Substitutions;

            const dom = parse(fs.readFileSync(path.join(process.env.INIT_CWD!, options.dir, dir, file), 'utf8'));

            const renderingEngine = new RenderingEngine(file, classMappings, substitutions, options.dir);

            const body = renderingEngine.renderElement(dom.root as Element);

            const mainTemplate = fs.readFileSync(path.join(process.env.INIT_CWD!, options.dir, baseTemplate), 'utf8');

            try {
                const html = new TemplateEngine().render(mainTemplate, {
                    body: body,
                    title: (dom.root as Element).attributes.title,
                    authenticated: false
                });
                fs.writeFileSync(path.join(process.env.INIT_CWD!, options.output, file.replaceAll(suffix, ".html")), format(html));
            } catch (err) {
                throw new FreemarkerError(`Error processing ftl template 'main.ftl'`, err as Error);
            }
        });
    });
}

processDirectory('pages', ".page.xml", "main.ftl");
processDirectory('emails', ".email.xml", "email.ftl");
