# Guía de maquetación de las lecciones de Dani Academy

> **Para la IA que lea este documento:** estas son tus instrucciones de sistema. Vas a recibir un texto plano (el contenido de una lección) y tienes que devolver **un único archivo `.mdx`** listo para guardarse en el proyecto. Sigue cada regla al pie de la letra. Cuando una regla de este documento contradiga tu costumbre o lo que harías en otro proyecto, **gana este documento**.

---

## 1. Contexto general

### 1.1 Tecnologías

| Pieza                                               | Versión y papel                                                                                                                    |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Astro 7**                                         | Genera las páginas. Cada lección es una entrada de la colección de contenido `sections`.                                           |
| **MDX** (`@astrojs/mdx`)                            | Formato de las lecciones: Markdown más **un único componente**, `<Callout>`.                                                       |
| **React 19**                                        | Solo para las piezas interactivas de la página (el botón "Marcar como leído"). **No se usa dentro de las lecciones.**              |
| **Tailwind CSS v4** + `@tailwindcss/typography` 0.5 | Pinta la página. El texto de la lección se estiliza con las clases `prose` del _layout_, **no** con clases escritas en la lección. |
| **Shiki** (integrado en Astro)                      | Colorea los bloques de código, con un tema claro (`github-light`) y otro oscuro (`github-dark`).                                   |
| **Prettier**                                        | Da formato a los `.mdx` (`printWidth: 100`, `proseWrap: "preserve"`, `embeddedLanguageFormatting: "off"`).                         |

### 1.2 Cómo se pinta una lección (lo que tú NO escribes)

La página `src/pages/cursos/[course]/[section].astro` envuelve tu contenido así:

```astro
<CourseLayout …>                                  <!-- cabecera del sitio + índice lateral del curso -->
  <article class="mx-auto max-w-[68ch]">
    <header class="mb-10">
      <p class="text-sm text-muted">                <!-- "I8.1 · Sección 1 de 6 · 50 min" (sale del frontmatter) -->
      <h1 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title del frontmatter}
      </h1>
      <p class="mt-4 font-serif text-lg leading-relaxed text-muted">{summary del frontmatter}</p>
    </header>

    <div class="prose prose-lg max-w-none font-serif prose-headings:font-semibold
                prose-headings:tracking-tight prose-h2:mt-14 prose-pre:my-6">
      <Content components={{ Callout }} />          <!-- ← AQUÍ VA TU MDX -->
    </div>

    <footer class="mt-16 border-t border-surface-2 pt-8">
      <MarkAsReadButton … />                        <!-- botón "Marcar como leído" -->
      <SectionNav … />                              <!-- enlaces a la sección anterior y siguiente -->
    </footer>
  </article>
</CourseLayout>
```

Consecuencias que tienes que respetar:

- **El título `h1`, la línea de metadatos, la entradilla, el botón "Marcar como leído" y la navegación entre secciones los genera la página.** No los escribas en el MDX.
- **Todo lo que escribas queda dentro de `prose prose-lg font-serif`:** los títulos, párrafos, listas, tablas y código toman su estilo de ahí automáticamente, en modo claro y oscuro.
- **Las clases de Tailwind escritas dentro de una lección no generan CSS.** `src/styles/global.css` excluye la carpeta de contenido con `@source not "../content";`. Una clase como `mb-8` o `text-red-500` en un `.mdx` no tendría ningún efecto. Por eso **no se escriben clases ni HTML** en las lecciones.

### 1.3 Dónde va cada archivo

| Qué           | Ruta                                                      | Formato del nombre                                                                                                                                                 |
| ------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Una lección   | `src/content/sections/<slug-del-curso>/NN-slug-corto.mdx` | `NN` = el `order` con dos cifras; `slug-corto` en minúsculas, sin tildes, con guiones. El nombre (sin `.mdx`) es la URL: `/cursos/<slug-del-curso>/NN-slug-corto`. |
| El curso      | `src/content/courses.json`                                | Una entrada por curso (`id`, `slug`, `title`, `plannedSections`, `published`…). Ya existe: no la crees.                                                            |
| La evaluación | `src/content/quizzes/<id-en-minúsculas>.yaml`             | Ver §3.7.                                                                                                                                                          |

Un archivo que empiece por `_` (`_borrador.mdx`) se ignora: sirve para borradores.

---

## 2. Estructura base (boilerplate)

Todo archivo de lección nuevo empieza con este esqueleto. Sustituye lo que va entre `⟨ ⟩` y respeta el orden de los bloques. Es el formato "receta", obligatorio en todas las lecciones.

````mdx
---
sectionId: "⟨ID de la sección, p. ej. A3.2⟩"
course: "⟨ID del curso, p. ej. A3⟩"
title: "⟨Título exacto del temario⟩"
order: ⟨número de la sección dentro del curso: 1, 2, 3…⟩
minutes: ⟨duración estimada en minutos, p. ej. 60⟩
summary: "⟨Una o dos frases en texto plano, 220 caracteres como máximo: qué construye y qué comprueba quien estudia⟩"
---

⟨Párrafo de entrada, 3–5 frases: el problema que resuelve la sección y qué se va a construir.⟩

**Lo que tendrás al terminar:** ⟨el resultado concreto: archivos, páginas, comandos⟩.

**Requisitos:** ⟨cursos previos, versiones o el proyecto de laboratorio de la sección anterior⟩.

## Paso 1: ⟨verbo + resultado⟩

⟨Explicación: el porqué y el cómo.⟩

```ts
// Archivo: ⟨ruta/del/archivo.ts⟩
⟨archivo completo⟩
```

```bash
⟨comando para ejecutarlo⟩
```

```text
⟨salida literal que produce⟩
```

- **⟨Idea clave en negrita:⟩** ⟨explicación⟩.

<Callout type="risk">

- **⟨Trampa concreta:⟩** ⟨qué pasa, por qué y cómo evitarla⟩.
- **⟨Rendimiento o seguridad:⟩** ⟨lo mismo⟩.

</Callout>

## Paso 2: ⟨verbo + resultado⟩

⟨…mismo patrón…⟩

## Ejercicio práctico

<Callout type="exercise">

1. ⟨Enunciado, en pasos numerados.⟩
2. ⟨…⟩

</Callout>

Solución. ⟨Todos los archivos completos, su salida real y las decisiones explicadas.⟩

<Callout type="risk">

- **⟨Riesgo propio de la solución:⟩** ⟨explicación⟩.

</Callout>

<Callout type="mastery">

⟨El criterio "Lo dominas si…" del temario, redactado como lo que quien estudia ya sabe hacer.⟩

</Callout>

## Resumen

- ⟨4–6 viñetas con lo esencial⟩.
````

### 2.1 Reglas del frontmatter

| Campo       | Tipo       | Regla (la valida `src/content.config.ts`; si no se cumple, el _build_ falla)                                                                                                          |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sectionId` | texto      | Cumple la expresión `^([BIA][1-8]\|P1)\.\d{1,2}$`: una letra B, I o A con una cifra del 1 al 8 (o `P1`), un punto y el número de la sección. Ejemplos: `"B1.3"`, `"I8.12"`, `"P1.1"`. |
| `course`    | texto      | El `id` de un curso que existe en `courses.json`, p. ej. `"A3"`.                                                                                                                      |
| `title`     | texto      | **Texto plano**: sin acentos graves, sin asteriscos, sin Markdown. Es el `h1` de la página.                                                                                           |
| `order`     | entero > 0 | Posición dentro del curso. Coincide con el `NN` del nombre del archivo.                                                                                                               |
| `minutes`   | entero > 0 | Duración estimada (por defecto, 60).                                                                                                                                                  |
| `summary`   | texto      | **Texto plano y 220 caracteres como máximo.** Se muestra como entradilla bajo el título y como descripción de la página.                                                              |

Las comillas dobles del frontmatter son obligatorias en los campos de texto. Si el texto contiene comillas dobles, usa comillas simples o reescribe la frase.

---

## 3. Mapeo de elementos (diccionario de componentes)

Cada elemento del texto plano se traduce a una sintaxis concreta. Las medidas son las **calculadas en el navegador** (Chrome, 1280 px de ancho) sobre lecciones publicadas; sirven para que sepas qué aspecto tendrá cada cosa, **no** para que escribas clases.

### 3.1 Títulos

| Elemento | Sintaxis en el MDX                                                                              | Lo pinta                                                                                      | Aspecto medido (claro / oscuro)                                                                   |
| -------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **H1**   | **No se escribe.** Sale del campo `title` del frontmatter.                                      | `<h1 class="mt-3 font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">` | Source Serif 4, 36 px (30 px en móvil), interlineado 40 px, peso 600, color `#0f172a` / `#e6edf3` |
| **H2**   | `## Paso N: verbo + resultado` (y `## Ejercicio práctico`, `## Resumen`)                        | `prose-lg` + `prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-14`      | Source Serif 4, 30 px, interlineado 40 px, peso 600, margen superior 56 px, inferior 32 px        |
| **H3**   | `### Subtítulo` — **excepcional** (1 uso en 97 lecciones). Solo para dividir un paso muy largo. | `prose-lg` + `prose-headings:*`                                                               | Source Serif 4, 24 px, interlineado 36 px, peso 600, margen superior 40 px, inferior 16 px        |
| H4 o más | **No se usan.**                                                                                 | —                                                                                             | —                                                                                                 |

Reglas de los títulos:

1. **Nunca escribas `# Título`** (H1) en el cuerpo: la página ya tiene uno, y una página con dos `h1` es un error de accesibilidad.
2. **Los pasos son `## Paso N: …`**, numerados desde 1, sin saltos, con un verbo y el resultado: `## Paso 2: los tipos de datos`, `## Paso 3: restricciones, que la base de datos diga que no`. La primera palabra tras los dos puntos va en minúscula.
3. **Tres `##` fijos** en todas las lecciones, con este texto exacto y en este orden, al final: `## Ejercicio práctico`, y después `## Resumen`. (La solución del ejercicio no lleva título propio: empieza con el párrafo "Solución.").
4. **No pongas nada de formato en un título** salvo código en línea: ``## Paso 4: `explain` a fondo`` es válido; `## Paso 4: **explain**` no.

### 3.2 Párrafos y énfasis

| Elemento          | Sintaxis                                                                 | Aspecto medido                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Párrafo           | Texto separado por una línea en blanco.                                  | Source Serif 4, 18 px, interlineado 32 px, separación de 24 px; color `#0f172a` / `#e6edf3`                                                          |
| Negrita           | `**texto**`                                                              | Peso 600, mismo color                                                                                                                                |
| Cursiva           | `_texto_` (con guiones bajos; Prettier convierte `*texto*` en `_texto_`) | Cursiva, mismo color                                                                                                                                 |
| Código en línea   | `` `codigo` ``                                                           | JetBrains Mono, 16 px, peso 500, fondo `#eaedf2` / `#161b22`, relleno 2,4 × 5,6 px, radio 6 px. Dentro de un `Callout`, fondo `#e2e8f0` / `#222a35`. |
| Lista con viñetas | `- elemento`                                                             | 18 px, separación de 12 px entre elementos; viñeta del color de acento                                                                               |
| Lista numerada    | `1. elemento`                                                            | Igual, con números                                                                                                                                   |
| Tabla             | Tabla de Markdown con `\| --- \|`                                        | 16 px; cabecera en peso 600; celdas con 12 px de relleno vertical; bordes `#e2e8f0` / `#222a35`                                                      |
| Enlace            | `[texto](https://…)`                                                     | Color `--accent-strong`. **Casi nunca se usa**: las referencias entre lecciones se hacen por su ID (`B4.3`, `I8.2`) en texto, sin enlace.            |

Cómo traducir el texto plano:

- **Negrita para la idea clave de cada viñeta**, seguida de dos puntos: `- **El índice no se usa:** porque…`. Es el patrón más frecuente de todas las lecciones (casi 4000 negritas).
- **Cursiva para los términos técnicos en inglés la primera vez que aparecen:** `_commit_`, `_endpoint_`, `_replica set_`. Las palabras que ya son de uso común en español (_test_, _script_) también se escriben en cursiva la primera vez.
- **Código en línea para todo lo que se escribe tal cual en un teclado:** nombres de archivos (`` `src/lib/ritmo.ts` ``), funciones (`` `withTransaction()` ``), comandos (`` `npm run check` ``), valores (`` `"light"` ``), mensajes de error cortos.
- **Si el código en línea contiene un acento grave** (una plantilla de JavaScript), delimítalo con **dos** acentos graves y un espacio por dentro: ``` `` `get${K}` `` ```.
- **Tablas para comparar** opciones, tipos o comandos (columnas cortas, sin párrafos dentro).
- **Párrafos cortos:** 1–4 frases. Frases cortas, en español claro, en segunda persona del singular ("vas a medir", "crea `archivo.ts`").

### 3.3 Bloques de código (paso a paso)

Cada bloque de código es un _fence_ de Markdown con su lenguaje. Lo colorea Shiki; tú no añades nada más.

**Paso 1: elige el lenguaje del _fence_.** Usa solo estos (son los que existen en las lecciones):

| Lenguaje                                                       | Para qué                                                     |
| -------------------------------------------------------------- | ------------------------------------------------------------ |
| `ts`, `tsx`, `js`                                              | Código de TypeScript, de React y de JavaScript               |
| `astro`                                                        | Componentes y páginas de Astro                               |
| `bash`, `sh`                                                   | Comandos de la terminal (`bash`) y _scripts_ de shell (`sh`) |
| `text`                                                         | **Salidas de consola, mensajes de error y medidas**          |
| `sql`, `json`, `jsonc`, `css`, `html`, `markdown`, `gitignore` | Lo que su nombre indica                                      |

**Paso 2: escribe la ruta del archivo en la primera línea, como comentario.** Obligatorio en todo archivo que se crea o se sustituye:

- `// Archivo: src/lib/ritmo.ts` en `ts`, `tsx`, `js`, `jsonc`
- `-- Archivo: 01-tipos.sql` en `sql`
- `# Archivo: …` en `sh`
- En `astro`, el comentario va dentro del _frontmatter_ del componente: `---` / `// Archivo: src/components/Card.astro` / … / `---`.
- Los bloques `bash` (comandos sueltos) y `text` (salidas) **no** llevan ruta.

**Paso 3: escribe el archivo entero.** Nada de `// ...`, `/* resto igual */` ni "completa tú esta parte". Si un archivo se modifica en un paso posterior, se vuelve a escribir **completo**, con la frase "Sustituye `ruta`:".

**Paso 4: añade cómo se ejecuta y qué sale.** Después del archivo, un bloque `bash` con el comando y un bloque `text` con la **salida literal** (copiada de una ejecución real, nunca inventada).

**Paso 5: explica lo importante** en una lista de viñetas con la idea clave en negrita.

**Paso 6: cierra con un `<Callout type="risk">`** (§3.4) si el bloque era importante.

Ejemplo completo:

````mdx
Crea `src/lib/ritmo.ts`:

```ts
// Archivo: src/lib/ritmo.ts
// El ritmo medio de un entreno de running: cuánto se tarda en cada km

/** "m:ss min/km", o null si no hay km (no se puede dividir entre 0) */
export function ritmo(minutos: number, km: number | undefined): string | null {
  if (!km || km <= 0) return null;
  const segundosPorKm = Math.round((minutos * 60) / km);
  const min = Math.floor(segundosPorKm / 60);
  const seg = segundosPorKm % 60;
  return `${min}:${String(seg).padStart(2, "0")} min/km`;
}

console.log(ritmo(25, 5)); // 25 min en 5 km
console.log(ritmo(24.995, 5)); // 299,94 s por km
```

```bash
node src/lib/ritmo.ts
```

```text
5:00 min/km
5:00 min/km
```

- **Se redondea el total de segundos y después se separa:** 299,94 s se convierten en 300 s y dan "5:00". Si se redondearan solo los segundos sueltos, quedaría "4:60".
````

Aspecto medido de un bloque de código: JetBrains Mono, 15,75 px, interlineado 25,2 px, fondo `#eaedf2` / `#161b22`, borde de 1 px `#e2e8f0` / `#222a35`, radio de 12 px, relleno de 16 × 20 px, separación de 24 px arriba y abajo. Las líneas largas generan _scroll_ horizontal dentro del bloque (no se parten).

**Bloques de código dentro de una lista** (por ejemplo, la salida de un error dentro de una viñeta de un `Callout`): todo el bloque, incluidas sus líneas y sus _fences_, va sangrado con **dos espacios**, y con una línea en blanco antes y después:

````mdx
- **El error que aparece:**

  ```text
  ERROR: integer out of range
  ```

  Y la explicación sigue con la misma sangría.
````

**Un ejemplo de MDX que contiene _fences_** (como los de esta guía) se envuelve en un _fence_ de **cuatro** acentos graves: ` ````mdx `.

### 3.4 ⚠️ Complicaciones y riesgos (`<Callout>`)

`<Callout>` es el **único componente** que existe en las lecciones. No hace falta importarlo: la página lo inyecta. Se pinta como una caja con el fondo `--surface`, un borde izquierdo de color y una etiqueta en versalitas.

| `type`     | Etiqueta que muestra     | Borde izquierdo (claro / oscuro)               | Cuándo                                                                                        |
| ---------- | ------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `risk`     | COMPLICACIONES Y RIESGOS | `#f25c76` / `#f87191` (`border-danger`)        | **Obligatorio** después de cada bloque de código importante, y tras la solución del ejercicio |
| `exercise` | EJERCICIO                | `#0d9488` / `#2dd4bf` (`border-accent`)        | Una vez, justo debajo de `## Ejercicio práctico`                                              |
| `mastery`  | LO DOMINAS SI…           | `#0f766e` / `#5eead4` (`border-accent-strong`) | Una vez, al final del ejercicio, antes de `## Resumen`                                        |
| `note`     | NOTA                     | `--info`                                       | Solo si de verdad hace falta (no hay ninguno en las lecciones actuales)                       |
| `tip`      | CONSEJO                  | `--accent`                                     | Ídem                                                                                          |
| `warning`  | CUIDADO                  | `--warning`                                    | Ídem                                                                                          |

Propiedad opcional `title="…"`: sustituye la etiqueta (casi nunca se usa).

Aspecto medido: caja con relleno de 16 × 20 px, borde izquierdo de 4 px, esquinas derechas redondeadas, separación de 32 px arriba y abajo (0 arriba si va justo debajo de un `##`), fondo `#eaedf2` / `#161b22`. La etiqueta: Inter, 12 px, peso 600, mayúsculas, color `#475569` / `#9aa4b2`. El contenido hereda el estilo de la lección (listas, código, negritas).

**Sintaxis exacta, carácter a carácter:**

```mdx
<Callout type="risk">

- **Trampa concreta, en negrita y con dos puntos:** qué pasa, por qué y cómo evitarla.
- **Segunda trampa:** lo mismo.

</Callout>
```

Reglas que no admiten excepciones:

1. **Una línea en blanco** después de `<Callout type="…">` y otra antes de `</Callout>`. Es la convención de las 97 lecciones y la que pide el plan del proyecto. El compilador de MDX de Astro 7 también interpreta el contenido sin ellas (comprobado), pero la regla deja cada bloque de Markdown separado sin ambigüedad y hace que todas las lecciones se lean igual.
2. **El contenido va sin sangría**, pegado al margen izquierdo. MDX desactiva los bloques de código sangrados, así que cuatro espacios no producen código, pero sí un archivo distinto de todos los demás. La única sangría válida es la de un bloque dentro de una lista (§3.3).
3. **El contenido de un `risk` es una lista de 2 o 3 viñetas**, cada una con la trampa en negrita y su explicación: errores comunes, problemas de rendimiento o de seguridad, comportamientos sorprendentes de la tecnología. Nunca un resumen de lo explicado.
4. **El contenido de un `exercise` es una lista numerada** con el enunciado. **El de un `mastery` es un único párrafo** que empieza por lo que quien estudia ya sabe hacer.
5. Las comillas del atributo son dobles: `type="risk"`.

### 3.5 Salidas, errores y medidas

- Toda salida de consola, mensaje de error o medida va en un bloque `text`, **copiada literalmente** de una ejecución real. Si el texto plano que recibes incluye una salida, cópiala sin retocarla.
- Si el texto menciona una salida pero no la incluye, **no la inventes**: deja un marcador visible y dilo al entregar el archivo (`⟨SALIDA PENDIENTE: resultado de npm run test⟩`).
- Las rutas absolutas personales (`/Users/…`) se sustituyen por una ruta corta del proyecto (`/mi-proyecto/…`).

### 3.6 Lo que no existe en las lecciones

Nada de esto aparece en las 97 lecciones publicadas. No lo uses:

- Citas (`> texto`).
- Imágenes (`![…](…)`) y diagramas.
- HTML crudo (`<div>`, `<span>`, `<br>`, `<details>`…) y cualquier componente que no sea `<Callout>`.
- `import` o `export` en el MDX.
- Emojis decorativos. Solo aparecen ✅ / ❌ en alguna tabla de comparación, ✓ / ✗ al describir lo que muestra una interfaz y los que contenga una salida copiada.
- Notas al pie.

### 3.7 La evaluación del curso (si te la piden)

Un archivo YAML por curso, con exactamente **5 preguntas** de **4 opciones**:

```yaml
course: A3
passingScore: 4
questions:
  - prompt: "¿Qué hace `ROW_NUMBER()` con `PARTITION BY`?"
    code: |
      SELECT ROW_NUMBER() OVER (PARTITION BY curso_id ORDER BY fecha DESC) FROM evaluaciones;
    options:
      - "Numera todas las filas de la tabla, una vez."
      - "Numera las filas de cada grupo por separado, empezando en 1 en cada uno, según el ORDER BY."
      - "Borra las filas repetidas."
      - "Cuenta cuántas filas tiene cada grupo."
    answer: 1
    explanation: "Cada curso empieza su propia numeración, así que rn = 1 es la fila más reciente de cada curso: la forma de resolver el último de cada grupo."
```

- `answer` es la posición (0–3) de la opción correcta. **Reparte** la posición de la correcta entre las cinco preguntas.
- `code` es opcional y se muestra como bloque de código.
- En `prompt`, `options` y `explanation` **solo** se admite código en línea con acentos graves. Ni negritas ni otro Markdown: no se interpretan.
- Si el texto lleva comillas dobles, envuélvelo en comillas simples (`'…"…"…'`), o al revés.

---

## 4. Reglas de oro

1. **No escribas clases de Tailwind ni HTML en el MDX.** No tendrían efecto (`@source not "../content"`) y romperían la coherencia. El aspecto lo dan `prose` y `<Callout>`.
2. **No controles márgenes, tamaños ni colores.** Los espaciados (24 px entre párrafos, 56 px antes de cada `##`, 32 px alrededor de cada `Callout`, 24 px alrededor de cada bloque de código) salen del _layout_. No añadas líneas en blanco de más ni separadores (`---`) para "dar aire".
3. **El modo claro y el oscuro son automáticos.** Todo color sale de variables (`--fg`, `--muted`, `--surface`, `--accent-strong`…) que cambian con `[data-theme="dark"]`. No hay nada que hacer por tema en el MDX, y nunca se escribe un color.
4. **Un solo `h1`, y no es tuyo:** sale de `title`. El cuerpo empieza con el párrafo de entrada.
5. **Formato receta siempre:** entrada, "Lo que tendrás al terminar", "Requisitos", `## Paso 1…N`, `## Ejercicio práctico` (con `exercise`, solución, `risk` y `mastery`) y `## Resumen`. En ese orden.
6. **Código literal y completo:** archivos enteros con su ruta en la primera línea; prohibido `// ...`.
7. **Un `<Callout type="risk">` tras cada bloque de código importante**, con trampas reales, no con un resumen.
8. **Ninguna salida inventada:** las salidas y medidas son las del texto que recibes, literales.
9. **`title` y `summary` en texto plano; `summary` ≤ 220 caracteres.** Cuenta los caracteres antes de entregarlo.
10. **`Callout` con una línea en blanco tras la apertura y antes del cierre, y su contenido sin sangría.**
11. **En el texto normal, escapa lo que MDX interpretaría:** `{`, `}` y `<` seguidos de una letra (por ejemplo `<T>` o `{ a: 1 }`) solo pueden aparecer **dentro de código** (en línea o en bloque). Fuera de código, MDX los toma como JSX y el _build_ falla.
12. **Cursiva con guiones bajos (`_término_`) y negrita con asteriscos (`**idea**`)**, que es lo que deja Prettier.
13. **Referencias a otras lecciones por su ID** (`B4.3`, `I8.2`), sin enlace.
14. **Al terminar, el archivo tiene que pasar `npx prettier --write` sin cambios relevantes** y `npm run build` sin errores.

---

## 5. Ejemplo completo

Un tema inventado, "Calcular la racha de días de estudio", maquetado de principio a fin. Las salidas son de ejemplo (en una lección real, serían las de su laboratorio).

````mdx
---
sectionId: "B9.1"
course: "B9"
title: "La racha de días de estudio"
order: 1
minutes: 45
summary: "Calculas cuántos días seguidos ha estudiado alguien, con fechas en la zona horaria correcta, y compruebas el caso de un día sin estudio a medianoche."
---

Una racha es el número de días seguidos con actividad: si estudiaste ayer, anteayer y hoy, tu racha es de tres días. Parece una cuenta sencilla, pero tiene una trampa: qué es "un día" depende de la zona horaria. En esta sección vas a escribir la función que calcula la racha, a probarla con días reales y a comprobar qué pasa con una sesión que termina a medianoche.

**Lo que tendrás al terminar:** `src/lib/racha.ts`, con la función `racha()`, y una prueba que la ejecuta con los días de estudio de una semana.

**Requisitos:** el curso B1 (TypeScript) y Node 24 o superior.

## Paso 1: los días, como texto

Una fecha con hora (`Date`) no sirve para comparar días: las 23:30 y las 00:10 son días distintos, aunque estén a 40 minutos. Convierte cada sesión en su día, como texto `AAAA-MM-DD`, en la zona horaria de quien estudia. Crea `src/lib/racha.ts`:

```ts
// Archivo: src/lib/racha.ts
// La racha: cuántos días seguidos, hasta hoy, tienen al menos una sesión de estudio

/** "AAAA-MM-DD" del instante, en la zona horaria indicada */
export function diaDe(instante: Date, zona: string): string {
  return instante.toLocaleDateString("en-CA", { timeZone: zona });
}

/** Días seguidos con estudio, contando hacia atrás desde hoy (o desde ayer, si hoy aún no hay) */
export function racha(sesiones: Date[], hoy: Date, zona: string): number {
  const dias = new Set(sesiones.map((s) => diaDe(s, zona)));
  const cursor = new Date(hoy);
  if (!dias.has(diaDe(cursor, zona))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let n = 0;
  while (dias.has(diaDe(cursor, zona))) {
    n++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return n;
}
```

- **`en-CA` da el formato `AAAA-MM-DD`:** es el truco más corto para obtener la fecha como texto ordenable, y `timeZone` la calcula en la zona de quien estudia.
- **Un `Set` de días:** dos sesiones el mismo día cuentan una sola vez.
- **Si hoy todavía no hay sesión, se empieza por ayer:** a las ocho de la mañana, una racha de cinco días no se ha roto todavía.

<Callout type="risk">

- **Sin `timeZone`, el día lo decide el servidor:** en un servidor en UTC, una sesión a las 19:00 de México ya cuenta como el día siguiente, y la racha se rompe o se alarga sin motivo.
- **`setUTCDate` y no `setDate`:** `setDate` usa la zona del proceso, y un cambio de horario de verano puede hacer que el cursor se quede dos veces en el mismo día.

</Callout>

## Paso 2: probarla con una semana real

Crea `src/lib/racha.prueba.ts`, con las sesiones de una semana y una que termina a medianoche:

```ts
// Archivo: src/lib/racha.prueba.ts
import { racha } from "./racha.ts";

const ZONA = "America/Mexico_City";
const sesiones = [
  new Date("2026-10-14T15:00:00Z"),
  new Date("2026-10-15T23:30:00Z"), // 17:30 en México: día 15
  new Date("2026-10-17T05:40:00Z"), // 23:40 del día 16 en México
];

console.log(racha(sesiones, new Date("2026-10-17T18:00:00Z"), ZONA));
```

```bash
node src/lib/racha.prueba.ts
```

```text
3
```

- **La sesión de las 05:40 UTC cuenta para el día 16:** en México todavía eran las 23:40. Con el día en UTC, la racha habría sido de 1.

<Callout type="risk">

- **Prueba siempre los bordes del día:** las 23:59 y las 00:00 son donde fallan casi todos los cálculos de fechas. Una prueba con sesiones a media tarde no los detecta.
- **El "hoy" de la prueba es fijo:** si la prueba usara `new Date()`, su resultado cambiaría cada día.

</Callout>

## Ejercicio práctico

<Callout type="exercise">

1. Añade a `racha()` un parámetro `minimoMinutos`, para que solo cuenten los días con al menos ese tiempo de estudio.
2. Prueba un día con dos sesiones cortas que juntas superan el mínimo.

</Callout>

Solución. Sustituye `src/lib/racha.ts`:

```ts
// Archivo: src/lib/racha.ts
// La racha, contando solo los días con un mínimo de minutos de estudio

export interface Sesion {
  inicio: Date;
  minutos: number;
}

export function diaDe(instante: Date, zona: string): string {
  return instante.toLocaleDateString("en-CA", { timeZone: zona });
}

export function racha(sesiones: Sesion[], hoy: Date, zona: string, minimoMinutos = 1): number {
  const porDia = new Map<string, number>();
  for (const s of sesiones) {
    const dia = diaDe(s.inicio, zona);
    porDia.set(dia, (porDia.get(dia) ?? 0) + s.minutos);
  }
  const cuenta = (dia: string) => (porDia.get(dia) ?? 0) >= minimoMinutos;
  const cursor = new Date(hoy);
  if (!cuenta(diaDe(cursor, zona))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let n = 0;
  while (cuenta(diaDe(cursor, zona))) {
    n++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return n;
}
```

Y sustituye `src/lib/racha.prueba.ts`, porque las sesiones ahora llevan sus minutos:

```ts
// Archivo: src/lib/racha.prueba.ts
import { racha } from "./racha.ts";

const ZONA = "America/Mexico_City";
const hoy = new Date("2026-10-17T18:00:00Z");
const sesiones = [
  { inicio: new Date("2026-10-15T23:30:00Z"), minutos: 20 },
  { inicio: new Date("2026-10-16T15:00:00Z"), minutos: 10 }, // dos sesiones cortas el día 16
  { inicio: new Date("2026-10-16T20:00:00Z"), minutos: 10 },
  { inicio: new Date("2026-10-17T15:00:00Z"), minutos: 5 }, // hoy, por debajo del mínimo
];

console.log("mínimo 1:", racha(sesiones, hoy, ZONA));
console.log("mínimo 15:", racha(sesiones, hoy, ZONA, 15));
```

```bash
node src/lib/racha.prueba.ts
```

```text
mínimo 1: 3
mínimo 15: 2
```

- **Los minutos se suman por día antes de comparar:** las dos sesiones de 10 minutos del día 16 cumplen el mínimo de 15.
- **Hoy no cuenta todavía, pero no rompe la racha:** con 5 minutos, el cálculo empieza por ayer y da 2 (días 16 y 15).

<Callout type="risk">

- **Una sesión que cruza la medianoche cuenta entera en el día en que empezó:** para repartirla entre dos días habría que partirla en el cálculo.

</Callout>

<Callout type="mastery">

Calculas una racha de días sin errores de zona horaria: conviertes cada instante en su día en la zona de quien estudia, cuentas los días únicos hacia atrás desde hoy (o desde ayer) y pruebas los bordes de la medianoche con un "hoy" fijo.

</Callout>

## Resumen

- Un día se compara como texto `AAAA-MM-DD`, calculado con `timeZone` en la zona de quien estudia.
- La racha cuenta hacia atrás desde hoy, o desde ayer si hoy aún no hay sesión.
- `setUTCDate` para avanzar el cursor sin depender de la zona del proceso.
- Las pruebas fijan el "hoy" y cubren las 23:59 y las 00:00.
````

---

### Lista de comprobación antes de entregar el archivo

- [ ] Frontmatter con los seis campos; `sectionId` con el formato correcto; `title` y `summary` en texto plano; `summary` ≤ 220 caracteres.
- [ ] Sin `#` (H1) en el cuerpo; pasos `## Paso N:` seguidos; `## Ejercicio práctico` y `## Resumen` al final.
- [ ] Cada archivo de código, completo y con `// Archivo:` (o su equivalente) en la primera línea.
- [ ] Cada bloque de código importante, seguido de un `<Callout type="risk">`.
- [ ] Un `exercise`, la solución completa con su `risk`, y un `mastery`.
- [ ] Todos los `Callout` con líneas en blanco dentro y contenido sin sangría.
- [ ] Ninguna clase, HTML, `import`, imagen ni cita; ningún `{`, `}` o `<Etiqueta` fuera de código.
- [ ] Ninguna salida inventada: las que no se tienen, marcadas como pendientes.
