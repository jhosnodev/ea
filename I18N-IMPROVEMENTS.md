# Mejoras de Localización (i18n) - Notas

## Estado actual

El sitio implementa localización ES/EN mediante **includes duplicados** (`section.html` + `section.en.html`). Funciona, pero tiene áreas de mejora.

## Problemas detectados

### 1. `_data/translations.yml` no se usa
El archivo existe con textos de nav, hero y footer, pero ningún template lo referencia. Todos los textos están hardcodeados en los archivos duplicados.

### 2. No hay tags `hreflang`
Google puede tratar las páginas ES y EN como contenido duplicado. Falta:
```html
<link rel="alternate" hreflang="es" href="https://amandaescalona.github.io/...">
<link rel="alternate" hreflang="en" href="https://amandaescalona.github.io/en/...">
<link rel="alternate" hreflang="x-default" href="https://amandaescalona.github.io/...">
```

### 3. `<html lang>` está hardcoded en layouts separados
`base.html` tiene `lang="es"` y `base.en.html` tiene `lang="en"` de forma fija. Podría ser dinámico con `{{ page.lang | default: 'es' }}`.

### 4. `<head>` es igual para ambos idiomas
`<title>` y `<meta description>` son idénticos en ES y EN. Deberían usar traducciones del data file.

### 5. Solo 2 páginas en `/en/`
`en/` solo tiene `index.html` y `404.html`. Blog y portafolio no tienen versión EN.

### 6. No hay patrón `ref` para cross-linking
El toggle de idioma apunta a `/en/` fijo, no a la página equivalente. Si el usuario está en `/portafolio` y hace click en "EN", va a `/en/` en vez de `/en/portafolio`.

### 7. No hay redirección automática inversa
Navegadores EN son redirigidos a `/en/`, pero navegadores ES en `/en/` no son redirigidos a `/`.

## Mejora sugerida: enfoque data-driven

En vez de duplicar cada include, usar un solo archivo con `site.data.translations[page.lang]`:

### Estructura propuesta
```
_data/translations.yml    ← textos centralizados
_includes/navbar.html     ← un solo archivo, usa Liquid
_includes/footer.html     ← un solo archivo, usa Liquid
_layouts/base.html        ← un solo layout con lang dinámico
en/                       ← páginas espejo con lang: en
```

### Front matter con `ref`
```yaml
# ES: /about
lang: es
ref: about

# EN: /en/about
lang: en
ref: about
```

### Toggle inteligente
```liquid
{% if page.lang == 'es' %}
  <a href="/en{{ page.url }}">EN</a>
{% else %}
  {% assign es_url = page.url | remove_first: '/en' %}
  <a href="{{ es_url }}">ES</a>
{% endif %}
```

### Beneficios
- **Mitad de archivos** de includes (no duplicación)
- **Un solo punto de cambio** para textos de UI
- **SEO correcto** con hreflang
- **Toggle funciona en cualquier página**, no solo home

## Referencia

Guía utilizada para esta mejora: estructura i18n con `_data/translations.yml` + `ref` + `lang` en Jekyll/GitHub Pages.
