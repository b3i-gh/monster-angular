import { Component, OnInit } from '@angular/core';
import { Monster } from './monster';
import { MonsterService } from './monster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public monsters: Monster[] | undefined;
  public editMonster: Monster | undefined;
  public deleteMonster: Monster | undefined;
  
  constructor (private monsterService: MonsterService){}

  ngOnInit() {
    this.getMonsters();
  }

  public getMonsters(): void{
    this.monsterService.getMonsters().subscribe(
      (response: Monster[]) => {
        this.monsters = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddMonster(addForm: NgForm): void {
    let addButton = document.getElementById('add-monster-form');
    if(addButton != null)
      addButton.click();
    this.monsterService.addMonster(addForm.value).subscribe(
      (response: Monster) => {
        console.log(response);
        this.getMonsters();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMonster(monster: Monster): void {
    this.monsterService.updateMonster(monster).subscribe(
      (response: Monster) => {
        console.log(response);
        this.getMonsters();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMonster(monsterId: number): void {
    this.monsterService.deleteMonster(monsterId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMonsters();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchMonsters(key: string): void {
    console.log(key);
    const results: Monster[] = [];
    if(this.monsters != undefined){
      for (const monster of this.monsters) {
        if (monster.name.toLowerCase().indexOf(key.toLowerCase()) !== -1)
         {
          results.push(monster);
        }
      }
    }
    this.monsters = results;
    if (results.length === 0 || !key) {
      this.getMonsters();
    }
  }

  public onOpenModal(monster: Monster, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMonsterModal');
    }
    if (mode === 'edit') {
      this.editMonster = monster;
      button.setAttribute('data-target', '#updateMonsterModal');
    }
    if (mode === 'delete') {
      this.deleteMonster = monster;
      button.setAttribute('data-target', '#deleteMonsterModal');
    }
    if(container != null)
      container.appendChild(button);
    button.click();
  }



}
