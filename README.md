# Always Musica 1
## Desafío Latam e-camp: manejo de base de datos utilizando node/pg y objeto client

Utliizando una base de datos ya creada se manejó, por medio de línea de comandos, varias opcipnes para manipular datos en una tabla de la base de datos.

las opciones disponibles son:
 - **CONSULTA**: para ver todos los estudiantes 
 - **RUT** *rut*: muestra la información del estudiante con ese rut
 - **NUEVO** *nombre*, *rut*, *curso*, *nivel*: agrega un estudiante
 - **EDITAR** *nombre*, *rut*, *curso*, *nivel*: edita la inffromación del estudiante que tenga ese rut
 - **ELIMINAR** *rut*: elimina de la base de datos al estudiante que tenga ese rut
 - **HELP** o **?**: muestra un mensaje de ayuda al usuario
 **
 Para hacere esto se utilizó la clase **Client** de la librería **pg** de node.


 Hecho por *Darío Valenzuela*, septiembre 2021
 