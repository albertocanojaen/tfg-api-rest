Es importante abstraer al máximo nuestra aplicación del ORM (en mi caso Prisma), por lo que he creado una clase Criteria que contiene todos los parámetros necesarios para filtrar en una búsqueda de obtención de un listado de cualquier entidad de nuestra API.

Prisma Documentation for Filter conditions and Operators

[https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators]

1. **equals**

```
where: {
	name: {
		equals: 'Eleanor',
	},
},
```

2. **not**

```
where: {
	name: {
		not: 'Eleanor',
	},
},
```

3. **lt** (_less than_)

```
where: {
	likes: {
		lt: 9,
	},
},
```

4. **lte** (_less than or equal to_)

```
where: {
	likes: {
		lte: 9,
	},
},
```

5. **gt** (_greater than_)

```
where: {
	likes: {
		gt: 9,
	},
},
```

6. **gte** (_greater than or equal to_)

```
where: {
	likes: {
		gte: 9,
	},
},
```

Si queremos incluir en nuestra query un operador AND/OR debemos hacerlo de la siguiente forma:

```
  where: {
    OR: [
      {
        email: {
          endsWith: 'prisma.io',
        },
      },
      { email: { endsWith: 'gmail.com' } },
    ],
    NOT: {
      email: {
        endsWith: 'hotmail.com',
      },
    },
  },
```
