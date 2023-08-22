import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public allMonsters: Monster[] | undefined;
  public shownMonsters: Monster[] = [];
  // public editMonster: Monster | undefined;
  // public deleteMonster: Monster | undefined;
  
  constructor (private monsterService: MonsterService){}

  ngOnInit() {
    this.getMonsters();
  }

  public getMonsters(): void{
    this.resetSearchFilter();
    this.monsterService.getMonsters().subscribe(
      (response: Monster[]) => {
        this.shownMonsters = this.allMonsters = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
 
  public resetSearchFilter(): void{
    this.searchText = '';
    this.searchMonsters();
    console.log("reset");
  }

  /* Enables the filtering in the table */
  searchText = '';
  @Output()
  searchTextChanged : EventEmitter<string> = new EventEmitter<string>();  
  
  public searchMonsters(): void {
    this.searchTextChanged.emit();
    const matchingMonsters: Monster[] = [];
    if(this.allMonsters != undefined){    

    for(const m of this.allMonsters){
      if (m.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1)
      matchingMonsters.push(m);
    }
      this.shownMonsters = matchingMonsters;    
   }
  }


  deleteMonster(monster: Monster) {
    if(confirm("Are you sure to delete this monster: "+monster.name)) {
      this.monsterService.deleteMonster(monster.id).subscribe(
        (response: void) => {
          console.log(response);
          this.getMonsters();
          console.log("monster "+monster.id+" deleted");
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        );
    }
  }

  public onOpenAddModal(): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addMonsterModal');
    
    if(container != null)
      container.appendChild(button);
    button.click();
  }

  public onAddMonster(addForm: NgForm): void {
  //   let addButton = document.getElementById('add-monster-form');
  //   if(addButton != null)
  //     addButton.click();
  //   this.monsterService.addMonster(addForm.value).subscribe(
  //     (response: Monster) => {
  //       console.log(response);
  //       this.getMonsters();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  }

  public onOpenEditMonster(monster: Monster): void{
    // const container = document.getElementById('main-container');
    // const button = document.createElement('button');
    // button.type = 'button';
    // button.style.display = 'none';
    // button.setAttribute('data-toggle', 'modal');
    // button.setAttribute('data-target', '#addMonsterModal');
    
    // if(container != null)
    //   container.appendChild(button);
    // button.click(); 
  }
  
      

    

  
   


  

  // public onUpdateMonster(monster: Monster): void {
  //   this.monsterService.updateMonster(monster).subscribe(
  //     (response: Monster) => {
  //       console.log(response);
  //       this.getMonsters();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  
  

  // public onOpenModal(monster: Monster, mode: string): void {
  //   const container = document.getElementById('main-container');
  //   const button = document.createElement('button');
  //   button.type = 'button';
  //   button.style.display = 'none';
  //   button.setAttribute('data-toggle', 'modal');
  //   if (mode === 'add') {
  //     button.setAttribute('data-target', '#addMonsterModal');
  //   }
  //   if (mode === 'edit') {
  //     this.editMonster = monster;
  //     button.setAttribute('data-target', '#updateMonsterModal');
  //   }
  //   if (mode === 'delete') {
  //     this.deleteMonster = monster;
  //     button.setAttribute('data-target', '#deleteMonsterModal');
  //   }
  //   if(container != null)
  //     container.appendChild(button);
  //   button.click();
  // }



}
