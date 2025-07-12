#! /usr/bin/env node
'use strict';

import { Element, parse } from './xml-parser';
import * as path from 'node:path';
import * as fs from 'fs';
import Properties from './rendering/Properties';
import { TemplateEngine } from './freemarker/TemplateEngine';
import Store from './store/Store';
import format from 'html-format';
import { PlantainSubstitutions, Substitutions } from './rendering/Substitutions';
import RenderingEngine from './rendering/RenderingEngine';
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

function processDirectory(dir: string, suffix: string, baseTemplate: string, newSuffix: string) {

    fs.readdir(path.join(process.env.INIT_CWD!, options.dir, dir), function(err: NodeJS.ErrnoException | null, files: string[]) {

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function(file) {

            if (options.page && file !== options.page) {
                return;
            }

            const index = file.indexOf(suffix);
            if (index === -1) {
                return;
            }

            Store.clear();

            console.log('processing ' + file);

            const substitutions = plantainSubstitutions[file] || {} as Substitutions;

            const dom = parse(fs.readFileSync(path.join(process.env.INIT_CWD!, options.dir, dir, file), 'utf8'));

            if (!dom.processing.schema || !dom.processing.schema.version || Number.isNaN(Number(dom.processing.schema.version))) {
                console.log('WARNING - xml template does not specify a schema version (needed for maximillian template migration system) : ' +
                    file);
                return;
            }

            const renderingEngine = new RenderingEngine(classMappings, substitutions, options.dir);

            const body = renderingEngine.renderElement(dom.root as Element);

            const mainTemplate = fs.readFileSync(path.join(process.env.INIT_CWD!, options.dir, baseTemplate), 'utf8')
                .replaceAll("MATERIALS_PAGE_TITLE_TOKEN", "Company Title");

            try {
                const html = new TemplateEngine().render(mainTemplate, {
                    body: body,
                    title: (dom.root as Element).attributes.title,
                    authenticated: false
                });
                const name = file.replaceAll(suffix, `${newSuffix}.html`);
                fs.writeFileSync(path.join(process.env.INIT_CWD!, options.output, name), format(html));
            } catch (err) {
                throw new FreemarkerError(`Error processing ftl template 'main.ftl'`, err as Error);
            }
        });
    });
}

processDirectory('pages', ".page.xml", "main.ftl", "");
processDirectory('pages', ".form.xml", "main.ftl", "");
processDirectory('emails', ".email.xml", "email.ftl", "-email");
