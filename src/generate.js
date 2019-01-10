const handlebars = require('handlebars');

class Generate {

  routingModuleSource(fileName, moduleName, component) {
    const routingModuleSource = `import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';

  import { {{moduleName}}Component } from './{{fileName}}.component';

  export const {{routesName}}: Routes = [
    { path: '', component: {{moduleName}}Component }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild({{routesName}})
    ],
    exports: [
      RouterModule
    ]
  })
  export class {{moduleName}}RoutingModule { }
`;

    const params = {
      routesName: `${moduleName.toLowerCase()}Routes`,
      component,
      moduleName,
      fileName
    }

    return this._generateTemplateSource(routingModuleSource, params);
  }

  htmlSource(moduleName, component) {
    const componentTag = generateComponentTag(component);
    const htmlSource = `<{{componentTag}} t-title="{{title}}" [t-service-api]="service">
</{{componentTag}}>
`;
    return this._generateTemplateSource(htmlSource, { title: moduleName, componentTag });
  }

  moduleSource(fileName, moduleName, component) {
    const moduleSource = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { {{component}}Module } from '@totvs/thf-templates';

import { {{moduleName}}RoutingModule } from './{{fileName}}-routing.module';
import { {{moduleName}}Component } from './{{fileName}}.component';

@NgModule({
  imports: [
    CommonModule,

    {{moduleName}}RoutingModule,
    {{component}}Module
  ],
  declarations: [
    {{moduleName}}Component
  ],
  providers: []
})
export class {{moduleName}}Module { }
`;

    return this._generateTemplateSource(moduleSource, { moduleName, component, fileName })
  }

  componentSource(fileName, moduleName, service) {
    const componentSource = `import { Component } from '@angular/core';

  @Component({
    selector: 'app-{{name}}',
    templateUrl: './{{name}}.component.html'
  })
  export class {{component}}Component {

    service = '{{service}}';

  }
`;

    return this._generateTemplateSource(componentSource, { name: fileName, component: moduleName, service });
  }

  _generateTemplateSource(source, args) {
    const templateCompiled = handlebars.compile(source);
    return templateCompiled(args);
  }
}

function generateComponentTag(component) {
  return component.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/).map(c => c.toLowerCase()).join('-');
}

module.exports = new Generate();