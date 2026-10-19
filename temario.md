# Temario de Programación en Python: Estructuras de Datos, Flujo y Matemáticas

Este documento desarrolla en detalle los 7 temas fundamentales de la ruta de aprendizaje definida en `temas-python.md`, orientados al procesamiento de colecciones de datos (como el cálculo de ventas por producto) y a la resolución de problemas algorítmicos y matemáticos (como el desplazamiento en un plano).

---

## 1. Iteración sobre listas con `for`

**Concepto:**
En Python, el bucle `for` es un iterador diseñado para recorrer de forma secuencial los elementos de cualquier objeto iterable (como listas, tuplas, cadenas de texto o diccionarios). A diferencia de otros lenguajes donde se itera sobre índices numéricos por defecto, en Python la variable de iteración toma directamente el **valor del elemento actual** en cada vuelta del ciclo. Cuando se trabaja con estructuras compuestas —por ejemplo, una lista de diccionarios como en registros de ventas (`total_sales_by_product`)—, en cada iteración la variable temporal no almacena un número ni un texto aislado, sino **un diccionario completo** que representa un registro individual.

**Ejemplo de código:**
```python
# Lista de ventas donde cada elemento es un diccionario completo
ventas = [
    {"product": "Laptop", "quantity": 2},
    {"product": "Mouse", "quantity": 5},
    {"product": "Teclado", "quantity": 3}
]

# En cada vuelta del ciclo, la variable 'registro' contiene un diccionario completo
for registro in ventas:
    # Mostramos el tipo de dato y el contenido completo del elemento actual
    print(f"Tipo: {type(registro)} | Contenido: {registro}")
```

**Casos de uso / Mejores prácticas:**
* **Procesamiento de datos tabulares o JSON:** Ideal para recorrer respuestas de APIs REST, filas leídas desde archivos CSV/JSON o resultados de consultas a bases de datos donde cada fila se modela como un diccionario.
* **Nombres descriptivos en singular/plural:** Usa nombres en plural para la lista (`ventas`, `usuarios`, `movimientos`) y en singular para la variable de iteración (`venta`, `usuario`, `movimiento`).
* **Evita usar `range(len(lista))` innecesariamente:** Recorre siempre los elementos directamente (`for item in lista:`). Si necesitas también el índice numérico, utiliza la función nativa `enumerate(lista)`.

---

## 2. Acceso a valores en un diccionario

**Concepto:**
Un diccionario (`dict`) en Python es una estructura de datos basada en tablas hash que almacena pares de **clave-valor** (`key: value`). Para extraer el valor asociado a una clave conocida, se utiliza la notación de corchetes `diccionario[clave]`. Esta operación tiene una complejidad temporal promedio de $O(1)$ (tiempo constante), lo que significa que es extremadamente rápida sin importar el tamaño del diccionario. Sin embargo, si se intenta acceder mediante corchetes a una clave que no existe en el diccionario, Python lanzará una excepción `KeyError`.

**Ejemplo de código:**
```python
# Diccionario que representa una transacción de venta individual
venta = {
    "product": "Monitor 27 pulgadas",
    "quantity": 4,
    "price": 250.00
}

# Extracción de valores usando sus claves exactas entre corchetes
nombre_producto = venta["product"]
cantidad_vendida = venta["quantity"]
precio_unitario = venta["price"]

# Uso de los valores extraídos para calcular el subtotal
subtotal = cantidad_vendida * precio_unitario
print(f"Producto: {nombre_producto} | Cantidad: {cantidad_vendida} | Subtotal: ${subtotal}")

# Ejemplo combinado: recorrer una lista de diccionarios y extraer sus campos
lista_ventas = [
    {"product": "Laptop", "quantity": 2},
    {"product": "Mouse", "quantity": 5}
]

for item in lista_ventas:
    print(f"Se vendieron {item['quantity']} unidades de {item['product']}.")
```

**Casos de uso / Mejores prácticas:**
* **Esquemas de datos fijos y garantizados:** Utiliza el acceso directo con corchetes `d["clave"]` cuando tengas la certeza de que la clave siempre está presente en el diccionario (por ejemplo, datos previamente validados o estructuras internas controladas).
* **Fallo rápido (Fail-Fast):** En etapas de desarrollo o validación, usar corchetes es útil porque un `KeyError` alerta inmediatamente si un registro viene corrupto o con un nombre de campo mal escrito.
* **Cuidado con mayúsculas y espacios:** Las claves de tipo texto distinguen entre mayúsculas y minúsculas (`"Product"` no es igual a `"product"`).

---

## 3. Verificación de pertenencia en diccionarios (Operador `in`)

**Concepto:**
El operador `in` evalúa si un elemento pertenece a una colección y devuelve un valor booleano (`True` o `False`). Cuando se aplica directamente sobre un diccionario (`clave in diccionario`), Python verifica de manera eficiente en tiempo constante $O(1)$ si la **clave** existe dentro del conjunto de claves del diccionario (no busca en los valores). Combinado con una estructura condicional `if / else`, permite comprobar de forma segura si un registro ya fue inicializado en un diccionario acumulador antes de intentar leerlo o modificarlo, evitando errores de tipo `KeyError`.

**Ejemplo de código:**
```python
# Diccionario acumulador con inventario inicial
inventario = {
    "Laptop": 10,
    "Mouse": 25
}

productos_a_consultar = ["Laptop", "Teclado"]

for producto in productos_a_consultar:
    # Verificamos si la clave ya existe en el diccionario antes de acceder a ella
    if producto in inventario:
        print(f"El producto '{producto}' existe. Stock actual: {inventario[producto]}")
    else:
        print(f"El producto '{producto}' aún no está registrado en el inventario.")
```

**Casos de uso / Mejores prácticas:**
* **Patrón de agrupación y conteo clásico:** Es el paso fundamental para construir diccionarios acumuladores desde cero cuando no se sabe de antemano qué claves aparecerán en los datos de entrada.
* **No uses `in diccionario.keys()`:** Escribir `if clave in diccionario:` es la forma idiomática (Pythonic) y más rápida; llamar a `.keys()` es redundante.
* **Búsqueda por valores:** Si en algún caso específico necesitas verificar si un dato existe entre los *valores* y no entre las claves, debes especificar explícitamente `valor in diccionario.values()`.

---

## 4. Asignación y actualización de claves en un diccionario

**Concepto:**
Los diccionarios en Python son estructuras **mutables**, lo que permite agregar nuevos pares clave-valor o modificar los existentes en cualquier momento utilizando la sintaxis `diccionario[clave] = nuevo_valor`.
* Si la clave **no existe**, Python crea automáticamente la nueva entrada en el diccionario con el valor asignado.
* Si la clave **ya existe**, Python sobrescribe su valor anterior. Para incrementar el valor numérico de una clave existente sin perder el acumulado previo, se utiliza el operador de asignación con suma acumulada (`+=`), donde `d[clave] += cantidad` equivale exactamente a `d[clave] = d[clave] + cantidad`.

**Ejemplo de código:**
```python
# Lista de transacciones donde los productos se repiten
ventas = [
    {"product": "Laptop", "quantity": 2},
    {"product": "Mouse", "quantity": 5},
    {"product": "Laptop", "quantity": 3},
    {"product": "Teclado", "quantity": 1},
    {"product": "Mouse", "quantity": 2}
]

# 1. Creamos un diccionario vacío que servirá como acumulador
total_por_producto = {}

# 2. Recorremos cada venta y actualizamos el acumulador
for venta in ventas:
    producto = venta["product"]
    cantidad = venta["quantity"]

    if producto in total_por_producto:
        # Si la clave ya existe, sumamos la nueva cantidad al valor acumulado
        total_por_producto[producto] += cantidad
    else:
        # Si la clave no existe, la creamos con la cantidad inicial
        total_por_producto[producto] = cantidad

print("Total de ventas por producto:", total_por_producto)
# Salida: {'Laptop': 5, 'Mouse': 7, 'Teclado': 1}
```

**Casos de uso / Mejores prácticas:**
* **Reportes y agregaciones financieras:** Sumarizar totales de ventas por categoría, calcular saldos por cliente o contar frecuencias de palabras en un texto.
* **Inicialización obligatoria antes de `+=`:** Nunca ejecutes `diccionario[clave] += valor` sin asegurarte antes de que `clave` ya existe en el diccionario, ya que Python necesita leer primero el valor actual para poder sumarle el nuevo.

---

## 5. Método `.get()` de los diccionarios (Alternativa intermedia/avanzada)

**Concepto:**
El método `.get(clave, valor_por_defecto)` permite consultar el valor asociado a una clave de forma segura sin riesgo de provocar un `KeyError`. Su funcionamiento interno es el siguiente:
1. Busca `clave` dentro del diccionario.
2. Si la clave **existe**, devuelve su valor actual.
3. Si la clave **no existe**, devuelve `valor_por_defecto` (si no se especifica un segundo argumento, devuelve `None` por defecto).

En problemas de acumulación, pasar `0` como valor por defecto (`diccionario.get(clave, 0)`) permite reemplazar todo un bloque condicional `if / else` de cuatro líneas por **una sola línea de código**, ya que si la clave es nueva devuelve `0` y le suma la cantidad actual, y si ya existe devuelve el acumulado previo y le suma la cantidad actual.

**Ejemplo de código:**
```python
ventas = [
    {"product": "Laptop", "quantity": 2},
    {"product": "Mouse", "quantity": 5},
    {"product": "Laptop", "quantity": 3},
    {"product": "Teclado", "quantity": 1}
]

total_por_producto = {}

for venta in ventas:
    producto = venta["product"]
    cantidad = venta["quantity"]

    # Si 'producto' no existe aún, .get() devuelve 0; luego se suma 'cantidad'
    # y el resultado se asigna a la clave 'producto' en una sola línea:
    total_por_producto[producto] = total_por_producto.get(producto, 0) + cantidad

print("Resultado con .get():", total_por_producto)
# Salida: {'Laptop': 5, 'Mouse': 5, 'Teclado': 1}
```

**Casos de uso / Mejores prácticas:**
* **Acumuladores concisos y legibles:** Es el patrón estándar en entrevistas técnicas y código de producción para reducir la verbosidad al acumular sumas o conteos en un diccionario.
* **Lectura de configuraciones o JSON con campos opcionales:** Muy útil cuando un diccionario puede o no traer ciertos metadatos (por ejemplo, `descuento = pedido.get("discount", 0.0)`).
* **Alternativas de la biblioteca estándar:** Para proyectos grandes donde se realizan conteos o agrupaciones intensivas, también conviene conocer `collections.defaultdict(int)` y `collections.Counter`.

---

## 6. Condicionales múltiples (`if / elif / else`) o conteo en listas (`.count()`)

**Concepto:**
Cuando un algoritmo debe procesar una secuencia de códigos discretos (por ejemplo, instrucciones de movimiento en una cuadrícula representadas por `0`: Norte/Arriba, `1`: Sur/Abajo, `2`: Este/Derecha, `3`: Oeste/Izquierda), existen dos enfoques principales en Python:
1. **Enfoque imperativo con `if / elif / else`:** Evalúa paso a paso cada elemento dentro de un bucle `for`. Tan pronto como una condición se cumple, ejecuta su bloque correspondiente y salta el resto de las ramas (`elif`/`else`), actualizando las coordenadas $(x, y)$ en cada paso.
2. **Enfoque declarativo con `.count(elemento)`:** El método nativo de listas `.count(x)` recorre la lista internamente y devuelve un número entero con la cantidad exacta de veces que aparece el valor `x`. Si el orden de los pasos no altera la posición final (propiedad conmutativa de la suma de vectores), contar cuántos pasos hubo en cada dirección permite calcular el desplazamiento neto directamente sin escribir un ciclo explícito.

**Ejemplo de código:**
```python
# Secuencia de movimientos de una hormiga:
# 0 = Norte (+y), 1 = Sur (-y), 2 = Este (+x), 3 = Oeste (-x)
movimientos = [0, 0, 2, 0, 3, 2, 2, 1, 0, 2]

# --- ENFOQUE 1: Ciclo con condicionales múltiples (if / elif / else) ---
x, y = 0, 0

for paso in movimientos:
    if paso == 0:
        y += 1  # Sube al Norte
    elif paso == 1:
        y -= 1  # Baja al Sur
    elif paso == 2:
        x += 1  # Avanza al Este
    elif paso == 3:
        x -= 1  # Avanza al Oeste

print(f"Posición final (con if/elif): x = {x}, y = {y}")

# --- ENFOQUE 2: Uso del método nativo .count() ---
# El desplazamiento neto en Y es (pasos al Norte - pasos al Sur)
# El desplazamiento neto en X es (pasos al Este - pasos al Oeste)
y_neto = movimientos.count(0) - movimientos.count(1)
x_neto = movimientos.count(2) - movimientos.count(3)

print(f"Posición final (con .count()): x = {x_neto}, y = {y_neto}")
```

**Casos de uso / Mejores prácticas:**
* **Cuándo usar `.count()`:** Cuando el conjunto de códigos posibles es pequeño y fijo (por ejemplo, 4 direcciones cardinales) y solo importa el resultado final neto. El código queda sumamente limpio, corto y menos propenso a errores de indentación.
* **Cuándo usar `if / elif / else` en un bucle:**
  * Cuando necesitas validar el estado **en cada paso intermedio** (por ejemplo, detectar si la hormiga choca contra un muro, sale de un límite permitido o pasa dos veces por la misma coordenada).
  * Cuando la lista es extremadamente grande (millones de elementos) y quieres recorrerla **una sola vez** en lugar de llamar a `.count()` cuatro veces seguidas.

---

## 7. Operadores aritméticos y conversión de tipos en Python

**Concepto:**
Para resolver cálculos geométricos y físicos —como obtener la distancia euclidiana en línea recta desde el origen $(0, 0)$ hasta una coordenada final $(x, y)$ mediante el Teorema de Pitágoras $d = \sqrt{x^2 + y^2}$—, Python ofrece operadores nativos y funciones especializadas en su biblioteca estándar `math`:
* **Operador de potenciación (`**`):** Eleva el número de la izquierda a la potencia de la derecha. Por ejemplo, `x ** 2` calcula el cuadrado de `x`, mientras que `(x**2 + y**2) ** 0.5` calcula la raíz cuadrada utilizando exponentes fraccionarios ($\sqrt{n} = n^{0.5}$).
* **`math.sqrt(n)`:** Función del módulo `math` que calcula la raíz cuadrada de `n` devolviendo siempre un número de punto flotante (`float`). Es más legible y explícita que elevar a `0.5`.
* **Conversión con `int()`:** Cuando se aplica a un número decimal (`float`), la función nativa `int(x)` **trunca** la parte decimal (la elimina sin redondear al entero más cercano; por ejemplo, `int(4.9)` devuelve `4`).
* **`math.isqrt(n)`:** Disponible desde Python 3.8+, calcula directamente la **raíz cuadrada entera** ($\lfloor\sqrt{n}\rfloor$) de un número entero no negativo, devolviendo un `int` truncado con precisión exacta y sin pasar por números de punto flotante.

**Ejemplo de código:**
```python
import math

# Supongamos que la hormiga terminó en la coordenada (x = 3, y = 4) o (x = 5, y = 5)
x = 5
y = 5

# 1. Suma de los cuadrados de los catetos usando el operador de potencia (**)
suma_cuadrados = (x ** 2) + (y ** 2)  # 25 + 25 = 50

# 2. Alternativa A: Raíz cuadrada con exponente 0.5 y truncado con int()
distancia_exp = int(suma_cuadrados ** 0.5)

# 3. Alternativa B: Raíz cuadrada con math.sqrt() y truncado con int()
distancia_float = math.sqrt(suma_cuadrados)  # 7.0710678118654755
distancia_sqrt = int(distancia_float)        # 7 (truncado a entero)

# 4. Alternativa C: Raíz cuadrada entera directa con math.isqrt()
distancia_isqrt = math.isqrt(suma_cuadrados) # 7 (directamente como int)

print(f"Suma de cuadrados: {suma_cuadrados}")
print(f"Distancia exacta (float): {distancia_float:.4f}")
print(f"Distancia entera truncada (** 0.5): {distancia_exp}")
print(f"Distancia entera truncada (math.sqrt + int): {distancia_sqrt}")
print(f"Distancia entera truncada (math.isqrt): {distancia_isqrt}")
```

**Casos de uso / Mejores prácticas:**
* **Prefiere `math.isqrt()` cuando el resultado deba ser un entero truncado:** Si los datos de entrada son enteros y el problema pide la parte entera de la raíz cuadrada, `math.isqrt(x**2 + y**2)` es la mejor práctica en Python moderno: evita errores de precisión de punto flotante en números muy grandes y ahorra la conversión con `int()`.
* **Usa `math.sqrt()` para cálculos continuos:** Si necesitas conservar los decimales para cálculos posteriores (física, gráficos, estadística), utiliza `math.sqrt()` por encima de `** 0.5`, ya que comunica mejor la intención matemática del código.
* **Diferencia entre truncar y redondear:** Recuerda que `int(3.99)` trunca hacia cero devolviendo `3`. Si un problema requiere redondear al entero más cercano, debes usar `round(3.99)` (que devuelve `4`), o `math.floor()` / `math.ceil()` según la regla del negocio.
