import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.css']
})
export class MetodologiaComponent implements OnInit {

  migasPan: MenuItem[] = [];
  characteristics: string[] = ['Appropriate', 'Complete', 'Feasible', 'Verifiable', 'Correct',
    'Necessary', 'Unambiguos', 'Singular', 'Conforming', 'Traceable', 'Consistent', 'Modifiable'];

  necesaryCond: string[] = ['Appropriate', 'Complete', 'Feasible', 'Verifiable', 'Correct'];
  noNecesary: string[] = ['Unambiguos', 'Singular', 'Conforming', 'Traceable', 'Consistent', 'Modifiable'];
  none: string[] = ['Necessary'];

  characteristic: any[] = [
    {
      name: 'Appropriate',
      definition: 'The specific intent and amount of detail of the requirement are appropriate for the entity' +
        ' level to which it refers (level of abstraction appropriate to the entity level).'
    },
    {
      name: 'Complete', definition: 'The requirement sufficiently describes the capacity, characteristic, ' +
        'constraint or quality factor necessary to satisfy the need of the entity without the obligation of other ' +
        'information to understand the requirement.'
    },
    {
      name: 'Feasible', definition: ' The requirement can be accomplished within system constraints (eg, cost, ' +
        'schedule, technical) with acceptable risk.'
    },
    {
      name: 'Verifiable',
      definition: 'The requirement is structured and written in such a way that its realization can be tested (verified) to ' +
        'the customer\'s satisfaction at the level at which the requirements exist.'
    },
    {
      name: 'Correct',
      definition: 'The requirement is an accurate representation of the need of the entity from which ' +
        'it was transformed.'
    },
    {
      name: 'Necessary',
      definition: 'The requirement defines an essential capability, characteristic, constraint, and/or quality factor. If it is not included ' +
        'in the set of requirements, there will be a deficiency in the capability or feature, which cannot be met by the implementation of other requirements.'
    },
    {
      name: 'Unambiguous',
      definition: 'Each requirement must be stated in such a way that it can be interpreted in only one way.'
    },
    {
      name: 'Singular',
      definition: 'The requirement states a single capability, characteristic, constraint, or quality factor.'
    },
    {
      name: 'Traceable',
      definition: 'Each requirement must be feasible to determine a relationship between the specific documented statements of customer' +
        ' need and the specific statements in the system definition.'
    },
    {
      name: 'Conforming',
      definition: 'Individual elements conform to an approved standard template and style for writing requirements, where applicable.'
    },
    {
      name: 'Consistent',
      definition: 'The content should be consistent and not contradictory in the level of detail, the style of the requirement statements, ' +
        'and the presentation of the material.'
    },
    {
      name: 'Modifiable',
      definition: 'An SRS (Software Requirements Specifications) is modifiable if, and only if, its structure and style are such that any change ' +
        'in the requirements can be made easily, completely and consistently, maintaining the structure and style'
    },

  ];

  constructor() {
  }

  ngOnInit() {
    this.migasPan = [
      {
        label: 'Metodología'
      }
    ];
  }

  moverCard(id:string){
    document.location.href ='metodologia#'+ id;
  }
}
