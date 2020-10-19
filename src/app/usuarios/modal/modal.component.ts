import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup
  urlPost = 'http://localhost:2000/api/usuarios'
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private http : HttpClient,
  ) { 
    this.form = this.formBuilder.group({
      id:'',
      nombre: '',
      apellido: '',
      telefono:'',
      email:'',
      direccion:''
     
    });
  }

  ngOnInit(): void {
    if(this.data.action == 'edit'){
      this.iniciarCampos()
    }
  }

  iniciarCampos(){

    for (let controls of Object.keys(this.form.controls)) {
      this.form.controls[controls].setValue(this.data.body[controls].toString())
    }
    
  }

  agregarUsuario(form){

    if(this.data.action == 'add'){
      this.dialogRef.close()
      this.http.post(`${this.urlPost}`, form).subscribe(
        res=>{
          if(res['code']===0){          
            alert('Usuario creado')         
          }else{
            alert('Error creand usuario')
          }
        },err=>{
          alert(err)
        }
  
      )

    }else{
      this.dialogRef.close()
      form.id = this.data.body.id
      this.http.put(`${this.urlPost}`, form).subscribe(
        res=>{
          if(res['code']===0){          
            alert('Usuario actualizado')         
          }else{
            alert('Error creand actualizado')
          }
        },err=>{
          alert(err)
        }
  
      )

    }
  

  }

  errorMessage(){
    alert('Complete los campos')

  }

  


}
