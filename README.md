# awsanimate ✦

Una landing moderna y animada, hecha con HTML, CSS y JavaScript puros (cero dependencias) y desplegada en **GitHub Pages**.

🔗 **Demo:** https://sserrano13.github.io/awsanimate/

## Características

- Fondo de partículas interactivas en `<canvas>` (reaccionan al ratón)
- Animaciones de reveal al hacer scroll
- Barra de progreso de scroll
- Contadores animados
- Tema claro/oscuro con persistencia en `localStorage`
- Diseño responsive
- Respeta `prefers-reduced-motion`

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Estructura y contenido |
| `styles.css` | Estilos, temas y animaciones |
| `script.js` | Partículas, scroll, contadores y tema |

## Desarrollo local

Al ser 100% estático, basta con abrir `index.html` en el navegador.
Para servirlo con un servidor local (recomendado para rutas):

```bash
python -m http.server 8000
# luego visita http://localhost:8000
```

## Deploy

El sitio se publica automáticamente desde la rama `main` (raíz `/`) vía GitHub Pages.
Cada `git push` a `main` actualiza la web.
