cat > README.md << 'EOF'
# 🐾 Mokepon Multiplayer Server

Este es un servidor básico en Node.js con Express para un juego multijugador de Mokepon. Permite que jugadores se unan, seleccionen su Mokepon, envíen su ubicación y ataques, y reciban información de los enemigos en tiempo real.

Al conectarse a la dirección IPv4 de la red local aparece una interfaz donde los dos jugadores pueden escoger su mokepon
![mokepones](https://github.com/user-attachments/assets/9414d827-72a7-423a-8514-37b93ce5276e)

La siguiente interfaz indica los dos mokepones escogidos y mediante las flechas del PC o presionando los botones **arriba-abajo-izquierda-derecha** se busca hacer la colisión para que haya un cambio de interfaz y arranque la batalla
![mokepones_escogidos](https://github.com/user-attachments/assets/81057127-e053-4e4b-8bdb-5764e0441693)

En la tercera interfaz cada jugador escoge el orden de los 5 ataques que tiene cada **mokepon 🔥💧🌱** y segun una lógica previamente determinada se establecerán 5 resultados para definir el ganador
## interfaz jugador 1 (PC)

![ataquejugador1](https://github.com/user-attachments/assets/e30f1d7a-0b27-406d-88f5-61f916ff04f1)

## interfaz jugador 2 (Celular)

![ataqueJugador2](https://github.com/user-attachments/assets/530a0b7a-3f0f-4ba5-8098-664f1de7715b)


---

## 🚀 Tecnologías

- Node.js
- Express
- CORS
- HTML y CSS
- JSON

---

## 📂 Estructura del proyecto

```bash
JUEGO_MOKEPON/
├── .vscode/                  # Configuración de VS Code
├── images/                   # Imágenes adicionales o recursos no públicos
├── node_modules/             # Dependencias instaladas por npm
├── public/                   # Archivos públicos accesibles desde el navegador
│   ├── assets/
│   │   ├── arena.png
│   │   ├── pacman.png
│   ├── js/
│   │   ├── mokepon.js
│   │   ├── mokepon1.js
│   │   ├── mokepon2.js
│   ├── styles.css
│   └── index.html            # Interfaz del jugador
├── index.js                  # Servidor Node + Express
├── package.json
├── package-lock.json
└── proyecto/   
```

---

## 🔧 Instalación

```bash
# Clona el repositorio
git clone https://github.com/gjrangel2/juego_mokepon

# Entra al directorio
cd carpeta donde guardes el proyecto clonado

# Instala las dependencias
npm install
```

---

## ▶️ Ejecución

```bash
# Ejecuta el servidor
node index.js
```


Por defecto el servidor corre en:  
📍 \`http://localhost:8080\`  
O en red local si lo habilitas: \`http://192.168.x.x:8080\`

---

## 🧠 ¿Qué hace este servidor?

- Unirse al juego (\`/unirse\`)
- Asignar un Mokepon al jugador
- Actualizar su posición en el mapa
- Enviar y recibir ataques
- Compartir información de enemigos

---

## 🧪 Endpoints principales

| Método | Ruta                          | Descripción                               |
|--------|-------------------------------|-------------------------------------------|
| GET    | \`/unirse\`                     | Registra un nuevo jugador y devuelve su ID |
| POST   | \`/mokepon/:jugadorId\`        | Asigna un Mokepon a un jugador            |
| POST   | \`/mokepon/:jugadorId/posicion\` | Actualiza la posición del jugador         |
| POST   | \`/mokepon/:jugadorId/ataques\`  | Registra los ataques del jugador          |
| GET    | \`/mokepon/:jugadorId/ataques\`  | Obtiene los ataques de un jugador         |

---

## 💡 Ejemplo de JSON de ataques

\`\`\`json
{
  "ataques": [
    {"nombre": "🔥"},
    {"nombre": "💧"},
    {"nombre": "🌱"}
  ]
}
\`\`\`

---

## 📌 Notas

- Se utiliza una lista en memoria (\`jugadores[]\`), por lo que los datos se pierden al reiniciar el servidor.
- Asegúrate de permitir conexiones privadas en el Firewall si deseas jugar en red local.

---

## 👨‍💻 Autor

- Geyson Rangel  
- [LinkedIn](https://www.linkedin.com/in/geyson-jair-rangel-ortega-79a022233/)  
- Proyecto educativo basado en el curso de Mokepon (Platzi/YouTube)

---

