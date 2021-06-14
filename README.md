# Login-app

application to pratique authentication

# API

- to do login `[POST] /api/signin`

**pass in body**
```javascript
{
	username: String,
	password: String
}
```

**you receive**
```javascript
{
	error: "",
	token: "TOKEN_JWT",
	username: String
}
```

- to create an account `[POST] /api/signup`

**pass body**
```javascript
{
	username: String,
	password: String
}

```

**you receive**
```javascript
{
	error: "",
	token: "TOKEN_JWT",
	username: String
}
```

- to check token `[POST] /api/checktoken`
**pass in body**
```javascript
{
	token: "TOKEN_JWT",
}

```
**you receive**
```javascript
// if is valid
{
	error: "",
}

// if has error
{
	error: "ERROR_ESPESIFICATION"
}

```

- to get all remembers `[GET] /api/remembers`

**pass in query**
```
?token=TOKEN_JWT
```

**you receive**
```javascript
//if success
{
	error: "",
	data: [
			{
				id: Number,
				title: String,
				text: String
			},
			...
	]
}

// if not have remembers
{
	error: "ERROR_ESPESIFICATION"
}

```

- to create new remmeber `[POST] /api/remembers/create`
**pass in body**
```javascript
{
	token: "TOKEN_JWT",
	title: String,
	text: String
}
```

**you receive**
```javascript
// if success
{
	error: "",
	id: Number, // use to delete a remember
}

// if error
{
	error: "ERROR_ESPESIFICATION",
}
```

- to delete a rememeber `[POST] /api/remembers/delete`
**pass in body**
```javascript
{
	id: Number,
	token: "TOKEN_JWT"
}
```

**you receive**
```javascript
// if success
{
	error: "",
}

// if error
{
	error: "ERROR_ESPESIFICATION",
}
```
