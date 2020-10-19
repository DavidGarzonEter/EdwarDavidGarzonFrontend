import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component'


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  dataSource
  url = `http://localhost:2000/api/usuarios`
  displayedColumns: string[] = ['selecionar', 'nombre', 'apellido', 'telefono', 'email', 'direccion'];
  usuario
  

  constructor(
    private http : HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDatos()
  }

  getDatos(){
    this.http.get(`${this.url}`).subscribe(
      res=>{
        this.dataSource = res['body']
        console.log(this.dataSource)
      }
    )
  }

  agregarUsuario(){
    this.dialog.open(ModalComponent, {
      width:'70%',
      height: '80%',
      data: {action: 'add'}
    }).afterClosed().subscribe(
      res=>{
        this.getDatos()
      }
    )
  }

  change(datos){
    this.http.get(`${this.url}/${datos}`).subscribe(
      res=>{
        if(res['code']===0){
          this.usuario = res['body'][0]
          console.log(this.usuario)
        }else{
          console.log('Error opteniendo usuarios')
        }
      },err=>{
        console.log(err)
      }
    )
  }
  
  editarUsuario(){
    this.dialog.open(ModalComponent, {
      width:'70%',
      height: '80%',
      data: {action: 'edit', body:this.usuario}
    }).afterClosed().subscribe(
      res=>{
        this.getDatos()
      }
    )
  }
  eliminarUsuario(){
    this.http.delete(`${this.url}/${this.usuario.id}`).subscribe(
      res=>{
        if(res['code']===0){
          alert('usuario eliminado')
          this.getDatos()
        }else{
          console.log('error eliminando usuario')
        }
      },err=>{
        console.log(err)
      }
    )
  }


 

  

}
