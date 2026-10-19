## 2. Ruta de aprendizaje

Para resolver ambos retos por tu cuenta y con fluidez en menos de 5 minutos, domina estos conceptos en el siguiente orden:

### Nivel 1: Recorrido y extracción de datos
1. **Iteración sobre listas con `for`:**
   * Cómo recorrer elemento por elemento una lista en Python, entendiendo que en `total_sales_by_product` la variable de iteración en cada vuelta del ciclo no es un número ni un texto, sino **un diccionario completo**.
2. **Acceso a valores en un diccionario:**
   * Cómo extraer el valor asociado a una clave conocida usando corchetes (por ejemplo, obtener el valor de `"product"` y el de `"quantity"` dentro de cada elemento de la lista).

### Nivel 2: Manipulación del diccionario acumulador (Clave para el problema de ventas)
3. **Verificación de pertenencia en diccionarios (Operador `in`):**
   * Cómo preguntar en una estructura condicional `if / else` si una clave ya existe dentro de un diccionario antes de intentar modificarla.
4. **Asignación y actualización de claves en un diccionario:**
   * Cómo crear una nueva pareja clave-valor en un diccionario vacío y cómo incrementar el valor de una clave existente usando el operador de suma acumulada (`+=`).
5. **Método `.get()` de los diccionarios (Alternativa intermedia/avanzada):**
   * Una vez que domines la solución con `if / else`, investiga cómo funciona el método `.get(clave, valor_por_defecto)` de los diccionarios en Python. Te permite consultar el valor de una clave y, si aún no existe, devolver `0` automáticamente, reduciendo varias líneas de condicionales a una sola línea.

### Nivel 3: Operaciones matemáticas y control de flujo (Clave para el problema de las hormigas)
6. **Condicionales múltiples (`if / elif / else`) o conteo en listas (`.count()`):**
   * Cómo evaluar qué código de movimiento (`0`, `1`, `2` o `3`) se está procesando en cada paso, o bien cómo usar métodos nativos de listas para contar cuántas veces aparece cada número.
7. **Operadores aritméticos y conversión de tipos en Python:**
   * Potenciación con el operador `**` (para elevar al cuadrado o calcular raíces elevando a `0.5`).
   * Biblioteca estándar `math`: uso de `math.sqrt()` para raíz cuadrada o `math.isqrt()` (que calcula directamente la raíz cuadrada entera truncada), además de la función nativa `int()` para truncar números decimales.